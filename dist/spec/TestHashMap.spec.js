"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var HashMap_1 = require("../src/HashMap");
describe("Test HashMap functionality", function () {
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
        }
        return ValueClass;
    }());
    it("Test Creation state", function () {
        var myMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
    });
    it("Test adding one entry", function () {
        var myMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(myMap1.size()).toEqual(0);
        expect(myMap1.isEmpty()).toEqual(true);
        expect(undefined).toEqual(myMap1.put(product1, new ValueClass()));
        expect(myMap1.size()).toEqual(1);
        expect(myMap1.isEmpty()).toEqual(false);
    });
    it("Test adding two entries", function () {
        var myMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        var petStoreMap2 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
    it("Test adding initial elements", function () {
        var sourceMap = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceMap.put("A", "B")).toEqual(undefined);
        expect(sourceMap.put("C", "D")).toEqual(undefined);
        expect(sourceMap.size()).toEqual(2);
        var destinationMap = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable(), sourceMap);
        expect(destinationMap.size()).toEqual(2);
    });
    it("Test get", function () {
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        var petStoreMap2 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        var petStoreMap2 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
    it("Test rehash", function () {
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        for (var loop1 = 1; loop1 <= 26; loop1++) {
            for (var loop2 = 1; loop2 <= 26; loop2++) {
                for (var loop3 = 1; loop3 <= 26; loop3++) {
                    for (var loop4 = 1; loop4 <= 26; loop4++) {
                        var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3) + String.fromCharCode(96 + loop4);
                        var product = new PetStoreProduct(txt, loop1 + loop2 + loop3 + loop4);
                        petStoreMap1.put(product, new ValueClass());
                        //          console.log (txt + " " + (loop1 + loop2 + loop3));
                    }
                }
            }
        }
        expect(petStoreMap1.size()).toEqual(26 * 26 * 26 * 26);
        expect(petStoreMap1.isEmpty()).toEqual(false);
        expect(petStoreMap1.get(product1)).toEqual(null);
        for (var loop2 = 1; loop2 <= 26; loop2++) {
            for (var loop1 = 1; loop1 <= 26; loop1++) {
                for (var loop3 = 1; loop3 <= 26; loop3++) {
                    for (var loop4 = 1; loop4 <= 26; loop4++) {
                        var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3) + String.fromCharCode(96 + loop4);
                        var product = new PetStoreProduct(txt, loop1 + loop2 + loop3 + loop4);
                        expect(petStoreMap1.get(product)).not.toEqual(null);
                        expect(petStoreMap1.remove(product)).not.toEqual(null);
                    }
                }
            }
        }
        expect(petStoreMap1.size()).toEqual(0);
        expect(petStoreMap1.isEmpty()).toEqual(true);
    });
    it("Test keyset jiterator basics", function () {
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
            if (p.getProductName() === product1.getProductName()) {
                found1 = true;
            }
            else {
                if (p.getProductName() === product2.getProductName()) {
                    found2 = true;
                }
            }
        }
        expect(count).toEqual(2);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test keyset iterator two entry", function () {
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
            if (p.getProductName() === product1.getProductName()) {
                found1 = true;
            }
            else {
                if (p.getProductName() === product2.getProductName()) {
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
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
            if (p.getKey().getProductName() === product1.getProductName()) {
                found1 = true;
            }
            else {
                if (p.getKey().getProductName() === product2.getProductName()) {
                    found2 = true;
                }
            }
        }
        expect(count).toEqual(2);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test entryset iterator two entry", function () {
        var petStoreMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
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
            if (p.getProductName() === product1.getProductName()) {
                found1 = true;
            }
            else {
                if (p.getProductName() === product2.getProductName()) {
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
        var basicTypesMap1 = new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable());
        expect(basicTypesMap1.put("ChewToy", 14.99)).toEqual(undefined);
        expect(basicTypesMap1.put("Catnip", 4.99)).toEqual(undefined);
        expect(basicTypesMap1.put("Catnip", 9.99)).toEqual(4.99);
        expect(basicTypesMap1.get("Catnip")).toEqual(9.99); // Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
    });
});
