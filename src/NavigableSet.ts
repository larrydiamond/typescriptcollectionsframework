/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {JSet} from "./JSet";

/**
 * A Set that further provides a total ordering on its elements. The elements are ordered using a Comparator typically provided at navigable set creation time.
 * The set's iterator will traverse the set in ascending element order. Several additional operations are provided to take advantage of the ordering.
 * (This interface is the set analogue of NavigableMap.)
 *
 * Note that the ordering maintained by a navigable set must be consistent with equals if the navigable set is to correctly implement the Set interface.
 * (See the Comparator interface for a precise definition of consistent with equals.) <br>
 * This is so because the Set interface is defined in terms of the equals operation,
 * but a navigable set performs all element comparisons using its Comparator, so two elements that are deemed equal by this method are,
 * from the standpoint of the navigable set, equal.
 * The behavior of a navigable set is well-defined even if its ordering is inconsistent with equals; it just fails to obey the general contract of the Set interface.
 *
 * Methods lower, floor, ceiling, and higher return elements respectively less than, less than or equal, greater than or equal,
 * and greater than a given element, returning null if there is no such element.
 * This interface additionally defines methods pollFirst and pollLast that return and remove the lowest and highest element, if one exists, else returning null. 
 */
export interface NavigableSet<K> extends JSet<K> {

  /**
  * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
  * @param {K} item to find ceiling node for
  * @return {K} the least element greater than or equal to item, or null if there is no such element
  */
  ceiling (item:K) : K;

  /**
  * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
  * @param {K} item to find floor node for
  * @return {K} the greatest element less than or equal to e, or null if there is no such element
  */
  floor (item:K) : K;

  /**
  * Returns the first (lowest) element currently in this set.
  * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
  */
  first () : K;

  /**
  * Returns the last (highest) element currently in this set.
  * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
  */
  last () : K;

  /**
  * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
  * @return {K} the first (lowest) element, or null if this set is empty
  */
  pollFirst () : K;

  /**
  * Retrieves and removes the last (highest) element, or returns null if this set is empty.
  * @return {K} the last (highest) element, or null if this set is empty
  */
  pollLast () : K;

}
