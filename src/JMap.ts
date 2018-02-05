/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {ImmutableMap} from "./ImmutableMap";
import {ImmutableSet} from "./ImmutableSet";
import {MapEntry} from "./MapEntry";

export interface JMap<K,V> extends ImmutableMap<K,V> {
  /**
  * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  put (key:K, value:V) : V;

  /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  remove (key:K) : V;

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  clear () : void;

  /**
  * Returns an ImmutableMap backed by this Map
  */
  immutableMap () : ImmutableMap<K,V>;

}
