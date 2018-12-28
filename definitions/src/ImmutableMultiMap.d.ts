/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableSet } from "./ImmutableSet";
import { MapEntry } from "./MapEntry";
/**
 * A collection that maps keys to values, similar to Map, but in which each key may be associated with multiple values.
 *
 * This class corresponds to com.google.common.collect.ImmutableMultimap
 *
 */
export interface ImmutableMultiMap<K, V> {
    /**
    * Returns the number of key-value mappings in this MultiMap.
    * @return {number} the number of key-value mappings in this MultiMap
    */
    size(): number;
    /**
    * Returns an immutable collection of the values for the given key.
    * If no mappings in the MultiMap have the provided key, an empty immutable collection is returned.
    * The values are in the same order as the parameters used to build this MultiMap.
    * @param {K} key the key whose associated values are to be returned
    * @return {V} the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
    */
    get(key: K): ImmutableCollection<V>;
    /**
    * Returns the number of values in this MultiMap for this key
    * @param {K} key the key whose count of associated values are to be returned
    * @return {number} the number of values for this key in the MultiMap; possibly zero but never negative
    */
    count(key: K): number;
    /**
     * Returns true if this MultiMap contains one or more mappings for the specified key.
     * @param {K} key The key whose presence in this MultiMap is to be tested
     * @return {V} true if this MultiMap contains one or more mappings for the specified key.
     */
    containsKey(key: K): boolean;
    /**
    * Returns true if this MultiMap contains no key-value mappings.
    * @return {boolean} true if this MultiMap contains no key-value mappings
    */
    isEmpty(): boolean;
    /**
     * Returns an ImmutableSet view of the keys contained in this MultiMap.
     * The set is backed by the MultiMap, so changes to the MultiMap are reflected in the set.
     * If the MultiMap is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * @return {ImmutableSet<K>} the ImmutableSet
     */
    keySet(): ImmutableSet<K>;
    /**
     * Returns an ImmutableSet view of the mappings contained in this MultiMap.
     * The set is backed by the MultiMap, so changes to the MultiMap are reflected in the set.
     * If the MultiMap is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * The contains method on this entrySet will only compare keys not values.
     * @return {ImmutableSet<MapEntry<K,V>>} the Immutable Entry Set
     */
    entrySet(): ImmutableSet<MapEntry<K, V>>;
    /**
    * Returns an iterator over the entire entry set
    * @return {Iterator<K>} an iterator for the entry set
    */
    [Symbol.iterator](): Iterator<K>;
}
