export class ChartNodeIterator {
  _next() { }
  _isEnd() : boolean { return this._get() === undefined; }
  _get() : ChartNode|undefined { return undefined; }
}



export class ChartNode {
  protected _children: ChartNode[] = [];
  protected _parent?: WeakRef<ChartNode>;
  protected _nextSibling?: WeakRef<ChartNode>;
  protected _previousSibling?: WeakRef<ChartNode>;

  get _childNodes() { return this._children; }
  get _parentNode() { return this._parent?.deref(); }
  get _firstChild() : ChartNode|undefined { return this._children.length ? this._children[0] : undefined; }
  get _lastChild() : ChartNode|undefined { return this._children.length ? this._children[this._children.length - 1] : undefined; }
  get _nextSiblingNode() { return this._nextSibling?.deref(); }
  get _previousSiblingNode() { return this._previousSibling?.deref(); }

  _create() { return new ChartNode(); }

  _appendChild(newNode: ChartNode) : ChartNode|null {
    let parent = newNode._parent?.deref();
    if (parent) {
      if (!parent._removeChild(newNode))
        return null;
    }
    
    newNode._parent = new WeakRef(this);
    let lastChild = this._lastChild;
    if (lastChild) {
      newNode._previousSibling = new WeakRef(lastChild);
      lastChild._nextSibling = new WeakRef(newNode);
    }

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
    
    newNode._parent = new WeakRef(this);
    this._children[beforeIndex]._nextSibling = new WeakRef(newNode);
    newNode._previousSibling = new WeakRef(this._children[beforeIndex]);
    if (beforeIndex + 1 < this._children.length) {
      newNode._nextSibling = new WeakRef(this._children[beforeIndex + 1]);
      this._children[beforeIndex + 1]._previousSibling = new WeakRef(newNode);
    }
    
    this._children.splice(beforeIndex, 0, newNode);
    return newNode;
  }

  _removeChild(child: ChartNode) : boolean {
    let childIndex = this._children.findIndex(x => x === child);
    if (childIndex === -1)
      throw false;
    
    this._children.splice(childIndex, 1);
    child._parent = undefined;
    child._previousSibling = undefined;
    child._nextSibling = undefined;
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
    let clonedNode = this._create();
    this._copyPropertiesTo(clonedNode);

    if (deep) {
      for(const node of this._children) {
        clonedNode._children.push(node._cloneNode(true));
      }
    }

    return clonedNode;
  }

  _copyPropertiesTo(to: ChartNode) {
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

  /** 子ノードを並べ替える */
  _sortChild(compareFn?: ((a: ChartNode, b: ChartNode) => number) | undefined) {
    this._children.sort(compareFn);
    this._validateSiblingRelation();
  }

  /** 兄弟関係を整理 */
  protected _validateSiblingRelation() {
    if (this._children.length === 0)
      return;
    
    this._children[0]._previousSibling = undefined;
    for(let i = 1; i < this._children.length - 1; ++i) {
      this._children[i - 1]._nextSibling = new WeakRef(this._children[i]);
      this._children[i]._previousSibling = new WeakRef(this._children[i - 1]);
    }
    this._children[this._children.length - 1]._nextSibling = undefined;
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

  _create() { return new ChartObject(); }

  _copyPropertiesTo(to: ChartObject) {
    super._copyPropertiesTo(to);
    to._id = this._id;
  }
}
