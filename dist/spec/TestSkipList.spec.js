"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("../src/AllFieldCollectable");
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var ArrayList_1 = require("../src/ArrayList");
var Collections_1 = require("../src/Collections");
var HashSet_1 = require("../src/HashSet");
var LinkedList_1 = require("../src/LinkedList");
var SkipList_1 = require("../src/SkipList");
var SkipList_2 = require("../src/SkipList");
var testNumber = (function () {
    function testNumber() {
    }
    testNumber.equals = function (failMessage, val, expected) {
        if (val !== expected) {
            fail(failMessage + " - value was " + val + " expected " + expected);
        }
    };
    testNumber.notNullOrUndefined = function (failMessage, val) {
        if ((val === null) || (val === undefined)) {
            fail(failMessage + " - expected not null or undefined value was " + val);
        }
    };
    return testNumber;
}());
exports.testNumber = testNumber;
var testString = (function () {
    function testString() {
    }
    testString.equals = function (failMessage, val, expected) {
        if (val !== expected) {
            fail(failMessage + " - value was " + val + " expected " + expected);
        }
    };
    testString.notNullOrUndefined = function (failMessage, val) {
        if ((val === null) || (val === undefined)) {
            fail(failMessage + " - expected not null or undefined value was " + val);
        }
    };
    return testString;
}());
exports.testString = testString;
var testBoolean = (function () {
    function testBoolean() {
    }
    testBoolean.equals = function (failMessage, val, expected) {
        if (val !== expected) {
            fail(failMessage + " - value was " + val + " expected " + expected);
        }
    };
    testBoolean.equalsTrue = function (failMessage, val) {
        if (val !== true) {
            fail(failMessage + " - expected true value was " + val);
        }
    };
    testBoolean.equalsFalse = function (failMessage, val) {
        if (val !== false) {
            fail(failMessage + " - expected false value was " + val);
        }
    };
    testBoolean.notNullOrUndefined = function (failMessage, val) {
        if ((val === null) || (val === undefined)) {
            fail(failMessage + " - expected not null or undefined value was " + val);
        }
    };
    return testBoolean;
}());
exports.testBoolean = testBoolean;
var test = (function () {
    function test() {
    }
    // tslint:disable-next-line:no-any
    test.equals = function (failMessage, val, expected) {
        if (val !== expected) {
            fail(failMessage + " - value was " + val + " expected " + expected);
        }
    };
    // tslint:disable-next-line:no-any
    test.notNullOrUndefined = function (failMessage, val) {
        if ((val === null) || (val === undefined)) {
            fail(failMessage + " - expected not null or undefined value was " + val);
        }
    };
    // tslint:disable-next-line:no-any
    test.notNull = function (failMessage, val) {
        if (val === null) {
            fail(failMessage + " - expected not null value was " + val);
        }
    };
    // tslint:disable-next-line:no-any
    test.notUndefined = function (failMessage, val) {
        if (val === undefined) {
            fail(failMessage + " - expected not undefined value was " + val);
        }
    };
    return test;
}());
exports.test = test;
describe("Test SkipList functionality", function () {
    // PetStoreProduct will be used in testing
    var PetStoreProduct = (function () {
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
    var product1 = new PetStoreProduct("ChewToy", 14.99);
    var product2 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
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
    var priceSortPetStoreProduct = {
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
            if (o1.getPrice() === o2.getPrice())
                return 0;
            if (o1.getPrice() === undefined)
                return -1;
            if (o1.getPrice() === null)
                return -1;
            if (o2.getPrice() === undefined)
                return 1;
            if (o2.getPrice() === null)
                return 1;
            if (o1.getPrice() < o2.getPrice())
                return -1;
            return 1;
        }
    };
    // Wanted to show a class in the value object but anything would work fine
    var ValueClass = (function () {
        function ValueClass(blah1) {
            if (blah1 === void 0) { blah1 = 100; }
            this.blah2 = "blah";
        }
        return ValueClass;
    }());
    it("Map Test Creation state", function () {
        var SkipListMap1 = new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct);
        testNumber.equals("Expected newly constructed SkipListMap to be empty", SkipListMap1.size(), 0);
        testBoolean.equalsTrue("Expected isempty to return true for new SkipListMap", SkipListMap1.isEmpty());
        expect(SkipListMap1.firstKey()).toEqual(null);
        expect(SkipListMap1.firstEntry()).toEqual(null);
        expect(SkipListMap1.lastKey()).toEqual(null);
        expect(SkipListMap1.lastEntry()).toEqual(null);
        test.equals("Validate map", true, SkipListMap1.validateMap());
        var SkipListMap2 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        testNumber.equals("Expected newly constructed SkipListMap to be empty", SkipListMap2.size(), 0);
        expect(SkipListMap2.firstKey()).toEqual(null);
        expect(SkipListMap2.firstEntry()).toEqual(null);
        expect(SkipListMap2.lastKey()).toEqual(null);
        expect(SkipListMap2.lastEntry()).toEqual(null);
        test.equals("Validate map", true, SkipListMap2.validateMap());
    });
    it("Map Test Adding one item", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct);
        expect(petStoreMap1.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap1.size()).toEqual(1);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        expect(petStoreMap1.firstKey()).toEqual(product1);
        test.notNullOrUndefined("First Entry is valid", petStoreMap1.firstEntry());
        test.equals("First Entry is product1a", petStoreMap1.firstEntry().getKey().getProductName(), product1.getProductName());
        test.equals("First Entry is product1b", petStoreMap1.firstEntry().getKey().getPrice(), product1.getPrice());
        expect(petStoreMap1.lastKey()).toEqual(product1);
        test.notNullOrUndefined("Last Entry is valid", petStoreMap1.lastEntry());
        test.equals("Last Entry is product1a", petStoreMap1.lastEntry().getKey().getProductName(), product1.getProductName());
        test.equals("Last Entry is product1b", petStoreMap1.lastEntry().getKey().getPrice(), product1.getPrice());
        testBoolean.equalsTrue("Validate map", petStoreMap1.validateMap());
    });
    it("Map Test Adding one native item", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        test.notNullOrUndefined("First Entry is valid", basicTypesMap1.firstEntry());
        testString.equals("First entry key name", basicTypesMap1.firstEntry().getKey(), "ChewToy");
        testNumber.equals("First entry key number", basicTypesMap1.firstEntry().getValue(), 14.99);
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        test.notNullOrUndefined("Last Entry is valid", basicTypesMap1.lastEntry());
        testString.equals("Last entry key name", basicTypesMap1.lastEntry().getKey(), "ChewToy");
        testNumber.equals("Last entry key number", basicTypesMap1.lastEntry().getValue(), 14.99);
        testBoolean.equalsTrue("Validate map", basicTypesMap1.validateMap());
    });
    it("Test adding initial elements out of order", function () {
        var sourceMap = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        test.equals("Adding C to empty map", null, sourceMap.put("C", "D"));
        test.equals("Adding A to 1 entry map", null, sourceMap.put("A", "B"));
        testNumber.equals("Expected sourceMap size incorrect", sourceMap.size(), 2);
        testBoolean.equalsTrue("Validate sourceMap", sourceMap.validateMap());
    });
    it("Map Test adding initial elements in order ", function () {
        var sourceMap = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        test.equals("Adding A to empty map", null, sourceMap.put("A", "B"));
        test.equals("Adding C to 1 entry map", null, sourceMap.put("C", "D"));
        testNumber.equals("Expected sourceMap size incorrect", sourceMap.size(), 2);
        testBoolean.equalsTrue("Validate sourceMap", sourceMap.validateMap());
    });
    it("Map Test adding and copying initial elements in order ", function () {
        var sourceMap = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        test.equals("Adding A to empty map", null, sourceMap.put("A", "B"));
        test.equals("Adding C to 1 entry map", null, sourceMap.put("C", "D"));
        testNumber.equals("Expected sourceMap size incorrect", sourceMap.size(), 2);
        testBoolean.equalsTrue("Validate sourceMap", sourceMap.validateMap());
        var destinationMap = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator(), sourceMap);
        testNumber.equals("Expected destination Map size incorrect", destinationMap.size(), 2);
        testBoolean.equalsTrue("Validate destination Map", destinationMap.validateMap());
    });
    it("Map Test adding and copying initial elements out of order", function () {
        var sourceMap = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        test.equals("Adding C to empty map", null, sourceMap.put("C", "D"));
        test.equals("Adding A to 1 entry map", null, sourceMap.put("A", "B"));
        testNumber.equals("Expected sourceMap size incorrect", sourceMap.size(), 2);
        testBoolean.equalsTrue("Validate sourceMap", sourceMap.validateMap());
        var destinationMap = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator(), sourceMap);
        testNumber.equals("Expected destination Map size incorrect", destinationMap.size(), 2);
        testBoolean.equalsTrue("Validate destination Map", destinationMap.validateMap());
    });
    it("Map Test Adding two items", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct);
        expect(petStoreMap1.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap1.size()).toEqual(1);
        expect(petStoreMap1.firstKey()).toEqual(product1);
        test.notNullOrUndefined("First Entry is valid", petStoreMap1.firstEntry());
        test.equals("First Entry is product1a", petStoreMap1.firstEntry().getKey().getProductName(), product1.getProductName());
        test.equals("First Entry is product1b", petStoreMap1.firstEntry().getKey().getPrice(), product1.getPrice());
        expect(petStoreMap1.lastKey()).toEqual(product1);
        test.notNullOrUndefined("Last Entry is valid", petStoreMap1.lastEntry());
        test.equals("Last Entry is product1a", petStoreMap1.lastEntry().getKey().getProductName(), product1.getProductName());
        test.equals("Last Entry is product1b", petStoreMap1.lastEntry().getKey().getPrice(), product1.getPrice());
        expect(petStoreMap1.put(product2, new ValueClass(10))).toEqual(null);
        expect(petStoreMap1.size()).toEqual(2);
        expect(petStoreMap1.firstKey()).toEqual(product2);
        test.notNullOrUndefined("First Entry is valid", petStoreMap1.firstEntry());
        test.equals("First Entry is product1a", petStoreMap1.firstEntry().getKey().getProductName(), product2.getProductName());
        test.equals("First Entry is product1b", petStoreMap1.firstEntry().getKey().getPrice(), product2.getPrice());
        expect(petStoreMap1.lastKey()).toEqual(product1);
        test.notNullOrUndefined("Last Entry is valid", petStoreMap1.lastEntry());
        test.equals("Last Entry is product1a", petStoreMap1.lastEntry().getKey().getProductName(), product1.getProductName());
        test.equals("Last Entry is product1b", petStoreMap1.lastEntry().getKey().getPrice(), product1.getPrice());
    });
    it("Map Test Adding two native items", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        test.notNullOrUndefined("First Entry is valid", basicTypesMap1.firstEntry());
        testString.equals("First entry key name", basicTypesMap1.firstEntry().getKey(), "ChewToy");
        testNumber.equals("First entry key number", basicTypesMap1.firstEntry().getValue(), 14.99);
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        test.notNullOrUndefined("Last Entry is valid", basicTypesMap1.lastEntry());
        testString.equals("Last entry key name", basicTypesMap1.lastEntry().getKey(), "ChewToy");
        testNumber.equals("Last entry key number", basicTypesMap1.lastEntry().getValue(), 14.99);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(2);
        expect(basicTypesMap1.firstKey()).toEqual("Catnip");
        test.notNullOrUndefined("First Entry is valid", basicTypesMap1.firstEntry());
        testString.equals("First entry key name", basicTypesMap1.firstEntry().getKey(), "Catnip");
        testNumber.equals("First entry key number", basicTypesMap1.firstEntry().getValue(), 4.99);
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        test.notNullOrUndefined("Last Entry is valid", basicTypesMap1.lastEntry());
        testString.equals("Last entry key name", basicTypesMap1.lastEntry().getKey(), "ChewToy");
        testNumber.equals("Last entry key number", basicTypesMap1.lastEntry().getValue(), 14.99);
    });
    it("Map Test ContainsKey where the item is contained", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.containsKey("ZZZZZZ")).toEqual(false);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        testBoolean.equalsTrue("Validate map", basicTypesMap1.validateMap());
        expect(basicTypesMap1.containsKey("Catnip")).toEqual(true);
    });
    it("Map Test ContainsKey where the item is not contained", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Bananas")).toEqual(false); // I guess we have no bananas today
    });
    it("Map Test ContainsKey where the item is contained", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Catnip")).toEqual(true);
    }, 2000);
    it("Map Test ContainsKey where the item is not contained", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Bananas")).toEqual(false); // I guess we have no bananas today
    }, 2000);
    it("Test FloorEntry defect previously identified", function () {
        var map = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(map.put("ChewToy", 14.99)).toEqual(null);
        expect(map.put("Catnip", 4.99)).toEqual(null);
        expect(map.floorKey("Leash")).toEqual("ChewToy");
    }, 2000);
    it("Test Adding three native items", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        basicTypesMap1.clear();
        expect(basicTypesMap1.size()).toEqual(0);
        testBoolean.equalsTrue("Validate map1", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        test.notNullOrUndefined("First Entry is valid", basicTypesMap1.firstEntry());
        testString.equals("First entry key name", basicTypesMap1.firstEntry().getKey(), "ChewToy");
        testNumber.equals("First entry key number", basicTypesMap1.firstEntry().getValue(), 14.99);
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        test.notNullOrUndefined("Last Entry is valid", basicTypesMap1.lastEntry());
        testString.equals("Last entry key name", basicTypesMap1.lastEntry().getKey(), "ChewToy");
        testNumber.equals("Last entry key number", basicTypesMap1.lastEntry().getValue(), 14.99);
        testBoolean.equalsTrue("Validate map2", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(2);
        expect(basicTypesMap1.firstKey()).toEqual("Catnip");
        test.notNullOrUndefined("First Entry is valid", basicTypesMap1.firstEntry());
        testString.equals("First entry key name", basicTypesMap1.firstEntry().getKey(), "Catnip");
        testNumber.equals("First entry key number", basicTypesMap1.firstEntry().getValue(), 4.99);
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        test.notNullOrUndefined("Last Entry is valid", basicTypesMap1.lastEntry());
        testString.equals("Last entry key name", basicTypesMap1.lastEntry().getKey(), "ChewToy");
        testNumber.equals("Last entry key number", basicTypesMap1.lastEntry().getValue(), 14.99);
        testBoolean.equalsTrue("Validate map3", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("Leash", 1.99)).toEqual(null);
        testBoolean.equalsTrue("Validate map3a", basicTypesMap1.validateMap());
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.firstKey()).toEqual("Catnip");
        test.notNullOrUndefined("First Entry is valid", basicTypesMap1.firstEntry());
        testString.equals("First entry key name", basicTypesMap1.firstEntry().getKey(), "Catnip");
        testNumber.equals("First entry key number", basicTypesMap1.firstEntry().getValue(), 4.99);
        testString.equals("Testing last key", basicTypesMap1.lastKey(), "Leash");
        test.notNullOrUndefined("Last Entry is valid", basicTypesMap1.lastEntry());
        testString.equals("Last entry key name", basicTypesMap1.lastEntry().getKey(), "Leash");
        testNumber.equals("Last entry key number", basicTypesMap1.lastEntry().getValue(), 1.99);
        testBoolean.equalsTrue("Validate map4", basicTypesMap1.validateMap());
        expect(basicTypesMap1.size()).toEqual(3);
        basicTypesMap1.clear();
        expect(basicTypesMap1.size()).toEqual(0);
        testBoolean.equalsTrue("Validate map5", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 1.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        testBoolean.equalsTrue("Validate map6", basicTypesMap1.validateMap());
    }, 2000);
    it("Test Adding some items string number", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.get("ZZZZZZ")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        testBoolean.equalsTrue("Validate map0", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        testBoolean.equalsTrue("Validate map1", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("Goldfish", 9.99)).toEqual(null);
        testBoolean.equalsTrue("Validate map2", basicTypesMap1.validateMap());
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(4);
        testBoolean.equalsTrue("Validate map3", basicTypesMap1.validateMap());
        expect(basicTypesMap1.get("ZZZZZZ")).toEqual(null);
        var oldPrice = basicTypesMap1.put("ChewToy", 9.99);
        expect(oldPrice).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(4);
        testNumber.equals("Catnip was previously inserted at 4.99", basicTypesMap1.get("Catnip"), 4.99);
        testNumber.equals("Catnip was 4.99 now is 5.99", basicTypesMap1.put("Catnip", 5.99), 4.99);
        expect(basicTypesMap1.size()).toEqual(4);
        testNumber.equals("Catnip was previously inserted at 5.99", basicTypesMap1.get("Catnip"), 5.99);
        testBoolean.equalsTrue("Validate map4", basicTypesMap1.validateMap());
    }, 2);
    it("Test Adding some items number string", function () {
        var basicTypesMap2 = new SkipList_1.SkipListMap(Collections_1.Collections.getNumberComparator());
        expect(basicTypesMap2.put(14.99, "ChewToy")).toEqual(null);
        expect(basicTypesMap2.put(4.99, "Catnip")).toEqual(null);
        expect(basicTypesMap2.put(9.99, "Goldfish")).toEqual(null);
        expect(basicTypesMap2.put(0.99, "AAAAA")).toEqual(null);
        expect(basicTypesMap2.put(0.99, "BBBBB")).toEqual("AAAAA");
        expect(basicTypesMap2.size()).toEqual(4);
        testBoolean.equalsTrue("Validate map5", basicTypesMap2.validateMap());
    }, 2);
    it("Test Adding some items typed", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct);
        var petStoreMap2 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        expect(petStoreMap1.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap1.put(product2, new ValueClass(10))).toEqual(null);
        expect(petStoreMap1.put(product3, new ValueClass())).toEqual(null);
        expect(petStoreMap1.size()).toEqual(3);
        testBoolean.equalsTrue("Validate map1", petStoreMap1.validateMap());
        expect(petStoreMap2.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap2.put(product2, new ValueClass())).toEqual(null);
        expect(petStoreMap2.size()).toEqual(2);
        testBoolean.equalsTrue("Validate map2", petStoreMap2.validateMap());
    }, 2000);
    it("Test Remove from empty", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Test Remove from one entry map", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        basicTypesMap1.clear();
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        basicTypesMap1.clear();
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Test Remove head both sides loaded", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToys", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("Goldfish", 9.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(4);
        testBoolean.equalsTrue("Validate map1", basicTypesMap1.validateMap());
        expect(basicTypesMap1.remove("ChewToys")).toEqual(14.99);
        testBoolean.equalsTrue("Validate map2", basicTypesMap1.validateMap());
        expect(basicTypesMap1.size()).toEqual(3);
    });
    it("Map Test Remove head left full right empty", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(2);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Map Test Remove head right full left empty", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.remove("AAAAA")).toEqual(0.99);
        expect(basicTypesMap1.size()).toEqual(2);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Test remove cover all the cases", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(6);
        expect(basicTypesMap1.put("Furry Food", 0.49)).toEqual(null);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(7);
        expect(basicTypesMap1.remove("Dry Food")).toEqual(7.99);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(6);
        expect(basicTypesMap1.put("Gaspacho   why would a pet store sell soup?   why not?", 9.49)).toEqual(null);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(7);
        expect(basicTypesMap1.remove("Furry Food")).toEqual(0.49);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(6);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(5);
    });
    it("Map Test getNextHigherKey empty map", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.getNextHigherKey("Dog")).toEqual(null);
    });
    it("Test getNextHigherKey one element", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("Dog")).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("AAAAA")).toEqual(null);
    });
    it("Test getNextHigherKey more complex map", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.getNextHigherKey("BBBBBB")).toEqual("Catnip");
        expect(basicTypesMap1.getNextHigherKey("Catnip")).toEqual("ChewToy");
        expect(basicTypesMap1.getNextHigherKey("ChewToy")).toEqual("Dry Food");
        expect(basicTypesMap1.getNextHigherKey("Dry Food")).toEqual("Leash");
        expect(basicTypesMap1.getNextHigherKey("Leash")).toEqual("Wet Food");
        expect(basicTypesMap1.getNextHigherKey("Wet Food")).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("AAAAAA")).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("GGGGGG")).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("ZZZZZZ")).toEqual(null);
    });
    it("Map Test ceilingEntry", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.ceilingEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        test.notNullOrUndefined("Ceiling Entry to Chewtoy is valid", basicTypesMap1.ceilingEntry("ChewToy"));
        testString.equals("Ceiling Entry to Chewtoy key name", basicTypesMap1.ceilingEntry("ChewToy").getKey(), "ChewToy");
        testNumber.equals("Ceiling Entry to Chewtoy key number", basicTypesMap1.ceilingEntry("ChewToy").getValue(), 14.99);
        test.notNullOrUndefined("Ceiling Entry to Catnip is valid", basicTypesMap1.ceilingEntry("Catnip"));
        testString.equals("Ceiling Entry to Catnip key name", basicTypesMap1.ceilingEntry("Catnip").getKey(), "Catnip");
        testNumber.equals("Ceiling Entry to Catnip key number", basicTypesMap1.ceilingEntry("Catnip").getValue(), 4.99);
        test.notNullOrUndefined("Ceiling Entry to AAAAA is valid", basicTypesMap1.ceilingEntry("AAAAA"));
        testString.equals("Ceiling Entry to AAAAA key name", basicTypesMap1.ceilingEntry("AAAAA").getKey(), "AAAAA");
        testNumber.equals("Ceiling Entry to AAAAA key number", basicTypesMap1.ceilingEntry("AAAAA").getValue(), 0.99);
        test.notNullOrUndefined("Ceiling Entry to Leash is valid", basicTypesMap1.ceilingEntry("Leash"));
        testString.equals("Ceiling Entry to Leash key name", basicTypesMap1.ceilingEntry("Leash").getKey(), "Leash");
        testNumber.equals("Ceiling Entry to Leash key number", basicTypesMap1.ceilingEntry("Leash").getValue(), 6.99);
        test.notNullOrUndefined("Ceiling Entry to Dry Food is valid", basicTypesMap1.ceilingEntry("Dry Food"));
        testString.equals("Ceiling Entry to Dry Food key name", basicTypesMap1.ceilingEntry("Dry Food").getKey(), "Dry Food");
        testNumber.equals("Ceiling Entry to Dry Food key number", basicTypesMap1.ceilingEntry("Dry Food").getValue(), 7.99);
        test.notNullOrUndefined("Ceiling Entry to Wet Food is valid", basicTypesMap1.ceilingEntry("Wet Food"));
        testString.equals("Ceiling Entry to Wet Food key name", basicTypesMap1.ceilingEntry("Wet Food").getKey(), "Wet Food");
        testNumber.equals("Ceiling Entry to Wet Food key number", basicTypesMap1.ceilingEntry("Wet Food").getValue(), 7.49);
        test.notNullOrUndefined("Ceiling Entry to Ceiling is valid", basicTypesMap1.ceilingEntry("Ceiling"));
        testString.equals("Ceiling Entry to Ceiling key name", basicTypesMap1.ceilingEntry("Ceiling").getKey(), "ChewToy");
        testNumber.equals("Ceiling Entry to Ceiling key number", basicTypesMap1.ceilingEntry("Ceiling").getValue(), 14.99);
        test.notNullOrUndefined("Ceiling Entry to Borscht is valid", basicTypesMap1.ceilingEntry("Borscht"));
        testString.equals("Ceiling Entry to Borscht key name", basicTypesMap1.ceilingEntry("Borscht").getKey(), "Catnip");
        testNumber.equals("Ceiling Entry to Borscht key number", basicTypesMap1.ceilingEntry("Borscht").getValue(), 4.99);
        test.notNullOrUndefined("Ceiling Entry to Dalias is valid", basicTypesMap1.ceilingEntry("Dalias"));
        testString.equals("Ceiling Entry to Dalias key name", basicTypesMap1.ceilingEntry("Dalias").getKey(), "Dry Food");
        testNumber.equals("Ceiling Entry to Dalias key number", basicTypesMap1.ceilingEntry("Dalias").getValue(), 7.99);
        expect(basicTypesMap1.ceilingEntry("ZZZZZ")).toEqual(null);
    });
    it("Test ceilingKey", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.ceilingKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        testBoolean.equalsTrue("Validate Map before running CeilingKey", basicTypesMap1.validateMap());
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.ceilingKey("ChewToy")).toEqual("ChewToy");
        testString.equals("looking for Catnip when map contains Catnip", basicTypesMap1.ceilingKey("Catnip"), "Catnip");
        expect(basicTypesMap1.ceilingKey("BBBBBB")).toEqual("BBBBBB");
        expect(basicTypesMap1.ceilingKey("Leash")).toEqual("Leash");
        expect(basicTypesMap1.ceilingKey("Dry Food")).toEqual("Dry Food");
        expect(basicTypesMap1.ceilingKey("Wet Food")).toEqual("Wet Food");
        expect(basicTypesMap1.ceilingKey("AAAAAA")).toEqual("BBBBBB");
        expect(basicTypesMap1.ceilingKey("Ceiling")).toEqual("ChewToy");
        expect(basicTypesMap1.ceilingKey("Beer")).toEqual("Catnip");
        expect(basicTypesMap1.ceilingKey("Dalias")).toEqual("Dry Food");
        expect(basicTypesMap1.ceilingKey("VVVVV")).toEqual("Wet Food");
        expect(basicTypesMap1.ceilingKey("ZZZZZ")).toEqual(null);
    });
    it("Map Test higherEntry", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.higherEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        expect(basicTypesMap1.higherEntry("ZZZZZ")).toEqual(null);
        test.notNullOrUndefined("higher Entry to AAAAAA is valid", basicTypesMap1.higherEntry("AAAAAA"));
        testString.equals("higher Entry to AAAAAA key name", basicTypesMap1.higherEntry("AAAAAA").getKey(), "BBBBBB");
        testNumber.equals("higher Entry to AAAAAA key number", basicTypesMap1.higherEntry("AAAAAA").getValue(), 0.99);
        test.notNullOrUndefined("higher Entry to ChewToy is valid", basicTypesMap1.higherEntry("ChewToy"));
        testString.equals("higher Entry to ChewToy key name", basicTypesMap1.higherEntry("ChewToy").getKey(), "Dry Food");
        testNumber.equals("higher Entry to ChewToy key number", basicTypesMap1.higherEntry("ChewToy").getValue(), 7.99);
        test.notNullOrUndefined("higher Entry to Catnip is valid", basicTypesMap1.higherEntry("Catnip"));
        testString.equals("higher Entry to Catnip key name", basicTypesMap1.higherEntry("Catnip").getKey(), "ChewToy");
        testNumber.equals("higher Entry to Catnip key number", basicTypesMap1.higherEntry("Catnip").getValue(), 14.99);
        test.notNullOrUndefined("higher Entry to BBBBBB is valid", basicTypesMap1.higherEntry("BBBBBB"));
        testString.equals("higher Entry to BBBBBB key name", basicTypesMap1.higherEntry("BBBBBB").getKey(), "Catnip");
        testNumber.equals("higher Entry to BBBBBB key number", basicTypesMap1.higherEntry("BBBBBB").getValue(), 4.99);
        test.notNullOrUndefined("higher Entry to Leash is valid", basicTypesMap1.higherEntry("Leash"));
        testString.equals("higher Entry to Leash key name", basicTypesMap1.higherEntry("Leash").getKey(), "Wet Food");
        testNumber.equals("higher Entry to Leash key number", basicTypesMap1.higherEntry("Leash").getValue(), 7.49);
        test.notNullOrUndefined("higher Entry to Dry Food is valid", basicTypesMap1.higherEntry("Dry Food"));
        testString.equals("higher Entry to Dry Food key name", basicTypesMap1.higherEntry("Dry Food").getKey(), "Leash");
        testNumber.equals("higher Entry to Dry Food key number", basicTypesMap1.higherEntry("Dry Food").getValue(), 6.99);
        expect(basicTypesMap1.higherEntry("Wet Food")).toEqual(null);
        test.notNullOrUndefined("higher Entry to Ceiling is valid", basicTypesMap1.higherEntry("Ceiling"));
        testString.equals("higher Entry to Ceiling key name", basicTypesMap1.higherEntry("Ceiling").getKey(), "ChewToy");
        testNumber.equals("higher Entry to Ceiling key number", basicTypesMap1.higherEntry("Ceiling").getValue(), 14.99);
        test.notNullOrUndefined("higher Entry to Borscht is valid", basicTypesMap1.higherEntry("Borscht"));
        testString.equals("higher Entry to Borscht key name", basicTypesMap1.higherEntry("Borscht").getKey(), "Catnip");
        testNumber.equals("higher Entry to Borscht key number", basicTypesMap1.higherEntry("Borscht").getValue(), 4.99);
        test.notNullOrUndefined("higher Entry to Dalias is valid", basicTypesMap1.higherEntry("Dalias"));
        testString.equals("higher Entry to Dalias key name", basicTypesMap1.higherEntry("Dalias").getKey(), "Dry Food");
        testNumber.equals("higher Entry to Dalias key number", basicTypesMap1.higherEntry("Dalias").getValue(), 7.99);
    });
    it("Map Test higherKey", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.higherKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.higherKey("ZZZZZ")).toEqual(null);
        expect(basicTypesMap1.higherKey("AAAAAA")).toEqual("BBBBBB");
        expect(basicTypesMap1.higherKey("ChewToy")).toEqual("Dry Food");
        expect(basicTypesMap1.higherKey("Catnip")).toEqual("ChewToy");
        expect(basicTypesMap1.higherKey("BBBBBB")).toEqual("Catnip");
        expect(basicTypesMap1.higherKey("Leash")).toEqual("Wet Food");
        expect(basicTypesMap1.higherKey("Dry Food")).toEqual("Leash");
        expect(basicTypesMap1.higherKey("Wet Food")).toEqual(null);
        expect(basicTypesMap1.higherKey("Ceiling")).toEqual("ChewToy");
        expect(basicTypesMap1.higherKey("Beer")).toEqual("Catnip");
        expect(basicTypesMap1.higherKey("Dalias")).toEqual("Dry Food");
    });
    it("Map Test lowerEntry", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.lowerEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        expect(basicTypesMap1.lowerEntry("AAAAAA")).toEqual(null);
        test.notNullOrUndefined("lower Entry to Dry Food is valid", basicTypesMap1.lowerEntry("Dry Food"));
        testString.equals("lower Entry to Dry Food key name", basicTypesMap1.lowerEntry("Dry Food").getKey(), "ChewToy");
        testNumber.equals("lower Entry to Dry Food key number", basicTypesMap1.lowerEntry("Dry Food").getValue(), 14.99);
        test.notNullOrUndefined("lower Entry to ChewToy is valid", basicTypesMap1.lowerEntry("ChewToy"));
        testString.equals("lower Entry to ChewToy key name", basicTypesMap1.lowerEntry("ChewToy").getKey(), "Catnip");
        testNumber.equals("lower Entry to ChewToy key number", basicTypesMap1.lowerEntry("ChewToy").getValue(), 4.99);
        test.notNullOrUndefined("lower Entry to Catnip is valid", basicTypesMap1.lowerEntry("Catnip"));
        testString.equals("lower Entry to Catnip key name", basicTypesMap1.lowerEntry("Catnip").getKey(), "BBBBBB");
        testNumber.equals("lower Entry to Catnip key number", basicTypesMap1.lowerEntry("Catnip").getValue(), 0.99);
        test.notNullOrUndefined("lower Entry to Wet Food is valid", basicTypesMap1.lowerEntry("Wet Food"));
        testString.equals("lower Entry to Wet Food key name", basicTypesMap1.lowerEntry("Wet Food").getKey(), "Leash");
        testNumber.equals("lower Entry to Wet Food key number", basicTypesMap1.lowerEntry("Wet Food").getValue(), 6.99);
        test.notNullOrUndefined("lower Entry to Leash is valid", basicTypesMap1.lowerEntry("Leash"));
        testString.equals("lower Entry to Leash key name", basicTypesMap1.lowerEntry("Leash").getKey(), "Dry Food");
        testNumber.equals("lower Entry to Leash key number", basicTypesMap1.lowerEntry("Leash").getValue(), 7.99);
        test.notNullOrUndefined("lower Entry to Chia is valid", basicTypesMap1.lowerEntry("Chia"));
        testString.equals("lower Entry to Chia key name", basicTypesMap1.lowerEntry("Chia").getKey(), "ChewToy");
        testNumber.equals("lower Entry to Chia key number", basicTypesMap1.lowerEntry("Chia").getValue(), 14.99);
        test.notNullOrUndefined("lower Entry to Center is valid", basicTypesMap1.lowerEntry("Center"));
        testString.equals("lower Entry to Center key name", basicTypesMap1.lowerEntry("Center").getKey(), "Catnip");
        testNumber.equals("lower Entry to Center key number", basicTypesMap1.lowerEntry("Center").getValue(), 4.99);
        test.notNullOrUndefined("lower Entry to BCCCCC is valid", basicTypesMap1.lowerEntry("BCCCCC"));
        testString.equals("lower Entry to BCCCCC key name", basicTypesMap1.lowerEntry("BCCCCC").getKey(), "BBBBBB");
        testNumber.equals("lower Entry to BCCCCC key number", basicTypesMap1.lowerEntry("BCCCCC").getValue(), 0.99);
        test.notNullOrUndefined("lower Entry to LongLeash is valid", basicTypesMap1.lowerEntry("LongLeash"));
        testString.equals("lower Entry to LongLeash key name", basicTypesMap1.lowerEntry("LongLeash").getKey(), "Leash");
        testNumber.equals("lower Entry to LongLeash key number", basicTypesMap1.lowerEntry("LongLeash").getValue(), 6.99);
        test.notNullOrUndefined("lower Entry to Dry Kibble is valid", basicTypesMap1.lowerEntry("Dry Kibble"));
        testString.equals("lower Entry to Dry Kibble key name", basicTypesMap1.lowerEntry("Dry Kibble").getKey(), "Dry Food");
        testNumber.equals("lower Entry to Dry Kibble key number", basicTypesMap1.lowerEntry("Dry Kibble").getValue(), 7.99);
        test.notNullOrUndefined("lower Entry to YYYYYYY is valid", basicTypesMap1.lowerEntry("YYYYYYY"));
        testString.equals("lower Entry to YYYYYYY key name", basicTypesMap1.lowerEntry("YYYYYYY").getKey(), "Wet Food");
        testNumber.equals("lower Entry to YYYYYYY key number", basicTypesMap1.lowerEntry("YYYYYYY").getValue(), 7.49);
    });
    it("Test floorEntry", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.floorEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        expect(basicTypesMap1.floorEntry("AAAAAA")).toEqual(null);
        test.notNullOrUndefined("floor Entry to ChewToy is valid", basicTypesMap1.floorEntry("ChewToy"));
        testString.equals("floor Entry to ChewToy key name", basicTypesMap1.floorEntry("ChewToy").getKey(), "ChewToy");
        testNumber.equals("floor Entry to ChewToy key number", basicTypesMap1.floorEntry("ChewToy").getValue(), 14.99);
        test.notNullOrUndefined("floor Entry to Catnip is valid", basicTypesMap1.floorEntry("Catnip"));
        testString.equals("floor Entry to Catnip key name", basicTypesMap1.floorEntry("Catnip").getKey(), "Catnip");
        testNumber.equals("floor Entry to Catnip key number", basicTypesMap1.floorEntry("Catnip").getValue(), 4.99);
        test.notNullOrUndefined("floor Entry to BBBBBB is valid", basicTypesMap1.floorEntry("BBBBBB"));
        testString.equals("floor Entry to BBBBBB key name", basicTypesMap1.floorEntry("BBBBBB").getKey(), "BBBBBB");
        testNumber.equals("floor Entry to BBBBBB key number", basicTypesMap1.floorEntry("BBBBBB").getValue(), 0.99);
        test.notNullOrUndefined("floor Entry to Leash is valid", basicTypesMap1.floorEntry("Leash"));
        testString.equals("floor Entry to Leash key name", basicTypesMap1.floorEntry("Leash").getKey(), "Leash");
        testNumber.equals("floor Entry to Leash key number", basicTypesMap1.floorEntry("Leash").getValue(), 6.99);
        test.notNullOrUndefined("floor Entry to Dry Food is valid", basicTypesMap1.floorEntry("Dry Food"));
        testString.equals("floor Entry to Dry Food key name", basicTypesMap1.floorEntry("Dry Food").getKey(), "Dry Food");
        testNumber.equals("floor Entry to Dry Food key number", basicTypesMap1.floorEntry("Dry Food").getValue(), 7.99);
        test.notNullOrUndefined("floor Entry to Wet Food is valid", basicTypesMap1.floorEntry("Wet Food"));
        testString.equals("floor Entry to Wet Food key name", basicTypesMap1.floorEntry("Wet Food").getKey(), "Wet Food");
        testNumber.equals("floor Entry to Wet Food key number", basicTypesMap1.floorEntry("Wet Food").getValue(), 7.49);
        test.notNullOrUndefined("floor Entry to Chia is valid", basicTypesMap1.floorEntry("Chia"));
        testString.equals("floor Entry to Chia key name", basicTypesMap1.floorEntry("Chia").getKey(), "ChewToy");
        testNumber.equals("floor Entry to Chia key number", basicTypesMap1.floorEntry("Chia").getValue(), 14.99);
        test.notNullOrUndefined("floor Entry to Center is valid", basicTypesMap1.floorEntry("Center"));
        testString.equals("floor Entry to Center key name", basicTypesMap1.floorEntry("Center").getKey(), "Catnip");
        testNumber.equals("floor Entry to Center key number", basicTypesMap1.floorEntry("Center").getValue(), 4.99);
        test.notNullOrUndefined("floor Entry to BCCCCC is valid", basicTypesMap1.floorEntry("BCCCCC"));
        testString.equals("floor Entry to BCCCCC key name", basicTypesMap1.floorEntry("BCCCCC").getKey(), "BBBBBB");
        testNumber.equals("floor Entry to BCCCCC key number", basicTypesMap1.floorEntry("BCCCCC").getValue(), 0.99);
        test.notNullOrUndefined("floor Entry to LongLeash is valid", basicTypesMap1.floorEntry("LongLeash"));
        testString.equals("floor Entry to LongLeash key name", basicTypesMap1.floorEntry("LongLeash").getKey(), "Leash");
        testNumber.equals("floor Entry to LongLeash key number", basicTypesMap1.floorEntry("LongLeash").getValue(), 6.99);
        test.notNullOrUndefined("floor Entry to Dry Kibble is valid", basicTypesMap1.floorEntry("Dry Kibble"));
        testString.equals("floor Entry to Dry Kibble key name", basicTypesMap1.floorEntry("Dry Kibble").getKey(), "Dry Food");
        testNumber.equals("floor Entry to Dry Kibble key number", basicTypesMap1.floorEntry("Dry Kibble").getValue(), 7.99);
        test.notNullOrUndefined("floor Entry to Wet Kibble is valid", basicTypesMap1.floorEntry("Wet Kibble"));
        testString.equals("floor Entry to Wet Kibble key name", basicTypesMap1.floorEntry("Wet Kibble").getKey(), "Wet Food");
        testNumber.equals("floor Entry to Wet Kibble key number", basicTypesMap1.floorEntry("Wet Kibble").getValue(), 7.49);
    });
    it("Test lowerKey", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.lowerKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        testBoolean.equalsTrue("Validate Map before running LowerKey", basicTypesMap1.validateMap());
        expect(basicTypesMap1.lowerKey("AAAAAA")).toEqual(null);
        expect(basicTypesMap1.lowerKey("Dry Food")).toEqual("ChewToy");
        expect(basicTypesMap1.lowerKey("ChewToy")).toEqual("Catnip");
        expect(basicTypesMap1.lowerKey("Catnip")).toEqual("BBBBBB");
        expect(basicTypesMap1.lowerKey("Wet Food")).toEqual("Leash");
        expect(basicTypesMap1.lowerKey("Leash")).toEqual("Dry Food");
        expect(basicTypesMap1.lowerKey("Chia")).toEqual("ChewToy");
        expect(basicTypesMap1.lowerKey("Center")).toEqual("Catnip");
        expect(basicTypesMap1.lowerKey("BCCCCC")).toEqual("BBBBBB");
        expect(basicTypesMap1.lowerKey("LongLeash")).toEqual("Leash");
        expect(basicTypesMap1.lowerKey("Dry Kibble")).toEqual("Dry Food");
        expect(basicTypesMap1.lowerKey("Wet Kibble wow am I out of ideas for text")).toEqual("Wet Food");
    });
    it("Test floorKey", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.floorKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.floorKey("AAAAAA")).toEqual(null);
        expect(basicTypesMap1.floorKey("ChewToy")).toEqual("ChewToy");
        expect(basicTypesMap1.floorKey("Catnip")).toEqual("Catnip");
        expect(basicTypesMap1.floorKey("BBBBBB")).toEqual("BBBBBB");
        expect(basicTypesMap1.floorKey("Leash")).toEqual("Leash");
        expect(basicTypesMap1.floorKey("Dry Food")).toEqual("Dry Food");
        expect(basicTypesMap1.floorKey("Wet Food")).toEqual("Wet Food");
        expect(basicTypesMap1.floorKey("Chia")).toEqual("ChewToy");
        expect(basicTypesMap1.floorKey("Center")).toEqual("Catnip");
        expect(basicTypesMap1.floorKey("BCCCCC")).toEqual("BBBBBB");
        expect(basicTypesMap1.floorKey("LongLeash")).toEqual("Leash");
        expect(basicTypesMap1.floorKey("Dry Kibble")).toEqual("Dry Food");
        expect(basicTypesMap1.floorKey("Wet Kibble wow am I out of ideas for text")).toEqual("Wet Food");
    });
    it("Test lots", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct);
        for (var loop1 = 1; loop1 <= 26; loop1++) {
            for (var loop2 = 1; loop2 <= 26; loop2++) {
                for (var loop3 = 1; loop3 <= 1; loop3++) {
                    var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3);
                    var product = new PetStoreProduct(txt, loop1 + loop2 + loop3);
                    petStoreMap1.put(product, new ValueClass());
                    //          console.log (txt + " " + (loop1 + loop2 + loop3));
                }
            }
        }
        expect(petStoreMap1.validateMap()).toEqual(true);
        expect(petStoreMap1.size()).toEqual(26 * 26);
        //    expect (petStoreMap1.isEmpty ()).toEqual(false);
        expect(petStoreMap1.get(product1)).toEqual(null);
        for (var loop1 = 1; loop1 <= 26; loop1++) {
            for (var loop2 = 1; loop2 <= 26; loop2++) {
                for (var loop3 = 1; loop3 <= 1; loop3++) {
                    var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3);
                    var product = new PetStoreProduct(txt, loop1 + loop2 + loop3);
                    test.notNull("Expected Get to not be null", petStoreMap1.get(product));
                    //          expect (petStoreMap1.get (product)).not.toEqual(null);
                    test.notNull("Expected Remove to not be null", petStoreMap1.remove(product));
                    //          expect (petStoreMap1.remove (product)).not.toEqual (null);
                }
            }
        }
        expect(petStoreMap1.validateMap()).toEqual(true);
        expect(petStoreMap1.size()).toEqual(0);
        //    expect (petStoreMap1.isEmpty ()).toEqual(true);
        for (var loop2 = 1; loop2 <= 26; loop2++) {
            for (var loop1 = 1; loop1 <= 26; loop1++) {
                for (var loop3 = 1; loop3 <= 1; loop3++) {
                    var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3);
                    var product = new PetStoreProduct(txt, loop1 + loop2 + loop3);
                    petStoreMap1.put(product, new ValueClass());
                    //          console.log (txt + " " + (loop1 + loop2 + loop3));
                }
            }
        }
        expect(petStoreMap1.validateMap()).toEqual(true);
        expect(petStoreMap1.size()).toEqual(26 * 26);
        //    expect (petStoreMap1.isEmpty ()).toEqual(false);
        expect(petStoreMap1.get(product1)).toEqual(null);
        for (var loop1 = 1; loop1 <= 26; loop1++) {
            for (var loop2 = 1; loop2 <= 26; loop2++) {
                for (var loop3 = 1; loop3 <= 1; loop3++) {
                    var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3);
                    var product = new PetStoreProduct(txt, loop1 + loop2 + loop3);
                    expect(petStoreMap1.get(product)).not.toEqual(null);
                    expect(petStoreMap1.remove(product)).not.toEqual(null);
                }
            }
        }
        expect(petStoreMap1.validateMap()).toEqual(true);
        expect(petStoreMap1.size()).toEqual(0);
        //    expect (petStoreMap1.isEmpty ()).toEqual(true);
    });
    it("Test keyset jiterator basics", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var keyset = petStoreMap1.keySet();
        var count = 0;
        var iter = keyset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(0);
    });
    it("Test keyset iterator basics", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var keyset = petStoreMap1.keySet();
        var count = 0;
        var tsi = keyset[Symbol.iterator]();
        var tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(0);
    });
    it("Test entryset jiterator basics", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var entryset = petStoreMap1.entrySet();
        var count = 0;
        var iter = entryset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(0);
    });
    it("Test entryset iterator basics", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var entryset = petStoreMap1.entrySet();
        var count = 0;
        var tsi = entryset[Symbol.iterator]();
        var tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(0);
    });
    it("Test keyset jiterator one entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var keyset = petStoreMap1.keySet();
        var count = 0;
        var iter = keyset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        count = 0;
        keyset = petStoreMap1.keySet();
        iter = keyset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(1);
    });
    it("Test keyset iterator one entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var keyset = petStoreMap1.keySet();
        var count = 0;
        var tsi = keyset[Symbol.iterator]();
        var tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        count = 0;
        keyset = petStoreMap1.keySet();
        tsi = keyset[Symbol.iterator]();
        tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(1);
    });
    it("Test entryset jiterator one entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var entryset = petStoreMap1.entrySet();
        var count = 0;
        var iter = entryset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        entryset = petStoreMap1.entrySet();
        count = 0;
        iter = entryset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(1);
    });
    it("Test entryset iterator one entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var entryset = petStoreMap1.entrySet();
        var count = 0;
        var tsi = entryset[Symbol.iterator]();
        var tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        count = 0;
        entryset = petStoreMap1.entrySet();
        tsi = entryset[Symbol.iterator]();
        tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(1);
    });
    it("Test keyset jiterator two entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var keyset = petStoreMap1.keySet();
        var count = 0;
        var iter = keyset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        count = 0;
        keyset = petStoreMap1.keySet();
        iter = keyset.iterator();
        var found1 = false;
        var found2 = false;
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
            if (p.getPrice() === (product1.getPrice())) {
                found1 = true;
            }
            else {
                if (p.getPrice() === (product2.getPrice())) {
                    found2 = true;
                }
            }
        }
        expect(count).toEqual(2);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test keyset iterator two entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var keyset = petStoreMap1.keySet();
        var count = 0;
        var tsi = keyset[Symbol.iterator]();
        var tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        count = 0;
        keyset = petStoreMap1.keySet();
        tsi = keyset[Symbol.iterator]();
        tmp = tsi.next();
        var found1 = false;
        var found2 = false;
        while (!tmp.done) {
            var p = tmp.value;
            if (p.getPrice() === (product1.getPrice())) {
                found1 = true;
            }
            else {
                if (p.getPrice() === (product2.getPrice())) {
                    found2 = true;
                }
            }
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(2);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test entryset jiterator two entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var entryset = petStoreMap1.entrySet();
        var count = 0;
        var iter = entryset.iterator();
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        entryset = petStoreMap1.entrySet();
        count = 0;
        iter = entryset.iterator();
        var found1 = false;
        var found2 = false;
        for (; iter.hasNext();) {
            var p = iter.next();
            count = count + 1;
            if (p.getKey().getPrice() === (product1.getPrice())) {
                found1 = true;
            }
            else {
                if (p.getKey().getPrice() === (product2.getPrice())) {
                    found2 = true;
                }
            }
        }
        expect(count).toEqual(2);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test entryset iterator two entry", function () {
        var petStoreMap1 = new SkipList_1.SkipListMap(priceSortPetStoreProduct);
        var entryset = petStoreMap1.entrySet();
        var count = 0;
        var tsi = entryset[Symbol.iterator]();
        var tmp = tsi.next();
        while (!tmp.done) {
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(0);
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        count = 0;
        entryset = petStoreMap1.entrySet();
        tsi = entryset[Symbol.iterator]();
        tmp = tsi.next();
        var found1 = false;
        var found2 = false;
        while (!tmp.done) {
            var p = tmp.value.getKey();
            if (p.getPrice() === (product1.getPrice())) {
                found1 = true;
            }
            else {
                if (p.getPrice() === (product2.getPrice())) {
                    found2 = true;
                }
            }
            count = count + 1;
            tmp = tsi.next();
        }
        expect(count).toEqual(2);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test map entry replacement", function () {
        var basicTypesMap1 = new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.ceilingKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 9.99)).toEqual(4.99);
        expect(basicTypesMap1.get("Catnip")).toEqual(9.99); // Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    });
    it("Set Test Creation state", function () {
        var SkipListSet1 = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct);
        expect(SkipListSet1.size()).toEqual(0);
        expect(SkipListSet1.isEmpty()).toEqual(true);
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
    });
    it("Set Test Adding one item", function () {
        var SkipListSet1 = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct);
        expect(SkipListSet1.size()).toEqual(0);
        expect(SkipListSet1.isEmpty()).toEqual(true);
        expect(SkipListSet1.add(product1)).toEqual(true);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
    });
    it("Set Test Adding one item basic datatypes", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
    });
    it("Set Test Adding repeatedly one item", function () {
        var SkipListSet1 = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct);
        expect(SkipListSet1.size()).toEqual(0);
        expect(SkipListSet1.isEmpty()).toEqual(true);
        expect(SkipListSet1.add(product1)).toEqual(true);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
        expect(SkipListSet1.add(product1)).toEqual(false);
        expect(1).toEqual(SkipListSet1.size());
        expect(false).toEqual(SkipListSet1.isEmpty());
    });
    it("Set Test Adding repeatedly one item basic datatypes", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
    });
    it("Set Test Adding two items basic datatypes", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Second")).toEqual(true);
        expect(2).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
    });
    it("Set Test Adding two items basic datatypessame value", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
    });
    it("Set Test contains basic datatypessame value", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(false).toEqual(SkipListSet2.contains("Hello"));
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(true).toEqual(SkipListSet2.contains("Hello"));
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Hello")).toEqual(false);
        expect(true).toEqual(SkipListSet2.contains("Hello"));
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
    });
    it("Set Test first basic datatypes", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.isEmpty()).toEqual(true);
        expect(null).toEqual(SkipListSet2.first());
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect("Hello").toEqual(SkipListSet2.first());
        expect(1).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Second")).toEqual(true);
        expect("Hello").toEqual(SkipListSet2.first());
        expect(2).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
        expect(SkipListSet2.add("Alpha")).toEqual(true);
        expect("Alpha").toEqual(SkipListSet2.first());
        expect(3).toEqual(SkipListSet2.size());
        expect(false).toEqual(SkipListSet2.isEmpty());
    });
    it("Set Test pollfirst", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.pollFirst()).toEqual(null);
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(SkipListSet2.size()).toEqual(1);
        expect(SkipListSet2.pollFirst()).toEqual("Hello");
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.pollFirst()).toEqual(null);
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.add("Second")).toEqual(true);
        expect(SkipListSet2.add("First")).toEqual(true);
        expect(SkipListSet2.pollFirst()).toEqual("First");
        expect(SkipListSet2.size()).toEqual(1);
        expect(SkipListSet2.pollFirst()).toEqual("Second");
        expect(SkipListSet2.size()).toEqual(0);
    });
    it("Set Test polllast", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.pollLast()).toEqual(null);
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.add("Hello")).toEqual(true);
        expect(SkipListSet2.size()).toEqual(1);
        expect(SkipListSet2.pollLast()).toEqual("Hello");
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.pollLast()).toEqual(null);
        expect(SkipListSet2.size()).toEqual(0);
        expect(SkipListSet2.add("Second")).toEqual(true);
        expect(SkipListSet2.add("First")).toEqual(true);
        expect(SkipListSet2.pollLast()).toEqual("Second");
        expect(SkipListSet2.size()).toEqual(1);
        expect(SkipListSet2.pollLast()).toEqual("First");
        expect(SkipListSet2.size()).toEqual(0);
    });
    it("Set Test java iteration", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct);
        expect(SkipListSet2.add(product1)).toEqual(true);
        expect(SkipListSet2.add(product2)).toEqual(true);
        var offset = 0;
        for (var iter = SkipListSet2.iterator(); iter.hasNext();) {
            var psp = iter.next();
            if (offset === 0)
                expect(psp.getProductName()).toEqual(product2.getProductName()); // Catnip before ChewToy
            if (offset === 1)
                expect(psp.getProductName()).toEqual(product1.getProductName()); // Catnip before ChewToy
            if (offset > 1)
                fail();
            offset++;
        }
    });
    /*
  
    it("Set Test typescript iteration", function() {
      const SkipListSet2:SkipListSet<PetStoreProduct> = new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
  
      expect (SkipListSet2.add (product1)).toEqual (true);
      expect (SkipListSet2.add (product2)).toEqual (true);
  
      const offset:number = 0;
  
      const tsi:Iterator<PetStoreProduct> = SkipListSet2[Symbol.iterator]();
      let tmp:IteratorResult<PetStoreProduct> = tsi.next();
      expect (tmp.done).toEqual(false);
      expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));  // Catnip before ChewToy
      tmp = tsi.next();
      expect (tmp.done).toEqual(false);
      expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));  // Catnip before ChewToy
      tmp = tsi.next();
      expect (tmp.done).toEqual(true);
  
    });
  
  */
    it("Set Test ceiling", function () {
        var SkipListSet2 = new SkipList_2.SkipListSet(Collections_1.Collections.getNumberComparator());
        expect(SkipListSet2.add(44)).toEqual(true);
        expect(SkipListSet2.add(5)).toEqual(true);
        expect(SkipListSet2.add(20)).toEqual(true);
        expect(SkipListSet2.add(88)).toEqual(true);
        expect(SkipListSet2.add(50)).toEqual(true);
        expect(SkipListSet2.add(30)).toEqual(true);
        expect(SkipListSet2.add(1)).toEqual(true);
        expect(SkipListSet2.add(48)).toEqual(true);
        expect(SkipListSet2.add(62)).toEqual(true);
        expect(SkipListSet2.add(78)).toEqual(true);
        expect(SkipListSet2.add(17)).toEqual(true);
        expect(SkipListSet2.add(70)).toEqual(true);
        expect(SkipListSet2.add(80)).toEqual(true);
        expect(SkipListSet2.add(32)).toEqual(true);
        expect(SkipListSet2.ceiling(16)).toEqual(17); // 16 isnt there, 17 is
        expect(SkipListSet2.ceiling(16)).toEqual(17); // 16 isnt there, 17 is
        expect(SkipListSet2.ceiling(17)).toEqual(17); // 17 is there
    });
    it("Set Test lots", function () {
        var tset = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        for (var loop1 = 1; loop1 <= 26; loop1++) {
            for (var loop2 = 1; loop2 <= 26; loop2++) {
                var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2);
                tset.add(txt);
            }
        }
        expect(tset.size()).toEqual(26 * 26);
        var count = 0;
        for (var iter = tset.iterator(); iter.hasNext();) {
            count = count + 1;
            var psp = iter.next();
        }
        expect(count).toEqual(26 * 26);
    });
    it("Set Test lots2", function () {
        var tset = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        for (var loop2 = 1; loop2 <= 26; loop2++) {
            for (var loop1 = 1; loop1 <= 26; loop1++) {
                var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2);
                tset.add(txt);
            }
        }
        expect(tset.validateSet()).toEqual(true);
        expect(tset.size()).toEqual(26 * 26);
        var count = 0;
        for (var iter = tset.iterator(); iter.hasNext();) {
            count = count + 1;
            var psp = iter.next();
        }
        expect(count).toEqual(26 * 26);
    });
    it("Set Test constructing with elements from an ArrayList", function () {
        var sourceList = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var tset = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct, sourceList);
        expect(tset.size()).toEqual(sourceList.size());
    }, 2000);
    it("Set Test constructing with elements from a LinkedList", function () {
        var sourceList = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var tset = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct, sourceList);
        expect(tset.size()).toEqual(sourceList.size());
    }, 2000);
    it("Set Test constructing with elements from an HashSet", function () {
        var source = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(source.add(product1)).toEqual(true);
        expect(source.add(product2)).toEqual(true);
        var tset = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct, source);
        expect(tset.size()).toEqual(source.size());
    }, 2000);
    it("Set Test constructing with elements from a SkipListSet", function () {
        var source = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct);
        expect(source.add(product1)).toEqual(true);
        expect(source.add(product2)).toEqual(true);
        var tset = new SkipList_2.SkipListSet(alphabeticalSortPetStoreProduct, source);
        expect(tset.size()).toEqual(source.size());
    });
    it("Set Focused test on reproducable error 0.8.0 16 Sep 2017", function () {
        var tsData = new SkipList_2.SkipListSet(Collections_1.Collections.getStringComparator());
        tsData.add("Cat");
        tsData.add("Squirrel");
        tsData.add("Dog");
        testBoolean.equalsTrue("Validate Set 1 ", tsData.validateSet());
        testNumber.equals("Size a", tsData.size(), 3);
        testBoolean.equalsTrue("Remove dog is in set", tsData.remove("Dog"));
        testBoolean.equalsTrue("Validate Set 1a ", tsData.validateSet());
        testNumber.equals("Size b", tsData.size(), 2);
        tsData.add("hvhli");
        testBoolean.equalsTrue("Validate Set 2 ", tsData.validateSet());
        testNumber.equals("Size c", tsData.size(), 3);
        expect(tsData.remove("Cat")).toEqual(true);
        testBoolean.equalsTrue("Validate Set 2a ", tsData.validateSet());
        testNumber.equals("Size d", tsData.size(), 2);
        tsData.add("dybtc");
        testBoolean.equalsTrue("Validate Set 3 ", tsData.validateSet());
        expect(tsData.size()).toEqual(3);
        expect(tsData.remove("dybtc")).toEqual(true);
        testBoolean.equalsTrue("Validate Set 3a ", tsData.validateSet());
        expect(tsData.size()).toEqual(2);
        tsData.add("xuaqo");
        testBoolean.equalsTrue("Validate Set 4 ", tsData.validateSet());
        expect(tsData.size()).toEqual(3);
        expect(tsData.remove("xuaqo")).toEqual(true);
        testBoolean.equalsTrue("Validate Set 4a ", tsData.validateSet());
        expect(tsData.size()).toEqual(2);
        tsData.add("ktwky");
        testBoolean.equalsTrue("Validate Set 5 ", tsData.validateSet());
        expect(tsData.size()).toEqual(3);
        //    tsData.printSet ();
        expect(tsData.remove("hvhli")).toEqual(true);
        //    tsData.printSet ();
        testBoolean.equalsTrue("Validate Set 6 ", tsData.validateSet());
        expect(tsData.size()).toEqual(2);
        tsData.add("cnnlv");
        testBoolean.equalsTrue("Validate Set 7 ", tsData.validateSet());
        expect(tsData.size()).toEqual(3);
        //    tsData.printSet ();
        expect(tsData.remove("Squirrel")).toEqual(true);
        //    tsData.printSet ();
        testBoolean.equalsTrue("Validate Set 8 ", tsData.validateSet());
        expect(tsData.size()).toEqual(2);
    });
});
