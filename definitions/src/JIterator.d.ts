/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Collectable } from "./Collectable";
export interface JIterator<T extends Collectable> {
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
