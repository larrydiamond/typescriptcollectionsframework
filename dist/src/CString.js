"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CString = (function () {
    function CString(istr) {
        this.str = istr;
    }
    CString.prototype.equals = function (t) {
        if (this.str === t)
            return true;
        return false;
    };
    CString.prototype.get = function () {
        return this.str;
    };
    return CString;
}());
exports.CString = CString;
