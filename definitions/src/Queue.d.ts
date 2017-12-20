/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { Collection } from "./Collection";
/**
 * A collection designed for holding elements prior to processing.
 * Besides basic Collection operations, queues provide additional insertion, extraction, and inspection operations.
 *
 * Queues typically, but do not necessarily, order elements in a FIFO (first-in-first-out) manner.
 * Among the exceptions are priority queues, which order elements according to a supplied comparator.
 * Whatever the ordering used, the head of the queue is that element which would be removed by a call to remove() or poll().
 *
 * In a FIFO queue, all new elements are inserted at the tail of the queue. Other kinds of queues may use different placement rules.
 * Every Queue implementation must specify its ordering properties.
 *
 * The offer method inserts an element if possible, otherwise returning false.
 * The offer method is designed for use when failure is a normal, rather than exceptional occurrence, for example, in fixed-capacity (or "bounded") queues.
 *
 * The remove() and poll() methods remove and return the head of the queue.
 * Exactly which element is removed from the queue is a function of the queue's ordering policy, which differs from implementation to implementation.
 * The remove() and poll() methods differ only in their behavior when the queue is empty.
 *
 * The element() and peek() methods return, but do not remove, the head of the queue.
 *
 * This interface corresponds to java.util.Queue
 */
export interface Queue<K> extends Collection<K> {
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
    * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
    * @param {K} k element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    add(k: K): boolean;
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    * @param {K} k element to Append
    * @return {boolean} true if this collection changed as a result of the call
    */
    offer(k: K): boolean;
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    poll(): K;
    /**
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    removeQueue(): K;
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    peek(): K;
    /**
    * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    element(): K;
}
