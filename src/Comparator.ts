/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */

/**
 * A comparison function, which imposes a total ordering on some collection of objects. <br>
 * Comparators are used to control the order of certain data structures (such as sorted sets or sorted maps).
 * The ordering imposed by a comparator c on a set of elements S is said to be consistent with equals if and only if c.compare(e1, e2)==0 has the same boolean value as e1.equals(e2) for every e1 and e2 in S.
 *
 * Caution should be exercised when using a comparator capable of imposing an ordering inconsistent with equals to order a sorted set (or sorted map). <br>
 * Suppose a sorted set (or sorted map) with an explicit comparator c is used with elements (or keys) drawn from a set S.
 * If the ordering imposed by c on S is inconsistent with equals, the sorted set (or sorted map) will behave "strangely."
 * In particular the sorted set (or sorted map) will violate the general contract for set (or map), which is defined in terms of equals.
 *
 * For example, suppose one adds two elements a and b such that (a.equals(b) && c.compare(a, b) != 0) to an empty TreeSet with comparator c.
 * The second add operation will return true (and the size of the tree set will increase) because a and b are not equivalent from the tree set's perspective,
 * even though this is contrary to the specification of the Set.add method.
 */
export interface Comparator<T> {
/**
 * Compares its two arguments for order. Returns a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.
 * In the foregoing description, the notation sgn(expression) designates the mathematical signum function, which is defined to return one of -1, 0, or 1 according to whether the value of expression is negative, zero or positive.
 * The implementor must ensure that sgn(compare(x, y)) == -sgn(compare(y, x)) for all x and y. (This implies that compare(x, y) must throw an exception if and only if compare(y, x) throws an exception.)
 * The implementor must also ensure that the relation is transitive: ((compare(x, y)>0) && (compare(y, z)>0)) implies compare(x, z)>0.
 * Finally, the implementor must ensure that compare(x, y)==0 implies that sgn(compare(x, z))==sgn(compare(y, z)) for all z.
 * It is generally the case, but not strictly required that (compare(x, y)==0) == (x.equals(y)). Generally speaking, any comparator that violates this condition should clearly indicate this fact. The recommended language is "Note: this comparator imposes orderings that are inconsistent with equals."
 * @param {T} o1 the first object to be compared.
 * @param {T} o2 the second object to be compared.
 * @return {number} a negative integer, zero, or a positive integer as the first argument is less than, equal to, or greater than the second.
 */
 compare(o1:T, o2:T) : number;
}
