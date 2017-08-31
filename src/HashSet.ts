/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {BasicIteratorResult} from "./BasicIteratorResult";
import {Comparator} from "./Comparator";
import {JIterator} from "./JIterator";
import {Hashable} from "./Hashable";
import {HashMap} from "./HashMap";
import {HashMapIteratorLocationTracker} from "./HashMap";
import {JSet} from "./JSet";

export class HashSet<K extends Hashable> implements JSet<K> {

  private datastore:HashMap<K,number> = null;

  constructor(private initialElements:JSet<K> = new HashSet<K>(null, 20, 0.75), private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.datastore = new HashMap<K,number>(null, iInitialCapacity, iLoadFactor);
    if (initialElements !== null) {
      // TODO
    }
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    let tmp:number = this.datastore.put(element, 1);
    if (tmp === null) {
      return false;
    }

    return true;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    if (this.datastore === null)
      return 0;
    return this.datastore.size();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    if (this.datastore === null)
      return true;
    let tmp:number = this.datastore.size();
    if (tmp === 0)
      return true;
    return false;
  }

  /**
  * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this set
  * @return {boolean} true if this set contains the specified element
  */
  public contains (item:K) : boolean {
    let tmp:number = this.datastore.get(item);
    if (tmp === null)
      return false;
    return true;
  }

  /**
  * Removes all of the elements from this set. The set will be empty after this call returns.
  */
  public clear () : void {
    return this.datastore.clear();
  }

 /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return new HashSetJIterator(this);
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return new HashSetIterator (this);
  }
}


/* Java style iterator */
export class HashSetJIterator<T extends Hashable> implements JIterator<T> {
  private location:T;
  private set:HashSet<T>;

  constructor (iSet:HashSet<T>) {
    this.set = iSet;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      let first:T = null; // TODO this.set.first();
      if (first === undefined)
        return false;
      return true;
    } else { // we've already called this iterator before
      let tmp:T = null; // TODO this.set.getNextHigherKey(this.location);
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():T {
    if (this.location === undefined) { // first time caller
      let first:T = null; // TODO this.set.first();
      if (first === undefined) {
        return null;
      } else {
        this.location = first;
        return first;
      }
    } else { // we've already called this iterator before
      let tmp:T = null; // TODO this.set.getNextHigherKey(this.location);
      if (tmp === null) {
        return null;
      } else {
        this.location = tmp;
        return tmp;
      }
    }
  }
}

/* TypeScript iterator */
export class HashSetIterator<T extends Hashable> implements Iterator<T> {
  private location:T;
  private set:HashSet<T>;

  constructor (iSet:HashSet<T>) {
    this.set = iSet;
    this.location = null; // TODO this.set.first();
  }

  public next(value?: any): IteratorResult<T> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    let tmp:BasicIteratorResult<T> = new BasicIteratorResult (false, this.location);
    this.location = null; // TODO this.set.getNextHigherKey (this.location);
    return tmp;
  }
}
