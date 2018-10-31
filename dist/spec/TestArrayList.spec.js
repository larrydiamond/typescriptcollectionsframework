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
var product1 = new PetStoreProduct("Catnip", 4.99);
var product2 = new PetStoreProduct("ChewToy", 14.99);
var product3 = new PetStoreProduct("Goldfish", 9.99);
var productNotAvailable = new PetStoreProduct("Bananas", 0.00); // we have no bananas today
describe("Test ArrayList functionality", function () {
    it("Test Creation state", function () {
        var list = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var listNoParams = new ArrayList_1.ArrayList();
        testEmptyArrayList(list);
        testEmptyArrayList(listNoParams);
    });
    it("Test Adding some items", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var list = arraylist;
        var collection = list;
        expect(arraylist.contains(product3)).toEqual(false);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.contains(product2)).toEqual(true);
        expect(arraylist.contains(product3)).toEqual(false);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
    });
    it("Test clearing the ArrayList", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var list = arraylist;
        var collection = list;
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        arraylist.clear(); // returns void, nothing to expect :(
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(2);
        expect(list.isEmpty()).toEqual(false);
        expect(list.size()).toEqual(2);
        expect(collection.isEmpty()).toEqual(false);
        expect(collection.size()).toEqual(2);
        list.clear(); // returns void, nothing to expect :(
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
        expect(list.isEmpty()).toEqual(true);
        expect(list.size()).toEqual(0);
        expect(collection.isEmpty()).toEqual(true);
        expect(collection.size()).toEqual(0);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
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
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        testGetArrayList(arraylist);
        var arraylistNoParams = new ArrayList_1.ArrayList();
        testGetArrayList(arraylist);
    });
    it("Test indexof", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.indexOf(product1)).toEqual(-1);
        expect(arraylist.lastIndexOf(product1)).toEqual(-1);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(1);
        expect(arraylist.indexOf(product3)).toEqual(-1);
        expect(arraylist.lastIndexOf(product1)).toEqual(0);
        expect(arraylist.lastIndexOf(product3)).toEqual(-1);
        expect(arraylist.lastIndexOf(product2)).toEqual(5);
    });
    it("Test set", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        var oldElement = arraylist.set(1, product3);
        expect(oldElement).toEqual(product2);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(-1);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test java iteration", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        var offset = 0;
        for (var iter = arraylist.iterator(); iter.hasNext();) {
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
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        arraylist.addIndex(0, product3);
        expect(arraylist.size()).toEqual(3);
        expect(arraylist.indexOf(product1)).toEqual(1);
        expect(arraylist.indexOf(product2)).toEqual(2);
        expect(arraylist.indexOf(product3)).toEqual(0);
    });
    it("Test addElement in middle of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        arraylist.addIndex(1, product3);
        expect(arraylist.size()).toEqual(3);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(2);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test addElement at end of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        arraylist.addIndex(2, product3);
        expect(arraylist.size()).toEqual(3);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(1);
        expect(arraylist.indexOf(product3)).toEqual(2);
    });
    it("Test remove at front of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.removeIndex(0)).toEqual(undefined);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.removeIndex(0)).toEqual(product1);
        expect(arraylist.size()).toEqual(2);
        expect(arraylist.indexOf(product1)).toEqual(-1);
        expect(arraylist.indexOf(product2)).toEqual(0);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test remove in middle of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.removeIndex(1)).toEqual(product2);
        expect(arraylist.size()).toEqual(2);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(-1);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test remove at end of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.removeIndex(2)).toEqual(product3);
        expect(arraylist.size()).toEqual(2);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(1);
        expect(arraylist.indexOf(product3)).toEqual(-1);
    });
    it("Test removeElement at front of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.remove(product1)).toEqual(false);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.remove(product1)).toEqual(true);
        expect(arraylist.size()).toEqual(2);
        expect(arraylist.indexOf(product1)).toEqual(-1);
        expect(arraylist.indexOf(product2)).toEqual(0);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test removeElement in middle of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.remove(product2)).toEqual(true);
        expect(arraylist.size()).toEqual(2);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(-1);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
    it("Test removeElement at end of list", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.remove(product3)).toEqual(true);
        expect(arraylist.size()).toEqual(2);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(1);
        expect(arraylist.indexOf(product3)).toEqual(-1);
    });
    it("Test duplicates in array", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.size()).toEqual(4);
        expect(arraylist.remove(product1)).toEqual(true);
        expect(arraylist.size()).toEqual(3);
        expect(arraylist.indexOf(product1)).toEqual(2);
        expect(arraylist.indexOf(product2)).toEqual(0);
        expect(arraylist.indexOf(product3)).toEqual(1);
        arraylist.add(product3);
        expect(arraylist.size()).toEqual(4);
        expect(arraylist.indexOf(product3)).toEqual(1);
        expect(arraylist.remove(product3)).toEqual(true);
        expect(arraylist.size()).toEqual(3);
        expect(arraylist.indexOf(product1)).toEqual(1);
        expect(arraylist.indexOf(product2)).toEqual(0);
        expect(arraylist.indexOf(product3)).toEqual(2);
        expect(arraylist.remove(productNotAvailable)).toEqual(false);
    });
    it("Test addall", function () {
        var victim = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(victim.addAll(null)).toEqual(false);
        expect(victim.addAll(undefined)).toEqual(false);
        expect(victim.addAll(new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable()))).toEqual(false);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        expect(arraylist.add(product3)).toEqual(true);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.size()).toEqual(4);
        expect(victim.addAll(arraylist)).toEqual(true);
    });
    it("Test removeall", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.removeAll(null)).toEqual(false);
        expect(arraylist.removeAll(undefined)).toEqual(false);
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        var removelist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.removeAll(removelist)).toEqual(false);
        expect(removelist.add(product2)).toEqual(true);
        expect(removelist.add(product3)).toEqual(true);
        expect(arraylist.removeAll(removelist)).toEqual(true);
        expect(arraylist.size()).toEqual(1);
        expect(removelist.add(productNotAvailable)).toEqual(true);
        expect(arraylist.removeAll(removelist)).toEqual(false);
        expect(arraylist.size()).toEqual(1);
    });
    it("Test typescript iteration", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(arraylist.add(product1)).toEqual(true);
        expect(arraylist.add(product2)).toEqual(true);
        var offset = 0;
        var pspi = arraylist[Symbol.iterator]();
        var tmp = pspi.next();
        expect(tmp.done).toEqual(false);
        expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));
        tmp = pspi.next();
        expect(tmp.done).toEqual(false);
        expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));
        tmp = pspi.next();
        expect(tmp.done).toEqual(true);
    });
    it("Test constructing with elements from an ArrayList", function () {
        var sourceList = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var arraylist = new ArrayList_1.ArrayList(sourceList.getCollectable(), sourceList);
        expect(arraylist.size()).toEqual(sourceList.size());
    });
    it("Test constructing with elements from a LinkedList", function () {
        var sourceList = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        expect(sourceList.add(product1)).toEqual(true);
        expect(sourceList.add(product2)).toEqual(true);
        var arraylist = new ArrayList_1.ArrayList(sourceList.getCollectable(), sourceList);
        expect(arraylist.size()).toEqual(sourceList.size());
    });
    it("Test constructing with elements from an HashSet", function () {
        var source = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        expect(source.add(product1)).toEqual(true);
        expect(source.add(product2)).toEqual(true);
        var arraylist = new ArrayList_1.ArrayList(source.getHashable(), source);
        expect(arraylist.size()).toEqual(source.size());
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
        expect(source.add(product1)).toEqual(true);
        expect(source.add(product2)).toEqual(true);
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable(), source);
        expect(arraylist.size()).toEqual(source.size());
    });
    it("Test null", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        arraylist.add(null);
        expect(arraylist.contains(null)).toEqual(true);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(1);
        expect(arraylist.get(0)).toEqual(null);
        expect(arraylist.indexOf(null)).toEqual(0);
        expect(arraylist.lastIndexOf(null)).toEqual(0);
        expect(arraylist.remove(product1)).toEqual(false);
        expect(arraylist.contains(null)).toEqual(true);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(1);
        expect(arraylist.get(0)).toEqual(null);
        expect(arraylist.indexOf(null)).toEqual(0);
        expect(arraylist.lastIndexOf(null)).toEqual(0);
        expect(arraylist.remove(null)).toEqual(true);
        expect(arraylist.contains(null)).toEqual(false);
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
    });
    it("Test undefined", function () {
        var arraylist = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        arraylist.add(undefined);
        expect(arraylist.contains(undefined)).toEqual(true);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(1);
        expect(arraylist.get(0)).toEqual(undefined);
        expect(arraylist.indexOf(undefined)).toEqual(0);
        expect(arraylist.lastIndexOf(undefined)).toEqual(0);
        expect(arraylist.remove(product1)).toEqual(false);
        expect(arraylist.contains(undefined)).toEqual(true);
        expect(arraylist.isEmpty()).toEqual(false);
        expect(arraylist.size()).toEqual(1);
        expect(arraylist.get(0)).toEqual(undefined);
        expect(arraylist.indexOf(undefined)).toEqual(0);
        expect(arraylist.lastIndexOf(undefined)).toEqual(0);
        expect(arraylist.remove(undefined)).toEqual(true);
        expect(arraylist.contains(undefined)).toEqual(false);
        expect(arraylist.isEmpty()).toEqual(true);
        expect(arraylist.size()).toEqual(0);
    });
});
function testEmptyArrayList(list) {
    expect(list.isEmpty()).toEqual(true);
    expect(list.size()).toEqual(0);
    expect(list.indexOf(product1)).toEqual(-1);
    expect(list.lastIndexOf(product1)).toEqual(-1);
    var collection = list;
    expect(collection.isEmpty()).toEqual(true);
    expect(collection.size()).toEqual(0);
}
function testGetArrayList(arraylist) {
    expect(arraylist.add(product1)).toEqual(true);
    expect(arraylist.add(product2)).toEqual(true);
    var index0 = arraylist.get(0);
    var index1 = arraylist.get(1);
    expect(product1.getProductName()).toEqual(index0.getProductName());
    expect(product2.getProductName()).toEqual(index1.getProductName());
    expect(product1.getPrice()).toEqual(index0.getPrice());
    expect(product2.getPrice()).toEqual(index1.getPrice());
}
