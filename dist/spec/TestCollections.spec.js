"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var Collections_1 = require("../src/Collections");
var jasts_1 = require("jasts");
var jasts_2 = require("jasts");
describe("Test Collections static methods", function () {
    it("getStringComparator compare with self", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_2.TestNumber.equals("Comparing something with itself returns 0", comp.compare("something", "something"), 0);
        jasts_2.TestNumber.equals("Comparing null with itself returns 0", comp.compare(null, null), 0);
        jasts_2.TestNumber.equals("Comparing undefined with itself returns 0", comp.compare(undefined, undefined), 0);
    });
    it("getStringComparator compare with undefined", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_2.TestNumber.equals("Comparing undefined vs undefined returns 0", comp.compare(undefined, undefined), 0);
        jasts_2.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_2.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, "something"), -1);
        jasts_2.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_2.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare("something", undefined), 1);
    });
    it("getStringComparator compare with null", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_2.TestNumber.equals("Comparing null vs null returns 0", comp.compare(null, null), 0);
        jasts_2.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_2.TestNumber.equals("Comparing something vs null returns 1", comp.compare("something", null), 1);
        jasts_2.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_2.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, "something"), -1);
    });
    it("getStringComparator compare with a real string", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_2.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, "something"), -1);
        jasts_2.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, "something"), -1);
        jasts_2.TestNumber.equals("Comparing something vs null returns 1", comp.compare("something", null), 1);
        jasts_2.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare("something", undefined), 1);
        jasts_2.TestNumber.equals("Comparing a lower string vs a higher string returns -1", comp.compare("AAA", "BBB"), -1);
        jasts_2.TestNumber.equals("Comparing a higher string vs a lower string returns 1", comp.compare("CCC", "BBB"), 1);
        jasts_2.TestNumber.equals("Comparing a string vs itself returns 0", comp.compare("DDD", "DDD"), 0);
    });
    it("getNumberComparator compare with self", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_2.TestNumber.equals("Comparing something with itself returns 0", comp.compare(50, 50), 0);
        jasts_2.TestNumber.equals("Comparing null with itself returns 0", comp.compare(null, null), 0);
        jasts_2.TestNumber.equals("Comparing undefined with itself returns 0", comp.compare(undefined, undefined), 0);
    });
    it("getNumberComparator compare with undefined", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_2.TestNumber.equals("Comparing undefined vs undefined returns 0", comp.compare(undefined, undefined), 0);
        jasts_2.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_2.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, 50), -1);
        jasts_2.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_2.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare(50, undefined), 1);
    });
    it("getNumberComparator compare with null", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_2.TestNumber.equals("Comparing null vs null returns 0", comp.compare(null, null), 0);
        jasts_2.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_2.TestNumber.equals("Comparing something vs null returns 1", comp.compare(50, null), 1);
        jasts_2.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_2.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, 50), -1);
    });
    it("getNumberComparator compare with a real string", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_2.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, 50), -1);
        jasts_2.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, 50), -1);
        jasts_2.TestNumber.equals("Comparing something vs null returns 1", comp.compare(50, null), 1);
        jasts_2.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare(50, undefined), 1);
        jasts_2.TestNumber.equals("Comparing a lower number vs a higher number returns -1", comp.compare(10, 100), -1);
        jasts_2.TestNumber.equals("Comparing a higher number vs a lower number returns 1", comp.compare(200, 20), 1);
        jasts_2.TestNumber.equals("Comparing a number vs itself returns 0", comp.compare(1000, 1000), 0);
    });
    it("getHashCodeForString undefined", function () {
        jasts_2.TestNumber.equals("undefined hash code is zero", Collections_1.Collections.getHashCodeForString(undefined), 0);
    });
    it("getHashCodeForString null", function () {
        jasts_2.TestNumber.equals("null hash code is zero", Collections_1.Collections.getHashCodeForString(null), 0);
    });
    it("getHashCodeForString data", function () {
        jasts_2.TestNumber.greaterThan("hash code for One is valid", Collections_1.Collections.getHashCodeForString("One"), 0);
    });
    it("getHashCodeForStrings undefined", function () {
        jasts_2.TestNumber.equals("undefined hash code is zero", Collections_1.Collections.getHashCodeForStrings(undefined), 0);
    });
    it("getHashCodeForStrings null", function () {
        jasts_2.TestNumber.equals("null hash code is zero", Collections_1.Collections.getHashCodeForStrings(null), 0);
    });
    it("getHashCodeForStrings data", function () {
        var tmp = Collections_1.Collections.list("One", "Two", "Three");
        jasts_2.TestNumber.greaterThan("hash code for OneTwothree is valid", Collections_1.Collections.getHashCodeForStrings(tmp), 0);
    });
    it("getHashCodeForNumber undefined", function () {
        jasts_2.TestNumber.equals("undefined hash code is zero", Collections_1.Collections.getHashCodeForNumber(undefined), 0);
    });
    it("getHashCodeForNumber null", function () {
        jasts_2.TestNumber.equals("null hash code is zero", Collections_1.Collections.getHashCodeForNumber(null), 0);
    });
    it("getHashCodeForNumber small", function () {
        jasts_2.TestNumber.equals("hash code for low integers is itself", Collections_1.Collections.getHashCodeForNumber(50), 50);
    });
    it("Dynamic Collectable skuCollectable", function () {
        var skuCollectable = Collections_1.Collections.dynamicCollectable("sku");
        // SkuCollectable will differentiate psp1 psp2 psp3
        jasts_1.TestBoolean.false("skuCollectable psp1 psp2", skuCollectable.equals(psp1, psp2));
        jasts_1.TestBoolean.false("skuCollectable psp1 psp3", skuCollectable.equals(psp1, psp3));
        jasts_1.TestBoolean.false("skuCollectable psp2 psp3", skuCollectable.equals(psp2, psp3));
        // SkuCollectable cannot differentiate psp1 psp1copy and psp3copy
        jasts_1.TestBoolean.true("skuCollectable psp1 psp1copy", skuCollectable.equals(psp1, psp1copy));
        jasts_1.TestBoolean.true("skuCollectable psp1 psp3copy", skuCollectable.equals(psp1, psp3copy));
        // The others will be differentiated
        jasts_1.TestBoolean.false("skuCollectable psp1copy psp2", skuCollectable.equals(psp1copy, psp2));
        jasts_1.TestBoolean.false("skuCollectable psp1copy psp3", skuCollectable.equals(psp1copy, psp3));
        jasts_1.TestBoolean.false("skuCollectable psp3copy psp2", skuCollectable.equals(psp3copy, psp2));
        jasts_1.TestBoolean.false("skuCollectable psp3copy psp3", skuCollectable.equals(psp3copy, psp3));
        // Compare vs null and undefined
        jasts_1.TestBoolean.false("skuCollectable psp1 null", skuCollectable.equals(psp1, null));
        jasts_1.TestBoolean.false("skuCollectable psp1 undefined", skuCollectable.equals(psp1, undefined));
        jasts_1.TestBoolean.false("skuCollectable null psp1", skuCollectable.equals(null, psp1));
        jasts_1.TestBoolean.false("skuCollectable undefined psp1", skuCollectable.equals(undefined, psp1));
        jasts_1.TestBoolean.true("skuCollectable null null", skuCollectable.equals(null, null));
        jasts_1.TestBoolean.true("skuCollectable undefined undefined", skuCollectable.equals(undefined, undefined));
        jasts_1.TestBoolean.false("skuCollectable null undefined", skuCollectable.equals(null, undefined));
        jasts_1.TestBoolean.false("skuCollectable undefined null", skuCollectable.equals(undefined, null));
    });
    it("Dynamic Collectable nameCollectable", function () {
        var nameCollectable = Collections_1.Collections.dynamicCollectable("name");
        // NameCollectable will differentiate psp1 psp2 psp3
        jasts_1.TestBoolean.false("nameCollectable psp1 psp2", nameCollectable.equals(psp1, psp2));
        jasts_1.TestBoolean.false("nameCollectable psp1 psp3", nameCollectable.equals(psp1, psp3));
        jasts_1.TestBoolean.false("nameCollectable psp2 psp3", nameCollectable.equals(psp2, psp3));
        // nameCollectable cannot differentiate psp2 and psp2copy
        jasts_1.TestBoolean.true("nameCollectable psp2 psp2copy", nameCollectable.equals(psp2, psp2copy));
        // The others will be differentiated
        jasts_1.TestBoolean.false("nameCollectable psp2copy psp1", nameCollectable.equals(psp2copy, psp1));
        jasts_1.TestBoolean.false("nameCollectable psp2copy psp3", nameCollectable.equals(psp2copy, psp3));
        // Compare vs null and undefined
        jasts_1.TestBoolean.false("nameCollectable psp1 null", nameCollectable.equals(psp1, null));
        jasts_1.TestBoolean.false("nameCollectable psp1 undefined", nameCollectable.equals(psp1, undefined));
        jasts_1.TestBoolean.false("nameCollectable null psp1", nameCollectable.equals(null, psp1));
        jasts_1.TestBoolean.false("nameCollectable undefined psp1", nameCollectable.equals(undefined, psp1));
        jasts_1.TestBoolean.true("nameCollectable null null", nameCollectable.equals(null, null));
        jasts_1.TestBoolean.true("nameCollectable undefined undefined", nameCollectable.equals(undefined, undefined));
        jasts_1.TestBoolean.false("nameCollectable null undefined", nameCollectable.equals(null, undefined));
        jasts_1.TestBoolean.false("nameCollectable undefined null", nameCollectable.equals(undefined, null));
    });
    it("Dynamic Collectable skuNameCollectable", function () {
        var skuNameCollectable = Collections_1.Collections.dynamicCollectable("sku", "name");
        // skuNameCollectable will differentiate psp1 psp2 psp3 psp1copy psp2copy
        jasts_1.TestBoolean.false("skuNameCollectable psp1 psp2", skuNameCollectable.equals(psp1, psp2));
        jasts_1.TestBoolean.false("skuNameCollectable psp1 psp3", skuNameCollectable.equals(psp1, psp3));
        jasts_1.TestBoolean.false("skuNameCollectable psp1 psp1copy", skuNameCollectable.equals(psp1, psp1copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp1 psp2copy", skuNameCollectable.equals(psp1, psp2copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp2 psp3", skuNameCollectable.equals(psp2, psp3));
        jasts_1.TestBoolean.false("skuNameCollectable psp2 psp1copy", skuNameCollectable.equals(psp2, psp1copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp2 psp2copy", skuNameCollectable.equals(psp2, psp2copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp2 psp3copy", skuNameCollectable.equals(psp2, psp3copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp3 psp1copy", skuNameCollectable.equals(psp3, psp1copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp3 psp2copy", skuNameCollectable.equals(psp3, psp2copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp3 psp3copy", skuNameCollectable.equals(psp3, psp3copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp1copy psp2copy", skuNameCollectable.equals(psp1copy, psp2copy));
        jasts_1.TestBoolean.false("skuNameCollectable psp1copy psp3copy", skuNameCollectable.equals(psp1copy, psp3copy));
        // nameCollectable cannot differentiate psp1 and psp3copy
        jasts_1.TestBoolean.true("nameCollectable psp1 psp3copy", skuNameCollectable.equals(psp1, psp3copy));
        // Compare vs null and undefined
        jasts_1.TestBoolean.false("skuNameCollectable psp1 null", skuNameCollectable.equals(psp1, null));
        jasts_1.TestBoolean.false("skuNameCollectable psp1 undefined", skuNameCollectable.equals(psp1, undefined));
        jasts_1.TestBoolean.false("skuNameCollectable null psp1", skuNameCollectable.equals(null, psp1));
        jasts_1.TestBoolean.false("skuNameCollectable undefined psp1", skuNameCollectable.equals(undefined, psp1));
        jasts_1.TestBoolean.true("skuNameCollectable null null", skuNameCollectable.equals(null, null));
        jasts_1.TestBoolean.true("skuNameCollectable undefined undefined", skuNameCollectable.equals(undefined, undefined));
        jasts_1.TestBoolean.false("skuNameCollectable null undefined", skuNameCollectable.equals(null, undefined));
        jasts_1.TestBoolean.false("skuNameCollectable undefined null", skuNameCollectable.equals(undefined, null));
    });
    it("Dynamic Collectable null and undefined fields", function () {
        var skuNameCollectable = Collections_1.Collections.dynamicCollectable("sku", "name");
        jasts_1.TestBoolean.false("skuNameCollectable psp1 null", skuNameCollectable.equals(psp1, pspnull));
        jasts_1.TestBoolean.false("skuNameCollectable psp2 null", skuNameCollectable.equals(psp2, pspnull));
        jasts_1.TestBoolean.false("skuNameCollectable psp3 null", skuNameCollectable.equals(psp3, pspnull));
        jasts_1.TestBoolean.false("skuNameCollectable psp1 undefined", skuNameCollectable.equals(psp1, pspundefined));
        jasts_1.TestBoolean.false("skuNameCollectable psp2 undefined", skuNameCollectable.equals(psp2, pspundefined));
        jasts_1.TestBoolean.false("skuNameCollectable psp3 undefined", skuNameCollectable.equals(psp3, pspundefined));
        jasts_1.TestBoolean.false("skuNameCollectable undefined null", skuNameCollectable.equals(pspundefined, pspnull));
        jasts_1.TestBoolean.false("skuNameCollectable null undefined", skuNameCollectable.equals(pspnull, pspundefined));
        jasts_1.TestBoolean.true("skuNameCollectable null null", skuNameCollectable.equals(pspnull, pspnull));
        jasts_1.TestBoolean.true("skuNameCollectable undefined undefined", skuNameCollectable.equals(pspundefined, pspundefined));
    });
    it("Dynamic Hashable skuHashable", function () {
        var skuHashable = Collections_1.Collections.dynamicHashable("sku");
        // SkuHashable will differentiate psp1 psp2 psp3
        jasts_1.TestBoolean.false("skuHashable psp1 psp2", skuHashable.equals(psp1, psp2));
        jasts_1.TestBoolean.false("skuHashable psp1 psp3", skuHashable.equals(psp1, psp3));
        jasts_1.TestBoolean.false("skuHashable psp2 psp3", skuHashable.equals(psp2, psp3));
        // SkuHashable cannot differentiate psp1 psp1copy and psp3copy
        jasts_1.TestBoolean.true("skuHashable psp1 psp1copy", skuHashable.equals(psp1, psp1copy));
        jasts_1.TestBoolean.true("skuHashable psp1 psp3copy", skuHashable.equals(psp1, psp3copy));
        // The others will be differentiated
        jasts_1.TestBoolean.false("skuHashable psp1copy psp2", skuHashable.equals(psp1copy, psp2));
        jasts_1.TestBoolean.false("skuHashable psp1copy psp3", skuHashable.equals(psp1copy, psp3));
        jasts_1.TestBoolean.false("skuHashable psp3copy psp2", skuHashable.equals(psp3copy, psp2));
        jasts_1.TestBoolean.false("skuHashable psp3copy psp3", skuHashable.equals(psp3copy, psp3));
        // Compare vs null and undefined
        jasts_1.TestBoolean.false("skuHashable psp1 null", skuHashable.equals(psp1, null));
        jasts_1.TestBoolean.false("skuHashable psp1 undefined", skuHashable.equals(psp1, undefined));
        jasts_1.TestBoolean.false("skuHashable null psp1", skuHashable.equals(null, psp1));
        jasts_1.TestBoolean.false("skuHashable undefined psp1", skuHashable.equals(undefined, psp1));
        jasts_1.TestBoolean.true("skuHashable null null", skuHashable.equals(null, null));
        jasts_1.TestBoolean.true("skuHashable undefined undefined", skuHashable.equals(undefined, undefined));
        jasts_1.TestBoolean.false("skuHashable null undefined", skuHashable.equals(null, undefined));
        jasts_1.TestBoolean.false("skuHashable undefined null", skuHashable.equals(undefined, null));
    });
    it("Dynamic Hashable nameHashable", function () {
        var nameHashable = Collections_1.Collections.dynamicHashable("name");
        // NameHashable will differentiate psp1 psp2 psp3
        jasts_1.TestBoolean.false("nameHashable psp1 psp2", nameHashable.equals(psp1, psp2));
        jasts_1.TestBoolean.false("nameHashable psp1 psp3", nameHashable.equals(psp1, psp3));
        jasts_1.TestBoolean.false("nameHashable psp2 psp3", nameHashable.equals(psp2, psp3));
        // nameHashable cannot differentiate psp2 and psp2copy
        jasts_1.TestBoolean.true("nameHashable psp2 psp2copy", nameHashable.equals(psp2, psp2copy));
        // The others will be differentiated
        jasts_1.TestBoolean.false("nameHashable psp2copy psp1", nameHashable.equals(psp2copy, psp1));
        jasts_1.TestBoolean.false("nameHashable psp2copy psp3", nameHashable.equals(psp2copy, psp3));
        // Compare vs null and undefined
        jasts_1.TestBoolean.false("nameHashable psp1 null", nameHashable.equals(psp1, null));
        jasts_1.TestBoolean.false("nameHashable psp1 undefined", nameHashable.equals(psp1, undefined));
        jasts_1.TestBoolean.false("nameHashable null psp1", nameHashable.equals(null, psp1));
        jasts_1.TestBoolean.false("nameHashable undefined psp1", nameHashable.equals(undefined, psp1));
        jasts_1.TestBoolean.true("nameHashable null null", nameHashable.equals(null, null));
        jasts_1.TestBoolean.true("nameHashable undefined undefined", nameHashable.equals(undefined, undefined));
        jasts_1.TestBoolean.false("nameHashable null undefined", nameHashable.equals(null, undefined));
        jasts_1.TestBoolean.false("nameHashable undefined null", nameHashable.equals(undefined, null));
    });
    it("Dynamic Hashable skuNameHashable", function () {
        var skuNameHashable = Collections_1.Collections.dynamicHashable("sku", "name");
        // skuNameHashable will differentiate psp1 psp2 psp3 psp1copy psp2copy
        jasts_1.TestBoolean.false("skuNameHashable psp1 psp2", skuNameHashable.equals(psp1, psp2));
        jasts_1.TestBoolean.false("skuNameHashable psp1 psp3", skuNameHashable.equals(psp1, psp3));
        jasts_1.TestBoolean.false("skuNameHashable psp1 psp1copy", skuNameHashable.equals(psp1, psp1copy));
        jasts_1.TestBoolean.false("skuNameHashable psp1 psp2copy", skuNameHashable.equals(psp1, psp2copy));
        jasts_1.TestBoolean.false("skuNameHashable psp2 psp3", skuNameHashable.equals(psp2, psp3));
        jasts_1.TestBoolean.false("skuNameHashable psp2 psp1copy", skuNameHashable.equals(psp2, psp1copy));
        jasts_1.TestBoolean.false("skuNameHashable psp2 psp2copy", skuNameHashable.equals(psp2, psp2copy));
        jasts_1.TestBoolean.false("skuNameHashable psp2 psp3copy", skuNameHashable.equals(psp2, psp3copy));
        jasts_1.TestBoolean.false("skuNameHashable psp3 psp1copy", skuNameHashable.equals(psp3, psp1copy));
        jasts_1.TestBoolean.false("skuNameHashable psp3 psp2copy", skuNameHashable.equals(psp3, psp2copy));
        jasts_1.TestBoolean.false("skuNameHashable psp3 psp3copy", skuNameHashable.equals(psp3, psp3copy));
        jasts_1.TestBoolean.false("skuNameHashable psp1copy psp2copy", skuNameHashable.equals(psp1copy, psp2copy));
        jasts_1.TestBoolean.false("skuNameHashable psp1copy psp3copy", skuNameHashable.equals(psp1copy, psp3copy));
        // nameHashable cannot differentiate psp1 and psp3copy
        jasts_1.TestBoolean.true("nameHashable psp1 psp3copy", skuNameHashable.equals(psp1, psp3copy));
        // Compare vs null and undefined
        jasts_1.TestBoolean.false("skuNameHashable psp1 null", skuNameHashable.equals(psp1, null));
        jasts_1.TestBoolean.false("skuNameHashable psp1 undefined", skuNameHashable.equals(psp1, undefined));
        jasts_1.TestBoolean.false("skuNameHashable null psp1", skuNameHashable.equals(null, psp1));
        jasts_1.TestBoolean.false("skuNameHashable undefined psp1", skuNameHashable.equals(undefined, psp1));
        jasts_1.TestBoolean.true("skuNameHashable null null", skuNameHashable.equals(null, null));
        jasts_1.TestBoolean.true("skuNameHashable undefined undefined", skuNameHashable.equals(undefined, undefined));
        jasts_1.TestBoolean.false("skuNameHashable null undefined", skuNameHashable.equals(null, undefined));
        jasts_1.TestBoolean.false("skuNameHashable undefined null", skuNameHashable.equals(undefined, null));
    });
    it("Dynamic Hashable null and undefined fields", function () {
        var skuNameHashable = Collections_1.Collections.dynamicHashable("sku", "name");
        jasts_1.TestBoolean.false("skuNameHashable psp1 null", skuNameHashable.equals(psp1, pspnull));
        jasts_1.TestBoolean.false("skuNameHashable psp2 null", skuNameHashable.equals(psp2, pspnull));
        jasts_1.TestBoolean.false("skuNameHashable psp3 null", skuNameHashable.equals(psp3, pspnull));
        jasts_1.TestBoolean.false("skuNameHashable psp1 undefined", skuNameHashable.equals(psp1, pspundefined));
        jasts_1.TestBoolean.false("skuNameHashable psp2 undefined", skuNameHashable.equals(psp2, pspundefined));
        jasts_1.TestBoolean.false("skuNameHashable psp3 undefined", skuNameHashable.equals(psp3, pspundefined));
        jasts_1.TestBoolean.false("skuNameHashable undefined null", skuNameHashable.equals(pspundefined, pspnull));
        jasts_1.TestBoolean.false("skuNameHashable null undefined", skuNameHashable.equals(pspnull, pspundefined));
        jasts_1.TestBoolean.true("skuNameHashable null null", skuNameHashable.equals(pspnull, pspnull));
        jasts_1.TestBoolean.true("skuNameHashable undefined undefined", skuNameHashable.equals(pspundefined, pspundefined));
    });
    it("Dynamic Hashable hascode", function () {
        var nameHashable = Collections_1.Collections.dynamicHashable("name");
        jasts_2.TestNumber.equals("undefined hashcode is zero", nameHashable.hashCode(undefined), 0);
        jasts_2.TestNumber.equals("null hashcode is zero", nameHashable.hashCode(null), 0);
        jasts_2.TestNumber.notEquals("psp1 hashcode is non-zero", nameHashable.hashCode(psp1), 0);
        jasts_2.TestNumber.notEquals("psp2 hashcode is non-zero", nameHashable.hashCode(psp2), 0);
        jasts_2.TestNumber.notEquals("psp3 hashcode is non-zero", nameHashable.hashCode(psp3), 0);
    });
});
/*
 * This class is a simple class that the default Collectable
 * will properly handle.
 * The copy instances below are to test the dynamicCollectable method
 */
var PetStoreProduct = /** @class */ (function () {
    function PetStoreProduct(isku, iname, ibrand) {
        this.sku = isku;
        this.name = iname;
        this.brand = ibrand;
    }
    return PetStoreProduct;
}());
var psp1 = new PetStoreProduct(1, "A", "A");
var psp2 = new PetStoreProduct(2, "B", "B");
var psp3 = new PetStoreProduct(3, "C", "C");
var psp1copy = new PetStoreProduct(1, "D", "D"); // duplicate sku
var psp2copy = new PetStoreProduct(5, "B", "E"); // duplicate product name
var psp3copy = new PetStoreProduct(1, "A", "F"); // duplicate sku and product name
var pspnull = new PetStoreProduct(null, null, null);
var pspundefined = new PetStoreProduct(undefined, undefined, undefined);
