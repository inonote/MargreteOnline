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

  _isAir() : boolean { return true; }
}



export class AirHold extends Note {
  _inverted: boolean = false;
  _height: number = 0;

  _isAir() : boolean { return true; }
}



export class AirSlide extends Note {
  _inverted: boolean = false;
  _height: number = 0;

  _isAir() : boolean { return true; }
}


export const VARIDATION_TRANSPARENT = 35;

export class AirCrush extends Note {
  _noAction: boolean = false;
  _height: number = 0;
  _variationId: number = 0;
}




export enum AirActionType {
  STEP,
  CONTROL
}

export class AirAction extends Note {
  _type: AirActionType = AirActionType.STEP;
  _height: number = 0;
}



export enum AirCrushActionType {
  STEP,
  CONTROL
}

export class AirCrushAction extends Note {
  _type: AirCrushActionType = AirCrushActionType.STEP;
  _height: number = 0;
}
