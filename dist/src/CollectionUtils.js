"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("./ArrayList");
var CollectionUtils = (function () {
    function CollectionUtils() {
    }
    CollectionUtils.getStringComparator = function () {
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
    CollectionUtils.getNumberComparator = function () {
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
    CollectionUtils.prototype.getHashCodeForString = function (o) {
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
    CollectionUtils.prototype.getHashCodeForStrings = function (o) {
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
    CollectionUtils.prototype.getHashCodeForNumber = function (o) {
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
    CollectionUtils.prototype.stringList = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var list = new ArrayList_1.ArrayList(new GenericCollectable());
        for (var loop = 0; loop < values.length; loop++) {
            var tmp = values[loop];
            list.add(tmp);
        }
        return list.immutableList();
    };
    CollectionUtils.prototype.numberList = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var list = new ArrayList_1.ArrayList(new GenericCollectable());
        for (var loop = 0; loop < values.length; loop++) {
            var tmp = values[loop];
            list.add(tmp);
        }
        return list.immutableList();
    };
    return CollectionUtils;
}());
exports.CollectionUtils = CollectionUtils;
var GenericCollectable = (function () {
    function GenericCollectable() {
    }
    GenericCollectable.prototype.equals = function (o1, o2) {
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
    return GenericCollectable;
}());
exports.GenericCollectable = GenericCollectable;
var GenericHashable = (function () {
    function GenericHashable() {
    }
    GenericHashable.prototype.equals = function (o1, o2) {
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
    GenericHashable.prototype.hashCode = function (o) {
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
    return GenericHashable;
}());
exports.GenericHashable = GenericHashable;
