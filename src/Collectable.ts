/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

 /**
  * The Collectable interface provides a mechanism to compare objects to see if they are equal.
  * This is a replacement for the equals method in Java
  */

export interface Collectable<T> {
 /**
  * Compares its two arguments for equality
  * 
  * The equals method implements an equivalence relation on non-null object references:
  * 
  * It is reflexive: for any reference value x, x.equals(x) should return true.
  * 
  * It is symmetric: for any reference values x and y, x.equals(y) should return true if and only if y.equals(x) returns true.
  * 
  * It is transitive: for any reference values x, y, and z, if x.equals(y) returns true and y.equals(z) returns true, then x.equals(z) should return true.
  * 
  * It is consistent: for any reference values x and y, multiple invocations of x.equals(y) consistently return true or consistently return false, provided no information used in equals comparisons on the objects is modified.
  * 
  * For any non-null reference value x, x.equals(null) should return false.
  * 
  * For any non-undefined reference value x, x.equals(undefined) should return false.
  * 
  * The equals method implements the most discriminating possible equivalence relation on objects; 
  * that is, for any non-null and non-undefined reference values x and y, 
  * this method returns true if and only if x and y refer to the same object (x == y has the value true).
  * @param {T} t element to compare
  * @return {boolean} true if the other element is "equal" to this one
  */

  equals (o1:T, o2:T) : boolean;
}
