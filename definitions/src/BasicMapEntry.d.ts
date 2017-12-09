/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { MapEntry } from "./MapEntry";
export declare class BasicMapEntry<K, V> implements MapEntry<K, V> {
    private key;
    protected value: V;
    constructor(iKey: K, iValue: V);
    /**
     * Returns the key corresponding to this entry.
     * @return {K} the key corresponding to this entry
     */
    getKey(): K;
    /**
     * Returns the value corresponding to this entry. If the mapping has been removed from the backing map (by the iterator's remove operation), the results of this call are undefined.
     * @return {V} the value corresponding to this entry
     */
    getValue(): V;
}
