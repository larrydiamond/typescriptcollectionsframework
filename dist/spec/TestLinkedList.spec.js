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
var LinkedList_1 = require("../src/LinkedList");
describe("Test LinkedList functionality", function () {
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
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var productNotAvailable = new PetStoreProduct("Bananas", 0.00); // we have no bananas today
    it("Test Creation state", function () {
        var list = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        var collection = list;
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
    });
    it("Test Adding some items", function () {
        var ll = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        var list = ll;
        var collection = list;
        expect(ll.contains(product3)).toEqual(false);
        expect(ll.add(product1)).toEqual(true);
        expect(ll.add(product2)).toEqual(true);
        expect(ll.contains(product2)).toEqual(true);
        expect(ll.contains(product3)).toEqual(false);
        expect(ll.isEmpty()).toEqual(false);
        expect(ll.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
    });
    it("Test clearing the LinkedList", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        var list = thelist;
        var collection = list;
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.isEmpty()).toEqual(false);
        expect(thelist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        thelist.clear(); // returns void, nothing to expect :(
        expect(thelist.isEmpty()).toEqual(true);
        expect(thelist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.isEmpty()).toEqual(false);
        expect(thelist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        list.clear(); // returns void, nothing to expect :(
        expect(thelist.isEmpty()).toEqual(true);
        expect(thelist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.isEmpty()).toEqual(false);
        expect(thelist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        collection.clear();
        expect(thelist.isEmpty()).toEqual(true);
        expect(thelist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
    });
    it("Test get", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var index0 = thelist.get(0);
        var index1 = thelist.get(1);
        expect(product1.getProductName()).toEqual(index0.getProductName());
        expect(product2.getProductName()).toEqual(index1.getProductName());
        expect(product1.getPrice()).toEqual(index0.getPrice());
        expect(product2.getPrice()).toEqual(index1.getPrice());
        expect(thelist.get(5000)).toEqual(null);
    });
    it("Test indexof", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.indexOf(product1)).toEqual(-1);
        expect(thelist.lastIndexOf(product1)).toEqual(-1);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(-1);
        expect(thelist.lastIndexOf(product1)).toEqual(0);
        expect(thelist.lastIndexOf(product3)).toEqual(-1);
        expect(thelist.lastIndexOf(product2)).toEqual(5);
    });
    it("Test set", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var oldElement = thelist.set(1, product3);
        expect(oldElement).toEqual(product2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(-1);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test java iteration", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var offset = 0;
        for (var iter = thelist.iterator(); iter.hasNext();) {
            var psp = iter.next();
            if (offset === 0)
                expect(psp.getProductName()).toEqual(product1.getProductName());
            if (offset === 1)
                expect(psp.getProductName()).toEqual(product2.getProductName());
            if (offset > 1)
                fail();
            offset++;
        }
    });
    it("Test addElement at front of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        thelist.addElement(0, product3);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(1);
        expect(thelist.indexOf(product2)).toEqual(2);
        expect(thelist.indexOf(product3)).toEqual(0);
    });
    it("Test addElement in middle of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        thelist.addElement(1, product3);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(2);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test addElement at end of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        thelist.addElement(2, product3);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(2);
    });
    it("Test remove at front of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.remove(0)).toEqual(undefined);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.remove(0)).toEqual(product1);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(-1);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(1);
        expect(thelist.remove(4000)).toEqual(undefined);
    });
    it("Test remove in middle of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.remove(1)).toEqual(product2);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(-1);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test remove at end of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.remove(2)).toEqual(product3);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(-1);
    });
    it("Test removeElement at front of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.removeElement(product1)).toEqual(false);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.removeElement(product1)).toEqual(true);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(-1);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test removeElement in middle of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.removeElement(product2)).toEqual(true);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(-1);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test removeElement at end of list", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.removeElement(product3)).toEqual(true);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(-1);
    });
    it("Test duplicates in array", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.size()).toEqual(4);
        expect(thelist.removeElement(product1)).toEqual(true);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(2);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(1);
        thelist.add(product3);
        expect(thelist.size()).toEqual(4);
        expect(thelist.indexOf(product3)).toEqual(1);
        expect(thelist.removeElement(product3)).toEqual(true);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(1);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(2);
        expect(thelist.removeElement(productNotAvailable)).toEqual(false);
    });
    it("Test addall", function () {
        var victim = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(victim.addAll(null)).toEqual(false);
        expect(victim.addAll(undefined)).toEqual(false);
        expect(victim.addAll(new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable()))).toEqual(false);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.size()).toEqual(4);
        expect(victim.addAll(thelist)).toEqual(true);
    });
    it("Test removeall", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.removeAll(null)).toEqual(false);
        expect(thelist.removeAll(undefined)).toEqual(false);
        expect(thelist.removeAll(new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable()))).toEqual(false);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var removelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(removelist.add(product2)).toEqual(true);
        expect(removelist.add(product3)).toEqual(true);
        expect(thelist.removeAll(removelist)).toEqual(true);
        expect(thelist.size()).toEqual(1);
        expect(removelist.add(productNotAvailable)).toEqual(true);
        expect(thelist.removeAll(removelist)).toEqual(false);
        expect(thelist.size()).toEqual(1);
    });
    it("Test equals", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var list2 = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(list2.add(product1)).toEqual(true);
        expect(list2.add(product2)).toEqual(true);
        expect(list2.add(product3)).toEqual(true);
        expect(thelist.equals(null)).toEqual(false);
        expect(thelist.equals(undefined)).toEqual(false);
        expect(thelist.equals(list2)).toEqual(false);
        expect(thelist.equals(thelist)).toEqual(true);
        expect(list2.equals(list2)).toEqual(true);
    });
    it("Test typescript iteration", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var offset = 0;
        var pspi = thelist[Symbol.iterator]();
        var tmp = pspi.next();
        expect(tmp.done).toEqual(false);
        expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));
        tmp = pspi.next();
        expect(tmp.done).toEqual(false);
        expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));
        tmp = pspi.next();
        expect(tmp.done).toEqual(true);
    });
    it("Test getfirst", function () {
        var thelist = new LinkedList_1.LinkedList(new CollectionUtils_1.GenericCollectable());
        expect(thelist.getFirst()).toEqual(null);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.getFirst()).toEqual(product1);
    });
});
