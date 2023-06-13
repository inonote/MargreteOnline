export class Frame {
  protected _elm: HTMLElement;

  constructor(elm: HTMLElement|null) {
    if (elm === null) {
      throw new Error("elm is null");
    }
    
    this._elm = elm;
    this._onInit();
  }

  _onInit() : void {};

  _getHtmlElement() : HTMLElement { return this._elm; }
}
