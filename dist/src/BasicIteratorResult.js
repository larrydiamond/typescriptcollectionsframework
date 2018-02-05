"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BasicIteratorResult = (function () {
    function BasicIteratorResult(iDone, iValue) {
        this.done = iDone;
        this.value = iValue;
    }
    return BasicIteratorResult;
}());
exports.BasicIteratorResult = BasicIteratorResult;
