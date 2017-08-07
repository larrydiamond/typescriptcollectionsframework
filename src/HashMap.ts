/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {ArrayList} from "./ArrayList";
import {BasicMapEntry} from "./BasicMapEntry";
import {Collectable} from "./Collectable";
import {Hashable} from "./Hashable";
import {JMap} from "./JMap";
import {List} from "./List";



export class HashMap<K extends Hashable,V> implements JMap<K,V> {
  private data:ArrayList<List<HashMapEntry<K,V>>> = null;
  private elementCount:number = 0;
  private loadFactor:number = 0.75;

  public constructor (private initialElements:JMap<K, V> = new HashMap<K,V>(null, 20, 0.75), private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.data = new ArrayList(iInitialCapacity);
    this.loadFactor = iLoadFactor;
    if (initialElements !== null) {
      // TODO
    }
  }

  /**
  * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
  */
  public put (key:K, value:V) : V {
    let mapEntry:HashMapEntry<K,V> = this.getMapEntry(key);
    if (mapEntry === null) {
      this.rehash();
      let hashCode:number = key.hashCode();
      let newNode:HashMapEntry<K,V> = new HashMapEntry<K,V> (key, value);
      newNode.setHashCode(hashCode);
      if (this.data.size() === 0) {
        let newList:List<HashMapEntry<K,V>> = new ArrayList<HashMapEntry<K,V>>();
        this.data.add (newList);
        newList.add (newNode);
        this.elementCount = this.elementCount + 1;
      } else {
        let bucket = hashCode % this.data.size();
        let thisList:List<HashMapEntry<K,V>> = this.data.get (bucket);
        thisList.add (newNode);
        this.elementCount = this.elementCount + 1;
      }
      return undefined;
    } else {
      let tmp:V = mapEntry.getValue();
      mapEntry.setValue(value);
      return tmp;
    }
  }

 /**
  * Rehashes the entire hashmap.... gonna be slow you've been warned
  */
  private rehash() : void {
    if ((this.elementCount * this.loadFactor) > this.data.size()) { // Not enough buckets
      // How many buckets should there be?   Lets go with doubling the number of buckets
      let newBucketCount = (this.elementCount * 2) + 1;
      let newdata:ArrayList<List<HashMapEntry<K,V>>> = new ArrayList<List<HashMapEntry<K,V>>>(newBucketCount);
      // Iterate through the nodes and add them all into newdata
      // TODO

      // this.data = this.newdata;
    }
  }

 /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    return this.elementCount;
  }

  /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  public get (key:K) : V {
    let tmp:HashMapEntry<K,V> = this.getMapEntry(key);
    if (tmp === null) return null;
    if (tmp === undefined) return null;
    return tmp.getValue();
  }

  private getMapEntry (key:K) : HashMapEntry<K,V> {
    if (this.data === null) return null;
    if (this.data === undefined) return null;
    if (this.data.size () < 1) return null;
    let hashCode:number = key.hashCode();
    let numBuckets = this.data.size();
    if (numBuckets < 1) numBuckets = 1;
    let bucket = hashCode % numBuckets;
    let thisList:List<HashMapEntry<K,V>> = this.data.get (bucket);
    for (let loop:number = 0; loop < thisList.size(); loop++) {
      if (key.equals (thisList.get(loop).getKey()))
        return thisList.get(loop);
    }
    return null;
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.data = new ArrayList<List<HashMapEntry<K,V>>>();
    this.elementCount = 0;
  }
}

class HashMapEntry<K,V> extends BasicMapEntry<K,V> {
  private hashCode:number;
  getHashCode():number {
    return this.hashCode;
  }
  setHashCode(iHashCode:number) {
    this.hashCode = iHashCode;
  }
  setValue (iValue:V) : void {
    this.value = iValue;
  }
}
