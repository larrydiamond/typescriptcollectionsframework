"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayList_1 = require("../src/ArrayList");
describe("Test ArrayList functionality", function () {
    // This class does nothing I just need to have a class in the test list
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
        var product1 = new PetStoreProduct("Catnip", 4.99);
        var product2 = new PetStoreProduct("ChewToy", 14.99);
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
        var product1 = new PetStoreProduct("Catnip", 4.99);
        var product2 = new PetStoreProduct("ChewToy", 14.99);
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
        var product1 = new PetStoreProduct("Catnip", 4.99);
        var product2 = new PetStoreProduct("ChewToy", 14.99);
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
        var product1 = new PetStoreProduct("Catnip", 4.99);
        var product2 = new PetStoreProduct("ChewToy", 14.99);
        arraylist.add(product1);
        arraylist.add(product2);
        var product3 = new PetStoreProduct("Goldfish", 9.99);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(1);
        expect(arraylist.indexOf(product3)).toEqual(-1);
    });
    it("Test set", function () {
        var arraylist = new ArrayList_1.ArrayList();
        var product1 = new PetStoreProduct("Catnip", 4.99);
        var product2 = new PetStoreProduct("ChewToy", 14.99);
        arraylist.add(product1);
        arraylist.add(product2);
        var product3 = new PetStoreProduct("Goldfish", 9.99);
        arraylist.set(1, product3);
        expect(arraylist.indexOf(product1)).toEqual(0);
        expect(arraylist.indexOf(product2)).toEqual(-1);
        expect(arraylist.indexOf(product3)).toEqual(1);
    });
});
