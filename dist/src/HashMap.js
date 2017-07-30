"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("./ArrayList");
var BasicMapEntry_1 = require("./BasicMapEntry");
var HashMap = (function () {
    function HashMap() {
        this.data = null;
        this.data = new ArrayList_1.ArrayList();
    }
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
    */
    HashMap.prototype.put = function (key, value) {
        var mapEntry = this.getMapEntry(key);
        if (mapEntry === null) {
            var hashCode = key.hashCode();
            return null; // TODO
        }
        else {
            var tmp = mapEntry.getValue();
            mapEntry.setValue(value);
            return tmp;
        }
    };
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    HashMap.prototype.size = function () {
        var tmp = 0;
        return tmp; // TODO
    };
    /**
    * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
    */
    HashMap.prototype.get = function (key) {
        var hashCode = key.hashCode();
        return null; // TODO
    };
    HashMap.prototype.getMapEntry = function (key) {
        return null; // TODO
    };
    return HashMap;
}());
exports.HashMap = HashMap;
var HashMapEntry = (function (_super) {
    __extends(HashMapEntry, _super);
    function HashMapEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashMapEntry.prototype.setValue = function (iValue) {
        this.value = iValue;
    };
    return HashMapEntry;
}(BasicMapEntry_1.BasicMapEntry));
