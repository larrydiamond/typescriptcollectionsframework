/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {AllFieldCollectable} from "./AllFieldCollectable";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {Collectable} from "./Collectable";
import {Collection} from "./Collection";
import {Consumer} from "./Consumer";
import {Deque} from "./Deque";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableList} from "./ImmutableList";
import {JIterator} from "./JIterator";
import {List} from "./List";
import {Queue} from "./Queue";

/**
 * Resizable-array implementation of the List interface.
 *
 * The size, isEmpty, get, set, iterator, and listIterator operations run in constant time. <br>
 * The add operation runs in amortized constant time, that is, adding n elements requires O(n) time. <br>
 * All of the other operations run in linear time (roughly speaking). The constant factor is low compared to that for the LinkedList implementation.
 *
 * This implementation also implements the Queue and Deque interfaces in addition to the List interface
 *
 * This class corresponds to java.util.ArrayList
 */
export class ArrayList<T> implements List<T>, Queue<T>, Deque<T> {
  private elements:T[] = null;
  private sizeValue:number = 0;
  private equality:Collectable<T>;

  constructor (iEquals:Collectable<T> = AllFieldCollectable.instance, private initialElements?:ImmutableCollection<T>) {
    this.equality = iEquals;
    if ((initialElements !== null) && (initialElements !== undefined)){
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const t:T = iter.next ();
        this.add (t);
      }
    }
  }

  /**
  * Returns the Collectible
  * @return {Collectable}
  */
  public getCollectable () : Collectable<T> {
    return this.equality;
  }

  /**
  * Appends the specified element to the end of this list
  * @param {T} t element to Append
  * @return {boolean} true if this collection changed as a result of the call
  */
  public add (t:T) : boolean {
    if ((this.elements === null) || (this.elements === undefined)) {
      this.elements = new Array<T>();
    }
    this.elements.push (t);
    this.sizeValue = this.sizeValue + 1;
    return true;
  }

  /**
  * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
  * Needed to implement Queue interface
  * @param {T} t element to Append
  * @return {boolean} true if this collection changed as a result of the call
  */
  public offer (t:T) : boolean {
    return this.add (t);
  }

  /**
    * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
    * @param {number} index index at which the specified element is to be inserted
    * @param {T} t element to be inserted
    */
    public addIndex (index:number, t:T) : void {
      if ((this.elements === null) || (this.elements === undefined)) {
        this.elements = new Array<T>();
      }
      this.elements.splice (index, 0, t);
      this.sizeValue = this.sizeValue + 1;
    }

    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addFirst (t:T) : boolean {
      this.addIndex (0, t);
      return true;
    }

    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public offerFirst (t:T) : boolean {
      return this.addFirst (t);
    }

    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addLast (t:T) : boolean {
      return this.add (t);
    }

    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public offerLast (t:T) : boolean {
      return this.addLast (t);
    }

   /**
    * Inserts all of the elements in the specified collection into this list, starting at the specified position. Shifts the element currently at that position (if any) and any subsequent elements to the right (increases their indices). The new elements will appear in the list in the order that they are returned by the specified collection's iterator.
    * @param {number} index index at which to insert the first element from the specified collection
    * @param {Collection} c collection containing elements to be added to this list
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addAll (c:ImmutableCollection<T>, index?:number) : boolean {
      if (c === null) return false;
      if (c === undefined) return false;
      if (c.size() < 1) return false;
      let offsetToStartAt = this.size();
      if (index) {
        offsetToStartAt = index;
      }

      for (const iter = c.iterator(); iter.hasNext(); ) {
        const t:T = iter.next ();
        this.addIndex (index, t);
        index = index + 1;
      }

      return true;
    }

   /**
    * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
    * @param {number} index the index of the element to be removed
    * @return {T} the element that was removed from the list, undefined if the element does not exist
    */
    public removeIndex (index:number) : T {
      if ((this.elements === null) || (this.elements === undefined)) {
        return undefined;
      }
      if (this.size() < 1) {
        return undefined;
      }
      const element:T = this.elements [index];
      this.elements.splice (index, 1);
      this.sizeValue = this.sizeValue - 1;
      return element;
    }

    /**
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    public removeFirst () : T {
      return this.removeIndex (0);
    }

    /**
    * Retrieves and removes the element at the end of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    public removeLast () : T {
      if (this.size() < 1) {
        return undefined;
      }
      return this.removeIndex (this.size() - 1);
    }

/**
 * Removes all of the elements from this list. The list will be empty after this call returns.
 */
  public clear () : void {
    this.elements.fill(null);  // Help the garbage collector
    this.elements = new Array<T>();
    this.sizeValue = 0;
  }

/**
 * Returns the element at the specified position in this list.
 * @param {number} index index of the element to return
 * @return {T} the element at the specified position in this list
 */
  public get(index:number):T {
    return this.elements [index];
  }

/**
 * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
 * @param {T} t element to search for
 * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
 */
  public indexOf (t:T) : number {
    if ((this.elements === null) || (this.elements === undefined))
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = 0; loop < this.sizeValue; loop++) {
      const e = this.get (loop);
      if (this.equality.equals (e, t))
        return loop;
    }

    return -1;
  }


 /**
  * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  * @param {T} t element to search for
  * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  public lastIndexOf (t:T) : number {
    if ((this.elements === null) || (this.elements === undefined))
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = this.sizeValue - 1; loop >= 0; loop--) {
      const e = this.get (loop);
      if (this.equality.equals (e, t))
        return loop;
    }

    return -1;
  }


/**
 * Returns true if this list contains the specified element.
 * @param {T} t element whose presence in this list is to be tested
 * @return {boolean} true if this list contains the specified element
 */
  public contains (t:T) : boolean {
    if (this.indexOf (t) === -1)
      return false;
    return true;
  }

 /**
  * Removes the first occurrence of the specified element from this list, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
  * @param {T} t element to be removed from this list, if present
  * @return {T} true if this list contained the specified element
  */
  public remove (t:T) : boolean {
    if ((this.elements === null) || (this.elements === undefined)) {
      return false;
    }

    const offset:number = this.indexOf (t);
    if (offset === -1) {
      return false;
    }

    this.removeIndex (offset);
    return true;
  }

 /**
  * Removes from this list all of its elements that are contained in the specified collection.
  * @param {Collection} c collection containing elements to be removed from this list
  * @return {boolean} true if this list changed as a result of the call
  */
  public removeAll (c:ImmutableCollection<T>) : boolean {
    if (c === null) return false;
    if (c === undefined) return false;
    if (c.size() < 1) return false;

    let changed:boolean = false;

    for (const iter = c.iterator(); iter.hasNext(); ) {
      const t:T = iter.next ();
      const tmp = this.remove(t);
      if (tmp === true) changed = true;
    }

    return changed;
  }

/**
 * Returns true if this list contains no elements.
 * @return {boolean} true if this list contains no elements
 */
  public isEmpty () : boolean {
    if (this.sizeValue === 0)
      return true;

    return false;
  }

/**
 * Replaces the element at the specified position in this list with the specified element.
 * @param {number} index index of the element to replace
 * @param {T} element element to be stored at the specified position
 * @return {number} the element previously at the specified position
 */
  public set(index:number, element:T) : T {
    const tmp:T = this.elements [index];
    this.elements [index] = element;
    return tmp;
  }

/**
 * Returns the number of elements in this list.
 * @return {number} the number of elements in this list
 */
  public size () : number {
    return this.sizeValue;
  }

 /**
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
  public poll () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return null;
    }
    if (this.sizeValue <= 0) {
      return null;
    }

    const element:T = this.get (0);
    this.removeIndex (0);
    return element;
  }

  /**
   * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
   * @param {Consumer} consumer - the action to be performed for each element
   */
   public forEach(consumer:Consumer<T>) : void {
     for (const iter:JIterator<T> = this.iterator(); iter.hasNext(); ) {
       const t:T = iter.next();
       consumer.accept(t);
     }
   }

  /**
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public pollFirst () : T {
    return this.poll();
  }

  /**
  * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public pollLast () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return null;
    }
    if (this.sizeValue <= 0) {
      return null;
    }

    const element:T = this.get (this.size() - 1);
    this.removeIndex (this.size() - 1);
    return element;
  }

  /**
  * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or undefined if empty
  */
  public removeQueue () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return undefined;
    }
    if (this.sizeValue <= 0) {
      return undefined;
    }

    const element:T = this.get (0);
    this.removeIndex (0);
    return element;
  }

  /**
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
  public peek () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return null;
    }
    if (this.sizeValue <= 0) {
      return null;
    }

    const element:T = this.get (0);
    return element;
  }

  /**
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public peekFirst () : T {
    return this.peek();
  }

  /**
  * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  public peekLast () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return null;
    }
    if (this.sizeValue <= 0) {
      return null;
    }

    const element:T = this.get (this.size() - 1);
    return element;
  }

  /**
  * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  * @return {K} the element at the head of the queue or undefined if empty
  */
  public getFirst () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return undefined;
    }
    if (this.sizeValue <= 0) {
      return undefined;
    }

    const element:T = this.get (0);
    return element;
  }

  /**
  * Retrieves, but does not remove, the last element of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  * @return {K} the element at the end of the queue or undefined if empty
  */
  public getLast () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return undefined;
    }

    if (this.sizeValue <= 0) {
      return undefined;
    }

    const element:T = this.get (this.size() - 1);
    return element;
  }

  /**
  * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or undefined if empty
  */
  public element () : T {
    if ((this.elements === null) || (this.elements === undefined)) {
      return undefined;
    }
    if (this.sizeValue <= 0) {
      return undefined;
    }

    const element:T = this.get (0);
    return element;
  }

  /**
   * Returns a Java style iterator
   * @return {JIterator<T>} the Java style iterator
   */
  public iterator():JIterator<T> {
    return new ArrayListJIterator(this);
  }

  /**
   * Returns a TypeScript style iterator
   * @return {Iterator<T>} the TypeScript style iterator
   */
  public [Symbol.iterator] ():Iterator<T> {
    return new ArrayListIterator (this);
  }

  /**
  * Returns an ImmutableList backed by this List
  */
  public immutableList () : ImmutableList<T> {
    return this;
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<T> {
    return this;
  }

}

/* Java style iterator */
export class ArrayListJIterator<T> implements JIterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  public hasNext():boolean {
    if (this.offset < this.arraylist.size())
      return true;
    return false;
  }

  public next():T {
    return this.arraylist.get (this.offset++);
  }
}

/* TypeScript iterator */
export class ArrayListIterator<T> implements Iterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if (this.offset < this.arraylist.size()) {
      return new BasicIteratorResult(false, this.arraylist.get (this.offset++));
    } else {
      return new BasicIteratorResult(true, null);
    }
  }
}
