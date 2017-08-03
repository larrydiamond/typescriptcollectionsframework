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
    it("Test Adding one item", function () {
        var TreeSet1 = new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct);
        expect(TreeSet1.size()).toEqual(0);
        expect(TreeSet1.isEmpty()).toEqual(true);
        expect(TreeSet1.add(product1)).toEqual(false);
        expect(1).toEqual(TreeSet1.size());
        expect(false).toEqual(TreeSet1.isEmpty());
    });
    it("Test Adding one item basic datatypes", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.isEmpty()).toEqual(true);
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
    });
    it("Test Adding two items basic datatypes", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.isEmpty()).toEqual(true);
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
        expect(TreeSet2.add("Second")).toEqual(false);
        expect(2).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
    });
    it("Test Adding two items basic datatypessame value", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.isEmpty()).toEqual(true);
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
        expect(TreeSet2.add("Hello")).toEqual(true);
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
    });
    it("Test contains basic datatypessame value", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(false).toEqual(TreeSet2.contains("Hello"));
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.isEmpty()).toEqual(true);
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect(true).toEqual(TreeSet2.contains("Hello"));
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
        expect(TreeSet2.add("Hello")).toEqual(true);
        expect(true).toEqual(TreeSet2.contains("Hello"));
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
    });
    it("Test first basic datatypes", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.isEmpty()).toEqual(true);
        expect(null).toEqual(TreeSet2.first());
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect("Hello").toEqual(TreeSet2.first());
        expect(1).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
        expect(TreeSet2.add("Second")).toEqual(false);
        expect("Hello").toEqual(TreeSet2.first());
        expect(2).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
        expect(TreeSet2.add("Alpha")).toEqual(false);
        expect("Alpha").toEqual(TreeSet2.first());
        expect(3).toEqual(TreeSet2.size());
        expect(false).toEqual(TreeSet2.isEmpty());
    });
    it("Test pollfirst", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.pollFirst()).toEqual(null);
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect(TreeSet2.size()).toEqual(1);
        expect(TreeSet2.pollFirst()).toEqual("Hello");
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.pollFirst()).toEqual(null);
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.add("Second")).toEqual(false);
        expect(TreeSet2.add("First")).toEqual(false);
        expect(TreeSet2.pollFirst()).toEqual("First");
        expect(TreeSet2.size()).toEqual(1);
        expect(TreeSet2.pollFirst()).toEqual("Second");
        expect(TreeSet2.size()).toEqual(0);
    });
    it("Test polllast", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getStringComparator());
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.pollLast()).toEqual(null);
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.add("Hello")).toEqual(false);
        expect(TreeSet2.size()).toEqual(1);
        expect(TreeSet2.pollLast()).toEqual("Hello");
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.pollLast()).toEqual(null);
        expect(TreeSet2.size()).toEqual(0);
        expect(TreeSet2.add("Second")).toEqual(false);
        expect(TreeSet2.add("First")).toEqual(false);
        expect(TreeSet2.pollLast()).toEqual("Second");
        expect(TreeSet2.size()).toEqual(1);
        expect(TreeSet2.pollLast()).toEqual("First");
        expect(TreeSet2.size()).toEqual(0);
    });
    it("Test java iteration", function () {
        var TreeSet2 = new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct);
        expect(TreeSet2.add(product1)).toEqual(false);
        expect(TreeSet2.add(product2)).toEqual(false);
        var offset = 0;
        for (var iter = TreeSet2.iterator(); iter.hasNext();) {
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
        var TreeSet2 = new TreeSet_1.TreeSet(alphabeticalSortPetStoreProduct);
        expect(TreeSet2.add(product1)).toEqual(false);
        expect(TreeSet2.add(product2)).toEqual(false);
        var offset = 0;
        var tsi = TreeSet2[Symbol.iterator]();
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
        var TreeSet2 = new TreeSet_1.TreeSet(CollectionUtils_1.CollectionUtils.getNumberComparator());
        expect(TreeSet2.add(44)).toEqual(false);
        expect(TreeSet2.add(5)).toEqual(false);
        expect(TreeSet2.add(20)).toEqual(false);
        expect(TreeSet2.add(88)).toEqual(false);
        expect(TreeSet2.add(50)).toEqual(false);
        expect(TreeSet2.add(30)).toEqual(false);
        expect(TreeSet2.add(1)).toEqual(false);
        expect(TreeSet2.add(48)).toEqual(false);
        expect(TreeSet2.add(62)).toEqual(false);
        expect(TreeSet2.add(78)).toEqual(false);
        expect(TreeSet2.add(17)).toEqual(false);
        expect(TreeSet2.add(70)).toEqual(false);
        expect(TreeSet2.add(80)).toEqual(false);
        expect(TreeSet2.add(32)).toEqual(false);
        expect(TreeSet2.ceiling(16)).toEqual(17); // 16 isnt there, 17 is
        expect(TreeSet2.ceiling(17)).toEqual(17); // 17 is there
    });
});
