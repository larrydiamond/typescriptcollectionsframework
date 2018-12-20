"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var ArrayList_1 = require("./ArrayList");
var AllFieldHashable_1 = require("./AllFieldHashable");
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var Collections_1 = require("./Collections");
var HashMap_1 = require("./HashMap");
/**
 * This class implements the MultiSet interface, backed by a HashMap instance.
 *
 * It makes no guarantees as to the iteration order of the MultiSet;
 * in particular, it does not guarantee that the order will remain constant over time.
 * This class permits the null element and the undefined element
 *
 * This class offers constant time performance for the basic operations (add, remove, contains and size),
 * assuming the hash function disperses the elements properly among the buckets. <br>
 * Iterating over this MultiSet requires time proportional to the sum of the HashMultiSet instance's size
 * (the number of elements) plus the "capacity" of the backing HashMap instance (the number of buckets). <br>
 * Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
 *
 * This class corresponds to com.google.common.collect.HashMultiSet
 */
var HashMultiSet = /** @class */ (function () {
    function HashMultiSet(iHash, initialElements, iInitialCapacity, iLoadFactor) {
        if (iHash === void 0) { iHash = AllFieldHashable_1.AllFieldHashable.instance; }
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
    * Returns the number of occurrences of an element in this MultiSet (the count of the element).
    * @param {K} item the element to count occurrences of
    * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
    */
    HashMultiSet.prototype.count = function (item) {
        if ((this.datastore === null) || (this.datastore === undefined))
            return 0;
        var tmp = this.datastore.get(item);
        if ((tmp === null) || (tmp === undefined)) {
            return 0;
        }
        return tmp.size();
    };
    /**
     * Returns an ImmutableSet view of the keys contained in this MultiSet.
     * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
     * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
     * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
     */
    HashMultiSet.prototype.keySet = function () {
        return null;
    };
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
    * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).
    * Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    HashMultiSet.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    /**
    * Returns the Hashable
    * @return {Hashable}
    */
    HashMultiSet.prototype.getHashable = function () {
        return this.hashMethods;
    };
    /**
    * Adds an occurance of the specified element to this MultiSet
    * @param {K} element element to be added to this MultiSet
    * @return {boolean} true if this MultiSet did not already contain the specified element
    */
    HashMultiSet.prototype.add = function (element) {
        var tmp = this.datastore.get(element);
        if ((tmp === null) || (tmp === undefined)) {
            var al = new ArrayList_1.ArrayList(this.hashMethods);
            al.add(element);
            this.datastore.put(element, al);
            return true;
        }
        else {
            tmp.add(element);
            return false;
        }
    };
    /**
    * Removes a single occurrence of the specified element from this MultiSet, if present.
    * @param {K} element element to be removed from this MultiSet
    * @return {boolean} true if the set contained the specified element
    */
    HashMultiSet.prototype.remove = function (element) {
        var tmp = this.datastore.get(element);
        if ((tmp === null) || (tmp === undefined)) {
            return false;
        }
        if (tmp.size() >= 1) {
            this.datastore.remove(element);
        }
        else {
            tmp.removeLast();
        }
        return true;
    };
    /**
    * Returns the number of elements in this MultiSet (its cardinality).
    * @return {number} the number of elements in this MultiSet (its cardinality)
    */
    HashMultiSet.prototype.size = function () {
        if ((this.datastore === null) || (this.datastore === undefined))
            return 0;
        var count = 0;
        for (var iter = this.datastore.entrySet().iterator(); iter.hasNext();) {
            var element = iter.next();
            var thisSize = element.getValue().size();
            count = count + thisSize;
        }
        return count;
    };
    /**
    * Returns true if this MultiSet contains no elements.
    * @return {boolean} true if this MultiSet contains no elements
    */
    HashMultiSet.prototype.isEmpty = function () {
        if ((this.datastore === null) || (this.datastore === undefined))
            return true;
        var tmp = this.datastore.size();
        if (tmp === 0)
            return true;
        return false;
    };
    /**
    * Returns true if this MultiSet contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this MultiSet
    * @return {boolean} true if this MultiSet contains the specified element
    */
    HashMultiSet.prototype.contains = function (item) {
        var tmp = this.datastore.get(item);
        if ((tmp === null) || (tmp === undefined))
            return false;
        return true;
    };
    /**
    * Removes all of the elements from this MultiSet. The MultiSet will be empty after this call returns.
    */
    HashMultiSet.prototype.clear = function () {
        return this.datastore.clear();
    };
    /**
     * Returns a Java style iterator
     * @return {JIterator<K>} the Java style iterator
     */
    HashMultiSet.prototype.iterator = function () {
        return new HashSetJIterator(this);
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    HashMultiSet.prototype[Symbol.iterator] = function () {
        return new HashSetIterator(this);
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    HashMultiSet.prototype.immutableCollection = function () {
        return this;
    };
    /**
    * Returns an ImmutableMultiSet backed by this MultiSet
    */
    HashMultiSet.prototype.immutableMultiSet = function () {
        return this;
    };
    /**
    * Override JSON.stringify handling
    */
    HashMultiSet.prototype.toJSON = function () {
        var tmp = Collections_1.Collections.asArray(this);
        return JSON.stringify(tmp);
    };
    return HashMultiSet;
}());
exports.HashMultiSet = HashMultiSet;
/* Java style iterator */
var HashSetJIterator = /** @class */ (function () {
    function HashSetJIterator(iSet) {
        this.set = iSet;
    }
    HashSetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) { // first time caller
            var first = null; // this.set.deprecatedGetFirstEntryForIterator();
            if (first === undefined) {
                return false;
            }
            if (first === null) {
                return false;
            }
            return true;
        }
        else { // we've already called this iterator before
            var tmp = null; // this.set.deprecatedGetNextEntryForIterator(this.location);
            if (tmp === null) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    HashSetJIterator.prototype.next = function () {
        if (this.location === undefined) { // first time caller
            var first = null; // this.set.deprecatedGetFirstEntryForIterator();
            if (first === undefined) {
                return null;
            }
            if (first === null) {
                return null;
            }
            this.location = first;
            return first.entry.getKey();
        }
        else { // we've already called this iterator before
            var tmp = null; // this.set.deprecatedGetNextEntryForIterator(this.location);
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
var HashSetIterator = /** @class */ (function () {
    function HashSetIterator(iSet) {
        this.set = iSet;
        this.location = null; // this.set.deprecatedGetFirstEntryForIterator();
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
        this.location = null; // this.set.deprecatedGetNextEntryForIterator(this.location);
        return tmp;
    };
    return HashSetIterator;
}());
exports.HashSetIterator = HashSetIterator;
