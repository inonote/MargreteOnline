import { Rect, Position } from "../ui/util";
import { ChartViewState } from "./chart-view";
import * as Ug from "../chart/chart";
import * as MathUtil from "../math-util";

export const CHART_FIELD_MAX_WIDTH                = 400;
export const CHART_FIELD_MIN_WIDTH                = 100;
export const CHART_FIELD_MARGIN_X                  = 64;
export const CHART_FIELD_MARGIN_Y                  = 24;
export const CHART_FIELD_TEXT_MARGIN_X            = 4;
export const CHART_FIELD_TEXT_MARGIN_Y            = 4;
export const CHART_FIELD_LINE_WIDTH                = 1;
export const CHART_FIELD_TEXT_HEIGHT              = 12;
export const CHART_FIELD_EVENT_TEXT_WIDTH          = 50;
export const CHART_FIELD_NOTE_HEIGHT              = 6;
export const CHART_FIELD_NOTE_HITTEST_HEIGHT      = 8;
export const CHART_FIELD_AIR_ACTION_NOTE_HEIGHT    = 4;
export const CHART_FIELD_SLIDE_CENTER_X            = 2;
export const CHART_FIELD_SLIDE_HITTEST_CENTER_X    = 10;

export const CHART_FIELD_SCROLLBAR_WIDTH          = 16;

export const CHART_FIELD_SIDEVIEW_MARGIN_X        = 24;
export const CHART_FIELD_SIDEVIEW_WIDTH            = 240;
export const CHART_FIELD_SIDEVIEW_NOTE_HEIGHT      = 8;
export const CHART_FIELD_SIDEVIEW_NOTE_WIDTH      = 8;
export const CHART_FIELD_SIDEVIEW_LANES           = 36.0;

export const CHART_FIELD_COLOR_BORDER              = MathUtil.ColorRefToCSS(0x00CCCCCC);
export const CHART_FIELD_COLOR_MEAS                = MathUtil.ColorRefToCSS(0x00999999);
export const CHART_FIELD_COLOR_GRID                = MathUtil.ColorRefToCSS(0x00555555);
export const CHART_FIELD_COLOR_SUBGRID            = MathUtil.ColorRefToCSS(0x00222222);
export const CHART_FIELD_COLOR_CURSOR               = MathUtil.ColorRefToCSS(0x000000ff);
export const CHART_FIELD_COLOR_SELECTION          = MathUtil.ColorRefToCSS(0x00FFFFFF);
export const CHART_FIELD_COLOR_ORANGE              = MathUtil.ColorRefToCSS(0x0055AAFF);
export const CHART_FIELD_COLOR_GREEN              = MathUtil.ColorRefToCSS(0x0022EE22);
export const CHART_FIELD_COLOR_PINK                = MathUtil.ColorRefToCSS(0x006666FF);
export const CHART_FIELD_COLOR_TAP                 = MathUtil.ColorRefToCSS(0x000000CC);
export const CHART_FIELD_COLOR_EXTAP               = MathUtil.ColorRefToCSS(0x0000CCCC);
export const CHART_FIELD_COLOR_EX_SLIDE_HOLD_BEGIN = MathUtil.ColorRefToCSS(0x0040CCBF);
export const CHART_FIELD_COLOR_FLICK_BG            = MathUtil.ColorRefToCSS(0x00887777);
export const CHART_FIELD_COLOR_FLICK_FG            = MathUtil.ColorRefToCSS(0x00EEEE00);
export const CHART_FIELD_COLOR_DAMAGE              = MathUtil.ColorRefToCSS(0x00770000);
export const CHART_FIELD_COLOR_SLIDE_STEP          = MathUtil.ColorRefToCSS(0x00EE3300);
export const CHART_FIELD_COLOR_SLIDE_CENTER        = MathUtil.ColorRefToCSS(0x00FFEE00);
export const CHART_FIELD_COLOR_SLIDE_CURVE_CONTROL = MathUtil.ColorRefToCSS(0x00000000);
export const CHART_FIELD_COLOR_HOLD_STEP          = MathUtil.ColorRefToCSS(0x000077EE);
export const CHART_FIELD_COLOR_TAP_LINE           = MathUtil.ColorRefToCSS(0x00EEEEEE);

export const CHART_FIELD_COLOR_SLIDE_BG_1         = MathUtil.ColorRefToCSS(0x00D74FA5);
export const CHART_FIELD_COLOR_SLIDE_BG_2          = MathUtil.ColorRefToCSS(0x00FFFF00);
export const CHART_FIELD_COLOR_SLIDE_BG_3          = MathUtil.ColorRefToCSS(0x00AF4FD6);
export const CHART_FIELD_COLOR_HOLD_BG_1          = MathUtil.ColorRefToCSS(0x00AD50D8);
export const CHART_FIELD_COLOR_HOLD_BG_2          = MathUtil.ColorRefToCSS(0x0000E4FF);
export const CHART_FIELD_COLOR_HOLD_BG_3          = MathUtil.ColorRefToCSS(0x00D64FA6);

export const CHART_FIELD_COLOR_AIR_UP              = MathUtil.ColorRefToCSS(0x0000FF00);
export const CHART_FIELD_COLOR_AIR_DOWN           = MathUtil.ColorRefToCSS(0x00FF00FF);
export const CHART_FIELD_COLOR_AIR_EDGE             = MathUtil.ColorRefToCSS(0x00FFFFFF);
export const CHART_FIELD_COLOR_AIR_ACTION          = MathUtil.ColorRefToCSS(0x00FF00FF);
export const CHART_FIELD_COLOR_AIR_CRUSH_CENTER    = MathUtil.ColorRefToCSS(0x00BB00FF);
export const CHART_FIELD_COLOR_AIR_CRUSH          = MathUtil.ColorRefToCSS(0x00FF005E);
export const CHART_FIELD_COLOR_AIR_CRUSH_EMP      = MathUtil.ColorRefToCSS(0x00AB57FF);

export const CHART_FIELD_FONT_UI                  = "12px system-ui";

export const AIR_WIDTH_RATIO = [ 0, 0.40, 0.50, 0.63, 0.69, 0.70, 0.70, 0.73, 0.75, 0.765, 0.78, 0.795, 0.81, 0.825, 0.84, 0.855, 0.87 ];

export const CHART_FIELD_COLOR_AIR_CRUSH_CUSTOM = [
  CHART_FIELD_COLOR_AIR_CRUSH_CENTER,
  MathUtil.ColorRefToCSS(0x0000E3),
  MathUtil.ColorRefToCSS(0x00B6E3),
  MathUtil.ColorRefToCSS(0x00FFF6),
  MathUtil.ColorRefToCSS(0x04E300),
  MathUtil.ColorRefToCSS(0xE3DB00),
  MathUtil.ColorRefToCSS(0xE02F3B),
  MathUtil.ColorRefToCSS(0xE3007D),
  MathUtil.ColorRefToCSS(0xC400D9),
  MathUtil.ColorRefToCSS(0x000000),
  MathUtil.ColorRefToCSS(0xFFFFFF),
  MathUtil.ColorRefToCSS(0x4D4846),
  MathUtil.ColorRefToCSS(0x00FF99),
  MathUtil.ColorRefToCSS(0xFFB300),
  MathUtil.ColorRefToCSS(0xFF8D00)
];


export enum HitTestTargetType {
  NONE,
  SCROLLBAR_THUMB,
  NOTE,
  LONG_BG
}

export class RendererCursorPosition {
  _x: number = 0;
  _leftX: number = 0;
  _rightX: number = 0;
  _realX: number = 0;
  _height: number = 0;
  _tick: Ug.Tick = 0;
  _snappedTick: Ug.Tick = 0;
}

export class HitTestResult {
  _targetType: HitTestTargetType = HitTestTargetType.NONE;
  _target?: Ug.Note|ScrollBarMetrices;

  _curPos: RendererCursorPosition = new RendererCursorPosition;
  
  _targetRect: Rect = new Rect;
  _mousePos: Position = new Position;

  _relativeX: number = 0.0;
  _relativeY: number = 0.0;

  _offsetMouseX: number = 0;
  _offsetMouseY: number = 0;
}



export class RenderMeasures {
  _rect: Rect = new Rect();
  _sideRect: Rect = new Rect();
  _visibleRangeBegin: Ug.Tick = 0;
  _visibleRangeEnd: Ug.Tick = 0;
  _visibleRange: Ug.Tick = 0;
}



export class ScrollBarMetrices {
  _thumbLength: number = 0; // つまみの長さ
  _trackLength: number = 0; // 可動域
  _thumbPos: number = 0;

  _min: number = 0;
  _max: number = 0;
  _pos: number = 0;
}



export class ChartRenderer {
  _state: ChartViewState;
  _chart: Ug.Chart;

  constructor(state: ChartViewState, chart: Ug.Chart) {
    this._state = state;
    this._chart = chart;
  }

  _calcMeasures() : RenderMeasures {
    let rm = new RenderMeasures();
    let viewWidth = this._state._screenWidth - CHART_FIELD_SCROLLBAR_WIDTH;
    let sideViewWidth = CHART_FIELD_SIDEVIEW_WIDTH + CHART_FIELD_SIDEVIEW_MARGIN_X;
    if (viewWidth < (CHART_FIELD_MAX_WIDTH + sideViewWidth)) {
      let fieldWidth = Math.max(Math.min(viewWidth, CHART_FIELD_MAX_WIDTH) - CHART_FIELD_MARGIN_X * 2, 100);
      rm._rect._left = viewWidth / 2 - fieldWidth / 2;
      rm._rect._right = rm._rect._left + fieldWidth;
    }
    else {
      let fieldWidth = CHART_FIELD_MAX_WIDTH - CHART_FIELD_MARGIN_X * 2;
      rm._rect._left = viewWidth / 2 - (CHART_FIELD_MAX_WIDTH + sideViewWidth) / 2 + sideViewWidth + CHART_FIELD_MARGIN_X;
      rm._rect._right = rm._rect._left + fieldWidth;
    }
    rm._rect._top = 0;
    rm._rect._bottom = this._state._screenHeight;

    rm._sideRect._left = rm._rect._left - CHART_FIELD_MARGIN_X - CHART_FIELD_SIDEVIEW_WIDTH - CHART_FIELD_SIDEVIEW_MARGIN_X;
    rm._sideRect._right = rm._rect._left - CHART_FIELD_MARGIN_X - CHART_FIELD_SIDEVIEW_MARGIN_X;
    rm._sideRect._top = rm._rect._top;
    rm._sideRect._bottom = rm._rect._bottom;

    rm._visibleRange = 10 * rm._rect._height / this._getZoomCoef();
    rm._visibleRangeBegin = Math.max(this._state._scrollY, 0) + -480 / this._getZoomCoef();
    rm._visibleRangeEnd = rm._visibleRangeBegin + rm._visibleRange;
    return rm;
  }
  
  _calcScrollBarMetrices(rm: RenderMeasures) : ScrollBarMetrices {
    let sbm = new ScrollBarMetrices;
    sbm._min = 0;
    sbm._max = this._state._lastTick;
    sbm._pos = this._state._scrollY;
    sbm._thumbLength = Math.max((rm._visibleRange / this._state._lastTick) * this._state._screenHeight, 32);
    sbm._trackLength = this._state._screenHeight - sbm._thumbLength;
    sbm._thumbPos = (1.0 - this._state._scrollY / this._state._lastTick) * sbm._trackLength;
    return sbm;
  }

  // カーソル位置を取得する
  _getCursorPosition(mouseX: number, mouseY: number) : RendererCursorPosition {
    let rm = this._calcMeasures();

    let pos = new RendererCursorPosition;
    pos._tick = Math.max(MathUtil.mixi(rm._visibleRangeBegin, rm._visibleRangeEnd, MathUtil.relative(rm._rect._bottom, rm._rect._top, mouseY)), 0);
    pos._realX = MathUtil.relative(rm._rect._left, rm._rect._right, mouseX) * 16.0;
    let xfl = Math.min(Math.max(pos._realX, 0.0), 15.0);
    pos._x = Math.round(xfl);
    pos._leftX = Math.floor(xfl);
    pos._rightX = Math.ceil(xfl);

    pos._height = Math.floor(Math.min(Math.max(MathUtil.relative(rm._sideRect._right, rm._sideRect._left, mouseX) * CHART_FIELD_SIDEVIEW_LANES, 0), CHART_FIELD_SIDEVIEW_LANES));

    // 変拍子に配慮してスナップさせる
    let newTick: Ug.Tick = 0, lastTick: Ug.Tick = 0;
    let lastMeas = 0, beat = 1.0;
    for (const e of this._chart._events._childNodes) {
      if (!(e instanceof Ug.EventBeatChange))
        continue;
      
      newTick = lastTick + (e._bar - lastMeas) * Math.floor(Ug.DEFAULT_RESOLUTION * beat);
      if (newTick >= pos._tick)
        break;
      lastTick = newTick;
      lastMeas = e._bar;
      beat = e._beatsPerBar / e._beatUnit;
    }
    let measLength = Math.floor(Ug.DEFAULT_RESOLUTION * beat);
    let tickOffset = Math.floor((pos._tick - lastTick) / measLength) * measLength + lastTick;
    pos._snappedTick = Math.round((pos._tick - tickOffset) / this._state._snapTick) * this._state._snapTick + tickOffset;
    return pos;
  }

  _getZoomCoef() : number {
    if (this._state._zoomLevel == 1) return 2;
    if (this._state._zoomLevel == 2) return 3;
    if (this._state._zoomLevel == 3) return 4;
    if (this._state._zoomLevel == 4) return 5;
    if (this._state._zoomLevel == 5) return 10;
    if (this._state._zoomLevel == 6) return 20;
    if (this._state._zoomLevel == 7) return 40;
    if (this._state._zoomLevel == 8) return 80;
    if (this._state._zoomLevel >= 9) return 160;
    return 1;
  }

  static _calcFieldYFromTick(rm: RenderMeasures, tick: Ug.Tick) : number {
    return MathUtil.mixi(rm._rect._bottom, rm._rect._top, (tick - rm._visibleRangeBegin) / rm._visibleRange);
  }

  _hitTest(mouseX: number, mouseY: number) : HitTestResult {
    let result = new HitTestResult;
    let curPos = this._getCursorPosition(mouseX, mouseY);
    let rm = this._calcMeasures();

    result._mousePos._x = mouseX;
    result._mousePos._y = mouseY;
    result._curPos = curPos;

    this._hitTestScrollBar(rm, result) ||
    this._hitTestAirHoldNotes(rm, result) ||
    this._hitTestAirHoldBg(rm, result) ||
    this._hitTestAirCrushNotes(rm, result) ||
    this._hitTestAirSlideNotes(rm, result) ||
    this._hitTestGroundedShortNotes(rm, result) ||
    this._hitTestGroundedLongNotes(rm, result) ||
    this._hitTestAir(rm, result) ||
    this._hitTestAirCrushBg(rm, result) ||
    this._hitTestAirSlideBg(rm, result) ||
    this._hitTestGroundedLongBg(rm, result) ||
    true;
    
    return result;
  }

  protected _hitTestScrollBar(rm: RenderMeasures, result: HitTestResult) : boolean {
    let sbm = this._calcScrollBarMetrices(rm);
    let left = this._state._screenWidth - CHART_FIELD_SCROLLBAR_WIDTH;
    let right = this._state._screenWidth;
    let top = sbm._thumbPos;
    let bottom = sbm._thumbPos + sbm._thumbLength;

    let hit = MathUtil._ptInRect(result._mousePos._x, result._mousePos._y, left, top, right, bottom);
    
    if (!hit)
      return false;
    result._targetType = HitTestTargetType.SCROLLBAR_THUMB;
    result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
    result._relativeY = MathUtil.relative(top, bottom, result._mousePos._y);
    result._offsetMouseX = result._mousePos._x - left;
    result._offsetMouseY = result._mousePos._y - top;
    result._target = sbm;
    return true;
  }

  protected static _hitTestNote(rm: RenderMeasures, result: HitTestResult, note: Ug.Note, customX?: number, customWidth?: number) : boolean {
    let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);
    let noteX = customX === undefined ? note._x : customX;
    let left = MathUtil.mixi(rm._rect._left, rm._rect._right, noteX / 16.0);
    let right = MathUtil.mixi(rm._rect._left, rm._rect._right, (customWidth === undefined ? (note._x + note._width) : (noteX + customWidth)) / 16.0);
    let top = y - CHART_FIELD_NOTE_HITTEST_HEIGHT / 2;
    let bottom = y + CHART_FIELD_NOTE_HITTEST_HEIGHT / 2;
    
    if (!MathUtil._ptInRect(
      result._mousePos._x, result._mousePos._y,
      left, top, right, bottom))
      return false;

    result._targetType = HitTestTargetType.NOTE;
    result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
    result._relativeY = MathUtil.relative(top, bottom, result._mousePos._y);
    result._offsetMouseX = result._mousePos._x - left;
    result._offsetMouseY = result._mousePos._y - top;
    result._target = note;
    return true;
  }

  protected _hitTestAirHoldNotes(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirHold) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        for(const child of note._childNodes as Ug.Note[]) {
          if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
            child._timelineId == this._state._activeTimelineId) {
              if (ChartRenderer._hitTestNote(rm, result, child))
                return true;
          }
        }
      }
    }
    return false;
  }

  protected _hitTestAirHoldBg(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirHold) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        let centerX = rm._rect._left + rm._rect._width * (note._x + note._width / 2.0) / 16.0;
        let left = centerX - CHART_FIELD_SLIDE_HITTEST_CENTER_X;
        let right = centerX + CHART_FIELD_SLIDE_HITTEST_CENTER_X;
        let beginY = ChartRenderer._calcFieldYFromTick(rm, note._tick);
        let endY = ChartRenderer._calcFieldYFromTick(rm, (note._lastChild as Ug.HoldChild)._tick);
        
        if (!MathUtil._ptInRect(
          result._mousePos._x, result._mousePos._y,
          left, endY, right, beginY))
          continue;

        result._targetType = HitTestTargetType.LONG_BG;
        result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
        result._relativeY = MathUtil.relative(endY, beginY, result._mousePos._y);
        result._offsetMouseX = result._mousePos._x - left;
        result._offsetMouseY = result._mousePos._y - endY;
        result._target = note;
        return true;
      }
    }
    return false;
  }

  protected _hitTestAirCrushNotes(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirCrush) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        let queue: Ug.AirCrushAction[] = [];
        let lastControlNote: Ug.AirCrush|Ug.AirCrushAction = note;
        for(const child of note._childNodes as Ug.AirCrushAction[]) {
          if (child._type === Ug.AirCrushActionType.STEP && note._lastChild !== child) {
            queue.push(child);
          }
          else {
            for(const queueNote of queue) {
              let pt = MathUtil.relative(lastControlNote._tick, child._tick, queueNote._tick);
              if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
                queueNote._timelineId === this._state._activeTimelineId) {
                if (ChartRenderer._hitTestNote(
                  rm, result, queueNote,
                  MathUtil.mix(lastControlNote._x, child._x, pt),
                  MathUtil.mix(lastControlNote._width, child._width, pt)))
                  return true;
              }
            }

            queue = [];
            if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
              child._timelineId == this._state._activeTimelineId) {
              if (ChartRenderer._hitTestNote(rm, result, child))
                return true;
            }
            
            lastControlNote = child;

          }
        }

        if (note._tick >= rm._visibleRangeBegin && note._tick <= rm._visibleRangeEnd &&
          note._timelineId == this._state._activeTimelineId) {
          if (ChartRenderer._hitTestNote(rm, result, note))
            return true;
        }
      }
    }
    return false;
  }

  protected _hitTestAirSlideNotes(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirSlide) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        for(const child of note._childNodes as Ug.Note[]) {
          if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
            child._timelineId == this._state._activeTimelineId) {
              if (ChartRenderer._hitTestNote(rm, result, child))
                return true;
          }
        }
      }
    }
    return false;
  }


  protected _hitTestGroundedShortNotes(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || note._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd || !note._isTap())
          continue;
        if (note._timelineId !== this._state._activeTimelineId)
          continue;
        
        if (ChartRenderer._hitTestNote(rm, result, note))
          return true;
      }
    }
    return false;
  }

  protected _hitTestGroundedLongNotes(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !note._isGroundedLongParent() || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        for(const child of note._childNodes as Ug.Note[]) {
          if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
            child._timelineId == this._state._activeTimelineId) {
              if (ChartRenderer._hitTestNote(rm, result, child))
                return true;
          }
        }

        if (note._tick >= rm._visibleRangeBegin && note._tick <= rm._visibleRangeEnd &&
          note._timelineId == this._state._activeTimelineId) {
          if (ChartRenderer._hitTestNote(rm, result, note))
            return true;
        }
      }
    }
    return false;
  }

  _hitTestAir(rm: RenderMeasures, result: HitTestResult) : boolean {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!(note instanceof Ug.Air) || note._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;

      let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);
      let centerX = MathUtil.mix(rm._rect._left, rm._rect._right, (note._x + note._width / 2.0) / 16.0);
      let realWidth = rm._rect._width * note._width / 16.0 * AIR_WIDTH_RATIO[Math.min(Math.max(note._width, 1, 16))];
      let left = centerX - realWidth / 2;
      let right = centerX + realWidth / 2;
      let baseY = ChartRenderer._calcFieldYFromTick(rm, note._tick);
      if (MathUtil._ptInRect(result._mousePos._x, result._mousePos._y, left, baseY - 42, right, baseY - 6)) {
        result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
        result._relativeY = MathUtil.relative(baseY - 42, baseY - 6, result._mousePos._y);
        result._offsetMouseX = result._mousePos._x - left;
        result._offsetMouseY = result._mousePos._y - (baseY - 42);
        result._target = note;
        return true;
      }
    }
    return false;
  }

  _hitTestAirCrushBg(rm: RenderMeasures, result: HitTestResult) : boolean {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!(note instanceof Ug.AirCrush) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;

      let lastV = note as Ug.AirCrush|Ug.AirCrushAction;
      for(const v of note._childNodes as Ug.AirCrushAction[]) {
        let endY = ChartRenderer._calcFieldYFromTick(rm, v._tick);
        let beginY = ChartRenderer._calcFieldYFromTick(rm, lastV._tick);

        if (result._mousePos._y < endY || result._mousePos._y > beginY) {
          lastV = v;
          continue;
        }
        
        let pt = MathUtil.relative(endY, beginY, result._mousePos._y);
        let centerX = MathUtil.mixi(rm._rect._left, rm._rect._right, MathUtil.mix(v._x + v._width / 2.0, lastV._x + lastV._width / 2.0, pt) / 16.0);
        let left = centerX - CHART_FIELD_SLIDE_HITTEST_CENTER_X;
        let right = centerX + CHART_FIELD_SLIDE_HITTEST_CENTER_X;

        if (result._mousePos._x >= left && result._mousePos._x <= right) {
          result._targetType = HitTestTargetType.LONG_BG;
          result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
          result._relativeY = MathUtil.relative(endY, beginY, result._mousePos._y);
          result._offsetMouseX = result._mousePos._x - left;
          result._offsetMouseY = result._mousePos._y - endY;
          result._target = note;
          return true;
        }

        lastV = v;
      }
    }
    return false;
  }

  _hitTestAirSlideBg(rm: RenderMeasures, result: HitTestResult) : boolean {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!(note instanceof Ug.AirSlide) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;

      let lastV = note as Ug.AirSlide|Ug.AirSlideAction;
      for(const v of note._childNodes as Ug.AirSlideAction[]) {
        let endY = ChartRenderer._calcFieldYFromTick(rm, v._tick);
        let beginY = ChartRenderer._calcFieldYFromTick(rm, lastV._tick);

        if (result._mousePos._y < endY || result._mousePos._y > beginY) {
          lastV = v;
          continue;
        }
        
        let pt = MathUtil.relative(endY, beginY, result._mousePos._y);
        let left = MathUtil.mixi(rm._rect._left, rm._rect._right, MathUtil.mix(v._x, lastV._x, pt) / 16.0);
        let right = MathUtil.mixi(rm._rect._left, rm._rect._right, MathUtil.mix(v._x + v._width, lastV._x + lastV._width, pt) / 16.0);

        if (result._mousePos._x >= left && result._mousePos._x <= right) {
          result._targetType = HitTestTargetType.LONG_BG;
          result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
          result._relativeY = MathUtil.relative(endY, beginY, result._mousePos._y);
          result._offsetMouseX = result._mousePos._x - left;
          result._offsetMouseY = result._mousePos._y - endY;
          result._target = note;
          return true;
        }

        lastV = v;
      }
    }
    return false;
  }

  _hitTestGroundedLongBg(rm: RenderMeasures, result: HitTestResult) : boolean {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (!note._isGroundedLongParent() || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
  
        if (note instanceof Ug.Hold) {
          let left = rm._rect._left + rm._rect._width * note._x / 16.0 + 1.5;
          let right = rm._rect._left + rm._rect._width * (note._x + note._width) / 16.0 - 1.5;
          let beginY = ChartRenderer._calcFieldYFromTick(rm, note._tick);
          let endY = ChartRenderer._calcFieldYFromTick(rm, (note._firstChild as Ug.HoldChild)._tick);
          
          if (!MathUtil._ptInRect(
            result._mousePos._x, result._mousePos._y,
            left, endY, right, beginY))
            continue;

          result._targetType = HitTestTargetType.LONG_BG;
          result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
          result._relativeY = MathUtil.relative(endY, beginY, result._mousePos._y);
          result._offsetMouseX = result._mousePos._x - left;
          result._offsetMouseY = result._mousePos._y - endY;
          result._target = note;
          return true;
        }
        else if (note instanceof Ug.Slide) {
          let isFirst = true;
          let lastV = note._slideBgVertices[0];
          for(const v of note._slideBgVertices) {
            if (isFirst) {
              isFirst = false;
              continue;
            }

            let endY = ChartRenderer._calcFieldYFromTick(rm, v._tick);
            let beginY = ChartRenderer._calcFieldYFromTick(rm, lastV._tick);

            if (result._mousePos._y < endY || result._mousePos._y > beginY) {
              lastV = v;
              continue;
            }
            
            let pt = MathUtil.relative(endY, beginY, result._mousePos._y);
            let left = MathUtil.mixi(rm._rect._left, rm._rect._right, MathUtil.mix(v._left, lastV._left, pt));
            let right = MathUtil.mixi(rm._rect._left, rm._rect._right, MathUtil.mix(v._right, lastV._right, pt));

            if (result._mousePos._x >= left && result._mousePos._x <= right) {
              result._targetType = HitTestTargetType.LONG_BG;
              result._relativeX = MathUtil.relative(left, right, result._mousePos._x);
              result._relativeY = MathUtil.relative(endY, beginY, result._mousePos._y);
              result._offsetMouseX = result._mousePos._x - left;
              result._offsetMouseY = result._mousePos._y - endY;
              result._target = note;
              return true;
            }

            lastV = v;
          }
        }
      }
    }
    return false;
  }


  _draw(ctx: CanvasRenderingContext2D) {
    const rm: RenderMeasures = this._calcMeasures();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, this._state._screenWidth, this._state._screenHeight);
  
    this._drawLaneLines(ctx, rm);
    this._drawEvents(ctx, rm);

    this._drawGroundedLongBg(ctx, rm);
    this._drawAirHoldBg(ctx, rm);
    this._drawAirSlideBg(ctx, rm);
    this._drawAirCrushBg(ctx, rm);
    
		this._drawAir(ctx, rm);
		this._drawGroundedLongNotes(ctx, rm);
		this._drawGroundedShortNotes(ctx, rm);
    this._drawAirHoldNotes(ctx, rm);
    this._drawAirSlideNotes(ctx, rm);
    this._drawAirCrushNotes(ctx, rm);

    this._drawNoteAttributes(ctx, rm);

    this._drawScrollBar(ctx, rm);
  }

  private _drawScrollBar(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    const computedRootStyle = getComputedStyle(document.body);
    const colorUiWindowBg = computedRootStyle.getPropertyValue("--ui-window-bg");
    const colorItemSeparator = computedRootStyle.getPropertyValue("--ui-item-separator");
    const colorItemActiveBg = computedRootStyle.getPropertyValue("--ui-item-active-bg");

    // bg
    ctx.fillStyle = colorUiWindowBg;
    ctx.fillRect(this._state._screenWidth - CHART_FIELD_SCROLLBAR_WIDTH, 0, CHART_FIELD_SCROLLBAR_WIDTH, this._state._screenHeight);
    
    ctx.strokeStyle = colorItemSeparator;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this._state._screenWidth - CHART_FIELD_SCROLLBAR_WIDTH, 0);
    ctx.lineTo(this._state._screenWidth - CHART_FIELD_SCROLLBAR_WIDTH, this._state._screenHeight);
    ctx.stroke();

    let sbm = this._calcScrollBarMetrices(rm);
    ctx.fillStyle = colorItemActiveBg;
    ctx.fillRect(this._state._screenWidth - CHART_FIELD_SCROLLBAR_WIDTH, sbm._thumbPos, CHART_FIELD_SCROLLBAR_WIDTH, sbm._thumbLength);
  }

  private _drawLaneLines(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let i = 0; i < 17; ++i) {
      canvasDrawLine(
        ctx,
        MathUtil.mix(rm._rect._left, rm._rect._right, i / 16.0), rm._rect._top,
        MathUtil.mix(rm._rect._left, rm._rect._right, i / 16.0), rm._rect._bottom,
        (i % 2) == 0 ? CHART_FIELD_COLOR_GRID : CHART_FIELD_COLOR_SUBGRID,
        CHART_FIELD_LINE_WIDTH);
    }
    
    // 側面図
    for (let i = 0; i < CHART_FIELD_SIDEVIEW_LANES; i += 4) {
      canvasDrawLine(
        ctx,
        MathUtil.mix(rm._sideRect._right, rm._sideRect._left, i / CHART_FIELD_SIDEVIEW_LANES), rm._rect._top,
        MathUtil.mix(rm._sideRect._right, rm._sideRect._left, i / CHART_FIELD_SIDEVIEW_LANES), rm._rect._bottom,
        (i == 8 || i == 0) ? CHART_FIELD_COLOR_GRID : CHART_FIELD_COLOR_SUBGRID,
        CHART_FIELD_LINE_WIDTH);
    }
    
    canvasDrawLine(
      ctx,
      rm._sideRect._right - 2, rm._rect._top,
      rm._sideRect._right - 2, rm._rect._bottom,
      CHART_FIELD_COLOR_GRID,
      CHART_FIELD_LINE_WIDTH);

    

    // 小節線
    {
      let nextEnd = false, beatChanged = false;
      let beatChangeItr = this._chart._events._findNext(node => node instanceof Ug.EventBeatChange);
      let lastBeat = [ 4, 4 ], lastY = 0;
      let lastYValid = false;
      let meas = 0;
      let tick: Ug.Tick = 0, tickInterval: Ug.Tick = Ug.DEFAULT_RESOLUTION;

      while (true) {
        if (nextEnd)
          break;
        if (tick > rm._visibleRangeEnd) {
          nextEnd = true;
        }

        let eventBeatChange = beatChangeItr._get() as Ug.EventBeatChange|undefined;
        if (eventBeatChange && eventBeatChange._bar === meas) {
          // 拍子変更を適用
          lastBeat[0] = eventBeatChange._beatsPerBar;
          lastBeat[1] = eventBeatChange._beatUnit;
          tickInterval = lastBeat[0] * Ug.DEFAULT_RESOLUTION / lastBeat[1];
          beatChanged = true;
          beatChangeItr._next();
        }

        if (tick + tickInterval >= rm._visibleRangeBegin) {
          let y = ChartRenderer._calcFieldYFromTick(rm, tick);
          canvasDrawLine(
            ctx,
            rm._sideRect._left, y,
            rm._rect._right, y,
            CHART_FIELD_COLOR_MEAS,
            CHART_FIELD_LINE_WIDTH);

          if (meas == 1 && lastYValid && !this._chart._meta._startOffset && this._chart._meta._useClick) {
            let op = ctx.globalAlpha;
            ctx.globalAlpha = 0.25;
            ctx.fillStyle = CHART_FIELD_COLOR_BORDER;
            ctx.fillRect(
              rm._rect._left, y,
              rm._rect._right, lastY);
            ctx.fillRect(
              rm._sideRect._left, y,
              rm._sideRect._right, lastY);
            ctx.globalAlpha = op;
          }

          lastY = y;
          lastYValid = true;
          
          // 小節番号
          ctx.font = CHART_FIELD_FONT_UI;
          ctx.textBaseline = "top";
          ctx.textAlign = "end";
          ctx.fillStyle = CHART_FIELD_COLOR_BORDER;
          ctx.fillText("" + (meas + 1), rm._rect._left - CHART_FIELD_TEXT_MARGIN_X, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);

          // 拍子変更
          if (beatChanged) {
            ctx.font = CHART_FIELD_FONT_UI;
            ctx.textBaseline = "top";
            ctx.textAlign = "end";
            ctx.fillStyle = CHART_FIELD_COLOR_ORANGE;
            ctx.fillText(lastBeat[0] + "/" + lastBeat[1], rm._rect._left - CHART_FIELD_TEXT_MARGIN_X - 32, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);
          }

          for (let i = 1; Ug.DEFAULT_RESOLUTION * i / lastBeat[1] < tickInterval; ++i) {
            let y = ChartRenderer._calcFieldYFromTick(rm, tick + Ug.DEFAULT_RESOLUTION * i / lastBeat[1]);
            canvasDrawLine(
              ctx,
              rm._rect._left, y,
              rm._rect._right, y,
              CHART_FIELD_COLOR_GRID,
              CHART_FIELD_LINE_WIDTH);
            canvasDrawLine(
              ctx,
              rm._sideRect._left, y,
              rm._sideRect._right, y,
              CHART_FIELD_COLOR_GRID,
              CHART_FIELD_LINE_WIDTH);
          }
        }
        beatChanged = false;
        meas++;
        tick += tickInterval;
      }
    }
      

    // カーソル
    if (this._state._isPlaying) {
      if (this._state._playbackSeek >= rm._visibleRangeBegin && this._state._playbackSeek <= rm._visibleRangeEnd) {
        let y = ChartRenderer._calcFieldYFromTick(rm, this._state._playbackSeek);
        canvasDrawLine(
          ctx,
          rm._sideRect._left, y,
          rm._rect._right, y,
          CHART_FIELD_COLOR_CURSOR,
          CHART_FIELD_LINE_WIDTH);
      }
    }
    else {
      if (this._state._cursorTick >= rm._visibleRangeBegin && this._state._cursorTick <= rm._visibleRangeEnd) {
        let y = ChartRenderer._calcFieldYFromTick(rm, this._state._cursorTick);
        canvasDrawLine(
          ctx,
          rm._sideRect._left, y,
          rm._rect._right, y,
          CHART_FIELD_COLOR_CURSOR,
          CHART_FIELD_LINE_WIDTH);
      }
    }
  }

  private _drawEvents(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    // BPM
    for(const e of this._chart._events._childNodes) {
      if (!(e instanceof Ug.EventSpeedModifier))
        continue;
      
      if (e._tick < rm._visibleRangeBegin || e._tick > rm._visibleRangeEnd)
        continue;

      let y = ChartRenderer._calcFieldYFromTick(rm, e._tick);
      ctx.font = CHART_FIELD_FONT_UI;
      ctx.textBaseline = "top";
      ctx.textAlign = "end";
      ctx.fillStyle = CHART_FIELD_COLOR_BORDER;
      ctx.fillText(e._speed.toFixed(3), rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH * 3 - CHART_FIELD_TEXT_MARGIN_X, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);
      
      canvasDrawLine(
        ctx,
        rm._rect._right, y,
        rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH * 3, y,
        CHART_FIELD_COLOR_BORDER,
        CHART_FIELD_LINE_WIDTH);
    }

    // TIL
    for(const e of this._chart._events._childNodes) {
      if (!(e instanceof Ug.EventTimeline))
        continue;
      
      if (e._timelineId !== this._state._activeTimelineId || e._tick < rm._visibleRangeBegin || e._tick > rm._visibleRangeEnd)
        continue;

      let y = ChartRenderer._calcFieldYFromTick(rm, e._tick);
      ctx.font = CHART_FIELD_FONT_UI;
      ctx.textBaseline = "top";
      ctx.textAlign = "end";
      ctx.fillStyle = CHART_FIELD_COLOR_PINK;
      ctx.fillText(e._speed.toFixed(3), rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH * 2 - CHART_FIELD_TEXT_MARGIN_X, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);
      
      canvasDrawLine(
        ctx,
        rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH, y,
        rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH * 2, y,
        CHART_FIELD_COLOR_PINK,
        CHART_FIELD_LINE_WIDTH);
    }

    // BPM
    for(const e of this._chart._events._childNodes) {
      if (!(e instanceof Ug.EventBpmChange))
        continue;
      
      if (e._tick < rm._visibleRangeBegin || e._tick > rm._visibleRangeEnd)
        continue;

      let y = ChartRenderer._calcFieldYFromTick(rm, e._tick);
      ctx.font = CHART_FIELD_FONT_UI;
      ctx.textBaseline = "top";
      ctx.textAlign = "end";
      ctx.fillStyle = CHART_FIELD_COLOR_GREEN;
      ctx.fillText(e._bpm.toFixed(2), rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH - CHART_FIELD_TEXT_MARGIN_X, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);
      
      canvasDrawLine(
        ctx,
        rm._rect._right, y,
        rm._rect._right + CHART_FIELD_EVENT_TEXT_WIDTH, y,
        CHART_FIELD_COLOR_GREEN,
        CHART_FIELD_LINE_WIDTH);
    }
  }

  private _drawNoteAttributes(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (note._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;
      if (note instanceof Ug.ExTap) {
        let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);
        let buf = "";
        switch (note._direction) {
        case Ug.ExTapDirection.DOWN:
          buf = "D";
          break;
        case Ug.ExTapDirection.CENTER:
          buf = "C";
          break;
        case Ug.ExTapDirection.ROTATE_LEFT:
          buf = "RL";
          break;
        case Ug.ExTapDirection.ROTATE_RIGHT:
          buf = "RR";
          break;
        case Ug.ExTapDirection.LEFT:
          buf = "L";
          break;
        case Ug.ExTapDirection.RIGHT:
          buf = "R";
          break;
        case Ug.ExTapDirection.INOUT:
          buf = "IO";
          break;
        case Ug.ExTapDirection.OUTIN:
          buf = "OI";
          break;
        default:
          buf = "U";
          break;
        }

        ctx.font = "bold " + CHART_FIELD_FONT_UI;
        ctx.textBaseline = "top";
        ctx.textAlign = "start";
        ctx.fillStyle = CHART_FIELD_COLOR_ORANGE;
        ctx.fillText(
          buf,
          MathUtil.mix(rm._rect._left, rm._rect._right, note._x / 16.0) + 6.0, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y,
          y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);
      }
      else if (note instanceof Ug.Flick) {
        let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);
        let buf = "";
        switch (note._direction) {
        case Ug.FlickDirection.LEFT:
          buf = "L";
          break;
        case Ug.FlickDirection.RIGHT:
          buf = "R";
          break;
        }
        if (buf !== "") {
          ctx.font = "bold " + CHART_FIELD_FONT_UI;
          ctx.textBaseline = "top";
          ctx.textAlign = "start";
          ctx.fillStyle = CHART_FIELD_COLOR_ORANGE;
          ctx.fillText(
            buf,
            MathUtil.mix(rm._rect._left, rm._rect._right, note._x / 16.0) + 6.0, y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y,
            y - CHART_FIELD_TEXT_HEIGHT - CHART_FIELD_TEXT_MARGIN_Y);
        }
      }
    }

  }

  private _drawGroundedLongBg(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!note._isGroundedLongParent() || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;

      if (note instanceof Ug.Hold) {
        let left = rm._rect._left + rm._rect._width * note._x / 16.0 + 1.5;
        let right = rm._rect._left + rm._rect._width * (note._x + note._width) / 16.0 - 1.5;
        let beginY = ChartRenderer._calcFieldYFromTick(rm, note._tick);
        let endY = ChartRenderer._calcFieldYFromTick(rm, (note._firstChild as Ug.HoldChild)._tick);
        
        let gradient = ctx.createLinearGradient(0, beginY, 0, endY);
        gradient.addColorStop(0.0, CHART_FIELD_COLOR_HOLD_BG_3);
        gradient.addColorStop(0.375, CHART_FIELD_COLOR_HOLD_BG_2);
        gradient.addColorStop(0.625, CHART_FIELD_COLOR_HOLD_BG_2);
        gradient.addColorStop(1.0, CHART_FIELD_COLOR_HOLD_BG_1);
        ctx.fillStyle = gradient;

        ctx.globalAlpha = 0.672;
        ctx.fillRect(left, beginY, right - left, endY - beginY);
        ctx.globalAlpha = 1.0;
      }
      else if (note instanceof Ug.Slide) {
        let isFirst = true;

        /* [ left, right, y ] */
        let bgVertices: number[] = [];
        let centerVertices: number[] = [];
        
        for(let vertexIndex = 0; vertexIndex < note._slideBgVertices.length; ++vertexIndex) {
          const v = note._slideBgVertices[vertexIndex];
          bgVertices.push(
            rm._rect._left + rm._rect._width * v._left + 1.5,
            rm._rect._left + rm._rect._width * v._right - 1.5,
            ChartRenderer._calcFieldYFromTick(rm, v._tick));
            
          let beginCenterX = rm._rect._left + rm._rect._width * (v._left + v._right) / 2.0;
          centerVertices.push(
            beginCenterX - CHART_FIELD_SLIDE_CENTER_X,
            beginCenterX + CHART_FIELD_SLIDE_CENTER_X,
            ChartRenderer._calcFieldYFromTick(rm, v._tick));
          
          if (isFirst) {
            isFirst = false;
            continue;
          }

          if (v._isJoint) {
            ctx.beginPath();
            ctx.moveTo(bgVertices[0], bgVertices[2]);
            for(let i = 3; i < bgVertices.length; i += 3)
              ctx.lineTo(bgVertices[i], bgVertices[i + 2]);
            for(let i = bgVertices.length - 3; i >= 0; i -= 3)
              ctx.lineTo(bgVertices[i + 1], bgVertices[i + 2]);

            let gradient = ctx.createLinearGradient(0, bgVertices[bgVertices.length - 1], 0, bgVertices[2]);
            gradient.addColorStop(0.0, CHART_FIELD_COLOR_SLIDE_BG_1);
            gradient.addColorStop(0.375, CHART_FIELD_COLOR_SLIDE_BG_2);
            gradient.addColorStop(0.625, CHART_FIELD_COLOR_SLIDE_BG_2);
            gradient.addColorStop(1.0, CHART_FIELD_COLOR_SLIDE_BG_3);
            ctx.fillStyle = gradient;

            ctx.globalAlpha = 0.672;
            ctx.closePath();
            ctx.fill();
            ctx.globalAlpha = 1.0;
            
            ctx.beginPath();
            ctx.moveTo(centerVertices[0], centerVertices[2]);
            for(let i = 3; i < centerVertices.length; i += 3)
              ctx.lineTo(centerVertices[i], centerVertices[i + 2]);
            for(let i = centerVertices.length - 3; i >= 0; i -= 3)
              ctx.lineTo(centerVertices[i + 1], centerVertices[i + 2]);
            ctx.fillStyle = CHART_FIELD_COLOR_SLIDE_CENTER;
            ctx.closePath();
            ctx.fill();

            bgVertices = [];
            centerVertices = [];
            isFirst = true;
            --vertexIndex;
          }
        }
      }
      
    }

  }

  private _drawAirHoldBg(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!(note instanceof Ug.AirHold) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;
      
      let centerX = rm._rect._left + rm._rect._width * (note._x + note._width / 2.0) / 16.0;
      let beginY = ChartRenderer._calcFieldYFromTick(rm, note._tick);
      let endY = ChartRenderer._calcFieldYFromTick(rm, (note._lastChild as Ug.HoldChild)._tick);
      
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_UP;
      ctx.fillRect(
        centerX - CHART_FIELD_SLIDE_CENTER_X, beginY,
        CHART_FIELD_SLIDE_CENTER_X * 2, endY - beginY);

      // 側面図
      ctx.beginPath();
      ctx.moveTo(
        MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, note._height / CHART_FIELD_SIDEVIEW_LANES),
        beginY);
      ctx.lineTo(
        MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, note._height / CHART_FIELD_SIDEVIEW_LANES),
        endY);
      ctx.strokeStyle = CHART_FIELD_COLOR_AIR_UP;
      ctx.lineWidth = CHART_FIELD_SLIDE_CENTER_X;
      ctx.stroke();
    }

  }

  private _drawAirSlideBg(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!(note instanceof Ug.AirSlide) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;

      /* [ left, right, y ] */
      let bgVertices: number[] = [];
      let centerVertices: number[] = [];
      
      let left = note._x / 16.0;
      let right = (note._x + note._width) / 16.0;
      bgVertices.push(
        rm._rect._left + rm._rect._width * left + 1.5,
        rm._rect._left + rm._rect._width * right - 1.5,
        ChartRenderer._calcFieldYFromTick(rm, note._tick));

      let beginCenterX = rm._rect._left + rm._rect._width * (left + right) / 2.0;
      centerVertices.push(
        beginCenterX - CHART_FIELD_SLIDE_CENTER_X,
        beginCenterX + CHART_FIELD_SLIDE_CENTER_X,
        ChartRenderer._calcFieldYFromTick(rm, note._tick));

      for(const childNote of note._childNodes as Ug.AirSlideAction[]) {
        left = childNote._x / 16.0;
        right = (childNote._x + childNote._width) / 16.0;
        bgVertices.push(
          rm._rect._left + rm._rect._width * left + 1.5,
          rm._rect._left + rm._rect._width * right - 1.5,
          ChartRenderer._calcFieldYFromTick(rm, childNote._tick));
          
        beginCenterX = rm._rect._left + rm._rect._width * (left + right) / 2.0;
        centerVertices.push(
          beginCenterX - CHART_FIELD_SLIDE_CENTER_X,
          beginCenterX + CHART_FIELD_SLIDE_CENTER_X,
          ChartRenderer._calcFieldYFromTick(rm, childNote._tick));
      }
      
      ctx.beginPath();
      ctx.moveTo(bgVertices[0], bgVertices[2]);
      for(let i = 3; i < bgVertices.length; i += 3)
        ctx.lineTo(bgVertices[i], bgVertices[i + 2]);
      for(let i = bgVertices.length - 3; i >= 0; i -= 3)
        ctx.lineTo(bgVertices[i + 1], bgVertices[i + 2]);
      
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_UP;
      ctx.globalAlpha = 0.25;
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1.0;
          
      ctx.beginPath();
      ctx.moveTo(centerVertices[0], centerVertices[2]);
      for(let i = 3; i < centerVertices.length; i += 3)
        ctx.lineTo(centerVertices[i], centerVertices[i + 2]);
      for(let i = centerVertices.length - 3; i >= 0; i -= 3)
        ctx.lineTo(centerVertices[i + 1], centerVertices[i + 2]);
      ctx.fillStyle = CHART_FIELD_COLOR_SLIDE_CENTER;
      ctx.closePath();
      ctx.fill();

      // 側面図
      ctx.beginPath();
      ctx.moveTo(
        MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, note._height / CHART_FIELD_SIDEVIEW_LANES),
        ChartRenderer._calcFieldYFromTick(rm, note._tick));
      for(const childNote of note._childNodes as Ug.AirSlideAction[]) {
        ctx.lineTo(
          MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, childNote._height / CHART_FIELD_SIDEVIEW_LANES),
          ChartRenderer._calcFieldYFromTick(rm, childNote._tick));
      }
      ctx.strokeStyle = CHART_FIELD_COLOR_SLIDE_CENTER;
      ctx.lineWidth = CHART_FIELD_SLIDE_CENTER_X;
      ctx.stroke();

    }

  }

  private _drawAirCrushBg(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      if (!(note instanceof Ug.AirCrush) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
        continue;
      
      if (note._variationId !== Ug.VARIDATION_TRANSPARENT) {
        /* [ left, right, y ] */
        let centerVertices: number[] = [];
        
        let left = note._x / 16.0;
        let right = (note._x + note._width) / 16.0;
        let beginCenterX = rm._rect._left + rm._rect._width * (left + right) / 2.0;
        centerVertices.push(
          beginCenterX - CHART_FIELD_SLIDE_CENTER_X,
          beginCenterX + CHART_FIELD_SLIDE_CENTER_X,
          ChartRenderer._calcFieldYFromTick(rm, note._tick));

        for(const childNote of note._childNodes as Ug.AirCrushAction[]) {
          if (childNote._type === Ug.AirCrushActionType.STEP && note._lastChild !== childNote)
            continue;

          left = childNote._x / 16.0;
          right = (childNote._x + childNote._width) / 16.0;
          beginCenterX = rm._rect._left + rm._rect._width * (left + right) / 2.0;
          centerVertices.push(
            beginCenterX - CHART_FIELD_SLIDE_CENTER_X,
            beginCenterX + CHART_FIELD_SLIDE_CENTER_X,
            ChartRenderer._calcFieldYFromTick(rm, childNote._tick));
        }
            
        ctx.beginPath();
        ctx.moveTo(centerVertices[0], centerVertices[2]);
        for(let i = 3; i < centerVertices.length; i += 3)
          ctx.lineTo(centerVertices[i], centerVertices[i + 2]);
        for(let i = centerVertices.length - 3; i >= 0; i -= 3)
          ctx.lineTo(centerVertices[i + 1], centerVertices[i + 2]);
        ctx.fillStyle = CHART_FIELD_COLOR_AIR_CRUSH_CUSTOM[note._variationId] || CHART_FIELD_COLOR_AIR_CRUSH_CENTER;
        ctx.closePath();
        ctx.fill();
      }

      // 側面図
      ctx.beginPath();
      ctx.moveTo(
        MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, note._height / CHART_FIELD_SIDEVIEW_LANES),
        ChartRenderer._calcFieldYFromTick(rm, note._tick));
      for(const childNote of note._childNodes as Ug.AirCrushAction[]) {
        if (childNote._type === Ug.AirCrushActionType.STEP && note._lastChild !== childNote)
          continue;

        ctx.lineTo(
          MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, childNote._height / CHART_FIELD_SIDEVIEW_LANES),
          ChartRenderer._calcFieldYFromTick(rm, childNote._tick));
      }
      ctx.strokeStyle = CHART_FIELD_COLOR_AIR_CRUSH_CUSTOM[note._variationId] || CHART_FIELD_COLOR_AIR_CRUSH_CENTER;
      ctx.lineWidth = CHART_FIELD_SLIDE_CENTER_X;
      ctx.stroke();
    }

  }

  private _drawGroundedShortNotes(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || note._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd || !note._isTap())
          continue;
        if (note._timelineId !== this._state._activeTimelineId)
          continue;
        ChartRenderer._drawTap(ctx, rm, note);
      }
    }
  
  }

  private _drawGroundedLongNotes(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !note._isGroundedLongParent() || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        if (note._tick >= rm._visibleRangeBegin && note._tick <= rm._visibleRangeEnd &&
            note._timelineId == this._state._activeTimelineId)
          ChartRenderer._drawTap(ctx, rm, note);

        for(const child of note._childNodes as Ug.Note[]) {
          if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
            child._timelineId == this._state._activeTimelineId)
            ChartRenderer._drawTap(ctx, rm, child);
        }
      }
    }
  
  }

  private _drawAirHoldNotes(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirHold) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        if (note._timelineId == this._state._activeTimelineId)
          ChartRenderer._sideViewDrawAirPoint(ctx, rm, note);
        
        for(const child of note._childNodes as Ug.Note[]) {
          if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
            child._timelineId == this._state._activeTimelineId) {
              ChartRenderer._drawAirAction(ctx, rm, child as Ug.AirHoldAction);
              ChartRenderer._sideViewDrawAirPoint(ctx, rm, child as Ug.AirHoldAction);
          }
        }
      }
    }
  
  }

  private _drawAirSlideNotes(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirSlide) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;

        if (note._timelineId == this._state._activeTimelineId)
          ChartRenderer._sideViewDrawAirPoint(ctx, rm, note);
        
        for(const child of note._childNodes as Ug.Note[]) {
          if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
            child._timelineId == this._state._activeTimelineId) {
            ChartRenderer._drawAirAction(ctx, rm, child as Ug.AirSlideAction);
            ChartRenderer._sideViewDrawAirPoint(ctx, rm, child as Ug.AirSlideAction);
          }
        }
      }
    }
  
  }

  private _drawAirCrushNotes(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || !(note instanceof Ug.AirCrush) || (note._lastChild as Ug.Note)._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        
        if (note._tick >= rm._visibleRangeBegin && note._tick <= rm._visibleRangeEnd &&
          note._timelineId == this._state._activeTimelineId) {
          ChartRenderer._drawAirCrushAction(ctx, rm, note, note._x + note._width / 2.0, note._width);
          ChartRenderer._sideViewDrawAirPoint(ctx, rm, note);
        }
        
        let queue: Ug.AirCrushAction[] = [];
        let lastControlNote: Ug.AirCrush|Ug.AirCrushAction = note;
        for(const child of note._childNodes as Ug.AirCrushAction[]) {
          if (child._type === Ug.AirCrushActionType.STEP && note._lastChild !== child) {
            queue.push(child);
          }
          else {
            for(const queueNote of queue) {
              let pt = MathUtil.relative(lastControlNote._tick, child._tick, queueNote._tick);
              if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
                queueNote._timelineId === this._state._activeTimelineId) {

                ChartRenderer._drawAirCrushAction(
                  ctx, rm, queueNote,
                  MathUtil.mix(lastControlNote._x + lastControlNote._width / 2.0, child._x + child._width / 2.0, pt),
                  MathUtil.mix(lastControlNote._width, child._width, pt));
              }
            }

            queue = [];
            if (child._tick >= rm._visibleRangeBegin && child._tick <= rm._visibleRangeEnd &&
              child._timelineId == this._state._activeTimelineId) {
              ChartRenderer._drawAirCrushAction(ctx, rm, child, child._x + child._width / 2.0, child._width);
              ChartRenderer._sideViewDrawAirPoint(ctx, rm, child);
            }
            
            lastControlNote = child;

          }
        }

      }
    }
  
  }

  private _drawAir(ctx: CanvasRenderingContext2D, rm: RenderMeasures) {
    for (let w = 16; w > 0; --w) {
      for(const note of this._chart._notes._childNodes as Ug.Note[]) {
        if (note._width !== w || note._tick < rm._visibleRangeBegin || note._tick > rm._visibleRangeEnd)
          continue;
        if (!(note instanceof Ug.Air || note instanceof Ug.AirHold || note instanceof Ug.AirSlide))
          continue;
        if (note._timelineId !== this._state._activeTimelineId)
          continue;
        
        let pairNote = note._getPair();
        if (!pairNote)
          continue;
        
        let airDirection = note instanceof Ug.Air ? note._direction : Ug.AirDirection.UP;
        let inverted = note instanceof Ug.Air ? note._inverted :
                        note instanceof Ug.AirHold ? note._inverted :
                        note instanceof Ug.AirSlide ? note._inverted : false;
        
        let y = ChartRenderer._calcFieldYFromTick(rm, pairNote._tick);
        let centerX = MathUtil.mix(rm._rect._left, rm._rect._right, (pairNote._x + pairNote._width / 2.0) / 16.0);
        let realWidth = (rm._rect._width * pairNote._width / 16.0 * AIR_WIDTH_RATIO[Math.min(Math.max(pairNote._width, 0), 16)]);
        let left = centerX - realWidth / 2;
        let right = centerX + realWidth / 2;

    		// 三角を作る (左下から時計回り)
        
				let offsetX = 0, offsetCenterX = 0;
				let offsetXCoef = 0.0;
        let isAirDown = false;

        ctx.beginPath();
        switch (airDirection) {
          case Ug.AirDirection.UP:
            ctx.moveTo(left, y - 8.0);
            ctx.lineTo(left, y - 32.0);
            ctx.lineTo(centerX, y - 42.0);
            ctx.lineTo(right, y - 32.0);
            ctx.lineTo(right, y - 8.0);
            ctx.lineTo(centerX, y - 18.0);
            ctx.closePath();
            isAirDown = false;
            break;
        
          case Ug.AirDirection.DOWN:
            ctx.moveTo(left, y - 42.0);
            ctx.lineTo(left, y - 18.0);
            ctx.lineTo(centerX, y - 8.0);
            ctx.lineTo(right, y - 18.0);
            ctx.lineTo(right, y - 42.0);
            ctx.lineTo(centerX, y - 32.0);
            ctx.closePath();
            isAirDown = true;
            break;
        
          case Ug.AirDirection.UPLEFT:
          case Ug.AirDirection.UPRIGHT:
            offsetX = 18 * (airDirection === Ug.AirDirection.UPLEFT ? -1 : 1);
            offsetCenterX = Math.min(pairNote._width * 1.5, realWidth / 8) * (airDirection === Ug.AirDirection.UPLEFT ? -1 : 1);
            offsetXCoef = offsetX / 34.0;

            ctx.moveTo(left, y - 8.0);
            ctx.lineTo(left + offsetXCoef * 24.0, y - 32.0);
            ctx.lineTo(centerX + offsetCenterX + offsetX, y - 42.0);
            ctx.lineTo(right + offsetXCoef * 24.0, y - 32.0);
            ctx.lineTo(right, y - 8.0);
            ctx.lineTo(centerX + offsetCenterX + offsetXCoef * 10.0, y - 18.0);
            ctx.closePath();
            isAirDown = false;
            break;
        
          case Ug.AirDirection.DOWNLEFT:
          case Ug.AirDirection.DOWNRIGHT:
            offsetX = 18 * (airDirection === Ug.AirDirection.DOWNRIGHT ? -1 : 1);
            offsetCenterX = Math.min(pairNote._width * 1.5, realWidth / 8) * (airDirection === Ug.AirDirection.DOWNRIGHT ? 1 : -1);
            offsetXCoef = offsetX / 34.0;

            ctx.moveTo(left + offsetX, y - 42.0);
            ctx.lineTo(left + offsetXCoef * 10.0, y - 18.0);
            ctx.lineTo(centerX + offsetCenterX, y - 8.0);
            ctx.lineTo(right + offsetXCoef * 10.0, y - 18.0);
            ctx.lineTo(right + offsetX, y - 42.0);
            ctx.lineTo(centerX + offsetCenterX + offsetXCoef * 24.0, y - 32.0);
            ctx.closePath();
            isAirDown = true;
            break;
        }

        ctx.fillStyle = isAirDown === inverted ? CHART_FIELD_COLOR_AIR_UP : CHART_FIELD_COLOR_AIR_DOWN;
        ctx.fill();

        ctx.strokeStyle = CHART_FIELD_COLOR_AIR_EDGE;
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  
  }

  private static _drawTap(ctx: CanvasRenderingContext2D, rm: RenderMeasures, note: Ug.Note) {
    let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);
    let noteXCenter = MathUtil.mixi(rm._rect._left, rm._rect._right, (note._x + note._width / 2.0) / 16.0);
    
    if (note instanceof Ug.Tap)
      ctx.fillStyle = CHART_FIELD_COLOR_TAP;
    else if (note instanceof Ug.ExTap)
      ctx.fillStyle = CHART_FIELD_COLOR_EXTAP;
    else if (note instanceof Ug.Flick)
      ctx.fillStyle = CHART_FIELD_COLOR_FLICK_BG;
    else if (note instanceof Ug.Damage)
      ctx.fillStyle = CHART_FIELD_COLOR_DAMAGE;
    else if (note instanceof Ug.Slide || note instanceof Ug.SlideChild)
      ctx.fillStyle = note._getPair()?._isAir() ? CHART_FIELD_COLOR_AIR_UP : CHART_FIELD_COLOR_SLIDE_STEP;
    else if (note instanceof Ug.Hold || note instanceof Ug.HoldChild)
      ctx.fillStyle = note._getPair()?._isAir() ? CHART_FIELD_COLOR_AIR_UP : CHART_FIELD_COLOR_HOLD_STEP;

    ctx.beginPath();
    if (note instanceof Ug.Damage) {
      ctx.rect(
        MathUtil.mixi(rm._rect._left, rm._rect._right, note._x / 16.0) + 1.0, y - CHART_FIELD_NOTE_HEIGHT / 2.0,
        note._width / 16.0 * rm._rect._width - 2.0, CHART_FIELD_NOTE_HEIGHT);
    }
    else {
      ctx.roundRect(
        MathUtil.mixi(rm._rect._left, rm._rect._right, note._x / 16.0) + 1.0, y - CHART_FIELD_NOTE_HEIGHT / 2.0,
        note._width / 16.0 * rm._rect._width - 2.0, CHART_FIELD_NOTE_HEIGHT,
        2.0);
    }
    if (!(note instanceof Ug.SlideChild && note._type !== Ug.SlideChildType.STEP))
      ctx.fill();

    ctx.strokeStyle = CHART_FIELD_COLOR_BORDER;
    ctx.lineWidth = CHART_FIELD_LINE_WIDTH;
    ctx.stroke();

    if (note instanceof Ug.Flick) {
      // inner
      ctx.fillStyle = CHART_FIELD_COLOR_FLICK_FG;
			let fgWidth = (rm._rect._width * note._width / 16.0 * AIR_WIDTH_RATIO[Math.min(Math.max(note._width, 0), 16)]);
      ctx.fillRect(
        noteXCenter - fgWidth / 2.0, y - CHART_FIELD_NOTE_HEIGHT / 2.0,
        fgWidth, CHART_FIELD_NOTE_HEIGHT);
    }
      
    // TAPの白線
    if (!(note instanceof Ug.Damage || note instanceof Ug.SlideChild || note instanceof Ug.HoldChild)) {
      let tapLineWidth = (rm._rect._width * note._width / 16.0 * AIR_WIDTH_RATIO[Math.min(Math.max(note._width, 0), 16)]);
      if (note instanceof Ug.Flick)
        tapLineWidth *= 0.75;
      ctx.fillStyle = CHART_FIELD_COLOR_TAP_LINE;
      ctx.fillRect(
        noteXCenter - tapLineWidth / 2.0, y - 1,
        tapLineWidth, 2);
    }
  }

  private static _drawAirAction(ctx: CanvasRenderingContext2D, rm: RenderMeasures, note: Ug.AirHoldAction|Ug.AirSlideAction) {
    let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);

    ctx.beginPath();
    ctx.rect(
      MathUtil.mixi(rm._rect._left, rm._rect._right, note._x / 16.0) + 1.0, y - CHART_FIELD_AIR_ACTION_NOTE_HEIGHT / 2.0,
      note._width / 16.0 * rm._rect._width - 2.0, CHART_FIELD_AIR_ACTION_NOTE_HEIGHT);
    
    if (note._type === Ug.AirActionType.STEP) {
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_ACTION;
      ctx.fill();
    }

    ctx.strokeStyle = CHART_FIELD_COLOR_BORDER;
    ctx.lineWidth = CHART_FIELD_LINE_WIDTH;
    ctx.stroke();
  }

  private static _sideViewDrawAirPoint(ctx: CanvasRenderingContext2D, rm: RenderMeasures, note: Ug.AirHold|Ug.AirHoldAction|Ug.AirSlide|Ug.AirSlideAction|Ug.AirCrush|Ug.AirCrushAction) {
    let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);

    ctx.beginPath();
    ctx.rect(
      MathUtil.mixi(rm._sideRect._right, rm._sideRect._left, note._height / CHART_FIELD_SIDEVIEW_LANES) - CHART_FIELD_SIDEVIEW_NOTE_WIDTH / 2.0, y - CHART_FIELD_SIDEVIEW_NOTE_HEIGHT / 2.0,
		  CHART_FIELD_SIDEVIEW_NOTE_WIDTH, CHART_FIELD_SIDEVIEW_NOTE_HEIGHT);
    
    if ((note instanceof Ug.AirHoldAction || note instanceof Ug.AirSlideAction) && note._type === Ug.AirActionType.STEP) {
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_ACTION;
      ctx.fill();
    }
    else if ((note instanceof Ug.AirCrush && !note._noAction) || (note instanceof Ug.AirCrushAction && note._type === Ug.AirCrushActionType.STEP)) {
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_CRUSH;
      ctx.fill();
    }

    ctx.strokeStyle = CHART_FIELD_COLOR_BORDER;
    ctx.lineWidth = CHART_FIELD_LINE_WIDTH;
    ctx.stroke();
  }

  private static _drawAirCrushAction(ctx: CanvasRenderingContext2D, rm: RenderMeasures,
    note: Ug.AirCrush|Ug.AirCrushAction, centerX: number, width: number) {
    let y = ChartRenderer._calcFieldYFromTick(rm, note._tick);

    ctx.beginPath();
    ctx.rect(
      MathUtil.mixi(rm._rect._left, rm._rect._right, (centerX - width / 2.0) / 16.0) + 1.0, y - CHART_FIELD_AIR_ACTION_NOTE_HEIGHT / 2.0,
      width / 16.0 * rm._rect._width - 2.0, CHART_FIELD_AIR_ACTION_NOTE_HEIGHT);
    
    if (note instanceof Ug.AirCrush && !note._noAction) {
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_CRUSH;
      ctx.fill();

      ctx.strokeStyle = CHART_FIELD_COLOR_AIR_CRUSH_EMP;
      ctx.lineWidth = CHART_FIELD_LINE_WIDTH;
      ctx.stroke();

      ctx.beginPath();
      ctx.rect(
        MathUtil.mixi(rm._rect._left, rm._rect._right, (centerX - width / 2.0) / 16.0), y - CHART_FIELD_AIR_ACTION_NOTE_HEIGHT / 2.0 - 1.0,
        width / 16.0 * rm._rect._width, CHART_FIELD_AIR_ACTION_NOTE_HEIGHT + 2.0);
    }
    else if (note instanceof Ug.AirCrushAction && note._type === Ug.AirCrushActionType.STEP) {
      ctx.fillStyle = CHART_FIELD_COLOR_AIR_CRUSH;
      ctx.fill();
    }

    ctx.strokeStyle = CHART_FIELD_COLOR_BORDER;
    ctx.lineWidth = CHART_FIELD_LINE_WIDTH;
    ctx.stroke();
  }
}

function canvasDrawLine(ctx: CanvasRenderingContext2D,
  x1: number, y1: number, x2: number, y2: number,
  color: string, width: number) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
