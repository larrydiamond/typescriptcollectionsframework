/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableSet } from "./ImmutableSet";
export interface ImmutableMultiSet<K> extends ImmutableCollection<K> {
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
     * @return {ImmutableSet<K>} a view of the set of distinct elements in this MultiSet
     */
    keySet(): ImmutableSet<K>;
}
