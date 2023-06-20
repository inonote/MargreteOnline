import { CommandAction } from "./command-action";
import * as Ug from "../chart/chart";

export class CommandActionNoteProperty extends CommandAction {
	protected _note: Ug.Note;
  protected _oldProperty: Ug.Note;
  protected _newProperty: Ug.Note;
  protected _deepMove: boolean = false;

  constructor(note: Ug.Note, oldProperty: Ug.Note, deepMove: boolean) {
    super();
    this._note = note;

    this._oldProperty = oldProperty;
    this._newProperty = note._create();
    this._deepMove = deepMove;
    note._copyPropertiesTo(this._newProperty);
  }

  _undo(chart: Ug.Chart) : boolean {
    this._oldProperty._copyPropertiesTo(this._note);
      
    if (this._deepMove) {
      this._note._offsetChildrenTick(this._oldProperty._tick - this._newProperty._tick);
      this._note._offsetChildrenX(this._oldProperty._x - this._newProperty._x);
    }

    if (this._note instanceof Ug.Slide)
      this._note._prepareSlideBg();
    else if (this._note instanceof Ug.SlideChild)
      (this._note._parentNode as Ug.Slide|undefined)?._prepareSlideBg();
    return true;
  }
  
  _redo(chart: Ug.Chart) : boolean {
    this._newProperty._copyPropertiesTo(this._note);

    if (this._deepMove) {
      this._note._offsetChildrenTick(this._newProperty._tick - this._oldProperty._tick);
      this._note._offsetChildrenX(this._newProperty._x - this._oldProperty._x);
    }

    if (this._note instanceof Ug.Slide)
      this._note._prepareSlideBg();
    else if (this._note instanceof Ug.SlideChild)
      (this._note._parentNode as Ug.Slide|undefined)?._prepareSlideBg();
    return true;
  }
}

export class CommandActionNoteInsert extends CommandAction {
	protected _note: Ug.Note;
	protected _parentNote?: Ug.Note;
	protected _pairNote?: Ug.Note;

  constructor(note: Ug.Note, parentNote?: Ug.Note) {
    super();
    this._note = note;
    this._parentNote = parentNote;
    this._pairNote = note._getPair();
  }

  _undo(chart: Ug.Chart) : boolean {
    (this._parentNote || chart._notes)._removeChild(this._note);
    this._note._makePair(undefined);

    if (this._parentNote)
      this._parentNote._sortChildByTick();
    return true;
  }
  
  _redo(chart: Ug.Chart) : boolean {
    (this._parentNote || chart._notes)._appendChild(this._note);
    this._note._makePair(this._pairNote);
    
    if (this._parentNote)
      this._parentNote._sortChildByTick();
    return true;
  }
}

export class CommandActionNoteDelete extends CommandActionNoteInsert {
  constructor(note: Ug.Note, parentNote?: Ug.Note) {
    super(note, parentNote);
  }

  _undo = super._redo;
  _redo = super._undo;
}
