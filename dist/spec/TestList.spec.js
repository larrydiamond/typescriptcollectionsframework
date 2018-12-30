"use strict";
/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptListsframework/LICENSE
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AllFieldCollectable_1 = require("../src/AllFieldCollectable");
var ArrayList_1 = require("../src/ArrayList");
var LinkedList_1 = require("../src/LinkedList");
var jasts_1 = require("jasts");
describe("Test Lists", function () {
    it("Test empty string Lists", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testEmptyStringList(al);
        testEmptyStringList(ll);
        testEmptyStringList(alc);
        testEmptyStringList(llc);
    });
    it("Test empty number Lists", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testEmptyNumberList(al);
        testEmptyNumberList(ll);
        testEmptyNumberList(alc);
        testEmptyNumberList(llc);
    });
    it("Test JSON.stringify for numbers", function () {
        testStringifyNumbers(new ArrayList_1.ArrayList());
        testStringifyNumbers(new LinkedList_1.LinkedList());
        testStringifyNumbers(new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable()));
        testStringifyNumbers(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()));
    });
    it("Test JSON.stringify for strings", function () {
        testStringifyStrings(new ArrayList_1.ArrayList());
        testStringifyStrings(new LinkedList_1.LinkedList());
        testStringifyStrings(new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable()));
        testStringifyStrings(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()));
    });
});
function testEmptyStringList(list) {
    expect(list.isEmpty()).toEqual(true);
    expect(list.size()).toEqual(0);
}
function testEmptyNumberList(list) {
    expect(list.isEmpty()).toEqual(true);
    expect(list.size()).toEqual(0);
}
function testStringifyNumbers(list) {
    expect(list.add(100)).toEqual(true);
    expect(list.add(200)).toEqual(true);
    expect(list.add(300)).toEqual(true);
    expect(list.add(400)).toEqual(true);
    expect(list.add(500)).toEqual(true);
    expect(list.add(600)).toEqual(true);
    expect(list.add(700)).toEqual(true);
    expect(list.add(800)).toEqual(true);
    expect(list.add(900)).toEqual(true);
    expect(list.add(1000)).toEqual(true);
    var tmparray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    jasts_1.TestString.equals("Number list stringify", JSON.stringify(list), JSON.stringify(tmparray));
}
function testStringifyStrings(list) {
    expect(list.add("Cat")).toEqual(true);
    expect(list.add("Dog")).toEqual(true);
    expect(list.add("Bird")).toEqual(true);
    expect(list.add("Fish")).toEqual(true);
    var tmparray = ["Cat", "Dog", "Bird", "Fish"];
    jasts_1.TestString.equals("String list stringify", JSON.stringify(list), JSON.stringify(tmparray));
}
