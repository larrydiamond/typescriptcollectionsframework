import { Hashable } from "./Hashable";
import { ImmutableSet } from "./ImmutableSet";
import { HashSet } from "./HashSet";
import { JIterator } from "./JIterator";
/**
 * Hash table and linked-list implementation of the Set interface with predictable iteration order.
 *
 * This class corresponds to java.util.LinkedHashSet
 */
export declare class LinkedHashSet<K> extends HashSet<K> {
    private initialElementsLinked;
    private iInitialCapacityLinked;
    private iLoadFactorLinked;
    private header;
    constructor(iHash?: Hashable<K>, initialElementsLinked?: ImmutableSet<K>, iInitialCapacityLinked?: number, iLoadFactorLinked?: number);
    /**
     * Initializes the chain before any entries are inserted.
     */
    private initChain;
    /**
     * Use collection and add to LinkedEntry and super HashSet
     * @param elements collection to populate
     */
    initializeElements(elements: ImmutableSet<K>): void;
    /**
     * This override alters behavior of superclass add method. It causes newly allocated entry
     * to get inserted at the end of the linked list.
     * @param {V} value value
     */
    add(value: K): boolean;
    /**
     * This override alters behavior of superclass remove method.
     * @param {V} value value
     */
    remove(value: K): boolean;
    private createEntry;
    clear(): void;
    /**
     * Java style iterator retrieves hash set values by insertion order.
     */
    Iterator(): LinkedIterator<K>;
    getHeader(): LinkedEntry<K>;
}
/**
 * LinkedEntry entry class
 */
export declare class LinkedEntry<K> {
    before: LinkedEntry<K>;
    after: LinkedEntry<K>;
    private value;
    constructor(value: K);
    /**
     * Removes this entry from the linked list.
     */
    remove(): void;
    getValue(): K;
    /**
     * Inserts this entry before the specified existing entry in the list.
     * @param existingEntry existing entry
     */
    addBefore(existingEntry: LinkedEntry<K>): void;
    equals(o: K): boolean;
}
export declare class LinkedIterator<K> implements JIterator<LinkedEntry<K>> {
    private header;
    private next_Entry;
    private lastReturned;
    constructor(linkedSet: LinkedHashSet<K>);
    next(): LinkedEntry<K>;
    _next(): K;
    hasNext(): boolean;
    private nextEntry;
    private check;
}
