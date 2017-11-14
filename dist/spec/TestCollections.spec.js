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
describe("Test Collections static methods", function () {
    it("getStringComparator compare with self", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_1.TestNumber.equals("Comparing something with itself returns 0", comp.compare("something", "something"), 0);
        jasts_1.TestNumber.equals("Comparing null with itself returns 0", comp.compare(null, null), 0);
        jasts_1.TestNumber.equals("Comparing undefined with itself returns 0", comp.compare(undefined, undefined), 0);
    });
    it("getStringComparator compare with undefined", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_1.TestNumber.equals("Comparing undefined vs undefined returns 0", comp.compare(undefined, undefined), 0);
        jasts_1.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_1.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, "something"), -1);
        jasts_1.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_1.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare("something", undefined), 1);
    });
    it("getStringComparator compare with null", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_1.TestNumber.equals("Comparing null vs null returns 0", comp.compare(null, null), 0);
        jasts_1.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_1.TestNumber.equals("Comparing something vs null returns 1", comp.compare("something", null), 1);
        jasts_1.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_1.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, "something"), -1);
    });
    it("getStringComparator compare with a real string", function () {
        var comp = Collections_1.Collections.getStringComparator();
        jasts_1.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, "something"), -1);
        jasts_1.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, "something"), -1);
        jasts_1.TestNumber.equals("Comparing something vs null returns 1", comp.compare("something", null), 1);
        jasts_1.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare("something", undefined), 1);
        jasts_1.TestNumber.equals("Comparing a lower string vs a higher string returns -1", comp.compare("AAA", "BBB"), -1);
        jasts_1.TestNumber.equals("Comparing a higher string vs a lower string returns 1", comp.compare("CCC", "BBB"), 1);
        jasts_1.TestNumber.equals("Comparing a string vs itself returns 0", comp.compare("DDD", "DDD"), 0);
    });
    it("getNumberComparator compare with self", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_1.TestNumber.equals("Comparing something with itself returns 0", comp.compare(50, 50), 0);
        jasts_1.TestNumber.equals("Comparing null with itself returns 0", comp.compare(null, null), 0);
        jasts_1.TestNumber.equals("Comparing undefined with itself returns 0", comp.compare(undefined, undefined), 0);
    });
    it("getNumberComparator compare with undefined", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_1.TestNumber.equals("Comparing undefined vs undefined returns 0", comp.compare(undefined, undefined), 0);
        jasts_1.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_1.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, 50), -1);
        jasts_1.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_1.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare(50, undefined), 1);
    });
    it("getNumberComparator compare with null", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_1.TestNumber.equals("Comparing null vs null returns 0", comp.compare(null, null), 0);
        jasts_1.TestNumber.equals("Comparing undefined vs null returns -1", comp.compare(undefined, null), -1);
        jasts_1.TestNumber.equals("Comparing something vs null returns 1", comp.compare(50, null), 1);
        jasts_1.TestNumber.equals("Comparing null vs undefined returns 1", comp.compare(null, undefined), 1);
        jasts_1.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, 50), -1);
    });
    it("getNumberComparator compare with a real string", function () {
        var comp = Collections_1.Collections.getNumberComparator();
        jasts_1.TestNumber.equals("Comparing undefined vs something returns -1", comp.compare(undefined, 50), -1);
        jasts_1.TestNumber.equals("Comparing null vs something returns -1", comp.compare(null, 50), -1);
        jasts_1.TestNumber.equals("Comparing something vs null returns 1", comp.compare(50, null), 1);
        jasts_1.TestNumber.equals("Comparing something vs undefined returns 1", comp.compare(50, undefined), 1);
        jasts_1.TestNumber.equals("Comparing a lower number vs a higher number returns -1", comp.compare(10, 100), -1);
        jasts_1.TestNumber.equals("Comparing a higher number vs a lower number returns 1", comp.compare(200, 20), 1);
        jasts_1.TestNumber.equals("Comparing a number vs itself returns 0", comp.compare(1000, 1000), 0);
    });
    it("getHashCodeForString undefined", function () {
        jasts_1.TestNumber.equals("undefined hash code is zero", Collections_1.Collections.getHashCodeForString(undefined), 0);
    });
    it("getHashCodeForString null", function () {
        jasts_1.TestNumber.equals("null hash code is zero", Collections_1.Collections.getHashCodeForString(null), 0);
    });
    it("getHashCodeForStrings undefined", function () {
        jasts_1.TestNumber.equals("undefined hash code is zero", Collections_1.Collections.getHashCodeForStrings(undefined), 0);
    });
    it("getHashCodeForStrings null", function () {
        jasts_1.TestNumber.equals("null hash code is zero", Collections_1.Collections.getHashCodeForStrings(null), 0);
    });
    it("getHashCodeForNumber undefined", function () {
        jasts_1.TestNumber.equals("undefined hash code is zero", Collections_1.Collections.getHashCodeForNumber(undefined), 0);
    });
    it("getHashCodeForNumber null", function () {
        jasts_1.TestNumber.equals("null hash code is zero", Collections_1.Collections.getHashCodeForNumber(null), 0);
    });
});
