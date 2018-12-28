/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
import { Collection } from "./Collection";
import { ImmutableMultiSet } from "./ImmutableMultiSet";
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
}
