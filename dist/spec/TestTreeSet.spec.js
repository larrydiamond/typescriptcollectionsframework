"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var CollectionUtils_1 = require("../src/CollectionUtils");
var TreeSet_1 = require("../src/TreeSet");
describe("Test TreeSet functionality", function () {
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
    var alphabeticalSortPetStoreProduct = {
        compare: function (o1, o2) {
            if (o1 === o2)
                return 0;
            if (o1 === null)
                return -1;
            if (o1 === undefined)
                return -1;
            if (o2 === null)
                return 1;
            if (o2 === undefined)
                return 1;
            if (o1.getProductName() === o2.getProductName())
                return 0;
            if (o1.getProductName() === null)
                return -1;
            if (o1.getProductName() === undefined)
                return -1;
            if (o2.getProductName() === null)
                return 1;
            if (o2.getProductName() === undefined)
                return 1;
            if (o1.getProductName() < o2.getProductName())
                return -1;
            return 1;
        }
    };
    var priceSortPetStoreProduct = {
        compare: function (o1, o2) {
            if (o1 === o2)
                return 0;
            if (o1 === null)
                return -1;
            if (o1 === undefined)
                return -1;
            if (o2 === null)
                return 1;
            if (o2 === undefined)
                return 1;
            if (o1.getPrice() === o2.getPrice())
                return 0;
            if (o1.getPrice() === null)
                return -1;
            if (o1.getPrice() === undefined)
                return -1;
            if (o2.getPrice() === null)
                return 1;
            if (o2.getPrice() === undefined)
                return 1;
            if (o1.getPrice() < o2.getPrice())
                return -1;
            return 1;
        }
    };
    it("Test Creation state", function () {
        var TreeSet1 = new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct);
        expect(TreeSet1.size()).toEqual(0);
        expect(TreeSet1.isEmpty()).toEqual(true);
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.isEmpty()).toEqual(true);
    });
    /*
    
      it("Test Adding one item", function() {
        let TreeSet1:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
        expect (TreeSet1.size ()).toEqual(0);
        expect (TreeSet1.isEmpty ()).toEqual(true);
        expect (TreeSet1.add (product1)).toEqual(true);
        expect (1).toEqual(TreeSet1.size ());
        expect (false).toEqual(TreeSet1.isEmpty ());
      });
    
      it("Test Adding one item basic datatypes", function() {
        let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
        expect (TreeSet2.size ()).toEqual(0);
        expect (TreeSet2.isEmpty ()).toEqual(true);
        expect (TreeSet2.add ("Hello")).toEqual(true);
        expect (1).toEqual(TreeSet2.size ());
        expect (false).toEqual(TreeSet2.isEmpty ());
      });
    */
});
