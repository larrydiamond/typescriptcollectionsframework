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
var Collections_1 = require("./Collections");
var SkipListMapImpl = (function () {
    function SkipListMapImpl(iComparator) {
        this.head = null;
        this.height = 10;
        this.mapComparator = null;
        this.mapCollectable = null;
        this.numberElements = 0;
        this.skipListNodeComparator = null;
        this.skipListNodeCollectable = null;
        this.mapComparator = iComparator;
        this.skipListNodeComparator = new SkipListNodeComparator(this.mapComparator);
        this.mapCollectable = Collections_1.Collections.collectableFromComparator(iComparator);
        this.skipListNodeCollectable = new SkipListNodeCollectable(this.mapCollectable);
        this.head = new ArrayList_1.ArrayList(this.skipListNodeCollectable);
        for (var loop = 0; loop < this.height; loop++) {
            this.head.add(null);
        }
    }
    SkipListMapImpl.prototype.getSkipListNodeComparator = function () { return this.skipListNodeComparator; };
    SkipListMapImpl.prototype.getSkipListNodeCollectable = function () { return this.skipListNodeCollectable; };
    SkipListMapImpl.prototype.validateDisplay = function () {
        console.log("Start::Size of SkipListMap = " + this.numberElements);
        var count = 0;
        var tmp = this.firstEntry();
        if ((tmp !== null) && (tmp !== undefined)) {
            console.log(JSON.stringify(tmp.getKey()));
            count++;
        }
        // each of the head elements needs to be at least as big as the prior element or null
        for (var loop = 1.0; loop < this.head.size() - 1.0; loop++) {
            var lower = this.head.get(Math.round(loop - 1.0));
            var higher = this.head.get(Math.round(loop));
            if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
                var cmp = this.mapComparator.compare(lower.getKey(), higher.getKey());
                if (cmp === 1) {
                    console.log("Head elements out of order");
                    return false;
                }
            }
        }
        while ((tmp !== null) && (tmp !== undefined)) {
            var next = this.nextHigherNode(tmp);
            if ((next !== null) && (next !== undefined)) {
                if ((tmp.getNextNodeArray() === null) || (tmp.getNextNodeArray() === undefined)) {
                    console.log("next node array null");
                    return false;
                }
                if ((tmp.getLastNodeArray() === null) || (tmp.getLastNodeArray() === undefined)) {
                    console.log("last node array null");
                    return false;
                }
                console.log(JSON.stringify(next.getKey()));
                count++;
                var prev = next.getLastNodeArray().get(Math.round(0));
                if (prev !== null) {
                    var cmp = this.mapComparator.compare(prev.getKey(), tmp.getKey());
                    if (cmp !== 0) {
                        console.log("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
                        return false;
                    }
                }
            }
            tmp = next;
        }
        console.log("End::Size of SkipListMap = " + this.numberElements + " found " + count);
        if (this.numberElements === count) {
            return true;
        }
        else {
            console.log("Inconsistent size of SkipListMap = " + this.numberElements + " found " + count);
            return false;
        }
    };
    SkipListMapImpl.prototype.validate = function () {
        var count = 0.0;
        var tmp = this.firstEntry();
        if ((tmp !== null) && (tmp !== undefined)) {
            count = 1.0;
        }
        // each of the head elements needs to be at least as big as the prior element or null
        for (var loop = 1.0; loop < this.head.size() - 1.0; loop++) {
            var lower = this.head.get(Math.round(loop - 1.0));
            var higher = this.head.get(Math.round(loop));
            if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
                var cmp = this.mapComparator.compare(lower.getKey(), higher.getKey());
                if (cmp === 1) {
                    console.log("Head elements out of order");
                    return false;
                }
            }
        }
        while ((tmp !== null) && (tmp !== undefined)) {
            var next = this.nextHigherNode(tmp);
            if ((next !== null) && (next !== undefined)) {
                if ((tmp.getNextNodeArray() === null) || (tmp.getNextNodeArray() === undefined)) {
                    console.log("next node array null");
                    return false;
                }
                if ((tmp.getLastNodeArray() === null) || (tmp.getLastNodeArray() === undefined)) {
                    console.log("last node array null");
                    return false;
                }
                var prev = next.getLastNodeArray().get(Math.round(0));
                if (prev !== null) {
                    var cmp = this.mapComparator.compare(prev.getKey(), tmp.getKey());
                    if (cmp !== 0) {
                        console.log("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
                        return false;
                    }
                }
                count = count + 1.0;
            }
            tmp = next;
        }
        if (this.numberElements === count) {
            return true;
        }
        else {
            console.log("Inconsistent size of SkipListMap = " + this.numberElements + " found " + count);
            return false;
        }
    };
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    SkipListMapImpl.prototype.remove = function (key) {
        var tmp = this.getEntry(key);
        if ((tmp === null) || (tmp === undefined)) {
            return null;
        }
        this.removeElement(tmp);
        return tmp.getValue();
    };
    /**
    * Removes this node from the Map
    * @param {MapEntry<K,V>} node node to remove
    */
    SkipListMapImpl.prototype.removeElement = function (node) {
        var size = node.getNextNodeArray().size();
        var lna = node.getLastNodeArray();
        var nna = node.getNextNodeArray();
        for (var loop = 0; loop < size; loop++) {
            var ln = lna.get(Math.round(loop));
            var nn = nna.get(Math.round(loop));
            if ((ln !== null) && (ln !== undefined)) {
                ln.getNextNodeArray().set(Math.round(loop), nn);
            }
            if ((nn !== null) && (nn !== undefined)) {
                nn.getNextNodeArray().set(Math.round(loop), ln);
            }
            if (this.head.get(Math.round(loop)) === node) {
                this.head.set(Math.round(loop), nn);
            }
        }
        return;
    };
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    SkipListMapImpl.prototype.clear = function () {
        this.numberElements = 0;
        this.head = new ArrayList_1.ArrayList(this.skipListNodeCollectable);
        for (var loop = 0; loop < this.height; loop++) {
            this.head.add(null);
        }
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
        return this.numberElements;
    };
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    SkipListMapImpl.prototype.isEmpty = function () {
        if (this.size() > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    SkipListMapImpl.prototype.put = function (key, value) {
        if (this.numberElements < 1) {
            //      console.log ("SkipListImpl::put empty insert " + JSON.stringify(key));
            var newnode = new SkipListNode(key, value, this.height, this.skipListNodeCollectable);
            for (var loop = 0.0; loop < this.height; loop++) {
                this.head.set(Math.round(loop), newnode);
            }
            this.numberElements = 1.0;
            return null;
        }
        else {
            var lastNode = this.floorEntry(key);
            if ((lastNode === null) || (lastNode === undefined)) {
                //        console.log ("SkipListImpl::put least element insert " + JSON.stringify(key));
                var nodeHeight = Math.floor(Math.random() * (this.height - 1) + 1); // Random number between 1 and this.height (both inclusive)
                if (nodeHeight < 1.0)
                    nodeHeight = 1.0;
                if (nodeHeight > this.height)
                    nodeHeight = this.height;
                //        console.log ("New node height = " + nodeHeight);
                var newnode = new SkipListNode(key, value, nodeHeight, this.skipListNodeCollectable);
                for (var loop = 0; loop < nodeHeight; loop++) {
                    var existingNode = this.head.get(Math.round(loop));
                    newnode.getNextNodeArray().set(Math.round(loop), existingNode);
                    if ((existingNode !== null) && (existingNode !== undefined)) {
                        existingNode.getLastNodeArray().set(Math.round(loop), newnode);
                    }
                    this.head.set(Math.round(loop), newnode);
                }
                this.numberElements = this.numberElements + 1.0;
                return null;
            }
            else {
                if (this.mapComparator.compare(key, lastNode.getKey()) === 0) {
                    var lastValue = lastNode.getValue();
                    lastNode.setValue(value);
                    return lastValue;
                }
                else {
                    var nodeHeight = Math.floor(Math.random() * (this.height - 1) + 1); // Random number between 1 and this.height (both inclusive)
                    if (nodeHeight < 1.0)
                        nodeHeight = 1.0;
                    if (nodeHeight > this.height)
                        nodeHeight = this.height;
                    //          console.log ("New node height = " + nodeHeight);
                    var newnode = new SkipListNode(key, value, nodeHeight, this.skipListNodeCollectable);
                    this.hookUpNodePointers(newnode, lastNode);
                    this.numberElements = this.numberElements + 1.0;
                    return null;
                }
            }
        }
    };
    SkipListMapImpl.prototype.hookUpNodePointers = function (newNode, immediatePreceedingNode) {
        var lastNode = immediatePreceedingNode;
        var nodeHeight = newNode.getNextNodeArray().size();
        for (var height = 0.0; height < newNode.getNextNodeArray().size() - 1.0; height++) {
            if ((lastNode !== null) && (lastNode !== undefined)) {
                if (lastNode.getNextNodeArray().size() > height) {
                    var nextNode = lastNode.getNextNodeArray().get(height);
                    lastNode.getNextNodeArray().set(Math.round(height), newNode);
                    newNode.getLastNodeArray().set(Math.round(height), lastNode);
                    if ((nextNode !== null) && (nextNode !== undefined)) {
                        newNode.getNextNodeArray().set(Math.round(height), nextNode);
                        nextNode.getLastNodeArray().set(Math.round(height), newNode);
                    }
                }
                else {
                    // find the new last node if it exists
                    console.log("Unwritten code");
                }
            }
            else {
                this.head.set(Math.round(height), newNode); // nothing before us so set the head to our node
            }
        }
    };
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {SkipListNode} an entry with the least key, or null if this map is empty
    */
    SkipListMapImpl.prototype.firstEntry = function () {
        if (this.numberElements < 1) {
            return null;
        }
        return this.head.get(Math.round(0));
    };
    /**
    * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
    */
    SkipListMapImpl.prototype.ceilingEntry = function (key) {
        if (this.numberElements < 1) {
            return null;
        }
        var node = this.floorEntry(key);
        if ((node === null) || (node === undefined)) {
            node = this.firstEntry();
            return node;
        }
        else {
            if (this.comparator().compare(node.getKey(), key) === 0) {
                return node;
            }
            else {
                return this.nextHigherNode(node); // the highest key less than or equal to this node is less than this node
            }
        }
    };
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    SkipListMapImpl.prototype.higherEntry = function (key) {
        if (this.numberElements < 1) {
            return null;
        }
        var node = this.floorEntry(key);
        if ((node === null) || (node === undefined)) {
            node = this.firstEntry();
            return node;
        }
        else {
            return this.nextHigherNode(node);
        }
    };
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    SkipListMapImpl.prototype.nextHigherNode = function (node) {
        if (this.numberElements < 1) {
            return null;
        }
        if ((node === null) || (node === undefined))
            return null;
        var ta = node.getNextNodeArray();
        if ((ta === null) || (ta === undefined))
            return null;
        var tmpn = ta.get(0);
        if ((tmpn === null) || (tmpn === undefined))
            return null;
        return tmpn;
    };
    /**
    * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
    */
    SkipListMapImpl.prototype.lowerEntry = function (key) {
        if (this.numberElements < 1) {
            return null;
        }
        // Get a first node, highest -1 entry
        var node = null;
        for (var loop = 0; ((loop < this.height) && (node === null)); loop++) {
            var tmp = this.head.get(Math.round((this.height - 1) - loop));
            if ((tmp !== null) && (tmp !== undefined)) {
                var cmp = this.mapComparator.compare(tmp.getKey(), key);
                if (cmp === -1) {
                    node = tmp;
                }
            }
        }
        if (node === null) {
            return null;
        }
        // keep moving forward until we every node in the next array is equal to or past the key
        var keepGoing = true;
        while (keepGoing === true) {
            if (node.getNextNodeArray().get(Math.round(0)) === null) {
                keepGoing = false;
            }
            else {
                if (node.getNextNodeArray().get(Math.round(0)) === undefined) {
                    keepGoing = false;
                }
                else {
                    var nextNode = null;
                    for (var loop = 0.0; ((nextNode === null) && (loop < node.getNextNodeArray().size())); loop++) {
                        var tmp = node.getNextNodeArray().get(Math.round(node.getNextNodeArray().size() - loop - 1));
                        if (tmp !== null) {
                            var cmp = this.mapComparator.compare(key, tmp.getKey());
                            if (cmp === -1) {
                                nextNode = tmp;
                            }
                        }
                    }
                    if (nextNode === null) {
                        keepGoing = false;
                    }
                    else {
                        node = nextNode;
                    }
                }
            }
        }
        return node;
    };
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    SkipListMapImpl.prototype.floorEntry = function (key) {
        if (this.numberElements < 1) {
            //      console.log ("SkipList::FloorEntry no nodes");
            return null;
        }
        // Get a first node, highest -1 entry
        var node = null;
        for (var loop = 0; ((loop < this.height) && (node === null)); loop++) {
            var tmp = this.head.get(Math.round((this.height - 1) - loop));
            if ((tmp !== null) && (tmp !== undefined)) {
                var cmp = this.mapComparator.compare(tmp.getKey(), key);
                //        console.log ("SkipList::FloorEntry compared " + key + " and " + tmp.getKey() + " returned " + cmp);
                if (cmp === 0) {
                    return tmp;
                }
                if (cmp === -1) {
                    node = tmp;
                }
            }
        }
        if (node === null) {
            //      console.log ("SkipList::FloorEntry all elements are higher");
            return null;
        }
        // keep moving forward until we every node in the next array is past the key
        var keepGoing = true;
        while (keepGoing === true) {
            if (node.getNextNodeArray().get(0) === null) {
                keepGoing = false;
            }
            else {
                if (node.getNextNodeArray().get(0) === undefined) {
                    keepGoing = false;
                }
                else {
                    var nextNode = null;
                    for (var loop = 0; ((nextNode === null) && (loop < node.getNextNodeArray().size())); loop++) {
                        var tmp = node.getNextNodeArray().get(node.getNextNodeArray().size() - loop - 1);
                        if (tmp !== null) {
                            var cmp = this.mapComparator.compare(key, tmp.getKey());
                            if (cmp === 0) {
                                return tmp;
                            }
                            if (cmp === -1) {
                                nextNode = tmp;
                            }
                        }
                    }
                    if (nextNode === null) {
                        keepGoing = false;
                    }
                    else {
                        node = nextNode;
                    }
                }
            }
        }
        //    console.log ("SkipList::FloorEntry returning " + node.getKey());
        return node;
    };
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    SkipListMapImpl.prototype.lastEntry = function () {
        if (this.numberElements < 1) {
            return null;
        }
        // Get a first node
        var node = null;
        for (var loop = 0; ((loop < this.height) && (node === null)); loop++) {
            node = this.head.get((this.height - 1) - loop);
        }
        if ((node === null) && (node === undefined)) {
            return null;
        }
        // get to the last node
        while (node.getNextNodeArray().get(Math.round(0)) !== null) {
            var foundNext = false;
            for (var loop = 0; ((foundNext === false) && (loop < node.getNextNodeArray().size())); loop++) {
                if (node.getNextNodeArray().get(node.getNextNodeArray().size() - loop - 1) !== null) {
                    foundNext = true;
                    node = node.getNextNodeArray().get(node.getNextNodeArray().size() - loop - 1);
                }
            }
        }
        return node;
    };
    /**
    * Returns a key-value mapping associated with the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the key, or null if there is no such key
    */
    SkipListMapImpl.prototype.getEntry = function (key) {
        //    console.log ("getEntry called on " + key);
        if (this.numberElements < 1) {
            //      console.log ("this.numberElements = " + this.numberElements);
            return null;
        }
        // Get a first node, highest -1 entry
        var node = null;
        for (var loop = 0; ((loop < this.height) && (node === null)); loop++) {
            var tmp = this.head.get((this.height - 1) - loop);
            if ((tmp !== null) && (tmp !== undefined)) {
                var cmp = this.mapComparator.compare(tmp.getKey(), key);
                //        console.log ("first compared " + key + " to " + tmp.getKey() + " " + cmp);
                if (cmp === 0) {
                    //          console.log ("found it on first");
                    return tmp;
                }
                if (cmp === -1) {
                    //          console.log ("Setting first");
                    node = tmp;
                }
            }
        }
        if (node === null) {
            //      console.log ("no node was found");
            return null;
        }
        // keep moving forward until we find the node or cant find any node less than it
        while (node.getNextNodeArray().get(Math.round(0)) !== null) {
            var cmp = this.mapComparator.compare(key, node.getKey());
            //      console.log ("while compared " + key + " to " + node.getKey() + " " + cmp);
            if (cmp === 0) {
                //        console.log ("found it in search");
                return node;
            }
            if (cmp === 1) {
                //        console.log ("Next Node is past");
                return null;
            }
            var nextNode = null;
            for (var loop = 0; ((nextNode === null) && (loop < node.getNextNodeArray().size())); loop++) {
                var tmp = node.getNextNodeArray().get(node.getNextNodeArray().size() - loop - 1);
                if (tmp !== null) {
                    //          console.log ("for compared " + key + " to " + tmp.getKey() + " " + cmp);
                    cmp = this.mapComparator.compare(key, tmp.getKey());
                    if (cmp === 0) {
                        return tmp;
                    }
                    if (cmp === -1) {
                        nextNode = tmp;
                    }
                }
            }
        }
        //    console.log ("returning null");
        return null;
    };
    return SkipListMapImpl;
}());
exports.SkipListMapImpl = SkipListMapImpl;
var SkipListNode = (function (_super) {
    __extends(SkipListNode, _super);
    function SkipListNode(key, value, height, iNodeCollectable) {
        var _this = _super.call(this, key, value) || this;
        _this.lastNodeArray = null;
        _this.nextNodeArray = null;
        _this.lastNodeArray = new ArrayList_1.ArrayList(iNodeCollectable);
        _this.nextNodeArray = new ArrayList_1.ArrayList(iNodeCollectable);
        for (var loop = 0.0; loop < height; loop++) {
            _this.nextNodeArray.add(null);
            _this.lastNodeArray.add(null);
        }
        return _this;
    }
    SkipListNode.prototype.setValue = function (iValue) {
        this.value = iValue;
    };
    SkipListNode.prototype.getLastNodeArray = function () {
        return this.lastNodeArray;
    };
    SkipListNode.prototype.getNextNodeArray = function () {
        return this.nextNodeArray;
    };
    return SkipListNode;
}(BasicMapEntry_1.BasicMapEntry));
exports.SkipListNode = SkipListNode;
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
var SkipListNodeComparator = (function () {
    function SkipListNodeComparator(iComp) {
        this.comp = null;
        this.comp = iComp;
    }
    SkipListNodeComparator.prototype.compare = function (o1, o2) {
        if (o1 === o2) {
            return 0;
        }
        if ((o1 === undefined) || (o1 === null)) {
            return -1;
        }
        if ((o2 === undefined) || (o2 === null)) {
            return 1;
        }
        return this.comp.compare(o1.getKey(), o2.getKey());
    };
    return SkipListNodeComparator;
}());
var SkipListMap = (function () {
    function SkipListMap(comp, iInitial) {
        if (iInitial === void 0) { iInitial = null; }
        this.impl = null;
        this.impl = new SkipListMapImpl(comp);
        if ((iInitial !== null) && (iInitial !== undefined)) {
            //      console.log ("skiplist::constructor initial has " + initialElements.size());
            for (var iter = iInitial.entrySet().iterator(); iter.hasNext();) {
                var t = iter.next();
                //        console.log ("skiplist::constructor adding " + t.getKey());
                this.impl.put(t.getKey(), t.getValue());
            }
        }
    }
    SkipListMap.prototype.validateMap = function () { return this.impl.validate(); };
    SkipListMap.prototype.validateMapDisplay = function () { return this.impl.validateDisplay(); };
    SkipListMap.prototype.getNextHigherKey = function (key) {
        var node = this.impl.getEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        var nn = this.impl.nextHigherNode(node);
        if ((nn === undefined) || (nn === null)) {
            return null;
        }
        return nn.getKey();
    };
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
        var node = this.impl.getEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getValue();
    };
    /**
    * Returns true if this map contains a mapping for the specified key.
    * @param {K} key The key whose presence in this map is to be tested
    * @return {V} true if this map contains a mapping for the specified key.
    */
    SkipListMap.prototype.containsKey = function (key) {
        var node = this.impl.getEntry(key);
        if ((node === undefined) || (node === null)) {
            return false;
        }
        return true;
    };
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    SkipListMap.prototype.isEmpty = function () {
        if (this.impl.size() > 0) {
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
        console.log("SkipList::keyset unwritten code");
        return undefined; // TODO
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
        return new ImmutableEntrySetForSkipListMapImpl(this.impl);
    };
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    SkipListMap.prototype.put = function (key, value) {
        return this.impl.put(key, value);
    };
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    SkipListMap.prototype.remove = function (key) {
        return this.impl.remove(key);
    };
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    SkipListMap.prototype.clear = function () {
        this.impl.clear();
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
        var firstNode = this.impl.firstEntry();
        if ((firstNode === undefined) || (firstNode === null)) {
            return null;
        }
        return firstNode.getKey();
    };
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the least key, or null if this map is empty
    */
    SkipListMap.prototype.firstEntry = function () {
        var firstNode = this.impl.firstEntry();
        if ((firstNode === undefined) || (firstNode === null)) {
            return null;
        }
        return firstNode;
    };
    /**
    * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.ceilingEntry = function (key) {
        var node = this.impl.ceilingEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node;
    };
    /**
    * Returns the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.ceilingKey = function (key) {
        var node = this.impl.ceilingEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    SkipListMap.prototype.higherKey = function (key) {
        var node = this.impl.higherEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    SkipListMap.prototype.higherEntry = function (key) {
        var node = this.impl.higherEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node;
    };
    /**
    * Returns the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the highest key lower than key, or null if there is no such key
    */
    SkipListMap.prototype.lowerKey = function (key) {
        var node = this.impl.lowerEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
    */
    SkipListMap.prototype.lowerEntry = function (key) {
        var node = this.impl.lowerEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node;
    };
    /**
    * Returns the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the greatest key less than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.floorKey = function (key) {
        var node = this.impl.floorEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    SkipListMap.prototype.floorEntry = function (key) {
        var node = this.impl.floorEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node;
    };
    /**
    * Returns the last (highest) key currently in this map.
    * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
    */
    SkipListMap.prototype.lastKey = function () {
        var node = this.impl.lastEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    SkipListMap.prototype.lastEntry = function () {
        var node = this.impl.lastEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node;
    };
    return SkipListMap;
}());
exports.SkipListMap = SkipListMap;
var ImmutableEntrySetForSkipListMapImpl = (function () {
    function ImmutableEntrySetForSkipListMapImpl(iMap) {
        this.map = iMap;
    }
    ImmutableEntrySetForSkipListMapImpl.prototype.size = function () { return this.map.size(); };
    ImmutableEntrySetForSkipListMapImpl.prototype.isEmpty = function () { return this.map.isEmpty(); };
    ImmutableEntrySetForSkipListMapImpl.prototype.contains = function (item) {
        if (item === null)
            return false;
        if (item === undefined)
            return false;
        var node = this.map.getEntry(item.getKey());
        if ((node === undefined) || (node === null)) {
            return false;
        }
        return true;
    };
    ImmutableEntrySetForSkipListMapImpl.prototype.iterator = function () { return new SkipListMapEntrySetJIterator(this.map); };
    ImmutableEntrySetForSkipListMapImpl.prototype[Symbol.iterator] = function () { return new SkipListMapEntrySetIterator(this.map); };
    return ImmutableEntrySetForSkipListMapImpl;
}());
exports.ImmutableEntrySetForSkipListMapImpl = ImmutableEntrySetForSkipListMapImpl;
/* Java style iterator */
var SkipListMapEntrySetJIterator = (function () {
    function SkipListMapEntrySetJIterator(iMap) {
        this.map = iMap;
    }
    SkipListMapEntrySetJIterator.prototype.hasNext = function () {
        //    console.log ("SkipListMapEntrySetJIterator::hasNext");
        if (this.location === undefined) {
            var firstEntry = this.map.firstEntry();
            if (firstEntry === null)
                return false;
            if (firstEntry === undefined)
                return false;
            return true;
        }
        else {
            var tmpEntry = this.map.nextHigherNode(this.location);
            if (tmpEntry === null)
                return false;
            if (tmpEntry === undefined)
                return false;
            return true;
        }
    };
    SkipListMapEntrySetJIterator.prototype.next = function () {
        //    console.log ("SkipListMapEntrySetJIterator::next");
        if (this.location === undefined) {
            var firstEntry = this.map.firstEntry();
            if (firstEntry === null)
                return null;
            if (firstEntry === undefined)
                return null;
            this.location = firstEntry;
            return firstEntry;
        }
        else {
            var tmpEntry = this.map.nextHigherNode(this.location);
            if (tmpEntry === null)
                return null;
            if (tmpEntry === undefined)
                return null;
            this.location = tmpEntry;
            return tmpEntry;
        }
    };
    return SkipListMapEntrySetJIterator;
}());
exports.SkipListMapEntrySetJIterator = SkipListMapEntrySetJIterator;
/* TypeScript iterator */
var SkipListMapEntrySetIterator = (function () {
    function SkipListMapEntrySetIterator(iMap) {
        this.map = iMap;
        this.location = this.map.firstEntry();
    }
    // tslint:disable-next-line:no-any
    SkipListMapEntrySetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location);
        this.location = this.map.nextHigherNode(this.location);
        return tmp;
    };
    return SkipListMapEntrySetIterator;
}());
exports.SkipListMapEntrySetIterator = SkipListMapEntrySetIterator;
var SkipListSet = (function () {
    function SkipListSet(iComparator, initialElements) {
        this.initialElements = initialElements;
        this.impl = null;
        this.impl = new SkipListMapImpl(iComparator);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var key = iter.next();
                this.impl.put(key, 1);
            }
        }
    }
    SkipListSet.prototype.validateSet = function () { return this.impl.validate(); };
    SkipListSet.prototype.validateSetDisplay = function () { return this.impl.validateDisplay(); };
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    SkipListSet.prototype.add = function (element) {
        var tmp = this.impl.put(element, 1);
        if (tmp === 1) {
            return false;
        }
        return true;
    };
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    SkipListSet.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    SkipListSet.prototype.isEmpty = function () {
        if (this.impl.size() > 0) {
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
    SkipListSet.prototype.contains = function (key) {
        var node = this.impl.getEntry(key);
        if ((node === undefined) || (node === null)) {
            return false;
        }
        return true;
    };
    /**
    * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
    * @param {K} item to find floor node for
    * @return {K} the greatest element less than or equal to e, or null if there is no such element
    */
    SkipListSet.prototype.floor = function (key) {
        var node = this.impl.floorEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
    * @param {K} item to find ceiling node for
    * @return {K} the least element greater than or equal to item, or null if there is no such element
    */
    SkipListSet.prototype.ceiling = function (key) {
        var node = this.impl.ceilingEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    SkipListSet.prototype.first = function () {
        var node = this.impl.firstEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns the last (highest) element currently in this set.
    * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
    */
    SkipListSet.prototype.last = function () {
        var node = this.impl.lastEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Removes the specified element from this set if it is present.
    * @param {K} element element to be removed from this set
    * @return {boolean} true if the set contained the specified element
    */
    SkipListSet.prototype.remove = function (element) {
        var tmp = this.impl.remove(element);
        if ((tmp === undefined) || (tmp === null)) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    SkipListSet.prototype.clear = function () {
        this.impl.clear();
    };
    /**
    * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
    * @return {K} the first (lowest) element, or null if this set is empty
    */
    SkipListSet.prototype.pollFirst = function () {
        var node = this.impl.firstEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        else {
            var tmp = node.getKey();
            this.impl.removeElement(node);
            return tmp;
        }
    };
    /**
    * Retrieves and removes the last (highest) element, or returns null if this set is empty.
    * @return {K} the last (highest) element, or null if this set is empty
    */
    SkipListSet.prototype.pollLast = function () {
        var node = this.impl.lastEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        else {
            var tmp = node.getKey();
            this.impl.removeElement(node);
            return tmp;
        }
    };
    /**
    * Needed For Iterator
    * @param {K} key the given key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    SkipListSet.prototype.getNextHigherKey = function (key) {
        var node = this.impl.higherEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    SkipListSet.prototype.iterator = function () {
        console.log("SkipList::jiterator unwritten code");
        return undefined; // TODO
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    SkipListSet.prototype[Symbol.iterator] = function () {
        console.log("SkipList::iterator unwritten code");
        return undefined; // TODO
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    SkipListSet.prototype.immutableCollection = function () {
        return this;
    };
    /**
    * Returns an ImmutableSet backed by this Set
    */
    SkipListSet.prototype.immutableSet = function () {
        return this;
    };
    return SkipListSet;
}());
exports.SkipListSet = SkipListSet;
