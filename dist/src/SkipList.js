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
var Collections_1 = require("./Collections");
var SkipListMapImpl = (function () {
    function SkipListMapImpl(iComparator, initialElements) {
        this.initialElements = initialElements;
        this.nodeList = null;
        this.height = 10;
        this.mapComparator = null;
        this.mapCollectable = null;
        this.numberElements = 0;
        this.skipListNodeComparator = null;
        this.skipListNodeCollectable = null;
        this.mapComparator = iComparator;
        //  this.skipListNodeComparator = new SkipListNodeComparator<K,V>(this.mapComparator);
        this.mapCollectable = Collections_1.Collections.collectableFromComparator(iComparator);
        this.skipListNodeCollectable = new SkipListNodeCollectable(this.mapCollectable);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.entrySet().iterator(); iter.hasNext();) {
                var t = iter.next();
                this.put(t.getKey(), t.getValue());
            }
        }
    }
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    SkipListMapImpl.prototype.clear = function () {
        this.nodeList = null;
        this.numberElements = 0;
    };
    /**
    * Returns the comparator used to order the keys in this map
    * @return {Comparator} the comparator used to order the keys in this map
    */
    SkipListMapImpl.prototype.comparator = function () {
        return this.mapComparator;
    };
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    SkipListMapImpl.prototype.size = function () {
        if (this.nodeList === null)
            return 0;
        if (this.nodeList === undefined)
            return 0;
        return this.numberElements;
    };
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    SkipListMapImpl.prototype.isEmpty = function () {
        if (this.size() < 1)
            return true;
        return false;
    };
    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    SkipListMapImpl.prototype.put = function (key, value) {
        if ((this.nodeList === undefined) || (this.nodeList === null)) {
            var newnode = new SkipListNode(key, value, this.height, this.skipListNodeCollectable);
            return value;
        }
        else {
            return undefined;
        }
    };
    return SkipListMapImpl;
}());
var SkipListNode = (function (_super) {
    __extends(SkipListNode, _super);
    function SkipListNode(key, value, height, iNodeCollectable) {
        var _this = _super.call(this, key, value) || this;
        _this.lastNodeArray = null;
        _this.nextNodeArray = null;
        _this.lastNodeArray = new ArrayList_1.ArrayList(iNodeCollectable);
        return _this;
    }
    SkipListNode.prototype.getLastNodeArray = function () {
        return this.lastNodeArray;
    };
    SkipListNode.prototype.getNextNodeArray = function () {
        return this.nextNodeArray;
    };
    return SkipListNode;
}(BasicMapEntry_1.BasicMapEntry));
var SkipListNodeCollectable = (function () {
    function SkipListNodeCollectable(iColl) {
        this.coll = null;
        this.coll = iColl;
    }
    SkipListNodeCollectable.prototype.equals = function (o1, o2) {
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
        if (this.coll.equals(o1.getKey(), o2.getKey())) {
            return true;
        }
        return false;
    };
    return SkipListNodeCollectable;
}());
var SkipListMap = (function () {
    function SkipListMap(comp, iInitial) {
        this.impl = null;
        this.impl = new SkipListMapImpl(comp, iInitial);
    }
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    SkipListMap.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
    */
    SkipListMap.prototype.get = function (key) {
        return undefined;
    };
    /**
    * Returns true if this map contains a mapping for the specified key.
    * @param {K} key The key whose presence in this map is to be tested
    * @return {V} true if this map contains a mapping for the specified key.
    */
    SkipListMap.prototype.containsKey = function (key) {
        return undefined;
    };
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    SkipListMap.prototype.isEmpty = function () {
        if (1 < this.impl.size()) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
    * Returns an ImmutableSet view of the keys contained in this map.
    * The set's iterator returns the keys in ascending order.
    * The set is backed by the map, so changes to the map are reflected in the set.
    * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    SkipListMap.prototype.keySet = function () {
        return undefined;
    };
    /**
    * Returns an ImmutableSet view of the mappings contained in this map.
    * The set's iterator returns the mappings in ascending key order.
    * The set is backed by the map, so changes to the map are reflected in the set.
    * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
    * The contains method on this entrySet will only compare keys not values.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    SkipListMap.prototype.entrySet = function () {
        return undefined;
    };
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    SkipListMap.prototype.put = function (key, value) {
        return undefined;
    };
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    SkipListMap.prototype.remove = function (key) {
        return undefined;
    };
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    SkipListMap.prototype.clear = function () {
        return undefined;
    };
    /**
    * Returns an ImmutableMap backed by this Map
    */
    SkipListMap.prototype.immutableMap = function () {
        return this;
    };
    /**
    * Returns the first (lowest) key currently in this map.
    * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
    */
    SkipListMap.prototype.firstKey = function () {
        return undefined;
    };
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the least key, or null if this map is empty
    */
    SkipListMap.prototype.firstEntry = function () {
        return undefined;
    };
    /**
    * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.ceilingEntry = function (key) {
        return undefined;
    };
    /**
    * Returns the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.ceilingKey = function (key) {
        return undefined;
    };
    /**
    * Returns the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    SkipListMap.prototype.higherKey = function (key) {
        return undefined;
    };
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    SkipListMap.prototype.higherEntry = function (key) {
        return undefined;
    };
    /**
    * Returns the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the highest key lower than key, or null if there is no such key
    */
    SkipListMap.prototype.lowerKey = function (key) {
        return undefined;
    };
    /**
    * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
    */
    SkipListMap.prototype.lowerEntry = function (key) {
        return undefined;
    };
    /**
    * Returns the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the greatest key less than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.floorKey = function (key) {
        return undefined;
    };
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.floorEntry = function (key) {
        return undefined;
    };
    /**
    * Returns the last (highest) key currently in this map.
    * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
    */
    SkipListMap.prototype.lastKey = function () {
        return undefined;
    };
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    SkipListMap.prototype.lastEntry = function () {
        return undefined;
    };
    return SkipListMap;
}());
exports.SkipListMap = SkipListMap;
var SkipListSet = (function () {
    function SkipListSet(iComparator, initialElements) {
        this.initialElements = initialElements;
        this.impl = null;
        this.impl = new SkipListMapImpl(iComparator, null);
    }
    SkipListSet.prototype.validateSet = function () {
        return undefined;
    };
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    SkipListSet.prototype.add = function (element) {
        return undefined;
    };
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    SkipListSet.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns the comparator used to order the keys in this set
    * @return {Comparator} the comparator used to order the keys in this set
    */
    SkipListSet.prototype.comparator = function () {
        return undefined;
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    SkipListSet.prototype.isEmpty = function () {
        if (1 < this.impl.size()) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    SkipListSet.prototype.contains = function (item) {
        return undefined;
    };
    /**
    * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
    * @param {K} item to find floor node for
    * @return {K} the greatest element less than or equal to e, or null if there is no such element
    */
    SkipListSet.prototype.floor = function (item) {
        return undefined;
    };
    /**
    * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
    * @param {K} item to find ceiling node for
    * @return {K} the least element greater than or equal to item, or null if there is no such element
    */
    SkipListSet.prototype.ceiling = function (item) {
        return undefined;
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    SkipListSet.prototype.first = function () {
        return undefined;
    };
    /**
    * Returns the last (highest) element currently in this set.
    * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
    */
    SkipListSet.prototype.last = function () {
        return undefined;
    };
    /**
    * Removes the specified element from this set if it is present.
    * @param {K} element element to be removed from this set
    * @return {boolean} true if the set contained the specified element
    */
    SkipListSet.prototype.remove = function (element) {
        return undefined;
    };
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    SkipListSet.prototype.clear = function () {
        return undefined;
    };
    /**
    * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
    * @return {K} the first (lowest) element, or null if this set is empty
    */
    SkipListSet.prototype.pollFirst = function () {
        return undefined;
    };
    /**
    * Retrieves and removes the last (highest) element, or returns null if this set is empty.
    * @return {K} the last (highest) element, or null if this set is empty
    */
    SkipListSet.prototype.pollLast = function () {
        return undefined;
    };
    /**
    * Needed For Iterator
    * @param {K} key the given key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    SkipListSet.prototype.getNextHigherKey = function (key) {
        return undefined;
    };
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    SkipListSet.prototype.iterator = function () {
        return undefined;
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    SkipListSet.prototype[Symbol.iterator] = function () {
        return undefined;
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    SkipListSet.prototype.immutableCollection = function () {
        return this;
    };
    ;
    /**
    * Returns an ImmutableSet backed by this Set
    */
    SkipListSet.prototype.immutableSet = function () {
        return this;
    };
    ;
    return SkipListSet;
}());
exports.SkipListSet = SkipListSet;
