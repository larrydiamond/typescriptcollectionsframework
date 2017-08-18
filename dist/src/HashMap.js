"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
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
var ArrayList_1 = require("./ArrayList");
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var BasicMapEntry_1 = require("./BasicMapEntry");
var LinkedList_1 = require("./LinkedList");
var HashMap = (function () {
    function HashMap(initialElements, iInitialCapacity, iLoadFactor) {
        if (initialElements === void 0) { initialElements = new HashMap(null, 20, 0.75); }
        if (iInitialCapacity === void 0) { iInitialCapacity = 20; }
        if (iLoadFactor === void 0) { iLoadFactor = 0.75; }
        this.initialElements = initialElements;
        this.iInitialCapacity = iInitialCapacity;
        this.iLoadFactor = iLoadFactor;
        this.data = null;
        this.elementCount = 0;
        this.loadFactor = 0.75;
        this.data = new ArrayList_1.ArrayList();
        for (var loop = 0; loop < iInitialCapacity; loop++) {
            this.data.add(new LinkedList_1.LinkedList());
        }
        this.loadFactor = iLoadFactor;
        if (initialElements !== null) {
            // TODO
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
        if (mapEntry === null) {
            var hashCode = key.hashCode();
            var newNode = new HashMapEntry(key, value);
            newNode.setHashCode(hashCode);
            if (this.data.size() === 0) {
                var newList = new ArrayList_1.ArrayList();
                this.data.add(newList);
                newList.add(newNode);
                this.elementCount = this.elementCount + 1;
            }
            else {
                var bucket = hashCode % this.data.size();
                var thisList = this.data.get(bucket);
                thisList.add(newNode);
                this.elementCount = this.elementCount + 1;
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
     * Rehashes the entire hashmap.... gonna be slow you've been warned
     */
    HashMap.prototype.rehash = function () {
        if (this.elementCount > (this.data.size() * this.loadFactor)) {
            // How many buckets should there be?   Lets go with doubling the number of buckets
            var newBucketCount = (this.data.size() * 2) + 1;
            var newdata = new ArrayList_1.ArrayList();
            for (var loop = 0; loop < newBucketCount; loop++) {
                newdata.add(new LinkedList_1.LinkedList());
            }
            //      console.log ("Rehash " + newBucketCount + " " + this.elementCount + " " + this.loadFactor + " " + this.data.size());
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
    * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
    */
    HashMap.prototype.get = function (key) {
        var tmp = this.getMapEntry(key);
        if (tmp === null)
            return null;
        if (tmp === undefined)
            return null;
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
        var hashCode = key.hashCode();
        var numBuckets = this.data.size();
        if (numBuckets < 1)
            numBuckets = 1;
        var bucket = hashCode % numBuckets;
        var thisList = this.data.get(bucket);
        for (var loop = 0; loop < thisList.size(); loop++) {
            if (key.equals(thisList.get(loop).getKey())) {
                this.elementCount = this.elementCount - 1;
                return thisList.remove(loop).getValue();
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
    HashMap.prototype.getMapEntry = function (key) {
        if (this.data === null)
            return null;
        if (this.data === undefined)
            return null;
        if (this.data.size() < 1)
            return null;
        var hashCode = key.hashCode();
        var numBuckets = this.data.size();
        if (numBuckets < 1)
            numBuckets = 1;
        var bucket = hashCode % numBuckets;
        var thisList = this.data.get(bucket);
        for (var loop = 0; loop < thisList.size(); loop++) {
            if (key.equals(thisList.get(loop).getKey()))
                return thisList.get(loop);
        }
        return null;
    };
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    HashMap.prototype.clear = function () {
        this.data = new ArrayList_1.ArrayList();
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
     * The set's iterator returns the mappings in ascending key order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * The contains method on this entrySet will only compare keys not values.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    HashMap.prototype.entrySet = function () {
        return new ImmutableEntrySetForHashMap(this);
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
            var tmpbucket = this.data[offset];
            if (tmpbucket !== null) {
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
        var tmpbucket = this.data[current.bucket];
        if (tmpbucket.size() < current.offset) {
            var tmp = new HashMapIteratorLocationTracker();
            tmp.bucket = current.bucket;
            tmp.offset = tmp.offset + 1;
            tmp.entry = tmpbucket.get(tmp.offset);
            return tmp;
        }
        // get the first node you can find in the next populated bucket if any exists
        var bucket = current.bucket + 1;
        while (bucket < this.data.size()) {
            var tmpbucket_1 = this.data[bucket];
            if (tmpbucket_1 !== null) {
                var tmpentry = tmpbucket_1.get(0);
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
    return HashMap;
}());
exports.HashMap = HashMap;
var HashMapIteratorLocationTracker = (function () {
    function HashMapIteratorLocationTracker() {
    }
    return HashMapIteratorLocationTracker;
}());
exports.HashMapIteratorLocationTracker = HashMapIteratorLocationTracker;
var HashMapEntry = (function (_super) {
    __extends(HashMapEntry, _super);
    function HashMapEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashMapEntry.prototype.getHashCode = function () {
        return this.hashCode;
    };
    HashMapEntry.prototype.setHashCode = function (iHashCode) {
        this.hashCode = iHashCode;
    };
    HashMapEntry.prototype.setValue = function (iValue) {
        this.value = iValue;
    };
    return HashMapEntry;
}(BasicMapEntry_1.BasicMapEntry));
exports.HashMapEntry = HashMapEntry;
var ImmutableKeySetForHashMap = (function () {
    function ImmutableKeySetForHashMap(iHashMap) {
        this.map = iHashMap;
    }
    ImmutableKeySetForHashMap.prototype.size = function () { return this.map.size(); };
    ImmutableKeySetForHashMap.prototype.isEmpty = function () { return this.map.isEmpty(); };
    ImmutableKeySetForHashMap.prototype.contains = function (item) { return this.map.containsKey(item); };
    ImmutableKeySetForHashMap.prototype.iterator = function () { return new HashMapKeySetJIterator(this.map); };
    ImmutableKeySetForHashMap.prototype[Symbol.iterator] = function () { return new HashMapKeySetIterator(this.map); };
    return ImmutableKeySetForHashMap;
}());
exports.ImmutableKeySetForHashMap = ImmutableKeySetForHashMap;
/* Java style iterator */
var HashMapKeySetJIterator = (function () {
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
var HashMapKeySetIterator = (function () {
    function HashMapKeySetIterator(iHashMap) {
        this.map = iHashMap;
        this.location = this.map.deprecatedGetFirstEntryForIterator();
    }
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
var ImmutableEntrySetForHashMap = (function () {
    function ImmutableEntrySetForHashMap(iHashMap) {
        this.map = iHashMap;
    }
    ImmutableEntrySetForHashMap.prototype.size = function () { return this.map.size(); };
    ImmutableEntrySetForHashMap.prototype.isEmpty = function () { return this.map.isEmpty(); };
    ImmutableEntrySetForHashMap.prototype.contains = function (item) { return this.map.containsKey(item.getKey()); };
    ImmutableEntrySetForHashMap.prototype.iterator = function () { return new HashMapEntrySetJIterator(this.map); };
    ImmutableEntrySetForHashMap.prototype[Symbol.iterator] = function () { return new HashMapEntrySetIterator(this.map); };
    return ImmutableEntrySetForHashMap;
}());
exports.ImmutableEntrySetForHashMap = ImmutableEntrySetForHashMap;
/* Java style iterator */
var HashMapEntrySetJIterator = (function () {
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
var HashMapEntrySetIterator = (function () {
    function HashMapEntrySetIterator(iHashMap) {
        this.map = iHashMap;
        this.location = this.map.deprecatedGetFirstEntryForIterator();
    }
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
