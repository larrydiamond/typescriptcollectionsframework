"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var Collections_1 = require("../src/Collections");
var HashClasses_1 = require("../src/HashClasses");
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
describe("Test generic MultiSet functionality", function () {
    it("Test empty MultiSets", function () {
        testEmptyStringMultiSet(Collections_1.Collections.emptyMultiSet());
        testEmptyPetStoreProductAndValueClassMultiSet(Collections_1.Collections.emptyMultiSet());
        testEmptyStringMultiSet(new HashClasses_1.HashMultiSet());
        testEmptyStringMultiSet(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyNumberMultiSet(Collections_1.Collections.emptyMultiSet());
        testEmptyPetStoreProductAndValueClassMultiSet(Collections_1.Collections.emptyMultiSet());
        testEmptyNumberMultiSet(new HashClasses_1.HashMultiSet());
        testEmptyNumberMultiSet(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassMultiSet(new HashClasses_1.HashMultiSet());
        testEmptyPetStoreProductAndValueClassMultiSet(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding one item to empty MultiSet", function () {
        testAddingOneEntryStringSet(new HashClasses_1.HashMultiSet());
        testAddingOneEntryStringSet(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryNumberSet(new HashClasses_1.HashMultiSet());
        testAddingOneEntryNumberSet(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new HashClasses_1.HashMultiSet());
        testAddingOneEntryPetStoreProductAndValueClassSet(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
});
function testEmptyStringMultiSet(tmp) {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
}
function testEmptyNumberMultiSet(tmp) {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
}
function testEmptyPetStoreProductAndValueClassMultiSet(tmp) {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
}
function testAddingOneEntryStringSet(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add("testkey"));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains("testkey"));
    expect(false).toEqual(tmp.contains("key not found"));
}
function testAddingOneEntryNumberSet(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(100));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(100));
    expect(false).toEqual(tmp.contains(200));
}
function testAddingOneEntryPetStoreProductAndValueClassSet(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
}
