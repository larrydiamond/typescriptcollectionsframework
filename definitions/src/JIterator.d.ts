export interface JIterator<T> {
    /**
     * Returns true if the iteration has more elements.
     * @return {boolean} true if the iteration has more elements
     */
    hasNext(): boolean;
    /**
     * Returns the next element in the iteration.
     * @return {T} the next element in the iteration
     */
    next(): T;
}
