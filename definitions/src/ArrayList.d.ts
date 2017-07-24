import { Collectable } from "./Collectable";
import { JIterator } from "./JIterator";
import { List } from "./List";
export declare class ArrayList<T extends Collectable> implements List<T>, Iterable<T> {
    elements: T[];
    sizeValue: number;
    /**
     * Appends the specified element to the end of this list
     * @param {T} t element to Append
     * @return {boolean} true if this collection changed as a result of the call
     */
    add(t: T): boolean;
    /**
     * Inserts the specified element at the specified position in this list. Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).
     * @param {number} index index at which the specified element is to be inserted
     * @param {T} t element to be inserted
     */
    addElement(index: number, t: T): void;
    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    clear(): void;
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
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    isEmpty(): boolean;
    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    set(index: number, element: T): T;
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    size(): number;
    /**
     * Returns a Java style iterator
     * @return {JIterator<T>} the Java style iterator
     */
    iterator(): JIterator<T>;
    /**
     * Returns a TypeScript style iterator
     * @return {Iterator<T>} the TypeScript style iterator
     */
    [Symbol.iterator](): Iterator<T>;
}
export declare class ArrayListJIterator<T extends Collectable> implements JIterator<T> {
    private offset;
    private arraylist;
    constructor(iArrayList: ArrayList<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class ArrayListIterator<T extends Collectable> implements Iterator<T> {
    private offset;
    private arraylist;
    constructor(iArrayList: ArrayList<T>);
    next(value?: any): IteratorResult<T>;
}
