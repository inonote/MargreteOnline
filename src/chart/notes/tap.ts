import { Tick } from "../chart";
import { Note } from "./note";


export class SlideBgVertex {
	_tick: Tick = 0;
	_left: number = 0.0;
	_right: number = 0.0;
	_nextJointTick: Tick = 0;
	_nextJointLeft: number = 0.0;
	_nextJointRight: number = 0.0;
	_isJoint: boolean = false;	// テクスチャの変わり目?
}



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
  _slideBgVertices: SlideBgVertex[] = [];

  _isGroundedLong() : boolean { return true; }

  _prepareSlideBg() {
    this._slideBgVertices = [];
    {
			let vert = new SlideBgVertex;
			vert._tick = this._tick;
			vert._left = this._x / 16.0;
			vert._right = (this._x + this._width) / 16.0;
			vert._isJoint = false;
			this._slideBgVertices.push(vert);
    }

    let curveControls: (Slide|SlideChild)[] = [ this ];
    for (const childNote of this._childNodes as SlideChild[]) {
      if (childNote instanceof Slide || childNote._type !== SlideChildType.CURVE_CONTROL) {
        if (curveControls.length >= 2) { // ベジェ曲線
          // TODO: ベジェ曲線計算
        }

        {
          let vert = new SlideBgVertex;
          vert._tick = childNote._tick;
          vert._left = childNote._x / 16.0;
          vert._right = (childNote._x + childNote._width) / 16.0;
          vert._isJoint = childNote._type === SlideChildType.STEP;
          this._slideBgVertices.push(vert);
        }
        curveControls = [];
      }
      curveControls.push(childNote);
    }
  
    // テクスチャ座標計算
    let queue: SlideBgVertex[] = [];
    for (const v of this._slideBgVertices) {
      if (v._isJoint) {
        // 纏めて処理
        for (const x of queue) {
          x._nextJointTick = v._tick;
          x._nextJointLeft = v._left;
          x._nextJointRight = v._right;
        }
        queue = [];
        v._nextJointTick = v._tick;
      } 
      else {
        queue.push(v);
      }
    }
  }
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
