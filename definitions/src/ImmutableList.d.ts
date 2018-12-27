/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/
import { ImmutableCollection } from "./ImmutableCollection";
/**
 * An ordered collection (also known as a sequence).
 * The user of this interface has precise control over where in the list each element is inserted.
 * The user can access elements by their integer index (position in the list), and search for elements in the list.
 *
 * Unlike sets, lists typically allow duplicate elements.
 * More formally, lists typically allow pairs of elements e1 and e2 such that e1.equals(e2).
 *
 * The ImmutableList interface places additional stipulations, beyond those specified in the ImmutableCollection interface,
 * on the contracts of the iterator method.
 * Declarations for other inherited methods are also included here for convenience.
 *
 * The ImmutableList interface provides four methods for positional (indexed) access to list elements.
 * Lists (like TypeScript arrays) are zero based.
 * Note that these operations may execute in time proportional to the index value for some implementations (the LinkedList class, for example).
 * Thus, iterating over the elements in a list is typically preferable to indexing through it if the caller does not know the implementation.
 *
 * The ImmutableList interface provides two methods to search for a specified object.
 * From a performance standpoint, these methods should be used with caution.
 * In many implementations they will perform costly linear searches.
 *
 * Note: While it is permissible for lists to contain themselves as elements, extreme caution is advised:
 * the equals and hashCode methods are no longer well defined on such a list.
 *
 * This interface is the immutable version of java.lang.List.
 */
export interface ImmutableList<T> extends ImmutableCollection<T> {
    /**
    * Returns the element at the specified position in this list.
    * @param {number} index index of the element to return
    * @return {T} the element at the specified position in this list
    */
    get(index: number): T;
    /**
    * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
    * @param {T} t element to search for
    * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
    */
    indexOf(t: T): number;
    /**
    * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
    * @param {T} t element to search for
    * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
    */
    lastIndexOf(t: T): number;
    /**
    * Returns true if this list contains the specified element.
    * @param {T} t element whose presence in this list is to be tested
    * @return {boolean} true if this list contains the specified element
    */
    contains(t: T): boolean;
    /**
    * Returns true if this list contains no elements.
    * @return {boolean} true if this list contains no elements
    */
    isEmpty(): boolean;
}
