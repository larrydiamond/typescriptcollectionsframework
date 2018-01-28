"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
var Collections_1 = require("../src/Collections");
var PriorityQueue_1 = require("../src/PriorityQueue");
describe("Test Priority Queue functionality", function () {
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
    var product1 = new PetStoreProduct("ChewToy", 14.99);
    var product2 = new PetStoreProduct("Catnip", 4.99);
    var product3 = new PetStoreProduct("Goldfish", 9.99);
    var product4 = new PetStoreProduct("Dog Leash", 6.99);
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
    var priceSortPetStoreProduct = {
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
            if (o1.getPrice() === o2.getPrice())
                return 0;
            if (o1.getPrice() === undefined)
                return -1;
            if (o1.getPrice() === null)
                return -1;
            if (o2.getPrice() === undefined)
                return 1;
            if (o2.getPrice() === null)
                return 1;
            if (o1.getPrice() < o2.getPrice())
                return -1;
            return 1;
        }
    };
    it("Test adding items to priority queue and offer", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.offer(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.offer(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test adding items to priority queue and poll", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.poll().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test poll on empty queue", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.poll().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.poll().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.isEmpty()).toEqual(true);
        expect(PriorityQueue1.poll()).toBeNull();
    });
    it("Test adding items to priority queue and removeQueue", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test removeQueue on empty queue", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.isEmpty()).toEqual(true);
        expect(PriorityQueue1.removeQueue()).toEqual(undefined);
    });
    it("Test adding items to priority queue and peek", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.peek().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test peek on empty queue", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.peek().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.peek().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.isEmpty()).toEqual(true);
        expect(PriorityQueue1.peek()).toBeNull();
    });
    it("Test adding items to priority queue and element", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.element().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test element on empty queue", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.element().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("Catnip");
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.element().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.isEmpty()).toEqual(true);
        expect(PriorityQueue1.element()).toEqual(undefined);
    });
    it("Test adding items to priority queue and clear", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.peek().getProductName()).toEqual("ChewToy");
        expect(PriorityQueue1.isEmpty()).toEqual(false);
        PriorityQueue1.clear();
        expect(PriorityQueue1.isEmpty()).toEqual(true);
    });
    it("Test adding items to priority queue and remove", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.remove(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test empty priority queue", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.isEmpty()).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(0);
    });
    it("Test adding items to priority queue and contains true", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.contains(product1)).toEqual(true);
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test adding items to priority queue and contains false", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.size()).toEqual(0);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(1);
        expect(PriorityQueue1.add(product3)).toEqual(true);
        expect(PriorityQueue1.size()).toEqual(2);
        expect(PriorityQueue1.contains(product1)).toEqual(true);
        expect(PriorityQueue1.contains(product4)).toEqual(false);
        expect(PriorityQueue1.isEmpty()).toEqual(false);
    });
    it("Test java iteration", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        var offset = 0;
        for (var iter = PriorityQueue1.iterator(); iter.hasNext();) {
            var psp = iter.next();
            if (offset === 0)
                expect(psp.getProductName()).toEqual(product2.getProductName()); // Catnip before ChewToy
            if (offset === 1)
                expect(psp.getProductName()).toEqual(product1.getProductName()); // Catnip before ChewToy
            if (offset > 1)
                fail();
            offset++;
        }
    });
    it("Test typescript iteration", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(alphabeticalSortPetStoreProduct);
        expect(PriorityQueue1.add(product1)).toEqual(true);
        expect(PriorityQueue1.add(product2)).toEqual(true);
        var offset = 0;
        var tsi = PriorityQueue1[Symbol.iterator]();
        var tmp = tsi.next();
        expect(tmp.done).toEqual(false);
        expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2)); // Catnip before ChewToy
        tmp = tsi.next();
        expect(tmp.done).toEqual(false);
        expect(JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1)); // Catnip before ChewToy
        tmp = tsi.next();
        expect(tmp.done).toEqual(true);
    });
    it("Test ceiling", function () {
        var PriorityQueue1 = new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getNumberComparator());
        expect(PriorityQueue1.add(44)).toEqual(true);
        expect(PriorityQueue1.add(5)).toEqual(true);
        expect(PriorityQueue1.add(20)).toEqual(true);
        expect(PriorityQueue1.add(88)).toEqual(true);
        expect(PriorityQueue1.add(50)).toEqual(true);
        expect(PriorityQueue1.add(30)).toEqual(true);
        expect(PriorityQueue1.add(1)).toEqual(true);
        expect(PriorityQueue1.add(48)).toEqual(true);
        expect(PriorityQueue1.add(62)).toEqual(true);
        expect(PriorityQueue1.add(78)).toEqual(true);
        expect(PriorityQueue1.add(17)).toEqual(true);
        expect(PriorityQueue1.add(70)).toEqual(true);
        expect(PriorityQueue1.add(80)).toEqual(true);
        expect(PriorityQueue1.add(32)).toEqual(true);
        expect(PriorityQueue1.add(100)).toEqual(true);
        expect(PriorityQueue1.peek()).toEqual(1);
    });
});
