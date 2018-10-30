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
* Copyright Francesco Giordano 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var AllFieldHashable_1 = require("./AllFieldHashable");
var HashSet_1 = require("./HashSet");
/**
 * Hash table and linked-list implementation of the Set interface with predictable iteration order.
 *
 * This class corresponds to java.util.LinkedHashSet
 */
var LinkedHashSet = /** @class */ (function (_super) {
    __extends(LinkedHashSet, _super);
    /*
    * Constructs an empty insertion-ordered Linked instance with the default
    * initial capacity (20-from super class) and load factor (0.75).
    */
    function LinkedHashSet(iHash, initialElementsLinked, iInitialCapacityLinked, iLoadFactorLinked) {
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
     * Initializes the chain before any entries are inserted.
     */
    LinkedHashSet.prototype.initChain = function () {
        this.header = new LinkedEntry(null);
        // make circular
        this.header.before = this.header.after = this.header;
    };
    /**
     * Use collection and add to LinkedEntry and super HashSet
     * @param elements collection to populate
     */
    LinkedHashSet.prototype.initializeElements = function (elements) {
        // makes new list unorder.. it uses set..
        if ((elements !== null) && (elements !== undefined)) {
            for (var iter = elements.iterator(); iter.hasNext();) {
                var val = iter.next();
                this.add(val);
            }
        }
    };
    /**
     * This override alters behavior of superclass add method. It causes newly allocated entry
     * to get inserted at the end of the linked list.
     * @param {V} value value
     */
    LinkedHashSet.prototype.add = function (value) {
        var result = _super.prototype.add.call(this, value);
        if (result === false)
            return false; // avoid inserting duplicate
        return this.createEntry(value);
    };
    /**
     * This override alters behavior of superclass remove method.
     * @param {V} value value
     */
    LinkedHashSet.prototype.remove = function (value) {
        var result = _super.prototype.remove.call(this, value);
        if (result === false)
            return false; // not there dont proceed further
        var linkedIter = this.Iterator();
        for (; linkedIter.hasNext();) {
            var val = linkedIter.next();
            if (val.equals(value) === true) {
                val.remove();
                return true;
            }
        }
        return false;
    };
    LinkedHashSet.prototype.createEntry = function (value) {
        var e = new LinkedEntry(value);
        e.addBefore(this.header);
        return true;
    };
    LinkedHashSet.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.header.before = this.header.after = this.header;
    };
    /**
     * Java style iterator retrieves hash set values by insertion order.
     */
    LinkedHashSet.prototype.Iterator = function () {
        var iter = new LinkedIterator(this);
        return iter;
    };
    LinkedHashSet.prototype.getHeader = function () {
        return this.header;
    };
    return LinkedHashSet;
}(HashSet_1.HashSet));
exports.LinkedHashSet = LinkedHashSet;
/**
 * LinkedEntry entry class
 */
var LinkedEntry = /** @class */ (function () {
    function LinkedEntry(value) {
        this.value = value;
    }
    /**
     * Removes this entry from the linked list.
     */
    LinkedEntry.prototype.remove = function () {
        this.before.after = this.after;
        this.after.before = this.before;
    };
    LinkedEntry.prototype.getValue = function () {
        return this.value;
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
    LinkedEntry.prototype.equals = function (o) {
        if ((o === undefined) || (o === null)) {
            return false;
        }
        if (JSON.stringify(o) === JSON.stringify(this.value))
            return true;
        return false;
    };
    return LinkedEntry;
}());
exports.LinkedEntry = LinkedEntry;
/* Java style iterator */
var LinkedIterator = /** @class */ (function () {
    function LinkedIterator(linkedSet) {
        this.header = linkedSet.getHeader();
        this.next_Entry = linkedSet.getHeader().after;
        this.lastReturned = null;
    }
    LinkedIterator.prototype.next = function () {
        return this.nextEntry();
    };
    LinkedIterator.prototype._next = function () {
        return this.next().getValue();
    };
    LinkedIterator.prototype.hasNext = function () {
        return this.next_Entry !== this.header;
    };
    LinkedIterator.prototype.nextEntry = function () {
        if (this.check() === false)
            return null;
        var e = this.lastReturned = this.next_Entry;
        this.next_Entry = e.after;
        return e;
    };
    LinkedIterator.prototype.check = function () {
        if (this.next_Entry === this.header)
            return false;
        return true;
    };
    return LinkedIterator;
}());
exports.LinkedIterator = LinkedIterator;
