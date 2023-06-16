import { Tick } from "../chart";
import { ChartObject } from "../chart-object";


export class Note extends ChartObject {
  _x: number = 0;
  _width: number = 1;
  _tick: Tick = 0;
  _timelineId: number = 0;
  protected _pairNoteRef?: WeakRef<Note>;

  _isGroundedShort() : boolean { return false; }
  _isGroundedLong() : boolean { return false; }
  _isAir() : boolean { return false; }
  _isAirLong() : boolean { return false; }
  _isLong() : boolean { return false; }

  _getPair() : Note|undefined { return this._pairNoteRef?.deref(); }

  /**
   * AIR、AIR-HOLD、AIR-SLIDE の接続に使用。
   * 子ノーツとして appendChild するのはロングノーツの中継点とかだけ。
   */
  _makePair(targetNote: Note) {
    let oldPair = targetNote._pairNoteRef?.deref();
    if (oldPair)
      oldPair._pairNoteRef = undefined;
    
    oldPair = this._pairNoteRef?.deref();
    if (oldPair)
      oldPair._pairNoteRef = undefined;
    
    targetNote._pairNoteRef = new WeakRef(this);
    this._pairNoteRef = new WeakRef(targetNote);
  }

  _getLastTick() : number {
    let lastTick = this._tick;
    for(const note of this._childNodes as Note[])
      lastTick = Math.max(lastTick, note._getLastTick());
    return lastTick;
  }

  constructor() {
    super();
  }
}
