import { Comparator } from "./Comparator";
import { MapEntry } from "./MapEntry";
import { NavigableMap } from "./NavigableMap";
export declare class NaiveMap<K, V> implements NavigableMap<K, V> {
    private topNode;
    private mapComparator;
    constructor(iComparator: Comparator<K>);
    printMap(): void;
    private printMapNode(node);
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
    * Returns the first (lowest) node currently in this map.
    * @return {NaiveMapNode} the first (lowest) node currently in this map, returns null if the Map is empty
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
    * @return {NaiveMapNode} the last (highest) node currently in this map, returns null if the Map is empty
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
}
export declare class NaiveMapNode<K, V> {
    private key;
    private value;
    private leftNode;
    private rightNode;
    private parentNode;
    constructor(iKey: K, iValue: V, iParent: NaiveMapNode<K, V>);
    getKey(): K;
    getValue(): V;
    setValue(v: V): void;
    getLeftNode(): NaiveMapNode<K, V>;
    setLeftNode(n: NaiveMapNode<K, V>): void;
    getRightNode(): NaiveMapNode<K, V>;
    setRightNode(n: NaiveMapNode<K, V>): void;
    getParentNode(): NaiveMapNode<K, V>;
    setParentNode(n: NaiveMapNode<K, V>): void;
    getMapEntry(): MapEntry<K, V>;
}
