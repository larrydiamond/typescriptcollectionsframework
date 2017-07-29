/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { Collectable } from "./Collectable";
import { Collection } from "./Collection";
export interface List<T extends Collectable> extends Collection<T> {
    /**
     * Returns the element at the specified position in this list.
     * @param {number} index index of the element to return
     * @return {T} the element at the specified position in this list
     */
    get(index: number): T;
    /**
     * Replaces the element at the specified position in this list with the specified element (optional operation).
     * @param {number} index index of the element to replace
     * @param {T} element element to be stored at the specified position
     * @return {T} the element previously at the specified position
     */
    set(index: number, element: T): T;
}
