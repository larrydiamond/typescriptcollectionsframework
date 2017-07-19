"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList = (function () {
    function ArrayList() {
        this.elements = null;
        this.sizeValue = 0;
    }
    ArrayList.prototype.add = function (t) {
        if (this.elements == null) {
            this.elements = new Array();
        }
        this.elements.push(t);
        this.sizeValue = this.sizeValue + 1;
        return true;
    };
    ArrayList.prototype.clear = function () {
        this.elements = new Array();
        this.sizeValue = 0;
    };
    ArrayList.prototype.get = function (index) {
        return this.elements[index];
    };
    ArrayList.prototype.indexOf = function (t) {
        if (this.elements == null)
            return -1;
        if (this.sizeValue <= 0)
            return -1;
        for (var loop = 0; loop < this.sizeValue; loop++) {
            var e = this.get(loop);
            if (e.equals(t))
                return loop;
        }
        return -1;
    };
    ArrayList.prototype.isEmpty = function () {
        if (this.sizeValue == 0)
            return true;
        return false;
    };
    ArrayList.prototype.set = function (index, element) {
        var tmp = this.elements[index];
        this.elements[index] = element;
        return tmp;
    };
    ArrayList.prototype.size = function () {
        return this.sizeValue;
    };
    return ArrayList;
}());
exports.ArrayList = ArrayList;
