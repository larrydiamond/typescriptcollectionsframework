/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
import { Collection } from "./Collection";
import { Consumer } from "./Consumer";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableMultiSet } from "./ImmutableMultiSet";
import { ImmutableSet } from "./ImmutableSet";
import { JIterator } from "./JIterator";
/**
 * A collection that supports order-independent equality, like Set, but may have duplicate elements. A multiset is also sometimes called a bag.
 *
 * Elements of a multiset that are equal to one another are referred to as occurrences of the same single element.
 * The total number of occurrences of an element in a multiset is called the count of that element
 * (the terms "frequency" and "multiplicity" are equivalent, but not used in this API).
 *
 * This interface corresponds to com.google.common.collect.Multiset
 *
 */
export interface MultiSet<K> extends ImmutableMultiSet<K>, Collection<K> {
    /**
    * Returns an ImmutableMultiSet backed by this MultiSet
    */
    immutableMultiSet(): ImmutableMultiSet<K>;
    /**
    * Adds the specified element to this MultiSet
    * @param {K} element element to be added to this MultiSet
    * @return {boolean} true if this MultiSet did not already contain the specified element
    */
    add(element: K): boolean;
    /**
    * Returns the number of occurrences of an element in this MultiSet (the count of the element).
    *
    * @param {K} item the element to count occurrences of
    * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
    */
    count(item: K): number;
    /**
     * Returns an ImmutableSet view of the keys contained in this MultiSet.
     *
     * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
     *
     * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
     *
     * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
     */
    keySet(): ImmutableSet<K>;
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.
    *
    * Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).
    *
    * Exceptions thrown by the action are relayed to the caller.
    *
    * @param {Consumer} consumer - the action to be performed for each element
    */
    forEach(consumer: Consumer<K>): void;
    /**
    * Removes a single occurrence of the specified element from this MultiSet, if present.
    *
    * The element removed will be equal to the element as per the Hashable used in this MultiSet
    * and will not necessarily be the element passed in.
    *
    * @param {K} element element equal to this element to be removed from this MultiSet
    * @return {boolean} true if the set contained the specified element
    */
    remove(element: K): boolean;
    /**
    * Returns the number of elements in this MultiSet (its cardinality).
    *
    * @return {number} the number of elements in this MultiSet (its cardinality)
    */
    size(): number;
    /**
    * Returns true if this MultiSet contains no elements.
    *
    * @return {boolean} true if this MultiSet contains no elements
    */
    isEmpty(): boolean;
    /**
    * Returns true if this MultiSet contains the specified element.
    *
    * This method uses the comparator and does not invoke equals
    *
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
     *
     * @return {JIterator<K>} the Java style iterator
     */
    iterator(): JIterator<K>;
    /**
    * Returns a TypeScript style iterator
    *
    * @return {Iterator<K>} the TypeScript style iterator
    */
    [Symbol.iterator](): Iterator<K>;
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    immutableCollection(): ImmutableCollection<K>;
}
