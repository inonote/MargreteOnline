import { Note } from "./note";

export class Tap extends Note {
  _isGroundedShort() : boolean { return true; }
}



export enum ExTapDirection {
	UP,
	DOWN,
	CENTER,
	LEFT,
	RIGHT,
	ROTATE_LEFT,
	ROTATE_RIGHT,
	INOUT,
	OUTIN
}



export class ExTap extends Note {
  _direction: ExTapDirection = ExTapDirection.UP;

  _isGroundedShort() : boolean { return true; }
}



export enum FlickDirection {
  AUTO,
  LEFT,
  RIGHT
}



export class Flick extends Note {
  _direction: FlickDirection = FlickDirection.AUTO;
  
  _isGroundedShort() : boolean { return true; }
}



export class Damage extends Note {
  _isGroundedShort() : boolean { return true; }
}



export class Slide extends Note {
  _isGroundedLong() : boolean { return true; }
}



export enum SlideChildType {
  STEP,
  CONTROL,
  CURVE_CONTROL
}



export class SlideChild extends Note {
  _type: SlideChildType = SlideChildType.STEP;

  _isGroundedLong() : boolean { return true; }
  _isLong(): boolean { return true; }
}



export class Hold extends Note {
  _isGroundedLong() : boolean { return true; }
  _isLong(): boolean { return true; }
}



export class HoldChild extends Note {
  _isGroundedLong() : boolean { return true; }
  _isLong(): boolean { return true; }
}
