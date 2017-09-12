/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Collectable} from "./Collectable";
import {ImmutableCollection} from "./ImmutableCollection";

export interface ImmutableList<T> extends ImmutableCollection<T> {
  /**
  * Returns the element at the specified position in this list.
  * @param {number} index index of the element to return
  * @return {T} the element at the specified position in this list
  */
  get(index:number):T;

  /**
  * Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.
  * @param {T} t element to search for
  * @return {number} the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  indexOf (t:T) : number;

  /**
  * Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  * @param {T} t element to search for
  * @return {number} the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element
  */
  lastIndexOf (t:T) : number;

  /**
  * Returns true if this list contains the specified element.
  * @param {T} t element whose presence in this list is to be tested
  * @return {boolean} true if this list contains the specified element
  */
  contains (t:T) : boolean

  /**
  * Returns true if this list contains no elements.
  * @return {boolean} true if this list contains no elements
  */
  isEmpty () : boolean;
}
