/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */

import {Collectable} from "./Collectable";

 /**
  * The Hashable interface provides a mechanism to compare objects to see if they are equal and to calculate hash codes for objects.
  * 
  * This is a replacement for the equals method and hashcode method in Java
  */
 export interface Hashable<T> extends Collectable<T> {
  /**
   * Returns a hash code value for the object. 
   * 
   * This method is supported for the benefit of hash tables such as those provided by HashMap.
   * 
   * The general contract of hashCode is:
   * Whenever it is invoked on the same object more than once during an execution of an application,
   * the hashCode method must consistently return the same whole number as a number,
   * provided no information used in equals comparisons on the object is modified.
   * 
   * This number need not remain consistent from one execution of an application to another execution of the same application.
   * 
   * If two objects are equal according to the equals(Collectable) method,
   * then calling the hashCode method on each of the two objects must produce the same number result.
   * 
   * @return {number} a hash code value for this object
   */
  hashCode (o:T) : number;
}
