"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMapEntry = (function () {
    function BasicMapEntry(iKey, iValue) {
        this.key = iKey;
        this.value = iValue;
    }
    /**
    * Returns the key corresponding to this entry.
    * @return {K} the key corresponding to this entry
    */
    BasicMapEntry.prototype.getKey = function () {
        return this.key;
    };
    /**
    * Returns the value corresponding to this entry. If the mapping has been removed from the backing map (by the iterator's remove operation), the results of this call are undefined.
    * @return {V} the value corresponding to this entry
    */
    BasicMapEntry.prototype.getValue = function () {
        return this.value;
    };
    return BasicMapEntry;
}());
exports.BasicMapEntry = BasicMapEntry;
