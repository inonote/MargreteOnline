export class UIEvent<TTarget> {
  private _internalType: string;
  get _type() { return this._internalType; }

  private _internalTarget: TTarget;
  get _target() { return this._internalTarget; }

  private _internalCanceledBubbling: boolean = false;
  get _canceledBubbling() { return this._internalCanceledBubbling; }

  constructor(target: TTarget, type: string) {
    this._internalTarget = target;
    this._internalType = type;
  }

  _stppPropagation() {
    this._internalCanceledBubbling = true;
  }
}

export class UIEventTarget {
  private _handlers: Map<string, ((e: UIEvent<any>) => any)[]> = new Map();
  
  _addEventHandler(type: string, callback: ((e: UIEvent<any>) => any)) {
    let handlerList = this._handlers.get(type);
    if (!handlerList) {
      handlerList = [];
      this._handlers.set(type, handlerList);
    }

    if (handlerList.indexOf(callback) !== -1)
      return;
    
    handlerList.push(callback);
  }

  _dispatchEvent(e: UIEvent<any>) {
    let handlerList = this._handlers.get(e._type);
    if (handlerList) {
      for(const c of handlerList)
        c(e);
    }
    
    if (!e._canceledBubbling)
      this._getParentUITarget()?._dispatchEvent(e);
  }

  protected _getParentUITarget() : UIEventTarget|undefined { return undefined; }
}
