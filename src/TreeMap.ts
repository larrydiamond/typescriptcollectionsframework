/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {BasicMapEntry} from "./BasicMapEntry";
import {Comparator} from "./Comparator";
import {MapEntry} from "./MapEntry";
import {NavigableMap} from "./NavigableMap";

export class TreeMap<K,V> implements NavigableMap<K,V> {
  private topNode:TreeMapNode<K,V> = null;
  private mapComparator:Comparator<K> = null;

  constructor(iComparator:Comparator<K>) {
    this.mapComparator = iComparator;
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
    console.log ("New Tree: size = " + this.size());
    this.printMapNode (this.topNode);
    console.log ("End of Tree");
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

  public validateMap() : boolean {
    if ((this.topNode === null) || (this.topNode === undefined)) {
      return true;
    }

    return this.validateNode (this.topNode);
  }

  private validateNode(node:TreeMapNode<K,V>) : boolean {
    let left:TreeMapNode<K,V> = node.getLeftNode();
    let right:TreeMapNode<K,V> = node.getRightNode();
    let thiskey:K = node.getKey();
    if (left !== null) {
      let leftkey:K = left.getKey();
      let comp:number = this.mapComparator.compare(thiskey, leftkey);
      if (comp < 0) // the key on the left should be either on the right or is this key
        return false;
      return this.validateNode (left);
    }

    if (right !== null) {
      let rightkey:K = right.getKey();
      let comp:number = this.mapComparator.compare(thiskey, rightkey);
      if (comp > 0) // the key on the right should be either on the left or is this key
        return false;
      return this.validateNode (right);
    }

    return true;
  }

/**
 * Removes all of the mappings from this map. The map will be empty after this call returns.
 */
 public clear () : void {
   this.topNode = null;
}

/**
 * Returns the comparator used to order the keys in this map
 * @return {Comparator} the comparator used to order the keys in this map
 */
 public comparator () : Comparator<K> {
   return this.mapComparator;
}

/**
* Returns the number of key-value mappings in this map.
* @return {number} the number of key-value mappings in this map
*/
public size () : number {
   if (this.topNode === null)
     return 0;

   if (this.topNode === undefined)
     return 0;

   return this.sizeTree (this.topNode.getLeftNode()) + this.sizeTree (this.topNode.getRightNode()) + 1;
 }

 private sizeTree (n:TreeMapNode<K,V>):number {
   if (n === null)
     return 0;

   if (n === undefined)
     return 0;

   return this.sizeTree (n.getLeftNode()) + this.sizeTree (n.getRightNode()) + 1;
 }

/**
 * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
 * @param {K} key key with which the specified value is to be associated
 * @param {V} value value to be associated with the specified key
 * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
 */
  public put (key:K, value:V) : V {
    if ((this.topNode === null) || (this.topNode === undefined)) {
      let newNode:TreeMapNode<K,V> = new TreeMapNode<K,V>(key, value, null);
      this.topNode = newNode;
      return null;
    }

    return this.putNode (this.topNode, key, value);
  }

  private putNode (node:TreeMapNode<K,V>, key:K, value:V) : V {
    let comp:number = this.mapComparator.compare(key, node.getKey());
    if (comp === 0) {
      let tmpV:V = node.getValue();
      node.setValue(value);
      return tmpV;
    }

    if (comp < 0) { // This means that the new value is lower than the current node and belongs someplace on the left of the current node
      let nextNode: TreeMapNode<K,V> = node.getLeftNode();
      if (nextNode === null) {
        let newNode:TreeMapNode<K,V> = new TreeMapNode<K,V>(key, value, node);
        node.setLeftNode(newNode);
        return null;
      } else {
        return this.putNode (nextNode, key, value);
      }
    } else {  // This means that the new value is higher than the current node and belongs someplace on the right of the current node
      let nextNode: TreeMapNode<K,V> = node.getRightNode();
      if (nextNode === null) {
        let newNode:TreeMapNode<K,V> = new TreeMapNode<K,V>(key, value, node);
        node.setRightNode(newNode);
        return null;
      } else {
        return this.putNode (nextNode, key, value);
      }
    }
  }

 /**
  * Needed For Iterator
  * @param {K} key the given key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public getNextHigherKey (key:K) : K {
    if ((this.topNode === null) || (this.topNode === undefined)) {
      return null;
    }

    let thisnode = this.getNode(this.topNode, key);
    if (thisnode === undefined) return null;
    if (thisnode === null) return null;

    let tmp:TreeMapNode<K,V> = this.nextHigherNode(thisnode);
    if (tmp === null) return null;
    return tmp.getKey();
  }

  private nextHigherNode (node:TreeMapNode<K,V>) : TreeMapNode<K,V> {
    // if there is a right child to this node, return the leftmost child of that node
    // If there is no parent node and no right child node then there's no next node and return null
    // If I am the left child of my parent node and I have no right child then my parent node is the next node
    // If I am the right child of my parent node, keep recursing up nodes until null or I find a node of which I am a left child of and return that node
    // Got all that?

    // if there is a right child to this node, return the leftmost child of that node
    if (node.getRightNode() !== null) {
      let child:TreeMapNode<K,V> = node.getRightNode();
      while (child.getLeftNode() !== null) {
        child = child.getLeftNode();
      }
      return child;
    }

    // If there is no parent node and no right child node then there's no next node and return null
    if (node.getParentNode() === null) {  // if there's a right child that was handled above
      return null;
    }

    // If I am the left child of my parent node and I have no right child then my parent node is the next node
    if (node.getParentNode().getLeftNode() === node) {
      return node.getParentNode();
    }

    // If I am the right child of my parent node, keep recursing up nodes until null or I find a node of which I am a left child of and return that node
    let tmp:TreeMapNode<K,V> = node.getParentNode();
    while ((tmp !== null) && (tmp.getParentNode() !== null) && (tmp.getParentNode().getRightNode() === tmp)) {
      tmp = tmp.getParentNode();
    }
    if (tmp.getParentNode() === null) return null;
    return tmp;
  }

 /**
  * Returns true if this map contains a mapping for the specified key.   This method uses the comparator for the map to find the specified key
  * @param {K} key key whose presence in this map is to be tested
  * @return {boolean} true if this map contains a mapping for the specified key
  */
  public containsKey (key:K) : boolean {
    if ((this.topNode === null) || (this.topNode === undefined))
      return false;

    if (this.getNode (this.topNode, key) === null)
      return false;

    return true;
  }

  private getNode (node:TreeMapNode<K,V>, key:K) : TreeMapNode<K,V> {
    let comp:number = this.mapComparator.compare(key, node.getKey());
    if (comp === 0)
      return node;

    if (comp < 0) { // This means that the new value is higher than the current node and belongs someplace on the right of the current node
      let nextNode: TreeMapNode<K,V> = node.getLeftNode();
      if (nextNode === null) {
        return null;
      } else {
        return this.getNode (nextNode, key);
      }
    } else {  // This means that the new value is lower than the current node and belongs someplace on the left of the current node
      let nextNode: TreeMapNode<K,V> = node.getRightNode();
      if (nextNode === null) {
        return null;
      } else {
        return this.getNode (nextNode, key);
      }
    }
  }

 /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  public get (key:K) : V {
    if ((this.topNode === null) || (this.topNode === undefined))
      return null;

    let tmp:TreeMapNode<K,V> = this.getNode (this.topNode, key);
    if (tmp === null)
      return null;

    return tmp.getValue();
  }

 /**
  * Removes the mapping for this key from this TreeMap if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public remove (key:K) : V {
    if ((this.topNode === null) || (this.topNode === undefined))
      return null;

    let tmp:TreeMapNode<K,V> = this.getNode (this.topNode, key);
    if (tmp === null) {
      return null;
    }

    let parent:TreeMapNode<K,V> = tmp.getParentNode();
    let left:TreeMapNode<K,V> = tmp.getLeftNode();
    let right:TreeMapNode<K,V> = tmp.getRightNode();

    if (tmp.getLeftNode() === null) { // nothing to the left
      if (tmp.getRightNode() === null) { // nothing to the right
        // close up this wing of the tree, nothing to see here
        if (parent === null) { // if theres no parent then this is the root node of the Tree
          this.topNode = null;
        } else {
          if (parent.getLeftNode() === tmp) {
            parent.setLeftNode(null);
          } else {
            parent.setRightNode(null);
          }
        }
      } else {  // there are nodes to the right but not to the left
        right.setParentNode(parent);
        if (parent === null) {
          this.topNode = right;
        } else {
          if (parent.getLeftNode() === tmp) {
            parent.setLeftNode(right);
          } else {
            parent.setRightNode(right);
          }
        }
      }
    } else {  // there are nodes to the left
      if (right === null) { // there are nodes to the left but not to the right
        left.setParentNode(parent);
        if (parent === null) {
          this.topNode = left;
        } else {
          if (parent.getLeftNode() === tmp) {
            parent.setLeftNode(left);
          } else {
            parent.setRightNode(left);
          }
        }
      } else {  // there are nodes to the left and to the right
        // Horrific unbalancing about to occur here, please avert your eyes until the Red Black stuff comes

        // Make the Left node the new parent
        // Move the right node to the right of the rightmost node under the left node
        if (parent === null) {
          this.topNode = left;
        } else {
          if (parent.getLeftNode() === tmp) {
            parent.setLeftNode(left);
          } else {
            parent.setRightNode(left);
          }
        }

        let parentOfRight:TreeMapNode<K,V> = tmp.getLeftNode();
        while (parentOfRight.getRightNode() !== null)
          parentOfRight = parentOfRight.getRightNode();
        parentOfRight.setRightNode(right);
        right.setParentNode(parentOfRight);
      }
    }

    return tmp.getValue();
  }

 /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingEntry (key:K) : MapEntry<K,V> {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.ceilingNode(this.topNode, key, null);
    if (tmp === null) return null;
    return tmp.getMapEntry();
  }

  /**
  * Returns the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingKey (key:K) : K {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.ceilingNode(this.topNode, key, null);
    return tmp.getKey();
  }

  /**
  * Returns the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public higherKey (key:K) : K {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.higherNode(this.topNode, key, null);
    return tmp.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public higherEntry (key:K) : MapEntry<K,V> {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.higherNode(this.topNode, key, null);
    if (tmp === null) return null;
    return tmp.getMapEntry();
  }

  /**
  * Returns the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the highest key lower than key, or null if there is no such key
  */
  public lowerKey (key:K) : K {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.lowerNode(this.topNode, key, null);
    return tmp.getKey();
  }

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  public lowerEntry (key:K) : MapEntry<K,V> {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.lowerNode(this.topNode, key, null);
    if (tmp === null) return null;
    return tmp.getMapEntry();
  }

  /**
  * Returns the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the greatest key less than or equal to key, or null if there is no such key
  */
  public floorKey (key:K) : K {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.floorNode(this.topNode, key, null);
    return tmp.getKey();
  }

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  public floorEntry (key:K) : MapEntry<K,V> {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    let tmp = this.floorNode(this.topNode, key, null);
    if (tmp === null) return null;
    return tmp.getMapEntry();
  }

  private ceilingNode (node:TreeMapNode<K,V>, key:K, currentBest:TreeMapNode<K,V>) : TreeMapNode<K,V> {
    if (node === null) {
      return currentBest;
    }
    if (node === undefined) {
      return currentBest;
    }
    let tmp = this.mapComparator.compare(node.getKey(), key);
    if (tmp === 0) {
      return node;
    }
    if (tmp < 0) { // too low, below key
      return this.ceilingNode(node.getRightNode(), key, currentBest);
    }

    // above key
    if (currentBest === null) { // no best node found yet
      return this.ceilingNode (node.getLeftNode(), key, node);
    }

    tmp = this.mapComparator.compare (node.getKey(), currentBest.getKey());
    if (tmp > 0) { // this node is higher than the current best
      return this.ceilingNode (node.getLeftNode(), key, currentBest);
    } else {
      return this.ceilingNode (node.getLeftNode(), key, node);
    }
  }

  private higherNode (node:TreeMapNode<K,V>, key:K, currentBest:TreeMapNode<K,V>) : TreeMapNode<K,V> {
    if (node === null) {
      return currentBest;
    }
    if (node === undefined) {
      return currentBest;
    }
    let tmp = this.mapComparator.compare(node.getKey(), key);
    if (tmp === 0) { // looking for a higher key
      return this.higherNode(node.getRightNode(), key, currentBest);
    }

    if (tmp < 0) { // too low, below key
      return this.higherNode(node.getRightNode(), key, currentBest);
    }

    // above key
    if (currentBest === null) { // no best node found yet
      return this.higherNode (node.getLeftNode(), key, node);
    }

    tmp = this.mapComparator.compare (node.getKey(), currentBest.getKey());
    if (tmp > 0) { // this node is higher than the current best
      return this.higherNode (node.getLeftNode(), key, currentBest);
    } else {
      return this.higherNode (node.getLeftNode(), key, node);
    }
  }

  private lowerNode (node:TreeMapNode<K,V>, key:K, currentBest:TreeMapNode<K,V>) : TreeMapNode<K,V> {
    if (node === null) {
      return currentBest;
    }
    if (node === undefined) {
      return currentBest;
    }
    let tmp = this.mapComparator.compare(node.getKey(), key);
    if (tmp === 0) { // looking for a lower key
      return this.lowerNode(node.getLeftNode(), key, currentBest);
    }

    if (tmp > 0) { // too high, above key
      return this.lowerNode(node.getLeftNode(), key, currentBest);
    }

    // above key
    if (currentBest === null) { // no best node found yet
      return this.lowerNode (node.getRightNode(), key, node);
    }

    tmp = this.mapComparator.compare (node.getKey(), currentBest.getKey());
    if (tmp > 0) { // this node is lower than the current best
      return this.lowerNode (node.getRightNode(), key, currentBest);
    } else {
      return this.lowerNode (node.getRightNode(), key, node);
    }
  }

  private floorNode (node:TreeMapNode<K,V>, key:K, currentBest:TreeMapNode<K,V>) : TreeMapNode<K,V> {
    if (node === null) {
      return currentBest;
    }
    if (node === undefined) {
      return currentBest;
    }
    let tmp = this.mapComparator.compare(node.getKey(), key);
    if (tmp === 0) {
      return node;
    }

    if (tmp > 0) { // too high, above key
      return this.floorNode(node.getLeftNode(), key, currentBest);
    }

    // above key
    if (currentBest === null) { // no best node found yet
      return this.floorNode (node.getLeftNode(), key, node);
    }

    tmp = this.mapComparator.compare (node.getKey(), currentBest.getKey());
    if (tmp > 0) { // this node is lower than the current best
      return this.floorNode (node.getRightNode(), key, currentBest);
    } else {
      return this.floorNode (node.getRightNode(), key, node);
    }
  }

 /**
  * Returns the first (lowest) node currently in this map.
  * @return {TreeMapNode} the first (lowest) node currently in this map, returns null if the Map is empty
  */
  private firstMapNode () : TreeMapNode<K,V> {
    if (this.topNode === null)
      return null;

    if (this.topNode === undefined)
      return null;

    let node:TreeMapNode<K,V> = this.topNode;
    while (node.getLeftNode() !== null) {
      node = node.getLeftNode();
    }

    return node;
  }

 /**
  * Returns the first (lowest) key currently in this map.
  * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
  */
  public firstKey () : K {
    let node:TreeMapNode<K,V> = this.firstMapNode();
    if (node === null)
      return null;
    return node.getKey();
  }

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  public firstEntry () : MapEntry<K,V> {
    let node:TreeMapNode<K,V> = this.firstMapNode();
    if (node === null)
      return null;
    return node.getMapEntry();
  }

  /**
  * Returns the last (highest) node currently in this map.
  * @return {TreeMapNode} the last (highest) node currently in this map, returns null if the Map is empty
  */
  private lastMapNode () : TreeMapNode<K,V> {
    if (this.topNode === null)
      return null;

    if (this.topNode === undefined)
      return null;

    let node:TreeMapNode<K,V> = this.topNode;
    while (node.getRightNode() !== null) {
      node = node.getRightNode();
    }

    return node;
  }

 /**
  * Returns the last (highest) key currently in this map.
  * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
  */
  public lastKey () : K {
    let node:TreeMapNode<K,V> = this.lastMapNode();
    if (node === null)
      return null;
    return node.getKey();
  }

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public lastEntry () : MapEntry<K,V> {
    let node:TreeMapNode<K,V> = this.lastMapNode();
    if (node === null)
      return null;
    return node.getMapEntry();
  }

}

export class TreeMapNode<K,V> {
  private key:K;
  private value:V;
  private leftNode:TreeMapNode<K,V>;
  private rightNode:TreeMapNode<K,V>;
  private parentNode:TreeMapNode<K,V>;

  public constructor(iKey:K, iValue:V, iParent:TreeMapNode<K,V>) {
    this.key = iKey;
    this.value = iValue;
    this.leftNode = null;
    this.rightNode = null;
    this.parentNode = iParent;
  }

  public getKey ():K {
    return this.key;
  }

  public getValue ():V {
    return this.value;
  }

  public setValue (v:V): void {
    this.value = v;
  }

  public getLeftNode(): TreeMapNode<K,V> {
    return this.leftNode;
  }

  public setLeftNode(n:TreeMapNode<K,V>): void {
    this.leftNode = n;
  }

  public getRightNode(): TreeMapNode<K,V> {
    return this.rightNode;
  }

  public setRightNode(n:TreeMapNode<K,V>): void {
    this.rightNode = n;
  }

  public getParentNode(): TreeMapNode<K,V> {
    return this.parentNode;
  }

  public setParentNode(n:TreeMapNode<K,V>): void {
    this.parentNode = n;
  }

  public getMapEntry(): MapEntry<K,V> {
    return new BasicMapEntry(this.key, this.value);
  }
}
