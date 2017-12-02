/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {Collectable} from "./Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "./Comparator";
import {ImmutableCollection} from "./ImmutableCollection";
import {JIterator} from "./JIterator";
import {Queue} from "./Queue";
import {TreeSet} from "./TreeSet";

export class PriorityQueue<K> implements Queue<K> {
  private pQueue: TreeSet<K>;
  private capacity: number;
  private defaultCapacity: number = 11;

  constructor(capacity?: number, iComparator?:Comparator<K>) {
    if (capacity !== null && capacity != undefined)
      this.capacity = capacity;
    else this.capacity = this.defaultCapacity;

    if (iComparator !== null && iComparator !== undefined)
      this.pQueue = new TreeSet<K>(iComparator);
    else this.pQueue = null;   
  }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
  * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
  */
  public add (k:K) : boolean {
    if (this.pQueue.size() < this.capacity) 
      return this.pQueue.add(k);
    return false;
  }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
  */
  public offer (k:K) : boolean {
    if (this.pQueue.size() < this.capacity) 
      return this.pQueue.add(k);
    return false;
  }

  /*
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  */
  public poll () : K {
    if (this.pQueue.isEmpty()) return null;
    return this.pQueue.pollFirst();
  }

  /*
  * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
  */
  public removeQueue () : K {
    if (this.pQueue.isEmpty()) return undefined;
    return this.pQueue.pollFirst();
  }

  /*
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  */
  public peek () : K { 
    if (this.pQueue.isEmpty()) return null;
    return this.pQueue.first();
  }

  /*
  * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  */
  public element () : K {
    if (this.pQueue.isEmpty()) return undefined;
    return this.pQueue.first();
  }

  /**
  * Removes all of the elements from this collection. The collection be empty after this call returns.
  */
  public clear () {
    if (this.pQueue.isEmpty()) return;
    this.pQueue.clear();
  }

  /**
  * Removes the first occurrence of the specified element from this collection, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
  * @param {K} t element to be removed from this collection, if present
  * @return {K} true if this collection contained the specified element
  */
  public remove (k:K) : boolean {
    return this.pQueue.remove(k);
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this.pQueue.immutableCollection();
  }

  /**
  * Returns the number of elements in this collection.
  * @return {number} the number of elements in this collection
  */
  public size () : number {
    return this.pQueue.size();
  }

  /**
  * Returns true if this collection contains no elements.
  * @return {boolean} true if this collection contains no elements
  */
  public isEmpty () : boolean {
    return this.pQueue.isEmpty();
  }

  /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return this.pQueue.iterator();
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
     return this.pQueue[Symbol.iterator]();
  }

  /**
  * Returns true if this collection contains the specified element.
  * @param {K} t element whose presence in this collection is to be tested
  * @return {boolean} true if this collection contains the specified element
  */
  public contains (k:K) : boolean {
    return this.pQueue.contains(k);
  }

}
