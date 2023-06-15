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



export enum AirLongChildType {
  STEP,
  CONTROL
}



export class AirLongChild extends Note {
  _type: AirLongChildType = AirLongChildType.STEP;
  _height: number = 0;
}
