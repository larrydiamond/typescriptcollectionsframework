"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldHashable = (function () {
    function AllFieldHashable() {
    }
    AllFieldHashable.prototype.equals = function (o1, o2) {
        if (o1 === undefined) {
            if (o2 === undefined) {
                return true;
            }
            else {
                return false;
            }
        }
        if (o1 === null) {
            if (o2 === null) {
                return true;
            }
            else {
                return false;
            }
        }
        if ((o2 === null) || (o2 === undefined)) {
            return false;
        }
        if (JSON.stringify(o1) === JSON.stringify(o2))
            return true;
        return false;
    };
    ;
    AllFieldHashable.prototype.hashCode = function (o) {
        if (o === undefined) {
            return 0;
        }
        if (o === null) {
            return 0;
        }
        var tmp = JSON.stringify(o);
        var hash = 0;
        for (var loop = 0; loop < tmp.length; loop++) {
            var n = tmp.charCodeAt(loop);
            hash = ((hash * 256) + n) % 1000000000;
        }
        return hash;
    };
    ;
    return AllFieldHashable;
}());
exports.AllFieldHashable = AllFieldHashable;
