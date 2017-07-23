import { Comparator } from "./Comparator";
import { JIterator } from "./JIterator";
import { Set } from "./Set";
export declare class NaiveSet<K> implements Set<K> {
    private datastore;
    private comparator;
    constructor(iComparator: Comparator<K>);
    /**
    * Adds the specified element to this set if it is not already present.
    * @param {K} element element to be added to this set
    * @return {boolean} true if this set did not already contain the specified element
    */
    add(element: K): boolean;
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
    * Returns the first (lowest) element currently in this set.
    * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
    */
    first(): K;
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
}
export declare class NaiveSetJIterator<T> implements JIterator<T> {
    private location;
    private set;
    constructor(iSet: NaiveSet<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class NaiveSetIterator<T> implements Iterator<T> {
    private location;
    private set;
    constructor(iSet: NaiveSet<T>);
    next(value?: any): IteratorResult<T>;
}
