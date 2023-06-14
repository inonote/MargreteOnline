export class Point {
  _x: number;
  _y: number;

  constructor(x?: number, y?: number) {
    this._x = x || 0;
    this._y = y || 0;
  }
}


export class Position extends Point { }
export class Size extends Point { }


export class Rect {
  _left: number;
  _top: number;
  _right: number;
  _bottom: number;

  constructor(left?: number, top?: number, right?: number, bottom?: number) {
    this._left = left || 0;
    this._top = top || 0;
    this._right = right || 0;
    this._bottom = bottom || 0;
  }

  get _width() { return this._right - this._left; }
  get _height() { return this._bottom - this._top; }
}
