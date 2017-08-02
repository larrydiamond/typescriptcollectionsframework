import { Hashable } from "./Hashable";
import { JMap } from "./JMap";
export declare class HashMap<K extends Hashable, V> implements JMap<K, V> {
    private data;
    private elementCount;
    private bucketCount;
    constructor();
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
    */
    put(key: K, value: V): V;
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
    private getMapEntry(key);
}
