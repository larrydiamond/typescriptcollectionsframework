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
        testEmptyStringSet(Collections_1.Collections.emptySet());
        testEmptyPetStoreProductAndValueClassSet(Collections_1.Collections.emptySet());
        testEmptyStringSet(new HashSet_1.HashSet());
        testEmptyStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testEmptyPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testEmptyPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testEmptyStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testEmptyStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test adding to empty Sets", function () {
        testAddingOneEntryStringSet(new HashSet_1.HashSet());
        testAddingOneEntryStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testAddingOneEntryPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testAddingOneEntryPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testAddingOneEntryStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testAddingOneEntryStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test adding two items to empty Sets", function () {
        testAddingTwoEntriesStringSet(new HashSet_1.HashSet());
        testAddingTwoEntriesStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testAddingTwoEntriesStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testAddingTwoEntriesStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test clearing Sets", function () {
        testClearingStringSet(new HashSet_1.HashSet());
        testClearingStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testClearingPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testClearingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testClearingStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testClearingStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test attempting to add a duplicate is ignored", function () {
        testDuplicatingStringSet(new HashSet_1.HashSet());
        testDuplicatingStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingPetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testDuplicatingPetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testDuplicatingPetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testDuplicatingStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testDuplicatingPetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testDuplicatingStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testDuplicatingPetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testDuplicatingStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testDuplicatingPetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
    it("Test remove", function () {
        testRemoveStringSet(new HashSet_1.HashSet());
        testRemoveStringSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemoveStringSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemovePetStoreProductAndValueClassSet(new HashSet_1.HashSet());
        testRemovePetStoreProductAndValueClassSet(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemovePetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet());
        testRemovePetStoreProductAndValueClassSet(new LinkedHashSet_1.LinkedHashSet(new AllFieldHashable_1.AllFieldHashable()));
        testRemoveStringSet(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testRemovePetStoreProductAndValueClassSet(new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct));
        testRemoveStringSet(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testRemovePetStoreProductAndValueClassSet(new SkipList_1.SkipListSet(alphabeticalSortPetStoreProduct));
        testRemoveStringSet(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testRemovePetStoreProductAndValueClassSet(new NavigableHash_1.NavigableHashSet(alphabeticalSortPetStoreProduct));
    });
});
function testEmptyStringSet(Set) {
    expect(Set.isEmpty()).toEqual(true);
    expect(Set.size()).toEqual(0);
}
function testEmptyPetStoreProductAndValueClassSet(Set) {
    expect(Set.isEmpty()).toEqual(true);
    expect(Set.size()).toEqual(0);
}
function testAddingOneEntryStringSet(Set) {
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
function testAddingTwoEntriesStringSet(Set) {
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
function testClearingStringSet(Set) {
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
function testDuplicatingStringSet(Set) {
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
function testRemoveStringSet(Set) {
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
