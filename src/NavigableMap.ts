/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {SortedMap} from "./SortedMap";
import {MapEntry} from "./MapEntry";

export interface NavigableMap<K,V> extends SortedMap<K,V> {

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  firstEntry () : MapEntry<K,V>;

}
