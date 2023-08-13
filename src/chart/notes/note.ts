import { AirCrush, AirCrushAction, AirCrushActionType, Tick } from "../chart";
import { ChartNode, ChartObject } from "../chart-object";


export class Note extends ChartObject {
  protected _internalX: number = 0;
  get _x() { return this._internalX; };
  set _x(val: number) { this._internalX = val; };

  protected _internalWidth: number = 1;
  get _width() { return this._internalWidth; };
  set _width(val: number) { this._internalWidth = val; };

  protected _internalTick: Tick = 0;
  get _tick() { return this._internalTick; };
  set _tick(val: Tick) { this._internalTick = val; };

  _timelineId: number = 0;
  protected _pairNoteRef?: WeakRef<Note>;

  _isDirty: boolean = true;

  _create() { return new Note(); }

  _isTap() { return false; }
  _isTapLike() { return false; }
  _isSlideGroup() { return false; }
  _isHoldGroup() { return false; }
  _isGroundedLongParent() { return false; }
  _isGroundedLongChild() { return false; }
  _isAir() { return false; }
  _isAirHoldGroup() { return false; }
  _isAirSlideGroup() { return false; }
  _isAirCrushGroup() { return false; }
  _isAirLongParent() { return false; }
  _isAirLongChild() { return false; }
  _isResizable() { return false; }
  _isAllowedWithAir() { return false; }
  _isGroundedLongGroup() { return this._isSlideGroup() || this._isHoldGroup(); }
  _isAirLongGroup() { return this._isAirHoldGroup() || this._isAirSlideGroup() || this._isAirCrushGroup(); }
  _isLongParent() { return this._isGroundedLongParent() || this._isAirLongParent(); }
  _isLongChild() { return this._isGroundedLongChild() || this._isAirLongChild(); }
  _getPair() : Note|undefined { return this._pairNoteRef?.deref(); }

  _convertable(type: typeof Note) : boolean { return false; }
  _convertTo(type: typeof Note) : Note|undefined { return undefined; }

  /**
   * AIR、AIR-HOLD、AIR-SLIDE の接続に使用。
   * 子ノーツとして appendChild するのはロングノーツの中継点とかだけ。
   */
  _makePair(targetNote?: Note) {
    let oldPair = this._pairNoteRef?.deref();
    if (oldPair)
      oldPair._pairNoteRef = undefined;
    
    if (!targetNote) {
      this._pairNoteRef = undefined;
    }
    else {
      oldPair = targetNote._pairNoteRef?.deref();
      if (oldPair)
        oldPair._pairNoteRef = undefined;
      targetNote._pairNoteRef = new WeakRef(this);
      this._pairNoteRef = new WeakRef(targetNote);
    }
  }

  _getLastTick() : number {
    let lastTick = this._tick;
    for(const note of this._childNodes as Note[])
      lastTick = Math.max(lastTick, note._getLastTick());
    return lastTick;
  }

  _copyPropertiesTo(to: Note) {
    super._copyPropertiesTo(to);
    to._x = this._x;
    to._width = this._width;
    to._tick = this._tick;
    to._timelineId = this._timelineId;
  }

  _getMinMaxX() : number[] {
    let ret: number[] = [ Infinity, -Infinity ];
    ret[0] = Math.min(ret[0], this._x);
    ret[1] = Math.max(ret[1], this._x + this._width);
    
    for(const note of this._childNodes as Note[]) {
      if (this instanceof AirCrush &&
        (((note as AirCrushAction)._type !== AirCrushActionType.CONTROL) && note !== this._lastChild))
        continue;
      
      let v = note._getMinMaxX();
      ret[0] = Math.min(ret[0], v[0]);
      ret[1] = Math.max(ret[1], v[1]);
    }

    let pairNote = this._getPair();
    if (pairNote) {
      for(const note of pairNote._childNodes as Note[]) {
        if (this instanceof AirCrush &&
          (((note as AirCrushAction)._type !== AirCrushActionType.CONTROL) && note !== this._lastChild))
          continue;
        
        let v = note._getMinMaxX();
        ret[0] = Math.min(ret[0], v[0]);
        ret[1] = Math.max(ret[1], v[1]);
      }
    }

    return ret;
  }

  _offsetChildrenX(delta: number) {
    for(const note of this._childNodes as Note[]) {
      note._x += delta;
      note._offsetChildrenX(delta);
    }
    
    let pairNote = this._getPair();
    if (pairNote) {
      for(const note of pairNote._childNodes as Note[]) {
        note._x += delta;
        note._offsetChildrenX(delta);
      }
    }
  }

  _offsetChildrenTick(delta: Tick) {
    for(const note of this._childNodes as Note[]) {
      note._tick += delta;
      note._offsetChildrenTick(delta);
    }
    
    let pairNote = this._getPair();
    if (pairNote) {
      for(const note of pairNote._childNodes as Note[]) {
        note._tick += delta;
        note._offsetChildrenX(delta);
      }
    }
  }

  _sortChildByTick() {
    this._sortChild((a: ChartNode, b: ChartNode) => {
      return (a as Note)._tick - (b as Note)._tick;
    });
  }

  constructor() {
    super();
  }
}
