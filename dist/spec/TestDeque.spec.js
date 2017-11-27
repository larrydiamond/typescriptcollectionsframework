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
var ArrayList_1 = require("../src/ArrayList");
var LinkedList_1 = require("../src/LinkedList");
var jasts_1 = require("jasts");
describe("Test Deque functionality", function () {
    it("Test empty Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testEmptyDeque(al, "ArrayList");
        testEmptyDeque(ll, "LinkedList");
    });
    it("Test adding first items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testAddFirstToDeque(al, "ArrayList");
        testAddFirstToDeque(ll, "LinkedList");
    });
    it("Test adding last items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testAddLastToDeque(al, "ArrayList");
        testAddLastToDeque(ll, "LinkedList");
    });
    it("Test offering first items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testOfferFirstToDeque(al, "ArrayList");
        testOfferFirstToDeque(ll, "LinkedList");
    });
    it("Test offering last items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testOfferLastToDeque(al, "ArrayList");
        testOfferLastToDeque(ll, "LinkedList");
    });
});
function testEmptyDeque(Deque, prefix) {
    jasts_1.TestNumber.equals(prefix + " size should initially be zero", Deque.size(), 0);
    jasts_1.TestString.undefined(prefix + " removeFirst returns undefined for empty Deque", Deque.removeFirst());
    jasts_1.TestString.undefined(prefix + " removeLast returns undefined for empty Deque", Deque.removeLast());
    jasts_1.TestString.null(prefix + " pollFirst returns null for empty Deque", Deque.pollFirst());
    jasts_1.TestString.null(prefix + " pollLast returns null for empty Deque", Deque.pollLast());
    jasts_1.TestString.undefined(prefix + " getFirst returns undefined for empty Deque", Deque.getFirst());
    jasts_1.TestString.undefined(prefix + " getLast returns undefined for empty Deque", Deque.getLast());
    jasts_1.TestString.null(prefix + " peekFirst returns null for empty Deque", Deque.peekFirst());
    jasts_1.TestString.null(prefix + " peekLast returns null for empty Deque", Deque.peekLast());
    jasts_1.TestNumber.equals(prefix + " size should still be zero", Deque.size(), 0);
    jasts_1.TestString.undefined(prefix + " second removeFirst returns undefined for empty Deque", Deque.removeFirst());
    jasts_1.TestString.undefined(prefix + " second removeLast returns undefined for empty Deque", Deque.removeLast());
    jasts_1.TestString.null(prefix + " second pollFirst returns null for empty Deque", Deque.pollFirst());
    jasts_1.TestString.null(prefix + " second pollLast returns null for empty Deque", Deque.pollLast());
    jasts_1.TestString.undefined(prefix + " second getFirst returns undefined for empty Deque", Deque.getFirst());
    jasts_1.TestString.undefined(prefix + " second getLast returns undefined for empty Deque", Deque.getLast());
    jasts_1.TestString.null(prefix + " second peekFirst returns null for empty Deque", Deque.peekFirst());
    jasts_1.TestString.null(prefix + " second peekLast returns null for empty Deque", Deque.peekLast());
    jasts_1.TestNumber.equals(prefix + " size should be zero", Deque.size(), 0);
}
function testAddFirstToDeque(Deque, prefix) {
    jasts_1.TestNumber.equals(prefix + " size should be zero", Deque.size(), 0);
    jasts_1.TestBoolean.true(prefix + " addFirst should return true", Deque.addFirst("first"));
    jasts_1.TestNumber.equals(prefix + " size should be one", Deque.size(), 1);
    jasts_1.TestString.equals(prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestNumber.equals(prefix + " preremove size should be one", Deque.size(), 1);
    jasts_1.TestString.equals(prefix + " removeFirst should return first for one element Deque", Deque.removeFirst(), "first");
    jasts_1.TestNumber.equals(prefix + " preremove size should be zero", Deque.size(), 0);
    testEmptyDeque(Deque, "testAddFirstToDeque-" + prefix);
}
function testAddLastToDeque(Deque, prefix) {
    jasts_1.TestBoolean.true(prefix + " addLast should return true", Deque.addLast("first"));
    jasts_1.TestString.equals(prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " removeLast should return first for one element Deque", Deque.removeLast(), "first");
    testEmptyDeque(Deque, prefix);
}
function testOfferFirstToDeque(Deque, prefix) {
    jasts_1.TestBoolean.true(prefix + " offerFirst should return true", Deque.offerFirst("first"));
    jasts_1.TestString.equals(prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " pollFirst should return first for one element Deque", Deque.pollFirst(), "first");
    testEmptyDeque(Deque, prefix);
}
function testOfferLastToDeque(Deque, prefix) {
    jasts_1.TestBoolean.true(prefix + " offerLast should return true", Deque.offerLast("first"));
    jasts_1.TestString.equals(prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " pollLast should return first for one element Deque", Deque.pollLast(), "first");
    testEmptyDeque(Deque, prefix);
}
