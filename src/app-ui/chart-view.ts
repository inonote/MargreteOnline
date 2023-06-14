import { createDivElement } from "../ui/element-util";
import { Frame } from "../ui/frame";

export class ChartView {
  protected _frame: Frame;

  protected _elmCanvas: HTMLCanvasElement;
  protected _elmSizeTracer: HTMLDivElement;

  protected _dirty: boolean = true;

  constructor(frame: Frame) {
    this._frame = frame;

    this._elmSizeTracer = createDivElement("ui-chart-view");
    this._frame._getHtmlElement().appendChild(this._elmSizeTracer);
    
    this._elmCanvas = document.createElement("canvas");
    this._elmSizeTracer.appendChild(this._elmCanvas);
    this._adjustLayout();
  }

  _adjustLayout() {
    this._elmCanvas.width = this._elmSizeTracer.clientWidth;
    this._elmCanvas.height = this._elmSizeTracer.clientHeight;
  }

  _draw() {
    if (!this._dirty)
      return;
    
    let cw = this._elmCanvas.width;
    let ch = this._elmCanvas.height;
    let ctx = this._elmCanvas.getContext("2d");
    ctx?.fillRect(0, 0, cw, ch);
  }
}
