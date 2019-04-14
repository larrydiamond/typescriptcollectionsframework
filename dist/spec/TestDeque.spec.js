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
var EvictingDeque_1 = require("../src/EvictingDeque");
describe("Test Deque functionality", function () {
    it("Test empty Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testEmptyDeque(al, "ArrayList");
        testEmptyDeque(ll, "LinkedList");
        testEmptyDeque(new EvictingDeque_1.EvictingDeque(1000, new AllFieldCollectable_1.AllFieldCollectable()), "EvictingDeque");
    });
    it("Test adding first items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testAddFirstToDeque(al, "ArrayList");
        testAddFirstToDeque(ll, "LinkedList");
        testAddFirstToDeque(new EvictingDeque_1.EvictingDeque(1000, new AllFieldCollectable_1.AllFieldCollectable()), "EvictingDeque");
    });
    it("Test adding last items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testAddLastToDeque(al, "ArrayList");
        testAddLastToDeque(ll, "LinkedList");
        testAddLastToDeque(new EvictingDeque_1.EvictingDeque(1000, new AllFieldCollectable_1.AllFieldCollectable()), "EvictingDeque");
    });
    it("Test offering first items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testOfferFirstToDeque(al, "ArrayList");
        testOfferFirstToDeque(ll, "LinkedList");
        testOfferFirstToDeque(new EvictingDeque_1.EvictingDeque(1000, new AllFieldCollectable_1.AllFieldCollectable()), "EvictingDeque");
    });
    it("Test offering last items to Deques", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new LinkedList_1.LinkedList(new AllFieldCollectable_1.AllFieldCollectable());
        testOfferLastToDeque(al, "ArrayList");
        testOfferLastToDeque(ll, "LinkedList");
        testOfferLastToDeque(new EvictingDeque_1.EvictingDeque(1000, new AllFieldCollectable_1.AllFieldCollectable()), "EvictingDeque");
    });
});
function testEmptyDeque(deque, prefix) {
    jasts_1.TestNumber.equals(prefix + " size should initially be zero", deque.size(), 0);
    jasts_1.TestString.undefined(prefix + " removeFirst returns undefined for empty deque", deque.removeFirst());
    jasts_1.TestString.undefined(prefix + " removeLast returns undefined for empty deque", deque.removeLast());
    jasts_1.TestString.null(prefix + " pollFirst returns null for empty deque", deque.pollFirst());
    jasts_1.TestString.null(prefix + " pollLast returns null for empty deque", deque.pollLast());
    jasts_1.TestString.undefined(prefix + " getFirst returns undefined for empty deque", deque.getFirst());
    jasts_1.TestString.undefined(prefix + " getLast returns undefined for empty deque", deque.getLast());
    jasts_1.TestString.null(prefix + " peekFirst returns null for empty deque", deque.peekFirst());
    jasts_1.TestString.null(prefix + " peekLast returns null for empty deque", deque.peekLast());
    jasts_1.TestNumber.equals(prefix + " size should still be zero", deque.size(), 0);
    jasts_1.TestString.undefined(prefix + " second removeFirst returns undefined for empty deque", deque.removeFirst());
    jasts_1.TestString.undefined(prefix + " second removeLast returns undefined for empty deque", deque.removeLast());
    jasts_1.TestString.null(prefix + " second pollFirst returns null for empty deque", deque.pollFirst());
    jasts_1.TestString.null(prefix + " second pollLast returns null for empty deque", deque.pollLast());
    jasts_1.TestString.undefined(prefix + " second getFirst returns undefined for empty deque", deque.getFirst());
    jasts_1.TestString.undefined(prefix + " second getLast returns undefined for empty deque", deque.getLast());
    jasts_1.TestString.null(prefix + " second peekFirst returns null for empty deque", deque.peekFirst());
    jasts_1.TestString.null(prefix + " second peekLast returns null for empty deque", deque.peekLast());
    jasts_1.TestNumber.equals(prefix + " size should be zero", deque.size(), 0);
}
function testAddFirstToDeque(deque, prefix) {
    jasts_1.TestNumber.equals(prefix + " size should be zero", deque.size(), 0);
    jasts_1.TestBoolean.true(prefix + " addFirst should return true", deque.addFirst("first"));
    jasts_1.TestNumber.equals(prefix + " size should be one", deque.size(), 1);
    jasts_1.TestString.equals(prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestNumber.equals(prefix + " preremove size should be one", deque.size(), 1);
    jasts_1.TestString.equals(prefix + " removeFirst should return first for one element deque", deque.removeFirst(), "first");
    jasts_1.TestNumber.equals(prefix + " preremove size should be zero", deque.size(), 0);
    testEmptyDeque(deque, "testAddFirstToDeque-" + prefix);
}
function testAddLastToDeque(deque, prefix) {
    jasts_1.TestBoolean.true(prefix + " addLast should return true", deque.addLast("first"));
    jasts_1.TestString.equals(prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " removeLast should return first for one element deque", deque.removeLast(), "first");
    testEmptyDeque(deque, prefix);
}
function testOfferFirstToDeque(deque, prefix) {
    jasts_1.TestBoolean.true(prefix + " offerFirst should return true", deque.offerFirst("first"));
    jasts_1.TestString.equals(prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " pollFirst should return first for one element deque", deque.pollFirst(), "first");
    testEmptyDeque(deque, prefix);
}
function testOfferLastToDeque(deque, prefix) {
    jasts_1.TestBoolean.true(prefix + " offerLast should return true", deque.offerLast("first"));
    jasts_1.TestString.equals(prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
    jasts_1.TestString.equals(prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
    jasts_1.TestString.equals(prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
    jasts_1.TestString.equals(prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");
    jasts_1.TestString.equals(prefix + " pollLast should return first for one element deque", deque.pollLast(), "first");
    testEmptyDeque(deque, prefix);
}
