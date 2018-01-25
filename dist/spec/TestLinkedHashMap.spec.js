"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkedHashMap_1 = require("../src/LinkedHashMap");
describe("Test LinkedHashMap functionality", function () {
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
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
    // Wanted to show a class in the value object but anything would work fine
    var ValueClass = (function () {
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
    it("Test key jiterator three entry", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        var keys = [];
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        petStoreMap1.put(product3, new ValueClass());
        count = 0;
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
    it("Test value jiterator two entry", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        var values = [];
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        count = 0;
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
    it("Test Entry jiterator two entry", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        var count = 0;
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        count = 0;
        var linkedIter = petStoreMap1.newEntryIterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            count = count + 1;
        }
        expect(count).toEqual(2);
        expect(petStoreMap1.containsKey(product2)).toEqual(true);
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
        petStoreMap1.put(product3, new ValueClass());
        expect(petStoreMap1.size()).toEqual(3);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        petStoreMap2.put(product1, new ValueClass());
        petStoreMap2.put(product2, new ValueClass());
        expect(petStoreMap2.size()).toEqual(2);
        expect(petStoreMap2.isEmpty()).toEqual(false);
        petStoreMap2.clear();
        expect(petStoreMap2.isEmpty()).toEqual(true);
        petStoreMap2.put(product1, new ValueClass());
        petStoreMap2.put(product2, new ValueClass());
        expect(petStoreMap2.size()).toEqual(2);
        expect(petStoreMap2.isEmpty()).toEqual(false);
    });
    it("Test containskey", function () {
        var petStoreMap1 = new LinkedHashMap_1.LinkedHashMap();
        expect(petStoreMap1.get(product1)).toEqual(null);
        expect(petStoreMap1.containsKey(product1)).toEqual(false);
        petStoreMap1.put(product1, new ValueClass());
        expect(petStoreMap1.get(product1)).not.toEqual(null);
        expect(petStoreMap1.containsKey(product1)).toEqual(true);
        expect(petStoreMap1.get(product2)).toEqual(null);
        expect(petStoreMap1.containsKey(product2)).toEqual(false);
        petStoreMap1.put(product2, new ValueClass());
        expect(petStoreMap1.get(product1)).not.toEqual(null);
        expect(petStoreMap1.containsKey(product1)).toEqual(true);
        expect(petStoreMap1.get(product2)).not.toEqual(null);
        expect(petStoreMap1.containsKey(product2)).toEqual(true);
        expect(petStoreMap1.get(product3)).toEqual(null);
        expect(petStoreMap1.containsKey(product3)).toEqual(false);
    });
});
