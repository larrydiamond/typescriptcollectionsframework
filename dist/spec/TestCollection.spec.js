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
var NavigableHash_1 = require("../src/NavigableHash");
var PriorityQueue_1 = require("../src/PriorityQueue");
var SkipList_1 = require("../src/SkipList");
var TreeSet_1 = require("../src/TreeSet");
var jasts_1 = require("jasts");
describe("Test Collection", function () {
    it("Test empty string Collections", function () {
        testEmptyStringCollection(new ArrayList_1.ArrayList(), "ArrayList");
        testEmptyStringCollection(new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable()), "ArrayList AllFieldCollectable");
        testEmptyStringCollection(new LinkedList_1.LinkedList(), "LinkedList");
        testEmptyStringCollection(new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable()), "LinkedList AllFieldCollectable");
        testEmptyStringCollection(new HashSet_1.HashSet(), "HashSet");
        testEmptyStringCollection(new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable()), "HashSet AllFieldHashable");
        testEmptyStringCollection(Collections_1.Collections.emptyList(), "EmptyList");
        testEmptyStringCollection(Collections_1.Collections.emptySet(), "EmptySet");
        testEmptyStringCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()), "NavigableHashSet");
        testEmptyStringCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()), "SkipListSet");
        testEmptyStringCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()), "TreeSet");
        testEmptyStringCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getStringComparator()), "PriorityQueue");
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
        testEmptyNumberCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testEmptyNumberCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testEmptyNumberCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testEmptyNumberCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getNumberComparator()));
    });
    it("Test add one item to string Collections", function () {
        var al = new ArrayList_1.ArrayList();
        var ll = new LinkedList_1.LinkedList();
        var hs = new HashSet_1.HashSet();
        var alc = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var llc = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        var hsc = new HashSet_1.HashSet(new AllFieldHashable_1.AllFieldHashable());
        testAddOneItemToStringCollection(al, "ArrayList");
        testAddOneItemToStringCollection(ll, "LinkedList");
        testAddOneItemToStringCollection(hs, "HashSet");
        testAddOneItemToStringCollection(alc, "ArrayList AllFieldCollectable");
        testAddOneItemToStringCollection(llc, "LinkedList AllFieldCollectable");
        testAddOneItemToStringCollection(hsc, "HashSet AllFieldCollectable");
        testAddOneItemToStringCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()), "NavigableHashSet StringComparator");
        testAddOneItemToStringCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()), "SkipListSet StringComparator");
        testAddOneItemToStringCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()), "TreeSet StringComparator");
        testAddOneItemToStringCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getStringComparator()), "PriorityQueue StringComparator");
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
        testAddOneItemToNumberCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testAddOneItemToNumberCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testAddOneItemToNumberCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testAddOneItemToNumberCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getNumberComparator()));
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
        testAddTwoItemsToStringCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testAddTwoItemsToStringCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testAddTwoItemsToStringCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testAddTwoItemsToStringCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getStringComparator()));
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
        testAddTwoItemsToNumberCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testAddTwoItemsToNumberCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testAddTwoItemsToNumberCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testAddTwoItemsToNumberCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getNumberComparator()));
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
        testAddItemsToStringCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getStringComparator()));
        testAddItemsToStringCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getStringComparator()));
        testAddItemsToStringCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getStringComparator()));
        testAddItemsToStringCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getStringComparator()));
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
        testAddItemsToNumberCollection(new NavigableHash_1.NavigableHashSet(Collections_1.Collections.getNumberComparator()));
        testAddItemsToNumberCollection(new SkipList_1.SkipListSet(Collections_1.Collections.getNumberComparator()));
        testAddItemsToNumberCollection(new TreeSet_1.TreeSet(Collections_1.Collections.getNumberComparator()));
        testAddItemsToNumberCollection(new PriorityQueue_1.PriorityQueue(Collections_1.Collections.getNumberComparator()));
    });
});
function addTestNumbers(coll) {
    expect(coll.add(100)).toEqual(true);
    expect(coll.add(200)).toEqual(true);
    expect(coll.add(300)).toEqual(true);
    expect(coll.add(400)).toEqual(true);
    expect(coll.add(500)).toEqual(true);
    expect(coll.add(600)).toEqual(true);
    expect(coll.add(700)).toEqual(true);
    expect(coll.add(800)).toEqual(true);
    expect(coll.add(900)).toEqual(true);
    expect(coll.add(1000)).toEqual(true);
}
function addTestStrings(coll) {
    expect(coll.add("first")).toEqual(true);
    expect(coll.add("second")).toEqual(true);
    expect(coll.add("third")).toEqual(true);
    expect(coll.add("fourth")).toEqual(true);
    expect(coll.add("fifth")).toEqual(true);
    expect(coll.add("sixth")).toEqual(true);
    expect(coll.add("seventh")).toEqual(true);
    expect(coll.add("eighth")).toEqual(true);
    expect(coll.add("ninth")).toEqual(true);
    expect(coll.add("tenth")).toEqual(true);
}
var failActionString = {
    accept: function (element) {
        fail('Unwanted code branch in testEmptyStringCollection');
        throw new Error('Unwanted code branch in testEmptyStringCollection');
    }
};
function testEmptyStringCollection(coll, typestring) {
    jasts_1.TestBoolean.true("Expect empty string collection isEmpty true " + typestring, coll.isEmpty());
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    jasts_1.TestBoolean.false("Empty string collection will not contain blah " + typestring, coll.contains("blah"));
    for (var iter = coll.iterator(); iter.hasNext();) {
        fail('Unwanted code branch in testEmptyStringCollection');
        throw new Error('Unwanted code branch in testEmptyStringCollection');
    }
    var i = coll[Symbol.iterator]();
    var ir = i.next();
    expect(ir.done).toEqual(true);
    coll.forEach(failActionString);
    jasts_1.TestString.equals("Empty array should stringify to []", JSON.stringify(coll), '"[]"');
}
var failActionNumber = {
    accept: function (element) {
        fail('Unwanted code branch in testEmptyNumberCollection');
        throw new Error('Unwanted code branch in testEmptyNumberCollection');
    }
};
function testEmptyNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.contains(500)).toEqual(false);
    for (var iter = coll.iterator(); iter.hasNext();) {
        fail('Unwanted code branch in testEmptyNumberCollection');
        throw new Error('Unwanted code branch in testEmptyNumberCollection');
    }
    var i = coll[Symbol.iterator]();
    var ir = i.next();
    expect(ir.done).toEqual(true);
    coll.forEach(failActionNumber);
    jasts_1.TestString.equals("Empty array should stringify to []", JSON.stringify(coll), '"[]"');
}
function testAddOneItemToStringCollection(coll, typestring) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    coll.clear();
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.add("blah")).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(1);
    var testCount = 0;
    coll.forEach({ accept: function (element) { testCount = testCount + 1; } });
    expect(testCount).toEqual(1);
    jasts_1.TestString.equals("One element array should stringify to [blah]", JSON.stringify(coll), '"[\\"blah\\"]"');
}
function testAddOneItemToNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    coll.clear();
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    expect(coll.add(100)).toEqual(true);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(1);
    var testCount = 0;
    coll.forEach({ accept: function (element) { testCount = testCount + 1; } });
    expect(testCount).toEqual(1);
    jasts_1.TestString.equals("One element array should stringify to [100]", JSON.stringify(coll), '"[100]"');
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
    var testCount = 0;
    coll.forEach({ accept: function (element) { testCount = testCount + 1; } });
    expect(testCount).toEqual(2);
    coll.clear();
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
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
    var testCount = 0;
    coll.forEach({ accept: function (element) { testCount = testCount + 1; } });
    expect(testCount).toEqual(2);
    coll.clear();
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
}
function testAddItemsToStringCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    addTestStrings(coll);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(10);
    expect(coll.contains("notfound")).toEqual(false);
    expect(coll.contains("sixth")).toEqual(true);
    var testCount = 0;
    coll.forEach({ accept: function (element) { testCount = testCount + 1; } });
    expect(testCount).toEqual(10);
}
function testAddItemsToNumberCollection(coll) {
    expect(coll.isEmpty()).toEqual(true);
    expect(coll.size()).toEqual(0);
    addTestNumbers(coll);
    expect(coll.isEmpty()).toEqual(false);
    expect(coll.size()).toEqual(10);
    expect(coll.contains(31415926553)).toEqual(false);
    expect(coll.contains(500)).toEqual(true);
    var testCount = 0;
    coll.forEach({ accept: function (element) { testCount = testCount + 1; } });
    expect(testCount).toEqual(10);
}
