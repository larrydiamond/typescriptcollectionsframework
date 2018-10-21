/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { ImmutableSet } from "./ImmutableSet";
/**
 * Decorates a set of other sets to provide a single unified view.
 *
 * This class corresponds to org.apache.commons.collections4.set.CompositeSet
 */
export declare class CompositeSet<K> implements ImmutableSet<K> {
    constructor(...inputs: ImmutableSet<K>);
}
