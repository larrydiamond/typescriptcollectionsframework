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
var TreeMap_1 = require("./TreeMap");
var TreeSet = (function () {
    function TreeSet(iComparator) {
        this.datastore = null;
        this.datastore = new TreeMap_1.TreeMap(iComparator);
    }
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    TreeSet.prototype.add = function (element) {
        var tmp = this.datastore.put(element, 1);
        if (tmp === null) {
            return false;
        }
        return true;
    };
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    TreeSet.prototype.size = function () {
        if (this.datastore === null)
            return 0;
        return this.datastore.size();
    };
    /**
     * Returns the comparator used to order the keys in this set
     * @return {Comparator} the comparator used to order the keys in this set
     */
    TreeSet.prototype.comparator = function () {
        return this.datastore.comparator();
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    TreeSet.prototype.isEmpty = function () {
        if (this.datastore === null)
            return true;
        var tmp = this.datastore.size();
        if (tmp === 0)
            return true;
        return false;
    };
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    TreeSet.prototype.contains = function (item) {
        var tmp = this.datastore.get(item);
        if (tmp === null)
            return false;
        return true;
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    TreeSet.prototype.first = function () {
        return this.datastore.firstKey();
    };
    /**
    * Returns the last (highest) element currently in this set.
    * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
    */
    TreeSet.prototype.last = function () {
        return this.datastore.lastKey();
    };
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    TreeSet.prototype.clear = function () {
        return this.datastore.clear();
    };
    /**
     * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
     * @return {K} the first (lowest) element, or null if this set is empty
     */
    TreeSet.prototype.pollFirst = function () {
        if (this.datastore.size() === 0)
            return null;
        var tmp = this.datastore.firstKey();
        this.datastore.remove(tmp);
        return tmp;
    };
    /**
     * Retrieves and removes the last (highest) element, or returns null if this set is empty.
     * @return {K} the last (highest) element, or null if this set is empty
     */
    TreeSet.prototype.pollLast = function () {
        if (this.datastore.size() === 0)
            return null;
        var tmp = this.datastore.lastKey();
        this.datastore.remove(tmp);
        return tmp;
    };
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    TreeSet.prototype.iterator = function () {
        return new TreeSetJIterator(this);
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    TreeSet.prototype[Symbol.iterator] = function () {
        return new TreeSetIterator(this);
    };
    return TreeSet;
}());
exports.TreeSet = TreeSet;
/* Java style iterator */
var TreeSetJIterator = (function () {
    function TreeSetJIterator(iSet) {
        this.set = iSet;
    }
    TreeSetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var first = this.set.first();
            if (first === undefined)
                return false;
            return true;
        }
        else {
            return false; //TODO
        }
    };
    TreeSetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var first = this.set.first();
            if (first === undefined) {
                return null;
            }
            else {
                this.location = first;
                return first;
            }
        }
        else {
            return null; // TODO
        }
    };
    return TreeSetJIterator;
}());
exports.TreeSetJIterator = TreeSetJIterator;
/* TypeScript iterator */
var TreeSetIterator = (function () {
    function TreeSetIterator(iSet) {
        this.set = iSet;
    }
    TreeSetIterator.prototype.next = function (value) {
        return new BasicIteratorResult_1.BasicIteratorResult(true, null); //TODO
    };
    return TreeSetIterator;
}());
exports.TreeSetIterator = TreeSetIterator;
