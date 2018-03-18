"use strict";
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
/**
* @license
* Copyright Francesco Giordano 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var AllFieldHashable_1 = require("./AllFieldHashable");
var HashSet_1 = require("./HashSet");
var LinkedHashMap_1 = require("./LinkedHashMap");
/**
 * Hash table and linked-list implementation of the Set interface with predictable iteration order.
 *
 * This class corresponds to java.util.LinkedHashSet
 */
var LinkedHashSet = /** @class */ (function (_super) {
    __extends(LinkedHashSet, _super);
    /*
    * Constructs an empty insertion-ordered LinkedHashSet instance with the default
    * initial capacity (20-from super class) and load factor (0.75).
    */
    function LinkedHashSet(iHash, initElements, iInitialCapacityLinked, iLoadFactorLinked) {
        if (iHash === void 0) { iHash = AllFieldHashable_1.AllFieldHashable.instance; }
        if (initElements === void 0) { initElements = null; }
        if (iInitialCapacityLinked === void 0) { iInitialCapacityLinked = 20; }
        if (iLoadFactorLinked === void 0) { iLoadFactorLinked = 0.75; }
        var _this = _super.call(this, iHash, initElements, iInitialCapacityLinked, iLoadFactorLinked, new LinkedHashMap_1.LinkedHashMap(iHash, null, iInitialCapacityLinked, iLoadFactorLinked)) || this;
        _this.initElements = initElements;
        _this.iInitialCapacityLinked = iInitialCapacityLinked;
        _this.iLoadFactorLinked = iLoadFactorLinked;
        return _this;
    }
    /*
    * Java style iterator retrieves hash set values by insertion order.. values here are the keys in the map
    */
    LinkedHashSet.prototype.newKeyIterator = function () {
        var map = this.getDataStore();
        return map.newKeyIterator();
    };
    return LinkedHashSet;
}(HashSet_1.HashSet));
exports.LinkedHashSet = LinkedHashSet;
