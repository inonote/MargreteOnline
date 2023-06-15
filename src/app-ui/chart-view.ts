import { createDivElement } from "../ui/element-util";
import { Frame } from "../ui/frame";
import * as Ug from "../chart/chart";
import { ChartRenderer } from "./chart-renderer";
import { ChartMgxcParser } from "../chart/parser/mgxc";
import { TEST_CHART } from "./test-chart";

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



export enum DragMode {
  DRAG_MODE_NONE = 0,

  // 移動
  DRAG_MODE_MOVE,

  // 大きさ変更左
  DRAG_MODE_RESIZE_L,

  // 大きさ変更右
  DRAG_MODE_RESIZE_R,

  // 選択開始
  DRAG_MODE_SELECT,

  // 選択範囲移動
  DRAG_MODE_MOVE_SELECTION,

  // 選択範囲 大きさ変更終
  DRAG_MODE_RESIZE_END_SELECTION,
  DRAG_MODE_RESIZE_BEGIN_SELECTION,
  DRAG_MODE_RESIZE_LEFT_SELECTION,
  DRAG_MODE_RESIZE_RIGHT_SELECTION,

  // 側面表示 - 移動
  DRAG_MODE_SIDEVIEW_MOVE,
  DRAG_MODE_SIDEVIEW_HEIGHT_MOVE_SELECTION,

  // 正面表示 - 移動
  DRAG_MODE_FRONTVIEW_MOVE,
  DRAG_MODE_FRONTVIEW_MOVE_HEIGHT,
  DRAG_MODE_FRONTVIEW_RESIZE_L,
  DRAG_MODE_FRONTVIEW_RESIZE_R,
} 

export class DragState {
  _isDragging: boolean = false;
  _mode: DragMode = DragMode.DRAG_MODE_NONE;
  _targetNote?: Ug.Note;
  _targetOffsetMouseX: number = 0;
  _targetOffsetMouseY: number = 0;
  _startX: number = 0;
  _startTick: Ug.Tick = 0;
  _startHeight: number = 0;
}



export class ChartViewState {
  _screenWidth: number = 0;
  _screenHeight: number = 0;

  _cursorTick: Ug.Tick = 0;
  _playbackSeek: Ug.Tick = 0;
  _isPlaying: boolean = false;

  _snapTick: Ug.Tick = 480;

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

  _dragState: DragState = new DragState();

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
  protected _renderer: ChartRenderer;

  protected _windowScale: number = 1.0;

  constructor(frame: Frame) {
    this._frame = frame;

    this._elmSizeTracer = createDivElement("ui-chart-view");
    this._frame._getHtmlElement().appendChild(this._elmSizeTracer);
    
    this._elmCanvas = document.createElement("canvas");
    this._elmSizeTracer.appendChild(this._elmCanvas);
    this._adjustLayout();

    this._elmCanvas.addEventListener("wheel", e => this._onMouseWheel(e));

    let chart = ChartMgxcParser._parse(TEST_CHART);
    console.log(chart);
    this._chart = chart || new Ug.Chart();
    this._renderer = new ChartRenderer(this._viewState, this._chart);
  }

  _adjustLayout() {
    this._windowScale = window.devicePixelRatio || 1.0;
    this._elmCanvas.style.width = this._elmSizeTracer.clientWidth + "px";
    this._elmCanvas.style.height = this._elmSizeTracer.clientHeight + "px";
    
    let newCanvasWidth = this._elmSizeTracer.clientWidth * this._windowScale;
    let newCanvasHeight = this._elmSizeTracer.clientHeight * this._windowScale;
    if (this._elmCanvas.width !== newCanvasHeight || this._elmCanvas.height !== newCanvasHeight) {
      this._elmCanvas.width = this._elmSizeTracer.clientWidth * this._windowScale;
      this._elmCanvas.height = this._elmSizeTracer.clientHeight * this._windowScale;
      this._dirty = true;
    }
  }

  _onMouseWheel(e: WheelEvent) {
    this._viewState._scrollY += -e.deltaY / 40 * SCROLLV_LINE / this._renderer._getZoomCoef();
    if (this._viewState._scrollY < 0)
      this._viewState._scrollY = 0;
    this._dirty = true;
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
  
}
