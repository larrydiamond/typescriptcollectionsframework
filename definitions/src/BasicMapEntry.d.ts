/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import { MapEntry } from "./MapEntry";
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
export declare class BasicMapEntry<K, V> implements MapEntry<K, V> {
    protected key: K;
    protected value: V;
    constructor(iKey: K, iValue: V);
    /**
     * Returns the key corresponding to this entry.
     *
     * @return {K} the key corresponding to this entry
     */
    getKey(): K;
    /**
     * Returns the value corresponding to this entry.
     *
     * If the mapping has been removed from the backing map (by the iterator's remove operation),
     * the results of this call are undefined.
     *
     * @return {V} the value corresponding to this entry
     */
    getValue(): V;
    toString(): string;
}
