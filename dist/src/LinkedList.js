"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("./AllFieldCollectable");
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var Collections_1 = require("./Collections");
/**
 * Doubly-linked list implementation of the List, Queue, and Deque interfaces.
 *
 * All of the operations perform as could be expected for a doubly-linked list.
 * Operations that index into the list will traverse the list from the beginning or the end, whichever is closer to the specified index.
 *
 * This class corresponds to java.util.LinkedList
 */
var LinkedList = /** @class */ (function () {
    function LinkedList(iEquals, initialElements) {
        if (iEquals === void 0) { iEquals = AllFieldCollectable_1.AllFieldCollectable.instance; }
        this.initialElements = initialElements;
        this.equality = iEquals;
        this.firstNode = null;
        this.lastNode = null;
        this.numberElements = 0;
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
    LinkedList.prototype.getCollectable = function () {
        return this.equality;
    };
    /**
     * Appends the specified element to the end of this list
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    LinkedList.prototype.add = function (t) {
        var lln = new LinkedListNode(t);
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
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
    };
    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    LinkedList.prototype.addFirst = function (t) {
        var lln = new LinkedListNode(t);
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            this.firstNode = lln;
            this.lastNode = lln;
            this.numberElements = 1;
            return true;
        }
        this.firstNode.previousNode = lln;
        lln.nextNode = this.firstNode;
        this.firstNode = lln;
        this.numberElements = this.numberElements + 1;
        return true;
    };
    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    LinkedList.prototype.addLast = function (t) {
        return this.add(t);
    };
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    * Needed to implement Queue interface
    * @param {T} t element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    LinkedList.prototype.offer = function (t) {
        return this.add(t);
    };
    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    LinkedList.prototype.offerFirst = function (t) {
        return this.addFirst(t);
    };
    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    LinkedList.prototype.offerLast = function (t) {
        return this.addLast(t);
    };
    /**
     * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
     * @param {number} index index at which the specified element is to be inserted
     * @param {T} t element to be inserted
     */
    LinkedList.prototype.addIndex = function (index, t) {
        if (index === 0) {
            var newnode = new LinkedListNode(t);
            newnode.nextNode = this.firstNode;
            if (this.firstNode !== null)
                this.firstNode.previousNode = newnode;
            this.firstNode = newnode;
            this.numberElements = this.numberElements + 1;
            return;
        }
        if (index >= this.numberElements) {
            var newnode = new LinkedListNode(t);
            if (this.lastNode !== null) {
                this.lastNode.nextNode = newnode;
            }
            newnode.previousNode = this.lastNode;
            this.lastNode = newnode;
            this.numberElements = this.numberElements + 1;
            return;
        }
        var offset = 0;
        var node = this.firstNode;
        var previousnode = null;
        while ((node !== null) && (node !== undefined)) {
            if (index === offset) {
                var newnode = new LinkedListNode(t);
                newnode.nextNode = node;
                newnode.previousNode = previousnode;
                node.previousNode = newnode;
                if (previousnode !== null) {
                    previousnode.nextNode = newnode;
                }
                this.numberElements = this.numberElements + 1;
                return;
            }
            else {
                previousnode = node;
                node = node.nextNode;
                offset = offset + 1;
            }
        }
        return;
    };
    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    LinkedList.prototype.isEmpty = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return true;
        }
        return false;
    };
    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    LinkedList.prototype.clear = function () {
        this.firstNode = null;
        this.lastNode = null;
        this.numberElements = 0;
    };
    /**
     * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
     * @param {Consumer} consumer - the action to be performed for each element
     */
    LinkedList.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    LinkedList.prototype.size = function () {
        return this.numberElements;
    };
    /**
     * Returns true if this list contains the specified element.
     * @param {T} t element whose presence in this list is to be tested
     * @return {boolean} true if this list contains the specified element
     */
    LinkedList.prototype.contains = function (t) {
        var lln = this.getNode(t);
        if (lln === null)
            return false;
        return true;
    };
    LinkedList.prototype.getNode = function (t) {
        var node = this.firstNode;
        while ((node !== null) && (node !== undefined)) {
            if (this.equality.equals(node.payload, t)) {
                return node;
            }
            else {
                node = node.nextNode;
            }
        }
        return null;
    };
    /**
     * Removes the first occurrence of the specified element from this list, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
     * @param {T} t element to be removed from this list, if present
     * @return {T} true if this list contained the specified element
     */
    LinkedList.prototype.remove = function (t) {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return false;
        }
        var node = this.firstNode;
        while ((node !== null) && (node !== undefined)) {
            if (this.equality.equals(node.payload, t)) {
                var previous = node.previousNode;
                var following = node.nextNode;
                if (previous !== null) {
                    previous.nextNode = following;
                }
                else {
                    this.firstNode = following;
                }
                if (following !== null) {
                    following.previousNode = previous;
                }
                else {
                    this.lastNode = previous;
                }
                node.nextNode = null;
                node.previousNode = null;
                this.numberElements = this.numberElements - 1;
                return true;
            }
            else {
                node = node.nextNode;
            }
        }
        return false;
    };
    /**
     * Removes from this list all of its elements that are contained in the specified collection.
     * @param {Collection} c collection containing elements to be removed from this list
     * @return {boolean} true if this list changed as a result of the call
     */
    LinkedList.prototype.removeAll = function (c) {
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
     * Inserts all of the elements in the specified collection into this list, starting at the specified position. Shifts the element currently at that position (if any) and any subsequent elements to the right (increases their indices). The new elements will appear in the list in the order that they are returned by the specified collection's iterator.
     * @param {number} index index at which to insert the first element from the specified collection
     * @param {Collection} c collection containing elements to be added to this list
     * @return {boolean} true if this collection changed as a result of the call
     */
    LinkedList.prototype.addAll = function (c, index) {
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
        var offset = index;
        for (var iter = c.iterator(); iter.hasNext();) {
            var t = iter.next();
            this.addIndex(offset, t);
            offset = offset + 1;
        }
        return true;
    };
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    LinkedList.prototype.indexOf = function (t) {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return -1;
        }
        if (this.numberElements <= 0) {
            return -1;
        }
        var offset = 0;
        var node = this.firstNode;
        while ((node !== null) && (node !== undefined)) {
            if (this.equality.equals(node.payload, t)) {
                return offset;
            }
            else {
                node = node.nextNode;
                offset = offset + 1;
            }
        }
        return -1;
    };
    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    LinkedList.prototype.removeIndex = function (index) {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return undefined;
        }
        if (this.numberElements <= 0) {
            return undefined;
        }
        if (index === 0) {
            var payload = this.firstNode.payload;
            this.firstNode = this.firstNode.nextNode;
            this.numberElements = this.numberElements - 1;
            if (this.firstNode !== null)
                this.firstNode.previousNode = null;
            if (this.numberElements < 1) {
                this.numberElements = 0;
                this.firstNode = null;
                this.lastNode = null;
            }
            return payload;
        }
        if (index === (this.numberElements - 1)) {
            var payload = this.lastNode.payload;
            this.lastNode = this.lastNode.previousNode;
            this.numberElements = this.numberElements - 1;
            this.lastNode.nextNode = null;
            return payload;
        }
        var offset = 0;
        var node = this.firstNode;
        var previous = null;
        while ((node !== null) && (node !== undefined)) {
            if (index === offset) {
                var payload = node.payload;
                previous.nextNode = node.nextNode;
                if (node.nextNode !== null)
                    node.nextNode.previousNode = previous;
                this.numberElements = this.numberElements - 1;
                return node.payload;
            }
            else {
                previous = node;
                node = node.nextNode;
                offset = offset + 1;
            }
        }
        return undefined;
    };
    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     * @param {T} t element to search for
     * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    LinkedList.prototype.lastIndexOf = function (t) {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return -1;
        }
        if (this.numberElements <= 0) {
            return -1;
        }
        var offset = this.numberElements - 1;
        var node = this.lastNode;
        while ((node !== null) && (node !== undefined)) {
            if (this.equality.equals(node.payload, t)) {
                return offset;
            }
            else {
                node = node.previousNode;
                offset = offset - 1;
            }
        }
        return -1;
    };
    /**
     * etrieves, but does not remove, the first element in this list.
     * @return {T} the first element in this list, undefined if the list is empty
     */
    LinkedList.prototype.getFirst = function () {
        var node = this.firstNode;
        if ((node === null) || (node === undefined))
            return undefined;
        return node.payload;
    };
    LinkedList.prototype.getFirstNode = function () {
        var node = this.firstNode;
        if ((node === null) || (node === undefined))
            return undefined;
        return node;
    };
    /**
    * Retrieves, but does not remove, the last element of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the tail of the queue or undefined if empty
    */
    LinkedList.prototype.getLast = function () {
        var node = this.lastNode;
        if ((node === null) || (node === undefined))
            return undefined;
        return node.payload;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    LinkedList.prototype.get = function (index) {
        var offset = 0;
        var node = this.firstNode;
        if (index === 0) {
            if ((node === null) || (node === undefined)) {
                return null;
            }
            return node.payload;
        }
        if (index === this.numberElements - 1) {
            node = this.lastNode;
            if ((node === null) || (node === undefined)) {
                return null;
            }
            return node.payload;
        }
        while ((node !== null) && (node !== undefined)) {
            if (index === offset) {
                return node.payload;
            }
            else {
                node = node.nextNode;
                offset = offset + 1;
            }
        }
        return null;
    };
    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    LinkedList.prototype.set = function (index, element) {
        var offset = 0;
        var node = this.firstNode;
        while ((node !== null) && (node !== undefined)) {
            if (index === offset) {
                var tmp = node.payload;
                node.payload = element;
                return tmp;
            }
            else {
                node = node.nextNode;
                offset = offset + 1;
            }
        }
        return null;
    };
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.poll = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return null;
        }
        if (this.numberElements <= 0) {
            return null;
        }
        var element = this.firstNode.payload;
        this.removeIndex(0);
        return element;
    };
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.pollFirst = function () {
        return this.poll();
    };
    /**
    * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.pollLast = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return null;
        }
        if (this.numberElements <= 0) {
            return null;
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
    LinkedList.prototype.removeQueue = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return undefined;
        }
        if (this.numberElements <= 0) {
            return undefined;
        }
        var element = this.firstNode.payload;
        this.removeIndex(0);
        return element;
    };
    /**
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    LinkedList.prototype.removeFirst = function () {
        return this.removeQueue();
    };
    /**
    * Retrieves and removes the element at the end of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    LinkedList.prototype.removeLast = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return undefined;
        }
        if (this.numberElements <= 0) {
            return undefined;
        }
        var element = this.get(this.size() - 1);
        this.removeIndex(this.size() - 1);
        return element;
    };
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.peek = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return null;
        }
        if (this.numberElements <= 0) {
            return null;
        }
        return this.firstNode.payload;
    };
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.peekFirst = function () {
        return this.peek();
    };
    /**
    * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.peekLast = function () {
        if ((this.lastNode === null) || (this.lastNode === undefined)) {
            return null;
        }
        if (this.numberElements <= 0) {
            return null;
        }
        return this.lastNode.payload;
    };
    /**
    * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * Needed to implement Queue
    * @return {T} the element at the head of the queue or null if empty
    */
    LinkedList.prototype.element = function () {
        if ((this.firstNode === null) || (this.firstNode === undefined)) {
            return undefined;
        }
        if (this.numberElements <= 0) {
            return undefined;
        }
        var element = this.firstNode.payload;
        return element;
    };
    /**
     * Returns a Java style iterator
     * @return {JIterator<T>} the Java style iterator
     */
    LinkedList.prototype.iterator = function () {
        return new LinkedListJIterator(this);
    };
    /**
     * Returns a TypeScript style iterator
     * @return {Iterator<T>} the TypeScript style iterator
     */
    LinkedList.prototype[Symbol.iterator] = function () {
        return new LinkedListIterator(this);
    };
    /**
    * Returns an ImmutableList backed by this List
    */
    LinkedList.prototype.immutableList = function () {
        return this;
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    LinkedList.prototype.immutableCollection = function () {
        return this;
    };
    /**
    * Override JSON.stringify handling
    */
    LinkedList.prototype.toJSON = function () {
        return Collections_1.Collections.asArray(this);
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var LinkedListNode = /** @class */ (function () {
    function LinkedListNode(t) {
        this.payload = t;
        this.previousNode = null;
        this.nextNode = null;
    }
    return LinkedListNode;
}());
exports.LinkedListNode = LinkedListNode;
/* Java style iterator */
var LinkedListJIterator = /** @class */ (function () {
    function LinkedListJIterator(iList) {
        this.node = iList.getFirstNode();
    }
    LinkedListJIterator.prototype.hasNext = function () {
        if ((this.node === null) || (this.node === undefined)) {
            return false;
        }
        return true;
    };
    LinkedListJIterator.prototype.next = function () {
        var tmp = this.node.payload;
        this.node = this.node.nextNode;
        return tmp;
    };
    return LinkedListJIterator;
}());
exports.LinkedListJIterator = LinkedListJIterator;
/* TypeScript iterator */
var LinkedListIterator = /** @class */ (function () {
    function LinkedListIterator(iList) {
        this.node = iList.getFirstNode();
    }
    // tslint:disable-next-line:no-any
    LinkedListIterator.prototype.next = function (value) {
        if ((this.node === null) || (this.node === undefined)) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        else {
            var tmp = this.node.payload;
            this.node = this.node.nextNode;
            return new BasicIteratorResult_1.BasicIteratorResult(false, tmp);
        }
    };
    return LinkedListIterator;
}());
exports.LinkedListIterator = LinkedListIterator;
