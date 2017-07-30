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



export class HashMap<K extends Hashable,V> implements JMap<K,V> {
  private data:ArrayList<ArrayList<HashMapEntry<K,V>>> = null;

  public constructor () {
    this.data = new ArrayList();
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
      let hashCode:number = key.hashCode();



      return null; // TODO

    } else {
      let tmp:V = mapEntry.getValue();
      mapEntry.setValue(value);
      return tmp;
    }
  }

  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    let tmp:number = 0;

    return tmp; // TODO
  }

  /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  public get (key:K) : V {
    let hashCode:number = key.hashCode();
    return null; // TODO
  }

  private getMapEntry (key:K) : HashMapEntry<K,V> {
    return null; // TODO
  }
}

class HashMapEntry<K,V> extends BasicMapEntry<K,V> {
  setValue (iValue:V) : void {
    this.value = iValue;
  }
}
