"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var AllFieldHashable_1 = require("./AllFieldHashable");
var HashMap_1 = require("./HashMap");
/**
 * Hash table and linked list implementation of the Map interface, with predictable iteration order. This implementation
 * differs from HashMap in that it maintains a doubly-linked list running through all of its entries. This linked list
 * defines the iteration ordering, which is normally the order in which keys were inserted into the map (insertion-order).
 * Note that insertion order is not affected if a key is re-inserted into the map.
 *
 * This class corresponds to java.util.LinkedHashMap
 */
var LinkedHashMap = /** @class */ (function (_super) {
    __extends(LinkedHashMap, _super);
    /*
    * Constructs an empty insertion-ordered LinkedHashMap instance with the default
    * initial capacity (20-from super class) and load factor (0.75).
    */
    function LinkedHashMap(iHash, initialElementsLinked, iInitialCapacityLinked, iLoadFactorLinked) {
        if (iHash === void 0) { iHash = AllFieldHashable_1.AllFieldHashable.instance; }
        if (initialElementsLinked === void 0) { initialElementsLinked = null; }
        if (iInitialCapacityLinked === void 0) { iInitialCapacityLinked = 20; }
        if (iLoadFactorLinked === void 0) { iLoadFactorLinked = 0.75; }
        var _this = _super.call(this, iHash, null, iInitialCapacityLinked, iLoadFactorLinked) || this;
        _this.initialElementsLinked = initialElementsLinked;
        _this.iInitialCapacityLinked = iInitialCapacityLinked;
        _this.iLoadFactorLinked = iLoadFactorLinked;
        _this.initChain();
        _this.initializeElements(initialElementsLinked);
        return _this;
    }
    /**
     * Initializes the chain before any entries are inserted into the map.
     */
    LinkedHashMap.prototype.initChain = function () {
        this.header = new LinkedEntry(-1, null, null);
        // make circular
        this.header.before = this.header.after = this.header;
    };
    /**
     * Use collection and add to LinkedHashMap
     * @param elements collection to populate
     */
    LinkedHashMap.prototype.initializeElements = function (elements) {
        // makes new list unorder.. it uses set..
        if ((elements !== null) && (elements !== undefined)) {
            for (var iter = elements.entrySet().iterator(); iter.hasNext();) {
                var t = iter.next();
                this.put(t.getKey(), t.getValue());
            }
        }
    };
    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value value whose presence in this map is to be tested
     */
    LinkedHashMap.prototype.containsValue = function (value) {
        if (value === null || value === undefined)
            return false;
        else {
            for (var e = this.header.after; e !== this.header; e = e.after)
                if (value === e.getValue())
                    return true;
        }
        return false;
    };
    /**
     * This override alters behavior of superclass remove method.
     * @param {V} key key value
     */
    LinkedHashMap.prototype.remove = function (key) {
        var result = _super.prototype.remove.call(this, key);
        if (result === null || result === undefined)
            return null; // not there dont proceed further
        for (var e = this.header.after; e !== this.header; e = e.after)
            if (key === e.getKey()) {
                e.remove();
                return e.getValue();
            }
        return null;
    };
    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * @param key key with which the specified value is to be associated
     */
    LinkedHashMap.prototype.get = function (key) {
        var entry = this.getEntry(key);
        if ((entry === null) || (entry === undefined))
            return undefined;
        return entry.getValue();
    };
    /**
     * This override alters behavior of superclass put method. It causes newly allocated entry
     * to get inserted at the end of the linked list and removes the eldest entry if appropriate.
     * @param {number} hash value that represents the hash value of the key
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @param {number} bucket index of the bucket in which the Entry should be
     */
    LinkedHashMap.prototype.addEntry = function (hash, key, value, bucket) {
        this.createEntry(hash, key, value, bucket);
        var eldest = this.header.after;
        if (this.removeEldestEntry(eldest)) {
            this.removeEntryForKey(eldest.getKey());
        }
        else {
            // resize;
        }
    };
    LinkedHashMap.prototype.createEntry = function (hash, key, value, bucket) {
        var e = new LinkedEntry(hash, key, value);
        e.addBefore(this.header);
    };
    /**
     * Returns true if this map should remove its eldest entry. This method is invoked by put and
     * putAll after inserting a new entry into the map. It provides the implementor with the opportunity to remove the
     * eldest entry each time a new one is added. This is useful if the map represents a cache: it allows the map to reduce
     * memory consumption by deleting stale entries.
     * @param eldest eldest entry
     */
    LinkedHashMap.prototype.removeEldestEntry = function (eldest) {
        return false;
    };
    LinkedHashMap.prototype.removeEntryForKey = function (key) {
        return null;
    };
    LinkedHashMap.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.header.before = this.header.after = this.header;
    };
    LinkedHashMap.prototype.getHeader = function () {
        return this.header;
    };
    LinkedHashMap.prototype.newKeyIterator = function () {
        return new KeyIterator(this);
    };
    LinkedHashMap.prototype.newValueIterator = function () {
        return new ValueIterator(this);
    };
    LinkedHashMap.prototype.newEntryIterator = function () {
        return new EntryIterator(this);
    };
    return LinkedHashMap;
}(HashMap_1.HashMap));
exports.LinkedHashMap = LinkedHashMap;
/**
 * LinkedHashMap entry class
 */
var LinkedEntry = /** @class */ (function (_super) {
    __extends(LinkedEntry, _super);
    function LinkedEntry(hash, key, value) {
        return _super.call(this, key, value, hash) || this;
    }
    /**
     * Removes this entry from the linked list.
     */
    LinkedEntry.prototype.remove = function () {
        this.before.after = this.after;
        this.after.before = this.before;
    };
    /**
     * Inserts this entry before the specified existing entry in the list.
     * @param existingEntry existing entry
     */
    LinkedEntry.prototype.addBefore = function (existingEntry) {
        this.after = existingEntry;
        this.before = existingEntry.before;
        this.before.after = this;
        this.after.before = this;
    };
    LinkedEntry.prototype.recordRemoval = function (m) {
        this.remove();
    };
    LinkedEntry.prototype.equals = function (o) {
        if ((o === undefined) || (o === null)) {
            return false;
        }
        if (JSON.stringify(o) === JSON.stringify(this.key))
            return true;
        return false;
    };
    return LinkedEntry;
}(HashMap_1.HashMapEntry));
exports.LinkedEntry = LinkedEntry;
/* Java style iterator */
var LinkedHashIterator = /** @class */ (function () {
    function LinkedHashIterator(linkedHashMap) {
        this.header = linkedHashMap.getHeader();
        this.next_Entry = linkedHashMap.getHeader().after;
        this.lastReturned = null;
    }
    LinkedHashIterator.prototype.next = function () {
        return this.nextEntry();
    };
    LinkedHashIterator.prototype.hasNext = function () {
        return this.next_Entry !== this.header;
    };
    LinkedHashIterator.prototype.nextEntry = function () {
        if (this.check() === false)
            return null;
        var e = this.lastReturned = this.next_Entry;
        this.next_Entry = e.after;
        return e;
    };
    LinkedHashIterator.prototype.check = function () {
        if (this.next_Entry === this.header)
            return false;
        return true;
    };
    return LinkedHashIterator;
}());
exports.LinkedHashIterator = LinkedHashIterator;
// These Overrides alter the behavior of superclass view JIterator() methods
var EntryIterator = /** @class */ (function (_super) {
    __extends(EntryIterator, _super);
    function EntryIterator(linkedHashMap) {
        return _super.call(this, linkedHashMap) || this;
    }
    EntryIterator.prototype._next = function () {
        return this.next();
    };
    return EntryIterator;
}(LinkedHashIterator));
exports.EntryIterator = EntryIterator;
var KeyIterator = /** @class */ (function (_super) {
    __extends(KeyIterator, _super);
    function KeyIterator(linkedHashMap) {
        return _super.call(this, linkedHashMap) || this;
    }
    KeyIterator.prototype._next = function () {
        return this.next().getKey();
    };
    return KeyIterator;
}(LinkedHashIterator));
exports.KeyIterator = KeyIterator;
var ValueIterator = /** @class */ (function (_super) {
    __extends(ValueIterator, _super);
    function ValueIterator(linkedHashMap) {
        return _super.call(this, linkedHashMap) || this;
    }
    ValueIterator.prototype._next = function () {
        return this.next().getValue();
    };
    return ValueIterator;
}(LinkedHashIterator));
exports.ValueIterator = ValueIterator;
