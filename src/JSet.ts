/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */

import {Collection} from "./Collection";
import {ImmutableSet} from "./ImmutableSet";

/**
 * A collection that contains no duplicate elements. 
 * 
 * More formally, sets contain no pair of elements e1 and e2 such that e1.equals(e2), 
 * and at most one null element and at most one undefined element. 
 * 
 * As implied by its name, this interface models the mathematical set abstraction.
 * 
 * The Set interface places additional stipulations, beyond those inherited from the Collection interface, 
 * on the contracts of all constructors and on the contracts of the add, equals and hashCode methods. 
 * 
 * Declarations for other inherited methods are also included here for convenience. 
 * (The specifications accompanying these declarations have been tailored to the Set interface, 
 * but they do not contain any additional stipulations.)
 * 
 * The additional stipulation on constructors is, not surprisingly, 
 * that all constructors must create a set that contains no duplicate elements (as defined above).
 * 
 * Note: Great care must be exercised if mutable objects are used as set elements. 
 * 
 * The behavior of a set is not specified if the value of an object is changed in a manner 
 * that affects equals comparisons while the object is an element in the set. 
 * 
 * A special case of this prohibition is that it is not permissible for a set to contain itself as an element.
 * 
 * This interface corresponds to java.lang.Set.
 */
export interface JSet<K> extends ImmutableSet<K>, Collection<K> {

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  add (element:K) : boolean;

  /**
  * Returns an ImmutableSet backed by this Set
  */
  immutableSet () : ImmutableSet<K>;
}
