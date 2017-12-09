/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { ImmutableMap } from "./ImmutableMap";
import { ImmutableSet } from "./ImmutableSet";
import { MapEntry } from "./MapEntry";
export interface JMap<K, V> extends ImmutableMap<K, V> {
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    put(key: K, value: V): V;
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    remove(key: K): V;
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    clear(): void;
    /**
     * Returns an ImmutableSet view of the mappings contained in this map.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * The contains method on this entrySet will only compare keys not values.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    entrySet(): ImmutableSet<MapEntry<K, V>>;
    /**
    * Returns an ImmutableMap backed by this Map
    */
    immutableMap(): ImmutableMap<K, V>;
}
