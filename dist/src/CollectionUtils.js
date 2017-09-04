"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionUtils = (function () {
    function CollectionUtils() {
    }
    CollectionUtils.getStringComparator = function () {
        var sortString = {
            compare: function (o1, o2) {
                if (o1 === o2)
                    return 0;
                if (o1 === null)
                    return -1;
                if (o1 === undefined)
                    return -1;
                if (o2 === null)
                    return 1;
                if (o2 === undefined)
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
                if (o1 === null)
                    return -1;
                if (o1 === undefined)
                    return -1;
                if (o2 === null)
                    return 1;
                if (o2 === undefined)
                    return 1;
                if (o1 < o2)
                    return -1;
                return 1;
            }
        };
        return sortNumber;
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
