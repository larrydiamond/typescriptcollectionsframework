/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {ImmutableMultiMap} from "./ImmutableMultiMap";

export interface MultiMap<K,V> extends ImmutableMultiMap<K,V> {
  /**
  * Associates the specified value with the specified key in this MultiMap.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {boolean} true if the method increased the size of the MultiMap
  */
  put (key:K, value:V) : boolean;

  /**
  * Removes all of the mappings from this MultiMap. The MultiMap will be empty after this call returns.
  */
  clear () : void;

  /**
  * Removes all the mapping for this key from this MultiMap if present.
  * @param {K} key key for which mappings should be removed
  */
  removeAll (key:K) : void;

  /**
  * Returns an ImmutableMultiMap backed by this MultiMap
  */
  immutableMultiMap () : ImmutableMultiMap<K,V>;


}
