/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

 import {Collectable} from "./Collectable";
 import {JIterator} from "./JIterator";
 import {List} from "./List";

/* Java style iterator */
export class ArrayListJIterator<T extends Collectable> implements JIterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  hasNext():boolean {
    if (this.offset < this.arraylist.size())
      return true;
    return false;
  }

  next():T {
    return this.arraylist.get (this.offset++);
  }
}

export class ArrayList<T extends Collectable> implements List<T>, Iterable<T> {
  elements:T[] = null;
  sizeValue:number = 0;

  add (t:T) : boolean {
    if (this.elements == null) {
      this.elements = new Array<T>();
    }
    this.elements.push (t);
    this.sizeValue = this.sizeValue + 1;
    return true;
  }

  clear () {
    this.elements = new Array<T>();
    this.sizeValue = 0;
  }

  get(index:number):T {
    return this.elements [index];
  }

  indexOf (t:T) : number {
    if (this.elements == null)
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = 0; loop < this.sizeValue; loop++) {
      let e = this.get (loop);
      if (e.equals (t))
        return loop;
    }

    return -1;
  }

  isEmpty () : boolean {
    if (this.sizeValue == 0)
      return true;

    return false;
  }

  set(index:number, element:T):T {
    let tmp:T = this.elements [index];
    this.elements [index] = element;
    return tmp;
  }

  size () : number {
    return this.sizeValue;
  }

  /* java style iteration */
  iterator():JIterator<T> {
    return new ArrayListJIterator(this);
  }

  /* for eventual support of TypeScript iteration */
  [Symbol.iterator] ():Iterator<T> {
    return new ArrayListIterator (this);
  }

}


/* for eventual support of TypeScript iteration */
export class ArrayListIteratorResult<T extends Collectable> implements IteratorResult<T> {
    done:boolean;
    value:T;

    constructor(iDone:boolean, iValue:T) {
      this.done = iDone;
      this.value = iValue;
    }
}

/* for eventual support of TypeScript iteration */
export class ArrayListIterator<T extends Collectable> implements Iterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  next(value?: any): IteratorResult<T> {
    if (this.offset < this.arraylist.size()) {
      return new ArrayListIteratorResult(false, this.arraylist.get (this.offset++));
    } else {
      return new ArrayListIteratorResult(true, null);
    }
  }

/*
  return?(value?: any): IteratorResult<T> {
    return null;
  }

  throw?(e?: any): IteratorResult<T> {
    return null;
  }
  */
}
