"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var Collections_1 = require("./Collections");
var TreeMap_1 = require("./TreeMap");
/**
 * A NavigableSet implementation based on a TreeMap. The elements are ordered using a Comparator provided at set creation time.<br>
 * This implementation provides guaranteed log(n) time cost for the basic operations (add, remove and contains).
 *
 * Note that the ordering maintained by a set must be consistent with equals if it is to correctly implement the Set interface.
 * (See Comparator for a precise definition of consistent with equals.)
 * This is so because the Set interface is defined in terms of the equals operation, but a TreeSet instance performs all element comparisons using its Comparator,
 * so two elements that are deemed equal by this method are, from the standpoint of the set, equal.
 * The behavior of a set is well-defined even if its ordering is inconsistent with equals; it just fails to obey the general contract of the Set interface.
 *
 * This class corresponds to java.util.TreeSet
 */
var TreeSet = /** @class */ (function () {
    function TreeSet(iComparator, initialElements) {
        this.initialElements = initialElements;
        this.datastore = null;
        this.datastore = new TreeMap_1.TreeMap(iComparator);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var t = iter.next();
                this.add(t);
            }
        }
    }
    TreeSet.prototype.validateSet = function () {
        return this.datastore.validateMap();
    };
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    TreeSet.prototype.add = function (element) {
        var tmp = this.datastore.put(element, 1);
        if ((tmp === null) || (tmp === undefined)) {
            return true;
        }
        return false;
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
        if ((tmp === null) || (tmp === undefined))
            return false;
        return true;
    };
    /**
     * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
     * @param {K} item to find floor node for
     * @return {K} the greatest element less than or equal to e, or null if there is no such element
     */
    TreeSet.prototype.floor = function (item) {
        var tmp = this.datastore.floorKey(item);
        if (tmp === undefined)
            return null;
        return tmp;
    };
    /**
     * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
     * @param {K} item to find ceiling node for
     * @return {K} the least element greater than or equal to item, or null if there is no such element
     */
    TreeSet.prototype.ceiling = function (item) {
        var tmp = this.datastore.ceilingKey(item);
        if (tmp === undefined)
            return null;
        return tmp;
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, null if there are no elements in this set
    */
    TreeSet.prototype.first = function () {
        return this.datastore.firstKey();
    };
    /**
    * Returns the last (highest) element currently in this set.
    * @return {K} the last (highest) element currently in this set, null if there are no elements in this set
    */
    TreeSet.prototype.last = function () {
        return this.datastore.lastKey();
    };
    /**
    * Removes the specified element from this set if it is present.
    * @param {K} element element to be removed from this set
    * @return {boolean} true if the set contained the specified element
    */
    TreeSet.prototype.remove = function (element) {
        var tmp = this.datastore.remove(element);
        if (tmp === null) {
            return false;
        }
        return true;
    };
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    TreeSet.prototype.clear = function () {
        return this.datastore.clear();
    };
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    TreeSet.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
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
     * Needed For Iterator
     * @param {K} key the given key
     * @return {K} the least key greater than key, or null if there is no such key
     */
    TreeSet.prototype.getNextHigherKey = function (key) {
        return this.datastore.getNextHigherKey(key);
    };
    /*
      public printSet () {
        return this.datastore.printMap();
      }
    /* */
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
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    TreeSet.prototype.immutableCollection = function () {
        return this;
    };
    /**
    * Returns an ImmutableSet backed by this Set
    */
    TreeSet.prototype.immutableSet = function () {
        return this;
    };
    /**
    * Override JSON.stringify handling
    */
    TreeSet.prototype.toJSON = function () {
        var tmp = Collections_1.Collections.asArray(this);
        return JSON.stringify(tmp);
    };
    return TreeSet;
}());
exports.TreeSet = TreeSet;
/* Java style iterator */
var TreeSetJIterator = /** @class */ (function () {
    function TreeSetJIterator(iSet) {
        this.set = iSet;
    }
    TreeSetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) { // first time caller
            var first = this.set.first();
            if ((first === undefined) || (first === null))
                return false;
            return true;
        }
        else { // we've already called this iterator before
            var tmp = this.set.getNextHigherKey(this.location);
            if (tmp === null) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    TreeSetJIterator.prototype.next = function () {
        if ((this.location === undefined) || (this.location === null)) { // first time caller
            var first = this.set.first();
            if (first === undefined) {
                return null;
            }
            else {
                this.location = first;
                return first;
            }
        }
        else { // we've already called this iterator before
            var tmp = this.set.getNextHigherKey(this.location);
            if (tmp === null) {
                return null;
            }
            else {
                this.location = tmp;
                return tmp;
            }
        }
    };
    return TreeSetJIterator;
}());
exports.TreeSetJIterator = TreeSetJIterator;
/* TypeScript iterator */
var TreeSetIterator = /** @class */ (function () {
    function TreeSetIterator(iSet) {
        this.set = iSet;
        this.location = this.set.first();
    }
    // tslint:disable-next-line:no-any
    TreeSetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location);
        this.location = this.set.getNextHigherKey(this.location);
        return tmp;
    };
    return TreeSetIterator;
}());
exports.TreeSetIterator = TreeSetIterator;
