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
var HashMap_1 = require("./HashMap");
var HashSet = (function () {
    function HashSet(initialElements, iInitialCapacity, iLoadFactor) {
        if (initialElements === void 0) { initialElements = new HashSet(null, 20, 0.75); }
        if (iInitialCapacity === void 0) { iInitialCapacity = 20; }
        if (iLoadFactor === void 0) { iLoadFactor = 0.75; }
        this.initialElements = initialElements;
        this.iInitialCapacity = iInitialCapacity;
        this.iLoadFactor = iLoadFactor;
        this.datastore = null;
        this.datastore = new HashMap_1.HashMap(null, iInitialCapacity, iLoadFactor);
        if (initialElements !== null) {
            // TODO
        }
    }
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    HashSet.prototype.add = function (element) {
        var tmp = this.datastore.put(element, 1);
        if (tmp === undefined) {
            return true;
        }
        return false;
    };
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    HashSet.prototype.size = function () {
        if (this.datastore === null)
            return 0;
        return this.datastore.size();
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    HashSet.prototype.isEmpty = function () {
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
    HashSet.prototype.contains = function (item) {
        var tmp = this.datastore.get(item);
        if (tmp === null)
            return false;
        return true;
    };
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    HashSet.prototype.clear = function () {
        return this.datastore.clear();
    };
    /**
     * Returns a Java style iterator
     * @return {JIterator<K>} the Java style iterator
     */
    HashSet.prototype.iterator = function () {
        return new HashSetJIterator(this);
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    HashSet.prototype[Symbol.iterator] = function () {
        return new HashSetIterator(this);
    };
    return HashSet;
}());
exports.HashSet = HashSet;
/* Java style iterator */
var HashSetJIterator = (function () {
    function HashSetJIterator(iSet) {
        this.set = iSet;
    }
    HashSetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var first = null; // TODO this.set.first();
            if (first === undefined)
                return false;
            return true;
        }
        else {
            var tmp = null; // TODO this.set.getNextHigherKey(this.location);
            if (tmp === null) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    HashSetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var first = null; // TODO this.set.first();
            if (first === undefined) {
                return null;
            }
            else {
                this.location = first;
                return first;
            }
        }
        else {
            var tmp = null; // TODO this.set.getNextHigherKey(this.location);
            if (tmp === null) {
                return null;
            }
            else {
                this.location = tmp;
                return tmp;
            }
        }
    };
    return HashSetJIterator;
}());
exports.HashSetJIterator = HashSetJIterator;
/* TypeScript iterator */
var HashSetIterator = (function () {
    function HashSetIterator(iSet) {
        this.set = iSet;
        this.location = null; // TODO this.set.first();
    }
    HashSetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location);
        this.location = null; // TODO this.set.getNextHigherKey (this.location);
        return tmp;
    };
    return HashSetIterator;
}());
exports.HashSetIterator = HashSetIterator;
