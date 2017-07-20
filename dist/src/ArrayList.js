"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
var ArrayList = (function () {
    function ArrayList() {
        this.elements = null;
        this.sizeValue = 0;
    }
    /**
     * Appends the specified element to the end of this list
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    ArrayList.prototype.add = function (t) {
        if (this.elements == null) {
            this.elements = new Array();
        }
        this.elements.push(t);
        this.sizeValue = this.sizeValue + 1;
        return true;
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
        if (this.elements == null)
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
    ArrayList.prototype.isEmpty = function () {
        if (this.sizeValue == 0)
            return true;
        return false;
    };
    ArrayList.prototype.set = function (index, element) {
        var tmp = this.elements[index];
        this.elements[index] = element;
        return tmp;
    };
    ArrayList.prototype.size = function () {
        return this.sizeValue;
    };
    /* java style iteration */
    ArrayList.prototype.iterator = function () {
        return new ArrayListJIterator(this);
    };
    /* Easy iteration */
    /*
    for ((value: T) => void) : void {
  
    }
    */
    /* for eventual support of TypeScript iteration */
    ArrayList.prototype[Symbol.iterator] = function () {
        return new ArrayListIterator(this);
    };
    return ArrayList;
}());
exports.ArrayList = ArrayList;
/* for eventual support of TypeScript iteration */
var ArrayListIteratorResult = (function () {
    function ArrayListIteratorResult(iDone, iValue) {
        this.done = iDone;
        this.value = iValue;
    }
    return ArrayListIteratorResult;
}());
exports.ArrayListIteratorResult = ArrayListIteratorResult;
/* for eventual support of TypeScript iteration */
var ArrayListIterator = (function () {
    function ArrayListIterator(iArrayList) {
        this.offset = 0;
        this.arraylist = iArrayList;
    }
    ArrayListIterator.prototype.next = function (value) {
        if (this.offset < this.arraylist.size()) {
            return new ArrayListIteratorResult(false, this.arraylist.get(this.offset++));
        }
        else {
            return new ArrayListIteratorResult(true, null);
        }
    };
    return ArrayListIterator;
}());
exports.ArrayListIterator = ArrayListIterator;
