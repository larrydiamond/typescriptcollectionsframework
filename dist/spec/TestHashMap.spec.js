"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashMap_1 = require("../src/HashMap");
describe("Test HashMap functionality", function () {
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
        PetStoreProduct.prototype.equals = function (t) {
            if (t instanceof PetStoreProduct) {
                if ((this.productName === t.getProductName()) && (this.price === t.getPrice()))
                    return true;
            }
            return false;
        };
        PetStoreProduct.prototype.hashCode = function () {
            if (this.price === undefined)
                return 1;
            if (this.price === null)
                return 1;
            var tmp = Math.abs(this.price);
            return Math.ceil(tmp);
        };
        return PetStoreProduct;
    }());
    ;
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
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
        var myMap1 = new HashMap_1.HashMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
    });
    it("Test adding one entry", function () {
        var myMap1 = new HashMap_1.HashMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
        expect(undefined).toEqual(myMap1.put(product1, new ValueClass()));
        expect(myMap1.size()).toEqual(1);
        expect(myMap1.isEmpty()).toEqual(false);
    });
    it("Test adding two entries", function () {
        var myMap1 = new HashMap_1.HashMap();
        //    myMap1.printMap();
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
        expect(undefined).toEqual(myMap1.put(product1, new ValueClass()));
        //    myMap1.printMap();
        expect(myMap1.size()).toEqual(1);
        expect(myMap1.isEmpty()).toEqual(false);
        expect(undefined).toEqual(myMap1.put(product2, new ValueClass()));
        //    myMap1.printMap();
        expect(myMap1.size()).toEqual(2);
        expect(myMap1.isEmpty()).toEqual(false);
    });
    it("Test Adding some items", function () {
        var petStoreMap1 = new HashMap_1.HashMap();
        var petStoreMap2 = new HashMap_1.HashMap();
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        petStoreMap1.put(product3, new ValueClass());
        expect(petStoreMap1.size()).toEqual(3);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        petStoreMap2.put(product1, new ValueClass());
        petStoreMap2.put(product2, new ValueClass());
        expect(petStoreMap2.size()).toEqual(2);
        expect(petStoreMap2.isEmpty()).toEqual(false);
    });
    it("Test get", function () {
        var petStoreMap1 = new HashMap_1.HashMap();
        expect(petStoreMap1.get(product1)).toEqual(null);
        petStoreMap1.put(product1, new ValueClass());
        expect(petStoreMap1.get(product1)).not.toEqual(null);
        expect(petStoreMap1.get(product2)).toEqual(null);
        petStoreMap1.put(product2, new ValueClass());
        expect(petStoreMap1.get(product1)).not.toEqual(null);
        expect(petStoreMap1.get(product2)).not.toEqual(null);
        expect(petStoreMap1.get(product3)).toEqual(null);
    });
    it("Test clear", function () {
        var petStoreMap1 = new HashMap_1.HashMap();
        var petStoreMap2 = new HashMap_1.HashMap();
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
        var petStoreMap1 = new HashMap_1.HashMap();
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
    it("Test remove", function () {
        var petStoreMap1 = new HashMap_1.HashMap();
        var petStoreMap2 = new HashMap_1.HashMap();
        expect(petStoreMap1.remove(productNotAvailable)).toEqual(null);
        petStoreMap1.put(product1, new ValueClass());
        petStoreMap1.put(product2, new ValueClass());
        petStoreMap1.put(product3, new ValueClass());
        expect(petStoreMap1.size()).toEqual(3);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        expect(petStoreMap1.remove(productNotAvailable)).toEqual(null);
        expect(petStoreMap1.size()).toEqual(3);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        expect(petStoreMap1.containsKey(product1)).toEqual(true);
        expect(petStoreMap1.remove(product1)).not.toEqual(null);
        expect(petStoreMap1.size()).toEqual(2);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        expect(petStoreMap1.containsKey(product1)).toEqual(false);
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
});
