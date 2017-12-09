/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {JIterator} from "./JIterator";

export interface ImmutableCollection<T> {

  /**
  * Returns the number of elements in this collection.
  * @return {number} the number of elements in this collection
  */
  size () : number;

  /**
  * Returns true if this collection contains no elements.
  * @return {boolean} true if this collection contains no elements
  */
  isEmpty () : boolean;

 /**
  * Returns a Java style iterator
  * @return {JIterator<T>} the Java style iterator
  */
  iterator():JIterator<T>;

  /**
   * Returns a TypeScript style iterator
   * @return {Iterator<T>} the TypeScript style iterator
   */
  [Symbol.iterator] ():Iterator<T>;

  /**
   * Returns true if this collection contains the specified element.
   * @param {T} t element whose presence in this collection is to be tested
   * @return {boolean} true if this collection contains the specified element
   */
  contains (t:T) : boolean;
}
