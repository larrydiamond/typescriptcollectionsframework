/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {MapEntry} from "./MapEntry";
import {Collections} from "./Collections";

export class BasicMapEntry<K,V> implements MapEntry<K,V> {
  private key:K;
  protected value:V; // needed for HashMapEntry so I can set the value
  private next: BasicMapEntry<K,V>;
  protected hash: number;

  constructor(iKey:K, iValue:V, hash?:number, next?:BasicMapEntry<K,V>) {
    this.key = iKey;
    this.value = iValue;
    this.next = next;
    this.hash = hash;
  }

 /**
  * Returns the key corresponding to this entry.
  * @return {K} the key corresponding to this entry
  */
  public getKey () : K {
    return this.key;
  }

 /**
  * Returns the value corresponding to this entry. If the mapping has been removed from the backing map (by the iterator's remove operation), the results of this call are undefined.
  * @return {V} the value corresponding to this entry
  */
  public getValue () : V {
    return this.value;
  }

  public setValue(value:any): void {
    this.value = value;

  }

  public equals (o: any) {
    if (o === undefined || o === null) {
        return false;
    }
    if (JSON.stringify(o) === JSON.stringify(this.key))
      return true;
    return false;
  }

  public hashCode () : number {
     return (this.key === null || this.key === undefined ? 0 : 
        Collections.getHashCodeForString(JSON.stringify(this.key))); 
  }

  public toString () : string {
    return JSON.stringify(this.getKey()) + " " + JSON.stringify(this.getValue()); 
  }

}
