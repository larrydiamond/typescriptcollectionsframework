"use strict";
/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AllFieldCollectable is a convenience class that can be used whenever you want to specify that
 * all the fields in the object should be used as part of the Collectable.
 *
 * It also works perfectly well for native types like number and string, saving you the trouble
 * of creating Collectables for many normal cases.
 *
 * It operates using the JSON.stringify of the objects to be compared.
 *
 * There is a public static instance of this class that can be used rather than constructing new
 * instances for every Collection.
 */
var AllFieldCollectable = /** @class */ (function () {
    function AllFieldCollectable() {
    }
    AllFieldCollectable.prototype.equals = function (o1, o2) {
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
    AllFieldCollectable.instance = new AllFieldCollectable();
    return AllFieldCollectable;
}());
exports.AllFieldCollectable = AllFieldCollectable;
