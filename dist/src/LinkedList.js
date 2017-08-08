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
var LinkedList = (function () {
    function LinkedList() {
        this.firstNode = null;
        this.lastNode = null;
        this.numberElements = 0;
    }
    /**
     * Appends the specified element to the end of this list
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    LinkedList.prototype.add = function (t) {
        var lln = new LinkedListNode(t);
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
    };
    /**
     * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
     * @param {number} index index at which the specified element is to be inserted
     * @param {T} t element to be inserted
     */
    LinkedList.prototype.addElement = function (index, t) {
        if (index === 0) {
            var newnode = new LinkedListNode(t);
            newnode.nextNode = this.firstNode;
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
        while (node !== null) {
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
        if (this.firstNode === null) {
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
        while (node !== null) {
            if (node.payload.equals(t)) {
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
    LinkedList.prototype.removeElement = function (t) {
        if (this.firstNode === null) {
            return false;
        }
        if (this.firstNode === undefined) {
            return false;
        }
        var node = this.firstNode;
        while (node !== null) {
            if (node.payload.equals(t)) {
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
            var tmp = this.removeElement(t);
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
        for (var iter = c.iterator(); iter.hasNext();) {
            var t = iter.next();
            this.addElement(index, t);
            index = index + 1;
        }
        return true;
    };
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    LinkedList.prototype.indexOf = function (t) {
        if (this.firstNode === null) {
            return -1;
        }
        if (this.numberElements <= 0) {
            return -1;
        }
        var offset = 0;
        var node = this.firstNode;
        while (node !== null) {
            if (node.payload.equals(t)) {
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
    LinkedList.prototype.remove = function (index) {
        if (this.firstNode === null) {
            return undefined;
        }
        if (this.numberElements <= 0) {
            return undefined;
        }
        if (index === 0) {
            var payload = this.firstNode.payload;
            this.firstNode = this.firstNode.nextNode;
            this.numberElements = this.numberElements - 1;
            this.firstNode.previousNode = null;
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
        while (node !== null) {
            if (index === offset) {
                var payload = node.payload;
                previous.nextNode = node.nextNode;
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
        if (this.firstNode === null) {
            return -1;
        }
        if (this.numberElements <= 0) {
            return -1;
        }
        var offset = this.numberElements - 1;
        var node = this.lastNode;
        while (node !== null) {
            if (node.payload.equals(t)) {
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
     * Returns the first element in this list.
     * @return {T} the first element in this list, null if the list is empty
     */
    LinkedList.prototype.getFirst = function () {
        var node = this.firstNode;
        if (node === null)
            return null;
        return node.payload;
    };
    LinkedList.prototype.getFirstNode = function () {
        var node = this.firstNode;
        if (node === null)
            return null;
        return node;
    };
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    LinkedList.prototype.get = function (index) {
        var offset = 0;
        var node = this.firstNode;
        while (node !== null) {
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
        while (node !== null) {
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
    LinkedList.prototype.equals = function (t) {
        if (t === null)
            return false;
        if (t === undefined)
            return false;
        if (t instanceof LinkedList) {
            if (this.size() === t.size()) {
                if (this.size() === 0) {
                    return true;
                }
                var thisNode = this.getFirstNode();
                var thatNode = t.getFirstNode();
                while ((thisNode !== null) && (thatNode !== null) && (thisNode.payload.equals(thatNode.payload))) {
                    thisNode = thisNode.nextNode;
                    thatNode = thatNode.nextNode;
                }
                if ((thisNode === null) && (thatNode === null))
                    return true;
                return false;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
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
    return LinkedList;
}());
exports.LinkedList = LinkedList;
var LinkedListNode = (function () {
    function LinkedListNode(t) {
        this.payload = t;
        this.previousNode = null;
        this.nextNode = null;
    }
    return LinkedListNode;
}());
exports.LinkedListNode = LinkedListNode;
/* Java style iterator */
var LinkedListJIterator = (function () {
    function LinkedListJIterator(iList) {
        this.node = iList.getFirstNode();
    }
    LinkedListJIterator.prototype.hasNext = function () {
        if (this.node === null) {
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
var LinkedListIterator = (function () {
    function LinkedListIterator(iList) {
        this.node = iList.getFirstNode();
    }
    LinkedListIterator.prototype.next = function (value) {
        if (this.node === null) {
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