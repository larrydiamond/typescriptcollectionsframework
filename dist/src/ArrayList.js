"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var ArrayList = (function () {
    function ArrayList(iEquals, initialElements) {
        this.initialElements = initialElements;
        this.elements = null;
        this.sizeValue = 0;
        this.equality = iEquals;
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var t = iter.next();
                this.add(t);
            }
        }
    }
    /**
    * Returns the Collectible
    * @return {Collectable}
    */
    ArrayList.prototype.getCollectable = function () {
        return this.equality;
    };
    /**
    * Appends the specified element to the end of this list
    * @param {T} t element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    ArrayList.prototype.add = function (t) {
        if ((this.elements === null) || (this.elements === undefined)) {
            this.elements = new Array();
        }
        this.elements.push(t);
        this.sizeValue = this.sizeValue + 1;
        return true;
    };
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    * Needed to implement Queue interface
    * @param {T} t element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    ArrayList.prototype.offer = function (t) {
        return this.add(t);
    };
    /**
      * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
      * @param {number} index index at which the specified element is to be inserted
      * @param {T} t element to be inserted
      */
    ArrayList.prototype.addIndex = function (index, t) {
        if ((this.elements === null) || (this.elements === undefined)) {
            this.elements = new Array();
        }
        this.elements.splice(index, 0, t);
        this.sizeValue = this.sizeValue + 1;
    };
    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    ArrayList.prototype.addFirst = function (t) {
        this.addIndex(0, t);
        return true;
    };
    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    ArrayList.prototype.offerFirst = function (t) {
        return this.addFirst(t);
    };
    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    ArrayList.prototype.addLast = function (t) {
        return this.add(t);
    };
    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    ArrayList.prototype.offerLast = function (t) {
        return this.addLast(t);
    };
    /**
     * Inserts all of the elements in the specified collection into this list, starting at the specified position. Shifts the element currently at that position (if any) and any subsequent elements to the right (increases their indices). The new elements will appear in the list in the order that they are returned by the specified collection's iterator.
     * @param {number} index index at which to insert the first element from the specified collection
     * @param {Collection} c collection containing elements to be added to this list
     * @return {boolean} true if this collection changed as a result of the call
     */
    ArrayList.prototype.addAll = function (c, index) {
        if (c === null)
            return false;
        if (c === undefined)
            return false;
        if (c.size() < 1)
            return false;
        var offsetToStartAt = this.size();
        if (index) {
            offsetToStartAt = index;
        }
        for (var iter = c.iterator(); iter.hasNext();) {
            var t = iter.next();
            this.addIndex(index, t);
            index = index + 1;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    ArrayList.prototype.removeIndex = function (index) {
        if ((this.elements === null) || (this.elements === undefined)) {
            return undefined;
        }
        var element = this.elements[index];
        this.elements.splice(index, 1);
        this.sizeValue = this.sizeValue - 1;
        return element;
    };
    /**
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    ArrayList.prototype.removeFirst = function () {
        return this.removeIndex(0);
    };
    /**
    * Retrieves and removes the element at the end of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    ArrayList.prototype.removeLast = function () {
        return this.removeIndex(this.size() - 1);
    };
    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    ArrayList.prototype.clear = function () {
        this.elements = new Array();
        this.sizeValue = 0;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    ArrayList.prototype.get = function (index) {
        return this.elements[index];
    };
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    ArrayList.prototype.indexOf = function (t) {
        if ((this.elements === null) || (this.elements === undefined))
            return -1;
        if (this.sizeValue <= 0)
            return -1;
        for (var loop = 0; loop < this.sizeValue; loop++) {
            var e = this.get(loop);
            if (this.equality.equals(e, t))
                return loop;
        }
        return -1;
    };
    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     * @param {T} t element to search for
     * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    ArrayList.prototype.lastIndexOf = function (t) {
        if ((this.elements === null) || (this.elements === undefined))
            return -1;
        if (this.sizeValue <= 0)
            return -1;
        for (var loop = this.sizeValue - 1; loop >= 0; loop--) {
            var e = this.get(loop);
            if (this.equality.equals(e, t))
                return loop;
        }
        return -1;
    };
    /**
     * Returns true if this list contains the specified element.
     * @param {T} t element whose presence in this list is to be tested
     * @return {boolean} true if this list contains the specified element
     */
    ArrayList.prototype.contains = function (t) {
        if (this.indexOf(t) === -1)
            return false;
        return true;
    };
    /**
     * Removes the first occurrence of the specified element from this list, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
     * @param {T} t element to be removed from this list, if present
     * @return {T} true if this list contained the specified element
     */
    ArrayList.prototype.remove = function (t) {
        if ((this.elements === null) || (this.elements === undefined)) {
            return false;
        }
        var offset = this.indexOf(t);
        if (offset === -1) {
            return false;
        }
        this.removeIndex(offset);
        return true;
    };
    /**
     * Removes from this list all of its elements that are contained in the specified collection.
     * @param {Collection} c collection containing elements to be removed from this list
     * @return {boolean} true if this list changed as a result of the call
     */
    ArrayList.prototype.removeAll = function (c) {
        if (c === null)
            return false;
        if (c === undefined)
            return false;
        if (c.size() < 1)
            return false;
        var changed = false;
        for (var iter = c.iterator(); iter.hasNext();) {
            var t = iter.next();
            var tmp = this.remove(t);
            if (tmp === true)
                changed = true;
        }
        return changed;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    ArrayList.prototype.isEmpty = function () {
        if (this.sizeValue === 0)
            return true;
        return false;
    };
    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    ArrayList.prototype.set = function (index, element) {
        var tmp = this.elements[index];
        this.elements[index] = element;
        return tmp;
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    ArrayList.prototype.size = function () {
        return this.sizeValue;
    };
    /**
     * Retrieves and removes the head of this queue, or returns null if this queue is empty.
     * Needed to implement Queue
     * @return {T} the element at the head of the queue or null if empty
     */
    ArrayList.prototype.poll = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return null;
        }
        if (this.sizeValue <= 0) {
            return null;
        }
        var element = this.get(0);
        this.removeIndex(0);
        return element;
    };
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    ArrayList.prototype.pollFirst = function () {
        return this.poll();
    };
    /**
    * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    ArrayList.prototype.pollLast = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return undefined;
        }
        if (this.sizeValue <= 0) {
            return undefined;
        }
        var element = this.get(this.size() - 1);
        this.removeIndex(this.size() - 1);
        return element;
    };
    /**
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or undefined if empty
    */
    ArrayList.prototype.removeQueue = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return undefined;
        }
        if (this.sizeValue <= 0) {
            return undefined;
        }
        var element = this.get(0);
        this.removeIndex(0);
        return element;
    };
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    ArrayList.prototype.peek = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return null;
        }
        if (this.sizeValue <= 0) {
            return null;
        }
        var element = this.get(0);
        return element;
    };
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    ArrayList.prototype.peekFirst = function () {
        return this.peek();
    };
    /**
    * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    ArrayList.prototype.peekLast = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return null;
        }
        if (this.sizeValue <= 0) {
            return null;
        }
        var element = this.get(this.size() - 1);
        return element;
    };
    /**
    * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the head of the queue or undefined if empty
    */
    ArrayList.prototype.getFirst = function () {
        return this.peek();
    };
    /**
    * Retrieves, but does not remove, the last element of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the end of the queue or undefined if empty
    */
    ArrayList.prototype.getLast = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return undefined;
        }
        if (this.sizeValue <= 0) {
            return undefined;
        }
        var element = this.get(this.size() - 1);
        return element;
    };
    /**
    * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or undefined if empty
    */
    ArrayList.prototype.element = function () {
        if ((this.elements === null) || (this.elements === undefined)) {
            return undefined;
        }
        if (this.sizeValue <= 0) {
            return undefined;
        }
        var element = this.get(0);
        return element;
    };
    /**
     * Returns a Java style iterator
     * @return {JIterator<T>} the Java style iterator
     */
    ArrayList.prototype.iterator = function () {
        return new ArrayListJIterator(this);
    };
    /**
     * Returns a TypeScript style iterator
     * @return {Iterator<T>} the TypeScript style iterator
     */
    ArrayList.prototype[Symbol.iterator] = function () {
        return new ArrayListIterator(this);
    };
    /**
    * Returns an ImmutableList backed by this List
    */
    ArrayList.prototype.immutableList = function () {
        return this;
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    ArrayList.prototype.immutableCollection = function () {
        return this;
    };
    return ArrayList;
}());
exports.ArrayList = ArrayList;
/* Java style iterator */
var ArrayListJIterator = (function () {
    function ArrayListJIterator(iArrayList) {
        this.offset = 0;
        this.arraylist = iArrayList;
    }
    ArrayListJIterator.prototype.hasNext = function () {
        if (this.offset < this.arraylist.size())
            return true;
        return false;
    };
    ArrayListJIterator.prototype.next = function () {
        return this.arraylist.get(this.offset++);
    };
    return ArrayListJIterator;
}());
exports.ArrayListJIterator = ArrayListJIterator;
/* TypeScript iterator */
var ArrayListIterator = (function () {
    function ArrayListIterator(iArrayList) {
        this.offset = 0;
        this.arraylist = iArrayList;
    }
    // tslint:disable-next-line:no-any
    ArrayListIterator.prototype.next = function (value) {
        if (this.offset < this.arraylist.size()) {
            return new BasicIteratorResult_1.BasicIteratorResult(false, this.arraylist.get(this.offset++));
        }
        else {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
    };
    return ArrayListIterator;
}());
exports.ArrayListIterator = ArrayListIterator;
