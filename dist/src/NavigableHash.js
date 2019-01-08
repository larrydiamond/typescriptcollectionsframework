"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var NavigableHashImpl = /** @class */ (function () {
    function NavigableHashImpl(iComparator, initialElements, iInitialCapacity, iLoadFactor) {
        if (initialElements === void 0) { initialElements = null; }
        if (iInitialCapacity === void 0) { iInitialCapacity = 20; }
        if (iLoadFactor === void 0) { iLoadFactor = 0.75; }
        this.initialElements = initialElements;
        this.iInitialCapacity = iInitialCapacity;
        this.iLoadFactor = iLoadFactor;
        this.head = null;
        this.height = 3;
        this.mapComparator = null;
        this.mapCollectable = null;
        this.numberElements = 0.0;
        this.NavigableHashNodeComparator = null;
        this.NavigableHashNodeCollectable = null;
        this.hashData = null;
        this.mapComparator = iComparator;
        this.NavigableHashNodeComparator = new NavigableHashNodeComparator(this.mapComparator);
        this.mapCollectable = Collections_1.Collections.collectableFromComparator(iComparator);
        this.NavigableHashNodeCollectable = new NavigableHashNodeCollectable(this.mapCollectable);
        this.head = new ArrayList_1.ArrayList(this.NavigableHashNodeCollectable);
        for (var loop = 0; loop < this.height; loop++) {
            this.head.add(null);
        }
    }
    NavigableHashImpl.prototype.getNavigableHashNodeComparator = function () { return this.NavigableHashNodeComparator; };
    NavigableHashImpl.prototype.getNavigableHashNodeCollectable = function () { return this.NavigableHashNodeCollectable; };
    /*
    
      public validateDisplay () : boolean {
        console.log ("NavigableHashImpl::ValidateDisplay - Size of NavigableHashMap = " + this.numberElements);
        let count : number = 0;
        let tmp : NavigableHashNode<K,V> = this.firstEntry();
        while ((tmp !== null) && (tmp !== undefined)) {
          console.log ("NodeList " + JSON.stringify(tmp.getKey()) + " - " + JSON.stringify(tmp.getValue()));
          tmp = tmp.getNextNodeArray().get (0);
          count++;
        }
    
        for (let loop:number = 0.0; loop < this.head.size(); loop++) {
          const hn : NavigableHashNode<K,V> = this.head.get(loop);
          if ((hn !== null) && (hn !== undefined)) {
            console.log ("Head" + loop + " " + JSON.stringify(hn.getKey()) + " - " + JSON.stringify(hn.getValue()));
          }
        }
    
        tmp = this.firstEntry();
        while ((tmp !== null) && (tmp !== undefined)) {
          console.log ("Node " + JSON.stringify(tmp.getKey()) + " - " + JSON.stringify(tmp.getValue()) + " " + tmp.getLastNodeArray().size() + " " + tmp.getNextNodeArray().size());
          for (let loop:number = 0.0; loop < this.head.size(); loop++) {
            const ln : NavigableHashNode<K,V> = tmp.getLastNodeArray().get(loop);
            if ((ln !== null) && (ln !== undefined)) {
              console.log ("Last" + loop + " " + JSON.stringify(ln.getKey()) + " - " + JSON.stringify(ln.getValue()));
            }
          }
          for (let loop:number = 0.0; loop < this.head.size(); loop++) {
            const nn : NavigableHashNode<K,V> = tmp.getNextNodeArray().get(loop);
            if ((nn !== null) && (nn !== undefined)) {
              console.log ("Next" + loop + " " + JSON.stringify(nn.getKey()) + " - " + JSON.stringify(nn.getValue()));
            }
          }
          tmp = tmp.getNextNodeArray().get (0);
        }
    
    
        // each of the head elements needs to be at least as big as the prior element or null
        for (let loop:number = 1.0; loop < this.head.size() - 1.0; loop++) {
          const lower : NavigableHashNode<K,V> = this.head.get (Math.round (loop - 1.0));
          const higher : NavigableHashNode<K,V> = this.head.get (loop);
          if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
            const cmp:number = this.mapComparator.compare(lower.getKey(), higher.getKey());
            if (cmp === 1) {
              console.log ("Head elements out of order");
              return false;
            }
          }
        }
        while ((tmp !== null) && (tmp !== undefined)) {
          const next : NavigableHashNode<K,V> = this.nextHigherNode(tmp);
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
            const prev : NavigableHashNode<K,V> = next.getLastNodeArray().get (0);
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
        console.log ("End::Size of NavigableHashMap = " + this.numberElements + " found " + count);
        if (this.numberElements === count) {
          return true;
        } else {
          console.log ("Inconsistent size of display NavigableHashMap = " + this.numberElements + " found " + count);
          return false;
        }
      }
    
    */
    /*
      public validate () : boolean {
        let count : number = 0.0;
    
        let tmp : NavigableHashNode<K,V> = this.firstEntry();
        if ((tmp !== null) && (tmp !== undefined)) {
          count = 1.0;
        }
        // each of the head elements needs to be at least as big as the prior element or null
        for (let loop:number = 1.0; loop < this.head.size() - 1.0; loop++) {
          const lower : NavigableHashNode<K,V> = this.head.get (Math.round (loop - 1.0));
          const higher : NavigableHashNode<K,V> = this.head.get (loop);
          if ((lower !== null) && (lower !== undefined) && (higher !== null) && (higher !== undefined)) {
            const cmp:number = this.mapComparator.compare(lower.getKey(), higher.getKey());
            if (cmp === 1) {
              console.log ("Head elements out of order");
              return false;
            }
          }
        }
    
        while ((tmp !== null) && (tmp !== undefined)) {
          const next : NavigableHashNode<K,V> = this.nextHigherNode(tmp);
          if ((next !== null) && (next !== undefined)) {
            if ((tmp.getNextNodeArray() === null) || (tmp.getNextNodeArray() === undefined)) {
              console.log ("next node array null");
              return false;
            }
            if ((tmp.getLastNodeArray() === null) || (tmp.getLastNodeArray() === undefined)) {
              console.log ("last node array null");
              return false;
            }
            const prev : NavigableHashNode<K,V> = next.getLastNodeArray().get (0);
            if (prev !== null) {
              const cmp:number = this.mapComparator.compare(prev.getKey(), tmp.getKey());
              if (cmp !== 0) {
                console.log ("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
                return false;
              }
            }
            count = count + 1.0;
          }
          tmp = next;
        }
        if (this.numberElements === count) {
          return true;
        } else {
          console.log ("Inconsistent size of NavigableHashMap = " + this.numberElements + " found " + count);
          return false;
        }
      }
    */
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    NavigableHashImpl.prototype.remove = function (key) {
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
    NavigableHashImpl.prototype.removeElement = function (node) {
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
    NavigableHashImpl.prototype.clear = function () {
        this.numberElements = 0;
        this.head = new ArrayList_1.ArrayList(this.NavigableHashNodeCollectable);
        for (var loop = 0; loop < this.height; loop++) {
            this.head.add(null);
        }
    };
    /**
    * Returns the comparator used to order the keys in this map
    * @return {Comparator} the comparator used to order the keys in this map
    */
    NavigableHashImpl.prototype.comparator = function () {
        return this.mapComparator;
    };
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    NavigableHashImpl.prototype.size = function () {
        return this.numberElements;
    };
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    NavigableHashImpl.prototype.isEmpty = function () {
        if (this.size() > 0) {
            return false;
        }
        else {
            return true;
        }
    };
    NavigableHashImpl.prototype.newNodeSize = function () {
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
     * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
     */
    NavigableHashImpl.prototype.put = function (key, value) {
        if (Math.round(this.numberElements) < 1.0) {
            this.numberElements = 1.0;
            var newnode = new NavigableHashNode(key, value, 1.0, this.NavigableHashNodeCollectable);
            this.head.set(0, newnode);
            return undefined;
        }
        else {
            var lastNode = this.floorEntry(key);
            if ((lastNode === null) || (lastNode === undefined)) { // there's no node less than or equal to this node, make a new node and it's going to be the first node
                var newnode = new NavigableHashNode(key, value, this.newNodeSize(), this.NavigableHashNodeCollectable);
                for (var loop = 0; loop < newnode.getNextNodeArray().size(); loop++) {
                    var existingNode = this.head.get(loop);
                    newnode.getNextNodeArray().set(loop, existingNode);
                    if ((existingNode !== null) && (existingNode !== undefined)) {
                        existingNode.getLastNodeArray().set(loop, newnode);
                    }
                    this.head.set(loop, newnode);
                }
                this.numberElements++;
                return undefined;
            }
            else {
                if (this.mapComparator.compare(key, lastNode.getKey()) === 0) {
                    var lastValue = lastNode.getValue();
                    lastNode.setValue(value);
                    return lastValue;
                }
                else { // This node will immediately preceed the new node
                    this.numberElements++;
                    var newnode = new NavigableHashNode(key, value, this.newNodeSize(), this.NavigableHashNodeCollectable);
                    this.hookUpNodePointers(newnode, lastNode);
                    return undefined;
                }
            }
        }
    };
    NavigableHashImpl.prototype.hookUpNodePointers = function (newNode, immediatePreceedingNode) {
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
                        if ((nextNode !== null) && (nextNode !== undefined)) { // not end of the map
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
    * @return {NavigableHashNode} an entry with the least key, or null if this map is empty
    */
    NavigableHashImpl.prototype.firstEntry = function () {
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
    NavigableHashImpl.prototype.ceilingEntry = function (key) {
        if (this.numberElements < 1) {
            return null;
        }
        var node = this.floorEntry(key);
        if ((node === null) || (node === undefined)) { // no node less than or equal to this key
            node = this.firstEntry();
            return node;
        }
        else {
            if (this.comparator().compare(node.getKey(), key) === 0) { // the highest key less than or equal to this node is this node
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
    NavigableHashImpl.prototype.higherEntry = function (key) {
        if (this.numberElements < 1) {
            return null;
        }
        var node = this.floorEntry(key);
        if ((node === null) || (node === undefined)) { // no node less than or equal to this key
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
    NavigableHashImpl.prototype.nextHigherNode = function (node) {
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
    NavigableHashImpl.prototype.lowerEntry = function (key) {
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
        if (node === null) { // we only got here if every element was higher than or equal this one
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
                if ((nn === null) || (nn === undefined)) { // then this node is past the target
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
    NavigableHashImpl.prototype.floorEntry = function (key) {
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
        if (node === null) { // we only got here if every element was higher than this one
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
    NavigableHashImpl.prototype.lastEntry = function () {
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
    NavigableHashImpl.prototype.getEntry = function (key) {
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
        if (node === null) { // we only got here if every element was higher than or equal this one
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
                if ((nn === null) || (nn === undefined)) { // then this node is past the target
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
    return NavigableHashImpl;
}());
exports.NavigableHashImpl = NavigableHashImpl;
var NavigableHashNode = /** @class */ (function (_super) {
    __extends(NavigableHashNode, _super);
    function NavigableHashNode(key, value, height, iNodeCollectable) {
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
    NavigableHashNode.prototype.setValue = function (iValue) {
        this.value = iValue;
    };
    NavigableHashNode.prototype.getLastNodeArray = function () {
        return this.lastNodeArray;
    };
    NavigableHashNode.prototype.getNextNodeArray = function () {
        return this.nextNodeArray;
    };
    return NavigableHashNode;
}(BasicMapEntry_1.BasicMapEntry));
exports.NavigableHashNode = NavigableHashNode;
var NavigableHashNodeCollectable = /** @class */ (function () {
    function NavigableHashNodeCollectable(iColl) {
        this.coll = null;
        this.coll = iColl;
    }
    NavigableHashNodeCollectable.prototype.equals = function (o1, o2) {
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
    return NavigableHashNodeCollectable;
}());
var NavigableHashNodeComparator = /** @class */ (function () {
    function NavigableHashNodeComparator(iComp) {
        this.comp = null;
        this.comp = iComp;
    }
    NavigableHashNodeComparator.prototype.compare = function (o1, o2) {
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
    return NavigableHashNodeComparator;
}());
/**
 * A scalable NavigableMap implementation that implements SkipListMap for performance that also implements HashMap so that the get method returns in O(1) time.
 *
 * The map is sorted according to a Comparator provided at map creation time.
 *
 * This class implements a SkipList providing expected average log(n) time cost for the containsKey, put and remove operations and their variants.
 * This class implements a Hash providing expected average O(1) time cost for the get method.
 *
 * This class does not directly correspond to any class but most closely corresponds to java.util.concurrent.ConcurrentSkipListMap and java.util.HashMap.
 */
var NavigableHashMap = /** @class */ (function () {
    function NavigableHashMap(comp, iInitial) {
        if (iInitial === void 0) { iInitial = null; }
        this.impl = null;
        this.impl = new NavigableHashImpl(comp);
        if ((iInitial !== null) && (iInitial !== undefined)) {
            //      console.log ("skiplist::constructor initial has " + initialElements.size());
            for (var iter = iInitial.entrySet().iterator(); iter.hasNext();) {
                var t = iter.next();
                //        console.log ("skiplist::constructor adding " + t.getKey());
                this.impl.put(t.getKey(), t.getValue());
            }
        }
    }
    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value value whose presence in this map is to be tested
     */
    NavigableHashMap.prototype.containsValue = function (value) {
        return Collections_1.Collections.containsValue(this, value);
    };
    //  public validateMap () : boolean { return this.impl.validate(); }
    //  public validateMapDisplay () : boolean { return this.impl.validateDisplay(); }
    NavigableHashMap.prototype.getNextHigherKey = function (key) {
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
    NavigableHashMap.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
    */
    NavigableHashMap.prototype.get = function (key) {
        var node = this.impl.getEntry(key);
        if ((node === undefined) || (node === null)) {
            return undefined;
        }
        return node.getValue();
    };
    /**
    * Returns true if this map contains a mapping for the specified key.
    * @param {K} key The key whose presence in this map is to be tested
    * @return {V} true if this map contains a mapping for the specified key.
    */
    NavigableHashMap.prototype.containsKey = function (key) {
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
    NavigableHashMap.prototype.isEmpty = function () {
        return this.impl.isEmpty();
    };
    /**
    * Returns an ImmutableSet view of the keys contained in this map.
    * The set's iterator returns the keys in ascending order.
    * The set is backed by the map, so changes to the map are reflected in the set.
    * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    NavigableHashMap.prototype.keySet = function () {
        return new ImmutableKeySetForNavigableHashMap(this.impl);
    };
    /**
    * Returns an ImmutableSet view of the mappings contained in this map.
    * The set's iterator returns the mappings in ascending key order.
    * The set is backed by the map, so changes to the map are reflected in the set.
    * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
    * The contains method on this entrySet will only compare keys not values.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    NavigableHashMap.prototype.entrySet = function () {
        return new ImmutableEntrySetForNavigableHashImpl(this.impl);
    };
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    NavigableHashMap.prototype.put = function (key, value) {
        return this.impl.put(key, value);
    };
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    NavigableHashMap.prototype.remove = function (key) {
        return this.impl.remove(key);
    };
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    NavigableHashMap.prototype.clear = function () {
        this.impl.clear();
    };
    /**
    * Returns an ImmutableMap backed by this Map
    */
    NavigableHashMap.prototype.immutableMap = function () {
        return this;
    };
    /**
     * Returns an iterator over the entire entry set
     * @return {Iterator<K>} an iterator for the entry set
     */
    NavigableHashMap.prototype[Symbol.iterator] = function () {
        return this.entrySet[Symbol.iterator]();
    };
    /**
    * Returns the first (lowest) key currently in this map.
    * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
    */
    NavigableHashMap.prototype.firstKey = function () {
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
    NavigableHashMap.prototype.firstEntry = function () {
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
    NavigableHashMap.prototype.ceilingEntry = function (key) {
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
    NavigableHashMap.prototype.ceilingKey = function (key) {
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
    NavigableHashMap.prototype.higherKey = function (key) {
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
    NavigableHashMap.prototype.higherEntry = function (key) {
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
    NavigableHashMap.prototype.lowerKey = function (key) {
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
    NavigableHashMap.prototype.lowerEntry = function (key) {
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
    NavigableHashMap.prototype.floorKey = function (key) {
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
    NavigableHashMap.prototype.floorEntry = function (key) {
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
    NavigableHashMap.prototype.lastKey = function () {
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
    NavigableHashMap.prototype.lastEntry = function () {
        var node = this.impl.lastEntry();
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node;
    };
    /**
    * Override JSON.stringify handling
    */
    NavigableHashMap.prototype.toJSON = function () {
        return Collections_1.Collections.jsonstringify(this);
    };
    return NavigableHashMap;
}());
exports.NavigableHashMap = NavigableHashMap;
var ImmutableKeySetForNavigableHashMap = /** @class */ (function () {
    function ImmutableKeySetForNavigableHashMap(iNavigableHashImpl) {
        this.impl = iNavigableHashImpl;
    }
    ImmutableKeySetForNavigableHashMap.prototype.size = function () { return this.size(); };
    ImmutableKeySetForNavigableHashMap.prototype.isEmpty = function () { return this.isEmpty(); };
    ImmutableKeySetForNavigableHashMap.prototype.contains = function (item) { return this.contains(item); };
    ImmutableKeySetForNavigableHashMap.prototype.iterator = function () { return new NavigableHashMapKeySetJIterator(this.impl); };
    ImmutableKeySetForNavigableHashMap.prototype[Symbol.iterator] = function () { return new NavigableHashMapKeySetIterator(this.impl); };
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    ImmutableKeySetForNavigableHashMap.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    return ImmutableKeySetForNavigableHashMap;
}());
exports.ImmutableKeySetForNavigableHashMap = ImmutableKeySetForNavigableHashMap;
/* Java style iterator */
var NavigableHashMapKeySetJIterator = /** @class */ (function () {
    function NavigableHashMapKeySetJIterator(implI) {
        this.impl = implI;
    }
    NavigableHashMapKeySetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) { // first time caller
            var firstEntry = this.impl.firstEntry();
            if ((firstEntry === null) || (firstEntry === undefined))
                return false;
            return true;
        }
        else { // we've already called this iterator before
            var tmpEntry = this.impl.nextHigherNode(this.location);
            if ((tmpEntry === null) || (tmpEntry === undefined))
                return false;
            return true;
        }
    };
    NavigableHashMapKeySetJIterator.prototype.next = function () {
        if (this.location === undefined) { // first time caller
            var firstEntry = this.impl.firstEntry();
            if ((firstEntry === null) || (firstEntry === undefined))
                return null;
            this.location = firstEntry;
            return firstEntry.getKey();
        }
        else { // we've already called this iterator before
            var tmpEntry = this.impl.nextHigherNode(this.location);
            if ((tmpEntry === null) || (tmpEntry === undefined))
                return null;
            this.location = tmpEntry;
            return tmpEntry.getKey();
        }
    };
    return NavigableHashMapKeySetJIterator;
}());
exports.NavigableHashMapKeySetJIterator = NavigableHashMapKeySetJIterator;
/* TypeScript iterator */
var NavigableHashMapKeySetIterator = /** @class */ (function () {
    function NavigableHashMapKeySetIterator(implI) {
        this.impl = implI;
        this.location = this.impl.firstEntry();
    }
    // tslint:disable-next-line:no-any
    NavigableHashMapKeySetIterator.prototype.next = function (value) {
        if ((this.location === null) || (this.location === undefined)) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.getKey());
        this.location = this.impl.nextHigherNode(this.location);
        return tmp;
    };
    return NavigableHashMapKeySetIterator;
}());
exports.NavigableHashMapKeySetIterator = NavigableHashMapKeySetIterator;
var ImmutableEntrySetForNavigableHashImpl = /** @class */ (function () {
    function ImmutableEntrySetForNavigableHashImpl(iMap) {
        this.map = iMap;
    }
    ImmutableEntrySetForNavigableHashImpl.prototype.size = function () { return this.map.size(); };
    ImmutableEntrySetForNavigableHashImpl.prototype.isEmpty = function () { return this.map.isEmpty(); };
    ImmutableEntrySetForNavigableHashImpl.prototype.contains = function (item) {
        if ((item === null) || (item === undefined))
            return false;
        var node = this.map.getEntry(item.getKey());
        if ((node === undefined) || (node === null)) {
            return false;
        }
        return true;
    };
    ImmutableEntrySetForNavigableHashImpl.prototype.iterator = function () { return new NavigableHashMapEntrySetJIterator(this.map); };
    ImmutableEntrySetForNavigableHashImpl.prototype[Symbol.iterator] = function () { return new NavigableHashMapEntrySetIterator(this.map); };
    ImmutableEntrySetForNavigableHashImpl.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    return ImmutableEntrySetForNavigableHashImpl;
}());
exports.ImmutableEntrySetForNavigableHashImpl = ImmutableEntrySetForNavigableHashImpl;
/* Java style iterator */
var NavigableHashMapEntrySetJIterator = /** @class */ (function () {
    function NavigableHashMapEntrySetJIterator(iMap) {
        this.map = iMap;
    }
    NavigableHashMapEntrySetJIterator.prototype.hasNext = function () {
        //    console.log ("NavigableHashMapEntrySetJIterator::hasNext");
        if (this.location === undefined) { // first time caller
            var firstEntry = this.map.firstEntry();
            if ((firstEntry === null) || (firstEntry === undefined))
                return false;
            return true;
        }
        else { // we've already called this iterator before
            var tmpEntry = this.map.nextHigherNode(this.location);
            if ((tmpEntry === null) || (tmpEntry === undefined))
                return false;
            return true;
        }
    };
    NavigableHashMapEntrySetJIterator.prototype.next = function () {
        //    console.log ("NavigableHashMapEntrySetJIterator::next");
        if (this.location === undefined) { // first time caller
            var firstEntry = this.map.firstEntry();
            if ((firstEntry === null) || (firstEntry === undefined))
                return null;
            this.location = firstEntry;
            return firstEntry;
        }
        else { // we've already called this iterator before
            var tmpEntry = this.map.nextHigherNode(this.location);
            if ((tmpEntry === null) || (tmpEntry === undefined))
                return null;
            this.location = tmpEntry;
            return tmpEntry;
        }
    };
    return NavigableHashMapEntrySetJIterator;
}());
exports.NavigableHashMapEntrySetJIterator = NavigableHashMapEntrySetJIterator;
/* TypeScript iterator */
var NavigableHashMapEntrySetIterator = /** @class */ (function () {
    function NavigableHashMapEntrySetIterator(iMap) {
        this.map = iMap;
        this.location = this.map.firstEntry();
    }
    // tslint:disable-next-line:no-any
    NavigableHashMapEntrySetIterator.prototype.next = function (value) {
        if ((this.location === null) || (this.location === undefined)) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location);
        this.location = this.map.nextHigherNode(this.location);
        return tmp;
    };
    return NavigableHashMapEntrySetIterator;
}());
exports.NavigableHashMapEntrySetIterator = NavigableHashMapEntrySetIterator;
/**
* A scalable NavigableSet implementation that implements SkipListSet for performance that also implements HashSet so that the get method returns in O(1) time.
*
* The set is sorted according to a Comparator provided at set creation time.
*
* This class implements a SkipList providing expected average log(n) time cost for the containsKey, put and remove operations and their variants.
* This class implements a Hash providing expected average O(1) time cost for the get method.
*
* This class does not directly correspond to any class but most closely corresponds to java.util.concurrent.ConcurrentSkipListSet and java.util.HashSet.
*/
var NavigableHashSet = /** @class */ (function () {
    function NavigableHashSet(iComparator, initialElements) {
        this.initialElements = initialElements;
        this.impl = null;
        this.impl = new NavigableHashImpl(iComparator);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var key = iter.next();
                this.impl.put(key, 1);
            }
        }
    }
    //  public validateSet () : boolean { return this.impl.validate(); }
    //  public validateSetDisplay () : boolean { return this.impl.validateDisplay(); }
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    NavigableHashSet.prototype.add = function (element) {
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
    NavigableHashSet.prototype.size = function () {
        return this.impl.size();
    };
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    NavigableHashSet.prototype.isEmpty = function () {
        return this.impl.isEmpty();
    };
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    NavigableHashSet.prototype.contains = function (key) {
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
    NavigableHashSet.prototype.floor = function (key) {
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
    NavigableHashSet.prototype.ceiling = function (key) {
        var node = this.impl.ceilingEntry(key);
        if ((node === undefined) || (node === null)) {
            return null;
        }
        return node.getKey();
    };
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    NavigableHashSet.prototype.forEach = function (consumer) {
        for (var iter = this.iterator(); iter.hasNext();) {
            var t = iter.next();
            consumer.accept(t);
        }
    };
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    NavigableHashSet.prototype.first = function () {
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
    NavigableHashSet.prototype.last = function () {
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
    NavigableHashSet.prototype.remove = function (element) {
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
    NavigableHashSet.prototype.clear = function () {
        this.impl.clear();
    };
    /**
    * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
    * @return {K} the first (lowest) element, or null if this set is empty
    */
    NavigableHashSet.prototype.pollFirst = function () {
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
    NavigableHashSet.prototype.pollLast = function () {
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
    NavigableHashSet.prototype.getNextHigherKey = function (key) {
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
    NavigableHashSet.prototype.iterator = function () {
        return new NavigableHashSetJIterator(this.impl);
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    NavigableHashSet.prototype[Symbol.iterator] = function () {
        return new NavigableHashSetIterator(this.impl);
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    NavigableHashSet.prototype.immutableCollection = function () {
        return this;
    };
    /**
    * Returns an ImmutableSet backed by this Set
    */
    NavigableHashSet.prototype.immutableSet = function () {
        return this;
    };
    /**
    * Override JSON.stringify handling
    */
    NavigableHashSet.prototype.toJSON = function () {
        return Collections_1.Collections.asArray(this);
    };
    return NavigableHashSet;
}());
exports.NavigableHashSet = NavigableHashSet;
/* Java style iterator */
var NavigableHashSetJIterator = /** @class */ (function () {
    function NavigableHashSetJIterator(implI) {
        this.impl = implI;
    }
    NavigableHashSetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) { // first time caller
            var first = this.impl.firstEntry();
            if ((first === undefined) || (first === null)) {
                return false;
            }
            return true;
        }
        else { // we've already called this iterator before
            var tmp = this.impl.nextHigherNode(this.location);
            if ((tmp === undefined) || (tmp === null)) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    NavigableHashSetJIterator.prototype.next = function () {
        if (this.location === undefined) { // first time caller
            var first = this.impl.firstEntry();
            if ((first === undefined) || (first === null)) {
                return null;
            }
            this.location = first;
            return first.getKey();
        }
        else { // we've already called this iterator before
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
    return NavigableHashSetJIterator;
}());
exports.NavigableHashSetJIterator = NavigableHashSetJIterator;
/* TypeScript iterator */
var NavigableHashSetIterator = /** @class */ (function () {
    function NavigableHashSetIterator(implI) {
        this.impl = implI;
        this.location = this.impl.firstEntry();
    }
    // tslint:disable-next-line:no-any
    NavigableHashSetIterator.prototype.next = function (value) {
        if ((this.location === null) || (this.location === undefined)) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location.getKey());
        this.location = this.impl.nextHigherNode(this.location);
        return tmp;
    };
    return NavigableHashSetIterator;
}());
exports.NavigableHashSetIterator = NavigableHashSetIterator;
