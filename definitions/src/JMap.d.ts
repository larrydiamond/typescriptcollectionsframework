/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import { ImmutableMap } from "./ImmutableMap";
/**
 * An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value.
 *
 * The Map interface provides three collection views, which allow a map's contents to be viewed as a set of keys, collection of values, or set of key-value mappings.
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
 *
 * Many methods in Collections Framework interfaces are defined in terms of the equals method. For example,
 * the specification for the containsKey(key:T) method says: "returns true if and only if this map contains
 * a mapping for a key k such that (key==null ? k==null : key.equals(k))."
 * This specification should not be construed to imply that invoking Map.containsKey with a non-null argument
 * key will cause key.equals(k) to be invoked for any key k.
 * Implementations are free to implement optimizations whereby the equals invocation is avoided,
 * for example, by first comparing the hash codes of the two keys.
 * (The Object.hashCode() specification guarantees that two objects with unequal hash codes cannot be equal.)
 * More generally, implementations of the various Collections Framework interfaces are free to take advantage
 * of the specified behavior of underlying Object methods wherever the implementor deems it appropriate.
 *
 * Some map operations which perform recursive traversal of the map may fail with an exception for self-referential
 * instances where the map directly or indirectly contains itself.
 * This includes the clone(), equals(), hashCode() and toString() methods.
 * Implementations may optionally handle the self-referential scenario, however most current implementations do not do so.
 *
 * This interface corresponds to java.lang.Map.
 */
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
    * Returns an ImmutableMap backed by this Map
    */
    immutableMap(): ImmutableMap<K, V>;
}
