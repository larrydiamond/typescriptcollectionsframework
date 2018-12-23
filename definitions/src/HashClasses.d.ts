/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { ArrayList } from "./ArrayList";
import { Consumer } from "./Consumer";
import { JIterator } from "./JIterator";
import { Hashable } from "./Hashable";
import { HashMap } from "./HashMap";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableMultiSet } from "./ImmutableMultiSet";
import { ImmutableSet } from "./ImmutableSet";
import { MultiSet } from "./MultiSet";
export declare class HashMultiSetImpl<K> {
    private datastore;
    private hashMethods;
    constructor(datastore: HashMap<K, ArrayList<K>>, iHash: Hashable<K>);
    getDataStore(): HashMap<K, ArrayList<K>>;
    getHashMethods(): Hashable<K>;
    count(item: K): number;
    add(element: K): boolean;
    remove(element: K): boolean;
    size(): number;
    isEmpty(): boolean;
    contains(item: K): boolean;
    clear(): void;
}
/**
 * This class implements the MultiSet interface, backed by a HashMap instance.
 *
 * It makes no guarantees as to the iteration order of the MultiSet;
 * in particular, it does not guarantee that the order will remain constant over time.
 * This class permits the null element and the undefined element
 *
 * This class offers constant time performance for the basic operations (add, remove, contains and size),
 * assuming the hash function disperses the elements properly among the buckets. <br>
 * Iterating over this MultiSet requires time proportional to the sum of the HashMultiSet instance's size
 * (the number of elements) plus the "capacity" of the backing HashMap instance (the number of buckets). <br>
 * Thus, it's very important not to set the initial capacity too high (or the load factor too low) if iteration performance is important.
 *
 * This class corresponds to com.google.common.collect.HashMultiSet
 */
export declare class HashMultiSet<K> implements MultiSet<K> {
    private initialElements;
    private iInitialCapacity;
    private iLoadFactor;
    private impl;
    constructor(iHash?: Hashable<K>, initialElements?: ImmutableCollection<K>, iInitialCapacity?: number, iLoadFactor?: number);
    /**
    * Returns the number of occurrences of an element in this MultiSet (the count of the element).
    * @param {K} item the element to count occurrences of
    * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
    */
    count(item: K): number;
    /**
     * Returns an ImmutableSet view of the keys contained in this MultiSet.
     * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
     * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
     * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
     */
    keySet(): ImmutableSet<K>;
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
    * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).
    * Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    forEach(consumer: Consumer<K>): void;
    /**
    * Returns the Hashable
    * @return {Hashable}
    */
    getHashable(): Hashable<K>;
    /**
    * Adds an occurance of the specified element to this MultiSet
    * @param {K} element element to be added to this MultiSet
    * @return {boolean} true if this MultiSet did not already contain the specified element
    */
    add(element: K): boolean;
    /**
    * Removes a single occurrence of the specified element from this MultiSet, if present.
    * @param {K} element element to be removed from this MultiSet
    * @return {boolean} true if the set contained the specified element
    */
    remove(element: K): boolean;
    /**
    * Returns the number of elements in this MultiSet (its cardinality).
    * @return {number} the number of elements in this MultiSet (its cardinality)
    */
    size(): number;
    /**
    * Returns true if this MultiSet contains no elements.
    * @return {boolean} true if this MultiSet contains no elements
    */
    isEmpty(): boolean;
    /**
    * Returns true if this MultiSet contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this MultiSet
    * @return {boolean} true if this MultiSet contains the specified element
    */
    contains(item: K): boolean;
    /**
    * Removes all of the elements from this MultiSet. The MultiSet will be empty after this call returns.
    */
    clear(): void;
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
    * Returns an ImmutableMultiSet backed by this MultiSet
    */
    immutableMultiSet(): ImmutableMultiSet<K>;
    /**
    * Override JSON.stringify handling
    */
    toJSON(): string;
}
export declare class HashSetJIterator<T> implements JIterator<T> {
    private impl;
    private entrySet;
    private iter;
    private currentEntry;
    private offset;
    constructor(msetimpl: HashMultiSetImpl<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class HashSetIterator<T> implements Iterator<T> {
    private impl;
    private entrySet;
    private iter;
    private currentEntry;
    private offset;
    constructor(msetimpl: HashMultiSetImpl<T>);
    next(value?: any): IteratorResult<T>;
}
