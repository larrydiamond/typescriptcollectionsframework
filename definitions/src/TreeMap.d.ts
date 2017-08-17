import { Comparator } from "./Comparator";
import { ImmutableSet } from "./ImmutableSet";
import { JIterator } from "./JIterator";
import { MapEntry } from "./MapEntry";
import { NavigableMap } from "./NavigableMap";
export declare class TreeMap<K, V> implements NavigableMap<K, V> {
    private topNode;
    private mapComparator;
    constructor(iComparator: Comparator<K>);
    validateMap(): boolean;
    private validateNode(node);
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
    private sizeTree(n);
    /**
     * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    put(key: K, value: V): V;
    private putNode(node, key, value);
    /**
     * Needed For Iterator
     * @param {K} key the given key
     * @return {K} the least key greater than key, or null if there is no such key
     */
    getNextHigherKey(key: K): K;
    private nextHigherNode(node);
    /**
     * Returns true if this map contains a mapping for the specified key.   This method uses the comparator for the map to find the specified key
     * @param {K} key key whose presence in this map is to be tested
     * @return {boolean} true if this map contains a mapping for the specified key
     */
    containsKey(key: K): boolean;
    private getNode(node, key);
    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * @param {K} key the key whose associated value is to be returned
     * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
     */
    get(key: K): V;
    /**
     * Removes the mapping for this key from this TreeMap if present.
     * @param {K} key key for which mapping should be removed
     * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
     */
    remove(key: K): V;
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
    private ceilingNode(node, key, currentBest);
    private higherNode(node, key, currentBest);
    private lowerNode(node, key, currentBest);
    private floorNode(node, key, currentBest);
    /**
     * Returns the first (lowest) node currently in this map.
     * @return {TreeMapNode} the first (lowest) node currently in this map, returns null if the Map is empty
     */
    private firstMapNode();
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
    * Returns the last (highest) node currently in this map.
    * @return {TreeMapNode} the last (highest) node currently in this map, returns null if the Map is empty
    */
    private lastMapNode();
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
}
export declare class TreeMapNode<K, V> {
    private key;
    private value;
    private leftNode;
    private rightNode;
    private parentNode;
    constructor(iKey: K, iValue: V, iParent: TreeMapNode<K, V>);
    getKey(): K;
    getValue(): V;
    setValue(v: V): void;
    getLeftNode(): TreeMapNode<K, V>;
    setLeftNode(n: TreeMapNode<K, V>): void;
    getRightNode(): TreeMapNode<K, V>;
    setRightNode(n: TreeMapNode<K, V>): void;
    getParentNode(): TreeMapNode<K, V>;
    setParentNode(n: TreeMapNode<K, V>): void;
    getMapEntry(): MapEntry<K, V>;
}
export declare class ImmutableKeySetForTreeMap<K, V> implements ImmutableSet<K> {
    private treeMap;
    constructor(iTreeMap: TreeMap<K, V>);
    size(): number;
    isEmpty(): boolean;
    contains(item: K): boolean;
    iterator(): JIterator<K>;
    [Symbol.iterator](): Iterator<K>;
}
export declare class TreeMapKeySetJIterator<K, V> implements JIterator<K> {
    private location;
    private treeMap;
    constructor(iTreeMap: TreeMap<K, V>);
    hasNext(): boolean;
    next(): K;
}
export declare class TreeMapKeySetIterator<K, V> implements Iterator<K> {
    private location;
    private treeMap;
    constructor(iTreeMap: TreeMap<K, V>);
    next(value?: any): IteratorResult<K>;
}
export declare class ImmutableEntrySetForTreeMap<K, V> implements ImmutableSet<MapEntry<K, V>> {
    private treeMap;
    constructor(iTreeMap: TreeMap<K, V>);
    size(): number;
    isEmpty(): boolean;
    contains(item: MapEntry<K, V>): boolean;
    iterator(): JIterator<MapEntry<K, V>>;
    [Symbol.iterator](): Iterator<MapEntry<K, V>>;
}
export declare class TreeMapEntrySetJIterator<K, V> implements JIterator<MapEntry<K, V>> {
    private location;
    private treeMap;
    constructor(iTreeMap: TreeMap<K, V>);
    hasNext(): boolean;
    next(): MapEntry<K, V>;
}
export declare class TreeMapEntrySetIterator<K, V> implements Iterator<MapEntry<K, V>> {
    private location;
    private treeMap;
    constructor(iTreeMap: TreeMap<K, V>);
    next(value?: any): IteratorResult<MapEntry<K, V>>;
}
