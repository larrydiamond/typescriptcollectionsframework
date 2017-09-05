/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {MapEntry} from "./MapEntry";

export class BasicMapEntry<K,V> implements MapEntry<K,V> {
  private key:K;
  protected value:V; // needed for HashMapEntry so I can set the value

  constructor(iKey:K, iValue:V) {
    this.key = iKey;
    this.value = iValue;
  }

 /**
  * Returns the key corresponding to this entry.
  * @return {K} the key corresponding to this entry
  */
  getKey () : K {
    return this.key;
  }

 /**
  * Returns the value corresponding to this entry. If the mapping has been removed from the backing map (by the iterator's remove operation), the results of this call are undefined.
  * @return {V} the value corresponding to this entry
  */
  getValue () : V {
    return this.value;
  }
  
}
