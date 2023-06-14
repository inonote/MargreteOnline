export type Tick = number;

export class Note {

}

export class NotePosition {
  _tick: Tick = 0;
  _x: number = 0;
  _width: number = 0;
  _height: number = 0;
  _children: NotePosition[] = [];
}
