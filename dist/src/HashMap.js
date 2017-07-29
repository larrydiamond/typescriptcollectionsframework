"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap = (function () {
    function HashMap() {
        this.nativeDictionary = {};
    }
    /**
    * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    * @param {K} key key with which the specified value is to be associated
    * @param {V} value value to be associated with the specified key
    * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
    */
    HashMap.prototype.put = function (key, value) {
        var tmp = this.nativeDictionary[key];
        this.nativeDictionary[key] = value;
        return tmp;
    };
    /**
    * Returns the number of key-value mappings in this map.
    * @return {number} the number of key-value mappings in this map
    */
    HashMap.prototype.size = function () {
        var tmp = 0;
        for (var entry in this.nativeDictionary) {
            tmp = tmp + 1;
        }
        return tmp;
    };
    HashMap.prototype.printMap = function () {
        var tmp = 0;
        for (var entry in this.nativeDictionary) {
            console.log("Entry " + JSON.stringify(entry) + " = " + tmp);
            //      let {key:K,value:V} = entry;
            //      console.log ("Entry " + JSON.stringify(key) + JSON.stringify(value) + " = " + tmp);
            tmp = tmp + 1;
        }
        console.log("Map " + JSON.stringify(this.nativeDictionary) + " = " + tmp);
    };
    /**
    * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
    * @param {K} key the key whose associated value is to be returned
    * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
    */
    HashMap.prototype.get = function (key) {
        return this.nativeDictionary[key];
    };
    return HashMap;
}());
exports.HashMap = HashMap;
