import { createDivElement } from "./element-util";
import { Frame } from "./frame";
import { MenuItem, MenuItemSeparator } from "./menu";

export class ToolBarButton extends MenuItem {
  protected _icon: string = "";

  constructor(id: string, icon: string, label?: string, accessKey?: string) {
    super(id, label, accessKey);
    this._icon = icon;

    this._dirty = true;
    this._updateElement();
  }
  
  protected _updateElement() {
    if (!this._dirty)
      return;
    
    if (this._icon !== undefined && this._icon !== "") {
      if (this._icon.substring(0, 2) === "x-")
        this._elmItemText.innerHTML = '<i class="ui-icon ui-icon-' + this._icon + '">';
      else
        this._elmItemText.innerHTML = '<i class="bi bi-' + this._icon + '">';
    }
    else
      this._elmItemText.innerText = this._label;
    this._elmItemText.title = this._label;
    this._elmItemAccessKey.classList.add("ui-hide");
    this._elm.classList.toggle("ui-checked", this._isChecked);
  }
}



export class ToolBarButtonSeparator extends MenuItemSeparator {
  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-toolbar-item-separator");
  }
}



export class ToolBar extends MenuItem {
  protected _frame: Frame;
  protected _elmPopupRoot: HTMLDivElement;
  
  protected _menuPopupDelay: number = 0;
  protected _isRoot: boolean = true;

  constructor(frame: Frame) {
    super("");

    this._frame = frame;
    this._frame._getHtmlElement().appendChild(this._elm);

    this._elmPopupRoot = createDivElement("ui-menu-popup-root");
    this._elm.appendChild(this._elmPopupRoot);

    window.addEventListener("mousedown", e => this._onClickBackground(e), { capture: true });
  }

  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-toolbar");
  }

  protected _getPopupRootElement() : HTMLDivElement|undefined { return this._elmPopupRoot; }

  protected _onItemMouseUp(item: MenuItem, isPrimaryButton: boolean) {
    if (item._hasChildren() || !isPrimaryButton)
      return;
    this._eventOnItemClick(item);
  }

  protected _onItemMouseDown(item: MenuItem, isPrimaryButton: boolean) {
    if (!item._hasChildren() || !isPrimaryButton)
      return;
    this._popupDelayTimerFor = undefined;
    this._activateMenu(this._selectedItem !== item ? item : undefined);
  }
  
  protected _onItemHover(item: MenuItem) {
    if (!this._selectedItem) { // メニューバーではポップアップが開いてるときのみホバーで開閉できる
      this._popupDelayTimerFor = item;
      this._updateMenuItems();
      return;
    }
    
    if (this._selectedItem._hasChildren() && !item._hasChildren())
      return;

    super._onItemHover(item);
    this._updateMenuItems();
  }

  protected _onItemLeave(item: MenuItem) {
    if (!this._selectedItem) {
      this._popupDelayTimerFor = undefined;
      this._updateMenuItems();
      return;
    }
  }

  protected _onClickBackground(e: MouseEvent) {
    if (!this._selectedItem)
      return;
    
    if (!(e.target instanceof Node) || !this._selectedItem._getHtmlElement().contains(e.target)) {
      this._popupDelayTimerFor = undefined;
      this._activateMenu(undefined);
      e.stopPropagation();
      return;
    }
  }

  protected _closePopup() {
    super._closePopup();
    this._popupDelayTimerFor = undefined;
    this._activateMenu(undefined);
  }

  protected _onNextRootSubMenu() {
    let index = this._getActiveItemIndex();
    for(let i = 0; i < this._items.length; ++i) {
      ++index;
      if (index >= this._items.length)
        index = 0;
      
      if (!this._items[index]._isDisabled() && this._items[index]._hasChildren())
        break;
    }
    let item = this._items[index];
    this._activateMenu(item);
    item._hoverItem(item._getChildren()[0], true);
  }

  protected _onPrevRootSubMenu() {
    let index = this._getActiveItemIndex();
    for(let i = 0; i < this._items.length; ++i) {
      --index;
      if (index < 0)
        index = this._items.length - 1;
      
      if (!this._items[index]._isDisabled() && this._items[index]._hasChildren())
        break;
    }
    
    let item = this._items[index];
    this._activateMenu(item);
    item._hoverItem(item._getChildren()[0], true);
  }

  _display(visible: boolean) {
    this._elm.classList.toggle("ui-hide", !visible);
  }

  _getPopupHtmlElement() : HTMLDivElement { return this._elm; }
}
