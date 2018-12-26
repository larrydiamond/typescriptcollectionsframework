/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {ImmutableMap} from "./ImmutableMap";
import {JMap} from "./JMap";
import {MapEntry} from "./MapEntry";

/**
 * A Map that further provides a total ordering on its keys. The map is ordered according to a Comparator provided at sorted map creation time.
 * This order is reflected when iterating over the navigable map's collection views (returned by the entrySet and keySet).
 * Several additional operations are provided to take advantage of the ordering. (This interface is the map analogue of NavigableSet.)
 *
 * Note that the ordering maintained by a navigable map must be consistent with equals if the navigable map is to correctly implement the Map interface.
 * (See the Comparator interface for a precise definition of consistent with equals.)
 * This is so because the Map interface is defined in terms of the equals operation,
 * but a navigable map performs all key comparisons using its Comparator so two keys that are deemed equal by this method are,
 * from the standpoint of the navigable map, equal.
 * The behavior of an implementing map is well-defined even if its ordering is inconsistent with equals;
 * it just fails to obey the general contract of the Map interface.
 *
 * Methods lowerEntry, floorEntry, ceilingEntry, and higherEntry return MapEntry objects associated with keys respectively less than,
 * less than or equal, greater than or equal, and greater than a given key, returning null if there is no such key. <br>
 * Similarly, methods lowerKey, floorKey, ceilingKey, and higherKey return only the associated keys.
 * All of these methods are designed for locating, not traversing entries.<br>
 * This interface additionally defines methods firstEntry, pollFirstEntry, lastEntry, and pollLastEntry
 * that return and/or remove the least and greatest mappings, if any exist, else returning null.
 *
 * This interface corresponds to java.util.NavigableMap
 *
 * Soon this interface will extend ImmutableMap instead as all the methods are Immutable, backwards compatibility break is coming
 */
export interface NavigableMap<K,V> extends JMap<K,V> {
  /**
  * Returns the first (lowest) key currently in this map.
  * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
  */
  firstKey () : K;

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  firstEntry () : MapEntry<K,V>;

 /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  ceilingEntry (key:K) : MapEntry<K,V>;

  /**
  * Returns the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than or equal to key, or null if there is no such key
  */
  ceilingKey (key:K) : K;

  /**
  * Returns the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  higherKey (key:K) : K;

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  higherEntry (key:K) : MapEntry<K,V>;

  /**
  * Returns the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the highest key lower than key, or null if there is no such key
  */
  lowerKey (key:K) : K;

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  lowerEntry (key:K) : MapEntry<K,V>;

  /**
  * Returns the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the greatest key less than or equal to key, or null if there is no such key
  */
  floorKey (key:K) : K;

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  floorEntry (key:K) : MapEntry<K,V>;

 /**
  * Returns the last (highest) key currently in this map.
  * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
  */
  lastKey () : K;

 /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  lastEntry () : MapEntry<K,V>;

}
