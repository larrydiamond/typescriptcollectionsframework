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
var Collections_1 = require("../src/Collections");
var HashMap_1 = require("../src/HashMap");
var LinkedHashMap_1 = require("../src/LinkedHashMap");
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
describe("Test Map functionality", function () {
    it("Test empty maps", function () {
        testEmptyStringStringMap(new HashMap_1.HashMap());
        testEmptyStringStringMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringStringMap(Collections_1.Collections.emptyMap());
        testEmptyStringNumberMap(new HashMap_1.HashMap());
        testEmptyStringNumberMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringNumberMap(Collections_1.Collections.emptyMap());
        testEmptyPetStoreProductAndValueClassMap(new HashMap_1.HashMap());
        testEmptyPetStoreProductAndValueClassMap(new HashMap_1.HashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassMap(Collections_1.Collections.emptyMap());
        testEmptyStringStringMap(new LinkedHashMap_1.LinkedHashMap());
        testEmptyStringStringMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringNumberMap(new LinkedHashMap_1.LinkedHashMap());
        testEmptyStringNumberMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap());
        testEmptyPetStoreProductAndValueClassMap(new LinkedHashMap_1.LinkedHashMap(new AllFieldHashable_1.AllFieldHashable()));
    });
});
function testEmptyStringStringMap(map) {
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
