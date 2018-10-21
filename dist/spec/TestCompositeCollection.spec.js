"use strict";
/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("../src/ArrayList");
var CompositeCollection_1 = require("../src/CompositeCollection");
var LinkedList_1 = require("../src/LinkedList");
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
var product2 = new PetStoreProduct("CatFood", 6.99);
var product3 = new PetStoreProduct("ChewToy", 14.99);
var product4 = new PetStoreProduct("DogFood", 7.99);
var product5 = new PetStoreProduct("FishTank", 19.99);
var product6 = new PetStoreProduct("Goldfish", 9.99);
var product7 = new PetStoreProduct("Leash", 5.99);
var productNotAvailable = new PetStoreProduct("Bananas", 0.00); // we have no bananas today
describe("Test Composite Collection functionality", function () {
    it("Test Creation state with nothing in it", function () {
        var cc = new CompositeCollection_1.CompositeCollection(null);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(undefined);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(null, null);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(null, undefined);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(undefined, null);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(undefined, undefined);
        testEmptyPSP(cc);
    });
    it("Test creating composites built up of empty collections", function () {
        var cc = new CompositeCollection_1.CompositeCollection(new ArrayList_1.ArrayList());
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(new ArrayList_1.ArrayList(), null);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(new ArrayList_1.ArrayList(), null, new LinkedList_1.LinkedList());
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(undefined, new ArrayList_1.ArrayList(), null);
        testEmptyPSP(cc);
        cc = new CompositeCollection_1.CompositeCollection(undefined, new ArrayList_1.ArrayList(), null, new LinkedList_1.LinkedList());
        testEmptyPSP(cc);
    });
    it("Test single collection", function () {
        var underlying = new ArrayList_1.ArrayList();
        underlying.add(product1);
        underlying.add(product2);
        underlying.add(product3);
        underlying.add(product4);
        underlying.add(product5);
        underlying.add(product6);
        underlying.add(product7);
        var cc = new CompositeCollection_1.CompositeCollection(underlying);
        expect(cc.isEmpty()).toEqual(false);
        expect(cc.size()).toEqual(7);
        var product = 1;
        for (var iter = cc.iterator(); iter.hasNext();) {
            var psp = iter.next();
            switch (product) {
                case 1:
                    expect(psp.getProductName()).toEqual(product1.getProductName());
                    break;
                case 2:
                    expect(psp.getProductName()).toEqual(product2.getProductName());
                    break;
                case 3:
                    expect(psp.getProductName()).toEqual(product3.getProductName());
                    break;
                case 4:
                    expect(psp.getProductName()).toEqual(product4.getProductName());
                    break;
                case 5:
                    expect(psp.getProductName()).toEqual(product5.getProductName());
                    break;
                case 6:
                    expect(psp.getProductName()).toEqual(product6.getProductName());
                    break;
                case 7:
                    expect(psp.getProductName()).toEqual(product7.getProductName());
                    break;
                default:
                    fail("iterator at invalid offset");
                    break;
            }
            product = product + 1.0;
        }
        var i2 = cc[Symbol.iterator]();
        var ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product1.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product2.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product3.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product4.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product5.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product6.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product7.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(true);
    });
    it("Test two collections", function () {
        var c1 = new ArrayList_1.ArrayList();
        var c2 = new ArrayList_1.ArrayList();
        c1.add(product1);
        c2.add(product2);
        c1.add(product3);
        c2.add(product4);
        c1.add(product5);
        c2.add(product6);
        var cc = new CompositeCollection_1.CompositeCollection(c1, c2);
        expect(cc.isEmpty()).toEqual(false);
        expect(cc.size()).toEqual(6);
        var product = 1;
        for (var iter = cc.iterator(); iter.hasNext();) {
            var psp = iter.next();
            switch (product) {
                case 1:
                    expect(psp.getProductName()).toEqual(product1.getProductName());
                    break;
                case 2:
                    expect(psp.getProductName()).toEqual(product3.getProductName());
                    break;
                case 3:
                    expect(psp.getProductName()).toEqual(product5.getProductName());
                    break;
                case 4:
                    expect(psp.getProductName()).toEqual(product2.getProductName());
                    break;
                case 5:
                    expect(psp.getProductName()).toEqual(product4.getProductName());
                    break;
                case 6:
                    expect(psp.getProductName()).toEqual(product6.getProductName());
                    break;
                default:
                    fail("iterator at invalid offset");
                    break;
            }
            product = product + 1.0;
        }
        var i2 = cc[Symbol.iterator]();
        var ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product1.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product3.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product5.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product2.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product4.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product6.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(true);
    });
    it("Test adding empty collections", function () {
        var underlying = new ArrayList_1.ArrayList();
        underlying.add(product1);
        underlying.add(product2);
        underlying.add(product3);
        underlying.add(product4);
        underlying.add(product5);
        underlying.add(product6);
        underlying.add(product7);
        var cc = new CompositeCollection_1.CompositeCollection(new ArrayList_1.ArrayList(), underlying, null, undefined, new ArrayList_1.ArrayList());
        expect(cc.isEmpty()).toEqual(false);
        expect(cc.size()).toEqual(7);
        var product = 1;
        for (var iter = cc.iterator(); iter.hasNext();) {
            var psp = iter.next();
            switch (product) {
                case 1:
                    expect(psp.getProductName()).toEqual(product1.getProductName());
                    break;
                case 2:
                    expect(psp.getProductName()).toEqual(product2.getProductName());
                    break;
                case 3:
                    expect(psp.getProductName()).toEqual(product3.getProductName());
                    break;
                case 4:
                    expect(psp.getProductName()).toEqual(product4.getProductName());
                    break;
                case 5:
                    expect(psp.getProductName()).toEqual(product5.getProductName());
                    break;
                case 6:
                    expect(psp.getProductName()).toEqual(product6.getProductName());
                    break;
                case 7:
                    expect(psp.getProductName()).toEqual(product7.getProductName());
                    break;
                default:
                    fail("iterator at invalid offset");
                    break;
            }
            product = product + 1.0;
        }
        var i2 = cc[Symbol.iterator]();
        var ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product1.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product2.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product3.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product4.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product5.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product6.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(false);
        expect(ir2.value.getProductName()).toEqual(product7.getProductName());
        ir2 = i2.next();
        expect(ir2.done).toEqual(true);
    });
});
var failEmptyConsumerPSP = {
    accept: function (element) {
        fail('Unwanted code branch in failEmptyConsumerPSP');
        throw new Error('Unwanted code branch in failEmptyConsumerPSP');
    }
};
function testEmptyPSP(c) {
    expect(c.isEmpty()).toEqual(true);
    expect(c.size()).toEqual(0);
    c.forEach(failEmptyConsumerPSP);
    for (var iter = c.iterator(); iter.hasNext();) {
        fail("Should not iterate on empty composite collection");
    }
    var i = c[Symbol.iterator]();
    var ir = i.next();
    expect(ir.done).toEqual(true);
    var collection = c;
    expect(collection.isEmpty()).toEqual(true);
    expect(collection.size()).toEqual(0);
    collection.forEach(failEmptyConsumerPSP);
    for (var iter = c.iterator(); iter.hasNext();) {
        fail("Should not iterate on empty collection");
    }
    var i2 = collection[Symbol.iterator]();
    var ir2 = i2.next();
    expect(ir2.done).toEqual(true);
}
