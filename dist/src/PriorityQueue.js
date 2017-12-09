"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TreeSet_1 = require("./TreeSet");
var PriorityQueue = (function () {
    function PriorityQueue(iComparator, initialElements) {
        this.initialElements = initialElements;
        this.pQueue = new TreeSet_1.TreeSet(iComparator);
        if ((initialElements !== null) && (initialElements !== undefined)) {
            for (var iter = initialElements.iterator(); iter.hasNext();) {
                var t = iter.next();
                this.add(t);
            }
        }
    }
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
    * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
    */
    PriorityQueue.prototype.add = function (k) {
        return this.pQueue.add(k);
    };
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    */
    PriorityQueue.prototype.offer = function (k) {
        return this.pQueue.add(k);
    };
    /*
    * Retrieves and removes the head of this queue, or returns null if this queue is empty.
    */
    PriorityQueue.prototype.poll = function () {
        if (this.pQueue.isEmpty())
            return null;
        return this.pQueue.pollFirst();
    };
    /*
    * Retrieves and removes the head of this queue. This method differs from poll only in that it returns undefined if this queue is empty
    */
    PriorityQueue.prototype.removeQueue = function () {
        if (this.pQueue.isEmpty())
            return undefined;
        return this.pQueue.pollFirst();
    };
    /*
    * Retrieves, but does not remove, the head of this queue, or returns null if this queue is empty.
    */
    PriorityQueue.prototype.peek = function () {
        if (this.pQueue.isEmpty())
            return null;
        return this.pQueue.first();
    };
    /*
    * Retrieves, but does not remove, the head of this queue. This method differs from peek only in that it returns undefined if this queue is empty.
    */
    PriorityQueue.prototype.element = function () {
        if (this.pQueue.isEmpty())
            return undefined;
        return this.pQueue.first();
    };
    /**
    * Removes all of the elements from this collection. The collection be empty after this call returns.
    */
    PriorityQueue.prototype.clear = function () {
        if (this.pQueue.isEmpty())
            return;
        this.pQueue.clear();
    };
    /**
    * Removes the first occurrence of the specified element from this collection, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
    * @param {K} t element to be removed from this collection, if present
    * @return {K} true if this collection contained the specified element
    */
    PriorityQueue.prototype.remove = function (k) {
        return this.pQueue.remove(k);
    };
    /**
    * Returns an ImmutableCollection backed by this Collection
    */
    PriorityQueue.prototype.immutableCollection = function () {
        return this.pQueue.immutableCollection();
    };
    /**
    * Returns the number of elements in this collection.
    * @return {number} the number of elements in this collection
    */
    PriorityQueue.prototype.size = function () {
        return this.pQueue.size();
    };
    /**
    * Returns true if this collection contains no elements.
    * @return {boolean} true if this collection contains no elements
    */
    PriorityQueue.prototype.isEmpty = function () {
        return this.pQueue.isEmpty();
    };
    /**
    * Returns a Java style iterator
    * @return {JIterator<K>} the Java style iterator
    */
    PriorityQueue.prototype.iterator = function () {
        return this.pQueue.iterator();
    };
    /**
    * Returns a TypeScript style iterator
    * @return {Iterator<K>} the TypeScript style iterator
    */
    PriorityQueue.prototype[Symbol.iterator] = function () {
        return this.pQueue[Symbol.iterator]();
    };
    /**
    * Returns true if this collection contains the specified element.
    * @param {K} t element whose presence in this collection is to be tested
    * @return {boolean} true if this collection contains the specified element
    */
    PriorityQueue.prototype.contains = function (k) {
        return this.pQueue.contains(k);
    };
    return PriorityQueue;
}());
exports.PriorityQueue = PriorityQueue;
