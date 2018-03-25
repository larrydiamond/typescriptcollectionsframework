"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Francesco Giordano 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var LinkedHashSet_1 = require("../src/LinkedHashSet");
describe("Test LinkedHashSet functionality", function () {
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
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    it("Test Creation state", function () {
        var mySet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
    });
    it("Test adding initial elements", function () {
        var sourceSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceSet.add("A")).toEqual(true);
        expect(sourceSet.add("C")).toEqual(true);
        expect(sourceSet.size()).toEqual(2);
        var destinationSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable(), sourceSet);
        expect(destinationSet.size()).toEqual(2);
    });
    it("Test adding more initial elements", function () {
        var sourceSet = new LinkedHashSet_1.LinkedHashSet();
        expect(sourceSet.add(product1)).toEqual(true);
        expect(sourceSet.add(product2)).toEqual(true);
        expect(sourceSet.add(product3)).toEqual(true);
        expect(sourceSet.size()).toEqual(3);
        var destinationSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable(), sourceSet);
        expect(destinationSet.size()).toEqual(3);
    });
    it("Test-1 adding one entry", function () {
        var mySet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test-2 adding one entry", function () {
        var mySet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add("frank"));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test-1 adding two entries", function () {
        var mySet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.add(product2));
        expect(mySet1.size()).toEqual(2);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test-2 adding two entries", function () {
        var mySet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.add(2));
        expect(mySet1.size()).toEqual(2);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test adding three entries", function () {
        var mySet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.add(product2));
        expect(mySet1.size()).toEqual(2);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.add(product3));
        expect(mySet1.size()).toEqual(3);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test-1 value jiterator three entries", function () {
        var petStoreSet1 = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable());
        var count = 0;
        var values = [];
        petStoreSet1.add(product1);
        petStoreSet1.add(product2);
        petStoreSet1.add(product3);
        var linkedIter = petStoreSet1.Iterator();
        for (; linkedIter.hasNext();) {
            var p = linkedIter._next();
            values[count] = p.getProductName();
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(petStoreSet1.contains(product2)).toEqual(true);
        expect(values[0]).toEqual("Catnip");
        expect(values[1]).toEqual("ChewToy");
        expect(values[2]).toEqual("Goldfish");
    });
    it("Test-2 value jiterator three entries", function () {
        var stringSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable());
        var count = 0;
        var values = [];
        stringSet.add("3");
        stringSet.add("2");
        stringSet.add("1");
        var linkedIter = stringSet.Iterator();
        for (; linkedIter.hasNext();) {
            var s = linkedIter._next();
            values[count] = s;
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(stringSet.contains("2")).toEqual(true);
        expect(values[0]).toEqual("3");
        expect(values[1]).toEqual("2");
        expect(values[2]).toEqual("1");
    });
    it("Test value jiterator three initial entries", function () {
        // makes new list unorder.. it uses set. see initializeElements() 
        var sourceSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceSet.add("A")).toEqual(true);
        expect(sourceSet.add("C")).toEqual(true);
        expect(sourceSet.add("B")).toEqual(true);
        expect(sourceSet.size()).toEqual(3);
        var destinationSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable(), sourceSet);
        expect(destinationSet.size()).toEqual(3);
        var count = 0;
        var values = [];
        var linkedIter = destinationSet.Iterator();
        for (; linkedIter.hasNext();) {
            var s = linkedIter._next();
            values[count] = s;
            count = count + 1;
        }
        expect(count).toEqual(3);
        expect(destinationSet.contains("C")).toEqual(true);
        expect(values[0]).toEqual("C");
        expect(values[1]).toEqual("B");
        expect(values[2]).toEqual("A");
    });
    it("Test remove entry success", function () {
        // makes new list unorder.. it uses set. see initializeElements() 
        var sourceSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceSet.add("A")).toEqual(true);
        expect(sourceSet.add("C")).toEqual(true);
        expect(sourceSet.add("B")).toEqual(true);
        expect(sourceSet.size()).toEqual(3);
        expect(sourceSet.remove("B")).toEqual(true);
        var count = 0;
        var values = [];
        var linkedIter = sourceSet.Iterator();
        for (; linkedIter.hasNext();) {
            var s = linkedIter._next();
            values[count] = s;
            count = count + 1;
        }
        expect(count).toEqual(2);
        expect(sourceSet.contains("C")).toEqual(true);
        expect(values[0]).toEqual("A");
        expect(values[1]).toEqual("C");
    });
    it("Test remove entry failure", function () {
        // makes new list unorder.. it uses set. see initializeElements() 
        var sourceSet = new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(sourceSet.add("A")).toEqual(true);
        expect(sourceSet.add("C")).toEqual(true);
        expect(sourceSet.add("B")).toEqual(true);
        expect(sourceSet.size()).toEqual(3);
        expect(sourceSet.remove("D")).toEqual(false);
    });
    it("Test clear", function () {
        var petStoreSet1 = new LinkedHashSet_1.LinkedHashSet();
        petStoreSet1.add(product1);
        petStoreSet1.add(product2);
        petStoreSet1.add(product3);
        expect(petStoreSet1.size()).toEqual(3);
        expect(petStoreSet1.isEmpty()).toEqual(false);
        petStoreSet1.clear();
        expect(petStoreSet1.size()).toEqual(0);
        expect(petStoreSet1.isEmpty()).toEqual(true);
        petStoreSet1.add(product1);
        petStoreSet1.add(product2);
        expect(petStoreSet1.size()).toEqual(2);
        expect(petStoreSet1.isEmpty()).toEqual(false);
        petStoreSet1.clear();
        expect(petStoreSet1.size()).toEqual(0);
        expect(petStoreSet1.isEmpty()).toEqual(true);
    });
    it("Test hash remove", function () {
        var petStoreSet1 = new LinkedHashSet_1.LinkedHashSet();
        petStoreSet1.add(product1);
        petStoreSet1.add(product2);
        petStoreSet1.add(product3);
        expect(petStoreSet1.size()).toEqual(3);
        expect(petStoreSet1.isEmpty()).toEqual(false);
        petStoreSet1.remove(product2);
        expect(petStoreSet1.size()).toEqual(2);
        expect(petStoreSet1.isEmpty()).toEqual(false);
    });
    it("Test contains", function () {
        var petStoreSet1 = new LinkedHashSet_1.LinkedHashSet();
        expect(petStoreSet1.size()).toEqual(0);
        expect(petStoreSet1.isEmpty()).toEqual(true);
        expect(true).toEqual(petStoreSet1.add(product1));
        expect(petStoreSet1.contains(product1)).toEqual(true);
        expect(petStoreSet1.contains(product2)).toEqual(false);
    });
});
