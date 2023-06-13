import { createDivElement } from "./element-util";
import { Frame } from "./frame";

export class MenuBar {
  protected _frame: Frame;
  protected _elm: HTMLDivElement;

  protected _items: MenuItem[] = [];

  constructor(frame: Frame) {
    this._frame = frame;

    this._elm = createDivElement("ui-menubar")
    this._frame._getHtmlElement().appendChild(this._elm);
  }

  _appendItem(item: MenuItem) {
    if (this._items.findIndex(x => x == item) >= 0)
      return;
    
    this._items.push(item);
    this._elm.appendChild(item._getHtmlElement());
  }
}

export class MenuItem {
  protected _elm: HTMLDivElement;
  protected _elmPopup?: HTMLDivElement;
  protected _label: string = "";
  protected _dirty: boolean = true;

  protected _items: MenuItem[] = [];

  constructor(label?: string) {
    this._elm = createDivElement("ui-menu-item");
    this._label = label || "";

    this._updateElement();
  }

  _updateElement() : void {
    if (!this._dirty)
      return;
    
    this._elm.innerText = this._label;
  }
  
  _appendItem(item: MenuItem) {
    if (this._items.findIndex(x => x == item) >= 0)
      return;
    
    if (!this._elmPopup) {
      this._elmPopup = createDivElement("ui-menu-popup");
      this._elm.appendChild(this._elmPopup);
    }

    this._items.push(item);
    this._elmPopup.appendChild(item._getHtmlElement());
  }

  _getHtmlElement() : HTMLDivElement { return this._elm; }
}

export class MenuItemSeparator extends MenuItem {
  constructor() {
    super();
    this._elm = createDivElement("ui-menu-item-separator");
  }

  _updateElement() : void {
  }
  
  _appendItem(item: MenuItem) {
    return;
  }

  _getHtmlElement() : HTMLDivElement { return this._elm; }
}
