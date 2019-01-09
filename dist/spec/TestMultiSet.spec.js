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
var jasts_1 = require("jasts");
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
var petStorePriceHashable = Collections_1.Collections.dynamicHashable("price"); // only check price for equality
var product2 = new PetStoreProduct("ChewToy", 14.99);
var product1 = new PetStoreProduct("Catnip", 4.99);
var product3 = new PetStoreProduct("Goldfish", 9.99);
var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
var productDuplicate1 = new PetStoreProduct("Catnip", 5.99);
var productDuplicate2 = new PetStoreProduct("Catnip", 6.99);
var productDuplicate3 = new PetStoreProduct("Catnip", 7.99);
var priceDuplicate1 = new PetStoreProduct("Leash", 14.99);
var priceDuplicate2 = new PetStoreProduct("UnderwaterCastle", 14.99);
var priceDuplicate3 = new PetStoreProduct("ScubaDiver", 14.99);
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
    it("Test clearing string MultiSet", function () {
        testClearingString(new HashClasses_1.HashMultiSet());
        testClearingString(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test clearing number MultiSet", function () {
        testClearingNumber(new HashClasses_1.HashMultiSet());
        testClearingNumber(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test clearing class MultiSet", function () {
        testClearingPetStoreProduct(new HashClasses_1.HashMultiSet(petStoreProductHashable));
    });
    it("Test count string MultiSet", function () {
        testCountString(new HashClasses_1.HashMultiSet());
        testCountString(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test count number MultiSet", function () {
        testCountNumber(new HashClasses_1.HashMultiSet());
        testCountNumber(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test count class MultiSet all field hashable", function () {
        var tmp = new HashClasses_1.HashMultiSet();
        addPetStoreProducts(tmp);
        expect(tmp.count(productNotAvailable)).toEqual(0);
        expect(tmp.count(product1)).toEqual(1);
    });
    it("Test count class MultiSet string hashable", function () {
        var tmp = new HashClasses_1.HashMultiSet(petStoreProductHashable);
        addPetStoreProducts(tmp);
        expect(tmp.count(productNotAvailable)).toEqual(0);
        expect(tmp.count(product1)).toEqual(4);
    });
    it("Test count class MultiSet number hashable", function () {
        var tmp = new HashClasses_1.HashMultiSet(petStorePriceHashable);
        addPetStoreProducts(tmp);
        expect(tmp.count(productNotAvailable)).toEqual(0);
        expect(tmp.count(product2)).toEqual(4);
    });
    it("Test remove string", function () {
        testRemoveString(new HashClasses_1.HashMultiSet());
        testRemoveString(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test remove number", function () {
        testRemoveNumber(new HashClasses_1.HashMultiSet());
        testRemoveNumber(new HashClasses_1.HashMultiSet(new AllFieldHashable_1.AllFieldHashable()));
    });
    it("Test remove number", function () {
        testRemovePetStoreProductAndValueClass(new HashClasses_1.HashMultiSet(petStoreProductHashable));
    });
});
function testEmptyStringMultiSet(tmp) {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
    jasts_1.TestString.equals("Empty array should stringify to []", JSON.stringify(tmp), "[]");
}
function testEmptyNumberMultiSet(tmp) {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
    jasts_1.TestString.equals("Empty array should stringify to []", JSON.stringify(tmp), "[]");
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
    jasts_1.TestString.equals("One element array should stringify to [blah]", JSON.stringify(tmp), "[\"testkey\"]");
}
function testAddingOneEntryNumber(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(100));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(100));
    expect(false).toEqual(tmp.contains(200));
    jasts_1.TestString.equals("One element array should stringify to [100]", JSON.stringify(tmp), "[100]");
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
function testClearingString(tmp) {
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
    expect(true).toEqual(tmp.add("secondkey"));
    expect(tmp.size()).toEqual(3);
    expect(tmp.isEmpty()).toEqual(false);
    expect(undefined).toEqual(tmp.clear());
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(false).toEqual(tmp.contains("testkey"));
    expect(false).toEqual(tmp.contains("key not found"));
    expect(false).toEqual(tmp.contains("secondkey"));
}
function testClearingNumber(tmp) {
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
    expect(true).toEqual(tmp.add(2000));
    expect(tmp.size()).toEqual(3);
    expect(tmp.isEmpty()).toEqual(false);
    expect(undefined).toEqual(tmp.clear());
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(false).toEqual(tmp.contains(1000));
    expect(false).toEqual(tmp.contains(2000));
    expect(false).toEqual(tmp.contains(3000));
}
function testClearingPetStoreProduct(tmp) {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(false).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(2);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.add(product2));
    expect(tmp.size()).toEqual(3);
    expect(tmp.isEmpty()).toEqual(false);
    expect(undefined).toEqual(tmp.clear());
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(false).toEqual(tmp.contains(product1));
    expect(false).toEqual(tmp.contains(product2));
    expect(false).toEqual(tmp.contains(productNotAvailable));
}
function testCountString(tmp) {
    addStrings(tmp);
    expect(tmp.size()).toEqual(15);
    expect(tmp.count("zero")).toEqual(0);
    expect(tmp.count("one")).toEqual(1);
    expect(tmp.count("two")).toEqual(2);
    expect(tmp.count("three")).toEqual(3);
    expect(tmp.count("four")).toEqual(4);
    expect(tmp.count("five")).toEqual(5);
    expect(tmp.count("six")).toEqual(0);
}
function testCountNumber(tmp) {
    addNumbers(tmp);
    expect(tmp.size()).toEqual(15);
    expect(tmp.count(1)).toEqual(0);
    expect(tmp.count(100)).toEqual(1);
    expect(tmp.count(200)).toEqual(2);
    expect(tmp.count(300)).toEqual(3);
    expect(tmp.count(400)).toEqual(4);
    expect(tmp.count(500)).toEqual(5);
    expect(tmp.count(600)).toEqual(0);
}
function addStrings(tmp) {
    expect(true).toEqual(tmp.add("one"));
    expect(true).toEqual(tmp.add("two"));
    expect(false).toEqual(tmp.add("two"));
    expect(true).toEqual(tmp.add("three"));
    expect(false).toEqual(tmp.add("three"));
    expect(false).toEqual(tmp.add("three"));
    expect(true).toEqual(tmp.add("four"));
    expect(false).toEqual(tmp.add("four"));
    expect(false).toEqual(tmp.add("four"));
    expect(false).toEqual(tmp.add("four"));
    expect(true).toEqual(tmp.add("five"));
    expect(false).toEqual(tmp.add("five"));
    expect(false).toEqual(tmp.add("five"));
    expect(false).toEqual(tmp.add("five"));
    expect(false).toEqual(tmp.add("five"));
}
function addNumbers(tmp) {
    expect(true).toEqual(tmp.add(100));
    expect(true).toEqual(tmp.add(200));
    expect(false).toEqual(tmp.add(200));
    expect(true).toEqual(tmp.add(300));
    expect(false).toEqual(tmp.add(300));
    expect(false).toEqual(tmp.add(300));
    expect(true).toEqual(tmp.add(400));
    expect(false).toEqual(tmp.add(400));
    expect(false).toEqual(tmp.add(400));
    expect(false).toEqual(tmp.add(400));
    expect(true).toEqual(tmp.add(500));
    expect(false).toEqual(tmp.add(500));
    expect(false).toEqual(tmp.add(500));
    expect(false).toEqual(tmp.add(500));
    expect(false).toEqual(tmp.add(500));
}
function addPetStoreProducts(tmp) {
    tmp.add(product1);
    tmp.add(product2);
    tmp.add(product3);
    tmp.add(productDuplicate1);
    tmp.add(productDuplicate2);
    tmp.add(productDuplicate3);
    tmp.add(priceDuplicate1);
    tmp.add(priceDuplicate2);
    tmp.add(priceDuplicate3);
}
function testRemoveString(mset) {
    expect(mset.contains("testkey")).toEqual(false);
    expect(mset.size()).toEqual(0);
    expect(mset.isEmpty()).toEqual(true);
    expect(true).toEqual(mset.add("testkey"));
    expect(mset.size()).toEqual(1);
    expect(mset.isEmpty()).toEqual(false);
    expect(mset.contains("testkey")).toEqual(true);
    expect(mset.contains("NoSuchString")).toEqual(false);
    expect(false).toEqual(mset.remove("NoSuchString"));
    expect(mset.contains("NoSuchString")).toEqual(false);
    expect(mset.contains("testkey")).toEqual(true);
    expect(mset.size()).toEqual(1);
    expect(mset.isEmpty()).toEqual(false);
    expect(true).toEqual(mset.remove("testkey"));
    expect(mset.size()).toEqual(0);
    expect(mset.isEmpty()).toEqual(true);
    expect(mset.contains("testkey")).toEqual(false);
    expect(true).toEqual(mset.add("repeatingkey"));
    expect(mset.size()).toEqual(1);
    expect(false).toEqual(mset.add("repeatingkey"));
    expect(mset.size()).toEqual(2);
    expect(true).toEqual(mset.remove("repeatingkey"));
    expect(mset.size()).toEqual(1);
    expect(mset.contains("repeatingkey")).toEqual(true);
    expect(true).toEqual(mset.remove("repeatingkey"));
    expect(mset.size()).toEqual(0);
    expect(mset.contains("repeatingkey")).toEqual(false);
}
function testRemoveNumber(mset) {
    expect(mset.contains(1000)).toEqual(false);
    expect(mset.size()).toEqual(0);
    expect(mset.isEmpty()).toEqual(true);
    expect(true).toEqual(mset.add(1000));
    expect(mset.size()).toEqual(1);
    expect(mset.isEmpty()).toEqual(false);
    expect(mset.contains(1000)).toEqual(true);
    expect(mset.contains(2000)).toEqual(false);
    expect(false).toEqual(mset.remove(2000));
    expect(mset.contains(2000)).toEqual(false);
    expect(mset.contains(1000)).toEqual(true);
    expect(mset.size()).toEqual(1);
    expect(mset.isEmpty()).toEqual(false);
    expect(true).toEqual(mset.remove(1000));
    expect(mset.size()).toEqual(0);
    expect(mset.isEmpty()).toEqual(true);
    expect(mset.contains(1000)).toEqual(false);
    expect(true).toEqual(mset.add(5000));
    expect(mset.size()).toEqual(1);
    expect(false).toEqual(mset.add(5000));
    expect(mset.size()).toEqual(2);
    expect(true).toEqual(mset.remove(5000));
    expect(mset.size()).toEqual(1);
    expect(mset.contains(5000)).toEqual(true);
    expect(true).toEqual(mset.remove(5000));
    expect(mset.size()).toEqual(0);
    expect(mset.contains(5000)).toEqual(false);
}
function testRemovePetStoreProductAndValueClass(mset) {
    expect(mset.contains(product1)).toEqual(false);
    expect(mset.size()).toEqual(0);
    expect(mset.isEmpty()).toEqual(true);
    expect(true).toEqual(mset.add(product1));
    expect(mset.size()).toEqual(1);
    expect(mset.isEmpty()).toEqual(false);
    expect(mset.contains(product1)).toEqual(true);
    expect(false).toEqual(mset.remove(product2));
    expect(mset.size()).toEqual(1);
    expect(mset.isEmpty()).toEqual(false);
    expect(mset.contains(product1)).toEqual(true);
    expect(true).toEqual(mset.remove(product1));
    expect(mset.contains(product1)).toEqual(false);
    expect(mset.size()).toEqual(0);
    expect(mset.isEmpty()).toEqual(true);
}
