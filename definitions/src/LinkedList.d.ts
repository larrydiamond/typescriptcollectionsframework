import { Collectable } from "./Collectable";
import { Collection } from "./Collection";
import { JIterator } from "./JIterator";
import { List } from "./List";
export declare class LinkedList<T extends Collectable> implements List<T>, Iterable<T> {
    private firstNode;
    private lastNode;
    private numberElements;
    constructor();
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
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements
     */
    isEmpty(): boolean;
    /**
     * Removes all of the elements from this list. The list will be empty after this call returns.
     */
    clear(): void;
    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list
     */
    size(): number;
    /**
     * Returns true if this list contains the specified element.
     * @param {T} t element whose presence in this list is to be tested
     * @return {boolean} true if this list contains the specified element
     */
    contains(t: T): boolean;
    private getNode(t);
    /**
     * Removes the first occurrence of the specified element from this list, if it is present. If the list does not contain the element, it is unchanged. More formally, removes the element with the lowest index i such that (o==null ? get(i)==null : o.equals(get(i))) (if such an element exists). Returns true if this list contained the specified element (or equivalently, if this list changed as a result of the call).
     * @param {T} t element to be removed from this list, if present
     * @return {T} true if this list contained the specified element
     */
    removeElement(t: T): boolean;
    /**
     * Removes from this list all of its elements that are contained in the specified collection.
     * @param {Collection} c collection containing elements to be removed from this list
     * @return {boolean} true if this list changed as a result of the call
     */
    removeAll(c: Collection<T>): boolean;
    /**
     * Inserts all of the elements in the specified collection into this list, starting at the specified position. Shifts the element currently at that position (if any) and any subsequent elements to the right (increases their indices). The new elements will appear in the list in the order that they are returned by the specified collection's iterator.
     * @param {number} index index at which to insert the first element from the specified collection
     * @param {Collection} c collection containing elements to be added to this list
     * @return {boolean} true if this collection changed as a result of the call
     */
    addAll(c: Collection<T>, index?: number): boolean;
    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
     * @param {T} t element to search for
     * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    indexOf(t: T): number;
    /**
     * Removes the element at the specified position in this list. Shifts any subsequent elements to the left (subtracts one from their indices).
     * @param {number} index the index of the element to be removed
     * @return {T} the element that was removed from the list, undefined if the element does not exist
     */
    remove(index: number): T;
    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     * @param {T} t element to search for
     * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
     */
    lastIndexOf(t: T): number;
    /**
     * Returns the first element in this list.
     * @return {T} the first element in this list, null if the list is empty
     */
    getFirst(): T;
    getFirstNode(): LinkedListNode<T>;
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    get(index: number): T;
    /**
     * Replaces the element at the specified position in this list with the specified element.
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {number} the element previously at the specified position
     */
    set(index: number, element: T): T;
    /**
     * Indicates whether some other object is "equal to" this one.
     * The equals method implements an equivalence relation on non-null object references:
     * It is reflexive: for any non-null reference value x, x.equals(x) should return true.
     * It is symmetric: for any non-null reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.
     * It is transitive: for any non-null reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.
     * It is consistent: for any non-null reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.
     * For any non-null reference value x, x.equals(null) should return false.
     * The equals method implements the most discriminating possible equivalence relation on objects; that is, for any non-null reference values x and y, this method returns true if and only if x and y refer to the same object (x == y has the value true).
     * @param {T} t element to compare
     * @return {boolean} true if the other element is "equal" to this one
     */
    equals(t: any): boolean;
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
export declare class LinkedListNode<T extends Collectable> {
    previousNode: LinkedListNode<T>;
    nextNode: LinkedListNode<T>;
    payload: T;
    constructor(t: T);
}
export declare class LinkedListJIterator<T extends Collectable> implements JIterator<T> {
    private node;
    constructor(iList: LinkedList<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class LinkedListIterator<T extends Collectable> implements Iterator<T> {
    private node;
    constructor(iList: LinkedList<T>);
    next(value?: any): IteratorResult<T>;
}
