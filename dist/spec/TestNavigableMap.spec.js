"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Collections_1 = require("../src/Collections");
var SkipList_1 = require("../src/SkipList");
var TreeMap_1 = require("../src/TreeMap");
// PetStoreProduct will be used in testing
var PetStoreProduct = /** @class */ (function () {
    function PetStoreProduct(iName, iPrice) {
        this.productName = iName;
        this.price = iPrice;
    }
    PetStoreProduct.prototype.getProductName = function () {
        return this.productName;
    };
    PetStoreProduct.prototype.getPrice = function () {
        return this.price;
    };
    return PetStoreProduct;
}());
var alphabeticalSortPetStoreProduct = {
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
        if (o1.getProductName() === o2.getProductName())
            return 0;
        if (o1.getProductName() === undefined)
            return -1;
        if (o1.getProductName() === null)
            return -1;
        if (o2.getProductName() === undefined)
            return 1;
        if (o2.getProductName() === null)
            return 1;
        if (o1.getProductName() < o2.getProductName())
            return -1;
        return 1;
    }
};
var product2 = new PetStoreProduct("ChewToy", 14.99);
var product1 = new PetStoreProduct("Catnip", 4.99);
var product3 = new PetStoreProduct("Goldfish", 9.99);
var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
// Wanted to show a class in the value object but anything would work fine
var ValueClass = /** @class */ (function () {
    function ValueClass() {
    }
    return ValueClass;
}());
describe("Test NavigableMap functionality", function () {
    it("Test firstKey", function () {
        testFirstKeyNumberString(new TreeMap_1.TreeMap(Collections_1.Collections.getNumberComparator()));
        testFirstKeyNumberString(new SkipList_1.SkipListMap(Collections_1.Collections.getNumberComparator()));
        testFirstKeyStringString(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testFirstKeyStringString(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
    });
});
function testFirstKeyNumberString(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.firstKey()).toEqual(100);
}
function testFirstKeyStringString(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.firstKey()).toEqual("eighth");
}
function testLastKeyNumberString(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.lastKey()).toEqual(1000);
}
function testLastKeyStringString(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.lastKey()).toEqual("third");
}
function addTestNumbers(map) {
    expect(map.put(300, "blah")).toEqual(undefined);
    expect(map.put(600, "blah")).toEqual(undefined);
    expect(map.put(900, "blah")).toEqual(undefined);
    expect(map.put(1000, "blah")).toEqual(undefined);
    expect(map.put(700, "blah")).toEqual(undefined);
    expect(map.put(400, "blah")).toEqual(undefined);
    expect(map.put(100, "blah")).toEqual(undefined);
    expect(map.put(200, "blah")).toEqual(undefined);
    expect(map.put(500, "blah")).toEqual(undefined);
    expect(map.put(800, "blah")).toEqual(undefined);
}
function addTestStrings(map) {
    expect(map.put("first", "blah")).toEqual(undefined);
    expect(map.put("second", "blah")).toEqual(undefined);
    expect(map.put("third", "blah")).toEqual(undefined);
    expect(map.put("fourth", "blah")).toEqual(undefined);
    expect(map.put("fifth", "blah")).toEqual(undefined);
    expect(map.put("sixth", "blah")).toEqual(undefined);
    expect(map.put("seventh", "blah")).toEqual(undefined);
    expect(map.put("eighth", "blah")).toEqual(undefined);
    expect(map.put("ninth", "blah")).toEqual(undefined);
    expect(map.put("tenth", "blah")).toEqual(undefined);
}
