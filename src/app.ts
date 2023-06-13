import { Frame } from "./ui/frame";
import { MenuBar, MenuItem, MenuItemSeparator } from "./ui/menu";

class MainFrame extends Frame {
  _menuBar?: MenuBar;

  _onInit() : void {
    console.log("init");
    this._menuBar = new MenuBar(this);

    let fileMenuItem = new MenuItem("File");
    fileMenuItem._appendItem(new MenuItem("New"));
    fileMenuItem._appendItem(new MenuItem("Open"));
    fileMenuItem._appendItem(new MenuItem("Save"));

    let subMenuItem = new MenuItem("SubMenu");
    subMenuItem._appendItem(new MenuItem("Item0"));
    subMenuItem._appendItem(new MenuItem("Item1"));
    subMenuItem._appendItem(new MenuItem("Item2"));
    fileMenuItem._appendItem(subMenuItem);

    this._menuBar._appendItem(fileMenuItem);
    
    let editMenuItem = new MenuItem("Edit");
    editMenuItem._appendItem(new MenuItem("Undo"));
    editMenuItem._appendItem(new MenuItem("Redo"));
    editMenuItem._appendItem(new MenuItemSeparator());
    editMenuItem._appendItem(new MenuItem("Cut"));
    editMenuItem._appendItem(new MenuItem("Copy"));
    editMenuItem._appendItem(new MenuItem("Paste"));
    editMenuItem._appendItem(new MenuItem("Delete"));
    this._menuBar._appendItem(editMenuItem);
    this._menuBar._appendItem(new MenuItem("View"));
    this._menuBar._appendItem(new MenuItem("Tools"));
    this._menuBar._appendItem(new MenuItem("Help"));
  }
}

export let mainFrame = new MainFrame(document.getElementById("app"));
