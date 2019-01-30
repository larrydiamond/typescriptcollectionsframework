"use strict";
/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("./AllFieldCollectable");
var ArrayList_1 = require("./ArrayList");
var BasicMapEntry_1 = require("./BasicMapEntry");
var HashMap_1 = require("./HashMap");
var HashClasses_1 = require("./HashClasses");
var HashSet_1 = require("./HashSet");
/**
 * This class consists exclusively of static methods that operate on or return collections.
 *
 * It contains polymorphic algorithms that operate on collections, "wrappers", which return a new collection backed by a specified collection, and a few other odds and ends.
 */
var Collections = /** @class */ (function () {
    function Collections() {
    }
    /**
     * Returns a Comparator that works correctly for string native objects
     */
    Collections.getStringComparator = function () {
        var sortString = {
            compare: function (o1, o2) {
                if (o1 === o2)
                    return 0;
                if (o1 === undefined)
                    return -1;
                if (o2 === undefined)
                    return 1;
                if (o1 === null)
                    return -1;
                if (o2 === null)
                    return 1;
                if (o1 < o2)
                    return -1;
                return 1;
            }
        };
        return sortString;
    };
    /**
     * Returns a Comparator that works correctly for number native objects
     */
    Collections.getNumberComparator = function () {
        var sortNumber = {
            compare: function (o1, o2) {
                if (o1 === o2)
                    return 0;
                if (o1 === undefined)
                    return -1;
                if (o2 === undefined)
                    return 1;
                if (o1 === null)
                    return -1;
                if (o2 === null)
                    return 1;
                if (o1 < o2)
                    return -1;
                return 1;
            }
        };
        return sortNumber;
    };
    /**
     * Returns a hash code good for string objects
     */
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
    /**
     * Returns a hash code good for Collections for objects
     */
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
    /**
     * Returns a hash code good for number objects
     */
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
    /**
     * Returns an ImmutableList of the entries passed in, using an AllFieldCollectable as the Collectable
     */
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
        var list = new ArrayList_1.ArrayList();
        return list.immutableList();
    };
    Collections.emptySet = function () {
        var tmp = new HashSet_1.HashSet();
        return tmp.immutableSet();
    };
    Collections.emptyMultiSet = function () {
        var tmp = new HashClasses_1.HashMultiSet();
        return tmp.immutableMultiSet();
    };
    Collections.emptyMap = function () {
        var tmp = new HashMap_1.HashMap();
        return tmp.immutableMap();
    };
    /**
     * Returns an Collectable made from the Comparator passed in
     */
    Collections.collectableFromComparator = function (iComp) {
        var tmp = {
            equals: function (o1, o2) {
                if (0 === iComp.compare(o1, o2))
                    return true;
                else
                    return false;
            }
        };
        return tmp;
    };
    /**
     * This method creates a Collectable for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
     */
    Collections.dynamicCollectable = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var tmp = {
            equals: function (o1, o2) {
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
                for (var loop = 0; loop < values.length; loop++) {
                    var a = o1[values[loop]];
                    var b = o2[values[loop]];
                    if (a === undefined) {
                        if (b !== undefined) {
                            return false;
                        }
                    }
                    if (a === null) {
                        if (b !== null) {
                            return false;
                        }
                    }
                    if (b === undefined) {
                        if (a !== undefined) {
                            return false;
                        }
                    }
                    if (b === null) {
                        if (a !== null) {
                            return false;
                        }
                    }
                    if (JSON.stringify(a) !== JSON.stringify(b)) {
                        return false;
                    }
                }
                return true;
            }
        };
        return tmp;
    };
    /**
     * This method creates a Hashable for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
     */
    Collections.dynamicHashable = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var tmp = {
            equals: function (o1, o2) {
                // console.log ("Equals dynamic hashable " + JSON.stringify (o1) + " vs " + JSON.stringify (o2));
                if (o1 === undefined) {
                    if (o2 === undefined) {
                        // console.log ("return true both undefined");
                        return true;
                    }
                    else {
                        // console.log ("return false one undefined");
                        return false;
                    }
                }
                if (o1 === null) {
                    if (o2 === null) {
                        // console.log ("return true both null");
                        return true;
                    }
                    else {
                        // console.log ("return false one null");
                        return false;
                    }
                }
                if ((o2 === null) || (o2 === undefined)) {
                    // console.log ("return false null or undefined");
                    return false;
                }
                for (var loop = 0; loop < values.length; loop++) {
                    var a = o1[values[loop]];
                    var b = o2[values[loop]];
                    // console.log ("field " + values [loop] + " of " + values.length + " - " + JSON.stringify(a) + " vs " + JSON.stringify(b));
                    if (a === undefined) {
                        if (b !== undefined) {
                            // console.log ("return false one undefined");
                            return false;
                        }
                    }
                    if (a === null) {
                        if (b !== null) {
                            // console.log ("return false one null");
                            return false;
                        }
                    }
                    if (b === undefined) {
                        if (a !== undefined) {
                            // console.log ("return false one undefined");
                            return false;
                        }
                    }
                    if (b === null) {
                        if (a !== null) {
                            // console.log ("return false one null");
                            return false;
                        }
                    }
                    if (JSON.stringify(a) !== JSON.stringify(b)) {
                        // console.log ("stringify notequal");
                        return false;
                    }
                }
                // console.log ("stringify all stringify equal true");
                return true;
            },
            hashCode: function (o) {
                if (o === undefined)
                    return 0;
                if (o === null)
                    return 0;
                var htmp = "";
                for (var loop = 0; loop < values.length; loop++) {
                    var a = o[values[loop]];
                    htmp = htmp + " " + JSON.stringify(a);
                }
                // console.log ("Start of hashcode for " + JSON.stringify(o) + " - " + JSON.stringify(htmp) + " " + Collections.getHashCodeForString(JSON.stringify(htmp)));
                return Collections.getHashCodeForString(JSON.stringify(htmp));
            }
        };
        return tmp;
    };
    /**
     * This method creates a Comparator for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
     */
    Collections.dynamicComparator = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var tmp = {
            compare: function (o1, o2) {
                if (o1 === undefined) {
                    if (o2 === undefined) {
                        return 0;
                    }
                    else {
                        return -1;
                    }
                }
                if (o2 === undefined)
                    return 1;
                if (o1 === null) {
                    if (o2 === null) {
                        return 0;
                    }
                    else {
                        return -1;
                    }
                }
                if (o2 === null)
                    return 1;
                for (var loop = 0; loop < values.length; loop++) {
                    var a = o1[values[loop]];
                    var b = o2[values[loop]];
                    if (a === undefined) {
                        if (b === undefined) {
                            return 0;
                        }
                        else {
                            return -1;
                        }
                    }
                    if (b === undefined)
                        return 1;
                    if (a === null) {
                        if (b === null) {
                            return 0;
                        }
                        else {
                            return -1;
                        }
                    }
                    if (b === null)
                        return 1;
                    if (typeof a === "boolean") {
                        var x = Collections.booleanCompare(a, b);
                        if (x !== 0)
                            return x;
                    }
                    else {
                        if (typeof a === "string") {
                            var x = Collections.stringCompare(a, b);
                            if (x !== 0)
                                return x;
                        }
                        else {
                            if (typeof a === "number") {
                                var x = Collections.numberCompare(a, b);
                                if (x !== 0)
                                    return x;
                            }
                            else {
                                // other types?
                            }
                        }
                    }
                }
                return 0;
            }
        };
        return tmp;
    };
    Collections.booleanCompare = function (a, b) {
        if (a === b) {
            return 0;
        }
        if (a === false) {
            return -1;
        }
        return 1;
    };
    Collections.numberCompare = function (a, b) {
        if (a === b) {
            return 0;
        }
        if (a < b) {
            return -1;
        }
        return 1;
    };
    Collections.stringCompare = function (a, b) {
        return a.localeCompare(b);
    };
    /**
     * Returns an Array of the elements of this Immutable Collection
     */
    Collections.asArray = function (icoll) {
        if (icoll === null)
            return null;
        if (icoll === undefined)
            return undefined;
        var tmp = new Array(icoll.size());
        //    console.log ("AsArray started size = " + icoll.size());
        var offset = 0;
        for (var iter = icoll.iterator(); iter.hasNext();) {
            //      console.log ("AsArray iteration offset " + offset);
            var elem = iter.next();
            tmp[offset] = elem;
            //      console.log ("AsArray iteration " + offset + " " + JSON.stringify(tmp[offset]));
            offset = offset + 1;
        }
        return tmp;
    };
    /**
     * Returns an Array of the elements of this Immutable Map
     */
    Collections.asArrayMap = function (imap) {
        if (imap === null)
            return null;
        if (imap === undefined)
            return undefined;
        var tmp = new Array(imap.size());
        //    console.log ("AsArray started size = " + icoll.size());
        var offset = 0;
        for (var iter = imap.entrySet().iterator(); iter.hasNext();) {
            //      console.log ("AsArray iteration offset " + offset);
            var entry = iter.next();
            var bme = new BasicMapEntry_1.BasicMapEntry(entry.getKey(), entry.getValue());
            tmp[offset] = bme;
            //      console.log ("AsArray iteration " + offset + " " + JSON.stringify(tmp[offset]));
            offset = offset + 1;
        }
        return tmp;
    };
    Collections.containsValue = function (map, value) {
        if ((map === null) || (map === undefined))
            return false;
        for (var iter = map.entrySet().iterator(); iter.hasNext();)
            if (value === iter.next().getValue())
                return true;
        return false;
    };
    return Collections;
}());
exports.Collections = Collections;
