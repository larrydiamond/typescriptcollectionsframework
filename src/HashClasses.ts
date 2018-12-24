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

export class HashMultiSetImpl<K> {

  private datastore:HashMap<K,ArrayList<K>> = null;
  private hashMethods:Hashable<K>;

  constructor (datastore:HashMap<K,ArrayList<K>>, iHash:Hashable<K>) {
    this.datastore = datastore;
    this.hashMethods = iHash;
  }

  public getDataStore () : HashMap<K,ArrayList<K>> {
    return this.datastore;
  }

  public getHashMethods () : Hashable<K> {
    return this.hashMethods;
  }

  public count (item:K) : number {
    if ((this.datastore === null) || (this.datastore === undefined))
      return 0;
    const tmp:ArrayList<K> = this.datastore.get (item);
    if ((tmp === null) || (tmp === undefined)) {
      return 0;
    }
    return tmp.size();
  }

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

  public remove (element:K) : boolean {
    const tmp:ArrayList<K> = this.datastore.get (element);
    if ((tmp === null) || (tmp === undefined)) {
      return false;
    }
    if (tmp.size() === 1) {
      this.datastore.remove (element);
    } else {
      tmp.removeFirst();
    }
    return true;
  }

  public size () : number {
    if ((this.datastore === null) || (this.datastore === undefined))
      return 0;

    let count:number = 0;
    
    for (const iter = this.datastore.entrySet().iterator(); iter.hasNext(); ) {
      const element = iter.next();
      const thisSize = element.getValue().size();
      count = count + thisSize;
    }

    return count;
  }

  public isEmpty () : boolean {
    if ((this.datastore === null) || (this.datastore === undefined))
      return true;
    const tmp:number = this.datastore.size();
    if (tmp === 0)
      return true;
    return false;
  }

  public contains (item:K) : boolean {
    const tmp:ArrayList<K> = this.datastore.get(item);
    if ((tmp === null) || (tmp === undefined))
      return false;
    return true;
  }

  public clear () : void {
    return this.datastore.clear();
  }



}

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
  private impl:HashMultiSetImpl<K> = undefined;
//  private datastore:HashMap<K,ArrayList<K>> = null;
//  private hashMethods:Hashable<K>;

  constructor(iHash:Hashable<K> = AllFieldHashable.instance, private initialElements:ImmutableCollection<K> = null, private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.impl = new HashMultiSetImpl(new HashMap<K,ArrayList<K>>(iHash, null, iInitialCapacity, iLoadFactor), iHash);
    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:K = iter.next ();
        this.add (t);
      }
    }
  }

  /*
  public debug () : undefined {
    console.log ("HashMultiSet debug " + this.datastore.size () + " entries");
    for (let iter = this.datastore.entrySet().iterator() ; iter.hasNext(); ) {
      let tmp = iter.next();
      console.log ("entry " + JSON.stringify(tmp.getKey()) + " has " + tmp.getValue().size() + " entries");
    }
    return;
  }
*/

  /**
  * Returns the number of occurrences of an element in this MultiSet (the count of the element).
  * @param {K} item the element to count occurrences of
  * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
  */
  public count (item:K) : number {
    return this.impl.count(item);
  }

  
  /**
   * Returns an ImmutableSet view of the keys contained in this MultiSet.
   * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
   * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
   * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
   */
   public keySet () : ImmutableSet<K> {
     console.log ("HashMultiSet::keySet not yet implemented");
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
    return this.impl.getHashMethods();
  }

  /**
  * Adds an occurance of the specified element to this MultiSet
  * @param {K} element element to be added to this MultiSet
  * @return {boolean} true if this MultiSet did not already contain the specified element
  */
  public add (element:K) : boolean {
    return this.impl.add(element);
  }

  /**
  * Removes a single occurrence of the specified element from this MultiSet, if present.
  * 
  * The element removed will be equal to the element as per the Hashable used in this MultiSet 
  * and will not necessarily be the element passed in.
  * @param {K} element element equal to this element to be removed from this MultiSet
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    return this.impl.remove (element);
  }

  /**
  * Returns the number of elements in this MultiSet (its cardinality).
  * @return {number} the number of elements in this MultiSet (its cardinality)
  */
  public size () : number {
    return this.impl.size();
  }

  /**
  * Returns true if this MultiSet contains no elements.
  * @return {boolean} true if this MultiSet contains no elements
  */
  public isEmpty () : boolean {
    return this.impl.isEmpty();
  }

  /**
  * Returns true if this MultiSet contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this MultiSet
  * @return {boolean} true if this MultiSet contains the specified element
  */
  public contains (item:K) : boolean {
    return this.impl.contains(item);
  }

  /**
  * Removes all of the elements from this MultiSet. The MultiSet will be empty after this call returns.
  */
  public clear () : void {
    return this.impl.clear();
  }

 /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return new HashSetJIterator(this.impl);
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return new HashSetIterator (this.impl);
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
  private impl:HashMultiSetImpl<T>;
  private entrySet:ImmutableSet<MapEntry<T,ArrayList<T>>>;
  private iter : JIterator<MapEntry<T,ArrayList<T>>>;
  private currentEntry : MapEntry<T,ArrayList<T>>;
  private offset : number;

  constructor (msetimpl:HashMultiSetImpl<T>) {
    this.impl = msetimpl;
  }
  
  public hasNext():boolean {
    if (this.iter === undefined) { // first time caller
      this.entrySet = this.impl.getDataStore().entrySet();
      this.iter = this.impl.getDataStore().entrySet().iterator();
      this.currentEntry = undefined;
      this.offset = 0;
      return this.iter.hasNext();
    } else { // we've already called hasNext before
      if (this.currentEntry === undefined) { // we called hasNext twice without ever calling next 
        return this.iter.hasNext();
      }

      // if we're not at the last item in the arraylist then yes there's another node
      if (this.currentEntry.getValue().size() > (this.offset + 1)) {
        return true;
      }

      // if we're at the last item in the arraylist then see if theres another node
      return this.iter.hasNext();
    }
  }

  public next():T {
    if (this.currentEntry === undefined) { // have we called next before?
      this.currentEntry = this.iter.next();
      if ((this.currentEntry === null) || (this.currentEntry === undefined)) {
        this.currentEntry = undefined;
        return undefined;
      }
      this.offset = 0;
      return this.currentEntry.getValue().get(this.offset);
    }

    if (this.currentEntry.getValue().size() > (this.offset + 1)) {
      this.offset = this.offset + 1;
      return this.currentEntry.getValue().get(this.offset);
    }

    this.currentEntry = this.iter.next();
    if ((this.currentEntry === null) || (this.currentEntry === undefined)) {
      this.currentEntry = undefined;
      return undefined;
    }
    this.offset = 0;
    return this.currentEntry.getValue().get(this.offset);
  }
}

/* TypeScript iterator */
export class HashSetIterator<T> implements Iterator<T> {
  private impl:HashMultiSetImpl<T>;
  private entrySet:ImmutableSet<MapEntry<T,ArrayList<T>>>;
  private iter : JIterator<MapEntry<T,ArrayList<T>>>;
  private currentEntry : MapEntry<T,ArrayList<T>>;
  private offset : number;

  constructor (msetimpl:HashMultiSetImpl<T>) {
    this.impl = msetimpl;
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if (this.entrySet === undefined) { /// first time caller
      this.entrySet = this.impl.getDataStore().entrySet();
      this.iter = this.impl.getDataStore().entrySet().iterator();
      if (this.iter.hasNext() === false) {
        return new BasicIteratorResult(true, null);
      }
      this.currentEntry = this.iter.next();
      this.offset = 0;
      if ((this.currentEntry === null) || (this.currentEntry === undefined)) {
        return new BasicIteratorResult(true, null);
      }
      if ((this.currentEntry.getValue() === null) || (this.currentEntry.getValue() === undefined)) {
        return new BasicIteratorResult(true, null);
      }
      if (this.currentEntry.getValue().size () < (this.offset + 1)) {
        return new BasicIteratorResult(true, null);
      }
      return new BasicIteratorResult (false, this.currentEntry.getValue().get(this.offset));
    }

    if (this.currentEntry.getValue().size() > (this.offset + 1)) {
      this.offset = this.offset + 1;
      return new BasicIteratorResult (false, this.currentEntry.getValue().get(this.offset));
    }

    if (this.iter.hasNext()) {
      this.currentEntry = this.iter.next();
      this.offset = 0;
      return new BasicIteratorResult (false, this.currentEntry.getValue().get(this.offset));
    }
    return new BasicIteratorResult(true, null);
  }
}

