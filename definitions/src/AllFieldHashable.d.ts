/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
import { Hashable } from "./Hashable";
/**
 * AllFieldHashable is a convenience class that can be used whenever you want to specify that
 * all the fields in the object should be used as part of the Hashable.
 *
 * It also works perfectly well for native types like number and string, saving you the trouble
 * of creating Hashables for many normal cases.
 *
 * It operates using the JSON.stringify of the objects to be compared.
 *
 * There is a public static instance of this class that can be used rather than constructing new
 * instances for every Collection.
 */
export declare class AllFieldHashable<T> implements Hashable<T> {
    equals(o1: T, o2: T): boolean;
    hashCode(o: T): number;
    static instance: AllFieldHashable<unknown>;
}
