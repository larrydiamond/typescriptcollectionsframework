import { Queue } from "./Queue";
export interface Deque<K> extends Queue<K> {
    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    addFirst(k: K): boolean;
    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    addLast(k: K): boolean;
    /**
    * Inserts the specified element at the front of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    offerFirst(k: K): boolean;
    /**
    * Inserts the specified element at the end of this deque
    * @param {K} k element to add
    * @return {boolean} true if this collection changed as a result of the call
    */
    offerLast(k: K): boolean;
    /**
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the head of the queue or undefined if empty
    */
    removeFirst(): K;
    /**
    * Retrieves and removes the element at the end of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    * @return {K} the element at the end of the queue or undefined if empty
    */
    removeLast(): K;
    /**
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    pollFirst(): K;
    /**
    * Retrieves and removes the element at the end of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    pollLast(): K;
    /**
    * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the head of the queue or undefined if empty
    */
    getFirst(): K;
    /**
    * Retrieves, but does not remove, the last element of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    * @return {K} the element at the tail of the queue or undefined if empty
    */
    getLast(): K;
    /**
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    peekFirst(): K;
    /**
    * Retrieves, but does not remove, the last element of this queue, or returns null if this queue is empty.
    * @return {K} the element at the head of the queue or null if empty
    */
    peekLast(): K;
}
