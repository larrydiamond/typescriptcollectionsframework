import { Consumer } from "./Consumer";
import { ImmutableCollection } from "./ImmutableCollection";
import { JIterator } from "./JIterator";
/**
 * Decorates a collection of other collection to provide a single unified view.
 *
 * This class corresponds to org.apache.commons.collections4.collection.CompositeCollection
 */
export declare class CompositeCollection<K> implements ImmutableCollection<K> {
    private impl;
    constructor(...values: ImmutableCollection<K>[]);
    /**
    * Returns the number of elements in this set (its cardinality).
    * @return {number} the number of elements in this set (its cardinality)
    */
    size(): number;
    /**
    * Returns true if this set contains no elements.
    * @return {boolean} true if this set contains no elements
    */
    isEmpty(): boolean;
    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    contains(item: K): boolean;
    /**
     * Performs the given action for each element until all elements have been processed or the action throws and exception.
     * Exceptions thrown by the action are relayed to the caller
     */
    forEach(consumer: Consumer<K>): void;
    /**
    * Override JSON.stringify handling
    */
    toJSON(): string;
    /**
     * Returns a Java style iterator.   The order of the elements returned by the iterator should not be relied upon.
     * Since the underlying Collections could be modified between the call to hasNext() and next(),
     * there is no guarantee that next() will return a value even if hasNext() returns true.
     * In this scenario then next() will return undefined
     * @return {JIterator<K>} the Java style iterator
     */
    iterator(): JIterator<K>;
    /**
    * Returns a TypeScript style iterator.   The order of the elements returned by the iterator should not be relied upon
    * @return {Iterator<K>} the TypeScript style iterator
    */
    [Symbol.iterator](): Iterator<K>;
}
