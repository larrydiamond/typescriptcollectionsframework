"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CNumber = (function () {
    function CNumber(inum) {
        this.num = inum;
    }
    CNumber.prototype.equals = function (t) {
        if (this.num === t)
            return true;
        return false;
    };
    CNumber.prototype.get = function () {
        return this.num;
    };
    return CNumber;
}());
exports.CNumber = CNumber;
