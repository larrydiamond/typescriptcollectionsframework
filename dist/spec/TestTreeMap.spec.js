"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var BasicMapEntry_1 = require("../src/BasicMapEntry");
var Collections_1 = require("../src/Collections");
var TreeMap_1 = require("../src/TreeMap");
describe("Test TreeMap functionality", function () {
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
    var ValueClass = /** @class */ (function () {
        function ValueClass(blah1) {
            if (blah1 === void 0) { blah1 = 100; }
            this.blah2 = "blah";
        }
        return ValueClass;
    }());
    it("Test Creation state", function () {
        var TreeMap1 = new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct);
        expect(TreeMap1.size()).toEqual(0);
        expect(TreeMap1.isEmpty()).toEqual(true);
        expect(TreeMap1.firstKey()).toEqual(null);
        expect(TreeMap1.firstEntry()).toEqual(null);
        expect(TreeMap1.lastKey()).toEqual(null);
        expect(TreeMap1.lastEntry()).toEqual(null);
        var TreeMap2 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(TreeMap2.size()).toEqual(0);
        expect(TreeMap2.firstKey()).toEqual(null);
        expect(TreeMap2.firstEntry()).toEqual(null);
        expect(TreeMap2.lastKey()).toEqual(null);
        expect(TreeMap2.lastEntry()).toEqual(null);
    });
    it("Test Adding one item", function () {
        var petStoreMap1 = new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct);
        expect(petStoreMap1.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap1.size()).toEqual(1);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        expect(petStoreMap1.firstKey()).toEqual(product1);
        expect(petStoreMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
        expect(petStoreMap1.lastKey()).toEqual(product1);
        expect(petStoreMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
    });
    it("Test Adding one native item", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
    });
    it("Test adding initial elements", function () {
        var sourceMap = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(sourceMap.put("A", "B")).toEqual(null);
        expect(sourceMap.put("C", "D")).toEqual(null);
        expect(sourceMap.size()).toEqual(2);
        var destinationMap = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator(), sourceMap);
        expect(destinationMap.size()).toEqual(2);
    });
    it("Test Adding two items", function () {
        var petStoreMap1 = new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct);
        expect(petStoreMap1.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap1.size()).toEqual(1);
        expect(petStoreMap1.firstKey()).toEqual(product1);
        expect(petStoreMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
        expect(petStoreMap1.lastKey()).toEqual(product1);
        expect(petStoreMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
        expect(petStoreMap1.put(product2, new ValueClass(10))).toEqual(null);
        expect(petStoreMap1.size()).toEqual(2);
        expect(petStoreMap1.firstKey()).toEqual(product2);
        expect(petStoreMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product2, new ValueClass(10)));
        expect(petStoreMap1.lastKey()).toEqual(product1);
        expect(petStoreMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
    });
    it("Test Adding two native items", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(2);
        expect(basicTypesMap1.firstKey()).toEqual("Catnip");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
    });
    it("Test ContainsKey where the item is contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.containsKey("ZZZZZZ")).toEqual(false);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Catnip")).toEqual(true);
    });
    it("Test ContainsKey where the item is not contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Bananas")).toEqual(false); // I guess we have no bananas today
    });
    it("Test ContainsKey where the item is contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Catnip")).toEqual(true);
    });
    it("Test ContainsKey where the item is not contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Bananas")).toEqual(false); // I guess we have no bananas today
    });
    it("Test Adding three native items", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        basicTypesMap1.clear();
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(2);
        expect(basicTypesMap1.firstKey()).toEqual("Catnip");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.put("Leash", 1.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.firstKey()).toEqual("Catnip");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.lastKey()).toEqual("Leash");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 1.99));
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.size()).toEqual(3);
        basicTypesMap1.clear();
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 1.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Test Adding some items", function () {
        var petStoreMap1 = new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct);
        var petStoreMap2 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        var basicTypesMap2 = new TreeMap_1.TreeMap(Collections_1.Collections.getNumberComparator());
        expect(basicTypesMap1.get("ZZZZZZ")).toEqual(null);
        expect(petStoreMap1.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap1.put(product2, new ValueClass(10))).toEqual(null);
        expect(petStoreMap1.put(product3, new ValueClass())).toEqual(null);
        expect(petStoreMap1.size()).toEqual(3);
        expect(petStoreMap2.put(product1, new ValueClass())).toEqual(null);
        expect(petStoreMap2.put(product2, new ValueClass())).toEqual(null);
        expect(petStoreMap2.size()).toEqual(2);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("Goldfish", 9.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(4);
        expect(basicTypesMap1.get("ZZZZZZ")).toEqual(null);
        var oldPrice = basicTypesMap1.put("ChewToy", 9.99);
        expect(oldPrice).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(4);
        expect(basicTypesMap1.get("Catnip")).toEqual(4.99);
        expect(basicTypesMap1.put("Catnip", 5.99)).toEqual(4.99);
        expect(basicTypesMap1.size()).toEqual(4);
        expect(basicTypesMap1.get("Catnip")).toEqual(5.99);
        expect(basicTypesMap2.put(14.99, "ChewToy")).toEqual(null);
        expect(basicTypesMap2.put(4.99, "Catnip")).toEqual(null);
        expect(basicTypesMap2.put(9.99, "Goldfish")).toEqual(null);
        expect(basicTypesMap2.put(0.99, "AAAAA")).toEqual(null);
        expect(basicTypesMap2.put(0.99, "BBBBB")).toEqual("AAAAA");
        expect(basicTypesMap2.size()).toEqual(4);
    });
    it("Test Remove from empty", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Test Remove from one entry map", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("Goldfish", 9.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(4);
        expect(basicTypesMap1.validateMap()).toEqual(true);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.validateMap()).toEqual(true);
    });
    it("Test Remove head left full right empty", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
    it("Test Remove head right full left empty", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
    it("Test getNextHigherKey empty map", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.getNextHigherKey("Dog")).toEqual(null);
    });
    it("Test getNextHigherKey one element", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("Dog")).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("AAAAA")).toEqual(null);
    });
    it("Test getNextHigherKey more complex map", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
    it("Test ceilingEntry", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.ceilingEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.ceilingEntry("ChewToy")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.ceilingEntry("Catnip")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.ceilingEntry("AAAAA")).toEqual(new BasicMapEntry_1.BasicMapEntry("AAAAA", 0.99));
        expect(basicTypesMap1.ceilingEntry("Leash")).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 6.99));
        expect(basicTypesMap1.ceilingEntry("Dry Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.ceilingEntry("Wet Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("Wet Food", 7.49));
        expect(basicTypesMap1.ceilingEntry("Ceiling")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.ceilingEntry("Beer")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.ceilingEntry("Dalias")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.ceilingEntry("ZZZZZ")).toEqual(null);
    });
    it("Test ceilingKey", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.ceilingKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.ceilingKey("ChewToy")).toEqual("ChewToy");
        expect(basicTypesMap1.ceilingKey("Catnip")).toEqual("Catnip");
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
    it("Test higherEntry", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.higherEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.higherEntry("ZZZZZ")).toEqual(null);
        expect(basicTypesMap1.higherEntry("AAAAAA")).toEqual(new BasicMapEntry_1.BasicMapEntry("BBBBBB", 0.99));
        expect(basicTypesMap1.higherEntry("ChewToy")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.higherEntry("Catnip")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.higherEntry("BBBBBB")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.higherEntry("Leash")).toEqual(new BasicMapEntry_1.BasicMapEntry("Wet Food", 7.49));
        expect(basicTypesMap1.higherEntry("Dry Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 6.99));
        expect(basicTypesMap1.higherEntry("Wet Food")).toEqual(null);
        expect(basicTypesMap1.higherEntry("Ceiling")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.higherEntry("Beer")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.higherEntry("Dalias")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
    });
    it("Test higherKey", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
    it("Test lowerEntry", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.lowerEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        expect(basicTypesMap1.lowerEntry("AAAAAA")).toEqual(null);
        expect(basicTypesMap1.lowerEntry("Dry Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.lowerEntry("ChewToy")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.lowerEntry("Catnip")).toEqual(new BasicMapEntry_1.BasicMapEntry("BBBBBB", 0.99));
        expect(basicTypesMap1.lowerEntry("Wet Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 6.99));
        expect(basicTypesMap1.lowerEntry("Leash")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.lowerEntry("Chia")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.lowerEntry("Center")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.lowerEntry("BCCCCC")).toEqual(new BasicMapEntry_1.BasicMapEntry("BBBBBB", 0.99));
        expect(basicTypesMap1.lowerEntry("LongLeash")).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 6.99));
        expect(basicTypesMap1.lowerEntry("Dry Kibble")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.lowerEntry("Wet Kibble wow am I out of ideas for text")).toEqual(new BasicMapEntry_1.BasicMapEntry("Wet Food", 7.49));
    });
    it("Test floorEntry", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.floorEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.floorEntry("AAAAAA")).toEqual(null);
        expect(basicTypesMap1.floorEntry("ChewToy")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.floorEntry("Catnip")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.floorEntry("BBBBBB")).toEqual(new BasicMapEntry_1.BasicMapEntry("BBBBBB", 0.99));
        expect(basicTypesMap1.floorEntry("Leash")).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 6.99));
        expect(basicTypesMap1.floorEntry("Dry Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.floorEntry("Wet Food")).toEqual(new BasicMapEntry_1.BasicMapEntry("Wet Food", 7.49));
        expect(basicTypesMap1.floorEntry("Chia")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.floorEntry("Center")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.floorEntry("BCCCCC")).toEqual(new BasicMapEntry_1.BasicMapEntry("BBBBBB", 0.99));
        expect(basicTypesMap1.floorEntry("LongLeash")).toEqual(new BasicMapEntry_1.BasicMapEntry("Leash", 6.99));
        expect(basicTypesMap1.floorEntry("Dry Kibble")).toEqual(new BasicMapEntry_1.BasicMapEntry("Dry Food", 7.99));
        expect(basicTypesMap1.floorEntry("Wet Kibble wow am I out of ideas for text")).toEqual(new BasicMapEntry_1.BasicMapEntry("Wet Food", 7.49));
    });
    it("Test lowerKey", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.lowerKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("BBBBBB", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
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
        var petStoreMap1 = new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct);
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
                    expect(petStoreMap1.get(product)).not.toEqual(null);
                    expect(petStoreMap1.remove(product)).not.toEqual(null);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var petStoreMap1 = new TreeMap_1.TreeMap(priceSortPetStoreProduct);
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator());
        expect(basicTypesMap1.ceilingKey("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 9.99)).toEqual(4.99);
        expect(basicTypesMap1.get("Catnip")).toEqual(9.99); // Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    });
});
