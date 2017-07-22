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
