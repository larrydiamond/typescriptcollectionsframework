/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Collectable } from "./Collectable";
export declare class AllFieldCollectable<T> implements Collectable<T> {
    equals(o1: T, o2: T): boolean;
    static instance: AllFieldCollectable<{}>;
}
