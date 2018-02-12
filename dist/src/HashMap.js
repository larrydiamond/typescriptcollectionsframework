"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var AllFieldHashable_1 = require("./AllFieldHashable");
var ArrayList_1 = require("./ArrayList");
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var BasicMapEntry_1 = require("./BasicMapEntry");
var LinkedList_1 = require("./LinkedList");
/**
 * Hash table based implementation of the Map interface.  This implementation permits null values and the null key.<br>
 * This class makes no guarantees as to the order of the map; in particular, it does not guarantee that the order will remain constant over time.<br>
 * This implementation provides constant-time performance for the basic operations (get and put), assuming the hash function disperses the elements properly among the buckets.<br>
 * Iteration over collection views requires time proportional to the "capacity" of the HashMap instance (the number of buckets) plus its size (the number of key-value mappings).
 *
 * An instance of HashMap has two parameters that affect its performance: initial capacity and load factor.<br>
 * The capacity is the number of buckets in the hash table, and the initial capacity is simply the capacity at the time the hash table is created.<br>
 * The load factor is a measure of how full the hash table is allowed to get before its capacity is automatically increased.<br>
 * When the number of entries in the hash table exceeds the product of the load factor and the current capacity, the hash table is rehashed (that is, internal data structures are rebuilt) so that the hash table has approximately twice the number of buckets.
 *
 * As a general rule, the default load factor (.75) offers a good tradeoff between time and space costs.<br>
 * Higher values decrease the space overhead but increase the lookup cost (reflected in most of the operations of the HashMap class, including get and put).<br>
 * The expected number of entries in the map and its load factor should be taken into account when setting its initial capacity, so as to minimize the number of rehash operations.<br>
 * If the initial capacity is greater than the maximum number of entries divided by the load factor, no rehash operations will ever occur.
 *
 * If many mappings are to be stored in a HashMap instance, creating it with a sufficiently large capacity will allow the mappings to be stored more efficiently than letting it perform automatic rehashing as needed to grow the table.<br>
 * Note that using many keys with the same hashCode() is a sure way to slow down performance of any hash table.
 *
 * This class corresponds to java.util.HashMap
 */
var HashMap = /** @class */ (function () {
    function HashMap(iHash, initialElements, iInitialCapacity, iLoadFactor) {
        if (iHash === void 0) { iHash = AllFieldHashable_1.AllFieldHashable.instance; }
        if (initialElements === void 0) { initialElements = null; }
        if (iInitialCapacity === void 0) { iInitialCapacity = 20; }
        if (iLoadFactor === void 0) { iLoadFactor = 0.75; }
        this.initialElements = initialElements;
        this.iInitialCapacity = iInitialCapacity;
        this.iLoadFactor = iLoadFactor;
        this.data = null;
        this.elementCount = 0;
        this.loadFactor = 0.75;
        this.hashMethods = iHash;
        this.MapEntryHashMethods = this.getHashMapEntryHashable(this.hashMethods);
        this.ListMapEntryMethods = this.getListHashMapEntryHashable(this.hashMethods);
        this.data = new ArrayList_1.ArrayList(this.ListMapEntryMethods);
        for (var loop = 0; loop < iInitialCapacity; loop++) {
            this.data.add(new LinkedList_1.LinkedList(this.MapEntryHashMethods));
        }
        this.loadFactor = iLoadFactor;
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.entrySet().iterator(); iter.hasNext();) {
                var t = iter.next();
                this.put(t.getKey(), t.getValue());
            }
        }
    }
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
    */
    HashMap.prototype.put = function (key, value) {
        var mapEntry = this.getMapEntry(key);
        if ((mapEntry === null) || (mapEntry === undefined)) {
            var hashCode = this.hashMethods.hashCode(key);
            var newNode = new HashMapEntry(key, value);
            newNode.setHashCode(hashCode);
            if (this.data.size() === 0) {
                var newList = new ArrayList_1.ArrayList(this.MapEntryHashMethods);
                this.data.add(newList);
                newList.add(newNode);
                this.elementCount = this.elementCount + 1;
                this.addEntry(hashCode, key, value);
            }
            else {
                var bucket = hashCode % this.data.size();
                var thisList = this.data.get(bucket);
                thisList.add(newNode);
                this.elementCount = this.elementCount + 1;
                this.addEntry(hashCode, key, value);
            }
            this.rehash();
            return undefined;
        }
        else {
            var tmp = mapEntry.getValue();
            mapEntry.setValue(value);
            return tmp;
        }
    };
    /**
     *
     * This is a placeholder that does nothing for HashMap object but needed to work with
     * LinkedHashMap's addEntry method which it overrides from here to fully provide the linked functionality.
     * @param {number} hash value that represents the hash value of the key
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @param {number} bucket index of the bucket in which the Entry should be
     */
    HashMap.prototype.addEntry = function (hash, key, value, bucket) {
        ; // added to remove tslint error
    };
    /**
     * Rehashes the entire hashmap.... gonna be slow you've been warned
     */
    HashMap.prototype.rehash = function () {
        if (this.elementCount > (this.data.size() * this.loadFactor)) {
            // How many buckets should there be?   Lets go with doubling the number of buckets
            var newBucketCount = (this.data.size() * 2) + 1;
            var newdata = new ArrayList_1.ArrayList(this.ListMapEntryMethods);
            for (var loop = 0; loop < newBucketCount; loop++) {
                newdata.add(new LinkedList_1.LinkedList(this.MapEntryHashMethods));
            }
            // Iterate through the nodes and add them all into newdata
            for (var bucketIter = this.data.iterator(); bucketIter.hasNext();) {
                var bucket = bucketIter.next();
                for (var entryIter = bucket.iterator(); entryIter.hasNext();) {
                    var entry = entryIter.next();
                    var hashCode = entry.getHashCode();
                    var hashBucket = hashCode % newBucketCount;
                    newdata.get(hashBucket).add(entry);
                }
            }
            this.data = newdata;
        }
    };
    /**
     * Returns true if this map contains no key-value mappings.
     * @return {boolean} true if this map contains no key-value mappings
     */
    HashMap.prototype.isEmpty = function () {
        if (this.elementCount < 1)
            return true;
        return false;
    };
    /**
     * Returns the number of key-value mappings in this map.
     * @return {number} the number of key-value mappings in this map
     */
    HashMap.prototype.size = function () {
        return this.elementCount;
    };
    /**
    * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
    */
    HashMap.prototype.get = function (key) {
        var tmp = this.getMapEntry(key);
        if (tmp === null)
            return undefined;
        if (tmp === undefined)
            return undefined;
        return tmp.getValue();
    };
    /**
     * Removes the mapping for this key from this Map if present.
     * @param {K} key key for which mapping should be removed
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    HashMap.prototype.remove = function (key) {
        if (this.data === null)
            return null;
        if (this.data === undefined)
            return null;
        if (this.data.size() < 1)
            return null;
        var hashCode = this.hashMethods.hashCode(key);
        var numBuckets = this.data.size();
        if (numBuckets < 1)
            numBuckets = 1;
        var bucket = hashCode % numBuckets;
        var thisList = this.data.get(bucket);
        for (var loop = 0; loop < thisList.size(); loop++) {
            if (this.hashMethods.equals(key, thisList.get(loop).getKey())) {
                this.elementCount = this.elementCount - 1;
                return thisList.removeIndex(loop).getValue();
            }
        }
        return null;
    };
    /**
     * Returns true if this map contains a mapping for the specified key.
     * @param {K} key The key whose presence in this map is to be tested
     * @return {V} true if this map contains a mapping for the specified key.
     */
    HashMap.prototype.containsKey = function (key) {
        var tmp = this.getMapEntry(key);
        if (tmp === null)
            return false;
        if (tmp === undefined)
            return false;
        return true;
    };
    HashMap.prototype.getEntry = function (key) {
        return this.getMapEntry(key);
    };
    HashMap.prototype.getMapEntry = function (key) {
        if (this.data === null)
            return undefined;
        if (this.data === undefined)
            return undefined;
        if (this.data.size() < 1)
            return undefined;
        var hashCode = this.hashMethods.hashCode(key);
        var numBuckets = this.data.size();
        if (numBuckets < 1)
            numBuckets = 1;
        var bucket = hashCode % numBuckets;
        var thisList = this.data.get(bucket);
        for (var loop = 0; loop < thisList.size(); loop++) {
            if (this.hashMethods.equals(key, thisList.get(loop).getKey())) {
                return thisList.get(loop);
            }
        }
        return undefined;
    };
    /**
     * Removes all of the mappings from this map. The map will be empty after this call returns.
     */
    HashMap.prototype.clear = function () {
        this.data.clear();
        this.data = new ArrayList_1.ArrayList(this.ListMapEntryMethods);
        this.elementCount = 0;
    };
    /**
     * Returns an ImmutableSet view of the keys contained in this map.
     * The set's iterator returns the keys in ascending order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    HashMap.prototype.keySet = function () {
        return new ImmutableKeySetForHashMap(this);
    };
    /**
     * Returns an ImmutableSet view of the mappings contained in this map.
     * The set's iterator returns the mappings in random key order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * The contains method on this entrySet will only compare keys not values.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    HashMap.prototype.entrySet = function () {
        return new ImmutableEntrySetForHashMap(this);
    };
    /**
    * Returns an ImmutableMap backed by Map
    */
    HashMap.prototype.immutableMap = function () {
        return this;
    };
    /**
     * Returns an iterator over the entire entry set
     * @return {Iterator<K>} an iterator for the entry set
     */
    HashMap.prototype[Symbol.iterator] = function () {
        return this.entrySet[Symbol.iterator]();
    };
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    HashMap.prototype.deprecatedGetFirstEntryForIterator = function () {
        if (this.data === null)
            return null;
        if (this.data === undefined)
            return null;
        for (var offset = 0; offset < this.data.size(); offset++) {
            var tmpbucket = this.data.get(offset);
            if ((tmpbucket !== null) && (tmpbucket !== undefined)) {
                if (tmpbucket.size() > 0) {
                    var tmpentry = tmpbucket.get(0);
                    if (tmpentry !== null) {
                        var tmp = new HashMapIteratorLocationTracker();
                        tmp.bucket = offset;
                        tmp.offset = 0;
                        tmp.entry = tmpentry;
                        return tmp;
                    }
                }
            }
        }
        return null;
    };
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    HashMap.prototype.deprecatedGetNextEntryForIterator = function (current) {
        if (this.data === null)
            return null;
        if (this.data === undefined)
            return null;
        // did the hashmap shrink?
        if (current.bucket > this.data.size())
            return null;
        // get the next node in the current bucket if possible
        var tmpbucket = this.data.get(current.bucket);
        if (tmpbucket.size() > (current.offset + 1)) {
            var tmp = new HashMapIteratorLocationTracker();
            tmp.bucket = current.bucket;
            tmp.offset = current.offset + 1;
            tmp.entry = tmpbucket.get(tmp.offset);
            return tmp;
        }
        // get the first node you can find in the next populated bucket if any exists
        var bucket = current.bucket + 1;
        while (bucket < this.data.size()) {
            var tmpb = this.data.get(bucket);
            if ((tmpb !== null) && (tmpb !== undefined)) {
                var tmpentry = tmpb.get(0);
                if (tmpentry !== null) {
                    var tmp = new HashMapIteratorLocationTracker();
                    tmp.bucket = bucket;
                    tmp.offset = 0;
                    tmp.entry = tmpentry;
                    return tmp;
                }
            }
            bucket = bucket + 1;
        }
        return null;
    };
    HashMap.prototype.getHashMapEntryHashable = function (iHash) {
        var thisHash = {
            hashCode: function (o) {
                return iHash.hashCode(o.getKey());
            },
            equals: function (o1, o2) {
                return iHash.equals(o1.getKey(), o2.getKey());
            }
        };
        return thisHash;
    };
    HashMap.prototype.getListHashMapEntryHashable = function (iHash) {
        var thisHash = {
            equals: function (o1, o2) {
                if (o1 === undefined) {
                    if (o2 === undefined) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                if (o1 === null) {
                    if (o2 === null) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                if ((o2 === null) || (o2 === undefined)) {
                    return false;
                }
                if (o1.size() !== o2.size()) {
                    return false;
                }
                for (var loop = 0; loop < this.size(); loop++) {
                    var thisentry = o1.get(loop);
                    var thatentry = o2.get(loop);
                    if (this.equality.equals(thisentry, thatentry)) {
                        // keep going
                    }
                    else {
                        return false;
                    }
                }
                return true;
            }
        };
        return thisHash;
    };
    return HashMap;
}());
exports.HashMap = HashMap;
var HashMapIteratorLocationTracker = /** @class */ (function () {
    function HashMapIteratorLocationTracker() {
    }
    return HashMapIteratorLocationTracker;
}());
exports.HashMapIteratorLocationTracker = HashMapIteratorLocationTracker;
var HashMapEntry = /** @class */ (function (_super) {
    __extends(HashMapEntry, _super);
    function HashMapEntry(key, value, hash) {
        var _this = _super.call(this, key, value) || this;
        _this.hashCode = hash;
        return _this;
    }
    // private hashCode:number;
    HashMapEntry.prototype.getHashCode = function () {
        return this.hashCode;
    };
    HashMapEntry.prototype.setHashCode = function (iHashCode) {
        this.hashCode = iHashCode;
    };
    HashMapEntry.prototype.setValue = function (newValue) {
        this.value = newValue;
    };
    return HashMapEntry;
}(BasicMapEntry_1.BasicMapEntry));
exports.HashMapEntry = HashMapEntry;
var ImmutableKeySetForHashMap = /** @class */ (function () {
    function ImmutableKeySetForHashMap(iHashMap) {
        this.map = iHashMap;
    }
    ImmutableKeySetForHashMap.prototype.size = function () { return this.map.size(); };
    ImmutableKeySetForHashMap.prototype.isEmpty = function () { return this.map.isEmpty(); };
    ImmutableKeySetForHashMap.prototype.contains = function (item) { return this.map.containsKey(item); };
    ImmutableKeySetForHashMap.prototype.iterator = function () { return new HashMapKeySetJIterator(this.map); };
    ImmutableKeySetForHashMap.prototype[Symbol.iterator] = function () { return new HashMapKeySetIterator(this.map); };
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    ImmutableKeySetForHashMap.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    return ImmutableKeySetForHashMap;
}());
exports.ImmutableKeySetForHashMap = ImmutableKeySetForHashMap;
/* Java style iterator */
var HashMapKeySetJIterator = /** @class */ (function () {
    function HashMapKeySetJIterator(iHashMap) {
        this.map = iHashMap;
    }
    HashMapKeySetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var firstEntry = this.map.deprecatedGetFirstEntryForIterator();
            if (firstEntry === null)
                return false;
            if (firstEntry === undefined)
                return false;
            if (firstEntry.entry === null)
                return false;
            if (firstEntry.entry === undefined)
                return false;
            var first = firstEntry.entry.getKey();
            return true;
        }
        else {
            var tmpEntry = this.map.deprecatedGetNextEntryForIterator(this.location);
            if (tmpEntry === null)
                return false;
            if (tmpEntry === undefined)
                return false;
            if (tmpEntry.entry === null)
                return false;
            if (tmpEntry.entry === undefined)
                return false;
            var tmp = tmpEntry.entry.getKey();
            return true;
        }
    };
    HashMapKeySetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var firstEntry = this.map.deprecatedGetFirstEntryForIterator();
            if (firstEntry === null)
                return null;
            if (firstEntry === undefined)
                return null;
            if (firstEntry.entry === null)
                return null;
            if (firstEntry.entry === undefined)
                return null;
            var first = firstEntry.entry.getKey();
            this.location = firstEntry;
            return first;
        }
        else {
            var tmpEntry = this.map.deprecatedGetNextEntryForIterator(this.location);
            if (tmpEntry === null)
                return null;
            if (tmpEntry === undefined)
                return null;
            if (tmpEntry.entry === null)
                return null;
            if (tmpEntry.entry === undefined)
                return null;
            var tmp = tmpEntry.entry.getKey();
            this.location = tmpEntry;
            return tmp;
        }
    };
    return HashMapKeySetJIterator;
}());
exports.HashMapKeySetJIterator = HashMapKeySetJIterator;
/* TypeScript iterator */
var HashMapKeySetIterator = /** @class */ (function () {
    function HashMapKeySetIterator(iHashMap) {
        this.map = iHashMap;
        this.location = this.map.deprecatedGetFirstEntryForIterator();
    }
    // tslint:disable-next-line:no-any
    HashMapKeySetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.entry.getKey());
        this.location = this.map.deprecatedGetNextEntryForIterator(this.location);
        return tmp;
    };
    return HashMapKeySetIterator;
}());
exports.HashMapKeySetIterator = HashMapKeySetIterator;
var ImmutableEntrySetForHashMap = /** @class */ (function () {
    function ImmutableEntrySetForHashMap(iHashMap) {
        this.map = iHashMap;
    }
    ImmutableEntrySetForHashMap.prototype.size = function () { return this.map.size(); };
    ImmutableEntrySetForHashMap.prototype.isEmpty = function () { return this.map.isEmpty(); };
    ImmutableEntrySetForHashMap.prototype.contains = function (item) { return this.map.containsKey(item.getKey()); };
    ImmutableEntrySetForHashMap.prototype.iterator = function () { return new HashMapEntrySetJIterator(this.map); };
    ImmutableEntrySetForHashMap.prototype[Symbol.iterator] = function () { return new HashMapEntrySetIterator(this.map); };
    ImmutableEntrySetForHashMap.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    return ImmutableEntrySetForHashMap;
}());
exports.ImmutableEntrySetForHashMap = ImmutableEntrySetForHashMap;
/* Java style iterator */
var HashMapEntrySetJIterator = /** @class */ (function () {
    function HashMapEntrySetJIterator(iHashMap) {
        this.map = iHashMap;
    }
    HashMapEntrySetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var firstEntry = this.map.deprecatedGetFirstEntryForIterator();
            if (firstEntry === null)
                return false;
            if (firstEntry === undefined)
                return false;
            if (firstEntry.entry === null)
                return false;
            if (firstEntry.entry === undefined)
                return false;
            var first = firstEntry.entry.getKey();
            return true;
        }
        else {
            var tmpEntry = this.map.deprecatedGetNextEntryForIterator(this.location);
            if (tmpEntry === null)
                return false;
            if (tmpEntry === undefined)
                return false;
            if (tmpEntry.entry === null)
                return false;
            if (tmpEntry.entry === undefined)
                return false;
            var tmp = tmpEntry.entry.getKey();
            return true;
        }
    };
    HashMapEntrySetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var firstEntry = this.map.deprecatedGetFirstEntryForIterator();
            if (firstEntry === null)
                return null;
            if (firstEntry === undefined)
                return null;
            if (firstEntry.entry === null)
                return null;
            if (firstEntry.entry === undefined)
                return null;
            var first = firstEntry.entry;
            this.location = firstEntry;
            return first;
        }
        else {
            var tmpEntry = this.map.deprecatedGetNextEntryForIterator(this.location);
            if (tmpEntry === null)
                return null;
            if (tmpEntry === undefined)
                return null;
            if (tmpEntry.entry === null)
                return null;
            if (tmpEntry.entry === undefined)
                return null;
            var tmp = tmpEntry.entry;
            this.location = tmpEntry;
            return tmp;
        }
    };
    return HashMapEntrySetJIterator;
}());
exports.HashMapEntrySetJIterator = HashMapEntrySetJIterator;
/* TypeScript iterator */
var HashMapEntrySetIterator = /** @class */ (function () {
    function HashMapEntrySetIterator(iHashMap) {
        this.map = iHashMap;
        this.location = this.map.deprecatedGetFirstEntryForIterator();
    }
    // tslint:disable-next-line:no-any
    HashMapEntrySetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.entry);
        this.location = this.map.deprecatedGetNextEntryForIterator(this.location);
        return tmp;
    };
    return HashMapEntrySetIterator;
}());
exports.HashMapEntrySetIterator = HashMapEntrySetIterator;
