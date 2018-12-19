/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Collection } from "./Collection";
import { ImmutableMultiSet } from "./ImmutableMultiSet";
export interface MultiSet<K> extends ImmutableMultiSet<K>, Collection<K> {
    /**
    * Returns an ImmutableMultiSet backed by this MultiSet
    */
    immutableMultiSet(): ImmutableMultiSet<K>;
    /**
    * Adds the specified element to this MultiSet
    * @param {K} element element to be added to this MultiSet
    * @return {boolean} true if this MultiSet did not already contain the specified element
    */
    add(element: K): boolean;
}
