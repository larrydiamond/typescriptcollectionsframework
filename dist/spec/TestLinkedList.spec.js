"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("../src/AllFieldCollectable");
var AllFieldHashable_1 = require("../src/AllFieldHashable");
var ArrayList_1 = require("../src/ArrayList");
var HashSet_1 = require("../src/HashSet");
var LinkedList_1 = require("../src/LinkedList");
var TreeSet_1 = require("../src/TreeSet");
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
    var product1 = new PetStoreProduct("Catnip", 4.99);
    var product2 = new PetStoreProduct("ChewToy", 14.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var productNotAvailable = new PetStoreProduct("Bananas", 0.00); // we have no bananas today
    it("Test Creation state", function () {
        var list = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        var collection = list;
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
    });
    it("Test Adding some items", function () {
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
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
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
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
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
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
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
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
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var oldElement = thelist.set(1, product3);
        expect(oldElement).toEqual(product2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(-1);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test java iteration", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
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
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        thelist.addIndex(0, product3);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(1);
        expect(thelist.indexOf(product2)).toEqual(2);
        expect(thelist.indexOf(product3)).toEqual(0);
    });
    it("Test addElement in middle of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        thelist.addIndex(1, product3);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(2);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test addElement at end of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        thelist.addIndex(2, product3);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(2);
    });
    it("Test remove at front of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.removeIndex(0)).toEqual(undefined);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.removeIndex(0)).toEqual(product1);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(-1);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(1);
        expect(thelist.removeIndex(4000)).toEqual(undefined);
    });
    it("Test remove in middle of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.removeIndex(1)).toEqual(product2);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(-1);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test remove at end of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.removeIndex(2)).toEqual(product3);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(-1);
    });
    it("Test removeElement at front of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.remove(product1)).toEqual(false);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.remove(product1)).toEqual(true);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(-1);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test removeElement in middle of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.remove(product2)).toEqual(true);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(-1);
        expect(thelist.indexOf(product3)).toEqual(1);
    });
    it("Test removeElement at end of list", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.remove(product3)).toEqual(true);
        expect(thelist.size()).toEqual(2);
        expect(thelist.indexOf(product1)).toEqual(0);
        expect(thelist.indexOf(product2)).toEqual(1);
        expect(thelist.indexOf(product3)).toEqual(-1);
    });
    it("Test duplicates in array", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.size()).toEqual(4);
        expect(thelist.remove(product1)).toEqual(true);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(2);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(1);
        thelist.add(product3);
        expect(thelist.size()).toEqual(4);
        expect(thelist.indexOf(product3)).toEqual(1);
        expect(thelist.remove(product3)).toEqual(true);
        expect(thelist.size()).toEqual(3);
        expect(thelist.indexOf(product1)).toEqual(1);
        expect(thelist.indexOf(product2)).toEqual(0);
        expect(thelist.indexOf(product3)).toEqual(2);
        expect(thelist.remove(productNotAvailable)).toEqual(false);
    });
    it("Test addall", function () {
        var victim = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(victim.addAll(null)).toEqual(false);
        expect(victim.addAll(undefined)).toEqual(false);
        expect(victim.addAll(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()))).toEqual(false);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.add(product3)).toEqual(true);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.size()).toEqual(4);
        expect(victim.addAll(thelist)).toEqual(true);
    });
    it("Test removeall", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.removeAll(null)).toEqual(false);
        expect(thelist.removeAll(undefined)).toEqual(false);
        expect(thelist.removeAll(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()))).toEqual(false);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        var removelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(removelist.add(product2)).toEqual(true);
        expect(removelist.add(product3)).toEqual(true);
        expect(thelist.removeAll(removelist)).toEqual(true);
        expect(thelist.size()).toEqual(1);
        expect(removelist.add(productNotAvailable)).toEqual(true);
        expect(thelist.removeAll(removelist)).toEqual(false);
        expect(thelist.size()).toEqual(1);
    });
    it("Test typescript iteration", function () {
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
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
        var thelist = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(thelist.getFirst()).toEqual(null);
        expect(thelist.add(product1)).toEqual(true);
        expect(thelist.add(product2)).toEqual(true);
        expect(thelist.getFirst()).toEqual(product1);
    });
    it("Test constructing with elements from an ArrayList", function () {
        var sourceList = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var list = new LinkedList_1.LinkedList(sourceList.getCollectable(), sourceList);
        expect(list.size()).toEqual(sourceList.size());
    });
    it("Test constructing with elements from a LinkedList", function () {
        var sourceList = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var list = new LinkedList_1.LinkedList(sourceList.getCollectable(), sourceList);
        expect(list.size()).toEqual(sourceList.size());
    });
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
        var list = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable(), source);
        expect(list.size()).toEqual(source.size());
    });
    it("Test constructing with elements from an HashSet", function () {
        var source = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(source.add(product1)).toEqual(true);
        expect(source.add(product2)).toEqual(true);
        var list = new LinkedList_1.LinkedList(source.getHashable(), source);
        expect(list.size()).toEqual(source.size());
    });
});
