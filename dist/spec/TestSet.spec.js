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
var HashSet_1 = require("../src/HashSet");
var LinkedHashSet_1 = require("../src/LinkedHashSet");
var NavigableHash_1 = require("../src/NavigableHash");
var SkipList_1 = require("../src/SkipList");
var TreeSet_1 = require("../src/TreeSet");
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
var alphabeticalSortPetStoreProduct = {
    compare: function (o1, o2) {
        if (o1 === o2)
            return 0;
        if (o1 === undefined)
            return -1;
        if (o1 === null)
            return -1;
        if (o2 === undefined)
            return 1;
        if (o2 === null)
            return 1;
        if (o1.getProductName() === o2.getProductName())
            return 0;
        if (o1.getProductName() === undefined)
            return -1;
        if (o1.getProductName() === null)
            return -1;
        if (o2.getProductName() === undefined)
            return 1;
        if (o2.getProductName() === null)
            return 1;
        if (o1.getProductName() < o2.getProductName())
            return -1;
        return 1;
    }
};
var product2 = new PetStoreProduct("ChewToy", 14.99);
var product1 = new PetStoreProduct("Catnip", 4.99);
var product3 = new PetStoreProduct("Goldfish", 9.99);
var productNotAvailable = new PetStoreProduct("Bananas", 1.99);
describe("Test generic Set functionality", function () {
    it("Test empty Sets", function () {
        testEmptyStringStringSet(Collections_1.Collections.emptySet());
        testEmptyPetStoreProductAndValueClassSet(Collections_1.Collections.emptySet());
        testEmptyStringStringSet(new HashSet_1.HashSet());
        testEmptyStringStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testEmptyPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testEmptyPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testEmptyStringStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testEmptyStringStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test adding to empty Sets", function () {
        testAddingOneEntryStringStringSet(new HashSet_1.HashSet());
        testAddingOneEntryStringStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryStringStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testAddingOneEntryPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testAddingOneEntryPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryStringStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testAddingOneEntryStringStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testAddingOneEntryStringStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test adding two items to empty Sets", function () {
        testAddingTwoEntriesStringStringSet(new HashSet_1.HashSet());
        testAddingTwoEntriesStringStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testAddingTwoEntriesStringStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testAddingTwoEntriesStringStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test clearing Sets", function () {
        testClearingStringStringSet(new HashSet_1.HashSet());
        testClearingStringStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testClearingPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testClearingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testClearingStringStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testClearingStringStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test attempting to add a duplicate is ignored", function () {
        testDuplicatingStringStringSet(new HashSet_1.HashSet());
        testDuplicatingStringStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingStringStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testDuplicatingPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testDuplicatingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingStringStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testDuplicatingPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testDuplicatingStringStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testDuplicatingPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testDuplicatingStringStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testDuplicatingPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test remove", function () {
        testRemoveStringStringSet(new HashSet_1.HashSet());
        testRemoveStringStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemoveStringStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemovePetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testRemovePetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemovePetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testRemovePetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemoveStringStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testRemovePetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testRemoveStringStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testRemovePetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testRemoveStringStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testRemovePetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
});
function testEmptyStringStringSet(Set) {
    expect(Set.isEmpty()).toEqual(true);
    expect(Set.size()).toEqual(0);
}
function testEmptyPetStoreProductAndValueClassSet(Set) {
    expect(Set.isEmpty()).toEqual(true);
    expect(Set.size()).toEqual(0);
}
function testAddingOneEntryStringStringSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add("testkey"));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.contains("testkey"));
    expect(false).toEqual(Set.contains("key not found"));
}
function testAddingOneEntryPetStoreProductAndValueClassSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add(product1));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
}
function testAddingTwoEntriesStringStringSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add("testkey"));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.add("secondkey"));
    expect(Set.size()).toEqual(2);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.contains("testkey"));
    expect(false).toEqual(Set.contains("key not found"));
}
function testAddingTwoEntriesPetStoreProductAndValueClassSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add(product1));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.add(product2));
    expect(Set.size()).toEqual(2);
    expect(Set.isEmpty()).toEqual(false);
}
function testClearingStringStringSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add("testkey"));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.add("secondkey"));
    expect(Set.size()).toEqual(2);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.contains("testkey"));
    expect(false).toEqual(Set.contains("key not found"));
    expect(undefined).toEqual(Set.clear());
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(false).toEqual(Set.contains("testkey"));
    expect(false).toEqual(Set.contains("key not found"));
}
function testClearingPetStoreProductAndValueClassSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add(product1));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.add(product2));
    expect(Set.size()).toEqual(2);
    expect(Set.isEmpty()).toEqual(false);
    expect(undefined).toEqual(Set.clear());
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
}
function testDuplicatingStringStringSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add("testkey"));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(false).toEqual(Set.add("testkey"));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
}
function testDuplicatingPetStoreProductAndValueClassSet(Set) {
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add(product1));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(false).toEqual(Set.add(product1));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
}
function testRemoveStringStringSet(Set) {
    expect(Set.contains("testkey")).toEqual(false);
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add("testkey"));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(Set.contains("testkey")).toEqual(true);
    expect(false).toEqual(Set.remove("NoSuchString"));
    expect(Set.contains("testkey")).toEqual(true);
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(true).toEqual(Set.remove("testkey"));
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(Set.contains("testkey")).toEqual(false);
}
function testRemovePetStoreProductAndValueClassSet(Set) {
    expect(Set.contains(product1)).toEqual(false);
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
    expect(true).toEqual(Set.add(product1));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(Set.contains(product1)).toEqual(true);
    expect(false).toEqual(Set.remove(product2));
    expect(Set.size()).toEqual(1);
    expect(Set.isEmpty()).toEqual(false);
    expect(Set.contains(product1)).toEqual(true);
    expect(true).toEqual(Set.remove(product1));
    expect(Set.contains(product1)).toEqual(false);
    expect(Set.size()).toEqual(0);
    expect(Set.isEmpty()).toEqual(true);
}
