import { BasicMapEntry } from "./BasicMapEntry";
import { Hashable } from "./Hashable";
import { ImmutableSet } from "./ImmutableSet";
import { JIterator } from "./JIterator";
import { JMap } from "./JMap";
import { MapEntry } from "./MapEntry";
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
    constructor(iHash: Hashable<K>, initialElements?: JMap<K, V>, iInitialCapacity?: number, iLoadFactor?: number);
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
    */
    put(key: K, value: V): V;
    /**
     * Rehashes the entire hashmap.... gonna be slow you've been warned
     */
    private rehash();
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
    * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
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
    private getMapEntry(key);
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
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    deprecatedGetFirstEntryForIterator(): HashMapIteratorLocationTracker<K, V>;
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
     */
    deprecatedGetNextEntryForIterator(current: HashMapIteratorLocationTracker<K, V>): HashMapIteratorLocationTracker<K, V>;
    private getHashMapEntryHashable(iHash);
    private getListHashMapEntryHashable(iHash);
}
export declare class HashMapIteratorLocationTracker<K, V> {
    bucket: number;
    offset: number;
    entry: HashMapEntry<K, V>;
}
export declare class HashMapEntry<K, V> extends BasicMapEntry<K, V> {
    private hashCode;
    getHashCode(): number;
    setHashCode(iHashCode: number): void;
    setValue(iValue: V): void;
}
export declare class ImmutableKeySetForHashMap<K, V> implements ImmutableSet<K> {
    private map;
    constructor(iHashMap: HashMap<K, V>);
    size(): number;
    isEmpty(): boolean;
    contains(item: K): boolean;
    iterator(): JIterator<K>;
    [Symbol.iterator](): Iterator<K>;
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
