"use strict";
/**
* @license
* Copyright Larry Diamond 2019 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("./AllFieldCollectable");
var LinkedList_1 = require("./LinkedList");
/**
 * A deque which automatically evicts elements from the head of the queue
 * when attempting to add new elements onto the queue and it is full.
 *
 * An evicting queue must be configured with a maximum size.
 * Each time an element is added to a full queue, the queue automatically removes its head element.
 * This is different from conventional bounded queues, which either block or reject new elements when full.
 */
var EvictingDeque = /** @class */ (function () {
    function EvictingDeque(maxSize, iEquals, initialElements) {
        if (iEquals === void 0) { iEquals = AllFieldCollectable_1.AllFieldCollectable.instance; }
        this.initialElements = initialElements;
        this.maxSize = maxSize;
        this.deque = new LinkedList_1.LinkedList(iEquals, initialElements);
    }
    /**
    * Returns the Collectible
    * @return {Collectable}
    */
    EvictingDeque.prototype.getCollectable = function () {
        return this.deque.getCollectable();
    };
    /**
     * Appends the specified element to the end of this list.
     *
     * If the deque is currently full, the element at the head of the queue is evicted to make room.
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    EvictingDeque.prototype.add = function (t) {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.add(t);
    };
    /**
    * Inserts the specified element at the front of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    EvictingDeque.prototype.addFirst = function (t) {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.addFirst(t);
    };
    /**
    * Inserts the specified element at the end of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    EvictingDeque.prototype.addLast = function (t) {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.addLast(t);
    };
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * Needed to implement Queue interface
    * @param {T} t element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    EvictingDeque.prototype.offer = function (t) {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.offer(t);
    };
    /**
    * Inserts the specified element at the front of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    EvictingDeque.prototype.offerFirst = function (t) {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.offerFirst(t);
    };
    /**
    * Inserts the specified element at the end of this deque
    * If the deque is currently full, the element at the head of the queue is evicted to make room.
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    EvictingDeque.prototype.offerLast = function (t) {
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
        return this.deque.offerLast(t);
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    EvictingDeque.prototype.isEmpty = function () {
        return this.deque.isEmpty();
    };
    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    EvictingDeque.prototype.clear = function () {
        this.deque.clear();
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    EvictingDeque.prototype.size = function () {
        return this.deque.size();
    };
    /**
     * Returns true if this list contains the specified element.
     * @param {T} t element whose presence in this list is to be tested
     * @return {boolean} true if this list contains the specified element
     */
    EvictingDeque.prototype.contains = function (t) {
        return this.deque.contains(t);
    };
    /**
     * Removes the first occurrence of the specified element from this list, if it is present.
     * If the list does not contain the element, it is unchanged.
     * More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists).
     * Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
     * @param {T} t element to be removed from this list, if present
     * @return {T} true if this list contained the specified element
     */
    EvictingDeque.prototype.remove = function (t) {
        return this.deque.remove(t);
    };
    /**
     * Removes from this list all of its elements that are contained in the specified collection.
     * @param {Collection} c collection containing elements to be removed from this list
     * @return {boolean} true if this list changed as a result of the call
     */
    EvictingDeque.prototype.removeAll = function (c) {
        return this.deque.removeAll(c);
    };
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    EvictingDeque.prototype.indexOf = function (t) {
        return this.deque.indexOf(t);
    };
    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    EvictingDeque.prototype.removeIndex = function (index) {
        return this.deque.removeIndex(index);
    };
    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     * @param {T} t element to search for
     * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    EvictingDeque.prototype.lastIndexOf = function (t) {
        return this.deque.lastIndexOf(t);
    };
    /**
     * Retrieves, but does not remove, the first element in this list.
     * @return {T} the first element in this list, undefined if the list is empty
     */
    EvictingDeque.prototype.getFirst = function () {
        return this.deque.getFirst();
    };
    /**
    * Retrieves, but does not remove, the last element of this queue.
    * This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the tail of the queue or undefined if empty
    */
    EvictingDeque.prototype.getLast = function () {
        return this.deque.getLast();
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    EvictingDeque.prototype.get = function (index) {
        return this.deque.get(index);
    };
    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    EvictingDeque.prototype.set = function (index, element) {
        return this.deque.set(index, element);
    };
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    EvictingDeque.prototype.poll = function () {
        return this.deque.poll();
    };
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    EvictingDeque.prototype.pollFirst = function () {
        return this.deque.pollFirst();
    };
    /**
    * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    EvictingDeque.prototype.pollLast = function () {
        return this.deque.pollLast();
    };
    /**
  * Retrieves and removes the head of this queue.
  * This method differs from poll only in that it returns undefined if this queue is empty
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or undefined if empty
  */
    EvictingDeque.prototype.removeQueue = function () {
        return this.deque.removeQueue();
    };
    /**
    * Retrieves and removes the head of this queue.
    * This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    EvictingDeque.prototype.removeFirst = function () {
        return this.deque.removeFirst();
    };
    /**
    * Retrieves and removes the element at the end of this queue.
    * This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    EvictingDeque.prototype.removeLast = function () {
        return this.deque.removeLast();
    };
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    EvictingDeque.prototype.peek = function () {
        return this.deque.peek();
    };
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    EvictingDeque.prototype.peekFirst = function () {
        return this.deque.peekFirst();
    };
    /**
    * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    EvictingDeque.prototype.peekLast = function () {
        return this.deque.peekLast();
    };
    /**
  * Retrieves, but does not remove, the head of this queue.
  * This method differs from peek only in that it returns undefined if this queue is empty.
  * Needed to implement Queue
  * @return {T} the element at the head of the queue or null if empty
  */
    EvictingDeque.prototype.element = function () {
        return this.deque.element();
    };
    /**
     * Returns a Java style iterator
     * @return {JIterator<T>} the Java style iterator
     */
    EvictingDeque.prototype.iterator = function () {
        return this.deque.iterator();
    };
    /**
* Returns an ImmutableList backed by this List
*/
    EvictingDeque.prototype.immutableList = function () {
        return this.deque.immutableList();
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    EvictingDeque.prototype.immutableCollection = function () {
        return this.deque.immutableCollection();
    };
    /**
    * Override JSON.stringify handling
    */
    EvictingDeque.prototype.toJSON = function () {
        return this.deque.toJSON();
    };
    /**
       * Returns a TypeScript style iterator
       * @return {Iterator<T>} the TypeScript style iterator
       */
    EvictingDeque.prototype[Symbol.iterator] = function () {
        return this.deque[Symbol.iterator]();
    };
    /**
     * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
     *
     * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).
     *
     * Exceptions thrown by the action are relayed to the caller.
     * @param {Consumer} consumer - the action to be performed for each element
     */
    EvictingDeque.prototype.forEach = function (consumer) {
        return this.deque.forEach(consumer);
    };
    /**
     * Inserts the specified element at the specified position in this list.
     *
     * Shifts the element currently at that position (if any)
     * and any subsequent elements to the right (adds one to their indices).
     * @param {number} index index at which the specified element is to be inserted
     * @param {T} t element to be inserted
     */
    EvictingDeque.prototype.addIndex = function (index, t) {
        this.deque.addIndex(index, t);
        if (this.deque.size() >= this.maxSize) {
            this.deque.poll();
        }
    };
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
    EvictingDeque.prototype.addAll = function (c, index) {
        var tmp = this.deque.addAll(c, index);
        if (tmp === true) {
            while (this.deque.size() >= this.maxSize) {
                this.deque.poll();
            }
        }
        return tmp;
    };
    return EvictingDeque;
}());
exports.EvictingDeque = EvictingDeque;
