/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {Collectable} from "./Collectable";
import {Collection} from "./Collection";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableList} from "./ImmutableList";

/**
 * An ordered collection (also known as a sequence). 
 * The user of this interface has precise control over where in the list each element is inserted. 
 * The user can access elements by their integer index (position in the list), and search for elements in the list.
 * 
 * Unlike sets, lists typically allow duplicate elements. 
 * More formally, lists typically allow pairs of elements e1 and e2 such that e1.equals(e2), 
 * and they typically allow multiple null elements if they allow null elements at all. 
 * 
 * The List interface places additional stipulations, beyond those specified in the Collection interface, 
 * on the contracts of the iterator, add, remove, equals, and hashCode methods. 
 * Declarations for other inherited methods are also included here for convenience.
 * 
 * The List interface provides four methods for positional (indexed) access to list elements. Lists (like arrays) are zero based. 
 * Note that these operations may execute in time proportional to the index value for some implementations (the LinkedList class, for example). 
 * Thus, iterating over the elements in a list is typically preferable to indexing through it if the caller does not know the implementation.
 * 
 * The List interface provides two methods to search for a specified object. From a performance standpoint, these methods should be used with caution. 
 * In many implementations they will perform costly linear searches.
 * 
 * The List interface provides two methods to efficiently insert and remove multiple elements at an arbitrary point in the list.
 * 
 * Note: While it is permissible for lists to contain themselves as elements, extreme caution is advised: 
 * the equals and hashCode methods are no longer well defined on such a list.
 *
 * This interface corresponds to java.util.List
 * 
 */
export interface List<T> extends ImmutableList<T>, Collection<T> {
  /**
  * Replaces the element at the specified position in this list with the specified element (optional operation).
  * @param {number} index index of the element to replace
  * @param {T} element element to be stored at the specified position
  * @return {T} the element previously at the specified position
  */

  set(index:number, element:T):T;

  /**
  * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
  * @param {number} index the index of the element to be removed
  * @return {T} the element that was removed from the list, undefined if the element does not exist
  */
  removeIndex (index:number) : T;

  /**
  * Appends the specified element to the end of this list
  * @param {T} t element to Append
  * @return {boolean} true if this collection changed as a result of the call
  */
  add (t:T) : boolean;

  /**
  * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
  * @param {number} index index at which the specified element is to be inserted
  * @param {T} t element to be inserted
  */
  addIndex (index:number, t:T) : void;

  /**
  * Inserts all of the elements in the specified collection into this list, starting at the specified position. Shifts the element currently at that position (if any) and any subsequent elements to the right (increases their indices). The new elements will appear in the list in the order that they are returned by the specified collection's iterator.
  * @param {number} index index at which to insert the first element from the specified collection
  * @param {Collection} c collection containing elements to be added to this list
  * @return {boolean} true if this collection changed as a result of the call
  */
  addAll (c:ImmutableCollection<T>, index?:number) : boolean;

  /**
  * Removes all of the elements from this list. The list will be empty after this call returns.
  */
  clear () : void;

  /**
  * Removes from this list all of its elements that are contained in the specified collection.
  * @param {Collection} c collection containing elements to be removed from this list
  * @return {boolean} true if this list changed as a result of the call
  */
  removeAll (c:ImmutableCollection<T>) : boolean;

  /**
  * Returns an ImmutableList backed by this List
  */
  immutableList () : ImmutableList<T>;
}
