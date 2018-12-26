/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

/**
 * Represents an operation that accepts a single input argument and returns no result. 
 * 
 * Unlike most other functional interfaces, Consumer is expected to operate via side-effects.
 * 
 * This is a functional interface whose functional method is accept(t:T).
 */
export interface Consumer<T> {
  /**
   * Performs this operation on the given argument
   * @param {T} t the input argument
   */
  accept (t:T) : void;
}
