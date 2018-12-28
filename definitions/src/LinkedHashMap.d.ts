import { Hashable } from "./Hashable";
import { HashMap, HashMapEntry } from "./HashMap";
import { ImmutableMap } from "./ImmutableMap";
import { JIterator } from "./JIterator";
/**
 * Hash table and linked list implementation of the Map interface, with predictable iteration order. This implementation
 * differs from HashMap in that it maintains a doubly-linked list running through all of its entries. This linked list
 * defines the iteration ordering, which is normally the order in which keys were inserted into the map (insertion-order).
 * Note that insertion order is not affected if a key is re-inserted into the map.
 *
 * This implementation spares its clients from the unspecified, generally chaotic ordering provided by HashMap without incurring the increased cost associated with TreeMap.
 * It can be used to produce a copy of a map that has the same order as the original, regardless of the original map's implementation:
 *
 * This class corresponds to java.util.LinkedHashMap
 */
export declare class LinkedHashMap<K, V> extends HashMap<K, V> {
    private initialElementsLinked;
    private iInitialCapacityLinked;
    private iLoadFactorLinked;
    private header;
    constructor(iHash?: Hashable<K>, initialElementsLinked?: ImmutableMap<K, V>, iInitialCapacityLinked?: number, iLoadFactorLinked?: number);
    /**
     * Initializes the chain before any entries are inserted into the map.
     */
    private initChain;
    /**
     * Use collection and add to LinkedHashMap
     * @param elements collection to populate
     */
    initializeElements(elements: ImmutableMap<K, V>): void;
    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value value whose presence in this map is to be tested
     */
    containsValue(value: V): boolean;
    /**
     * This override alters behavior of superclass remove method.
     * @param {V} key key value
     */
    remove(key: K): V;
    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * @param key key with which the specified value is to be associated
     */
    get(key: K): V;
    /**
     * This override alters behavior of superclass put method. It causes newly allocated entry
     * to get inserted at the end of the linked list and removes the eldest entry if appropriate.
     * @param {number} hash value that represents the hash value of the key
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @param {number} bucket index of the bucket in which the Entry should be
     */
    addEntry(hash: number, key: K, value: V, bucket?: number): void;
    private createEntry;
    /**
     * Returns true if this map should remove its eldest entry. This method is invoked by put and
     * putAll after inserting a new entry into the map. It provides the implementor with the opportunity to remove the
     * eldest entry each time a new one is added. This is useful if the map represents a cache: it allows the map to reduce
     * memory consumption by deleting stale entries.
     * @param eldest eldest entry
     */
    private removeEldestEntry;
    private removeEntryForKey;
    clear(): void;
    getHeader(): LinkedEntry<K, V>;
    newKeyIterator(): KeyIterator<K, V>;
    newValueIterator(): ValueIterator<K, V>;
    newEntryIterator(): EntryIterator<K, V>;
}
/**
 * LinkedHashMap entry class
 */
export declare class LinkedEntry<K, V> extends HashMapEntry<K, V> {
    before: LinkedEntry<K, V>;
    after: LinkedEntry<K, V>;
    constructor(hash: number, key: K, value: V);
    /**
     * Removes this entry from the linked list.
     */
    remove(): void;
    /**
     * Inserts this entry before the specified existing entry in the list.
     * @param existingEntry existing entry
     */
    addBefore(existingEntry: LinkedEntry<K, V>): void;
    recordRemoval(m: HashMap<K, V>): void;
    equals(o: K): boolean;
}
export declare class LinkedHashIterator<K, V> implements JIterator<LinkedEntry<K, V>> {
    private header;
    private next_Entry;
    private lastReturned;
    constructor(linkedHashMap: LinkedHashMap<K, V>);
    next(): LinkedEntry<K, V>;
    hasNext(): boolean;
    private nextEntry;
    private check;
}
export declare class EntryIterator<K, V> extends LinkedHashIterator<K, V> {
    constructor(linkedHashMap: LinkedHashMap<K, V>);
    _next(): LinkedEntry<K, V>;
}
export declare class KeyIterator<K, V> extends LinkedHashIterator<K, V> {
    constructor(linkedHashMap: LinkedHashMap<K, V>);
    _next(): K;
}
export declare class ValueIterator<K, V> extends LinkedHashIterator<K, V> {
    constructor(linkedHashMap: LinkedHashMap<K, V>);
    _next(): V;
}
