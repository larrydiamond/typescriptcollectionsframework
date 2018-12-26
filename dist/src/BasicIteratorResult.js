"use strict";
/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * BasicIteratorResult is often used when using the TypeScript style iteration.
 *
 * It provides a done boolean and a value object, as per the IteratorResult class in TypeScript
 */
var BasicIteratorResult = /** @class */ (function () {
    function BasicIteratorResult(iDone, iValue) {
        this.done = iDone;
        this.value = iValue;
    }
    return BasicIteratorResult;
}());
exports.BasicIteratorResult = BasicIteratorResult;
