/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {ArrayList} from "./ArrayList";
import {AllFieldHashable} from "./AllFieldHashable";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {Collections} from "./Collections";
import {Consumer} from "./Consumer";
import {JIterator} from "./JIterator";
import {Hashable} from "./Hashable";
import {HashMap} from "./HashMap";
import {HashMapIteratorLocationTracker} from "./HashMap";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableMultiSet} from "./ImmutableMultiSet";
import {ImmutableSet} from "./ImmutableSet";
import {MultiSet} from "./MultiSet";
import { MapEntry } from "./MapEntry";
import { KeyIterator } from "./LinkedHashMap";

/**
 * This class implements the MultiSet interface, backed by a HashMap instance.
 *
 * It makes no guarantees as to the iteration order of the MultiSet; 
 * in particular, it does not guarantee that the order will remain constant over time.
 * This class permits the null element and the undefined element
 *
 * This class offers constant time performance for the basic operations (add, remove, contains and size),
 * assuming the hash function disperses the elements properly among the buckets. <br>
 * Iterating over this MultiSet requires time proportional to the sum of the HashMultiSet instance's size
 * (the number of elements) plus the "capacity" of the backing HashMap instance (the number of buckets). <br>
 * Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
 *
 * This class corresponds to com.google.common.collect.HashMultiSet
 */
export class HashMultiSet<K> implements MultiSet<K> {

  private datastore:HashMap<K,ArrayList<K>> = null;
  private hashMethods:Hashable<K>;

  constructor(iHash:Hashable<K> = AllFieldHashable.instance, private initialElements:ImmutableCollection<K> = null, private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.hashMethods = iHash;
    this.datastore = new HashMap<K,ArrayList<K>>(this.hashMethods, null, iInitialCapacity, iLoadFactor);
    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:K = iter.next ();
        this.add (t);
      }
    }
  }

  
  /**
  * Returns the number of occurrences of an element in this MultiSet (the count of the element).
  * @param {K} item the element to count occurrences of
  * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
  */
  public count (item:K) : number {
    return 0;
  }

  
  /**
   * Returns an ImmutableSet view of the keys contained in this MultiSet.
   * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
   * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
   * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
   */
   public keySet () : ImmutableSet<K> {
     return null;
   }
  
   
   /**
   * Returns an ImmutableMultiSet view of the elements contained in this MultiSet.
   * The ImmutableMultiSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableMultiSet.
   * If the MultiSet is modified while an iteration over the returned ImmutableMultiSet is in progress the results of the iteration are undefined.
   * @return {ImmutableMultiSet<K>} a view of the set of distinct elements in this MultiSet
   */
   public elementSet () : ImmutableMultiSet<K> {
     return null;
   }


  /**
  * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. 
  * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). 
  * Exceptions thrown by the action are relayed to the caller.
  * @param {Consumer} consumer - the action to be performed for each element
  */
  public forEach(consumer:Consumer<K>) : void {
   for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
     const t:K = iter.next();
     consumer.accept(t);
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
  * Adds an occurance of the specified element to this MultiSet
  * @param {K} element element to be added to this MultiSet
  * @return {boolean} true if this MultiSet did not already contain the specified element
  */
  public add (element:K) : boolean {
    const tmp:ArrayList<K> = this.datastore.get (element);
    if ((tmp === null) || (tmp === undefined)) {
      const al:ArrayList<K> = new ArrayList<K>(this.hashMethods);
      al.add (element);
      this.datastore.put (element, al);
      return true;
    } else {
      tmp.add (element);
      return false;
    }
  }

  /**
  * Removes a single occurrence of the specified element from this MultiSet, if present.
  * @param {K} element element to be removed from this MultiSet
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    const tmp:ArrayList<K> = this.datastore.get (element);
    if ((tmp === null) || (tmp === undefined)) {
      return false;
    }
    if (tmp.size() >= 1) {
      this.datastore.remove (element);
    } else {
      tmp.removeLast();
    }
    return true;
  }

  /**
  * Returns the number of elements in this MultiSet (its cardinality).
  * @return {number} the number of elements in this MultiSet (its cardinality)
  */
  public size () : number {
    if (this.datastore === null)
      return 0;

    let count:number = 0;
    
    for (const iter = this.datastore.entrySet().iterator(); iter.hasNext(); ) {
      const element = iter.next();
      const thisSize = element.getValue().size();
      count = count + thisSize;
    }

    return count;
  }

  /**
  * Returns true if this MultiSet contains no elements.
  * @return {boolean} true if this MultiSet contains no elements
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
  * Returns true if this MultiSet contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this MultiSet
  * @return {boolean} true if this MultiSet contains the specified element
  */
  public contains (item:K) : boolean {
    const tmp:ArrayList<K> = this.datastore.get(item);
    if ((tmp === null) || (tmp === undefined))
      return false;
    return true;
  }

  /**
  * Removes all of the elements from this MultiSet. The MultiSet will be empty after this call returns.
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

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  }

  /**
  * Returns an ImmutableMultiSet backed by this MultiSet
  */
  public immutableMultiSet () : ImmutableMultiSet<K> {
    return this;
  }

  /**
  * Override JSON.stringify handling
  */
  public toJSON () : string {
    const tmp : Array<K> = Collections.asArray(this);
    return JSON.stringify (tmp);
  }
}


/* Java style iterator */
export class HashSetJIterator<T> implements JIterator<T> {
  private location:HashMapIteratorLocationTracker<T,number>;
  private set:HashMultiSet<T>;

  constructor (iSet:HashMultiSet<T>) {
    this.set = iSet;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const first:HashMapIteratorLocationTracker<T,number> = null; // this.set.deprecatedGetFirstEntryForIterator();
      if (first === undefined) {
        return false;
      }
      if (first === null) {
        return false;
      }
      return true;
    } else { // we've already called this iterator before
      const tmp:HashMapIteratorLocationTracker<T,number> = null; // this.set.deprecatedGetNextEntryForIterator(this.location);
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():T {
    if (this.location === undefined) { // first time caller
      const first:HashMapIteratorLocationTracker<T,number> = null; // this.set.deprecatedGetFirstEntryForIterator();
      if (first === undefined) {
        return null;
      }
      if (first === null) {
        return null;
      }
      this.location = first;
      return first.entry.getKey();
    } else { // we've already called this iterator before
      const tmp:HashMapIteratorLocationTracker<T,number> = null; // this.set.deprecatedGetNextEntryForIterator(this.location);
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
  private set:HashMultiSet<T>;

  constructor (iSet:HashMultiSet<T>) {
    this.set = iSet;
    this.location = null; // this.set.deprecatedGetFirstEntryForIterator();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<T> = new BasicIteratorResult (false, this.location.entry.getKey());
    this.location = null; // this.set.deprecatedGetNextEntryForIterator(this.location);
    return tmp;
  }
}
