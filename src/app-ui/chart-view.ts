import { createDivElement } from "../ui/element-util";
import { Frame } from "../ui/frame";
import * as Ug from "../chart/chart";
import { ChartRenderer, HitTestTargetType } from "./chart-renderer";
import { ChartMgxcParser } from "../chart/parser/mgxc";
import { TEST_CHART } from "./test-chart";
import * as MouseActions from "./chart-view-mouse-actions";
import { UndoBuffer } from "../undo-buffer";
import { MenuItem, MenuItemSeparator, MenuItemStatic, ContextMenu } from "../ui/menu";
import { CommandActionNoteConvertType, CommandActionNoteProperty } from "../command-actions/command-action-notes";

const MOUSE_ACTION_LIST : (typeof MouseActions.ChartViewMouseAction)[] = [
  MouseActions.ChartViewMouseActionScrollThumb,
  MouseActions.ChartViewMouseActionInsertChildNote,
  MouseActions.ChartViewMouseActionInsertNote,
  MouseActions.ChartViewMouseActionResizeNote,
  MouseActions.ChartViewMouseActionMoveNote,
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



export enum NoteTypeId {
  Tap = "Tap",
  ExTap = "ExTap",
  Flick = "Flick",
  Slide = "Slide",
  SlideStep = "SlideStep",
  Hold = "Hold",
  AirUp = "AirUp",
  AirUpLeft = "AirUpLeft",
  AirUpRight = "AirUpRight",
  AirDown = "AirDown",
  AirDownLeft = "AirDownLeft",
  AirDownRight = "AirDownRight",
  AirHold = "AirHold",
  AirSlide = "AirSlide",
  AirSlideControl = "AirSlideControl",
  AirCrush = "AirCrush",
  AirCrushControl = "AirCrushControl",
  Damage = "Damage",
  Click = "Click",
}


enum MenuItemIdToExTapDirection {
  "attr-Dir-Up" = Ug.ExTapDirection.UP,
  "attr-Dir-Down" = Ug.ExTapDirection.DOWN,
  "attr-Dir-Center" = Ug.ExTapDirection.CENTER,
  "attr-Dir-Left" = Ug.ExTapDirection.LEFT,
  "attr-Dir-Right" = Ug.ExTapDirection.RIGHT,
  "attr-Dir-Rotate-Left" = Ug.ExTapDirection.ROTATE_LEFT,
  "attr-Dir-Rotate-Right" = Ug.ExTapDirection.ROTATE_RIGHT,
  "attr-Dir-In-Out" = Ug.ExTapDirection.INOUT,
  "attr-Dir-Out-In" = Ug.ExTapDirection.OUTIN,
}


enum MenuItemIdToAirDirection {
  "attr-Dir-Up" = Ug.AirDirection.UP,
  "attr-Dir-UpLeft" = Ug.AirDirection.UPLEFT,
  "attr-Dir-UpRight" = Ug.AirDirection.UPRIGHT,
  "attr-Dir-Down" = Ug.AirDirection.DOWN,
  "attr-Dir-DownLeft" = Ug.AirDirection.DOWNLEFT,
  "attr-Dir-DownRight" = Ug.AirDirection.DOWNRIGHT
}



export class ChartView {
  protected _frame: Frame;

  protected _elmCanvas: HTMLCanvasElement;
  protected _elmSizeTracer: HTMLDivElement;

  protected _contextMenu: ContextMenu;

  protected _dirty: boolean = true;

  protected _chart: Ug.Chart = new Ug.Chart();
  protected _viewState: ChartViewState = new ChartViewState();
  protected _undoBuffer: UndoBuffer;
  protected _renderer: ChartRenderer;

  protected _windowScale: number = 1.0;

  protected _mouseAction?: MouseActions.ChartViewMouseAction;

  protected _activeNoteType: NoteTypeId = NoteTypeId.Tap;

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
    this._elmCanvas.addEventListener("contextmenu", (e) => this._onContextMenu(e));
    window.addEventListener("keydown", e => this._onKeyDown(e) || (e.preventDefault(), e.stopPropagation()));

    let chart = ChartMgxcParser._parse(TEST_CHART);
    console.log(chart);
    this._chart = chart || new Ug.Chart();
    this._renderer = new ChartRenderer(this._viewState, this._chart);
    this._undoBuffer = new UndoBuffer(this._chart);

    this._viewState._lastTick = this._chart._getLastTick();

    this._contextMenu = new ContextMenu(this._frame);
    this._contextMenu._appendNestedMenuItems([
      new MenuItem("cut-notes", "ノーツを切り取り", "Ctrl + X"),
      new MenuItem("copy-notes", "ノーツをコピー", "Ctrl + C"),
      new MenuItem("copy-events", "イベントをコピー", "Ctrl + Shift + C"),
      new MenuItem("paste", "貼り付け", "Ctrl + V"),
      new MenuItem("paste-fliped", "左右反転貼り付け", "Ctrl + Shift + V"),
      new MenuItemSeparator(),
      [
        new MenuItem("menu-note-conv-tap", "ノーツ変換"),
        new MenuItem("conv-Tap", "TAP"),
        new MenuItem("conv-ExTap", "ExTAP"),
        new MenuItem("conv-Flick", "FLICK"),
        new MenuItem("conv-Damage", "DAMAGE"),
      ],
      [
        new MenuItem("menu-note-attr-flick", "ノーツ属性"),
        new MenuItemStatic("自動プレイ時エフェクト方向"),
        new MenuItem("attr-Dir-Auto", "自動"),
        new MenuItem("attr-Dir-Left", "左"),
        new MenuItem("attr-Dir-Right", "右"),
      ],
      [
        new MenuItem("menu-note-attr-extap", "ノーツ属性"),
        new MenuItemStatic("背景エフェクト方向"),
        new MenuItem("attr-Dir-Up", "上"),
        new MenuItem("attr-Dir-Down", "下"),
        new MenuItem("attr-Dir-Center", "集中線"),
        new MenuItem("attr-Dir-Left", "左"),
        new MenuItem("attr-Dir-Right", "右"),
        new MenuItem("attr-Dir-Rotate-Left", "回転 - 反時計回り"),
        new MenuItem("attr-Dir-Rotate-Right", "回転 - 時計回り"),
        new MenuItem("attr-Dir-In-Out", "内側から外側"),
        new MenuItem("attr-Dir-Out-In", "外側から内側"),
      ],
      [
        new MenuItem("menu-note-attr-air", "ノーツ属性"),
        new MenuItemStatic("方向"),
        new MenuItem("attr-Dir-Up", "上"),
        new MenuItem("attr-Dir-UpLeft", "左上"),
        new MenuItem("attr-Dir-UpRight", "右上"),
        new MenuItem("attr-Dir-Down", "下"),
        new MenuItem("attr-Dir-DownLeft", "左下"),
        new MenuItem("attr-Dir-DownRight", "右下"),
        new MenuItemSeparator(),
        new MenuItem("attr-Invert", "色反転"),
      ],
      [
        new MenuItem("menu-note-attr-airhold", "ノーツ属性"),
        new MenuItem("attr-Invert", "色反転"),
      ],
      [
        new MenuItem("menu-note-attr-slide", "ノーツ属性"),
        new MenuItem("attr-Step", "中継点"),
        new MenuItem("attr-Control", "制御点"),
      ],
      [
        new MenuItem("menu-note-attr-aircrush", "ノーツ属性"),
        new MenuItem("attr-Step", "ノーツ有"),
        new MenuItem("attr-Control", "ノーツ無"),
      ],
      new MenuItem("menu-note-attr-none", "(変形項目なし)", undefined, { _disabled: true }),
    ]);
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
    this._viewState._scrollY += Math.round(-e.deltaY / 40 * SCROLLV_LINE / this._renderer._getZoomCoef());
    if (this._viewState._scrollY < 0)
      this._viewState._scrollY = 0;
    this._dirty = true;
  }

  _onPointerDown(e: PointerEvent) {
    if (e.button !== 0)
      return;
      
    this._elmCanvas.setPointerCapture(e.pointerId);
    
    let hitTestResult = this._renderer._hitTest(e.offsetX, e.offsetY);
    let mouseActionClass = MOUSE_ACTION_LIST.find(x => x._isOwnAction(this, hitTestResult));
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
      let mouseActionClass = MOUSE_ACTION_LIST.find(x => x._isOwnAction(this, hitTestResult));
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
  
 async  _onContextMenu(e: MouseEvent) {
    let hitTestResult = this._renderer._hitTest(e.offsetX, e.offsetY);
    let menuStates = new Map(Object.entries({
      "menu-note-conv-tap": false,
      "menu-note-attr-flick": false,
      "menu-note-attr-extap": false,
      "menu-note-attr-air": false,
      "menu-note-attr-airhold": false,
      "menu-note-attr-slide": false,
      "menu-note-attr-aircrush": false,
    }));

    if (hitTestResult._target instanceof Ug.Note && hitTestResult._target._isTap())
      menuStates.set("menu-note-conv-tap", true);

    if (hitTestResult._target instanceof Ug.Flick)
      menuStates.set("menu-note-attr-flick", true);
    else if (hitTestResult._target instanceof Ug.ExTap)
      menuStates.set("menu-note-attr-extap", true);
    else if (hitTestResult._target instanceof Ug.Air)
      menuStates.set("menu-note-attr-air", true);
    else if (hitTestResult._target instanceof Ug.AirHoldAction)
      menuStates.set("menu-note-attr-airhold", true);
    else if (hitTestResult._target instanceof Ug.SlideChild)
      menuStates.set("menu-note-attr-slide", true);
    else if (hitTestResult._target instanceof Ug.AirCrush || hitTestResult._target instanceof Ug.AirCrushAction)
      menuStates.set("menu-note-attr-aircrush", true);

    let hasVisibleMenus = false;
    menuStates.forEach((value, key) => {
      this._contextMenu?._setVisibleAll(key, value);
      hasVisibleMenus ||= value;
    });
    this._contextMenu?._setVisibleAll("menu-note-attr-none", !hasVisibleMenus);

    let ret = await this._contextMenu?._showPopupWait(e.clientX, e.clientY);

    if (!ret)
      return;

    this._undoBuffer._beginRecording();
    switch (ret._getId()) {
      case "conv-Tap":
        if (hitTestResult._target instanceof Ug.Note && hitTestResult._target._convertable(Ug.Tap)) {
          this._undoBuffer._stageAction(
            new CommandActionNoteConvertType(hitTestResult._target, Ug.Tap));
        }
        break;
      case "conv-ExTap":
        if (hitTestResult._target instanceof Ug.Note && hitTestResult._target._convertable(Ug.ExTap)) {
          this._undoBuffer._stageAction(
            new CommandActionNoteConvertType(hitTestResult._target, Ug.ExTap));
        }
        break;
      case "conv-Flick":
        if (hitTestResult._target instanceof Ug.Note && hitTestResult._target._convertable(Ug.Flick)) {
          console.log("cnb");
          this._undoBuffer._stageAction(
            new CommandActionNoteConvertType(hitTestResult._target, Ug.Flick));
        }
        break;
      case "conv-Damage":
        if (hitTestResult._target instanceof Ug.Note && hitTestResult._target._convertable(Ug.Damage)) {
          this._undoBuffer._stageAction(
            new CommandActionNoteConvertType(hitTestResult._target, Ug.Damage));
        }
        break;
      
      case "attr-Dir-Up":
      case "attr-Dir-UpLeft":
      case "attr-Dir-UpRight":
      case "attr-Dir-Down":
      case "attr-Dir-DownLeft":
      case "attr-Dir-DownRight":
        if (hitTestResult._target instanceof Ug.Air) {
          let newDir = MenuItemIdToAirDirection[ret._getId() as keyof typeof MenuItemIdToAirDirection] as number;
          if (hitTestResult._target._direction !== newDir) {
            let oldProp = hitTestResult._target._create();
            hitTestResult._target._copyPropertiesTo(oldProp);

            hitTestResult._target._direction = newDir;
            
            this._undoBuffer._stageAction(
              new CommandActionNoteProperty(hitTestResult._target, oldProp, false));
          }
        }
        break;
      
      case "attr-Dir-Up":
      case "attr-Dir-Down":
      case "attr-Dir-Center":
      case "attr-Dir-Left":
      case "attr-Dir-Right":
      case "attr-Dir-Rotate-Left":
      case "attr-Dir-Rotate-Right":
      case "attr-Dir-In-Out":
      case "attr-Dir-Out-In":
        if (hitTestResult._target instanceof Ug.ExTap) {
          let newDir = MenuItemIdToExTapDirection[ret._getId() as keyof typeof MenuItemIdToExTapDirection] as number;
          if (hitTestResult._target._direction !== newDir) {
            let oldProp = hitTestResult._target._create();
            hitTestResult._target._copyPropertiesTo(oldProp);

            hitTestResult._target._direction = newDir;
            
            this._undoBuffer._stageAction(
              new CommandActionNoteProperty(hitTestResult._target, oldProp, false));
          }
        }
        break;
    }
    this._undoBuffer._commitRecording();
  }

  _draw() {
    this._viewState._screenWidth = this._elmSizeTracer.clientWidth;
    this._viewState._screenHeight = this._elmSizeTracer.clientHeight;

    let isDirty = this._dirty;
    
    for(const note of this._chart._notes._childNodes as Ug.Note[]) {
      let isOverallDirty = note._isDirty;
      note._isDirty = false;

      for(const child of note._childNodes as Ug.Note[]) {
        isOverallDirty ||= child._isDirty;
        child._isDirty = false;
      }

      if (isOverallDirty && note instanceof Ug.Slide) {
        note._prepareSlideBg();
      }

      isDirty ||= isOverallDirty;
    }
    
    if (!isDirty)
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

  _setActiveNoteType(type: NoteTypeId) { this._activeNoteType = type; }
  _getActiveNoteType() : NoteTypeId { return this._activeNoteType; }
}
