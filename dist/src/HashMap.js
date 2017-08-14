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
     * Removes the mapping for this key from this TreeMap if present.
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
    return HashMap;
}());
exports.HashMap = HashMap;
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
