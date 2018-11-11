import { BasicMapEntry } from "./BasicMapEntry";
import { Consumer } from "./Consumer";
import { Hashable } from "./Hashable";
import { ImmutableMap } from "./ImmutableMap";
import { ImmutableSet } from "./ImmutableSet";
import { JIterator } from "./JIterator";
import { JMap } from "./JMap";
import { MapEntry } from "./MapEntry";
/**
 * Hash table based implementation of the Map interface.  This implementation permits null values and the null key.<br>
 * This class makes no guarantees as to the order of the map; in particular, it does not guarantee that the order will remain constant over time.<br>
 * This implementation provides constant-time performance for the basic operations (get and put), assuming the hash function disperses the elements properly among the buckets.<br>
 * Iteration over collection views requires time proportional to the "capacity" of the HashMap instance (the number of buckets) plus its size (the number of key-value mappings).
 *
 * An instance of HashMap has two parameters that affect its performance: initial capacity and load factor.<br>
 * The capacity is the number of buckets in the hash table, and the initial capacity is simply the capacity at the time the hash table is created.<br>
 * The load factor is a measure of how full the hash table is allowed to get before its capacity is automatically increased.<br>
 * When the number of entries in the hash table exceeds the product of the load factor and the current capacity, the hash table is rehashed (that is, internal data structures are rebuilt) so that the hash table has approximately twice the number of buckets.
 *
 * As a general rule, the default load factor (.75) offers a good tradeoff between time and space costs.<br>
 * Higher values decrease the space overhead but increase the lookup cost (reflected in most of the operations of the HashMap class, including get and put).<br>
 * The expected number of entries in the map and its load factor should be taken into account when setting its initial capacity, so as to minimize the number of rehash operations.<br>
 * If the initial capacity is greater than the maximum number of entries divided by the load factor, no rehash operations will ever occur.
 *
 * If many mappings are to be stored in a HashMap instance, creating it with a sufficiently large capacity will allow the mappings to be stored more efficiently than letting it perform automatic rehashing as needed to grow the table.<br>
 * Note that using many keys with the same hashCode() is a sure way to slow down performance of any hash table.
 *
 * This class corresponds to java.util.HashMap
 */
export declare class HashMap<K, V> implements JMap<K, V> {
    private initialElements;
    private iInitialCapacity;
    private iLoadFactor;
    private data;
    private elementCount;
    private loadFactor;
    private hashMethods;
    private MapEntryHashMethods;
    private ListMapEntryMethods;
    constructor(iHash?: Hashable<K>, initialElements?: ImmutableMap<K, V>, iInitialCapacity?: number, iLoadFactor?: number);
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
    */
    put(key: K, value: V): V;
    /**
     *
     * This is a placeholder that does nothing for HashMap object but needed to work with
     * LinkedHashMap's addEntry method which it overrides from here to fully provide the linked functionality.
     * @param {number} hash value that represents the hash value of the key
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @param {number} bucket index of the bucket in which the Entry should be
     */
    protected addEntry(hash: number, key: K, value: V, bucket?: number): void;
    /**
     * Rehashes the entire hashmap.... gonna be slow you've been warned
     */
    private rehash;
    /**
     * Returns true if this map contains no key-value mappings.
     * @return {boolean} true if this map contains no key-value mappings
     */
    isEmpty(): boolean;
    /**
     * Returns the number of key-value mappings in this map.
     * @return {number} the number of key-value mappings in this map
     */
    size(): number;
    /**
    * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
    */
    get(key: K): V;
    /**
     * Removes the mapping for this key from this Map if present.
     * @param {K} key key for which mapping should be removed
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    remove(key: K): V;
    /**
     * Returns true if this map contains a mapping for the specified key.
     * @param {K} key The key whose presence in this map is to be tested
     * @return {V} true if this map contains a mapping for the specified key.
     */
    containsKey(key: K): boolean;
    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value value whose presence in this map is to be tested
     */
    containsValue(value: V): boolean;
    getEntry(key: K): HashMapEntry<K, V>;
    private getMapEntry;
    /**
     * Removes all of the mappings from this map. The map will be empty after this call returns.
     */
    clear(): void;
    /**
     * Returns an ImmutableSet view of the keys contained in this map.
     * The set's iterator returns the keys in ascending order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    keySet(): ImmutableSet<K>;
    /**
     * Returns an ImmutableSet view of the mappings contained in this map.
     * The set's iterator returns the mappings in random key order.
     * The set is backed by the map, so changes to the map are reflected in the set.
     * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
     * The contains method on this entrySet will only compare keys not values.
     * @return {MapEntry} an entry with the greatest key, or null if this map is empty
     */
    entrySet(): ImmutableSet<MapEntry<K, V>>;
    /**
    * Returns an ImmutableMap backed by Map
    */
    immutableMap(): ImmutableMap<K, V>;
    /**
     * Returns an iterator over the entire entry set
     * @return {Iterator<K>} an iterator for the entry set
     */
    [Symbol.iterator](): Iterator<K>;
    /**
    * Override JSON.stringify handling
    */
    toJSON(): string;
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    deprecatedGetFirstEntryForIterator(): HashMapIteratorLocationTracker<K, V>;
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    deprecatedGetNextEntryForIterator(current: HashMapIteratorLocationTracker<K, V>): HashMapIteratorLocationTracker<K, V>;
    private getHashMapEntryHashable;
    private getListHashMapEntryHashable;
}
export declare class HashMapIteratorLocationTracker<K, V> {
    bucket: number;
    offset: number;
    entry: HashMapEntry<K, V>;
}
export declare class HashMapEntry<K, V> extends BasicMapEntry<K, V> {
    private hashCode;
    constructor(key?: K, value?: V, hash?: number);
    getHashCode(): number;
    setHashCode(iHashCode: number): void;
    setValue(newValue: V): void;
}
export declare class ImmutableKeySetForHashMap<K, V> implements ImmutableSet<K> {
    private map;
    constructor(iHashMap: HashMap<K, V>);
    size(): number;
    isEmpty(): boolean;
    contains(item: K): boolean;
    iterator(): JIterator<K>;
    [Symbol.iterator](): Iterator<K>;
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    forEach(consumer: Consumer<K>): void;
}
export declare class HashMapKeySetJIterator<K, V> implements JIterator<K> {
    private location;
    private map;
    constructor(iHashMap: HashMap<K, V>);
    hasNext(): boolean;
    next(): K;
}
export declare class HashMapKeySetIterator<K, V> implements Iterator<K> {
    private location;
    private map;
    constructor(iHashMap: HashMap<K, V>);
    next(value?: any): IteratorResult<K>;
}
export declare class ImmutableEntrySetForHashMap<K, V> implements ImmutableSet<MapEntry<K, V>> {
    private map;
    constructor(iHashMap: HashMap<K, V>);
    size(): number;
    isEmpty(): boolean;
    contains(item: MapEntry<K, V>): boolean;
    iterator(): JIterator<MapEntry<K, V>>;
    [Symbol.iterator](): Iterator<MapEntry<K, V>>;
    forEach(consumer: Consumer<MapEntry<K, V>>): void;
}
export declare class HashMapEntrySetJIterator<K, V> implements JIterator<MapEntry<K, V>> {
    private location;
    private map;
    constructor(iHashMap: HashMap<K, V>);
    hasNext(): boolean;
    next(): MapEntry<K, V>;
}
export declare class HashMapEntrySetIterator<K, V> implements Iterator<MapEntry<K, V>> {
    private location;
    private map;
    constructor(iHashMap: HashMap<K, V>);
    next(value?: any): IteratorResult<MapEntry<K, V>>;
}
