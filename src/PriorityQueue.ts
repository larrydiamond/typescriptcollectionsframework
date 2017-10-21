/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Collectable} from "./Collectable";
import {ImmutableCollection} from "./ImmutableCollection";
import {JIterator} from "./JIterator";
import {Queue} from "./Queue";

export class PriorityQueue<K> implements Queue<K> {
  // A very talented volunteer stepped up to write PriorityQueue.   Im preparing some files for him.   Thank you very much!

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
  * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
  */
  public add (k:K) : boolean {
    return undefined;
  }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
  */
  public offer (k:K) : boolean {
    return undefined;
  }

  /*
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  */
  public poll () : K {
    return undefined;
  }

  /*
  * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
  */
  public removeQueue () : K {
    return undefined;
  }

  /*
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  */
  public peek () : K {
    return undefined;
  }

  /*
  * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  */
  public element () : K {
    return undefined;
  }

  /**
  * Removes all of the elements from this collection. The collection be empty after this call returns.
  */
  public clear () {
    ;
  }

  /**
  * Removes the first occurrence of the specified element from this collection, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
  * @param {K} t element to be removed from this collection, if present
  * @return {K} true if this collection contained the specified element
  */
  public remove (k:K) : boolean {
    return undefined;
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  }

    /**
    * Returns the number of elements in this collection.
    * @return {number} the number of elements in this collection
    */
    public size () : number {
      return undefined;
    }

    /**
    * Returns true if this collection contains no elements.
    * @return {boolean} true if this collection contains no elements
    */
    public isEmpty () : boolean {
      return undefined;
    }

    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    public iterator():JIterator<K> {
      return undefined;
    }

    /**
     * Returns a TypeScript style iterator
     * @return {Iterator<K>} the TypeScript style iterator
     */
    public [Symbol.iterator] ():Iterator<K> {
      return undefined;
    }

    /**
     * Returns true if this collection contains the specified element.
     * @param {K} t element whose presence in this collection is to be tested
     * @return {boolean} true if this collection contains the specified element
     */
    public contains (k:K) : boolean {
      return undefined;
    }



}
