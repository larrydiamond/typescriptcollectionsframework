"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var HashSet_1 = require("../src/HashSet");
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
        PetStoreProduct.prototype.equals = function (t) {
            if (t instanceof PetStoreProduct) {
                if ((this.productName === t.getProductName()) && (this.price === t.getPrice()))
                    return true;
            }
            return false;
        };
        PetStoreProduct.prototype.hashCode = function () {
            if (this.price === undefined)
                return 1;
            if (this.price === null)
                return 1;
            var tmp = Math.abs(this.price);
            return Math.ceil(tmp);
        };
        return PetStoreProduct;
    }());
    ;
    var product1 = new PetStoreProduct("ChewToy", 14.99);
    var product2 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    it("Test Creation state", function () {
        var set1 = new HashSet_1.HashSet();
        expect(set1.size()).toEqual(0);
        expect(set1.isEmpty()).toEqual(true);
    });
    it("Test Adding one item", function () {
        var set1 = new HashSet_1.HashSet();
        expect(set1.size()).toEqual(0);
        expect(set1.isEmpty()).toEqual(true);
        expect(set1.add(product1)).toEqual(true);
        expect(1).toEqual(set1.size());
        expect(false).toEqual(set1.isEmpty());
    });
    it("Test adding two entries", function () {
        var mySet1 = new HashSet_1.HashSet();
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
        var mySet1 = new HashSet_1.HashSet();
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
        var mySet1 = new HashSet_1.HashSet();
        expect(mySet1.size()).toEqual(0);
        expect(mySet1.isEmpty()).toEqual(true);
        expect(true).toEqual(mySet1.add(product1));
        expect(mySet1.size()).toEqual(1);
        expect(mySet1.isEmpty()).toEqual(false);
        expect(true).toEqual(mySet1.contains(product1));
        expect(false).toEqual(mySet1.contains(product2));
    });
    it("Test clear", function () {
        var mySet1 = new HashSet_1.HashSet();
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
        var set2 = new HashSet_1.HashSet();
        expect(set2.add(product1)).toEqual(true);
        expect(set2.add(product2)).toEqual(true);
        var found1 = false;
        var found2 = false;
        for (var iter = set2.iterator(); iter.hasNext();) {
            var psp = iter.next();
            if (product1.equals(psp)) {
                found1 = true;
            }
            else {
                if (product2.equals(psp)) {
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
        var set2 = new HashSet_1.HashSet();
        expect(set2.add(product1)).toEqual(true);
        expect(set2.add(product2)).toEqual(true);
        var found1 = false;
        var found2 = false;
        var tsi = set2[Symbol.iterator]();
        var tmp = tsi.next();
        expect(tmp.done).toEqual(false);
        if (product1.equals(tmp.value)) {
            found1 = true;
        }
        else {
            if (product2.equals(tmp.value)) {
                found2 = true;
            }
            else {
                fail("Found something that wasnt product1 or product2");
            }
        }
        tmp = tsi.next();
        expect(tmp.done).toEqual(false);
        if (product1.equals(tmp.value)) {
            found1 = true;
        }
        else {
            if (product2.equals(tmp.value)) {
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
});
