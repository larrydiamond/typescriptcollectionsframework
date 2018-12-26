/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
/**
 * An iterator over a collection.
 *
 * This interface corresponds to java.util.Iterator
 */
export interface JIterator<T> {
    /**
     * Returns true if the iteration has more elements.
     * @return {boolean} true if the iteration has more elements
     */
    hasNext(): boolean;
    /**
     * Returns the next element in the iteration.
     * @return {T} the next element in the iteration
     */
    next(): T;
}
