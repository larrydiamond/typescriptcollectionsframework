"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("./AllFieldCollectable");
var ArrayList_1 = require("./ArrayList");
var Collections = (function () {
    function Collections() {
    }
    Collections.getStringComparator = function () {
        var sortString = {
            compare: function (o1, o2) {
                if (o1 === o2)
                    return 0;
                if (o1 === undefined)
                    return -1;
                if (o1 === null)
                    return -1;
                if (o2 === undefined)
                    return 1;
                if (o2 === null)
                    return 1;
                if (o1 < o2)
                    return -1;
                return 1;
            }
        };
        return sortString;
    };
    Collections.getNumberComparator = function () {
        var sortNumber = {
            compare: function (o1, o2) {
                if (o1 === o2)
                    return 0;
                if (o1 === undefined)
                    return -1;
                if (o1 === null)
                    return -1;
                if (o2 === undefined)
                    return 1;
                if (o2 === null)
                    return 1;
                if (o1 < o2)
                    return -1;
                return 1;
            }
        };
        return sortNumber;
    };
    Collections.prototype.getHashCodeForString = function (o) {
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
    Collections.prototype.getHashCodeForStrings = function (o) {
        if (o === undefined) {
            return 0;
        }
        if (o === null) {
            return 0;
        }
        var tmp = 0;
        for (var iter = o.iterator(); iter.hasNext();) {
            var ostr = iter.next();
            tmp = ((tmp * 256) + this.getHashCodeForString(ostr)) % 1000000000;
        }
        return tmp;
    };
    Collections.prototype.getHashCodeForNumber = function (o) {
        if (o === undefined) {
            return 0;
        }
        if (o === null) {
            return 0;
        }
        var tmp = o;
        while ((tmp < 1000000000) && (Math.floor(tmp) !== tmp)) {
            tmp = tmp * 10;
        }
        return tmp;
    };
    Collections.prototype.stringList = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var list = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        for (var loop = 0; loop < values.length; loop++) {
            var tmp = values[loop];
            list.add(tmp);
        }
        return list.immutableList();
    };
    Collections.prototype.numberList = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var list = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        for (var loop = 0; loop < values.length; loop++) {
            var tmp = values[loop];
            list.add(tmp);
        }
        return list.immutableList();
    };
    return Collections;
}());
exports.Collections = Collections;
