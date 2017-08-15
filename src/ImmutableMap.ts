/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

export interface ImmutableMap<K,V> {
  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  size () : number;

  /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  get (key:K) : V;

 /**
  * Returns true if this map contains a mapping for the specified key.
  * @param {K} key The key whose presence in this map is to be tested
  * @return {V} true if this map contains a mapping for the specified key.
  */
  containsKey (key:K) : boolean;

 /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  isEmpty () : boolean;
}
