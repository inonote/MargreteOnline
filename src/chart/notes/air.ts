import { Note } from "./note";

export enum AirDirection {
	UP,
	DOWN,
	LEFT,
	RIGHT,
	UPLEFT,
	UPRIGHT,
	DOWNLEFT,
	DOWNRIGHT,
}

export class Air extends Note {
  _direction: AirDirection = AirDirection.UP;
  _inverted: boolean = false;

  get _x() : number { return (this._getPair() as Note|undefined)?._x || 0; }
  set _x(val: number) {}
  get _width() { return (this._getPair() as Note|undefined)?._width || 1; };
  set _width(val: number) { };
  get _tick() { return (this._getPair() as Note|undefined)?._tick || 0; };
  set _tick(val: number) { };

  _create() { return new Air(); }

  _copyPropertiesTo(to: Air) {
    super._copyPropertiesTo(to);
    to._direction = this._direction;
    to._inverted = this._inverted;
  }

  _isAir() { return true; }
}



export class AirHold extends Note {
  _inverted: boolean = false;
  _height: number = 0;

  get _x() : number { return (this._getPair() as Note|undefined)?._x || 0; }
  set _x(val: number) {}
  get _width() { return (this._getPair() as Note|undefined)?._width || 1; };
  set _width(val: number) { };
  get _tick() { return (this._getPair() as Note|undefined)?._tick || 0; };
  set _tick(val: number) { };

  _create() { return new AirHold(); }

  _copyPropertiesTo(to: AirHold) {
    super._copyPropertiesTo(to);
    to._inverted = this._inverted;
    to._height = this._height;
  }

  _isAir() { return true; }
  _isAirHoldGroup() { return true; }
  _isAirLongParent() { return true; }
}



export class AirSlide extends Note {
  _inverted: boolean = false;
  _height: number = 0;

  get _x() : number { return (this._getPair() as Note|undefined)?._x || 0; }
  set _x(val: number) {}
  get _width() { return (this._getPair() as Note|undefined)?._width || 1; };
  set _width(val: number) { };
  get _tick() { return (this._getPair() as Note|undefined)?._tick || 0; };
  set _tick(val: number) { };

  _create() { return new AirSlide(); }

  _copyPropertiesTo(to: AirSlide) {
    super._copyPropertiesTo(to);
    to._inverted = this._inverted;
    to._height = this._height;
  }

  _isAir() { return true; }
  _isAirSlideGroup() { return true; }
  _isAirLongParent() { return true; }
}


export const VARIDATION_TRANSPARENT = 35;

export class AirCrush extends Note {
  _noAction: boolean = false;
  _height: number = 0;
  _variationId: number = 0;

  _create() { return new AirCrush(); }

  _copyPropertiesTo(to: AirCrush) {
    super._copyPropertiesTo(to);
    to._noAction = this._noAction;
    to._height = this._height;
    to._variationId = this._variationId;
  }

  _isAir() { return true; }
  _isAirCrushGroup() { return true; }
  _isAirLongParent() { return true; }
  _isResizable() { return true; }
}




export enum AirActionType {
  STEP,
  CONTROL
}

export class AirHoldAction extends Note {
  _type: AirActionType = AirActionType.STEP;

  get _x() : number { return (this._parentNode as AirHold|undefined)?._x || 0; }
  set _x(val: number) {}
  get _width() { return (this._parentNode as AirHold|undefined)?._width || 1; };
  set _width(val: number) { };
  get _height() { return (this._parentNode as AirHold|undefined)?._height || 1; };
  set _height(val: number) { };

  _create() { return new AirHoldAction(); }

  _copyPropertiesTo(to: AirHoldAction) {
    super._copyPropertiesTo(to);
    to._type = this._type;
  }
  
  _isAirHoldGroup() { return true; }
  _isAirLongChild() { return true; }
}



export class AirSlideAction extends Note {
  _type: AirActionType = AirActionType.STEP;
  _height: number = 0;

  _create() { return new AirSlideAction(); }

  _copyPropertiesTo(to: AirSlideAction) {
    super._copyPropertiesTo(to);
    to._type = this._type;
    to._height = this._height;
  }

  _isAirSlideGroup() { return true; }
  _isAirLongChild() { return true; }
  _isResizable() { return true; }
}



export enum AirCrushActionType {
  STEP,
  CONTROL
}

export class AirCrushAction extends Note {
  _type: AirCrushActionType = AirCrushActionType.STEP;
  _height: number = 0;

  _create() { return new AirCrushAction(); }

  _copyPropertiesTo(to: AirCrushAction) {
    super._copyPropertiesTo(to);
    to._type = this._type;
    to._height = this._height;
  }

  _isAirCrushGroup() { return true; }
  _isAirLongChild() { return true; }
  _isResizable() { return this._type === AirCrushActionType.CONTROL || this._parentNode?._lastChild === this; }
}
