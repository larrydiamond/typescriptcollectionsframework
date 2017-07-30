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
        if (this.num === undefined)
            if (t === undefined)
                return true;
        if (this.num === null)
            if (t === null)
                return true;
        if (this.num === t)
            return true;
        return false;
    };
    CNumber.prototype.get = function () {
        return this.num;
    };
    CNumber.prototype.hashCode = function () {
        if (this.num === undefined)
            return 1;
        if (this.num === null)
            return 1;
        var tmp = Math.abs(this.num);
        return Math.ceil(tmp);
    };
    return CNumber;
}());
exports.CNumber = CNumber;
