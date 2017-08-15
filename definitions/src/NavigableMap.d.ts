/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { SortedMap } from "./SortedMap";
import { MapEntry } from "./MapEntry";
export interface NavigableMap<K, V> extends SortedMap<K, V> {
    /**
    * Returns the first (lowest) key currently in this map.
    * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
    */
    firstKey(): K;
    /**
     * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
     * @return {MapEntry} an entry with the least key, or null if this map is empty
     */
    firstEntry(): MapEntry<K, V>;
    /**
     * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
     * @param {K} key the key
     * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
     */
    ceilingEntry(key: K): MapEntry<K, V>;
    /**
    * Returns the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than or equal to key, or null if there is no such key
    */
    ceilingKey(key: K): K;
    /**
    * Returns the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    higherKey(key: K): K;
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    higherEntry(key: K): MapEntry<K, V>;
    /**
    * Returns the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the highest key lower than key, or null if there is no such key
    */
    lowerKey(key: K): K;
    /**
    * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
    */
    lowerEntry(key: K): MapEntry<K, V>;
    /**
    * Returns the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {K} the greatest key less than or equal to key, or null if there is no such key
    */
    floorKey(key: K): K;
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    floorEntry(key: K): MapEntry<K, V>;
    /**
     * Returns the last (highest) key currently in this map.
     * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
     */
    lastKey(): K;
    /**
     * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    lastEntry(): MapEntry<K, V>;
}
