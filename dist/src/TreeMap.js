"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BasicIteratorResult_1 = require("./BasicIteratorResult");
var BasicMapEntry_1 = require("./BasicMapEntry");
/**
 * A binary tree based NavigableMap implementation. The map is sorted according to a Comparator provided at map creation time.<br>
 * This implementation provides guaranteed log(n) time cost for the containsKey, get, put and remove operations.
 *
 * Note that the ordering maintained by a tree map must be consistent with equals if this sorted map is to correctly implement the Map interface.
 * (See Comparator for a precise definition of consistent with equals.) <br>
 * This is so because the Map interface is defined in terms of the equals operation,
 * but a sorted map performs all key comparisons using its Comparator,
 * so two keys that are deemed equal by this method are, from the standpoint of the sorted map, equal. <br>
 * The behavior of a navigable map is well-defined even if its ordering is inconsistent with equals; it just fails to obey the general contract of the Map interface.
 *
 * This class corresponds to java.util.TreeMap
 */
var TreeMap = /** @class */ (function () {
    function TreeMap(iComparator, initialElements) {
        if (initialElements === void 0) { initialElements = null; }
        this.initialElements = initialElements;
        this.topNode = null;
        this.mapComparator = null;
        this.mapComparator = iComparator;
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.entrySet().iterator(); iter.hasNext();) {
                var t = iter.next();
                this.put(t.getKey(), t.getValue());
            }
        }
    }
    /* Debugging code
      public printMap() : void {
        if (this.topNode === null) {
          console.log ("top node is null");
          return;
        }
    
        if (this.topNode === undefined) {
          console.log ("top node is undefined");
          return;
        }
        console.log ("");
        console.log ("Tree size = " + this.size());
        this.printMapNode (this.topNode);
        console.log ("End of Tree");
        console.log ("");
      }
    
      private printMapNode (node:TreeMapNode<K,V>) : void {
        console.log ("New Node: key = " + node.getKey() + " value = " + node.getValue());
        if (node.getParentNode() !== null) {
          console.log ("Parent key = " + node.getParentNode().getKey());
        } else {
          console.log ("Parent node is null");
        }
        if (node.getLeftNode() !== null) {
          console.log ("Left key = " + node.getLeftNode().getKey());
        } else {
          console.log ("Left node is null");
        }
        if (node.getRightNode() !== null) {
          console.log ("Right key = " + node.getRightNode().getKey());
        } else {
          console.log ("Right node is null");
        }
        if (node.getLeftNode() !== null) {
          this.printMapNode (node.getLeftNode());
        }
        if (node.getRightNode() !== null) {
          this.printMapNode (node.getRightNode());
        }
      }
    /*  */
    TreeMap.prototype.validateMap = function () {
        if ((this.topNode === null) || (this.topNode === undefined)) {
            return true;
        }
        return this.validateNode(this.topNode);
    };
    TreeMap.prototype.validateNode = function (node) {
        var left = node.getLeftNode();
        var right = node.getRightNode();
        var thiskey = node.getKey();
        if (left !== null) {
            var leftkey = left.getKey();
            var comp = this.mapComparator.compare(thiskey, leftkey);
            if (comp < 0)
                return false;
            return this.validateNode(left);
        }
        if (right !== null) {
            var rightkey = right.getKey();
            var comp = this.mapComparator.compare(thiskey, rightkey);
            if (comp > 0)
                return false;
            return this.validateNode(right);
        }
        return true;
    };
    /**
     * Removes all of the mappings from this map. The map will be empty after this call returns.
     */
    TreeMap.prototype.clear = function () {
        // if only this was enough :(
        // JavaScript memory management has problems when two objects have pointers to one another
        // In that case, the mark and sweep garbage collector is unable to collect either object
        // and we wind up with out of memory errors :(
        while ((this.topNode !== null) && (this.topNode !== undefined)) {
            this.remove(this.topNode.getKey());
        }
        this.topNode = null;
    };
    /**
     * Returns the comparator used to order the keys in this map
     * @return {Comparator} the comparator used to order the keys in this map
     */
    TreeMap.prototype.comparator = function () {
        return this.mapComparator;
    };
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    TreeMap.prototype.size = function () {
        if (this.topNode === null)
            return 0;
        if (this.topNode === undefined)
            return 0;
        return this.sizeTree(this.topNode.getLeftNode()) + this.sizeTree(this.topNode.getRightNode()) + 1;
    };
    /**
     * Returns true if this map contains no key-value mappings.
     * @return {boolean} true if this map contains no key-value mappings
     */
    TreeMap.prototype.isEmpty = function () {
        if (this.size() < 1)
            return true;
        return false;
    };
    TreeMap.prototype.sizeTree = function (n) {
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
    TreeMap.prototype.put = function (key, value) {
        if ((this.topNode === null) || (this.topNode === undefined)) {
            var newNode = new TreeMapNode(key, value, null);
            this.topNode = newNode;
            return null;
        }
        return this.putNode(this.topNode, key, value);
    };
    TreeMap.prototype.putNode = function (node, key, value) {
        var comp = this.mapComparator.compare(key, node.getKey());
        if (comp === 0) {
            var tmpV = node.getValue();
            node.setValue(value);
            return tmpV;
        }
        if (comp < 0) {
            var nextNode = node.getLeftNode();
            if (nextNode === null) {
                var newNode = new TreeMapNode(key, value, node);
                // Can we do a minor rebalance of the bottom nodes of the tree?
                // if we are about to place a new node below a parent with no current children,
                // check to see if the the "grandparent" only has the one child and if so do a local rebalance
                if (node.getRightNode() === null) {
                    var grandparent = node.getParentNode();
                    if (grandparent !== null) {
                        if ((grandparent.getLeftNode() === node) && (grandparent.getRightNode() === null)) {
                            node.setLeftNode(newNode);
                            node.setRightNode(grandparent);
                            node.setParentNode(grandparent.getParentNode());
                            grandparent.setLeftNode(null);
                            grandparent.setRightNode(null);
                            grandparent.setParentNode(node);
                            if (grandparent === this.topNode) {
                                // make node new parent with newnode as left node and grandparent as right node
                                this.topNode = node;
                            }
                            else {
                                if (node.getParentNode().getLeftNode() === grandparent)
                                    node.getParentNode().setLeftNode(node);
                                if (node.getParentNode().getRightNode() === grandparent)
                                    node.getParentNode().setRightNode(node);
                            }
                        }
                        else {
                            node.setLeftNode(newNode);
                        }
                    }
                    else {
                        node.setLeftNode(newNode);
                    }
                }
                else {
                    node.setLeftNode(newNode);
                }
                return null;
            }
            else {
                return this.putNode(nextNode, key, value);
            }
        }
        else {
            var nextNode = node.getRightNode();
            if (nextNode === null) {
                var newNode = new TreeMapNode(key, value, node);
                if (node.getLeftNode() === null) {
                    var grandparent = node.getParentNode();
                    if (grandparent !== null) {
                        if ((grandparent.getRightNode() === node) && (grandparent.getLeftNode() === null)) {
                            node.setRightNode(newNode);
                            node.setLeftNode(grandparent);
                            node.setParentNode(grandparent.getParentNode());
                            grandparent.setRightNode(null);
                            grandparent.setLeftNode(null);
                            grandparent.setParentNode(node);
                            if (grandparent === this.topNode) {
                                // make node new parent with newnode as left node and grandparent as right node
                                this.topNode = node;
                            }
                            else {
                                if (node.getParentNode().getLeftNode() === grandparent)
                                    node.getParentNode().setLeftNode(node);
                                if (node.getParentNode().getRightNode() === grandparent)
                                    node.getParentNode().setRightNode(node);
                            }
                        }
                        else {
                            node.setRightNode(newNode);
                        }
                    }
                    else {
                        node.setRightNode(newNode);
                    }
                }
                else {
                    node.setRightNode(newNode);
                }
                node.setRightNode(newNode);
                return null;
            }
            else {
                return this.putNode(nextNode, key, value);
            }
        }
    };
    /**
     * Needed For Iterator
     * @param {K} key the given key
     * @return {K} the least key greater than key, or null if there is no such key
     */
    TreeMap.prototype.getNextHigherKey = function (key) {
        if ((this.topNode === null) || (this.topNode === undefined)) {
            return null;
        }
        var thisnode = this.getNode(this.topNode, key);
        if (thisnode === undefined)
            return null;
        if (thisnode === null)
            return null;
        var tmp = this.nextHigherNode(thisnode);
        if (tmp === null)
            return null;
        return tmp.getKey();
    };
    TreeMap.prototype.nextHigherNode = function (node) {
        // if there is a right child to this node, return the leftmost child of that node
        // If there is no parent node and no right child node then there's no next node and return null
        // If I am the left child of my parent node and I have no right child then my parent node is the next node
        // If I am the right child of my parent node, keep recursing up nodes until null or I find a node of which I am a left child of and return that node
        // Got all that?
        // if there is a right child to this node, return the leftmost child of that node
        if (node.getRightNode() !== null) {
            var child = node.getRightNode();
            while (child.getLeftNode() !== null) {
                child = child.getLeftNode();
            }
            return child;
        }
        // If there is no parent node and no right child node then there's no next node and return null
        if (node.getParentNode() === null) {
            return null;
        }
        // If I am the left child of my parent node and I have no right child then my parent node is the next node
        if (node.getParentNode().getLeftNode() === node) {
            return node.getParentNode();
        }
        // If I am the right child of my parent node, keep recursing up nodes until null or I find a node of which I am a left child of and return that node
        var tmp = node.getParentNode();
        while ((tmp !== null) && (tmp.getParentNode() !== null) && (tmp.getParentNode().getRightNode() === tmp)) {
            tmp = tmp.getParentNode();
        }
        if (tmp.getParentNode() === null)
            return null;
        return tmp.getParentNode();
    };
    /**
     * Returns true if this map contains a mapping for the specified key.   This method uses the comparator for the map to find the specified key
     * @param {K} key key whose presence in this map is to be tested
     * @return {boolean} true if this map contains a mapping for the specified key
     */
    TreeMap.prototype.containsKey = function (key) {
        if ((this.topNode === null) || (this.topNode === undefined))
            return false;
        if (this.getNode(this.topNode, key) === null)
            return false;
        return true;
    };
    TreeMap.prototype.getNode = function (node, key) {
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
    TreeMap.prototype.get = function (key) {
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
    TreeMap.prototype.remove = function (key) {
        if ((this.topNode === null) || (this.topNode === undefined))
            return null;
        var tmp = this.getNode(this.topNode, key);
        if (tmp === null) {
            return null;
        }
        var parent = tmp.getParentNode();
        var left = tmp.getLeftNode();
        var right = tmp.getRightNode();
        if (tmp.getLeftNode() === null) {
            if (tmp.getRightNode() === null) {
                // close up this wing of the tree, nothing to see here
                if (parent === null) {
                    this.topNode = null;
                }
                else {
                    if (parent.getLeftNode() === tmp) {
                        parent.setLeftNode(null);
                    }
                    else {
                        parent.setRightNode(null);
                    }
                }
            }
            else {
                right.setParentNode(parent);
                if (parent === null) {
                    this.topNode = right;
                }
                else {
                    if (parent.getLeftNode() === tmp) {
                        parent.setLeftNode(right);
                    }
                    else {
                        parent.setRightNode(right);
                    }
                }
            }
        }
        else {
            if (right === null) {
                left.setParentNode(parent);
                if (parent === null) {
                    this.topNode = left;
                }
                else {
                    if (parent.getLeftNode() === tmp) {
                        parent.setLeftNode(left);
                    }
                    else {
                        parent.setRightNode(left);
                    }
                }
            }
            else {
                // Horrific unbalancing about to occur here, please avert your eyes until the Red Black stuff comes
                // Make the Left node the new parent
                // Move the right node to the right of the rightmost node under the left node
                if (parent === null) {
                    this.topNode = left;
                }
                else {
                    if (parent.getLeftNode() === tmp) {
                        parent.setLeftNode(left);
                    }
                    else {
                        parent.setRightNode(left);
                    }
                }
                left.setParentNode(parent);
                var parentOfRight = tmp.getLeftNode();
                while (parentOfRight.getRightNode() !== null)
                    parentOfRight = parentOfRight.getRightNode();
                parentOfRight.setRightNode(right);
                right.setParentNode(parentOfRight);
            }
        }
        tmp.setParentNode(null); // clear pointers to help memory collection
        tmp.setLeftNode(null); // clear pointers to help memory collection
        tmp.setRightNode(null); // clear pointers to help memory collection
        return tmp.getValue();
    };
    /**
     * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
     * @param {K} key the key
     * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
     */
    TreeMap.prototype.ceilingEntry = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.ceilingNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getMapEntry();
    };
    /**
    * Returns the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than or equal to key, or null if there is no such key
    */
    TreeMap.prototype.ceilingKey = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.ceilingNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getKey();
    };
    /**
    * Returns the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    TreeMap.prototype.higherKey = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.higherNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getKey();
    };
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    TreeMap.prototype.higherEntry = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.higherNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getMapEntry();
    };
    /**
    * Returns the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the highest key lower than key, or null if there is no such key
    */
    TreeMap.prototype.lowerKey = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.lowerNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getKey();
    };
    /**
    * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
    */
    TreeMap.prototype.lowerEntry = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.lowerNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getMapEntry();
    };
    /**
    * Returns the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the greatest key less than or equal to key, or null if there is no such key
    */
    TreeMap.prototype.floorKey = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.floorNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getKey();
    };
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    TreeMap.prototype.floorEntry = function (key) {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var tmp = this.floorNode(this.topNode, key, null);
        if (tmp === null)
            return null;
        return tmp.getMapEntry();
    };
    TreeMap.prototype.ceilingNode = function (node, key, currentBest) {
        if (node === null) {
            return currentBest;
        }
        if (node === undefined) {
            return currentBest;
        }
        var tmp = this.mapComparator.compare(node.getKey(), key);
        if (tmp === 0) {
            return node;
        }
        if (tmp < 0) {
            return this.ceilingNode(node.getRightNode(), key, currentBest);
        }
        // above key
        if (currentBest === null) {
            return this.ceilingNode(node.getLeftNode(), key, node);
        }
        tmp = this.mapComparator.compare(node.getKey(), currentBest.getKey());
        if (tmp > 0) {
            return this.ceilingNode(node.getLeftNode(), key, currentBest);
        }
        else {
            return this.ceilingNode(node.getLeftNode(), key, node);
        }
    };
    TreeMap.prototype.higherNode = function (node, key, currentBest) {
        if (node === null) {
            return currentBest;
        }
        if (node === undefined) {
            return currentBest;
        }
        var tmp = this.mapComparator.compare(node.getKey(), key);
        if (tmp === 0) {
            return this.higherNode(node.getRightNode(), key, currentBest);
        }
        if (tmp < 0) {
            return this.higherNode(node.getRightNode(), key, currentBest);
        }
        // above key
        if (currentBest === null) {
            return this.higherNode(node.getLeftNode(), key, node);
        }
        tmp = this.mapComparator.compare(node.getKey(), currentBest.getKey());
        if (tmp > 0) {
            return this.higherNode(node.getLeftNode(), key, currentBest);
        }
        else {
            return this.higherNode(node.getLeftNode(), key, node);
        }
    };
    TreeMap.prototype.lowerNode = function (node, key, currentBest) {
        if (node === null) {
            return currentBest;
        }
        if (node === undefined) {
            return currentBest;
        }
        var tmp = this.mapComparator.compare(node.getKey(), key);
        if (tmp === 0) {
            return this.lowerNode(node.getLeftNode(), key, currentBest);
        }
        if (tmp > 0) {
            return this.lowerNode(node.getLeftNode(), key, currentBest);
        }
        // above key
        if (currentBest === null) {
            return this.lowerNode(node.getRightNode(), key, node);
        }
        tmp = this.mapComparator.compare(node.getKey(), currentBest.getKey());
        if (tmp > 0) {
            return this.lowerNode(node.getRightNode(), key, node);
        }
        else {
            return this.lowerNode(node.getRightNode(), key, currentBest);
        }
    };
    TreeMap.prototype.floorNode = function (node, key, currentBest) {
        if (node === null) {
            return currentBest;
        }
        if (node === undefined) {
            return currentBest;
        }
        var tmp = this.mapComparator.compare(node.getKey(), key);
        if (tmp === 0) {
            return node;
        }
        if (tmp > 0) {
            return this.floorNode(node.getLeftNode(), key, currentBest);
        }
        // above key
        if (currentBest === null) {
            return this.floorNode(node.getRightNode(), key, node);
        }
        tmp = this.mapComparator.compare(node.getKey(), currentBest.getKey());
        if (tmp > 0) {
            return this.floorNode(node.getRightNode(), key, node);
        }
        else {
            return this.floorNode(node.getRightNode(), key, currentBest);
        }
    };
    /**
     * Returns the first (lowest) node currently in this map.
     * @return {TreeMapNode} the first (lowest) node currently in this map, returns null if the Map is empty
     */
    TreeMap.prototype.firstMapNode = function () {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var node = this.topNode;
        while ((node.getLeftNode() !== null) && (node.getLeftNode() !== undefined)) {
            node = node.getLeftNode();
        }
        return node;
    };
    /**
     * Returns the first (lowest) key currently in this map.
     * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
     */
    TreeMap.prototype.firstKey = function () {
        var node = this.firstMapNode();
        if ((node === null) || (node === undefined))
            return null;
        return node.getKey();
    };
    /**
     * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
     * @return {MapEntry} an entry with the least key, or null if this map is empty
     */
    TreeMap.prototype.firstEntry = function () {
        var node = this.firstMapNode();
        if ((node === null) || (node === undefined))
            return null;
        return node.getMapEntry();
    };
    /**
    * Returns the last (highest) node currently in this map.
    * @return {TreeMapNode} the last (highest) node currently in this map, returns null if the Map is empty
    */
    TreeMap.prototype.lastMapNode = function () {
        if (this.topNode === null)
            return null;
        if (this.topNode === undefined)
            return null;
        var node = this.topNode;
        while ((node.getRightNode() !== null) && (node.getRightNode() !== undefined)) {
            node = node.getRightNode();
        }
        return node;
    };
    /**
     * Returns the last (highest) key currently in this map.
     * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
     */
    TreeMap.prototype.lastKey = function () {
        var node = this.lastMapNode();
        if ((node === null) || (node === undefined))
            return null;
        return node.getKey();
    };
    /**
     * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    TreeMap.prototype.lastEntry = function () {
        var node = this.lastMapNode();
        if ((node === null) || (node === undefined))
            return null;
        return node.getMapEntry();
    };
    /**
     * Returns an ImmutableSet view of the keys contained in this map.
     * The set's iterator returns the keys in ascending order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    TreeMap.prototype.keySet = function () {
        return new ImmutableKeySetForTreeMap(this);
    };
    /**
     * Returns an ImmutableSet view of the mappings contained in this map.
     * The set's iterator returns the mappings in ascending key order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * The contains method on this entrySet will only compare keys not values.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    TreeMap.prototype.entrySet = function () {
        return new ImmutableEntrySetForTreeMap(this);
    };
    /**
    * Returns an ImmutableMap backed by Map
    */
    TreeMap.prototype.immutableMap = function () {
        return this;
    };
    return TreeMap;
}());
exports.TreeMap = TreeMap;
var TreeMapNode = /** @class */ (function () {
    function TreeMapNode(iKey, iValue, iParent) {
        this.key = iKey;
        this.value = iValue;
        this.leftNode = null;
        this.rightNode = null;
        this.parentNode = iParent;
    }
    TreeMapNode.prototype.getKey = function () {
        return this.key;
    };
    TreeMapNode.prototype.getValue = function () {
        return this.value;
    };
    TreeMapNode.prototype.setValue = function (v) {
        this.value = v;
    };
    TreeMapNode.prototype.getLeftNode = function () {
        return this.leftNode;
    };
    TreeMapNode.prototype.setLeftNode = function (n) {
        this.leftNode = n;
    };
    TreeMapNode.prototype.getRightNode = function () {
        return this.rightNode;
    };
    TreeMapNode.prototype.setRightNode = function (n) {
        this.rightNode = n;
    };
    TreeMapNode.prototype.getParentNode = function () {
        return this.parentNode;
    };
    TreeMapNode.prototype.setParentNode = function (n) {
        this.parentNode = n;
    };
    TreeMapNode.prototype.getMapEntry = function () {
        return new BasicMapEntry_1.BasicMapEntry(this.key, this.value);
    };
    return TreeMapNode;
}());
exports.TreeMapNode = TreeMapNode;
var ImmutableKeySetForTreeMap = /** @class */ (function () {
    function ImmutableKeySetForTreeMap(iTreeMap) {
        this.treeMap = iTreeMap;
    }
    ImmutableKeySetForTreeMap.prototype.size = function () { return this.treeMap.size(); };
    ImmutableKeySetForTreeMap.prototype.isEmpty = function () { return this.treeMap.isEmpty(); };
    ImmutableKeySetForTreeMap.prototype.contains = function (item) { return this.treeMap.containsKey(item); };
    ImmutableKeySetForTreeMap.prototype.iterator = function () { return new TreeMapKeySetJIterator(this.treeMap); };
    ImmutableKeySetForTreeMap.prototype[Symbol.iterator] = function () { return new TreeMapKeySetIterator(this.treeMap); };
    return ImmutableKeySetForTreeMap;
}());
exports.ImmutableKeySetForTreeMap = ImmutableKeySetForTreeMap;
/* Java style iterator */
var TreeMapKeySetJIterator = /** @class */ (function () {
    function TreeMapKeySetJIterator(iTreeMap) {
        this.treeMap = iTreeMap;
    }
    TreeMapKeySetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var first = this.treeMap.firstKey();
            if (first === undefined)
                return false;
            if (first === null)
                return false;
            return true;
        }
        else {
            var tmp = this.treeMap.getNextHigherKey(this.location);
            if (tmp === null) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    TreeMapKeySetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var first = this.treeMap.firstKey();
            if (first === undefined) {
                return null;
            }
            else {
                this.location = first;
                return first;
            }
        }
        else {
            var tmp = this.treeMap.getNextHigherKey(this.location);
            if (tmp === null) {
                return null;
            }
            else {
                this.location = tmp;
                return tmp;
            }
        }
    };
    return TreeMapKeySetJIterator;
}());
exports.TreeMapKeySetJIterator = TreeMapKeySetJIterator;
/* TypeScript iterator */
var TreeMapKeySetIterator = /** @class */ (function () {
    function TreeMapKeySetIterator(iTreeMap) {
        this.treeMap = iTreeMap;
        this.location = this.treeMap.firstKey();
    }
    // tslint:disable-next-line:no-any
    TreeMapKeySetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location);
        this.location = this.treeMap.getNextHigherKey(this.location);
        return tmp;
    };
    return TreeMapKeySetIterator;
}());
exports.TreeMapKeySetIterator = TreeMapKeySetIterator;
var ImmutableEntrySetForTreeMap = /** @class */ (function () {
    function ImmutableEntrySetForTreeMap(iTreeMap) {
        this.treeMap = iTreeMap;
    }
    ImmutableEntrySetForTreeMap.prototype.size = function () { return this.treeMap.size(); };
    ImmutableEntrySetForTreeMap.prototype.isEmpty = function () { return this.treeMap.isEmpty(); };
    ImmutableEntrySetForTreeMap.prototype.contains = function (item) { return this.treeMap.containsKey(item.getKey()); };
    ImmutableEntrySetForTreeMap.prototype.iterator = function () { return new TreeMapEntrySetJIterator(this.treeMap); };
    ImmutableEntrySetForTreeMap.prototype[Symbol.iterator] = function () { return new TreeMapEntrySetIterator(this.treeMap); };
    return ImmutableEntrySetForTreeMap;
}());
exports.ImmutableEntrySetForTreeMap = ImmutableEntrySetForTreeMap;
/* Java style iterator */
var TreeMapEntrySetJIterator = /** @class */ (function () {
    function TreeMapEntrySetJIterator(iTreeMap) {
        this.treeMap = iTreeMap;
    }
    TreeMapEntrySetJIterator.prototype.hasNext = function () {
        if (this.location === undefined) {
            var first = this.treeMap.firstEntry();
            if (first === undefined)
                return false;
            if (first === null)
                return false;
            return true;
        }
        else {
            var tmp = this.treeMap.higherEntry(this.location.getKey());
            if (tmp === null) {
                return false;
            }
            else {
                return true;
            }
        }
    };
    TreeMapEntrySetJIterator.prototype.next = function () {
        if (this.location === undefined) {
            var first = this.treeMap.firstEntry();
            if (first === undefined) {
                return null;
            }
            else {
                this.location = first;
                return first;
            }
        }
        else {
            var tmp = this.treeMap.higherEntry(this.location.getKey());
            if (tmp === null) {
                return null;
            }
            else {
                this.location = tmp;
                return tmp;
            }
        }
    };
    return TreeMapEntrySetJIterator;
}());
exports.TreeMapEntrySetJIterator = TreeMapEntrySetJIterator;
/* TypeScript iterator */
var TreeMapEntrySetIterator = /** @class */ (function () {
    function TreeMapEntrySetIterator(iTreeMap) {
        this.treeMap = iTreeMap;
        this.location = this.treeMap.firstEntry();
    }
    // tslint:disable-next-line:no-any
    TreeMapEntrySetIterator.prototype.next = function (value) {
        if (this.location === null) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        if (this.location === undefined) {
            return new BasicIteratorResult_1.BasicIteratorResult(true, null);
        }
        var tmp = new BasicIteratorResult_1.BasicIteratorResult(false, this.location);
        this.location = this.treeMap.higherEntry(this.location.getKey());
        return tmp;
    };
    return TreeMapEntrySetIterator;
}());
exports.TreeMapEntrySetIterator = TreeMapEntrySetIterator;
