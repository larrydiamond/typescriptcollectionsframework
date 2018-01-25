/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Consumer } from "./Consumer";
import { JIterator } from "./JIterator";
/**
 * The root interface in the collection hierarchy. A collection represents a group of objects, known as its elements.
 * Some collections allow duplicate elements and others do not. Some are ordered and others unordered.
 * This framework does not provide any direct implementations of this interface: it provides implementations of more specific subinterfaces like Set and List.
 * This interface is typically used to pass collections around and query them where maximum generality is desired.
 *
 * Methods that modify collections are not defined in this class, they are instead defined in Collection or some subinterface.<br>
 * Some collection implementations have restrictions on the elements that they may contain. For example, some implementations prohibit null and / or undefined elements.
 */
export interface ImmutableCollection<T> {
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
     * @return {JIterator<T>} the Java style iterator
     */
    iterator(): JIterator<T>;
    /**
     * Returns a TypeScript style iterator
     * @return {Iterator<T>} the TypeScript style iterator
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Returns true if this collection contains the specified element.
     * @param {T} t element whose presence in this collection is to be tested
     * @return {boolean} true if this collection contains the specified element
     */
    contains(t: T): boolean;
    /**
     * Performs the given action for each element until all elements have been processed or the action throws and exception.
     * Exceptions thrown by the action are relayed to the caller
     */
    forEach(action: Consumer<T>): void;
}
