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
        if (this.str === undefined)
            if (t === undefined)
                return true;
        if (this.str === null)
            if (t === null)
                return true;
        if (this.str === t)
            return true;
        return false;
    };
    CString.prototype.get = function () {
        return this.str;
    };
    CString.prototype.hashCode = function () {
        if (this.str === undefined)
            return 1;
        if (this.str === null)
            return 1;
        var hash = 0;
        for (var loop = 0; loop < this.str.length; loop++) {
            var tmp = this.str.charCodeAt(loop);
            hash = hash + (tmp * loop);
        }
        return hash;
    };
    return CString;
}());
exports.CString = CString;
