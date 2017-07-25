"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMapEntry_1 = require("./BasicMapEntry");
var NaiveMap = (function () {
    function NaiveMap(iComparator) {
        this.topNode = null;
        this.mapComparator = null;
        this.mapComparator = iComparator;
    }
    NaiveMap.prototype.printMap = function () {
        if (this.topNode === null) {
            console.log("top node is null");
            return;
        }
        if (this.topNode === undefined) {
            console.log("top node is undefined");
            return;
        }
        console.log("New Tree: size = " + this.size());
        this.printMapNode(this.topNode);
        console.log("End of Tree");
    };
    NaiveMap.prototype.printMapNode = function (node) {
        console.log("New Node: key = " + node.getKey() + " value = " + node.getValue());
        if (node.getParentNode() !== null) {
            console.log("Parent key = " + node.getParentNode().getKey());
        }
        else {
            console.log("Parent node is null");
        }
        if (node.getLeftNode() !== null) {
            console.log("Left key = " + node.getLeftNode().getKey());
        }
        else {
            console.log("Left node is null");
        }
        if (node.getRightNode() !== null) {
            console.log("Right key = " + node.getRightNode().getKey());
        }
        else {
            console.log("Right node is null");
        }
        if (node.getLeftNode() !== null) {
            this.printMapNode(node.getLeftNode());
        }
        if (node.getRightNode() !== null) {
            this.printMapNode(node.getRightNode());
        }
    };
    /**
     * Removes all of the mappings from this map. The map will be empty after this call returns.
     */
    NaiveMap.prototype.clear = function () {
        this.topNode = null;
    };
    /**
     * Returns the comparator used to order the keys in this map
     * @return {Comparator} the comparator used to order the keys in this map
     */
    NaiveMap.prototype.comparator = function () {
        return this.mapComparator;
    };
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    NaiveMap.prototype.size = function () {
        if (this.topNode === null)
            return 0;
        if (this.topNode === undefined)
            return 0;
        return this.sizeTree(this.topNode.getLeftNode()) + this.sizeTree(this.topNode.getRightNode()) + 1;
    };
    NaiveMap.prototype.sizeTree = function (n) {
        if (n === null)
            return 0;
        if (n === undefined)
            return 0;
        return this.sizeTree(n.getLeftNode()) + this.sizeTree(n.getRightNode()) + 1;
    };
    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    NaiveMap.prototype.put = function (key, value) {
        if ((this.topNode === null) || (this.topNode === undefined)) {
            var newNode = new NaiveMapNode(key, value, null);
            this.topNode = newNode;
            return null;
        }
        return this.putNode(this.topNode, key, value);
    };
    NaiveMap.prototype.putNode = function (node, key, value) {
        var comp = this.mapComparator.compare(key, node.getKey());
        if (comp === 0) {
            var tmpV = node.getValue();
            node.setValue(value);
            return tmpV;
        }
        if (comp < 0) {
            var nextNode = node.getLeftNode();
            if (nextNode === null) {
                var newNode = new NaiveMapNode(key, value, node);
                node.setLeftNode(newNode);
                return null;
            }
            else {
                return this.putNode(nextNode, key, value);
            }
        }
        else {
            var nextNode = node.getRightNode();
            if (nextNode === null) {
                var newNode = new NaiveMapNode(key, value, node);
                node.setRightNode(newNode);
                return null;
            }
            else {
                return this.putNode(nextNode, key, value);
            }
        }
    };
    /**
     * Returns true if this map contains a mapping for the specified key.   This method uses the comparator for the map to find the specified key
     * @param {K} key key whose presence in this map is to be tested
     * @return {boolean} true if this map contains a mapping for the specified key
     */
    NaiveMap.prototype.containsKey = function (key) {
        if ((this.topNode === null) || (this.topNode === undefined))
            return false;
        if (this.getNode(this.topNode, key) === null)
            return false;
        return true;
    };
    NaiveMap.prototype.getNode = function (node, key) {
        var comp = this.mapComparator.compare(key, node.getKey());
        if (comp === 0)
            return node;
        if (comp < 0) {
            var nextNode = node.getLeftNode();
            if (nextNode === null) {
                return null;
            }
            else {
                return this.getNode(nextNode, key);
            }
        }
        else {
            var nextNode = node.getRightNode();
            if (nextNode === null) {
                return null;
            }
            else {
                return this.getNode(nextNode, key);
            }
        }
    };
    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * @param {K} key the key whose associated value is to be returned
     * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
     */
    NaiveMap.prototype.get = function (key) {
        if ((this.topNode === null) || (this.topNode === undefined))
            return null;
        var tmp = this.getNode(this.topNode, key);
        if (tmp === null)
            return null;
        return tmp.getValue();
    };
    /**
     * Removes the mapping for this key from this TreeMap if present.
     * @param {K} key key for which mapping should be removed
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    NaiveMap.prototype.remove = function (key) {
        if ((this.topNode === null) || (this.topNode === undefined))
            return null;
        var tmp = this.getNode(this.topNode, key);
        if (tmp === null) {
            return null;
        }
        return null;
    };
    /**
    * Returns the first (lowest) node currently in this map.
    * @return {NaiveMapNode} the first (lowest) node currently in this map, returns null if the Map is empty
    */
    NaiveMap.prototype.firstMapNode = function () {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var node = this.topNode;
        while (node.getLeftNode() !== null) {
            node = node.getLeftNode();
        }
        return node;
    };
    /**
     * Returns the first (lowest) key currently in this map.
     * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
     */
    NaiveMap.prototype.firstKey = function () {
        var node = this.firstMapNode();
        if (node === null)
            return null;
        return node.getKey();
    };
    /**
     * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
     * @return {MapEntry} an entry with the least key, or null if this map is empty
     */
    NaiveMap.prototype.firstEntry = function () {
        var node = this.firstMapNode();
        if (node === null)
            return null;
        return node.getMapEntry();
    };
    /**
    * Returns the last (highest) node currently in this map.
    * @return {NaiveMapNode} the last (highest) node currently in this map, returns null if the Map is empty
    */
    NaiveMap.prototype.lastMapNode = function () {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var node = this.topNode;
        while (node.getRightNode() !== null) {
            node = node.getRightNode();
        }
        return node;
    };
    /**
     * Returns the last (highest) key currently in this map.
     * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
     */
    NaiveMap.prototype.lastKey = function () {
        var node = this.lastMapNode();
        if (node === null)
            return null;
        return node.getKey();
    };
    /**
     * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    NaiveMap.prototype.lastEntry = function () {
        var node = this.lastMapNode();
        if (node === null)
            return null;
        return node.getMapEntry();
    };
    return NaiveMap;
}());
exports.NaiveMap = NaiveMap;
var NaiveMapNode = (function () {
    function NaiveMapNode(iKey, iValue, iParent) {
        this.key = iKey;
        this.value = iValue;
        this.leftNode = null;
        this.rightNode = null;
        this.parentNode = iParent;
    }
    NaiveMapNode.prototype.getKey = function () {
        return this.key;
    };
    NaiveMapNode.prototype.getValue = function () {
        return this.value;
    };
    NaiveMapNode.prototype.setValue = function (v) {
        this.value = v;
    };
    NaiveMapNode.prototype.getLeftNode = function () {
        return this.leftNode;
    };
    NaiveMapNode.prototype.setLeftNode = function (n) {
        this.leftNode = n;
    };
    NaiveMapNode.prototype.getRightNode = function () {
        return this.rightNode;
    };
    NaiveMapNode.prototype.setRightNode = function (n) {
        this.rightNode = n;
    };
    NaiveMapNode.prototype.getParentNode = function () {
        return this.parentNode;
    };
    NaiveMapNode.prototype.setParentNode = function (n) {
        this.parentNode = n;
    };
    NaiveMapNode.prototype.getMapEntry = function () {
        return new BasicMapEntry_1.BasicMapEntry(this.key, this.value);
    };
    return NaiveMapNode;
}());
exports.NaiveMapNode = NaiveMapNode;
