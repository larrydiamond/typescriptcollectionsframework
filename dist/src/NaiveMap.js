"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var NaiveMapNode = (function () {
    function NaiveMapNode(iKey, iValue) {
        this.key = iKey;
        this.value = iValue;
        this.leftNode = null;
        this.rightNode = null;
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
    return NaiveMapNode;
}());
exports.NaiveMapNode = NaiveMapNode;
var NaiveMap = (function () {
    function NaiveMap(iComparator) {
        this.comparator = iComparator;
    }
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
        if (this.topNode === null) {
            var newNode = new NaiveMapNode(key, value);
            this.topNode = newNode;
            return null;
        }
        return this.putNode(this.topNode, key, value);
    };
    NaiveMap.prototype.putNode = function (node, key, value) {
        var comp = this.comparator.compare(key, node.getKey());
        if (comp === 0) {
            var tmpV = node.getValue();
            node.setValue(value);
            return tmpV;
        }
        if (comp < 0) {
            var nextNode = node.getRightNode();
            if (nextNode === null) {
                var newNode = new NaiveMapNode(key, value);
                node.setRightNode(newNode);
                return null;
            }
            else {
                return this.putNode(nextNode, key, value);
            }
        }
        else {
            var nextNode = node.getLeftNode();
            if (nextNode === null) {
                var newNode = new NaiveMapNode(key, value);
                node.setLeftNode(newNode);
                return null;
            }
            else {
                return this.putNode(nextNode, key, value);
            }
        }
    };
    return NaiveMap;
}());
exports.NaiveMap = NaiveMap;
