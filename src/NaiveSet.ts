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
import {NaiveMap} from "./NaiveMap";
import {JSet} from "./JSet";

export class NaiveSet<K> implements JSet<K> {
  private datastore:NaiveMap<K,number> = null;

  private comparator:Comparator<K> = null;

  constructor(iComparator:Comparator<K>) {
    this.comparator = iComparator;
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    let tmp:number = this.datastore.put(element, 1);
    if (tmp === null)
      return false;
    return true;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    return this.datastore.size();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
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
  * Returns the first (lowest) element currently in this set.
  * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
  */
  public first () : K {
    return this.datastore.firstKey();
  }

  /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return new NaiveSetJIterator(this);
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return new NaiveSetIterator (this);
  }
}


/* Java style iterator */
export class NaiveSetJIterator<T> implements JIterator<T> {
  private location:T;
  private set:NaiveSet<T>;

  constructor (iSet:NaiveSet<T>) {
    this.set = iSet;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      let first:T = this.set.first();
      if (first === undefined)
        return false;
      return true;
    } else { // we've already called this iterator before
      return false; //TODO
    }
  }

  public next():T {
    if (this.location === undefined) { // first time caller
      let first:T = this.set.first();
      if (first === undefined) {
        return null;
      } else {
        this.location = first;
        return first;
      }
    } else { // we've already called this iterator before
      return null; // TODO
    }
  }
}

/* TypeScript iterator */
export class NaiveSetIterator<T> implements Iterator<T> {
  private location:T;
  private set:JSet<T>;

  constructor (iSet:NaiveSet<T>) {
    this.set = iSet;
  }

  public next(value?: any): IteratorResult<T> {
    return new BasicIteratorResult(true, null); //TODO
  }
}
