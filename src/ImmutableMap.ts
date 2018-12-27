/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {ImmutableSet} from "./ImmutableSet";
import {MapEntry} from "./MapEntry";

/**
 * An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.
 * 
 * The ImmutableMap interface provides three collection views, which allow a map's contents to be viewed 
 * as a set of keys, collection of values, or set of key-value mappings. 
 * The order of a map is defined as the order in which the iterators on the map's collection views return their elements. 
 * Some map implementations, like the TreeMap class, make specific guarantees as to their order; others, like the HashMap class, do not.
 * 
 * Note: great care must be exercised if mutable objects are used as map keys. 
 * The behavior of a map is not specified if the value of an object is changed in a manner that affects equals comparisons while the object is a key in the map. 
 * A special case of this prohibition is that it is not permissible for a map to contain itself as a key. 
 * While it is permissible for a map to contain itself as a value, extreme caution is advised: the equals and hashCode methods are no longer well defined on such a map.
 * 
 * Some map implementations have restrictions on the keys and values they may contain. 
 * For example, some implementations prohibit null and undefined keys and values. 
 * Attempting to query the presence of an ineligible key or value has undefined behavior - it may throw an exception, or it may simply return false; 
 * 
 * Many methods in Collections Framework interfaces are defined in terms of the equals method. 
 * For example, the specification for the containsKey(k: K) method says: 
 * "returns true if and only if this map contains a mapping for a key k such that (key==null ? k==null : key.equals(k))." 
 * This specification should not be construed to imply that invoking Map.containsKey with a non-null argument key will cause key.equals(k) to be invoked for any key k. 
 * Implementations are free to implement optimizations whereby the equals invocation is avoided, for example, by first comparing the hash codes of the two keys. 
 * More generally, implementations of the various Collections Framework interfaces are free to take advantage of the specified behavior of underlying Object 
 * methods wherever the implementor deems it appropriate.
 * 
 * Some map operations which perform recursive traversal of the map may fail with an 
 * exception for self-referential instances where the map directly or indirectly contains itself. 
 * This includes the clone(), equals(), hashCode() and toString() methods. 
 * Implementations may optionally handle the self-referential scenario, however most current implementations do not do so.
 * 
 * This interface is the immutable version of java.lang.Map.
 */
export interface ImmutableMap<K,V> {
  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  size () : number;

  /**
  * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
  */
  get (key:K) : V;

 /**
  * Returns true if this map contains a mapping for the specified key.
  * @param {K} key The key whose presence in this map is to be tested
  * @return {V} true if this map contains a mapping for the specified key.
  */
  containsKey (key:K) : boolean;

  /**
   * Returns true if this map maps one or more keys to the specified value.
   * @param value value whose presence in this map is to be tested
   */
  containsValue (value: V) : boolean;

 /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  isEmpty () : boolean;

 /**
  * Returns an ImmutableSet view of the keys contained in this map.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * @return {ImmutableSet<K>} the ImmutableSet
  */
  keySet () : ImmutableSet<K>;

 /**
  * Returns an ImmutableSet view of the mappings contained in this map.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * The contains method on this entrySet will only compare keys not values.
  * @return {ImmutableSet<MapEntry<K,V>>} the Immutable Entry Set
  */
  entrySet () : ImmutableSet<MapEntry<K,V>>;

  /**
  * Returns an iterator over the entire entry set
  * @return {Iterator<K>} an iterator for the entry set
  */
  [Symbol.iterator] ():Iterator<K>;
}
