/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {Collection} from "./Collection";
import {Queue} from "./Queue";

/**
 * A linear collection that supports element insertion and removal at both ends.
 * The name deque is short for "double ended queue" and is usually pronounced "deck".
 *
 * This interface extends the Queue interface. When a deque is used as a queue, FIFO (First-In-First-Out) behavior results.
 * Elements are added at the end of the deque and removed from the beginning.
 *
 * This interface defines methods to access the elements at both ends of the deque. Methods are provided to insert, remove, and examine the element.
 *
 * Deques can also be used as LIFO (Last-In-First-Out) stacks. When a deque is used as a stack, elements are pushed and popped from the beginning of the deque.
 *
 * This interface provides two methods to remove interior elements, removeFirstOccurrence and removeLastOccurrence.
 *
 * This interface corresponds to java.util.Deque
 */
export interface Deque<K> extends Queue<K> {

  /**
  * Inserts the specified element at the front of this deque
  * @param {K} k element to add
  * @return {boolean} true if this collection changed as a result of the call
  */
  addFirst (k:K) : boolean;

  /**
  * Inserts the specified element at the end of this deque
  * @param {K} k element to add
  * @return {boolean} true if this collection changed as a result of the call
  */
  addLast (k:K) : boolean;

  /**
  * Inserts the specified element at the front of this deque
  * @param {K} k element to add
  * @return {boolean} true if this collection changed as a result of the call
  */
  offerFirst (k:K) : boolean;

  /**
  * Inserts the specified element at the end of this deque
  * @param {K} k element to add
  * @return {boolean} true if this collection changed as a result of the call
  */
  offerLast (k:K) : boolean;

  /**
  * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
  * @return {K} the element at the head of the queue or undefined if empty
  */
  removeFirst () : K;

  /**
  * Retrieves and removes the element at the end of this queue. This method differs from poll only in that it returns undefined if this queue is empty
  * @return {K} the element at the end of the queue or undefined if empty
  */
  removeLast () : K;

  /**
  * Retrieves and removes the head of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  pollFirst () : K;

  /**
  * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  pollLast () : K;

  /**
  * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  * @return {K} the element at the head of the queue or undefined if empty
  */
  getFirst () : K;

  /**
  * Retrieves, but does not remove, the last element of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
  * @return {K} the element at the tail of the queue or undefined if empty
  */
  getLast () : K;

  /**
  * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  peekFirst () : K;

  /**
  * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
  * @return {K} the element at the head of the queue or null if empty
  */
  peekLast () : K;
}
