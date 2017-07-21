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
describe("Test ArrayList functionality", function () {
    // PetStoreProduct will be used in testing the ArrayList class
    var PetStoreProduct = (function () {
        function PetStoreProduct(iName, iPrice) {
            this.productName = iName;
            this.price = iPrice;
        }
        PetStoreProduct.prototype.equals = function (t) {
            if (JSON.stringify(this) === JSON.stringify(t))
                return true;
            return false;
        };
        ;
        return PetStoreProduct;
    }());
    ;
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    it("Test Creation state", function () {
        var list = new ArrayList_1.ArrayList();
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        var collection = list;
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
    });
    it("Test Adding some items", function () {
        var arraylist = new ArrayList_1.ArrayList();
        var list = arraylist;
        var collection = list;
        arraylist.add(product1);
        arraylist.add(product2);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
    });
    it("Test clearing the ArrayList", function () {
        var arraylist = new ArrayList_1.ArrayList();
        var list = arraylist;
        var collection = list;
        arraylist.add(product1);
        arraylist.add(product2);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        arraylist.clear();
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
        arraylist.add(product1);
        arraylist.add(product2);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        list.clear();
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
        arraylist.add(product1);
        arraylist.add(product2);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        collection.clear();
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
    });
    it("Test get", function () {
        var arraylist = new ArrayList_1.ArrayList();
        arraylist.add(product1);
        arraylist.add(product2);
        var index0 = arraylist.get(0);
        var index1 = arraylist.get(1);
        expect(product1.equals(index0)).toEqual(true);
        expect(product1.equals(index1)).toEqual(false);
        expect(product2.equals(index0)).toEqual(false);
        expect(product2.equals(index1)).toEqual(true);
    });
    it("Test indexof", function () {
        var arraylist = new ArrayList_1.ArrayList();
        arraylist.add(product1);
        arraylist.add(product2);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(1);
        expect(arraylist.indexOf(product3)).toEqual(-1);
    });
    it("Test set", function () {
        var arraylist = new ArrayList_1.ArrayList();
        arraylist.add(product1);
        arraylist.add(product2);
        arraylist.set(1, product3);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(-1);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test java iteration", function () {
        var arraylist = new ArrayList_1.ArrayList();
        arraylist.add(product1);
        arraylist.add(product2);
        var offset = 0;
        for (var iter = arraylist.iterator(); iter.hasNext();) {
            var psp = iter.next();
            if (offset === 0)
                expect(psp.productName).toEqual(product1.productName);
            if (offset === 1)
                expect(psp.productName).toEqual(product2.productName);
            if (offset > 1)
                fail();
            offset++;
        }
    });
    /*
      it("Easy iteration", function () {
        let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    
        arraylist.add (product1);
        arraylist.add (product2);
    
        let offset:number = 0;
    
        arraylist.for (thisElement => {
          if (offset === 0)
            expect (thisElement.productName).toEqual (product1.productName);
          if (offset === 1)
            expect (thisElement.productName).toEqual (product2.productName);
          if (offset > 1)
            fail();
    
            offset++;
        });
      });
    */
});
