"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
var ArrayList_1 = require("./ArrayList");
var AllFieldHashable_1 = require("./AllFieldHashable");
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var Collections_1 = require("./Collections");
var HashMap_1 = require("./HashMap");
var HashMultiSetImpl = /** @class */ (function () {
    function HashMultiSetImpl(datastore, iHash) {
        this.datastore = null;
        this.datastore = datastore;
        this.hashMethods = iHash;
    }
    HashMultiSetImpl.prototype.getDataStore = function () {
        return this.datastore;
    };
    HashMultiSetImpl.prototype.getHashMethods = function () {
        return this.hashMethods;
    };
    HashMultiSetImpl.prototype.count = function (item) {
        if ((this.datastore === null) || (this.datastore === undefined))
            return 0;
        var tmp = this.datastore.get(item);
        if ((tmp === null) || (tmp === undefined)) {
            return 0;
        }
        return tmp.size();
    };
    HashMultiSetImpl.prototype.add = function (element) {
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
    HashMultiSetImpl.prototype.remove = function (element) {
        var tmp = this.datastore.get(element);
        if ((tmp === null) || (tmp === undefined)) {
            return false;
        }
        if (tmp.size() === 1) {
            this.datastore.remove(element);
        }
        else {
            tmp.removeFirst();
        }
        return true;
    };
    HashMultiSetImpl.prototype.size = function () {
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
    HashMultiSetImpl.prototype.isEmpty = function () {
        if ((this.datastore === null) || (this.datastore === undefined))
            return true;
        var tmp = this.datastore.size();
        if (tmp === 0)
            return true;
        return false;
    };
    HashMultiSetImpl.prototype.contains = function (item) {
        var tmp = this.datastore.get(item);
        if ((tmp === null) || (tmp === undefined))
            return false;
        return true;
    };
    HashMultiSetImpl.prototype.clear = function () {
        return this.datastore.clear();
    };
    return HashMultiSetImpl;
}());
exports.HashMultiSetImpl = HashMultiSetImpl;
/**
 * This class implements the MultiSet interface, backed by a HashMap instance.
 *
 * It makes no guarantees as to the iteration order of the MultiSet;
 * in particular, it does not guarantee that the order will remain constant over time.
 *
 * This class permits the null element and the undefined element
 *
 * This class offers constant time performance for the basic operations (add, remove, contains and size),
 * assuming the hash function disperses the elements properly among the buckets.
 *
 * Iterating over this MultiSet requires time proportional to the sum of the HashMultiSet instance's size
 * (the number of elements) plus the "capacity" of the backing HashMap instance (the number of buckets).
 *
 * Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
 *
 * This class corresponds to com.google.common.collect.HashMultiSet
 */
var HashMultiSet = /** @class */ (function () {
    //  private datastore:HashMap<K,ArrayList<K>> = null;
    //  private hashMethods:Hashable<K>;
    function HashMultiSet(iHash, initialElements, iInitialCapacity, iLoadFactor) {
        if (iHash === void 0) { iHash = AllFieldHashable_1.AllFieldHashable.instance; }
        if (initialElements === void 0) { initialElements = null; }
        if (iInitialCapacity === void 0) { iInitialCapacity = 20; }
        if (iLoadFactor === void 0) { iLoadFactor = 0.75; }
        this.initialElements = initialElements;
        this.iInitialCapacity = iInitialCapacity;
        this.iLoadFactor = iLoadFactor;
        this.impl = undefined;
        this.impl = new HashMultiSetImpl(new HashMap_1.HashMap(iHash, null, iInitialCapacity, iLoadFactor), iHash);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var t = iter.next();
                this.add(t);
            }
        }
    }
    /*
    public debug () : undefined {
      console.log ("HashMultiSet debug " + this.datastore.size () + " entries");
      for (let iter = this.datastore.entrySet().iterator() ; iter.hasNext(); ) {
        let tmp = iter.next();
        console.log ("entry " + JSON.stringify(tmp.getKey()) + " has " + tmp.getValue().size() + " entries");
      }
      return;
    }
  */
    /**
    * Returns the number of occurrences of an element in this MultiSet (the count of the element).
    *
    * @param {K} item the element to count occurrences of
    * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
    */
    HashMultiSet.prototype.count = function (item) {
        return this.impl.count(item);
    };
    /**
     * Returns an ImmutableSet view of the keys contained in this MultiSet.
     *
     * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
     *
     * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
     *
     * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
     */
    HashMultiSet.prototype.keySet = function () {
        console.log("HashMultiSet::keySet not yet implemented");
        return null;
    };
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
    *
    * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).
    *
    * Exceptions thrown by the action are relayed to the caller.
    *
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
    *
    * @return {Hashable}
    */
    HashMultiSet.prototype.getHashable = function () {
        return this.impl.getHashMethods();
    };
    /**
    * Adds an occurance of the specified element to this MultiSet
    *
    * @param {K} element element to be added to this MultiSet
    * @return {boolean} true if this MultiSet did not already contain the specified element
    */
    HashMultiSet.prototype.add = function (element) {
        return this.impl.add(element);
    };
    /**
    * Removes a single occurrence of the specified element from this MultiSet, if present.
    *
    * The element removed will be equal to the element as per the Hashable used in this MultiSet
    * and will not necessarily be the element passed in.
    *
    * @param {K} element element equal to this element to be removed from this MultiSet
    * @return {boolean} true if the set contained the specified element
    */
    HashMultiSet.prototype.remove = function (element) {
        return this.impl.remove(element);
    };
    /**
    * Returns the number of elements in this MultiSet (its cardinality).
    *
    * @return {number} the number of elements in this MultiSet (its cardinality)
    */
    HashMultiSet.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns true if this MultiSet contains no elements.
    *
    * @return {boolean} true if this MultiSet contains no elements
    */
    HashMultiSet.prototype.isEmpty = function () {
        return this.impl.isEmpty();
    };
    /**
    * Returns true if this MultiSet contains the specified element.
    *
    * This method uses the comparator and does not invoke equals
    *
    * @param {K} item object to be checked for containment in this MultiSet
    * @return {boolean} true if this MultiSet contains the specified element
    */
    HashMultiSet.prototype.contains = function (item) {
        return this.impl.contains(item);
    };
    /**
    * Removes all of the elements from this MultiSet. The MultiSet will be empty after this call returns.
    */
    HashMultiSet.prototype.clear = function () {
        return this.impl.clear();
    };
    /**
     * Returns a Java style iterator
     *
     * @return {JIterator<K>} the Java style iterator
     */
    HashMultiSet.prototype.iterator = function () {
        return new HashSetJIterator(this.impl);
    };
    /**
    * Returns a TypeScript style iterator
    *
    * @return {Iterator<K>} the TypeScript style iterator
    */
    HashMultiSet.prototype[Symbol.iterator] = function () {
        return new HashSetIterator(this.impl);
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
        return Collections_1.Collections.asArray(this);
    };
    return HashMultiSet;
}());
exports.HashMultiSet = HashMultiSet;
/* Java style iterator */
var HashSetJIterator = /** @class */ (function () {
    function HashSetJIterator(msetimpl) {
        this.impl = msetimpl;
    }
    HashSetJIterator.prototype.hasNext = function () {
        if (this.iter === undefined) { // first time caller
            this.entrySet = this.impl.getDataStore().entrySet();
            this.iter = this.impl.getDataStore().entrySet().iterator();
            this.currentEntry = undefined;
            this.offset = 0;
            return this.iter.hasNext();
        }
        else { // we've already called hasNext before
            if (this.currentEntry === undefined) { // we called hasNext twice without ever calling next 
                return this.iter.hasNext();
            }
            // if we're not at the last item in the arraylist then yes there's another node
            if (this.currentEntry.getValue().size() > (this.offset + 1)) {
                return true;
            }
            // if we're at the last item in the arraylist then see if theres another node
            return this.iter.hasNext();
        }
    };
    HashSetJIterator.prototype.next = function () {
        if (this.currentEntry === undefined) { // have we called next before?
            this.currentEntry = this.iter.next();
            if ((this.currentEntry === null) || (this.currentEntry === undefined)) {
                this.currentEntry = undefined;
                return undefined;
            }
            this.offset = 0;
            return this.currentEntry.getValue().get(this.offset);
        }
        if (this.currentEntry.getValue().size() > (this.offset + 1)) {
            this.offset = this.offset + 1;
            return this.currentEntry.getValue().get(this.offset);
        }
        this.currentEntry = this.iter.next();
        if ((this.currentEntry === null) || (this.currentEntry === undefined)) {
            this.currentEntry = undefined;
            return undefined;
        }
        this.offset = 0;
        return this.currentEntry.getValue().get(this.offset);
    };
    return HashSetJIterator;
}());
exports.HashSetJIterator = HashSetJIterator;
/* TypeScript iterator */
var HashSetIterator = /** @class */ (function () {
    function HashSetIterator(msetimpl) {
        this.impl = msetimpl;
    }
    // tslint:disable-next-line:no-any
    HashSetIterator.prototype.next = function (value) {
        if (this.entrySet === undefined) { /// first time caller
            this.entrySet = this.impl.getDataStore().entrySet();
            this.iter = this.impl.getDataStore().entrySet().iterator();
            if (this.iter.hasNext() === false) {
                return new BasicIteratorResult_1.BasicIteratorResult(true, null);
            }
            this.currentEntry = this.iter.next();
            this.offset = 0;
            if ((this.currentEntry === null) || (this.currentEntry === undefined)) {
                return new BasicIteratorResult_1.BasicIteratorResult(true, null);
            }
            if ((this.currentEntry.getValue() === null) || (this.currentEntry.getValue() === undefined)) {
                return new BasicIteratorResult_1.BasicIteratorResult(true, null);
            }
            if (this.currentEntry.getValue().size() < (this.offset + 1)) {
                return new BasicIteratorResult_1.BasicIteratorResult(true, null);
            }
            return new BasicIteratorResult_1.BasicIteratorResult(false, this.currentEntry.getValue().get(this.offset));
        }
        if (this.currentEntry.getValue().size() > (this.offset + 1)) {
            this.offset = this.offset + 1;
            return new BasicIteratorResult_1.BasicIteratorResult(false, this.currentEntry.getValue().get(this.offset));
        }
        if (this.iter.hasNext()) {
            this.currentEntry = this.iter.next();
            this.offset = 0;
            return new BasicIteratorResult_1.BasicIteratorResult(false, this.currentEntry.getValue().get(this.offset));
        }
        return new BasicIteratorResult_1.BasicIteratorResult(true, null);
    };
    return HashSetIterator;
}());
exports.HashSetIterator = HashSetIterator;
