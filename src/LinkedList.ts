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

export class LinkedList <T extends Collectable> implements List<T>, Iterable<T> {
  private firstNode:LinkedListNode<T>;
  private lastNode:LinkedListNode<T>;
  private numberElements:number;

  constructor() {
    this.firstNode = null;
    this.lastNode = null;
    this.numberElements = 0;
  }


 /**
  * Appends the specified element to the end of this list
  * @param {T} t element to Append
  * @return {boolean} true if this collection changed as a result of the call
  */
  public add (t:T) : boolean {
    let lln:LinkedListNode<T> = new LinkedListNode<T>(t);

    if (this.firstNode === null) {
      this.firstNode = lln;
      this.lastNode = lln;
      this.numberElements = 1;
      return true;
    }

    this.lastNode.nextNode = lln;
    lln.previousNode = this.lastNode;
    this.lastNode = lln;
    this.numberElements = this.numberElements + 1;
    return true;
  }


 /**
  * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
  * @param {number} index index at which the specified element is to be inserted
  * @param {T} t element to be inserted
  */
  public addElement (index:number, t:T) : void {
    if (index === 0) {
      let newnode:LinkedListNode<T> = new LinkedListNode<T>(t);
      newnode.nextNode = this.firstNode;
      this.firstNode.previousNode = newnode;
      this.firstNode = newnode;
      this.numberElements = this.numberElements + 1;
      return;
    }
    if (index >= this.numberElements) {
      let newnode:LinkedListNode<T> = new LinkedListNode<T>(t);
      if (this.lastNode !== null) {
        this.lastNode.nextNode = newnode;
      }
      newnode.previousNode = this.lastNode;
      this.lastNode = newnode;
      this.numberElements = this.numberElements + 1;
      return;
    }
    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    let previousnode:LinkedListNode<T> = null;
    while (node !== null) {
      if (index === offset) {
        let newnode:LinkedListNode<T> = new LinkedListNode<T>(t);
        newnode.nextNode = node;
        newnode.previousNode = previousnode;
        node.previousNode = newnode;
        if (previousnode !== null) {
          previousnode.nextNode = newnode;
        }
        this.numberElements = this.numberElements + 1;
        return;
      } else {
        previousnode = node;
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return;
  }


 /**
  * Returns true if this list contains no elements.
  * @return {boolean} true if this list contains no elements
  */
  public isEmpty () : boolean {
    if (this.firstNode === null) {
      return true;
    }

    return false;
  }


 /**
  * Removes all of the elements from this list. The list will be empty after this call returns.
  */
  public clear () : void {
    this.firstNode = null;
    this.lastNode = null;
    this.numberElements = 0;
  }


 /**
  * Returns the number of elements in this list.
  * @return {number} the number of elements in this list
  */
  public size () : number {
    return this.numberElements;
  }


 /**
  * Returns true if this list contains the specified element.
  * @param {T} t element whose presence in this list is to be tested
  * @return {boolean} true if this list contains the specified element
  */
  public contains (t:T) : boolean {
    let lln:LinkedListNode<T> = this.getNode(t);
    if (lln === null)
      return false;
    return true;
  }

  private getNode(t:T) : LinkedListNode<T> {
    let node = this.firstNode;
    while (node !== null) {
      if (node.payload.equals(t)) {
        return node;
      } else {
        node = node.nextNode;
      }
    }
    return null;
  }

 /**
  * Removes the first occurrence of the specified element from this list, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
  * @param {T} t element to be removed from this list, if present
  * @return {T} true if this list contained the specified element
  */
  public removeElement (t:T) : boolean {
    if (this.firstNode === null) {
      return false;
    }

    if (this.firstNode === undefined) {
      return false;
    }

    let node:LinkedListNode<T> = this.firstNode;
    while (node !== null) {
      if (node.payload.equals(t)) {
        let previous:LinkedListNode<T> = node.previousNode;
        let following:LinkedListNode<T> = node.nextNode;
        if (previous !== null) {
          previous.nextNode = following;
        } else {
          this.firstNode = following;
        }
        if (following !== null) {
          following.previousNode = previous;
        } else {
          this.lastNode = previous;
        }
        node.nextNode = null;
        node.previousNode = null;
        this.numberElements = this.numberElements - 1;
        return true;
      } else {
        node = node.nextNode;
      }
    }

    return false;
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
  * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
  * @param {T} t element to search for
  * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  public indexOf (t:T) : number {
    if (this.firstNode === null) {
      return -1;
    }
    if (this.numberElements <= 0) {
      return -1;
    }

    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    while (node !== null) {
      if (node.payload.equals(t)) {
        return offset;
      } else {
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return -1;
  }


 /**
  * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
  * @param {number} index the index of the element to be removed
  * @return {T} the element that was removed from the list, undefined if the element does not exist
  */
  public remove (index:number) : T {
    if (this.firstNode === null) {
      return undefined;
    }
    if (this.numberElements <= 0) {
      return undefined;
    }

    if (index === 0) {
      let payload:T = this.firstNode.payload;
      this.firstNode = this.firstNode.nextNode;
      this.numberElements = this.numberElements - 1;
      this.firstNode.previousNode = null;
      return payload;
    }
    if (index === (this.numberElements - 1)) {
      let payload:T = this.lastNode.payload;
      this.lastNode = this.lastNode.previousNode;
      this.numberElements = this.numberElements - 1;
      this.lastNode.nextNode = null;
      return payload;
    }

    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    let previous:LinkedListNode<T> = null;
    while (node !== null) {
      if (index === offset) {
        let payload:T = node.payload;
        previous.nextNode = node.nextNode;
        node.nextNode.previousNode = previous;
        this.numberElements = this.numberElements - 1;
        return node.payload;
      } else {
        previous = node;
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return undefined;
  }


 /**
  * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  * @param {T} t element to search for
  * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  public lastIndexOf (t:T) : number {
    if (this.firstNode === null) {
      return -1;
    }
    if (this.numberElements <= 0) {
      return -1;
    }

    let offset:number = this.numberElements - 1;
    let node:LinkedListNode<T> = this.lastNode;
    while (node !== null) {
      if (node.payload.equals(t)) {
        return offset;
      } else {
        node = node.previousNode;
        offset = offset - 1;
      }
    }
    return -1;
  }


 /**
  * Returns the first element in this list.
  * @return {T} the first element in this list, null if the list is empty
  */
  public getFirst () : T {
    let node = this.firstNode;
    if (node === null) return null;
    return node.payload;
  }

  public getFirstNode () : LinkedListNode<T> {
    let node = this.firstNode;
    if (node === null) return null;
    return node;
  }


 /**
  * Returns the element at the specified position in this list.
  * @param {number} index index of the element to return
  * @return {T} the element at the specified position in this list
  */
  public get(index:number):T {
    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    while (node !== null) {
      if (index === offset) {
        return node.payload;
      } else {
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return null;
  }


 /**
  * Replaces the element at the specified position in this list with the specified element.
  * @param {number} index index of the element to replace
  * @param {T} element element to be stored at the specified position
  * @return {number} the element previously at the specified position
  */
  public set(index:number, element:T) : T {
    let offset:number = 0;
    let node:LinkedListNode<T> = this.firstNode;
    while (node !== null) {
      if (index === offset) {
        let tmp:T = node.payload;
        node.payload = element;
        return tmp;
      } else {
        node = node.nextNode;
        offset = offset + 1;
      }
    }
    return null;
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
    if (t instanceof LinkedList) {
      if (this.size() === t.size()) {
        if (this.size() === 0) {
          return true;
        }
        let thisNode:LinkedListNode<T> = this.getFirstNode();
        let thatNode:LinkedListNode<T> = t.getFirstNode();
        while ((thisNode !== null) && (thatNode !== null) && (thisNode.payload.equals(thatNode.payload))) {
          thisNode = thisNode.nextNode;
          thatNode = thatNode.nextNode;
        }
        if ((thisNode === null) && (thatNode === null)) return true;
        return false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  /**
   * Returns a Java style iterator
   * @return {JIterator<T>} the Java style iterator
   */
  public iterator():JIterator<T> {
    return new LinkedListJIterator(this);
  }

  /**
   * Returns a TypeScript style iterator
   * @return {Iterator<T>} the TypeScript style iterator
   */
  public [Symbol.iterator] ():Iterator<T> {
    return new LinkedListIterator (this);
  }

}

export class LinkedListNode<T extends Collectable> {
  previousNode:LinkedListNode<T>;
  nextNode:LinkedListNode<T>;
  payload:T;

  constructor (t:T) {
    this.payload = t;
    this.previousNode = null;
    this.nextNode = null;
  }
}


/* Java style iterator */
export class LinkedListJIterator<T extends Collectable> implements JIterator<T> {
  private node:LinkedListNode<T>;

  constructor (iList:LinkedList<T>) {
    this.node = iList.getFirstNode();
  }

  public hasNext():boolean {
    if (this.node === null) {
      return false;
    }
    return true;
  }

  public next():T {
    let tmp:T = this.node.payload;
    this.node = this.node.nextNode;
    return tmp;
  }
}


/* TypeScript iterator */
export class LinkedListIterator<T extends Collectable> implements Iterator<T> {
  private node:LinkedListNode<T>;

  constructor (iList:LinkedList<T>) {
    this.node = iList.getFirstNode();
  }

  public next(value?: any): IteratorResult<T> {
    if (this.node === null) {
      return new BasicIteratorResult(true, null);
    } else {
      let tmp:T = this.node.payload;
      this.node = this.node.nextNode;
      return new BasicIteratorResult(false, tmp);
    }
  }
}
