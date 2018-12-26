/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import { Comparator } from "./Comparator";
import { Consumer } from "./Consumer";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableSet } from "./ImmutableSet";
import { JIterator } from "./JIterator";
import { NavigableSet } from "./NavigableSet";
/**
 * A NavigableSet implementation based on a TreeMap. The elements are ordered using a Comparator provided at set creation time.<br>
 * This implementation provides guaranteed log(n) time cost for the basic operations (add, remove and contains).
 *
 * Note that the ordering maintained by a set must be consistent with equals if it is to correctly implement the Set interface.
 * (See Comparator for a precise definition of consistent with equals.)
 * This is so because the Set interface is defined in terms of the equals operation, but a TreeSet instance performs all element comparisons using its Comparator,
 * so two elements that are deemed equal by this method are, from the standpoint of the set, equal.
 * The behavior of a set is well-defined even if its ordering is inconsistent with equals; it just fails to obey the general contract of the Set interface.
 *
 * This class corresponds to java.util.TreeSet
 */
export declare class TreeSet<K> implements NavigableSet<K> {
    private initialElements?;
    private datastore;
    constructor(iComparator: Comparator<K>, initialElements?: ImmutableCollection<K>);
    validateSet(): boolean;
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
     * Returns the comparator used to order the keys in this set
     * @return {Comparator} the comparator used to order the keys in this set
     */
    comparator(): Comparator<K>;
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
    contains(item: K): boolean;
    /**
     * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
     * @param {K} item to find floor node for
     * @return {K} the greatest element less than or equal to e, or null if there is no such element
     */
    floor(item: K): K;
    /**
     * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
     * @param {K} item to find ceiling node for
     * @return {K} the least element greater than or equal to item, or null if there is no such element
     */
    ceiling(item: K): K;
    /**
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, null if there are no elements in this set
    */
    first(): K;
    /**
    * Returns the last (highest) element currently in this set.
    * @return {K} the last (highest) element currently in this set, null if there are no elements in this set
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
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    forEach(consumer: Consumer<K>): void;
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
    /**
    * Override JSON.stringify handling
    */
    toJSON(): string;
}
export declare class TreeSetJIterator<T> implements JIterator<T> {
    private location;
    private set;
    constructor(iSet: TreeSet<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class TreeSetIterator<T> implements Iterator<T> {
    private location;
    private set;
    constructor(iSet: TreeSet<T>);
    next(value?: any): IteratorResult<T>;
}
