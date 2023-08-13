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
  private _handlers: Map<string, {
      _callback: ((e: UIEvent<any>) => any),
      _once: boolean
    }[]> = new Map();
  
  _addEventHandler(type: string, callback: ((e: UIEvent<any>) => any)) {
    this._registerEventHandler(type, callback, false);
  }

  _removeEventHandler(type: string, callback: ((e: UIEvent<any>) => any)) {
    this._unregisterEventHandler(type, callback);
  }

  _on(type: string, callback: ((e: UIEvent<any>) => any)) {
    this._registerEventHandler(type, callback, false);
  }

  _once(type: string, callback: ((e: UIEvent<any>) => any)) {
    this._registerEventHandler(type, callback, true);
  }

  _dispatchEvent(e: UIEvent<any>) {
    let handlerList = this._handlers.get(e._type);
    if (handlerList) {
      for(const c of handlerList)
        c._callback(e);
      this._handlers.set(e._type, handlerList.filter(x => !x._once));
    }
    
    if (!e._canceledBubbling)
      this._getParentUITarget()?._dispatchEvent(e);
  }

  protected _registerEventHandler(type: string, callback: ((e: UIEvent<any>) => any), once: boolean) {
    let handlerList = this._handlers.get(type);
    if (!handlerList) {
      handlerList = [];
      this._handlers.set(type, handlerList);
    }

    if (handlerList.findIndex(x => x._callback === callback) !== -1)
      return;
    
    handlerList.push({ _callback: callback, _once: once });
  }

  protected _unregisterEventHandler(type: string, callback: ((e: UIEvent<any>) => any)) {
    let handlerList = this._handlers.get(type);
    if (!handlerList)
      return;
    
    let index = handlerList.findIndex(x => x._callback === callback);
    if (index === -1)
      return;
    
    handlerList.splice(index, 1);
  }

  protected _getParentUITarget() : UIEventTarget|undefined { return undefined; }
}
