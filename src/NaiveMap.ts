/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {Collectable} from "./Collectable";
import {Comparator} from "./Comparator";
import {NavigableMap} from "./NavigableMap";

export class NaiveMapNode<K,V> {
  private key:K;
  private value:V;
  private leftNode:NaiveMapNode<K,V>;
  private rightNode:NaiveMapNode<K,V>;

  public constructor(iKey:K, iValue:V) {
    this.key = iKey;
    this.value = iValue;
    this.leftNode = null;
    this.rightNode = null;
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

  public getLeftNode(): NaiveMapNode<K,V> {
    return this.leftNode;
  }

  public setLeftNode(n:NaiveMapNode<K,V>): void {
    this.leftNode = n;
  }

  public getRightNode(): NaiveMapNode<K,V> {
    return this.rightNode;
  }

  public setRightNode(n:NaiveMapNode<K,V>): void {
    this.rightNode = n;
  }
}

export class NaiveMap<K,V> implements NavigableMap<K,V> {
  private topNode:NaiveMapNode<K,V>;
  private comparator:Comparator<K>;

  constructor(iComparator:Comparator<K>) {
    this.comparator = iComparator;
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

 private sizeTree (n:NaiveMapNode<K,V>):number {
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
      let newNode:NaiveMapNode<K,V> = new NaiveMapNode<K,V>(key, value);
      this.topNode = newNode;
      return null;
    }

    return this.putNode (this.topNode, key, value);
  }

  private putNode (node:NaiveMapNode<K,V>, key:K, value:V) : V {
    let comp:number = this.comparator.compare(key, node.getKey());
    if (comp === 0) {
      let tmpV:V = node.getValue();
      node.setValue(value);
      return tmpV;
    }

    if (comp < 0) { // This means that the new value is higher than the current node and belongs someplace on the right of the current node
      let nextNode: NaiveMapNode<K,V> = node.getRightNode();
      if (nextNode === null) {
        let newNode:NaiveMapNode<K,V> = new NaiveMapNode<K,V>(key, value);
        node.setRightNode(newNode);
        return null;
      } else {
        return this.putNode (nextNode, key, value);
      }
    } else {  // This means that the new value is lower than the current node and belongs someplace on the left of the current node
      let nextNode: NaiveMapNode<K,V> = node.getLeftNode();
      if (nextNode === null) {
        let newNode:NaiveMapNode<K,V> = new NaiveMapNode<K,V>(key, value);
        node.setLeftNode(newNode);
        return null;
      } else {
        return this.putNode (nextNode, key, value);
      }
    }
  }

 /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  public get (key:K) : V {
    return null;
  }



}
