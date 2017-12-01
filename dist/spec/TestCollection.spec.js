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
var Collections_1 = require("../src/Collections");
var HashSet_1 = require("../src/HashSet");
var LinkedList_1 = require("../src/LinkedList");
describe("Test Collections", function () {
    it("Test empty string Collections", function () {
        testEmptyStringCollection(new ArrayList_1.ArrayList());
        testEmptyStringCollection(new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable()));
        testEmptyStringCollection(new LinkedList_1.LinkedList());
        testEmptyStringCollection(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()));
        testEmptyStringCollection(new HashSet_1.HashSet());
        testEmptyStringCollection(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyStringCollection(Collections_1.Collections.emptyList());
        testEmptyStringCollection(Collections_1.Collections.emptySet());
    });
    it("Test empty number Collections", function () {
        testEmptyNumberCollection(new ArrayList_1.ArrayList());
        testEmptyNumberCollection(new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable()));
        testEmptyNumberCollection(new LinkedList_1.LinkedList());
        testEmptyNumberCollection(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()));
        testEmptyNumberCollection(new HashSet_1.HashSet());
        testEmptyNumberCollection(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()));
        testEmptyNumberCollection(Collections_1.Collections.emptyList());
        testEmptyNumberCollection(Collections_1.Collections.emptySet());
    });
    it("Test add one item to string Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddOneItemToStringCollection(al);
        testAddOneItemToStringCollection(ll);
        testAddOneItemToStringCollection(hs);
        testAddOneItemToStringCollection(alc);
        testAddOneItemToStringCollection(llc);
        testAddOneItemToStringCollection(hsc);
    });
    it("Test add one item to number Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddOneItemToNumberCollection(al);
        testAddOneItemToNumberCollection(ll);
        testAddOneItemToNumberCollection(hs);
        testAddOneItemToNumberCollection(alc);
        testAddOneItemToNumberCollection(llc);
        testAddOneItemToNumberCollection(hsc);
    });
    it("Test add two items to string Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddTwoItemsToStringCollection(al);
        testAddTwoItemsToStringCollection(ll);
        testAddTwoItemsToStringCollection(hs);
        testAddTwoItemsToStringCollection(alc);
        testAddTwoItemsToStringCollection(llc);
        testAddTwoItemsToStringCollection(hsc);
    });
    it("Test add two items to number Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddTwoItemsToNumberCollection(al);
        testAddTwoItemsToNumberCollection(ll);
        testAddTwoItemsToNumberCollection(hs);
        testAddTwoItemsToNumberCollection(alc);
        testAddTwoItemsToNumberCollection(llc);
        testAddTwoItemsToNumberCollection(hsc);
    });
    it("Test add items to string Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddItemsToStringCollection(al);
        testAddItemsToStringCollection(ll);
        testAddItemsToStringCollection(hs);
        testAddItemsToStringCollection(alc);
        testAddItemsToStringCollection(llc);
        testAddItemsToStringCollection(hsc);
    });
    it("Test add items to number Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddItemsToNumberCollection(al);
        testAddItemsToNumberCollection(ll);
        testAddItemsToNumberCollection(hs);
        testAddItemsToNumberCollection(alc);
        testAddItemsToNumberCollection(llc);
        testAddItemsToNumberCollection(hsc);
    });
});
function addTestNumbers(coll) {
    coll.add(100);
    coll.add(200);
    coll.add(300);
    coll.add(400);
    coll.add(500);
    coll.add(600);
    coll.add(700);
    coll.add(800);
    coll.add(900);
    coll.add(1000);
}
function addTestStrings(coll) {
    coll.add("first");
    coll.add("second");
    coll.add("third");
    coll.add("fourth");
    coll.add("fifth");
    coll.add("sixth");
    coll.add("seventh");
    coll.add("eighth");
    coll.add("ninth");
    coll.add("tenth");
}
function testEmptyStringCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.contains("blah")).toEqual(false);
    for (var iter = coll.iterator(); iter.hasNext();) {
        fail();
    }
    var i = coll[Symbol.iterator]();
    var ir = i.next();
    expect(ir.done).toEqual(true);
}
function testEmptyNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.contains(500)).toEqual(false);
    for (var iter = coll.iterator(); iter.hasNext();) {
        fail();
    }
    var i = coll[Symbol.iterator]();
    var ir = i.next();
    expect(ir.done).toEqual(true);
}
function testAddOneItemToStringCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.add("blah")).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(1);
}
function testAddOneItemToNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.add(100)).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(1);
}
function testAddTwoItemsToStringCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.add("blah")).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(1);
    expect(coll.add("more")).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(2);
}
function testAddTwoItemsToNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.add(100)).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(1);
    expect(coll.add(200)).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(2);
}
function testAddItemsToStringCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    addTestStrings(coll);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(10);
}
function testAddItemsToNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    addTestNumbers(coll);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(10);
}
