"use strict";
/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var jasts_1 = require("jasts");
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var Collections_1 = require("../src/Collections");
var HashMap_1 = require("../src/HashMap");
var LinkedHashMap_1 = require("../src/LinkedHashMap");
var SkipList_1 = require("../src/SkipList");
var TreeMap_1 = require("../src/TreeMap");
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
// Wanted to show a class in the value object but anything would work fine
var ValueClass = /** @class */ (function () {
    function ValueClass() {
    }
    return ValueClass;
}());
describe("Test Map functionality", function () {
    it("Test empty maps", function () {
        testEmptyStringStringMap(Collections_1.Collections.emptyMap());
        testEmptyStringNumberMap(Collections_1.Collections.emptyMap());
        testEmptyPetStoreProductAndValueClassMap(Collections_1.Collections.emptyMap());
        testEmptyStringStringMap(new HashMap_1.HashMap());
        testEmptyStringStringMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringNumberMap(new HashMap_1.HashMap());
        testEmptyStringNumberMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassMap(new HashMap_1.HashMap());
        testEmptyPetStoreProductAndValueClassMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringStringMap(new LinkedHashMap_1.LinkedHashMap());
        testEmptyStringStringMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringNumberMap(new LinkedHashMap_1.LinkedHashMap());
        testEmptyStringNumberMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap());
        testEmptyPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringStringMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testEmptyStringNumberMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassMap(new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct));
        testEmptyStringStringMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testEmptyStringNumberMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testEmptyPetStoreProductAndValueClassMap(new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct));
    });
    it("Test adding to empty maps", function () {
        testAddingOneEntryStringStringMap(new HashMap_1.HashMap(), "HashMap default");
        testAddingOneEntryStringStringMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()), "HashMap AllFieldHashable");
        testAddingOneEntryStringNumberMap(new HashMap_1.HashMap());
        testAddingOneEntryStringNumberMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassMap(new HashMap_1.HashMap());
        testAddingOneEntryPetStoreProductAndValueClassMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryStringStringMap(new LinkedHashMap_1.LinkedHashMap(), "LinkedHashMap default");
        testAddingOneEntryStringStringMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()), "LinkedHashMap AllFieldHashable");
        testAddingOneEntryStringNumberMap(new LinkedHashMap_1.LinkedHashMap());
        testAddingOneEntryStringNumberMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap());
        testAddingOneEntryPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingOneEntryStringStringMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()), "TreeMap");
        testAddingOneEntryStringNumberMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassMap(new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct));
        testAddingOneEntryStringStringMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()), "SkipListMap");
        testAddingOneEntryStringNumberMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testAddingOneEntryPetStoreProductAndValueClassMap(new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct));
    });
    it("Test adding two items to empty maps", function () {
        testAddingTwoEntriesStringStringMap(new HashMap_1.HashMap());
        testAddingTwoEntriesStringStringMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringNumberMap(new HashMap_1.HashMap());
        testAddingTwoEntriesStringNumberMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesPetStoreProductAndValueClassMap(new HashMap_1.HashMap());
        testAddingTwoEntriesPetStoreProductAndValueClassMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringStringMap(new LinkedHashMap_1.LinkedHashMap());
        testAddingTwoEntriesStringStringMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringNumberMap(new LinkedHashMap_1.LinkedHashMap());
        testAddingTwoEntriesStringNumberMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap());
        testAddingTwoEntriesPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testAddingTwoEntriesStringStringMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesStringNumberMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassMap(new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct));
        testAddingTwoEntriesStringStringMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesStringNumberMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testAddingTwoEntriesPetStoreProductAndValueClassMap(new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct));
    });
    it("Test clearing maps", function () {
        testClearingStringStringMap(new HashMap_1.HashMap());
        testClearingStringStringMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringNumberMap(new HashMap_1.HashMap());
        testClearingStringNumberMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testClearingPetStoreProductAndValueClassMap(new HashMap_1.HashMap());
        testClearingPetStoreProductAndValueClassMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringStringMap(new LinkedHashMap_1.LinkedHashMap());
        testClearingStringStringMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringNumberMap(new LinkedHashMap_1.LinkedHashMap());
        testClearingStringNumberMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testClearingPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap());
        testClearingPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testClearingStringStringMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testClearingStringNumberMap(new TreeMap_1.TreeMap(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassMap(new TreeMap_1.TreeMap(alphabeticalSortPetStoreProduct));
        testClearingStringStringMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testClearingStringNumberMap(new SkipList_1.SkipListMap(Collections_1.Collections.getStringComparator()));
        testClearingPetStoreProductAndValueClassMap(new SkipList_1.SkipListMap(alphabeticalSortPetStoreProduct));
    });
});
function testEmptyStringStringMap(map) {
    jasts_1.TestNumber.equals("Testing empty string string map size", map.size(), 0);
    jasts_1.TestBoolean.true("Testing empty string string map isEmpty", map.isEmpty());
    expect(map.isEmpty()).toEqual(true);
    expect(map.size()).toEqual(0);
}
function testEmptyStringNumberMap(map) {
    expect(map.isEmpty()).toEqual(true);
    expect(map.size()).toEqual(0);
}
function testEmptyPetStoreProductAndValueClassMap(map) {
    expect(map.isEmpty()).toEqual(true);
    expect(map.size()).toEqual(0);
}
function testAddingOneEntryStringStringMap(map, typestring) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put("testkey", "testvalue"));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect("testvalue").toEqual(map.get("testkey"));
    jasts_1.TestString.undefined("Getting key not in map will return undefined " + typestring, map.get("key not found"));
    expect(undefined).toEqual(map.get("key not found"));
}
function testAddingOneEntryStringNumberMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put("testkey", 1));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(1).toEqual(map.get("testkey"));
    expect(undefined).toEqual(map.get("key not found"));
}
function testAddingOneEntryPetStoreProductAndValueClassMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put(product1, new ValueClass()));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
}
function testAddingTwoEntriesStringStringMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put("testkey", "testvalue"));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.put("secondkey", "secondvalue"));
    expect(map.size()).toEqual(2);
    expect(map.isEmpty()).toEqual(false);
    expect("testvalue").toEqual(map.get("testkey"));
    expect(undefined).toEqual(map.get("key not found"));
}
function testAddingTwoEntriesStringNumberMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put("testkey", 1));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.put("secondkey", 1));
    expect(map.size()).toEqual(2);
    expect(map.isEmpty()).toEqual(false);
    expect(1).toEqual(map.get("secondkey"));
    expect(undefined).toEqual(map.get("key not found"));
}
function testAddingTwoEntriesPetStoreProductAndValueClassMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put(product1, new ValueClass()));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.put(product2, new ValueClass()));
    expect(map.size()).toEqual(2);
    expect(map.isEmpty()).toEqual(false);
}
function testClearingStringStringMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put("testkey", "testvalue"));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.put("secondkey", "secondvalue"));
    expect(map.size()).toEqual(2);
    expect(map.isEmpty()).toEqual(false);
    expect("testvalue").toEqual(map.get("testkey"));
    expect(undefined).toEqual(map.get("key not found"));
    expect(undefined).toEqual(map.clear());
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.get("testkey"));
    expect(undefined).toEqual(map.get("key not found"));
}
function testClearingStringNumberMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put("testkey", 1));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.put("secondkey", 1));
    expect(map.size()).toEqual(2);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.clear());
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
function testClearingPetStoreProductAndValueClassMap(map) {
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
    expect(undefined).toEqual(map.put(product1, new ValueClass()));
    expect(map.size()).toEqual(1);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.put(product2, new ValueClass()));
    expect(map.size()).toEqual(2);
    expect(map.isEmpty()).toEqual(false);
    expect(undefined).toEqual(map.clear());
    expect(map.size()).toEqual(0);
    expect(map.isEmpty()).toEqual(true);
}
