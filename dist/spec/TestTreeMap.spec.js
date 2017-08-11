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
var CollectionUtils_1 = require("../src/CollectionUtils");
var TreeMap_1 = require("../src/TreeMap");
describe("Test TreeMap functionality", function () {
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
    ;
    var product1 = new PetStoreProduct("ChewToy", 14.99);
    var product2 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var alphabeticalSortPetStoreProduct = {
        compare: function (o1, o2) {
            if (o1 === o2)
                return 0;
            if (o1 === null)
                return -1;
            if (o1 === undefined)
                return -1;
            if (o2 === null)
                return 1;
            if (o2 === undefined)
                return 1;
            if (o1.getProductName() === o2.getProductName())
                return 0;
            if (o1.getProductName() === null)
                return -1;
            if (o1.getProductName() === undefined)
                return -1;
            if (o2.getProductName() === null)
                return 1;
            if (o2.getProductName() === undefined)
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
            if (o1 === null)
                return -1;
            if (o1 === undefined)
                return -1;
            if (o2 === null)
                return 1;
            if (o2 === undefined)
                return 1;
            if (o1.getPrice() === o2.getPrice())
                return 0;
            if (o1.getPrice() === null)
                return -1;
            if (o1.getPrice() === undefined)
                return -1;
            if (o2.getPrice() === null)
                return 1;
            if (o2.getPrice() === undefined)
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
        }
        return ValueClass;
    }());
    it("Test Creation state", function () {
        var TreeMap1 = new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct);
        expect(TreeMap1.size()).toEqual(0);
        expect(TreeMap1.firstKey()).toEqual(null);
        expect(TreeMap1.firstEntry()).toEqual(null);
        expect(TreeMap1.lastKey()).toEqual(null);
        expect(TreeMap1.lastEntry()).toEqual(null);
        var TreeMap2 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
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
        expect(petStoreMap1.firstKey()).toEqual(product1);
        expect(petStoreMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
        expect(petStoreMap1.lastKey()).toEqual(product1);
        expect(petStoreMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry(product1, new ValueClass()));
    });
    it("Test Adding one native item", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.firstKey()).toEqual("ChewToy");
        expect(basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.lastKey()).toEqual("ChewToy");
        expect(basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Catnip")).toEqual(true);
    });
    it("Test ContainsKey where the item is not contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Bananas")).toEqual(false); // I guess we have no bananas today
    });
    it("Test ContainsKey where the item is contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Catnip")).toEqual(true);
    });
    it("Test ContainsKey where the item is not contained", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.containsKey("Bananas")).toEqual(false); // I guess we have no bananas today
    });
    it("Test Adding three native items", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        var basicTypesMap2 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getNumberComparator());
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
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
    });
    it("Test Remove from one entry map", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(0);
        basicTypesMap1.clear();
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(1);
        basicTypesMap1.clear();
        expect(basicTypesMap1.remove("Bananas")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(0);
    });
    it("Test Remove head both sides loaded", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("Goldfish", 9.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(4);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(3);
    });
    it("Test Remove head left full right empty", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.remove("ChewToy")).toEqual(14.99);
        expect(basicTypesMap1.size()).toEqual(2);
    });
    it("Test Remove head right full left empty", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.size()).toEqual(0);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.size()).toEqual(3);
        expect(basicTypesMap1.remove("AAAAA")).toEqual(0.99);
        expect(basicTypesMap1.size()).toEqual(2);
    });
    it("Test getNextHigherKey empty map", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.getNextHigherKey("Dog")).toEqual(null);
    });
    it("Test getNextHigherKey one element", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("Dog")).toEqual(null);
        expect(basicTypesMap1.getNextHigherKey("AAAAA")).toEqual(null);
    });
    it("Test getNextHigherKey more complex map", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.getNextHigherKey("AAAAA")).toEqual("Catnip");
        expect(basicTypesMap1.getNextHigherKey("Catnip")).toEqual("ChewToy");
        expect(basicTypesMap1.getNextHigherKey("ChewToy")).toEqual("Dry Food");
        expect(basicTypesMap1.getNextHigherKey("Dry Food")).toEqual("Leash");
        expect(basicTypesMap1.getNextHigherKey("Leash")).toEqual("Wet Food");
        expect(basicTypesMap1.getNextHigherKey("Wet Food")).toEqual(null);
    });
    it("Test ceilingEntry", function () {
        var basicTypesMap1 = new TreeMap_1.TreeMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(basicTypesMap1.ceilingEntry("TheresNothingInThisMap")).toEqual(null);
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(null);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(null);
        expect(basicTypesMap1.put("AAAAA", 0.99)).toEqual(null);
        expect(basicTypesMap1.put("Leash", 6.99)).toEqual(null);
        expect(basicTypesMap1.put("Dry Food", 7.99)).toEqual(null);
        expect(basicTypesMap1.put("Wet Food", 7.49)).toEqual(null);
        //    basicTypesMap1.printMap();
        expect(basicTypesMap1.ceilingEntry("Beer")).toEqual(new BasicMapEntry_1.BasicMapEntry("Catnip", 4.99));
        expect(basicTypesMap1.ceilingEntry("ChewToy")).toEqual(new BasicMapEntry_1.BasicMapEntry("ChewToy", 14.99));
        expect(basicTypesMap1.ceilingEntry("ZZZZZ")).toEqual(null);
    });
});
