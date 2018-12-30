import { Consumer } from "./Consumer";
import { JIterator } from "./JIterator";
import { Hashable } from "./Hashable";
import { HashMapIteratorLocationTracker } from "./HashMap";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableSet } from "./ImmutableSet";
import { JSet } from "./JSet";
/**
 * This class implements the Set interface, backed by a HashMap instance.
 *
 * It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order will remain constant over time.
 *
 * This class permits the null element and the undefined element.
 *
 * This class offers constant time performance for the basic operations (add, remove, contains and size),
 * assuming the hash function disperses the elements properly among the buckets.
 *
 * Iterating over this set requires time proportional to the sum of the HashSet instance's size
 * (the number of elements) plus the "capacity" of the backing HashMap instance (the number of buckets).
 *
 * Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
 *
 * This class corresponds to java.util.HashSet
 */
export declare class HashSet<K> implements JSet<K> {
    private initialElements;
    private iInitialCapacity;
    private iLoadFactor;
    private datastore;
    private hashMethods;
    constructor(iHash?: Hashable<K>, initialElements?: ImmutableCollection<K>, iInitialCapacity?: number, iLoadFactor?: number);
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
    *
    * Unless otherwise specified by the implementing class, actions are performed in the order of iteration
    * (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    *
    * @param {Consumer} consumer - the action to be performed for each element
    */
    forEach(consumer: Consumer<K>): void;
    /**
    * Returns the Hashable
    * @return {Hashable}
    */
    getHashable(): Hashable<K>;
    /**
    * Adds the specified element to this set if it is not already present.
    *
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    add(element: K): boolean;
    /**
    * RemoveElement the specified element from this set if it is present.
    *
    * @param {K} element element to be removed from this set
    * @return {boolean} true if the set contained the specified element
    */
    remove(element: K): boolean;
    /**
    * Returns the number of elements in this set (its cardinality).
    *
    * @return {number} the number of elements in this set (its cardinality)
    */
    size(): number;
    /**
    * Returns true if this set contains no elements.
    *
    * @return {boolean} true if this set contains no elements
    */
    isEmpty(): boolean;
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    *
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    contains(item: K): boolean;
    /**
    * Removes all of the elements from this set. The set will be empty after this call returns.
    */
    clear(): void;
    /**
    * This method is deprecated and will be removed in a future revision.
    * @deprecated
    */
    deprecatedGetFirstEntryForIterator(): HashMapIteratorLocationTracker<K, number>;
    /**
     * This method is deprecated and will be removed in a future revision.
     * @deprecated
    */
    deprecatedGetNextEntryForIterator(current: HashMapIteratorLocationTracker<K, number>): HashMapIteratorLocationTracker<K, number>;
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
    /**
    * Override JSON.stringify handling
    */
    toJSON(): Array<K>;
}
export declare class HashSetJIterator<T> implements JIterator<T> {
    private location;
    private set;
    constructor(iSet: HashSet<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class HashSetIterator<T> implements Iterator<T> {
    private location;
    private set;
    constructor(iSet: HashSet<T>);
    next(value?: any): IteratorResult<T>;
}
