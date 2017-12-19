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
        this.height = 3;
        this.mapComparator = null;
        this.mapCollectable = null;
        this.numberElements = 0.0;
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
    /*
    
      public validateDisplay () : boolean {
        console.log ("SkipListMapImpl::ValidateDisplay - Size of SkipListMap = " + this.numberElements);
        let count : number = 0;
        let tmp : SkipListNode<K,V> = this.firstEntry();
        while ((tmp !== null) && (tmp !== undefined)) {
          console.log ("NodeList " + JSON.stringify(tmp.getKey()) + " - " + JSON.stringify(tmp.getValue()));
          tmp = tmp.getNextNodeArray().get (0);
          count++;
        }
    
        for (let loop:number = 0.0; loop < this.head.size(); loop++) {
          const hn : SkipListNode<K,V> = this.head.get(loop);
          if ((hn !== null) && (hn !== undefined)) {
            console.log ("Head" + loop + " " + JSON.stringify(hn.getKey()) + " - " + JSON.stringify(hn.getValue()));
          }
        }
    
        tmp = this.firstEntry();
        while ((tmp !== null) && (tmp !== undefined)) {
          console.log ("Node " + JSON.stringify(tmp.getKey()) + " - " + JSON.stringify(tmp.getValue()) + " " + tmp.getLastNodeArray().size() + " " + tmp.getNextNodeArray().size());
          for (let loop:number = 0.0; loop < this.head.size(); loop++) {
            const ln : SkipListNode<K,V> = tmp.getLastNodeArray().get(loop);
            if ((ln !== null) && (ln !== undefined)) {
              console.log ("Last" + loop + " " + JSON.stringify(ln.getKey()) + " - " + JSON.stringify(ln.getValue()));
            }
          }
          for (let loop:number = 0.0; loop < this.head.size(); loop++) {
            const nn : SkipListNode<K,V> = tmp.getNextNodeArray().get(loop);
            if ((nn !== null) && (nn !== undefined)) {
              console.log ("Next" + loop + " " + JSON.stringify(nn.getKey()) + " - " + JSON.stringify(nn.getValue()));
            }
          }
          tmp = tmp.getNextNodeArray().get (0);
        }
    
    
        // each of the head elements needs to be at least as big as the prior element or null
        for (let loop:number = 1.0; loop < this.head.size() - 1.0; loop++) {
          const lower : SkipListNode<K,V> = this.head.get (Math.round (loop - 1.0));
          const higher : SkipListNode<K,V> = this.head.get (loop);
          if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
            const cmp:number = this.mapComparator.compare(lower.getKey(), higher.getKey());
            if (cmp === 1) {
              console.log ("Head elements out of order");
              return false;
            }
          }
        }
        while ((tmp !== null) && (tmp !== undefined)) {
          const next : SkipListNode<K,V> = this.nextHigherNode(tmp);
          if ((next !== null) && (next !== undefined)) {
            if ((tmp.getNextNodeArray() === null) || (tmp.getNextNodeArray() === undefined)) {
              console.log ("next node array null");
              return false;
            }
            if ((tmp.getLastNodeArray() === null) || (tmp.getLastNodeArray() === undefined)) {
              console.log ("last node array null");
              return false;
            }
            console.log (JSON.stringify(next.getKey()) + " - " + JSON.stringify(next.getValue()));
            count++;
            const prev : SkipListNode<K,V> = next.getLastNodeArray().get (0);
            if (prev !== null) {
              const cmp:number = this.mapComparator.compare(prev.getKey(), tmp.getKey());
              if (cmp !== 0) {
                console.log ("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
                return false;
              }
            }
          }
          tmp = next;
        }
        console.log ("End::Size of SkipListMap = " + this.numberElements + " found " + count);
        if (this.numberElements === count) {
          return true;
        } else {
          console.log ("Inconsistent size of display SkipListMap = " + this.numberElements + " found " + count);
          return false;
        }
      }
    
    */
    SkipListMapImpl.prototype.validate = function () {
        var count = 0.0;
        var tmp = this.firstEntry();
        if ((tmp !== null) && (tmp !== undefined)) {
            count = 1.0;
        }
        // each of the head elements needs to be at least as big as the prior element or null
        for (var loop = 1.0; loop < this.head.size() - 1.0; loop++) {
            var lower = this.head.get(Math.round(loop - 1.0));
            var higher = this.head.get(loop);
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
                var prev = next.getLastNodeArray().get(0);
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
            var ln = lna.get(loop);
            var nn = nna.get(loop);
            if ((ln !== null) && (ln !== undefined)) {
                ln.getNextNodeArray().set(loop, nn);
            }
            if ((nn !== null) && (nn !== undefined)) {
                nn.getLastNodeArray().set(loop, ln);
            }
            if (this.head.get(loop) === node) {
                this.head.set(loop, nn);
            }
        }
        this.numberElements--;
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
    SkipListMapImpl.prototype.newNodeSize = function () {
        for (var loop = 0.0; loop < this.height; loop++) {
            if ((this.head.get(loop) === null) || (this.head.get(loop) === undefined)) {
                return loop + 1;
            }
        }
        return Math.round(Math.floor(Math.random() * (this.height - 1) + 1)); // Random number between 1 and this.height (both inclusive)
    };
    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    SkipListMapImpl.prototype.put = function (key, value) {
        if (Math.round(this.numberElements) < 1.0) {
            this.numberElements = 1.0;
            var newnode = new SkipListNode(key, value, 1.0, this.skipListNodeCollectable);
            this.head.set(0, newnode);
            return null;
        }
        else {
            var lastNode = this.floorEntry(key);
            if ((lastNode === null) || (lastNode === undefined)) {
                var newnode = new SkipListNode(key, value, this.newNodeSize(), this.skipListNodeCollectable);
                for (var loop = 0; loop < newnode.getNextNodeArray().size(); loop++) {
                    var existingNode = this.head.get(loop);
                    newnode.getNextNodeArray().set(loop, existingNode);
                    if ((existingNode !== null) && (existingNode !== undefined)) {
                        existingNode.getLastNodeArray().set(loop, newnode);
                    }
                    this.head.set(loop, newnode);
                }
                this.numberElements++;
                return null;
            }
            else {
                if (this.mapComparator.compare(key, lastNode.getKey()) === 0) {
                    var lastValue = lastNode.getValue();
                    lastNode.setValue(value);
                    return lastValue;
                }
                else {
                    this.numberElements++;
                    var newnode = new SkipListNode(key, value, this.newNodeSize(), this.skipListNodeCollectable);
                    this.hookUpNodePointers(newnode, lastNode);
                    return null;
                }
            }
        }
    };
    SkipListMapImpl.prototype.hookUpNodePointers = function (newNode, immediatePreceedingNode) {
        //    console.log ("Immediate Preceeding = " + JSON.stringify (immediatePreceedingNode.getKey()));
        //    console.log ("newNode = " + JSON.stringify (newNode.getKey()));
        var lastNode = immediatePreceedingNode;
        var nodeHeight = newNode.getNextNodeArray().size();
        for (var height = 0.0; height < newNode.getNextNodeArray().size(); height++) {
            var done = false;
            while (done === false) {
                if ((lastNode === null) || (lastNode === undefined)) {
                    done = true;
                }
                else {
                    if (lastNode.getNextNodeArray().size() > height) {
                        var nextNode = lastNode.getNextNodeArray().get(height);
                        lastNode.getNextNodeArray().set(height, newNode);
                        newNode.getLastNodeArray().set(height, lastNode);
                        if ((nextNode !== null) && (nextNode !== undefined)) {
                            newNode.getNextNodeArray().set(height, nextNode);
                            nextNode.getLastNodeArray().set(height, newNode);
                        }
                        done = true;
                    }
                    else {
                        // find the new last node if it exists
                        lastNode = lastNode.getLastNodeArray().get(lastNode.getLastNodeArray().size() - 1);
                    }
                }
            }
            if ((this.head.get(height) === null) || (this.head.get(height) === undefined)) {
                //        console.log ("Setting null head " + height + " to " + JSON.stringify (newNode.getKey()));
                this.head.set(height, newNode);
            }
            else {
                if (this.mapComparator.compare(this.head.get(height).getKey(), newNode.getKey()) > 0) {
                    //          console.log ("replacing head " + height + " from " + JSON.stringify (this.head.get (height).getKey()) + " to " + JSON.stringify (newNode.getKey()));
                    var tmp = this.head.get(height);
                    this.head.set(height, newNode);
                    newNode.getNextNodeArray().set(height, tmp);
                }
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
        return this.head.get(0);
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
        if ((node === null) || (node === undefined)) {
            //      console.log ("NextHigherNode returning null since this node is bogus");
            return null;
        }
        var ta = node.getNextNodeArray();
        if ((ta === null) || (ta === undefined)) {
            //      console.log ("NextHigherNode returning null since nextnodearray is bogus");
            return null;
        }
        var tmpn = ta.get(0);
        if ((tmpn === null) || (tmpn === undefined)) {
            //      console.log ("NextHigherNode returning null since element 0 is bogus");
            return null;
        }
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
        // Get a first node, highest entry below the target entry
        var node = null;
        for (var loop = 0; ((loop < this.height) && (node === null)); loop++) {
            var tmp = this.head.get((this.height - 1) - loop);
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
        while (true) {
            // Check next node 0.
            // If that key is equal to or greater than (or null or undefined) the target value then this is the highest node below the target
            // If it's under, then loop from the top on down until you find a node below target and restart the while loop
            var tmp = node.getNextNodeArray().get(0);
            if ((tmp === null) || (tmp === undefined)) {
                return node;
            }
            var cmp = this.mapComparator.compare(tmp.getKey(), key);
            if ((cmp === 1) || (cmp === 0)) {
                return node;
            }
            var done = false;
            for (var height = 0.0; ((done === false) && (height < node.getNextNodeArray().size())); height++) {
                var nn = node.getNextNodeArray().get(node.getNextNodeArray().size() - height - 1);
                if ((nn === null) || (nn === undefined)) {
                    ;
                }
                else {
                    var cmpnn = this.mapComparator.compare(nn.getKey(), key);
                    if (cmpnn === -1) {
                        node = nn;
                        done = true;
                    }
                }
            }
        }
    };
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    SkipListMapImpl.prototype.floorEntry = function (key) {
        //    console.log ("SkipList::FloorEntry looking for " + key);
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
            var nextNode = null;
            // Are all next nodes after key or null/undefined?
            var foundEarlierKey = false;
            for (var loop = 0; ((loop < node.getNextNodeArray().size()) && (foundEarlierKey === false)); loop++) {
                foundEarlierKey = false;
                var test = node.getNextNodeArray().get(node.getNextNodeArray().size() - loop - 1);
                if ((test === null) || (test === undefined)) {
                    ; // nothing to do
                }
                else {
                    var cmp = this.mapComparator.compare(key, test.getKey());
                    if (cmp === 0) {
                        return test;
                    }
                    if (cmp === 1) {
                        foundEarlierKey = true;
                        //            console.log ("SkipList::FloorEntry foundEarlierKey " + key + " " + test.getKey());
                        nextNode = test;
                    }
                }
            }
            if (foundEarlierKey === false) {
                return node;
            }
            else {
                node = nextNode;
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
        while (node.getNextNodeArray().get(0) !== null) {
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
        if (this.numberElements < 1) {
            return null;
        }
        // Get a first node, highest entry below the target entry
        var node = null;
        for (var loop = 0; ((loop < this.height) && (node === null)); loop++) {
            var tmp = this.head.get((this.height - 1) - loop);
            if ((tmp !== null) && (tmp !== undefined)) {
                var cmp = this.mapComparator.compare(tmp.getKey(), key);
                if (cmp === 0) {
                    //          console.log ("Match on head " + tmp.getKey() + " " + key);
                    return tmp;
                }
                if (cmp === -1) {
                    node = tmp;
                }
            }
        }
        if (node === null) {
            return null;
        }
        // keep moving forward until we every node in the next array is equal to or past the key
        while (true) {
            // Check next node 0.
            // If that key is equal to or greater than (or null or undefined) the target value then this is the highest node below the target
            // If it's under, then loop from the top on down until you find a node below target and restart the while loop
            var tmp = node.getNextNodeArray().get(0);
            if ((tmp === null) || (tmp === undefined)) {
                return null;
            }
            var cmp = this.mapComparator.compare(tmp.getKey(), key);
            if (cmp === 0) {
                return tmp;
            }
            if (cmp === 1) {
                return null;
            }
            var done = false;
            for (var height = 0.0; ((done === false) && (height < node.getNextNodeArray().size())); height++) {
                var nn = node.getNextNodeArray().get(node.getNextNodeArray().size() - height - 1);
                if ((nn === null) || (nn === undefined)) {
                    ;
                }
                else {
                    var cmpnn = this.mapComparator.compare(nn.getKey(), key);
                    if (cmpnn === 0) {
                        return nn;
                    }
                    if (cmpnn === -1) {
                        node = nn;
                        done = true;
                    }
                }
            }
        }
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
        //    console.log ("Adding node of size " + height);
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
/**
 * A scalable NavigableMap implementation.
 *
 * The map is sorted according to a Comparator provided at map creation time.<br>
 * This class implements a SkipList providing expected average log(n) time cost for the containsKey, get, put and remove operations and their variants.
 */
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
    //  public validateMapDisplay () : boolean { return this.impl.validateDisplay(); }
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
        return new ImmutableKeySetForSkipListMap(this.impl);
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
var ImmutableKeySetForSkipListMap = (function () {
    function ImmutableKeySetForSkipListMap(iSkipListMapImpl) {
        this.impl = iSkipListMapImpl;
    }
    ImmutableKeySetForSkipListMap.prototype.size = function () { return this.size(); };
    ImmutableKeySetForSkipListMap.prototype.isEmpty = function () { return this.isEmpty(); };
    ImmutableKeySetForSkipListMap.prototype.contains = function (item) { return this.contains(item); };
    ImmutableKeySetForSkipListMap.prototype.iterator = function () { return new SkipListMapKeySetJIterator(this.impl); };
    ImmutableKeySetForSkipListMap.prototype[Symbol.iterator] = function () { return new SkipListMapKeySetIterator(this.impl); };
    return ImmutableKeySetForSkipListMap;
}());
exports.ImmutableKeySetForSkipListMap = ImmutableKeySetForSkipListMap;
/* Java style iterator */
var SkipListMapKeySetJIterator = (function () {
    function SkipListMapKeySetJIterator(implI) {
        this.impl = implI;
    }
    SkipListMapKeySetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var firstEntry = this.impl.firstEntry();
            if (firstEntry === null)
                return false;
            if (firstEntry === undefined)
                return false;
            return true;
        }
        else {
            var tmpEntry = this.impl.nextHigherNode(this.location);
            if (tmpEntry === null)
                return false;
            if (tmpEntry === undefined)
                return false;
            return true;
        }
    };
    SkipListMapKeySetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var firstEntry = this.impl.firstEntry();
            if (firstEntry === null)
                return null;
            if (firstEntry === undefined)
                return null;
            this.location = firstEntry;
            return firstEntry.getKey();
        }
        else {
            var tmpEntry = this.impl.nextHigherNode(this.location);
            if (tmpEntry === null)
                return null;
            if (tmpEntry === undefined)
                return null;
            this.location = tmpEntry;
            return tmpEntry.getKey();
        }
    };
    return SkipListMapKeySetJIterator;
}());
exports.SkipListMapKeySetJIterator = SkipListMapKeySetJIterator;
/* TypeScript iterator */
var SkipListMapKeySetIterator = (function () {
    function SkipListMapKeySetIterator(implI) {
        this.impl = implI;
        this.location = this.impl.firstEntry();
    }
    // tslint:disable-next-line:no-any
    SkipListMapKeySetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.getKey());
        this.location = this.impl.nextHigherNode(this.location);
        return tmp;
    };
    return SkipListMapKeySetIterator;
}());
exports.SkipListMapKeySetIterator = SkipListMapKeySetIterator;
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
/**
 * A scalable NavigableSet implementation based on a SkipListMap.
 *
 * The elements of the set are kept sorted according to a Comparator provided at set creation time.<br>
 * This implementation provides expected average log(n) time cost for the contains, add, and remove operations and their variants.
 */
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
    //  public validateSetDisplay () : boolean { return this.impl.validateDisplay(); }
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
        return new SkipListSetJIterator(this.impl);
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    SkipListSet.prototype[Symbol.iterator] = function () {
        return new SkipListSetIterator(this.impl);
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
/* Java style iterator */
var SkipListSetJIterator = (function () {
    function SkipListSetJIterator(implI) {
        this.impl = implI;
    }
    SkipListSetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var first = this.impl.firstEntry();
            if (first === undefined) {
                return false;
            }
            if (first === null) {
                return false;
            }
            return true;
        }
        else {
            var tmp = this.impl.nextHigherNode(this.location);
            if (tmp === null) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    SkipListSetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var first = this.impl.firstEntry();
            if (first === undefined) {
                return null;
            }
            if (first === null) {
                return null;
            }
            this.location = first;
            return first.getKey();
        }
        else {
            var tmp = this.impl.nextHigherNode(this.location);
            if (tmp === null) {
                return null;
            }
            else {
                this.location = tmp;
                return tmp.getKey();
            }
        }
    };
    return SkipListSetJIterator;
}());
exports.SkipListSetJIterator = SkipListSetJIterator;
/* TypeScript iterator */
var SkipListSetIterator = (function () {
    function SkipListSetIterator(implI) {
        this.impl = implI;
        this.location = this.impl.firstEntry();
    }
    // tslint:disable-next-line:no-any
    SkipListSetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.getKey());
        this.location = this.impl.nextHigherNode(this.location);
        return tmp;
    };
    return SkipListSetIterator;
}());
exports.SkipListSetIterator = SkipListSetIterator;
