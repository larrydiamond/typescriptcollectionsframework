/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import {Collectable} from "./Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "./Comparator";
import {Consumer} from "./Consumer";
import {ImmutableCollection} from "./ImmutableCollection";
import {JIterator} from "./JIterator";
import {Queue} from "./Queue";
import {TreeSet} from "./TreeSet";

/**
 * An unbounded priority queue based on a priority heap.  The elements of the priority queue are ordered by a Comparator provided at queue construction time.
 *
 * The head of this queue is the least element with respect to the specified ordering.
 * The queue retrieval operations poll, remove, peek, and element access the element at the head of the queue.
 * The iterator will traverse the elements of the priority queue in increasing order.
 * Duplicate entries are not permitted in this implementation.
 *
 * Implementation note: this implementation provides O(log(n)) time for the enqueuing and dequeuing methods (offer, poll, remove() and add);
 * linear time for the remove(Object) and contains(Object) methods; and constant time for the retrieval methods (peek, element, and size).
 *
 * This class corresponds to java.util.PriorityQueue
 */
export class PriorityQueue<K> implements Queue<K> {
  private pQueue: TreeSet<K>;

  constructor(iComparator:Comparator<K>, private initialElements?:ImmutableCollection<K>) {
    this.pQueue = new TreeSet<K>(iComparator);

    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:K = iter.next ();
        this.add (t);
      }
    }
  }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
  * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
  */
  public add (k:K) : boolean {
    return this.pQueue.add(k);
  }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
  */
  public offer (k:K) : boolean {
    return this.pQueue.add(k);
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

  /**
  * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
  * @param {Consumer} consumer - the action to be performed for each element
  */
  public forEach(consumer:Consumer<K>) : void {
   for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
     const t:K = iter.next();
     consumer.accept(t);
   }
  }

  /**
  * Override JSON.stringify handling
  */
  public toJSON () : string {
    const tmp : Array<K> = Collections.asArray(this);
    return JSON.stringify (tmp);
  }

}
