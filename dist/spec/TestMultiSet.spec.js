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
var petStoreProductHashable = Collections_1.Collections.dynamicHashable("productName"); // only check product name for equality
var product2 = new PetStoreProduct("ChewToy", 14.99);
var product1 = new PetStoreProduct("Catnip", 4.99);
var product3 = new PetStoreProduct("Goldfish", 9.99);
var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
var productDuplicate1 = new PetStoreProduct("Catnip", 5.99);
var productDuplicate2 = new PetStoreProduct("Catnip", 6.99);
var productDuplicate3 = new PetStoreProduct("Catnip", 7.99);
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
    it("Test adding one item to empty string MultiSet", function () {
        testAddingOneEntryString(new HashClasses_1.HashMultiSet());
        testAddingOneEntryString(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding one item to empty number MultiSet", function () {
        testAddingOneEntryNumber(new HashClasses_1.HashMultiSet());
        testAddingOneEntryNumber(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding one item to empty class MultiSet", function () {
        testAddingOneEntryPetStoreProduct(new HashClasses_1.HashMultiSet());
        testAddingOneEntryPetStoreProduct(new HashClasses_1.HashMultiSet(petStoreProductHashable));
        testAddingOneEntryPetStoreProduct(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding two unrelated items to empty string MultiSet", function () {
        testAddingTwoUnrelatedEntriesString(new HashClasses_1.HashMultiSet());
        testAddingTwoUnrelatedEntriesString(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding two unrelated items to empty number MultiSet", function () {
        testAddingTwoUnrelatedEntriesNumber(new HashClasses_1.HashMultiSet());
        testAddingTwoUnrelatedEntriesNumber(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding two unrelated items to empty class MultiSet", function () {
        testAddingTwoUnrelatedEntriesPetStoreProduct(new HashClasses_1.HashMultiSet(petStoreProductHashable));
    });
    it("Test adding two related items to empty string MultiSet", function () {
        testAddingTwoRelatedEntriesString(new HashClasses_1.HashMultiSet());
        testAddingTwoRelatedEntriesString(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding two related items to empty number MultiSet", function () {
        testAddingTwoRelatedEntriesNumber(new HashClasses_1.HashMultiSet());
        testAddingTwoRelatedEntriesNumber(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test adding two related items to empty class MultiSet", function () {
        testAddingTwoRelatedEntriesPetStoreProduct(new HashClasses_1.HashMultiSet(petStoreProductHashable));
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
function testAddingOneEntryString(tmp) {
    expect(tmp.size()).toEqual(0, 'expected starting size to be zero');
    expect(tmp.isEmpty()).toEqual(true, 'expected starting isempty to be false');
    expect(true).toEqual(tmp.add("testkey"), 'adding first key to empty multiset');
    expect(tmp.size()).toEqual(1, 'expected size to be one after adding');
    expect(tmp.isEmpty()).toEqual(false, 'expected isempty to be false after adding');
    expect(true).toEqual(tmp.contains("testkey"), 'expected contains to be true looking for existing string');
    expect(false).toEqual(tmp.contains("key not found"), 'expected not present element not be be contained');
}
function testAddingOneEntryNumber(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(100));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(100));
    expect(false).toEqual(tmp.contains(200));
}
function testAddingOneEntryPetStoreProduct(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(product1));
    expect(false).toEqual(tmp.contains(productNotAvailable));
}
function testAddingTwoUnrelatedEntriesString(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add("testkey"));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.add("secondkey"));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains("testkey"));
    expect(false).toEqual(tmp.contains("key not found"));
}
function testAddingTwoUnrelatedEntriesNumber(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(1000));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.add(2000));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(1000));
    expect(false).toEqual(tmp.contains(3000));
}
function testAddingTwoUnrelatedEntriesPetStoreProduct(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.add(product2));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
}
function testAddingTwoRelatedEntriesString(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add("testkey"));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(false).toEqual(tmp.add("testkey"));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains("testkey"));
    expect(false).toEqual(tmp.contains("key not found"));
}
function testAddingTwoRelatedEntriesNumber(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(1000));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(false).toEqual(tmp.add(1000));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(1000));
    expect(false).toEqual(tmp.contains(3000));
}
function testAddingTwoRelatedEntriesPetStoreProduct(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(false).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
}
