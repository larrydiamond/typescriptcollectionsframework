import { ArrayList } from "./ArrayList";
import { BasicMapEntry } from "./BasicMapEntry";
import { Collectable } from "./Collectable";
import { Comparator } from "./Comparator";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableMap } from "./ImmutableMap";
import { ImmutableSet } from "./ImmutableSet";
import { JIterator } from "./JIterator";
import { MapEntry } from "./MapEntry";
import { NavigableMap } from "./NavigableMap";
import { NavigableSet } from "./NavigableSet";
export declare class SkipListMapImpl<K, V> {
    private initialElements;
    private head;
    private height;
    private mapComparator;
    private mapCollectable;
    private numberElements;
    private skipListNodeComparator;
    private skipListNodeCollectable;
    constructor(iComparator: Comparator<K>, initialElements?: ImmutableMap<K, V>);
    getSkipListNodeComparator(): Comparator<SkipListNode<K, V>>;
    getSkipListNodeCollectable(): Collectable<SkipListNode<K, V>>;
    validateDisplay(): boolean;
    validate(): boolean;
    /**
    * Removes the mapping for this key from this Map if present.
    * @param {K} key key for which mapping should be removed
    * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
    */
    remove(key: K): V;
    /**
    * Removes this node from the Map
    * @param {MapEntry<K,V>} node node to remove
    */
    removeElement(node: SkipListNode<K, V>): void;
    /**
    * Removes all of the mappings from this map. The map will be empty after this call returns.
    */
    clear(): void;
    /**
    * Returns the comparator used to order the keys in this map
    * @return {Comparator} the comparator used to order the keys in this map
    */
    comparator(): Comparator<K>;
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    size(): number;
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    isEmpty(): boolean;
    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    put(key: K, value: V): V;
    private hookUpNodePointers(newNode, immediatePreceedingNode);
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {SkipListNode} an entry with the least key, or null if this map is empty
    */
    firstEntry(): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
    */
    ceilingEntry(key: K): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    higherEntry(key: K): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
    */
    nextHigherNode(node: SkipListNode<K, V>): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
    */
    lowerEntry(key: K): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
    */
    floorEntry(key: K): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    lastEntry(): SkipListNode<K, V>;
    /**
    * Returns a key-value mapping associated with the given key, or null if there is no such key.
    * @param {K} key the key
    * @return {MapEntry} an entry with the key, or null if there is no such key
    */
    getEntry(key: K): SkipListNode<K, V>;
}
export declare class SkipListNode<K, V> extends BasicMapEntry<K, V> {
    constructor(key: K, value: V, height: number, iNodeCollectable: Collectable<SkipListNode<K, V>>);
    setValue(iValue: V): void;
    private lastNodeArray;
    getLastNodeArray(): ArrayList<SkipListNode<K, V>>;
    private nextNodeArray;
    getNextNodeArray(): ArrayList<SkipListNode<K, V>>;
}
export declare class SkipListMap<K, V> implements NavigableMap<K, V> {
    private impl;
    constructor(comp: Comparator<K>, iInitial?: ImmutableMap<K, V>);
    validateMap(): boolean;
    validateMapDisplay(): boolean;
    getNextHigherKey(key: K): any;
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
    * Returns true if this map contains a mapping for the specified key.
    * @param {K} key The key whose presence in this map is to be tested
    * @return {V} true if this map contains a mapping for the specified key.
    */
    containsKey(key: K): boolean;
    /**
    * Returns true if this map contains no key-value mappings.
    * @return {boolean} true if this map contains no key-value mappings
    */
    isEmpty(): boolean;
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
    * The set's iterator returns the mappings in ascending key order.
    * The set is backed by the map, so changes to the map are reflected in the set.
    * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
    * The contains method on this entrySet will only compare keys not values.
    * @return {MapEntry} an entry with the greatest key, or null if this map is empty
    */
    entrySet(): ImmutableSet<MapEntry<K, V>>;
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
    /**
    * Returns the first (lowest) key currently in this map.
    * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
    */
    firstKey(): K;
    /**
    * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
    * @return {MapEntry} an entry with the least key, or null if this map is empty
    */
    firstEntry(): BasicMapEntry<K, V>;
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
export declare class ImmutableEntrySetForSkipListMapImpl<K, V> implements ImmutableSet<MapEntry<K, V>> {
    private map;
    constructor(iMap: SkipListMapImpl<K, V>);
    size(): number;
    isEmpty(): boolean;
    contains(item: MapEntry<K, V>): boolean;
    iterator(): JIterator<MapEntry<K, V>>;
    [Symbol.iterator](): Iterator<MapEntry<K, V>>;
}
export declare class SkipListMapEntrySetJIterator<K, V> implements JIterator<MapEntry<K, V>> {
    private location;
    private map;
    constructor(iMap: SkipListMapImpl<K, V>);
    hasNext(): boolean;
    next(): MapEntry<K, V>;
}
export declare class SkipListMapEntrySetIterator<K, V> implements Iterator<MapEntry<K, V>> {
    private location;
    private map;
    constructor(iMap: SkipListMapImpl<K, V>);
    next(value?: any): IteratorResult<MapEntry<K, V>>;
}
export declare class SkipListSet<K> implements NavigableSet<K> {
    private initialElements;
    private impl;
    constructor(iComparator: Comparator<K>, initialElements?: ImmutableCollection<K>);
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    add(element: K): boolean;
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    size(): number;
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    isEmpty(): boolean;
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    contains(key: K): boolean;
    /**
    * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
    * @param {K} item to find floor node for
    * @return {K} the greatest element less than or equal to e, or null if there is no such element
    */
    floor(key: K): K;
    /**
    * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
    * @param {K} item to find ceiling node for
    * @return {K} the least element greater than or equal to item, or null if there is no such element
    */
    ceiling(key: K): K;
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    first(): K;
    /**
    * Returns the last (highest) element currently in this set.
    * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
    */
    last(): K;
    /**
    * Removes the specified element from this set if it is present.
    * @param {K} element element to be removed from this set
    * @return {boolean} true if the set contained the specified element
    */
    remove(element: K): boolean;
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    clear(): void;
    /**
    * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
    * @return {K} the first (lowest) element, or null if this set is empty
    */
    pollFirst(): K;
    /**
    * Retrieves and removes the last (highest) element, or returns null if this set is empty.
    * @return {K} the last (highest) element, or null if this set is empty
    */
    pollLast(): K;
    /**
    * Needed For Iterator
    * @param {K} key the given key
    * @return {K} the least key greater than key, or null if there is no such key
    */
    getNextHigherKey(key: K): K;
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    iterator(): JIterator<K>;
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    [Symbol.iterator](): Iterator<K>;
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    immutableCollection(): ImmutableCollection<K>;
    /**
    * Returns an ImmutableSet backed by this Set
    */
    immutableSet(): ImmutableSet<K>;
}
