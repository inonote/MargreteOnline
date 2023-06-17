import * as Ug from "../chart/chart";

export class CommandAction {
  _staged: boolean = false;

  _undo(chart: Ug.Chart) : boolean { return true; }
  _redo(chart: Ug.Chart) : boolean { return true; }
}



export class CommandActionList {
  _id: number = 1;
  _actions: CommandAction[] = [];
}
