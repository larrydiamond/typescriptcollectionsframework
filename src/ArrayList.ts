/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {BasicIteratorResult} from "./BasicIteratorResult";
import {Collectable} from "./Collectable";
import {Collection} from "./Collection";
import {JIterator} from "./JIterator";
import {List} from "./List";

export class ArrayList<T extends Collectable> implements List<T>, Iterable<T> {
  elements:T[] = null;
  sizeValue:number = 0;

  constructor (private initialElements:Collection<T> = null) {
    if (initialElements !== null) {
      for (let iter = initialElements.iterator(); iter.hasNext(); ) {
        let t:T = iter.next ();
        this.add (t);
      }
    }
  }

  /**
   * Appends the specified element to the end of this list
   * @param {T} t element to Append
   * @return {boolean} true if this collection changed as a result of the call
   */
    public add (t:T) : boolean {
      if (this.elements === null) {
        this.elements = new Array<T>();
      }
      this.elements.push (t);
      this.sizeValue = this.sizeValue + 1;
      return true;
    }

   /**
    * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
    * @param {number} index index at which the specified element is to be inserted
    * @param {T} t element to be inserted
    */
    public addElement (index:number, t:T) : void {
      if (this.elements === null) {
        this.elements = new Array<T>();
      }
      this.elements.splice (index, 0, t);
      this.sizeValue = this.sizeValue + 1;
    }

   /**
    * Inserts all of the elements in the specified collection into this list, starting at the specified position. Shifts the element currently at that position (if any) and any subsequent elements to the right (increases their indices). The new elements will appear in the list in the order that they are returned by the specified collection's iterator.
    * @param {number} index index at which to insert the first element from the specified collection
    * @param {Collection} c collection containing elements to be added to this list
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addAll (c:Collection<T>, index?:number) : boolean {
      if (c === null) return false;
      if (c === undefined) return false;
      if (c.size() < 1) return false;
      let offsetToStartAt = this.size();
      if (index) {
        offsetToStartAt = index;
      }

      for (let iter = c.iterator(); iter.hasNext(); ) {
        let t:T = iter.next ();
        this.addElement (index, t);
        index = index + 1;
      }

      return true;
    }

   /**
    * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
    * @param {number} index the index of the element to be removed
    * @return {T} the element that was removed from the list, undefined if the element does not exist
    */
    public remove (index:number) : T {
      if (this.elements === null) {
        return undefined;
      }
      let element:T = this.elements [index];
      this.elements.splice (index, 1);
      this.sizeValue = this.sizeValue - 1;
      return element;
    }


/**
 * Removes all of the elements from this list. The list will be empty after this call returns.
 */
  public clear () : void {
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
    if (this.elements === null)
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = 0; loop < this.sizeValue; loop++) {
      let e = this.get (loop);
      if (e.equals (t))
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
    if (this.elements === null)
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = this.sizeValue - 1; loop >= 0; loop--) {
      let e = this.get (loop);
      if (e.equals (t))
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
  public removeElement (t:T) : boolean {
    if (this.elements === null) {
      return false;
    }

    if (this.elements === undefined) {
      return false;
    }

    let offset:number = this.indexOf (t);
    if (offset === -1) {
      return false;
    }

    this.remove (offset);
    return true;
  }

 /**
  * Removes from this list all of its elements that are contained in the specified collection.
  * @param {Collection} c collection containing elements to be removed from this list
  * @return {boolean} true if this list changed as a result of the call
  */
  public removeAll (c:Collection<T>) : boolean {
    if (c === null) return false;
    if (c === undefined) return false;
    if (c.size() < 1) return false;

    let changed:boolean = false;

    for (let iter = c.iterator(); iter.hasNext(); ) {
      let t:T = iter.next ();
      let tmp = this.removeElement(t);
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
    let tmp:T = this.elements [index];
    this.elements [index] = element;
    return tmp;
  }

 /**
  * Indicates whether some other object is "equal to" this one.
  * The equals method implements an equivalence relation on non-null object references:
  * It is reflexive: for any non-null reference value x, x.equals(x) should return true.
  * It is symmetric: for any non-null reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.
  * It is transitive: for any non-null reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.
  * It is consistent: for any non-null reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.
  * For any non-null reference value x, x.equals(null) should return false.
  * The equals method implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).
  * @param {T} t element to compare
  * @return {boolean} true if the other element is "equal" to this one
  */
  public equals (t:any) : boolean {
    if (t === null) return false;
    if (t === undefined) return false;
    if (t instanceof ArrayList) {
      if (this.size() === t.size()) {
        if (this.size() === 0) {
          return true;
        }

        for (let loop:number = 0; loop < this.size(); loop++) {
          let thisentry:T = this.get (loop);
          let thatentry:T = t.get (loop);
          if (thisentry.equals (thatentry)) {
            // keep going
          } else {
            return false;
          }
        }

        return true;

      } else {
        return false;
      }
    } else {
      return false;
    }
  }


/**
 * Returns the number of elements in this list.
 * @return {number} the number of elements in this list
 */
  public size () : number {
    return this.sizeValue;
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

}

/* Java style iterator */
export class ArrayListJIterator<T extends Collectable> implements JIterator<T> {
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
export class ArrayListIterator<T extends Collectable> implements Iterator<T> {
  private offset:number = 0;
  private arraylist:ArrayList<T>;

  constructor (iArrayList:ArrayList<T>) {
    this.arraylist = iArrayList;
  }

  public next(value?: any): IteratorResult<T> {
    if (this.offset < this.arraylist.size()) {
      return new BasicIteratorResult(false, this.arraylist.get (this.offset++));
    } else {
      return new BasicIteratorResult(true, null);
    }
  }
}
