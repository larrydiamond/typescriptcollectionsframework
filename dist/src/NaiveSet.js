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
var NaiveSet = (function () {
    function NaiveSet(iComparator) {
        this.datastore = null;
        this.comparator = null;
        this.comparator = iComparator;
    }
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    NaiveSet.prototype.add = function (element) {
        var tmp = this.datastore.put(element, 1);
        if (tmp === null)
            return false;
        return true;
    };
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    NaiveSet.prototype.size = function () {
        return this.datastore.size();
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    NaiveSet.prototype.isEmpty = function () {
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
    NaiveSet.prototype.contains = function (item) {
        var tmp = this.datastore.get(item);
        if (tmp === null)
            return false;
        return true;
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    NaiveSet.prototype.first = function () {
        return this.datastore.firstKey();
    };
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    NaiveSet.prototype.iterator = function () {
        return new NaiveSetJIterator(this);
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    NaiveSet.prototype[Symbol.iterator] = function () {
        return new NaiveSetIterator(this);
    };
    return NaiveSet;
}());
exports.NaiveSet = NaiveSet;
/* Java style iterator */
var NaiveSetJIterator = (function () {
    function NaiveSetJIterator(iSet) {
        this.set = iSet;
    }
    NaiveSetJIterator.prototype.hasNext = function () {
        return false; //TODO
    };
    NaiveSetJIterator.prototype.next = function () {
        return null; //TODO
    };
    return NaiveSetJIterator;
}());
exports.NaiveSetJIterator = NaiveSetJIterator;
/* TypeScript iterator */
var NaiveSetIterator = (function () {
    function NaiveSetIterator(iSet) {
        this.set = iSet;
    }
    NaiveSetIterator.prototype.next = function (value) {
        return new BasicIteratorResult_1.BasicIteratorResult(true, null); //TODO
    };
    return NaiveSetIterator;
}());
exports.NaiveSetIterator = NaiveSetIterator;
