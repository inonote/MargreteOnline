import { createDivElement } from "../ui/element-util";
import { Frame } from "../ui/frame";
import * as Ug from "../chart/chart";
import { ChartRenderer, HitTestTargetType } from "./chart-renderer";
import { ChartMgxcParser } from "../chart/parser/mgxc";
import { TEST_CHART } from "./test-chart";
import * as MouseActions from "./chart-view-mouse-actions";
import { UndoBuffer } from "../undo-buffer";

const MOUSE_ACTION_LIST : (typeof MouseActions.ChartViewMouseAction)[] = [
  MouseActions.ChartViewMouseActionScrollThumb,
  MouseActions.ChartViewMouseActionInsertNote,
  MouseActions.ChartViewMouseActionMoveNote,
  MouseActions.ChartViewMouseActionResizeNote,
];

export type ChartViewCursorType = "default"|"move"|"ew-resize"|"ns-resize"|"not-allowed";
export const SCROLLV_LINE = 240;

export class SelectRange {
  _isSelected: boolean = false;
  _beginX: number = 0;
  _beginTick: Ug.Tick = 0;
  _endX: number = 0;
  _endTick: Ug.Tick = 0;
}



export class GhostNote {
  _isVisible: boolean = false;
  _x: number = 0;
  _tick: Ug.Tick = 0;
  width: number = 1;
}



export class ChartViewState {
  _screenWidth: number = 0;
  _screenHeight: number = 0;

  _cursorTick: Ug.Tick = 0;
  _playbackSeek: Ug.Tick = 0;
  _isPlaying: boolean = false;

  _snapTick: Ug.Tick = 240;

  _scrollY: Ug.Tick = 0;
  _lastTick: Ug.Tick = 0;

  _zoomLevel: number = 0;

  _selectRange: SelectRange = new SelectRange();
  _selectRangeBegin: SelectRange = new SelectRange();
  _selectedNotes: Ug.Note[] = [];
  _oldSelectedNotePos: Ug.NotePosition[] = [];
  
  _selectedNotesIndividual: Ug.Note[] = [];
  _oldSelectedNotePosIndividual: Ug.NotePosition[] = [];

  _lastNoteWidth: number = 4;
  _isVisibledControlNotes: boolean = true;

  _activeTimelineId: number = 0;

  _ghostNote: GhostNote = new GhostNote();

	updateZoomLevel(lv: number) { this._zoomLevel = Math.min(Math.max(lv, 0), 9); }
	canZoomIn() : boolean { return this._zoomLevel < 9; }
	canZoomOut() : boolean { return this._zoomLevel > 0; }
}



export class ChartView {
  protected _frame: Frame;

  protected _elmCanvas: HTMLCanvasElement;
  protected _elmSizeTracer: HTMLDivElement;

  protected _dirty: boolean = true;

  protected _chart: Ug.Chart = new Ug.Chart();
  protected _viewState: ChartViewState = new ChartViewState();
  protected _undoBuffer: UndoBuffer;
  protected _renderer: ChartRenderer;

  protected _windowScale: number = 1.0;

  protected _mouseAction?: MouseActions.ChartViewMouseAction;

  get _currentChart() { return this._chart; }
  get _currentViewState() { return this._viewState; }
  get _currentUndoBuffer() { return this._undoBuffer; }

  constructor(frame: Frame) {
    this._frame = frame;

    this._elmSizeTracer = createDivElement("ui-chart-view");
    this._frame._getHtmlElement().appendChild(this._elmSizeTracer);
    
    this._elmCanvas = document.createElement("canvas");
    this._elmSizeTracer.appendChild(this._elmCanvas);
    this._adjustLayout();

    this._elmCanvas.addEventListener("wheel", e => this._onMouseWheel(e));
    this._elmCanvas.addEventListener("pointerdown", e => this._onPointerDown(e));
    this._elmCanvas.addEventListener("pointerup", e => this._onPointerUp(e));
    this._elmCanvas.addEventListener("pointermove", e => this._onPointerMove(e));
    window.addEventListener("keydown", e => this._onKeyDown(e) || (e.preventDefault(), e.stopPropagation()));

    let chart = ChartMgxcParser._parse(TEST_CHART);
    console.log(chart);
    this._chart = chart || new Ug.Chart();
    this._renderer = new ChartRenderer(this._viewState, this._chart);
    this._undoBuffer = new UndoBuffer(this._chart);

    this._viewState._lastTick = this._chart._getLastTick();
  }

  _invalidateView() {
    this._dirty = true;
  }

  _adjustLayout() {
    this._windowScale = window.devicePixelRatio || 1.0;
    this._elmCanvas.style.width = this._elmSizeTracer.clientWidth + "px";
    this._elmCanvas.style.height = this._elmSizeTracer.clientHeight + "px";
    
    let newCanvasWidth = this._elmSizeTracer.clientWidth * this._windowScale;
    let newCanvasHeight = this._elmSizeTracer.clientHeight * this._windowScale;
    if (this._elmCanvas.width !== newCanvasHeight || this._elmCanvas.height !== newCanvasHeight) {
      this._elmCanvas.width = newCanvasWidth;
      this._elmCanvas.height = newCanvasHeight;
      this._dirty = true;
    }
  }

  _onMouseWheel(e: WheelEvent) {
    this._viewState._scrollY += -e.deltaY / 40 * SCROLLV_LINE / this._renderer._getZoomCoef();
    if (this._viewState._scrollY < 0)
      this._viewState._scrollY = 0;
    this._dirty = true;
  }

  _onPointerDown(e: PointerEvent) {
    if (e.button !== 0)
      return;
      
    this._elmCanvas.setPointerCapture(e.pointerId);
    
    let hitTestResult = this._renderer._hitTest(e.offsetX, e.offsetY);
    let mouseActionClass = MOUSE_ACTION_LIST.find(x => x._isOwnAction(hitTestResult));
    if (!mouseActionClass)
      return;
    
    this._undoBuffer._beginRecording();
    this._mouseAction = new mouseActionClass(this, hitTestResult);
    this._mouseAction._start();
  }

  _onPointerUp(e: PointerEvent) {
    if (e.button !== 0)
      return;

    this._elmCanvas.releasePointerCapture(e.pointerId);

    if (!this._mouseAction)
      return;

    this._mouseAction._move(
      e.offsetX, e.offsetY,
      this._renderer._getCursorPosition(e.offsetX, e.offsetY));
    this._mouseAction._end();
    this._mouseAction = undefined;
    this._undoBuffer._commitRecording();
  }

  _onPointerMove(e: PointerEvent) {
    if (!this._mouseAction) {
      let hitTestResult = this._renderer._hitTest(e.offsetX, e.offsetY);
      let mouseActionClass = MOUSE_ACTION_LIST.find(x => x._isOwnAction(hitTestResult));
      if (!mouseActionClass)
        this._setCursor("default");
      else
        this._setCursor(mouseActionClass._getCusror(hitTestResult));
      return;
    }
    
    this._mouseAction._move(
      e.offsetX, e.offsetY,
      this._renderer._getCursorPosition(e.offsetX, e.offsetY));
  }

  _onKeyDown(e: KeyboardEvent) : boolean {
    if (this._mouseAction) {
      if (e.key === "Escape") { // ドラッグをキャンセル
        this._mouseAction._cancel();
        this._mouseAction = undefined;
        this._undoBuffer._discardRecording();
      }
      return true;
    }
    return false;
  }

  _draw() {
    this._viewState._screenWidth = this._elmSizeTracer.clientWidth;
    this._viewState._screenHeight = this._elmSizeTracer.clientHeight;

    if (!this._dirty)
      return;
    this._dirty = false;
    
    let ctx = this._elmCanvas.getContext("2d");
    if (!ctx)
      return;
    
    ctx.resetTransform();
    ctx.scale(this._windowScale, this._windowScale);
    this._renderer._draw(ctx);
  }
  
  _setCursor(cursorType: ChartViewCursorType) {
    this._elmCanvas.style.cursor = cursorType;
  }

  _undo() {
    if (this._undoBuffer._undo())
      this._invalidateView();
  }

  _redo() {
    if (this._undoBuffer._redo())
      this._invalidateView();
  }
}
