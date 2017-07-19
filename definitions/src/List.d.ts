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
    get(index: number): T;
    set(index: number, element: T): T;
}
