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
var TreeSet_1 = require("../src/TreeSet");
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
describe("Test NavigableSet functionality", function () {
    it("Test firstKey", function () {
        testFirstKeyNumberString(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testFirstKeyNumberString(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testFirstKeyStringString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testFirstKeyStringString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
    it("Test lastKey", function () {
        testLastKeyNumberString(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testLastKeyNumberString(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testLastKeyStringString(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testLastKeyStringString(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
    });
});
function testFirstKeyNumberString(set) {
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.first()).toEqual(100);
}
function testFirstKeyStringString(set) {
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.first()).toEqual("eighth");
}
function testLastKeyNumberString(set) {
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestNumbers(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.last()).toEqual(1000);
}
function testLastKeyStringString(set) {
    expect(set.size()).toEqual(0);
    expect(set.isEmpty()).toEqual(true);
    addTestStrings(set);
    expect(set.size()).toEqual(10);
    expect(set.isEmpty()).toEqual(false);
    expect(set.last()).toEqual("third");
}
function addTestNumbers(set) {
    expect(set.add(300)).toEqual(true);
    expect(set.add(600)).toEqual(true);
    expect(set.add(900)).toEqual(true);
    expect(set.add(1000)).toEqual(true);
    expect(set.add(700)).toEqual(true);
    expect(set.add(400)).toEqual(true);
    expect(set.add(100)).toEqual(true);
    expect(set.add(200)).toEqual(true);
    expect(set.add(500)).toEqual(true);
    expect(set.add(800)).toEqual(true);
}
function addTestStrings(set) {
    expect(set.add("first")).toEqual(true);
    expect(set.add("second")).toEqual(true);
    expect(set.add("third")).toEqual(true);
    expect(set.add("fourth")).toEqual(true);
    expect(set.add("fifth")).toEqual(true);
    expect(set.add("sixth")).toEqual(true);
    expect(set.add("seventh")).toEqual(true);
    expect(set.add("eighth")).toEqual(true);
    expect(set.add("ninth")).toEqual(true);
    expect(set.add("tenth")).toEqual(true);
}
