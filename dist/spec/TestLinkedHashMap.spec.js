"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var LinkedHashMap_1 = require("../src/LinkedHashMap");
describe("Test LinkedHashMap functionality", function () {
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
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
    // Wanted to show a class in the value object but anything would work fine
    var ValueClass = /** @class */ (function () {
        function ValueClass() {
            this.blah1 = 1;
            this.blah2 = "1";
        }
        return ValueClass;
    }());
    it("Test Creation state", function () {
        var myMap1 = new LinkedHashMap_1.LinkedHashMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
    });
    it("Test adding initial elements", function () {
        var sourceMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceMap.put("A", "B")).toEqual(undefined);
        expect(sourceMap.put("C", "D")).toEqual(undefined);
        expect(sourceMap.size()).toEqual(2);
        var destinationMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(2);
    });
    it("Test adding more initial elements", function () {
        var sourceMap = new LinkedHashMap_1.LinkedHashMap();
        expect(sourceMap.put(product1, new ValueClass())).toEqual(undefined);
        expect(sourceMap.put(product2, new ValueClass())).toEqual(undefined);
        expect(sourceMap.put(product3, new ValueClass())).toEqual(undefined);
        expect(sourceMap.size()).toEqual(3);
        var destinationMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(3);
    });
    it("Test adding one entry", function () {
        var myMap1 = new LinkedHashMap_1.LinkedHashMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
        expect(undefined).toEqual(myMap1.put(product1, new ValueClass()));
        expect(myMap1.size()).toEqual(1);
        expect(myMap1.isEmpty()).toEqual(false);
    });
    it("Test adding two entries", function () {
        var myMap1 = new LinkedHashMap_1.LinkedHashMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
        expect(undefined).toEqual(myMap1.put(product1, new ValueClass()));
        expect(myMap1.size()).toEqual(1);
        expect(myMap1.isEmpty()).toEqual(false);
        expect(undefined).toEqual(myMap1.put(product2, new ValueClass()));
        expect(myMap1.size()).toEqual(2);
        expect(myMap1.isEmpty()).toEqual(false);
    });
    it("Test adding three entries", function () {
        var myMap1 = new LinkedHashMap_1.LinkedHashMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
        expect(undefined).toEqual(myMap1.put(product1, new ValueClass()));
        expect(myMap1.size()).toEqual(1);
        expect(myMap1.isEmpty()).toEqual(false);
        expect(undefined).toEqual(myMap1.put(product2, new ValueClass()));
        expect(myMap1.size()).toEqual(2);
        expect(myMap1.isEmpty()).toEqual(false);
        expect(undefined).toEqual(myMap1.put(product3, new ValueClass()));
        expect(myMap1.size()).toEqual(3);
        expect(myMap1.isEmpty()).toEqual(false);
    });
    it("Test key jiterator three entries", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        var keys = [];
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        petStoreMap1.put(product3, new ValueClass());
        var linkedIter = petStoreMap1.newKeyIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            keys[count] = p.getProductName();
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(petStoreMap1.containsKey(product2)).toEqual(true);
        expect(keys[0]).toEqual("Catnip");
        expect(keys[1]).toEqual("ChewToy");
        expect(keys[2]).toEqual("Goldfish");
    });
    it("Test-1 value jiterator two entries", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        var values = [];
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        var linkedIter = petStoreMap1.newValueIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            values[count] = p.blah1;
            count = count + 1;
        }
        expect(count).toEqual(2);
        expect(petStoreMap1.containsKey(product2)).toEqual(true);
        expect(values[0]).toEqual(1);
        expect(values[1]).toEqual(1);
    });
    it("Test-2 value jiterator three entries", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        var values = [];
        petStoreMap1.put("A", "B");
        petStoreMap1.put("C", "D");
        petStoreMap1.put("E", "F");
        var linkedIter = petStoreMap1.newValueIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            values[count] = p;
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(petStoreMap1.containsKey("E")).toEqual(true);
        expect(values[0]).toEqual("B");
        expect(values[1]).toEqual("D");
        expect(values[2]).toEqual("F");
    });
    it("Test-1 entry jiterator two entries", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        var linkedIter = petStoreMap1.newEntryIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            count = count + 1;
        }
        expect(count).toEqual(2);
        expect(petStoreMap1.containsKey(product2)).toEqual(true);
    });
    it("Test-2 entry jiterator three entries", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        var p;
        petStoreMap1.put("A", "B");
        petStoreMap1.put("C", "D");
        petStoreMap1.put("E", "F");
        var linkedIter = petStoreMap1.newEntryIterator();
        for (; linkedIter.hasNext();) {
            p = linkedIter._next();
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(p.getKey()).toEqual("E");
        expect(p.getValue()).toEqual("F");
    });
    it("Test-1 Entry jiterator two entries with initial elements", function () {
        var sourceMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceMap.put("A", "B")).toEqual(undefined);
        expect(sourceMap.put("C", "D")).toEqual(undefined);
        expect(sourceMap.size()).toEqual(2);
        var destinationMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(2);
        var count = 0;
        var linkedIter = destinationMap.newEntryIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            count = count + 1;
        }
        expect(count).toEqual(2);
        expect(destinationMap.containsKey("C")).toEqual(true);
    });
    it("Test-2 Entry jiterator two entries with initial elements", function () {
        var sourceMap = new LinkedHashMap_1.LinkedHashMap();
        expect(sourceMap.put(product1, new ValueClass())).toEqual(undefined);
        expect(sourceMap.put(product2, new ValueClass())).toEqual(undefined);
        expect(sourceMap.put(product3, new ValueClass())).toEqual(undefined);
        expect(sourceMap.size()).toEqual(3);
        var destinationMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(3);
        var count = 0;
        var linkedIter = destinationMap.newEntryIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(destinationMap.containsKey(product3)).toEqual(true);
    });
    it("Test-1 value jiterator two entries with initial elements", function () {
        var sourceMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceMap.put("A", "B")).toEqual(undefined);
        expect(sourceMap.put("C", "D")).toEqual(undefined);
        expect(sourceMap.put("E", "F")).toEqual(undefined);
        expect(sourceMap.size()).toEqual(3);
        var destinationMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(3);
        var count = 0;
        var values = [];
        var linkedIter = destinationMap.newValueIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            values[count] = p;
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(destinationMap.containsKey("A")).toEqual(true);
        expect(destinationMap.containsKey("C")).toEqual(true);
        expect(destinationMap.containsKey("E")).toEqual(true);
        expect(values[0]).toEqual("D");
        expect(values[1]).toEqual("B");
        expect(values[2]).toEqual("F");
    });
    it("Test-2 value jiterator two entries with initial elements", function () {
        var sourceMap = new LinkedHashMap_1.LinkedHashMap();
        expect(sourceMap.put(product1, new ValueClass())).toEqual(undefined);
        expect(sourceMap.put(product2, new ValueClass())).toEqual(undefined);
        expect(sourceMap.put(product3, new ValueClass())).toEqual(undefined);
        expect(sourceMap.size()).toEqual(3);
        var destinationMap = new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(3);
        var count = 0;
        var values = [];
        var linkedIter = destinationMap.newValueIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            values[count] = p.blah1;
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(destinationMap.containsKey(product1)).toEqual(true);
        expect(destinationMap.containsKey(product2)).toEqual(true);
        expect(destinationMap.containsKey(product3)).toEqual(true);
        expect(values[0]).toEqual(1);
        expect(values[1]).toEqual(1);
        expect(values[2]).toEqual(1);
    });
    it("Test clear", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var petStoreMap2 = new LinkedHashMap_1.LinkedHashMap();
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        petStoreMap1.put(product3, new ValueClass());
        expect(petStoreMap1.size()).toEqual(3);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        petStoreMap1.clear();
        expect(petStoreMap1.size()).toEqual(0);
        expect(petStoreMap1.isEmpty()).toEqual(true);
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        expect(petStoreMap1.size()).toEqual(2);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        petStoreMap1.clear();
        petStoreMap2.put(product1, new ValueClass());
        petStoreMap2.put(product2, new ValueClass());
        expect(petStoreMap2.size()).toEqual(2);
        expect(petStoreMap2.isEmpty()).toEqual(false);
        petStoreMap2.clear();
        expect(petStoreMap2.size()).toEqual(0);
        expect(petStoreMap2.isEmpty()).toEqual(true);
        petStoreMap2.put(product1, new ValueClass());
        petStoreMap2.put(product2, new ValueClass());
        petStoreMap2.put(product3, new ValueClass());
        expect(petStoreMap2.size()).toEqual(3);
        expect(petStoreMap2.isEmpty()).toEqual(false);
        petStoreMap2.clear();
        expect(petStoreMap2.size()).toEqual(0);
        expect(petStoreMap2.isEmpty()).toEqual(true);
    });
    it("Test containskey", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        expect(petStoreMap1.get(product1)).toEqual(undefined);
        expect(petStoreMap1.containsKey(product1)).toEqual(false);
        petStoreMap1.put(product1, new ValueClass());
        expect(petStoreMap1.get(product1)).not.toEqual(undefined);
        expect(petStoreMap1.containsKey(product1)).toEqual(true);
        expect(petStoreMap1.get(product2)).toEqual(undefined);
        expect(petStoreMap1.containsKey(product2)).toEqual(false);
        petStoreMap1.put(product2, new ValueClass());
        expect(petStoreMap1.get(product1)).not.toEqual(undefined);
        expect(petStoreMap1.containsKey(product1)).toEqual(true);
        expect(petStoreMap1.get(product2)).not.toEqual(undefined);
        expect(petStoreMap1.containsKey(product2)).toEqual(true);
        expect(petStoreMap1.get(product3)).toEqual(undefined);
        expect(petStoreMap1.containsKey(product3)).toEqual(false);
    });
    it("Test containsvalue", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var value = new ValueClass();
        value.blah1 = 9;
        expect(petStoreMap1.containsValue(value)).toEqual(false);
        petStoreMap1.put(product1, value);
        expect(petStoreMap1.get(product1)).not.toEqual(undefined);
        expect(petStoreMap1.containsValue(value)).toEqual(true);
    });
});
