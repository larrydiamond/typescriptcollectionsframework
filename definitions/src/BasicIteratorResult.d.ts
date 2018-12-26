/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
/**
 * BasicIteratorResult is often used when using the TypeScript style iteration.
 *
 * It provides a done boolean and a value object, as per the IteratorResult class in TypeScript
 */
export declare class BasicIteratorResult<T> implements IteratorResult<T> {
    done: boolean;
    value: T;
    constructor(iDone: boolean, iValue: T);
}
