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
    it("Test firstEntry", function () {
        testFirstEntryNumberString(new TreeMap_1.TreeMap(Collections_1.Collections.getNumberComparator()));
        testFirstEntryNumberString(new SkipList_1.SkipListMap(Collections_1.Collections.getNumberComparator()));
        testFirstEntryStringString(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testFirstEntryStringString(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
    });
    it("Test lastKey", function () {
        testLastKeyNumberString(new TreeMap_1.TreeMap(Collections_1.Collections.getNumberComparator()));
        testLastKeyNumberString(new SkipList_1.SkipListMap(Collections_1.Collections.getNumberComparator()));
        testLastKeyStringString(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testLastKeyStringString(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
    });
    it("Test lastEntry", function () {
        testLastEntryNumberString(new TreeMap_1.TreeMap(Collections_1.Collections.getNumberComparator()));
        testLastEntryNumberString(new SkipList_1.SkipListMap(Collections_1.Collections.getNumberComparator()));
        testLastEntryStringString(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testLastEntryStringString(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
    });
    it("Test ceilingKey", function () {
        testCeilingKeyNumberString(new TreeMap_1.TreeMap(Collections_1.Collections.getNumberComparator()));
        testCeilingKeyNumberString(new SkipList_1.SkipListMap(Collections_1.Collections.getNumberComparator()));
        testCeilingKeyStringString(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testCeilingKeyStringString(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
    });
});
function testFirstKeyNumberString(map) {
    expect(map.firstKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.firstKey()).toEqual(100);
    map.clear();
    expect(map.firstKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testFirstKeyStringString(map) {
    expect(map.firstKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.firstKey()).toEqual("eighth");
    map.clear();
    expect(map.firstKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testFirstEntryNumberString(map) {
    expect(map.firstEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    var entry = map.firstEntry();
    expect(entry.getKey()).toEqual(100);
    expect(entry.getValue()).toEqual("100blah");
    map.clear();
    expect(map.firstEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testFirstEntryStringString(map) {
    expect(map.firstEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    var entry = map.firstEntry();
    expect(entry.getKey()).toEqual("eighth");
    expect(entry.getValue()).toEqual("eighthblah");
    map.clear();
    expect(map.firstEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testLastKeyNumberString(map) {
    expect(map.lastKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.lastKey()).toEqual(1000);
    map.clear();
    expect(map.lastKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testLastKeyStringString(map) {
    expect(map.lastKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.lastKey()).toEqual("third");
    map.clear();
    expect(map.lastKey()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testLastEntryNumberString(map) {
    expect(map.lastEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    var entry = map.lastEntry();
    expect(entry.getKey()).toEqual(1000);
    expect(entry.getValue()).toEqual("1000blah");
    map.clear();
    expect(map.lastEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testLastEntryStringString(map) {
    expect(map.lastEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    var entry = map.lastEntry();
    expect(entry.getKey()).toEqual("third");
    expect(entry.getValue()).toEqual("thirdblah");
    map.clear();
    expect(map.lastEntry()).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testCeilingKeyNumberString(map) {
    expect(map.ceilingKey(501)).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestNumbers(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.ceilingKey(1)).toEqual(100);
    expect(map.ceilingKey(100)).toEqual(100);
    expect(map.ceilingKey(399)).toEqual(400);
    expect(map.ceilingKey(500)).toEqual(500);
    expect(map.ceilingKey(601)).toEqual(700);
    expect(map.ceilingKey(999)).toEqual(1000);
    expect(map.ceilingKey(1000)).toEqual(1000);
    expect(map.ceilingKey(1001)).toEqual(null);
    map.clear();
    expect(map.ceilingKey(501)).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testCeilingKeyStringString(map) {
    expect(map.ceilingKey("a")).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    addTestStrings(map);
    expect(map.size()).toEqual(10);
    expect(map.isEmpty()).toEqual(false);
    expect(map.ceilingKey("a")).toEqual("eighth");
    expect(map.ceilingKey("eighth")).toEqual("eighth");
    expect(map.ceilingKey("seco")).toEqual("second");
    expect(map.ceilingKey("second")).toEqual("second");
    expect(map.ceilingKey("secone")).toEqual("seventh");
    expect(map.ceilingKey("thira")).toEqual("third");
    expect(map.ceilingKey("third")).toEqual("third");
    expect(map.ceilingKey("thire")).toEqual(null);
    expect(map.ceilingKey("zzzzz")).toEqual(null);
    map.clear();
    expect(map.ceilingKey("a")).toEqual(null);
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function addTestNumbers(map) {
    expect(map.put(300, "300blah")).toEqual(undefined);
    expect(map.put(600, "600blah")).toEqual(undefined);
    expect(map.put(900, "900blah")).toEqual(undefined);
    expect(map.put(1000, "1000blah")).toEqual(undefined);
    expect(map.put(700, "700blah")).toEqual(undefined);
    expect(map.put(400, "400blah")).toEqual(undefined);
    expect(map.put(100, "100blah")).toEqual(undefined);
    expect(map.put(200, "200blah")).toEqual(undefined);
    expect(map.put(500, "500blah")).toEqual(undefined);
    expect(map.put(800, "800blah")).toEqual(undefined);
}
function addTestStrings(map) {
    expect(map.put("first", "firstblah")).toEqual(undefined);
    expect(map.put("second", "secondblah")).toEqual(undefined);
    expect(map.put("third", "thirdblah")).toEqual(undefined);
    expect(map.put("fourth", "fourthblah")).toEqual(undefined);
    expect(map.put("fifth", "fifthblah")).toEqual(undefined);
    expect(map.put("sixth", "sixthblah")).toEqual(undefined);
    expect(map.put("seventh", "seventhblah")).toEqual(undefined);
    expect(map.put("eighth", "eighthblah")).toEqual(undefined);
    expect(map.put("ninth", "ninthblah")).toEqual(undefined);
    expect(map.put("tenth", "tenthblah")).toEqual(undefined);
}
