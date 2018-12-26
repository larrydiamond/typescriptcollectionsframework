/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {MapEntry} from "./MapEntry";
import {Collections} from "./Collections";

/**
 * A map entry (key-value pair). 
 * 
 * The Map.entrySet method returns a collection-view of the map, whose elements are of this class. 
 * 
 * The only way to obtain a reference to a map entry is from the iterator of this collection-view. 
 * 
 * These MapEntry objects are valid only for the duration of the iteration; more formally, 
 * the behavior of a map entry is undefined if the backing map has been modified after the entry 
 * was returned by the iterator, except through the setValue operation on the map entry.
 * 
 * BasicMapEntry is immutable once constructed.   Mutability is provided via the Map implementation.
 */
export class BasicMapEntry<K,V> implements MapEntry<K,V> {
  protected key:K;
  protected value:V; // needed for HashMapEntry so I can set the value

  constructor(iKey:K, iValue:V) {
    this.key = iKey;
    this.value = iValue;
  }

 /**
  * Returns the key corresponding to this entry.
  * 
  * @return {K} the key corresponding to this entry
  */
  public getKey () : K {
    return this.key;
  }

 /**
  * Returns the value corresponding to this entry. 
  * 
  * If the mapping has been removed from the backing map (by the iterator's remove operation), 
  * the results of this call are undefined.
  * 
  * @return {V} the value corresponding to this entry
  */
  public getValue () : V {
    return this.value;
  }

  public toString () : string {
    return JSON.stringify(this.getKey()) + " " + JSON.stringify(this.getValue());
  }

}
