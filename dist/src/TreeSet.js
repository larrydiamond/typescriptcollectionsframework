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
        this.comparator = null;
        this.comparator = iComparator;
        this.datastore = new TreeMap_1.TreeMap(this.comparator);
    }
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    TreeSet.prototype.add = function (element) {
        var tmp = this.datastore.put(element, 1);
        if (tmp === null)
            return false;
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
