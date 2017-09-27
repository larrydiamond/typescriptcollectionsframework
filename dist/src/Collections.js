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
var AllFieldHashable_1 = require("./AllFieldHashable");
var ArrayList_1 = require("./ArrayList");
var HashMap_1 = require("./HashMap");
var HashSet_1 = require("./HashSet");
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
    Collections.getHashCodeForString = function (o) {
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
    Collections.getHashCodeForStrings = function (o) {
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
    Collections.getHashCodeForNumber = function (o) {
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
    Collections.list = function () {
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
    Collections.emptyList = function () {
        var list = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        return list.immutableList();
    };
    Collections.emptySet = function () {
        var tmp = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        return tmp.immutableSet();
    };
    Collections.emptyMap = function () {
        var tmp = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        return tmp.immutableMap();
    };
    return Collections;
}());
exports.Collections = Collections;
