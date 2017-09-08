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

export class HashSet<K> implements JSet<K> {

  private datastore:HashMap<K,number> = null;
  private hashMethods:Hashable<K>;

  constructor(iHash:Hashable<K>, private initialElements:JSet<K> = null, private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.hashMethods = iHash;
    this.datastore = new HashMap<K,number>(this.hashMethods, null, iInitialCapacity, iLoadFactor);

    if ((initialElements !== null) && (initialElements !== undefined)){
      for (let iter = initialElements.iterator(); iter.hasNext(); ) {
        let t:K = iter.next ();
        this.add (t);
      }
    }
  }

  /**
  * Returns the Hashable
  * @return {Hashable}
  */
  public getHashable () : Hashable<K> {
    return this.hashMethods;
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    let tmp:number = this.datastore.put(element, 1);
    if (tmp === undefined) {
      return true;
    }

    return false;
  }

  /**
  * Removes the specified element from this set if it is present.
  * @param {K} element element to be removed from this set
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    let tmp:number = this.datastore.remove(element);
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
    * This method is deprecated and will be removed in a future revision.
    * @deprecated
    */
    public deprecatedGetFirstEntryForIterator ():HashMapIteratorLocationTracker<K,number> {
      return this.datastore.deprecatedGetFirstEntryForIterator();
    }


    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
     public deprecatedGetNextEntryForIterator (current:HashMapIteratorLocationTracker<K,number>):HashMapIteratorLocationTracker<K,number> {
         return this.datastore.deprecatedGetNextEntryForIterator(current);
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
export class HashSetJIterator<T> implements JIterator<T> {
  private location:HashMapIteratorLocationTracker<T,number>;
  private set:HashSet<T>;

  constructor (iSet:HashSet<T>) {
    this.set = iSet;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      let first:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetFirstEntryForIterator();
      if (first === undefined) {
        return false;
      }
      if (first === null) {
        return false;
      }
      return true;
    } else { // we've already called this iterator before
      let tmp:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetNextEntryForIterator(this.location);
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():T {
    if (this.location === undefined) { // first time caller
      let first:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetFirstEntryForIterator();
      if (first === undefined) {
        return null;
      }
      if (first === null) {
        return null;
      }
      this.location = first;
      return first.entry.getKey();
    } else { // we've already called this iterator before
      let tmp:HashMapIteratorLocationTracker<T,number> = this.set.deprecatedGetNextEntryForIterator(this.location);
      if (tmp === null) {
        return null;
      } else {
        this.location = tmp;
        return tmp.entry.getKey();
      }
    }
  }
}

/* TypeScript iterator */
export class HashSetIterator<T> implements Iterator<T> {
  private location:HashMapIteratorLocationTracker<T,number>;
  private set:HashSet<T>;

  constructor (iSet:HashSet<T>) {
    this.set = iSet;
    this.location = this.set.deprecatedGetFirstEntryForIterator();
  }

  public next(value?: any): IteratorResult<T> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    let tmp:BasicIteratorResult<T> = new BasicIteratorResult (false, this.location.entry.getKey());
    this.location = this.set.deprecatedGetNextEntryForIterator(this.location);
    return tmp;
  }
}
