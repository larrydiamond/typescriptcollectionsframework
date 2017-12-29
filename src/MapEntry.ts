/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

/**
 * A map entry (key-value pair).
 *
 * The behavior of a map entry is undefined if the backing map has been modified after the entry was obtained.
 *
 * This interface corresponds to java.util.Map.Entry
 */
export interface MapEntry<K,V> {
  /**
  * Returns the key corresponding to this entry.
  * @return {K} the key corresponding to this entry
  */
  getKey () : K;

  /**
  * Returns the value corresponding to this entry. If the mapping has been removed from the backing map (by the iterator's remove operation), the results of this call are undefined.
  * @return {V} the value corresponding to this entry
  */
  getValue () : V;

  setValue(value:V): void;
}
