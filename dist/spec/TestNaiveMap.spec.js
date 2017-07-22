"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionUtils_1 = require("../src/CollectionUtils");
var NaiveMap_1 = require("../src/NaiveMap");
describe("Test NaiveMap functionality", function () {
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
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product1 = new PetStoreProduct("Catnip", 4.99);
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
        function ValueClass() {
        }
        return ValueClass;
    }());
    it("Test Creation state", function () {
        var naiveMap1 = new NaiveMap_1.NaiveMap(alphabeticalSortPetStoreProduct);
        expect(naiveMap1.size()).toEqual(0);
        var naiveMap2 = new NaiveMap_1.NaiveMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(naiveMap2.size()).toEqual(0);
    });
    it("Test Adding some items", function () {
        var petStoreMap1 = new NaiveMap_1.NaiveMap(alphabeticalSortPetStoreProduct);
        var petStoreMap2 = new NaiveMap_1.NaiveMap(priceSortPetStoreProduct);
        var basicTypesMap1 = new NaiveMap_1.NaiveMap(CollectionUtils_1.CollectionUtils.getStringComparator());
        var basicTypesMap2 = new NaiveMap_1.NaiveMap(CollectionUtils_1.CollectionUtils.getNumberComparator());
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        petStoreMap1.put(product3, new ValueClass());
        expect(petStoreMap1.size()).toEqual(3);
        petStoreMap2.put(product1, new ValueClass());
        petStoreMap2.put(product2, new ValueClass());
        expect(petStoreMap2.size()).toEqual(2);
        basicTypesMap1.put("ChewToy", 14.99);
        basicTypesMap1.put("Catnip", 4.99);
        basicTypesMap1.put("Goldfish", 9.99);
        basicTypesMap1.put("AAAAA", 0.99);
        expect(basicTypesMap1.size()).toEqual(4);
        basicTypesMap2.put(14.99, "ChewToy");
        basicTypesMap2.put(4.99, "Catnip");
        basicTypesMap2.put(9.99, "Goldfish");
        basicTypesMap2.put(0.99, "AAAAA");
        basicTypesMap2.put(5.99, "BBBBB");
        expect(basicTypesMap2.size()).toEqual(5);
    });
});
