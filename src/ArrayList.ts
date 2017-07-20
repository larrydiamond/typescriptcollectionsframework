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

/**
 * Appends the specified element to the end of this list
 * @param {T} t element to Append
 * @return {boolean} true if this collection changed as a result of the call
 */
  add (t:T) : boolean {
    if (this.elements == null) {
      this.elements = new Array<T>();
    }
    this.elements.push (t);
    this.sizeValue = this.sizeValue + 1;
    return true;
  }

/**
 * Removes all of the elements from this list. The list will be empty after this call returns.
 */
  clear () {
    this.elements = new Array<T>();
    this.sizeValue = 0;
  }

/**
 * Returns the element at the specified position in this list.
 * @param {number} index index of the element to return
 * @return {T} the element at the specified position in this list
 */
  get(index:number):T {
    return this.elements [index];
  }

/**
 * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
 * @param {T} t element to search for
 * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
 */
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

/**
 * Returns true if this list contains no elements.
 * @return {boolean} true if this list contains no elements
 */
  isEmpty () : boolean {
    if (this.sizeValue == 0)
      return true;

    return false;
  }

/**
 * Replaces the element at the specified position in this list with the specified element.
 * @param {number} index index of the element to replace
 * @param {T} element element to be stored at the specified position
 * @return {number} the element previously at the specified position
 */
  set(index:number, element:T):T {
    let tmp:T = this.elements [index];
    this.elements [index] = element;
    return tmp;
  }


/**
 * Returns the number of elements in this list.
 * @return {number} the number of elements in this list
 */
  size () : number {
    return this.sizeValue;
  }

  /**
   * Returns a Java style iterator
   * @return {JIterator<T>} the Java style iterator
   */
  iterator():JIterator<T> {
    return new ArrayListJIterator(this);
  }

  /* Easy iteration */
  /*
  for ((value: T) => void) : void {

  }
  */

  /**
   * Returns a TypeScript style iterator
   * @return {Iterator<T>} the TypeScript style iterator
   */
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
