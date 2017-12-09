/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {BasicIteratorResult} from "./BasicIteratorResult";
import {Comparator} from "./Comparator";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";
import {JSet} from "./JSet";
import {NavigableSet} from "./NavigableSet";
import {TreeMap} from "./TreeMap";

export class TreeSet<K> implements NavigableSet<K> {

  private datastore:TreeMap<K,number> = null;

  constructor(iComparator:Comparator<K>, private initialElements?:ImmutableCollection<K>) {
    this.datastore = new TreeMap<K,number>(iComparator);

    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:K = iter.next ();
        this.add (t);
      }
    }
  }

  public validateSet() : boolean {
    return this.datastore.validateMap();
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    const tmp:number = this.datastore.put(element, 1);
    if (tmp === null) {
      return true;
    }

    return false;
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
   * Returns the comparator used to order the keys in this set
   * @return {Comparator} the comparator used to order the keys in this set
   */
   public comparator () : Comparator<K> {
     return this.datastore.comparator();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    if (this.datastore === null)
      return true;
    const tmp:number = this.datastore.size();
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
    const tmp:number = this.datastore.get(item);
    if (tmp === null)
      return false;
    return true;
  }

 /**
  * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
  * @param {K} item to find floor node for
  * @return {K} the greatest element less than or equal to e, or null if there is no such element
  */
  public floor (item:K) : K {
    const tmp:K = this.datastore.floorKey(item);
    if (tmp === undefined)
      return null;
    return tmp;
  }

 /**
  * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
  * @param {K} item to find ceiling node for
  * @return {K} the least element greater than or equal to item, or null if there is no such element
  */
  public ceiling (item:K) : K {
    const tmp:K = this.datastore.ceilingKey(item);
    if (tmp === undefined)
      return null;
    return tmp;
  }


  /**
  * Returns the first (lowest) element currently in this set.
  * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
  */
  public first () : K {
    return this.datastore.firstKey();
  }

  /**
  * Returns the last (highest) element currently in this set.
  * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
  */
  public last () : K {
    return this.datastore.lastKey();
  }

  /**
  * Removes the specified element from this set if it is present.
  * @param {K} element element to be removed from this set
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    const tmp:number = this.datastore.remove(element);
    if (tmp === null) {
      return false;
    }

    return true;
  }

  /**
  * Removes all of the elements from this set. The set will be empty after this call returns.
  */
  public clear () : void {
    return this.datastore.clear();
  }

 /**
  * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
  * @return {K} the first (lowest) element, or null if this set is empty
  */
  public pollFirst () : K {
    if (this.datastore.size() === 0)
      return null;

    const tmp:K = this.datastore.firstKey();
    this.datastore.remove(tmp);
    return tmp;
  }

 /**
  * Retrieves and removes the last (highest) element, or returns null if this set is empty.
  * @return {K} the last (highest) element, or null if this set is empty
  */
  public pollLast () : K {
    if (this.datastore.size() === 0)
      return null;

    const tmp:K = this.datastore.lastKey();
    this.datastore.remove(tmp);
    return tmp;
  }

 /**
  * Needed For Iterator
  * @param {K} key the given key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public getNextHigherKey (key:K) : K {
    return this.datastore.getNextHigherKey(key);
  }

/*
  public printSet () {
    return this.datastore.printMap();
  }
/* */

 /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return new TreeSetJIterator(this);
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return new TreeSetIterator (this);
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  }

  /**
  * Returns an ImmutableSet backed by this Set
  */
  public immutableSet () : ImmutableSet<K> {
    return this;
  }
}


/* Java style iterator */
export class TreeSetJIterator<T> implements JIterator<T> {
  private location:T;
  private set:TreeSet<T>;

  constructor (iSet:TreeSet<T>) {
    this.set = iSet;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const first:T = this.set.first();
      if ((first === undefined) || (first === null))
        return false;
      return true;
    } else { // we've already called this iterator before
      const tmp:T = this.set.getNextHigherKey(this.location);
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():T {
    if ((this.location === undefined) || (this.location === null)) { // first time caller
      const first:T = this.set.first();
      if (first === undefined) {
        return null;
      } else {
        this.location = first;
        return first;
      }
    } else { // we've already called this iterator before
      const tmp:T = this.set.getNextHigherKey(this.location);
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
export class TreeSetIterator<T> implements Iterator<T> {
  private location:T;
  private set:TreeSet<T>;

  constructor (iSet:TreeSet<T>) {
    this.set = iSet;
    this.location = this.set.first();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<T> = new BasicIteratorResult (false, this.location);
    this.location = this.set.getNextHigherKey (this.location);
    return tmp;
  }
}
