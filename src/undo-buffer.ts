import { CommandAction, CommandActionList } from "./command-actions/command-action";
import * as Ug from "./chart/chart";

export class UndoBuffer {
  protected _chart: Ug.Chart;
  protected _bufferSize: number = 2047;
  protected _refRecording: number = 0;
  protected _undoCursor: number = 0;
  
	protected _savePointUndoActionId: number = 0;
	protected _changedUnundoableItem: boolean = false;

	protected _commandActionPendings: CommandActionList = new CommandActionList;
	protected _undoBuffer: CommandActionList[] = [];

  constructor(chart: Ug.Chart) {
    this._chart = chart;
  }

	_beginRecording() : boolean {
    if (!this._isRecording())
      this._commandActionPendings._actions = [];

    ++this._refRecording;
    return true;
  }

	_commitRecording() : boolean {
    if (!this._isRecording())
      return false;
    
    --this._refRecording;

    if (this._isRecording())
      return true;
    
    if (this._commandActionPendings._actions.length) {
      console.log(`UndoBuffer::commitRecording: commit ${this._commandActionPendings._actions.length} action(s)`);
      
      let actionList = this._commandActionPendings;
      this._undoBuffer.splice(this._undoBuffer.length - this._undoCursor, this._undoCursor);
      this._undoBuffer.push(actionList);

      this._commandActionPendings = new CommandActionList;
      this._commandActionPendings._id = actionList._id + 1;
      if (this._undoBuffer.length > this._bufferSize)
        this._undoBuffer.unshift();
      
      this._undoCursor = 0;
    }

    this._discardRecording();
    return true;
  }

	_discardRecording() : boolean {
    if (!this._isRecording())
      return false;
    
    if (this._commandActionPendings._actions.length) {
      for(let i = this._commandActionPendings._actions.length - 1; i >= 0; --i)
        this._commandActionPendings._actions[i]._undo(this._chart);
      
      this._commandActionPendings._actions = [];
    }
    this._refRecording = 0;
    return true;
  }

  _stageAction(action: CommandAction) : boolean {
    if (!this._isRecording() || action._staged)
      return false;

    action._staged = true;
    this._commandActionPendings._actions.push(action);

    action._redo(this._chart);
    return true;
  }

	_undo() : boolean {
    if (!this._canUndo())
      return false;
  
    ++this._undoCursor;
    let list = this._undoBuffer[this._undoBuffer.length - this._undoCursor];

    for(let i = list._actions.length - 1; i >= 0; --i)
      list._actions[i]._undo(this._chart);
    
    return true;
  }

	_redo() : boolean {
    if (!this._canRedo())
      return false;
  
    --this._undoCursor;
    let list = this._undoBuffer[this._undoBuffer.length - this._undoCursor - 1];
    
    for(let i = 0; i < list._actions.length; ++i)
      list._actions[i]._redo(this._chart);
    
    return true;
  }

	_canUndo() : boolean { return this._undoCursor < this._undoBuffer.length; }
	_canRedo() : boolean { return this._undoCursor > 0; }

	_clear() : boolean {
    if (this._isRecording())
      return false;
    
    this._undoCursor = 0;
    this._undoBuffer = [];
    this._refRecording = 0;
    return true;
  }

	_isRecording() : boolean { return this._refRecording > 0; }


	_setSavePoint() {};
	_getStagedActions() : number { return this._commandActionPendings._actions.length; }
	_setChangedUndoableItemFlag() { this._changedUnundoableItem = true; }
  
}