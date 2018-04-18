import { Comparator } from "./Comparator";
import { Consumer } from "./Consumer";
import { ImmutableCollection } from "./ImmutableCollection";
import { JIterator } from "./JIterator";
import { Queue } from "./Queue";
/**
 * An unbounded priority queue based on a priority heap.  The elements of the priority queue are ordered by a Comparator provided at queue construction time.
 *
 * The head of this queue is the least element with respect to the specified ordering.
 * The queue retrieval operations poll, remove, peek, and element access the element at the head of the queue.
 * The iterator will traverse the elements of the priority queue in increasing order.
 * Duplicate entries are not permitted in this implementation.
 *
 * Implementation note: this implementation provides O(log(n)) time for the enqueuing and dequeuing methods (offer, poll, remove() and add);
 * linear time for the remove(Object) and contains(Object) methods; and constant time for the retrieval methods (peek, element, and size).
 *
 * This class corresponds to java.util.PriorityQueue
 */
export declare class PriorityQueue<K> implements Queue<K> {
    private initialElements;
    private pQueue;
    constructor(iComparator: Comparator<K>, initialElements?: ImmutableCollection<K>);
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
    * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
    */
    add(k: K): boolean;
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    */
    offer(k: K): boolean;
    poll(): K;
    removeQueue(): K;
    peek(): K;
    element(): K;
    /**
    * Removes all of the elements from this collection. The collection be empty after this call returns.
    */
    clear(): void;
    /**
    * Removes the first occurrence of the specified element from this collection, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
    * @param {K} t element to be removed from this collection, if present
    * @return {K} true if this collection contained the specified element
    */
    remove(k: K): boolean;
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    immutableCollection(): ImmutableCollection<K>;
    /**
    * Returns the number of elements in this collection.
    * @return {number} the number of elements in this collection
    */
    size(): number;
    /**
    * Returns true if this collection contains no elements.
    * @return {boolean} true if this collection contains no elements
    */
    isEmpty(): boolean;
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    iterator(): JIterator<K>;
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    [Symbol.iterator](): Iterator<K>;
    /**
    * Returns true if this collection contains the specified element.
    * @param {K} t element whose presence in this collection is to be tested
    * @return {boolean} true if this collection contains the specified element
    */
    contains(k: K): boolean;
    /**
    * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
    * @param {Consumer} consumer - the action to be performed for each element
    */
    forEach(consumer: Consumer<K>): void;
    /**
    * Override JSON.stringify handling
    */
    toJSON(): string;
}
