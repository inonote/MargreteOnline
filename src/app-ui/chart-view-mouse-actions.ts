import { HitTestResult, HitTestTargetType, RendererCursorPosition, ScrollBarMetrices } from "./chart-renderer";
import { ChartView, ChartViewCursorType } from "./chart-view";
import * as MathUtil from "../math-util";
import * as Ug from "../chart/chart";
import { CommandActionNoteInsert, CommandActionNoteProperty } from "../command-actions/command-action-notes";

function calcNoteX(x: number, width: number, relative: number = 0.5) : number {
  return Math.min(Math.max(Math.round(x - width * relative), 0), 16 - width);
}



export class ChartViewMouseAction {
  protected _view: ChartView;
  protected _hitTestResult: HitTestResult;

  constructor(view: ChartView, hitTestResult: HitTestResult) {
    this._view = view;
    this._hitTestResult = hitTestResult;
  }

  static _isOwnAction(hitTestResult: HitTestResult) : boolean { return false; }
  
  static _getCusror(hitTestResult: HitTestResult) : ChartViewCursorType {
    return "default";
  }

  _start() { }

  _move(mouseX: number, mouseY: number, curPos: RendererCursorPosition) { }

  _end() { }

  _cancel() {}
}

export class ChartViewMouseActionScrollThumb extends ChartViewMouseAction {
  static _isOwnAction(hitTestResult: HitTestResult) : boolean {
    return hitTestResult._targetType === HitTestTargetType.SCROLLBAR_THUMB;
  }

  _start() {
  }

  _move(mouseX: number, mouseY: number, curPos: RendererCursorPosition) {
    let sbm = this._hitTestResult._target as ScrollBarMetrices;
    let delta = this._hitTestResult._mousePos._y - mouseY;
    this._view._currentViewState._scrollY = sbm._pos + MathUtil.mixi(sbm._min, sbm._max, delta / sbm._trackLength);
    if (this._view._currentViewState._scrollY < 0)
      this._view._currentViewState._scrollY = 0;
    this._view._invalidateView();
  }

  _end() {

  }

  _cancel() {}
}



export class ChartViewMouseActionInsertNote extends ChartViewMouseAction {
  protected _pendingNote?: Ug.Note;

  static _isOwnAction(hitTestResult: HitTestResult) : boolean {
    return hitTestResult._targetType === HitTestTargetType.NONE &&
      hitTestResult._curPos._realX >= 0 && hitTestResult._curPos._realX <= 16;
  }

  _start() {
    let note = new Ug.Tap;
    note._width = 4;
    note._x = calcNoteX(this._hitTestResult._curPos._x, note._width);
    note._tick = this._hitTestResult._curPos._snappedTick;
    this._view._currentChart._notes._appendChild(note);
    this._view._invalidateView();

    this._pendingNote = note;
  }

  _move(mouseX: number, mouseY: number, curPos: RendererCursorPosition) {
    if (!this._pendingNote)
      return;
    
    this._pendingNote._x = calcNoteX(curPos._x, this._pendingNote._width);
    this._pendingNote._tick = curPos._snappedTick;
    this._view._invalidateView();
  }

  _end() {
    if (!this._pendingNote)
      return;
    
    this._view._currentUndoBuffer._stageAction(new CommandActionNoteInsert(this._pendingNote));
    this._view._invalidateView();
  }

  _cancel() {
    if (!this._pendingNote)
      return;
    
    this._view._currentChart._notes._removeChild(this._pendingNote);
    this._view._invalidateView();
  }
}



export class ChartViewMouseActionMoveNote extends ChartViewMouseAction {
  protected _oldProperty: Ug.Note = new Ug.Note;

  static _isOwnAction(hitTestResult: HitTestResult) : boolean {
    if (!(hitTestResult._target instanceof Ug.Note))
      return false;
    
    return hitTestResult._targetType === HitTestTargetType.NOTE &&
      (!hitTestResult._target._isResizable() || (hitTestResult._relativeX > 0.25 && hitTestResult._relativeX < 0.75));
  }
  
  static _getCusror(hitTestResult: HitTestResult) : ChartViewCursorType {
    if (!(hitTestResult._target instanceof Ug.Note))
      return "move";
    
    if (!hitTestResult._target._isResizable())
      return "ns-resize";
    return "move";
  }

  _start() {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    this._hitTestResult._target._copyPropertiesTo(this._oldProperty);
  }

  _move(mouseX: number, mouseY: number, curPos: RendererCursorPosition) {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    
    let lastX = this._hitTestResult._target._x;
    let lastTick = this._hitTestResult._target._tick;

    let newX = calcNoteX(curPos._x, this._hitTestResult._target._width, this._hitTestResult._relativeX);
    let newTick = curPos._snappedTick;

    if (this._isMovableX(newX, true))
      this._hitTestResult._target._x = newX;
    if (this._isMovableTick(newTick, true))
      this._hitTestResult._target._tick = newTick;

    if (lastX !== this._hitTestResult._target._x || lastTick !== this._hitTestResult._target._tick) {
      // 子ノーツ全部動かす
      this._hitTestResult._target._offsetChildrenTick(this._hitTestResult._target._tick - lastTick);
      this._hitTestResult._target._offsetChildrenX(this._hitTestResult._target._x - lastX);

      if (this._hitTestResult._target._isLongChild())
        (this._hitTestResult._target._parentNode as Ug.Note)?._sortChildByTick();

      if (this._hitTestResult._target._isSlideGroup())
        (this._hitTestResult._target as Ug.Slide|Ug.SlideChild)._prepareSlideBg();

      this._view._invalidateView();
    }
  }

  _end() {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    this._hitTestResult._target._offsetChildrenTick(this._oldProperty._tick - this._hitTestResult._target._tick);
    this._hitTestResult._target._offsetChildrenX(this._oldProperty._x - this._hitTestResult._target._x);
    
    this._view._currentUndoBuffer._stageAction(
      new CommandActionNoteProperty(this._hitTestResult._target, this._oldProperty, true));
    this._view._invalidateView();
  }

  _cancel() {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    this._hitTestResult._target._offsetChildrenTick(this._oldProperty._tick - this._hitTestResult._target._tick);
    this._hitTestResult._target._offsetChildrenX(this._oldProperty._x - this._hitTestResult._target._x);
    
    this._oldProperty._copyPropertiesTo(this._hitTestResult._target);
    
    if (this._hitTestResult._target._isLongChild())
      (this._hitTestResult._target._parentNode as Ug.Note)?._sortChildByTick();

    if (this._hitTestResult._target._isSlideGroup())
      (this._hitTestResult._target as Ug.Slide|Ug.SlideChild)._prepareSlideBg();

    this._view._invalidateView();
  }

  protected _isMovableX(newX: number, parentNoCheck: boolean = false) : boolean {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return true;
      
    let parentNote = this._hitTestResult._target._parentNode as Ug.Note;
    let pairNote = this._hitTestResult._target._getPair();

    let minMax = [ this._hitTestResult._target._x, this._hitTestResult._target._x + this._hitTestResult._target._width ];
    if (this._hitTestResult._target._isLongParent() && parentNoCheck) {
      let v = this._hitTestResult._target._getMinMaxX();
      minMax[0] = Math.min(minMax[0], v[0]);
      minMax[1] = Math.max(minMax[1], v[1]);
    }
    else if (pairNote?._isLongParent() && parentNoCheck) {
      let v = pairNote._getMinMaxX();
      minMax[0] = Math.min(minMax[0], v[0]);
      minMax[1] = Math.max(minMax[1], v[1]);
    }

    let delta = newX - this._hitTestResult._target._x;
    if (minMax[0] + delta < 0 || minMax[1] + delta > 16)
      return false;

    return true;
  }

  protected _isMovableTick(newTick: number, parentNoCheck: boolean = false) : boolean {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return true;
      
    let parentNote = this._hitTestResult._target._parentNode as Ug.Note;
    let pairNote = this._hitTestResult._target._getPair();
    
    if (this._hitTestResult._target._isLongParent()) {
      if (!parentNoCheck && (this._hitTestResult._target._firstChild as Ug.Note)?._tick <= newTick)
        return false;
    }
    else if (pairNote?._isLongParent()) {
      if (!parentNoCheck && (pairNote._firstChild as Ug.Note)?._tick <= newTick)
        return false;
    }

    if (this._hitTestResult._target._isLongChild()) {
      if (parentNote._tick >= newTick)
        return false;
      
      for(const child of parentNote._childNodes as Ug.Note[]) {
        if (child._tick === newTick)
          return false;
      }

      if (!this._hitTestResult._target._nextSiblingNode) { // _target が最後のノーツ
        let prevNote = (this._hitTestResult._target._previousSiblingNode as Ug.Note|undefined) || parentNote;
        if (prevNote._tick >= newTick)
          return false;
      }
      else if ((parentNote._lastChild as Ug.Note)?._tick <= newTick)
          return false;
    }
    return true;
  }
}



export class ChartViewMouseActionResizeNote extends ChartViewMouseActionMoveNote {
  protected _oldProperty: Ug.Note = new Ug.Note;
  protected _isLeft: boolean = false;

  static _isOwnAction(hitTestResult: HitTestResult) : boolean {
    if (!(hitTestResult._target instanceof Ug.Note))
      return false;
    
    if (!hitTestResult._target._isResizable())
      return false;

    return hitTestResult._targetType === HitTestTargetType.NOTE &&
      (hitTestResult._relativeX <= 0.25 || hitTestResult._relativeX >= 0.75);
  }
  
  static _getCusror(hitTestResult: HitTestResult) : ChartViewCursorType {
    return "ew-resize";
  }

  _start() {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
      this._hitTestResult._target._copyPropertiesTo(this._oldProperty);
      this._isLeft = this._hitTestResult._relativeX <= 0.25;
  }

  _move(mouseX: number, mouseY: number, curPos: RendererCursorPosition) {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    if (this._isLeft) {
      this._hitTestResult._target._x = Math.min(Math.max(Math.floor(curPos._realX), 0), this._oldProperty._width + this._oldProperty._x - 1);
      this._hitTestResult._target._width = this._oldProperty._width + this._oldProperty._x - this._hitTestResult._target._x;
    }
    else {
      this._hitTestResult._target._width = Math.min(Math.max(Math.ceil(curPos._realX) - this._oldProperty._x, 1), 16 - this._oldProperty._x);

    }

    if (this._hitTestResult._target._isSlideGroup())
      (this._hitTestResult._target as Ug.Slide|Ug.SlideChild)._prepareSlideBg();

    this._view._invalidateView();
  }

  _end() {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    this._view._currentUndoBuffer._stageAction(
      new CommandActionNoteProperty(this._hitTestResult._target, this._oldProperty, false));
    this._view._invalidateView();
  }

  _cancel() {
    if (!(this._hitTestResult._target instanceof Ug.Note))
      return;
    
    this._oldProperty._copyPropertiesTo(this._hitTestResult._target);

    if (this._hitTestResult._target._isSlideGroup())
      (this._hitTestResult._target as Ug.Slide|Ug.SlideChild)._prepareSlideBg();

    this._view._invalidateView();
  }
}