export class ChartNodeIterator {
  _next() { }
  _isEnd() : boolean { return this._get() === undefined; }
  _get() : ChartNode|undefined { return undefined; }
}



export class ChartNode {
  protected _children: ChartNode[] = [];
  protected _parent?: WeakRef<ChartNode>;

  get _childNodes() { return this._children; }
  get _parentNode() { return this._parent?.deref(); }
  get _firstChild() : ChartNode|undefined { return this._children.length ? this._children[0] : undefined; }
  get _lastChild() : ChartNode|undefined { return this._children.length ? this._children[this._children.length - 1] : undefined; }

  _appendChild(newNode: ChartNode) : ChartNode|null {
    let parent = newNode._parent?.deref();
    if (parent) {
      if (!parent._removeChild(newNode))
        return null;
    }
    
    newNode._parent = new WeakRef(this);
    this._children.push(newNode);
    return newNode;
  }

  _insertBefore(newNode: ChartNode, referenceNode: ChartNode|null) : ChartNode|null {
    if (referenceNode === null)
      return this._appendChild(newNode);
    
    let parent = newNode._parent?.deref();
    if (parent) {
      if (!parent._removeChild(newNode))
        return null;
    }
    
    let beforeIndex = this._children.findIndex(x => x === referenceNode);
    if (beforeIndex === -1)
      return this._appendChild(newNode);
    
    this._children.splice(beforeIndex, 0, newNode);
    return newNode;
  }

  _removeChild(child: ChartNode) : boolean {
    let childIndex = this._children.findIndex(x => x === child);
    if (childIndex === -1)
      throw false;
    
    this._children.splice(childIndex, 1);
    child._parent = undefined;
    return true;
  }

  _contains(otherNode: ChartNode) : boolean {
    if (this === otherNode)
      return true;
    
    for(const node of this._children) {
      if (node._contains(otherNode))
        return true;
    }

    return false;
  }

  _cloneNode(deep: boolean) : ChartNode {
    let clonedNode = { ...this };
    clonedNode._children = [];
    clonedNode._parent = undefined;

    if (deep) {
      for(const node of this._children) {
        clonedNode._children.push(node._cloneNode(true));
      }
    }

    return clonedNode;
  }

  _findNext(callback: ((node: ChartNode) => boolean)) : ChartNodeIterator {
    let index = -1;
    let itr = new ChartNodeIterator();
    itr._next = () => {
      index = this._children.findIndex(callback, index);
    };
    itr._get = () => {
      if (index === -1) return undefined;
      return this._children[index];
    };

    itr._next();
    return itr;
  }
}



export class ChartObject extends ChartNode {
  _id: number;

  private static _lastId: number = 0;

  constructor() {
    super();
    this._id = ChartObject._lastId;
    ++ChartObject._lastId;
  }
}
