/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */

import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";


/**
 * An immutable collection that may contain duplicate elements. (Or at least elements that are equal to one another)  
 *  
 * The purpose of this interface is to provide Navigable and Sorted implementations of Multisets that may contain duplicate elements.
 */
export interface ImmutableMultiSet<K> extends ImmutableCollection<K> {

  /**
  * Returns the number of occurrences of an element in this MultiSet (the count of the element).
  * @param {K} item the element to count occurrences of
  * @return {number} the number of occurrences of the element in this MultiSet; possibly zero but never negative
  */
  count (item:K) : number;

  /**
   * Returns an ImmutableSet view of the keys contained in this MultiSet.
   * The ImmutableSet is backed by the MultiSet, so changes to the MultiSet are reflected in the returned ImmutableSet.
   * If the MultiSet is modified while an iteration over the returned ImmutableSet is in progress the results of the iteration are undefined.
   * @return {ImmutableSet<K>} a view of the set of distinct keys in this MultiSet
   */
   keySet () : ImmutableSet<K>;

   /**
    * Returns the number of elements in this MultiSet (its cardinality).
    * @return {number} the number of elements in this MultiSet (its cardinality)
    */
   size () : number;
 
   /**
    * Returns true if this MultiSet contains no elements.
    * @return {boolean} true if this MultiSet contains no elements
    */
   isEmpty () : boolean;
 
   /**
    * Returns true if this MultiSet contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this MultiSet
    * @return {boolean} true if this MultiSet contains the specified element
    */
   contains (item:K) : boolean;
 
  /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
  iterator():JIterator<K>;
 
   /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
   [Symbol.iterator] ():Iterator<K>;
}
