export class LineIteratior implements IterableIterator<string> {
  protected readonly _buf: string;
  protected _startIndex: number = 0; 
  protected _lastChar: string = ""; 
  protected _done: boolean = false; 

  constructor(readonly buf: string) {
    this._buf = buf;
  }
  
  [Symbol.iterator](): IterableIterator<string> {
    return this;
  }

  next(): IteratorResult<string> {
    if (this._done)
      return { done: true, value: null };

    for(let index = this._startIndex; index < this._buf.length; ++index) {
      let c = this._buf[index];
      if (c === "\r" || c === "\n") {
        if (this._lastChar === "\r" && c === "\n") {
          this._startIndex = index + 1;
        }
        else {
          let line = this._buf.substring(this._startIndex, index);
          this._startIndex = index + 1;
          this._lastChar = c;
          return {
            done: false,
            value: line
          };
        }
      }
      this._lastChar = c;
    }

    this._done = true;
    if (this._startIndex < this._buf.length - 1)
      return {
        done: false,
        value: this._buf.substring(this._startIndex, this._buf.length)
      };
    
    return { done: true, value: null };
  }
}



export function toBoolean(str: string) : boolean {
	return str === "1" ||
          str === "true" ||
          str === "y" ||
          str === "yes" ||
          str === "enable" ||
          str === "enabled";
}
