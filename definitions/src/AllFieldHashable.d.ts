/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Hashable } from "./Hashable";
export declare class AllFieldHashable<T> implements Hashable<T> {
    equals(o1: T, o2: T): boolean;
    hashCode(o: T): number;
}
