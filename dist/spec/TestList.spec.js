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
});
function testEmptyStringList(list) {
    expect(list.isEmpty()).toEqual(true);
    expect(list.size()).toEqual(0);
}
function testEmptyNumberList(list) {
    expect(list.isEmpty()).toEqual(true);
    expect(list.size()).toEqual(0);
}
