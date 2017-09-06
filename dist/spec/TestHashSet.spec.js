"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("../src/ArrayList");
var CollectionUtils_1 = require("../src/CollectionUtils");
var CollectionUtils_2 = require("../src/CollectionUtils");
var HashSet_1 = require("../src/HashSet");
var LinkedList_1 = require("../src/LinkedList");
var TreeSet_1 = require("../src/TreeSet");
describe("Test HashSet functionality", function () {
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
        return PetStoreProduct;
    }());
    ;
    var product1 = new PetStoreProduct("ChewToy", 14.99);
    var product2 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    it("Test Creation state", function () {
        var set1 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(set1.size()).toEqual(0);
        expect(set1.isEmpty()).toEqual(true);
    });
    it("Test Adding one item", function () {
        var set1 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(set1.size()).toEqual(0);
        expect(set1.isEmpty()).toEqual(true);
        expect(set1.add(product1)).toEqual(true);
        expect(1).toEqual(set1.size());
        expect(false).toEqual(set1.isEmpty());
    });
    it("Test adding two entries", function () {
        var mySet1 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        //    mySet1.printMap();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        //    mySet1.printMap();
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.add(product2));
        //    mySet1.printMap();
        expect(mySet1.size()).toEqual(2);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test adding duplicates", function () {
        var mySet1 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(false).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
    });
    it("Test contains", function () {
        var mySet1 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.contains(product1));
        expect(false).toEqual(mySet1.contains(product2));
    });
    it("Test clear", function () {
        var mySet1 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.contains(product1));
        expect(false).toEqual(mySet1.contains(product2));
        mySet1.clear();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(false).toEqual(mySet1.contains(product1));
        expect(false).toEqual(mySet1.contains(product2));
    });
    it("Test java iteration", function () {
        var set2 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(set2.add(product1)).toEqual(true);
        expect(set2.add(product2)).toEqual(true);
        var found1 = false;
        var found2 = false;
        for (var iter = set2.iterator(); iter.hasNext();) {
            var psp = iter.next();
            if (psp.getProductName() === product1.getProductName()) {
                found1 = true;
            }
            else {
                if (psp.getProductName() === product2.getProductName()) {
                    found2 = true;
                }
                else {
                    fail("Found something that wasnt product1 or product2");
                }
            }
        }
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test typescript iteration", function () {
        var set2 = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        expect(set2.add(product1)).toEqual(true);
        expect(set2.add(product2)).toEqual(true);
        var found1 = false;
        var found2 = false;
        var tsi = set2[Symbol.iterator]();
        var tmp = tsi.next();
        expect(tmp.done).toEqual(false);
        if (tmp.value.getProductName() === product1.getProductName()) {
            found1 = true;
        }
        else {
            if (tmp.value.getProductName() === product2.getProductName()) {
                found2 = true;
            }
            else {
                fail("Found something that wasnt product1 or product2");
            }
        }
        tmp = tsi.next();
        expect(tmp.done).toEqual(false);
        if (tmp.value.getProductName() === product1.getProductName()) {
            found1 = true;
        }
        else {
            if (tmp.value.getProductName() === product2.getProductName()) {
                found2 = true;
            }
            else {
                fail("Found something that wasnt product1 or product2");
            }
        }
        tmp = tsi.next();
        expect(tmp.done).toEqual(true);
        expect(found1).toEqual(true);
        expect(found2).toEqual(true);
    });
    it("Test native strings", function () {
        var hset = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        hset.add("Cat");
        hset.add("Dog");
        hset.add("Squirrel");
        expect(hset.size()).toEqual(3);
        expect(hset.isEmpty()).toEqual(false);
        var foundcat = false;
        var founddog = false;
        var foundsquirrel = false;
        var count = 0;
        for (var iter = hset.iterator(); iter.hasNext();) {
            count = count + 1;
            var psp = iter.next();
            if (psp === "Cat") {
                foundcat = true;
            }
            else {
                if (psp === "Dog") {
                    founddog = true;
                }
                else {
                    if (psp === "Squirrel") {
                        foundsquirrel = true;
                    }
                    else {
                        fail("Found something that wasnt added");
                    }
                }
            }
        }
        expect(count).toEqual(3);
        expect(foundcat).toEqual(true);
        expect(founddog).toEqual(true);
        expect(foundsquirrel).toEqual(true);
    });
    it("Test lots", function () {
        var hset = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable());
        for (var loop1 = 1; loop1 <= 26; loop1++) {
            for (var loop2 = 1; loop2 <= 26; loop2++) {
                for (var loop3 = 1; loop3 <= 26; loop3++) {
                    var txt = String.fromCharCode(96 + loop1) + String.fromCharCode(96 + loop2) + String.fromCharCode(96 + loop3);
                    hset.add(txt);
                }
            }
        }
        expect(hset.size()).toEqual(26 * 26 * 26);
        var count = 0;
        for (var iter = hset.iterator(); iter.hasNext();) {
            count = count + 1;
            var psp = iter.next();
        }
        expect(count).toEqual(26 * 26 * 26);
    });
    it("Test constructing with elements from an ArrayList", function () {
        var sourceList = new ArrayList_1.ArrayList(new CollectionUtils_1.GenericCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var tset = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable(), sourceList);
        expect(tset.size()).toEqual(sourceList.size());
    });
    it("Test constructing with elements from a LinkedList", function () {
        var sourceList = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var tset = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable(), sourceList);
        expect(tset.size()).toEqual(sourceList.size());
    });
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
    it("Test constructing with elements from a TreeSet", function () {
        var source = new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct);
        expect(source.add(product1)).toEqual(false);
        expect(source.add(product2)).toEqual(false);
        var tset = new HashSet_1.HashSet(new CollectionUtils_2.GenericHashable(), source);
        expect(tset.size()).toEqual(source.size());
    });
});
