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
    function ArrayList(initialCapacity, initialElements) {
        if (initialCapacity === void 0) { initialCapacity = 10; }
        if (initialElements === void 0) { initialElements = null; }
        this.initialCapacity = initialCapacity;
        this.initialElements = initialElements;
        this.elements = null;
        this.sizeValue = 0;
        // we currently do not do anything with the initialCapacity..... yet
        if (initialElements !== null) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var t = iter.next();
                this.add(t);
            }
        }
    }
    /**
     * Appends the specified element to the end of this list
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    ArrayList.prototype.add = function (t) {
        if (this.elements === null) {
            this.elements = new Array();
        }
        this.elements.push(t);
        this.sizeValue = this.sizeValue + 1;
        return true;
    };
    /**
     * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
     * @param {number} index index at which the specified element is to be inserted
     * @param {T} t element to be inserted
     */
    ArrayList.prototype.addElement = function (index, t) {
        if (this.elements === null) {
            this.elements = new Array();
        }
        this.elements.splice(index, 0, t);
        this.sizeValue = this.sizeValue + 1;
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
            this.addElement(index, t);
            index = index + 1;
        }
        return true;
    };
    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    ArrayList.prototype.remove = function (index) {
        if (this.elements === null) {
            return undefined;
        }
        var element = this.elements[index];
        this.elements.splice(index, 1);
        this.sizeValue = this.sizeValue - 1;
        return element;
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
        if (this.elements === null)
            return -1;
        if (this.sizeValue <= 0)
            return -1;
        for (var loop = 0; loop < this.sizeValue; loop++) {
            var e = this.get(loop);
            if (e.equals(t))
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
        if (this.elements === null)
            return -1;
        if (this.sizeValue <= 0)
            return -1;
        for (var loop = this.sizeValue - 1; loop >= 0; loop--) {
            var e = this.get(loop);
            if (e.equals(t))
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
    ArrayList.prototype.removeElement = function (t) {
        if (this.elements === null) {
            return false;
        }
        if (this.elements === undefined) {
            return false;
        }
        var offset = this.indexOf(t);
        if (offset === -1) {
            return false;
        }
        this.remove(offset);
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
            var tmp = this.removeElement(t);
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
    ArrayList.prototype.equals = function (t) {
        if (t === null)
            return false;
        if (t === undefined)
            return false;
        if (t instanceof ArrayList) {
            if (this.size() === t.size()) {
                if (this.size() === 0) {
                    return true;
                }
                for (var loop = 0; loop < this.size(); loop++) {
                    var thisentry = this.get(loop);
                    var thatentry = t.get(loop);
                    if (thisentry.equals(thatentry)) {
                        // keep going
                    }
                    else {
                        return false;
                    }
                }
                return true;
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
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    ArrayList.prototype.size = function () {
        return this.sizeValue;
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
