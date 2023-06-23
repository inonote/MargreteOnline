import { createDivElement } from "./element-util";
import { UIEventTarget, UIEvent } from "./event";
import { Frame } from "./frame";
import { Position, Size, Rect } from "./util";

export class MenuItem extends UIEventTarget {
  protected _elm: HTMLDivElement;
  protected _elmItem: HTMLDivElement;
  protected _elmItemText: HTMLDivElement;
  protected _elmItemAccessKey: HTMLDivElement;
  protected _elmPopup?: HTMLDivElement;
  
  protected _id: string = "";
  protected _label: string = "";
  protected _accessKey: string = "";
  protected _disabled: boolean = false;
  protected _isRoot: boolean = false;
  protected _isChecked: boolean = false;

  protected _dirty: boolean = true;

  protected _parent?: WeakRef<MenuItem>;
  protected _items: MenuItem[] = [];

  protected _selectedItem?: MenuItem;
  protected _popupDelayTimerFor?: MenuItem;
  protected _popupDelayTimer: number = 0;

  protected _menuPopupDelay: number = 500;

  constructor(id: string, label?: string, accessKey?: string) {
    super();
    this._elm = this._createElement();

    this._elmItem = createDivElement("ui-menu-item-label");
    this._elmItemText = createDivElement("ui-menu-item-label-text");
    this._elmItemAccessKey = createDivElement("ui-menu-item-label-access-key");
    this._elmItem.appendChild(this._elmItemText);
    this._elmItem.appendChild(this._elmItemAccessKey);
    this._elm.appendChild(this._elmItem);

    this._id = id;
    this._label = label || "";
    this._accessKey = accessKey || "";

    this._updateElement();
  }

  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-menu-item");
  }

  protected _updateElement() {
    if (!this._dirty)
      return;
    
    this._elmItemText.innerText = this._label;
    this._elmItemAccessKey.classList.toggle("ui-hide", this._accessKey === "");
    this._elmItemAccessKey.innerText = this._accessKey;
    this._elm.classList.toggle("ui-checked", this._isChecked);
  }

  protected _getParentUITarget() : UIEventTarget|undefined { return this._parent?.deref() as UIEventTarget|undefined; }

  protected _onItemMouseUp(item: MenuItem, isPrimaryButton: boolean) {
    if (item._hasChildren()) {
      if (this._selectedItem === item)
        return;
      this._activateMenu(item);
      return;
    }

    this._eventOnItemClick(item);
    this._escapeMenu();
  }

  protected _onItemMouseDown(item: MenuItem, isPrimaryButton: boolean) {
  }

  protected _onItemHover(item: MenuItem, noPopup: boolean = false) {
    this._popupDelayTimerFor = undefined;
    if (this._popupDelayTimer) {
      window.clearTimeout(this._popupDelayTimer);
      this._popupDelayTimer = 0;
    }

    if (!item._disabled) {
      if (noPopup) {
        this._popupDelayTimerFor = item;
      }
      else if (!this._selectedItem?._hasChildren() && !item._hasChildren()) {
        this._activateMenu(item);
      }
      else {
        this._popupDelayTimerFor = item;
        this._popupDelayTimer = window.setTimeout(() => {
          this._popupDelayTimer = 0;
          this._activateMenu(this._popupDelayTimerFor);
          this._popupDelayTimerFor = undefined;
        }, this._menuPopupDelay);
      }
    }

    this._updateMenuItems();
  }

  protected _onItemLeave(item: MenuItem) {
  }

  protected _onPopupKeyDown(e: KeyboardEvent) {
    if (e.altKey) {
      this._escapeMenu();
      return;
    }
    if (e.shiftKey || e.ctrlKey || e.metaKey)
      return;
    
    if (e.key === "ArrowUp") {
      let index = this._getActiveItemIndex();
      for(let i = 0; i < this._items.length; ++i) {
        --index;
        if (index < 0)
          index = this._items.length - 1;
        
        if (!this._items[index]._disabled)
          break;
      }
      this._items[index]._elmItem.scrollIntoView({block: "nearest", inline: "nearest" });
      this._hoverItem(this._items[index], true);
    }
    else if (e.key === "ArrowDown") {
      let index = this._getActiveItemIndex();
      for(let i = 0; i < this._items.length; ++i) {
        ++index;
        if (index >= this._items.length)
          index = 0;
        
        if (!this._items[index]._disabled)
          break;
      }

      this._items[index]._elmItem.scrollIntoView({ block: "nearest", inline: "nearest" });
      this._hoverItem(this._items[index], true);
    }
    else if (e.key === "ArrowRight") {
      let item = this._getActiveItem();
      if (item?._hasChildren()) {
        this._activateMenu(item);
        item._hoverItem(item._items[0], true);
      }
      else {
        this._onNextRootSubMenu();
      }
    }
    else if (e.key === "ArrowLeft") {
      if (this._parent?.deref()?._isRoot)
        this._onPrevRootSubMenu();
      else
        this._closeOwnPopup();
    }
    else if (e.key === "Escape") {
      this._closeOwnPopup();
    }
    else if (e.key === "Enter") {
      let item = this._getActiveItem();
      if (item)
        this._onItemMouseUp(item, true);
    }
  }

  protected _onPopupLeave() {
    this._popupDelayTimerFor = undefined;
    if (this._popupDelayTimer) {
      window.clearTimeout(this._popupDelayTimer);
      this._popupDelayTimer = 0;
    }

    if (this._selectedItem && !this._selectedItem._hasChildren())
      this._activateMenu(undefined);
    
    this._updateMenuItems();
  }

  protected _onNextRootSubMenu() {
    this._parent?.deref()?._onNextRootSubMenu();
  }
  protected _onPrevRootSubMenu() {
    this._parent?.deref()?._onPrevRootSubMenu();
  }

  protected _escapeMenu() {
    this._activateMenu(undefined);
    this._updateMenuItems();

    let parent = this._parent?.deref();
    if (parent)
      parent._escapeMenu();
  }

  protected _closePopup() {
    console.log("!")
    let item = this._selectedItem;
    if (!item || !item._hasChildren())
      return;

    this._activateMenu(undefined);

    this._popupDelayTimerFor = item;
    this._updateMenuItems();
  }

  protected _closeOwnPopup() {
    this._activateMenu(undefined);
    this._updateMenuItems();

    this._parent?.deref()?._closePopup();
  }

  protected _calcItemRect() : Rect {
    let br = this._elmItem.getBoundingClientRect();
    return new Rect(br.left, br.top, br.right, br.bottom);
  }

  protected _calcPopupRect() : Rect {
    if (!this._hasChildren())
      return new Rect();
    this._getPopupHtmlElement().classList.add("ui-show-dropdown-test");

    let br = this._getPopupHtmlElement().getBoundingClientRect();

    this._getPopupHtmlElement().classList.remove("ui-show-dropdown-test");
    
    return new Rect(br.left, br.top, br.right, br.bottom);
  }

  protected _calcPopupPosition(origin?: Position) : Position {
    let itemRect = this._calcItemRect();
    let popupRect = this._calcPopupRect();
    let windowW = window.innerWidth;
    let windowH = window.innerHeight;

    let ret = new Position(origin?._x, origin?._y);

    if (!origin) {
      if (this._parent?.deref()?._isRoot) {
        ret._x = itemRect._left;
        ret._y = itemRect._bottom;
        
        if (ret._x + popupRect._width > windowW) {
          ret._x = itemRect._left - popupRect._width + itemRect._width + 2;
        }
        
        if (ret._x < 0)
          ret._x = 0;
        else if (ret._x + popupRect._width > windowW)
          ret._x = windowW - popupRect._width;
        return ret;
      }
      else {
        ret._x = itemRect._right - 2;
        ret._y = itemRect._top - 3;
        if (ret._x + popupRect._width > windowW) {
          ret._x = itemRect._left - popupRect._width;
        }
      }
    }

    if (ret._x < 0)
      ret._x = 0;
    else if (ret._x + popupRect._width > windowW)
      ret._x = windowW - popupRect._width;
    if (ret._y < 0)
      ret._y = 0;
    else if (ret._y + popupRect._height > windowH)
      ret._y = windowH - popupRect._height;
    return ret;
  }

  protected _layoutPopup(origin?: Position) {
    let pos = this._calcPopupPosition(origin);
    
    this._getPopupHtmlElement().style.left = pos._x + "px";
    this._getPopupHtmlElement().style.top = pos._y + "px";
    this._getPopupHtmlElement().style.maxHeight = (window.innerHeight - pos._y) + "px";
  }

  _activateMenu(item?: MenuItem) {
    this._popupDelayTimerFor = undefined;
    if (this._popupDelayTimer) {
      window.clearTimeout(this._popupDelayTimer);
      this._popupDelayTimer = 0;
    }
    if (this._selectedItem === item) {
      this._updateMenuItems();
      return;
    }

    if (this._selectedItem) {
      this._selectedItem._getPopupHtmlElement().classList.remove("ui-show-dropdown");  
      if (this._elmPopup)
        this._elmPopup.focus();
      this._selectedItem._activateMenu(undefined);
    }

    this._selectedItem = item;
    if (item && item._hasChildren()) {
      item._getPopupHtmlElement().classList.toggle("ui-no-anim", this._isRoot);
      item._getPopupHtmlElement().classList.add("ui-show-dropdown");
      item._layoutPopup();
      if (item._elmPopup)
        item._elmPopup.focus();
    }

    this._updateMenuItems();
  }

  _updateMenuItems() {
    for(const item of this._items) {
      item._getHtmlElement().classList.toggle("ui-active", (!this._popupDelayTimerFor && item === this._selectedItem) || item === this._popupDelayTimerFor);
    }
  }
  
  _appendItem(item: MenuItem) {
    if (item._parent)
      return;
    
    if (this._items.findIndex(x => x == item) >= 0)
      return;

    item._parent = new WeakRef(this);
    this._items.push(item);
    
    this._getPopupHtmlElement().appendChild(item._getHtmlElement());

    this._elm.classList.add("ui-has-popup");

    item._getItemHtmlElement().addEventListener("mouseup", (e) => {
      this._onItemMouseUp(item, e.button === 0);
      e.stopPropagation();
      e.preventDefault();
    });
    item._getItemHtmlElement().addEventListener("mousedown", (e) => {
      this._onItemMouseDown(item, e.button === 0);
      e.stopPropagation();
      e.preventDefault();
    });
    item._getItemHtmlElement().addEventListener("mouseover", (e) => {
      this._onItemHover(item);
      e.stopPropagation();
      e.preventDefault();
    });
    item._getItemHtmlElement().addEventListener("mouseleave", (e) => {
      this._onItemLeave(item);
      e.stopPropagation();
      e.preventDefault();
    });
  }

  _appendNestedMenuItems(list: any, skipFirst: boolean = false) {
    let isFirst = true;
    for(const v of list) {
      if (skipFirst && isFirst) {
        isFirst = false;
        continue;
      }

      if (v.length) {
        let childItem = (v[0] instanceof MenuItem) ? v[0] : new MenuItem("", v[0]);
        this._appendItem(childItem);
        childItem._appendNestedMenuItems(v, true);
      }
      else if (v instanceof MenuItem) {
        this._appendItem(v);
      }
    }
  }

  _getActiveItem() : MenuItem|undefined {
    if (this._popupDelayTimerFor)
      return this._popupDelayTimerFor;
    return this._selectedItem;
  }
  
  _getActiveItemIndex() : number {
    let item = this._getActiveItem();
    if (item === undefined)
      return -1;
    return this._items.findIndex(x => x === item);
  }

  _hoverItem(item: MenuItem, noPopup: boolean = false) { this._onItemHover(item, noPopup); }

  _getHtmlElement() { return this._elm; }
  _getItemHtmlElement() { return this._elmItem; }
  _hasChildren() { return this._items.length > 0; }
  _getChildren() { return this._items; }
  _getId() { return this._id; }
  _getLabel() { return this._label; }
  _setLabel(label: string) {
    this._dirty = true;
    this._label = label;
    this._updateElement();
  }
  _isDisabled() { return this._disabled; }
  _setCheck(checked: boolean) {
    this._dirty = checked !== this._isChecked;
    this._isChecked = checked;
    this._updateElement();
  }
  _getCheck() { return this._isChecked; }
  
  _getPopupHtmlElement() : HTMLDivElement {
    if (!this._elmPopup) {
      this._elmPopup = createDivElement("ui-menu-popup");
      this._elmPopup.setAttribute("tabindex", "0");
      this._getPopupRootElement()?.appendChild(this._elmPopup);

      this._elmPopup.addEventListener("mouseleave", (e) => {
        this._onPopupLeave();
        e.stopPropagation();
        e.preventDefault();
      });
      this._elmPopup.addEventListener("contextmenu", (e) => {
        e.stopPropagation();
        e.preventDefault();
      });
      this._elmPopup.addEventListener("keydown", (e) => {
        this._onPopupKeyDown(e);
        e.stopPropagation();
        e.preventDefault();
      });
    }
    return this._elmPopup;
  }

  protected _getPopupRootElement() : HTMLDivElement|undefined { return this._parent?.deref()?._getPopupRootElement(); }

  _eventOnItemClick(item: MenuItem) {
    let event = new UIEvent(item, "ui-click");
    item._dispatchEvent(event);
  }

  _getItemById(id: string) : MenuItem|undefined {
    if (id.length === 0)
      return;
    
    if (this._id === id) return this;
    for(const item of this._items) {
      let x = item._getItemById(id);
      if (x)
        return x;
    }
  }

  _setCheckAll(id: string, checked: boolean) {
    if (id.length === 0)
      return;
    
    if (this._id === id)
      this._setCheck(checked);
    for(const item of this._items) {
      item._setCheckAll(id, checked);
    }
  }
}



export class MenuItemSeparator extends MenuItem {
  protected _disabled: boolean = true;

  constructor() { super(""); }

  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-menu-item-separator");
  }

  protected _updateElement() { }
  
  _appendItem(item: MenuItem) { }

  _getHtmlElement() : HTMLDivElement { return this._elm; }
}



export class MenuItemSpacer extends MenuItem {
  protected _disabled: boolean = true;

  constructor() { super(""); }

  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-menu-item-spacer");
  }

  protected _updateElement() { }
  
  _appendItem(item: MenuItem) { }

  _getHtmlElement() : HTMLDivElement { return this._elm; }
}



export class MenuBar extends MenuItem {
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
    window.addEventListener("keydown", e => {
      if (!e.repeat && e.altKey) {
        this._onItemMouseDown(this._items[0], true);
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-menubar");
  }

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
    if (!(e.target instanceof Node) || !this._getPopupRootElement()?.contains(e.target)) {
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

  _getPopupHtmlElement() : HTMLDivElement { return this._elm; }
  protected _getPopupRootElement() : HTMLDivElement|undefined { return this._elmPopupRoot; }
}


export class ContextMenu extends MenuItem {
  protected _frame: Frame;

  protected _visible: boolean = false;
  protected _isRoot: boolean = false;

  constructor(frame: Frame) {
    super("");
    this._getPopupHtmlElement().setAttribute("tabindex", "0");
    this._getPopupHtmlElement().addEventListener("mouseleave", (e) => {
      this._onPopupLeave();
      e.stopPropagation();
      e.preventDefault();
    });
    this._getPopupHtmlElement().addEventListener("keydown", (e) => {
      this._onPopupKeyDown(e);
      e.stopPropagation();
      e.preventDefault();
    });

    this._frame = frame;
    this._frame._getHtmlElement().appendChild(this._elm);

    window.addEventListener("mousedown", e => this._onClickBackground(e), { capture: true });
  }

  protected _createElement() : HTMLDivElement {
    return createDivElement("ui-popupmenu");
  }

  protected _onClickBackground(e: MouseEvent) {
    if (!this._visible)
      return;
    
    if (!(e.target instanceof Node) || !this._getPopupRootElement()?.contains(e.target)) {
      this._escapeMenu();
      e.stopPropagation();
      return;
    }
  }

  protected _closePopup() {
    super._closePopup();
    this._getPopupHtmlElement().focus();
  }
  
  protected _closeOwnPopup() {
    super._closeOwnPopup();
    this._cancelPopup();
  }

  protected _escapeMenu() {
    super._escapeMenu();
    this._cancelPopup();
  }

  _showPopup(x: number, y: number) {
    this._visible = true;
    this._getPopupHtmlElement().classList.add("ui-show");
    this._layoutPopup(new Position(x, y));
    this._getPopupHtmlElement().focus();
  }

  _cancelPopup() {
    this._visible = false;
    this._getPopupHtmlElement().classList.remove("ui-show");
  }

  protected _getPopupRootElement() : HTMLDivElement|undefined { return this._elm; }
}

