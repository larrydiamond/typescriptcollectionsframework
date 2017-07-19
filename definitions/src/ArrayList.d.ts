/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Collectable } from "./Collectable";
import { List } from "./List";
export declare class ArrayList<T extends Collectable> implements List<T> {
    elements: T[];
    sizeValue: number;
    add(t: T): boolean;
    clear(): void;
    get(index: number): T;
    indexOf(t: T): number;
    isEmpty(): boolean;
    set(index: number, element: T): T;
    size(): number;
}
