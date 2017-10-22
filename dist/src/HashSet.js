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
    function HashSet(iHash, initialElements, iInitialCapacity, iLoadFactor) {
        if (initialElements === void 0) { initialElements = null; }
        if (iInitialCapacity === void 0) { iInitialCapacity = 20; }
        if (iLoadFactor === void 0) { iLoadFactor = 0.75; }
        this.initialElements = initialElements;
        this.iInitialCapacity = iInitialCapacity;
        this.iLoadFactor = iLoadFactor;
        this.datastore = null;
        this.hashMethods = iHash;
        this.datastore = new HashMap_1.HashMap(this.hashMethods, null, iInitialCapacity, iLoadFactor);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var t = iter.next();
                this.add(t);
            }
        }
    }
    /**
    * Returns the Hashable
    * @return {Hashable}
    */
    HashSet.prototype.getHashable = function () {
        return this.hashMethods;
    };
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
    * RemoveElement the specified element from this set if it is present.
    * @param {K} element element to be removed from this set
    * @return {boolean} true if the set contained the specified element
    */
    HashSet.prototype.remove = function (element) {
        var tmp = this.datastore.remove(element);
        if (tmp === null) {
            return false;
        }
        return true;
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
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    HashSet.prototype.deprecatedGetFirstEntryForIterator = function () {
        return this.datastore.deprecatedGetFirstEntryForIterator();
    };
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    HashSet.prototype.deprecatedGetNextEntryForIterator = function (current) {
        return this.datastore.deprecatedGetNextEntryForIterator(current);
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
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    HashSet.prototype.immutableCollection = function () {
        return this;
    };
    /**
    * Returns an ImmutableSet backed by this Set
    */
    HashSet.prototype.immutableSet = function () {
        return this;
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
            var first = this.set.deprecatedGetFirstEntryForIterator();
            if (first === undefined) {
                return false;
            }
            if (first === null) {
                return false;
            }
            return true;
        }
        else {
            var tmp = this.set.deprecatedGetNextEntryForIterator(this.location);
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
            var first = this.set.deprecatedGetFirstEntryForIterator();
            if (first === undefined) {
                return null;
            }
            if (first === null) {
                return null;
            }
            this.location = first;
            return first.entry.getKey();
        }
        else {
            var tmp = this.set.deprecatedGetNextEntryForIterator(this.location);
            if (tmp === null) {
                return null;
            }
            else {
                this.location = tmp;
                return tmp.entry.getKey();
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
        this.location = this.set.deprecatedGetFirstEntryForIterator();
    }
    // tslint:disable-next-line:no-any
    HashSetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.entry.getKey());
        this.location = this.set.deprecatedGetNextEntryForIterator(this.location);
        return tmp;
    };
    return HashSetIterator;
}());
exports.HashSetIterator = HashSetIterator;
