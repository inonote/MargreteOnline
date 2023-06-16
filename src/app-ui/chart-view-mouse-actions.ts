import { HitTestResult, ScrollBarMetrices } from "./chart-renderer";
import { ChartView } from "./chart-view";
import * as MathUtil from "../math-util";

export class ChartViewMouseAction {
  protected _view: ChartView;
  protected _hitTestResult: HitTestResult;

  constructor(view: ChartView, hitTestResult: HitTestResult) {
    this._view = view;
    this._hitTestResult = hitTestResult;
  }

  _start() { }

  _end(mouseX: number, mouseY: number) { }

  _move(mouseX: number, mouseY: number) { }

  _cancel() {}
}

export class ChartViewMouseActionScrollThumb extends ChartViewMouseAction {
  _start() {
  }

  _end(mouseX: number, mouseY: number) {

  }

  _move(mouseX: number, mouseY: number) {
    let sbm = this._hitTestResult._target as ScrollBarMetrices;
    let delta = this._hitTestResult._mousePos._y - mouseY;
    this._view._currentViewState._scrollY = sbm._pos + MathUtil.mixi(sbm._min, sbm._max, delta / sbm._trackLength);
    if (this._view._currentViewState._scrollY < 0)
      this._view._currentViewState._scrollY = 0;
    this._view._invalidateView();
  }
}
