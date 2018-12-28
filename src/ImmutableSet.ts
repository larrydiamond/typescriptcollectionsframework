/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */

import {ImmutableCollection} from "./ImmutableCollection";
import {JIterator} from "./JIterator";

/**
 * A collection that contains no duplicate elements. 
 * More formally, sets contain no pair of elements e1 and e2 such that e1.equals(e2), and at most one null element and at most one undefined element. 
 * As implied by its name, this interface models the mathematical set abstraction.
 * 
 * The ImmutableSet interface places additional stipulations, beyond those inherited from the Collection interface, 
 * on the contracts of all constructors and on the contracts of the equals and hashCode methods. 
 * Declarations for other inherited methods are also included here for convenience. 
 * (The specifications accompanying these declarations have been tailored to the Set interface, but they do not contain any additional stipulations.)
 * 
 * The additional stipulation on constructors is, not surprisingly, that all constructors must create a set that contains no duplicate elements (as defined above).
 * 
 * Note: Great care must be exercised if mutable objects are used as set elements. 
 * The behavior of a set is not specified if the value of an object is changed in a manner that affects equals comparisons while the object is an element in the set. 
 * A special case of this prohibition is that it is not permissible for a set to contain itself as an element.
 * 
 * Some set implementations have restrictions on the elements that they may contain. 
 * For example, some implementations prohibit null elements and undefined elements.
 * 
 * This interface is the immutable version of java.lang.Set.
 */
export interface ImmutableSet<K> extends ImmutableCollection<K> {
  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  size () : number;

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  isEmpty () : boolean;

  /**
  * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this set
  * @return {boolean} true if this set contains the specified element
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
