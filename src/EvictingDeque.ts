/**
* @license
* Copyright Larry Diamond 2019 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import { AllFieldCollectable } from "./AllFieldCollectable";
import { Collectable } from "./Collectable";
import { Consumer } from "./Consumer";
import { Deque } from "./Deque";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
import { JIterator } from "./JIterator";
import { LinkedList } from "./LinkedList";
import { List } from "./List";
import { Queue } from "./Queue";

/**
 * A deque which automatically evicts elements from the head of the queue 
 * when attempting to add new elements onto the queue and it is full.
 * 
 * An evicting queue must be configured with a maximum size. 
 * Each time an element is added to a full queue, the queue automatically removes its head element. 
 * This is different from conventional bounded queues, which either block or reject new elements when full.
 */

export class EvictingDeque<T> implements List<T>, Queue<T>, Deque<T> {
    private deque: LinkedList<T>;
    private maxSize: number;

    constructor(maxSize: number, iEquals: Collectable<T> = AllFieldCollectable.instance, private initialElements?: ImmutableCollection<T>) {
        this.maxSize = maxSize;
        this.deque = new LinkedList(iEquals, initialElements);
    }

    /**
    * Returns the Collectible
    * @return {Collectable}
    */
    public getCollectable(): Collectable<T> {
        return this.deque.getCollectable();
    }

    /**
     * Appends the specified element to the end of this list.
     * 
     * If the deque is currently full, the element at the head of the queue is evicted to make room.
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    public add(t: T): boolean {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.add(t);
    }

    /**
    * Inserts the specified element at the front of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addFirst(t: T): boolean {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.addFirst(t);
    }

    /**
    * Inserts the specified element at the end of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public addLast(t: T): boolean {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.addLast(t);
    }

    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * Needed to implement Queue interface
    * @param {T} t element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    public offer(t: T): boolean {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.offer(t);
    }

    /**
    * Inserts the specified element at the front of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public offerFirst(t: T): boolean {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.offerFirst(t);
    }

    /**
    * Inserts the specified element at the end of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    public offerLast(t: T): boolean {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.offerLast(t);
    }

    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    public isEmpty(): boolean {
        return this.deque.isEmpty();
    }

    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    public clear(): void {
        this.deque.clear();
    }

    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    public size(): number {
        return this.deque.size();
    }

    /**
     * Returns true if this list contains the specified element.
     * @param {T} t element whose presence in this list is to be tested
     * @return {boolean} true if this list contains the specified element
     */
    public contains(t: T): boolean {
        return this.deque.contains(t);
    }

    /**
     * Removes the first occurrence of the specified element from this list, if it is present. 
     * If the list does not contain the element, it is unchanged. 
     * More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). 
     * Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
     * @param {T} t element to be removed from this list, if present
     * @return {T} true if this list contained the specified element
     */
    public remove(t: T): boolean {
        return this.deque.remove(t);
    }

    /**
     * Removes from this list all of its elements that are contained in the specified collection.
     * @param {Collection} c collection containing elements to be removed from this list
     * @return {boolean} true if this list changed as a result of the call
     */
    public removeAll(c: ImmutableCollection<T>): boolean {
        return this.deque.removeAll(c);
    }

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    public indexOf(t: T): number {
        return this.deque.indexOf(t);
    }


    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    public removeIndex(index: number): T {
        return this.deque.removeIndex(index);
    }

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     * @param {T} t element to search for
     * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    public lastIndexOf(t: T): number {
        return this.deque.lastIndexOf(t);
    }

    /**
     * Retrieves, but does not remove, the first element in this list.
     * @return {T} the first element in this list, undefined if the list is empty
     */
    public getFirst(): T {
        return this.deque.getFirst();
    }

    /**
    * Retrieves, but does not remove, the last element of this queue. 
    * This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the tail of the queue or undefined if empty
    */
    public getLast(): T {
        return this.deque.getLast();
    }

    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    public get(index: number): T {
        return this.deque.get(index);
    }

    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    public set(index: number, element: T): T {
        return this.deque.set(index, element);
    }

    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    public poll(): T {
        return this.deque.poll();
    }

    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    public pollFirst(): T {
        return this.deque.pollFirst();
    }

    /**
    * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    public pollLast(): T {
        return this.deque.pollLast();
    }

    /**
  * Retrieves and removes the head of this queue. 
  * This method differs from poll only in that it returns undefined if this queue is empty
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or undefined if empty
  */
    public removeQueue(): T {
        return this.deque.removeQueue();
    }

    /**
    * Retrieves and removes the head of this queue. 
    * This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    public removeFirst(): T {
        return this.deque.removeFirst();
    }

    /**
    * Retrieves and removes the element at the end of this queue. 
    * This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    public removeLast(): T {
        return this.deque.removeLast();
    }



    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    public peek(): T {
        return this.deque.peek();
    }


    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    public peekFirst(): T {
        return this.deque.peekFirst();
    }

    /**
    * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    public peekLast(): T {
        return this.deque.peekLast();
    }

    /**
  * Retrieves, but does not remove, the head of this queue. 
  * This method differs from peek only in that it returns undefined if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
    public element(): T {
        return this.deque.element();
    }

    /**
     * Returns a Java style iterator
     * @return {JIterator<T>} the Java style iterator
     */
    public iterator(): JIterator<T> {
        return this.deque.iterator();
    }

    /**
* Returns an ImmutableList backed by this List
*/
    public immutableList(): ImmutableList<T> {
        return this.deque.immutableList();
    }

    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    public immutableCollection(): ImmutableCollection<T> {
        return this.deque.immutableCollection();
    }

    /**
    * Override JSON.stringify handling
    */
    public toJSON(): Array<T> {
        return this.deque.toJSON();
    }

    /**
       * Returns a TypeScript style iterator
       * @return {Iterator<T>} the TypeScript style iterator
       */
    public [Symbol.iterator](): Iterator<T> {
        return this.deque[Symbol.iterator]();
    }

    /**
     * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. 
     * 
     * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). 
     * 
     * Exceptions thrown by the action are relayed to the caller.
     * @param {Consumer} consumer - the action to be performed for each element
     */
    public forEach(consumer: Consumer<T>): void {
        return this.deque.forEach(consumer);
    }

 /**
  * Inserts the specified element at the specified position in this list. 
  * 
  * Shifts the element currently at that position (if any) 
  * and any subsequent elements to the right (adds one to their indices).
  * @param {number} index index at which the specified element is to be inserted
  * @param {T} t element to be inserted
  */
    public addIndex (index:number, t:T) : void {
        this.deque.addIndex (index, t);
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
    }


 /**
  * Inserts all of the elements in the specified collection into this list, 
  * starting at the specified position. Shifts the element currently at that position (if any) 
  * and any subsequent elements to the right (increases their indices). 
  * 
  * The new elements will appear in the list in the order that they are returned by the specified 
  * collection's iterator.
  * @param {number} index index at which to insert the first element from the specified collection
  * @param {Collection} c collection containing elements to be added to this list
  * @return {boolean} true if this collection changed as a result of the call
  */
    public addAll (c:ImmutableCollection<T>, index?:number) : boolean {
        const tmp: boolean = this.deque.addAll (c, index);
        if (tmp === true) {
            while (this.deque.size() >= this.maxSize) {
                this.deque.poll();
            }
        }
        return tmp;
    }

}