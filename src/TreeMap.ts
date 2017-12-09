/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {BasicIteratorResult} from "./BasicIteratorResult";
import {BasicMapEntry} from "./BasicMapEntry";
import {Comparator} from "./Comparator";
import {ImmutableMap} from "./ImmutableMap";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";
import {JMap} from "./JMap";
import {MapEntry} from "./MapEntry";
import {NavigableMap} from "./NavigableMap";

export class TreeMap<K,V> implements NavigableMap<K,V> {
  private topNode:TreeMapNode<K,V> = null;
  private mapComparator:Comparator<K> = null;

  constructor(iComparator:Comparator<K>, private initialElements:ImmutableMap<K, V> = null) {
    this.mapComparator = iComparator;
    if ((initialElements !== null) && (initialElements !== undefined)) {
      for (const iter = initialElements.entrySet().iterator(); iter.hasNext(); ) {
        const t:MapEntry<K,V> = iter.next ();
        this.put (t.getKey(), t.getValue());
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

  public validateMap() : boolean {
    if ((this.topNode === null) || (this.topNode === undefined)) {
      return true;
    }

    return this.validateNode (this.topNode);
  }

  private validateNode(node:TreeMapNode<K,V>) : boolean {
    const left:TreeMapNode<K,V> = node.getLeftNode();
    const right:TreeMapNode<K,V> = node.getRightNode();
    const thiskey:K = node.getKey();
    if (left !== null) {
      const leftkey:K = left.getKey();
      const comp:number = this.mapComparator.compare(thiskey, leftkey);
      if (comp < 0) // the key on the left should be either on the right or is this key
        return false;
      return this.validateNode (left);
    }

    if (right !== null) {
      const rightkey:K = right.getKey();
      const comp:number = this.mapComparator.compare(thiskey, rightkey);
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
   // if only this was enough :(
   // JavaScript memory management has problems when two objects have pointers to one another
   // In that case, the mark and sweep garbage collector is unable to collect either object
   // and we wind up with out of memory errors :(
   while ((this.topNode !== null) && (this.topNode !== undefined)) {
     this.remove (this.topNode.getKey());
   }
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

/**
 * Returns true if this map contains no key-value mappings.
 * @return {boolean} true if this map contains no key-value mappings
 */
 public isEmpty () : boolean {
   if (this.size() < 1) return true;
   return false;
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
      const newNode:TreeMapNode<K,V> = new TreeMapNode<K,V>(key, value, null);
      this.topNode = newNode;
      return null;
    }

    return this.putNode (this.topNode, key, value);
  }

  private putNode (node:TreeMapNode<K,V>, key:K, value:V) : V {
    const comp:number = this.mapComparator.compare(key, node.getKey());
    if (comp === 0) {
      const tmpV:V = node.getValue();
      node.setValue(value);
      return tmpV;
    }

    if (comp < 0) { // This means that the new value is lower than the current node and belongs someplace on the left of the current node
      const nextNode: TreeMapNode<K,V> = node.getLeftNode();
      if (nextNode === null) {
        const newNode:TreeMapNode<K,V> = new TreeMapNode<K,V>(key, value, node);
        // Can we do a minor rebalance of the bottom nodes of the tree?
        // if we are about to place a new node below a parent with no current children,
        // check to see if the the "grandparent" only has the one child and if so do a local rebalance
        if (node.getRightNode() === null) { // parent currently has no children
          const grandparent:TreeMapNode<K,V> = node.getParentNode();
          if (grandparent !== null) {
            if ((grandparent.getLeftNode () === node) && (grandparent.getRightNode () === null)) { // rebalance to make node parent of both grandparent and new node - left left left
              node.setLeftNode (newNode);
              node.setRightNode(grandparent);
              node.setParentNode(grandparent.getParentNode());
              grandparent.setLeftNode (null);
              grandparent.setRightNode (null);
              grandparent.setParentNode (node);
              if (grandparent === this.topNode) { // reorg top of tree
                // make node new parent with newnode as left node and grandparent as right node
                this.topNode = node;
              } else { // we're really checking the grandparent's parents but we already remapped above
                if (node.getParentNode().getLeftNode() === grandparent) node.getParentNode().setLeftNode(node);
                if (node.getParentNode().getRightNode() === grandparent) node.getParentNode().setRightNode(node);
              }
            } else { // TODO check to see if we have a right left left rebalance opportunity
              node.setLeftNode(newNode);
            }
          } else { // oh well we looked we tried
            node.setLeftNode(newNode);
          }
        } else { // oh well we looked we tried
          node.setLeftNode(newNode);
        }

        return null;
      } else {
        return this.putNode (nextNode, key, value);
      }
    } else {  // This means that the new value is higher than the current node and belongs someplace on the right of the current node
      const nextNode: TreeMapNode<K,V> = node.getRightNode();
      if (nextNode === null) {
        const newNode:TreeMapNode<K,V> = new TreeMapNode<K,V>(key, value, node);

        if (node.getLeftNode() === null) { // parent currently has no children
          const grandparent:TreeMapNode<K,V> = node.getParentNode();
          if (grandparent !== null) {
            if ((grandparent.getRightNode () === node) && (grandparent.getLeftNode () === null)) { // rebalance to make node parent of both grandparent and new node - right right right
              node.setRightNode (newNode);
              node.setLeftNode(grandparent);
              node.setParentNode(grandparent.getParentNode());
              grandparent.setRightNode (null);
              grandparent.setLeftNode (null);
              grandparent.setParentNode (node);
              if (grandparent === this.topNode) { // reorg top of tree
                // make node new parent with newnode as left node and grandparent as right node
                this.topNode = node;
              } else { // we're really checking the grandparent's parents but we already remapped above
                if (node.getParentNode().getLeftNode() === grandparent) node.getParentNode().setLeftNode(node);
                if (node.getParentNode().getRightNode() === grandparent) node.getParentNode().setRightNode(node);
              }
            } else { // TODO check to see if we have a left right right rebalance opportunity
              node.setRightNode(newNode);
            }
          } else { // oh well we looked we tried
            node.setRightNode(newNode);
          }
        } else { // oh well we looked we tried
          node.setRightNode(newNode);
        }

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

    const thisnode = this.getNode(this.topNode, key);
    if (thisnode === undefined) return null;
    if (thisnode === null) return null;

    const tmp:TreeMapNode<K,V> = this.nextHigherNode(thisnode);
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
    return tmp.getParentNode();
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
    const comp:number = this.mapComparator.compare(key, node.getKey());
    if (comp === 0)
      return node;

    if (comp < 0) { // This means that the new value is higher than the current node and belongs someplace on the right of the current node
      const nextNode: TreeMapNode<K,V> = node.getLeftNode();
      if (nextNode === null) {
        return null;
      } else {
        return this.getNode (nextNode, key);
      }
    } else {  // This means that the new value is lower than the current node and belongs someplace on the left of the current node
      const nextNode: TreeMapNode<K,V> = node.getRightNode();
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

    const tmp:TreeMapNode<K,V> = this.getNode (this.topNode, key);
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

    const tmp:TreeMapNode<K,V> = this.getNode (this.topNode, key);
    if (tmp === null) {
      return null;
    }

    const parent:TreeMapNode<K,V> = tmp.getParentNode();
    const left:TreeMapNode<K,V> = tmp.getLeftNode();
    const right:TreeMapNode<K,V> = tmp.getRightNode();

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
        left.setParentNode(parent);

        let parentOfRight:TreeMapNode<K,V> = tmp.getLeftNode();
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
  }

 /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingEntry (key:K) : MapEntry<K,V> {
    if (this.topNode === null) return null;

    if (this.topNode === undefined) return null;

    const tmp = this.ceilingNode(this.topNode, key, null);
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

    const tmp = this.ceilingNode(this.topNode, key, null);
    if (tmp === null) return null;
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

    const tmp = this.higherNode(this.topNode, key, null);
    if (tmp === null) return null;
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

    const tmp = this.higherNode(this.topNode, key, null);
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

    const tmp = this.lowerNode(this.topNode, key, null);
    if (tmp === null) return null;
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

    const tmp = this.lowerNode(this.topNode, key, null);
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

    const tmp = this.floorNode(this.topNode, key, null);
    if (tmp === null) return null;
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

    const tmp = this.floorNode(this.topNode, key, null);
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
      return this.lowerNode (node.getRightNode(), key, node);
    } else {
      return this.lowerNode (node.getRightNode(), key, currentBest);
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
      return this.floorNode (node.getRightNode(), key, node);
    }

    tmp = this.mapComparator.compare (node.getKey(), currentBest.getKey());
    if (tmp > 0) { // this node is lower than the current best
      return this.floorNode (node.getRightNode(), key, node);
    } else {
      return this.floorNode (node.getRightNode(), key, currentBest);
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
    while ((node.getLeftNode() !== null) && (node.getLeftNode() !== undefined)) {
      node = node.getLeftNode();
    }

    return node;
  }

 /**
  * Returns the first (lowest) key currently in this map.
  * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
  */
  public firstKey () : K {
    const node:TreeMapNode<K,V> = this.firstMapNode();
    if ((node === null) || (node === undefined))
      return null;
    return node.getKey();
  }

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  public firstEntry () : MapEntry<K,V> {
    const node:TreeMapNode<K,V> = this.firstMapNode();
    if ((node === null) || (node === undefined))
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
    while ((node.getRightNode() !== null) && (node.getRightNode() !== undefined)) {
      node = node.getRightNode();
    }

    return node;
  }

 /**
  * Returns the last (highest) key currently in this map.
  * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
  */
  public lastKey () : K {
    const node:TreeMapNode<K,V> = this.lastMapNode();
    if ((node === null) || (node === undefined))
      return null;
    return node.getKey();
  }

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public lastEntry () : MapEntry<K,V> {
    const node:TreeMapNode<K,V> = this.lastMapNode();
    if ((node === null) || (node === undefined))
      return null;
    return node.getMapEntry();
  }

 /**
  * Returns an ImmutableSet view of the keys contained in this map.
  * The set's iterator returns the keys in ascending order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public keySet () : ImmutableSet<K> {
    return new ImmutableKeySetForTreeMap (this);
  }

 /**
  * Returns an ImmutableSet view of the mappings contained in this map.
  * The set's iterator returns the mappings in ascending key order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * The contains method on this entrySet will only compare keys not values.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public entrySet () : ImmutableSet<MapEntry<K,V>> {
    return new ImmutableEntrySetForTreeMap(this);
  }

  /**
  * Returns an ImmutableMap backed by Map
  */
  public immutableMap () : ImmutableMap<K,V> {
    return this;
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

export class ImmutableKeySetForTreeMap<K,V> implements ImmutableSet<K> {
  private treeMap:TreeMap<K,V>;
  constructor(iTreeMap:TreeMap<K,V>) {
    this.treeMap = iTreeMap;
  }

  public size():number { return this.treeMap.size(); }

  public isEmpty():boolean { return this.treeMap.isEmpty(); }

  public contains(item:K) : boolean { return this.treeMap.containsKey (item); }

  public iterator():JIterator<K> { return new TreeMapKeySetJIterator(this.treeMap); }

  public [Symbol.iterator] ():Iterator<K> { return new TreeMapKeySetIterator (this.treeMap); }
}


/* Java style iterator */
export class TreeMapKeySetJIterator<K,V> implements JIterator<K> {
  private location:K;
  private treeMap:TreeMap<K,V>;

  constructor(iTreeMap:TreeMap<K,V>) {
    this.treeMap = iTreeMap;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const first:K = this.treeMap.firstKey();
      if (first === undefined)
        return false;
      if (first === null)
        return false;
      return true;
    } else { // we've already called this iterator before
      const tmp:K = this.treeMap.getNextHigherKey(this.location);
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():K {
    if (this.location === undefined) { // first time caller
      const first:K = this.treeMap.firstKey();
      if (first === undefined) {
        return null;
      } else {
        this.location = first;
        return first;
      }
    } else { // we've already called this iterator before
      const tmp:K = this.treeMap.getNextHigherKey(this.location);
      if (tmp === null) {
        return null;
      } else {
        this.location = tmp;
        return tmp;
      }
    }
  }
}

/* TypeScript iterator */
export class TreeMapKeySetIterator<K,V> implements Iterator<K> {
  private location:K;
  private treeMap:TreeMap<K,V>;

  constructor(iTreeMap:TreeMap<K,V>) {
    this.treeMap = iTreeMap;
    this.location = this.treeMap.firstKey();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<K> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<K> = new BasicIteratorResult (false, this.location);
    this.location = this.treeMap.getNextHigherKey(this.location);
    return tmp;
  }
}



export class ImmutableEntrySetForTreeMap<K,V> implements ImmutableSet<MapEntry<K,V>> {
  private treeMap:TreeMap<K,V>;
  constructor(iTreeMap:TreeMap<K,V>) {
    this.treeMap = iTreeMap;
  }

  public size():number { return this.treeMap.size(); }

  public isEmpty():boolean { return this.treeMap.isEmpty(); }

  public contains(item:MapEntry<K,V>) : boolean { return this.treeMap.containsKey (item.getKey()); }

  public iterator():JIterator<MapEntry<K,V>> { return new TreeMapEntrySetJIterator(this.treeMap); }

  public [Symbol.iterator] ():Iterator<MapEntry<K,V>> { return new TreeMapEntrySetIterator (this.treeMap); }
}


/* Java style iterator */
export class TreeMapEntrySetJIterator<K,V> implements JIterator<MapEntry<K,V>> {
  private location:MapEntry<K,V>;
  private treeMap:TreeMap<K,V>;

  constructor(iTreeMap:TreeMap<K,V>) {
    this.treeMap = iTreeMap;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const first:MapEntry<K,V> = this.treeMap.firstEntry();
      if (first === undefined)
        return false;
      if (first === null)
        return false;
      return true;
    } else { // we've already called this iterator before
      const tmp:MapEntry<K,V> = this.treeMap.higherEntry(this.location.getKey());
      if (tmp === null) {
        return false;
      } else {
        return true;
      }
    }
  }

  public next():MapEntry<K,V> {
    if (this.location === undefined) { // first time caller
      const first:MapEntry<K,V> = this.treeMap.firstEntry();
      if (first === undefined) {
        return null;
      } else {
        this.location = first;
        return first;
      }
    } else { // we've already called this iterator before
      const tmp:MapEntry<K,V> = this.treeMap.higherEntry(this.location.getKey());
      if (tmp === null) {
        return null;
      } else {
        this.location = tmp;
        return tmp;
      }
    }
  }
}

/* TypeScript iterator */
export class TreeMapEntrySetIterator<K,V> implements Iterator<MapEntry<K,V>> {
  private location:MapEntry<K,V>;
  private treeMap:TreeMap<K,V>;

  constructor(iTreeMap:TreeMap<K,V>) {
    this.treeMap = iTreeMap;
    this.location = this.treeMap.firstEntry();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<MapEntry<K,V>> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<MapEntry<K,V>> = new BasicIteratorResult (false, this.location);
    this.location = this.treeMap.higherEntry(this.location.getKey());
    return tmp;
  }
}
