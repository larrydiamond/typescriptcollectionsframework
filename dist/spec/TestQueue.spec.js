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
var jasts_1 = require("jasts");
describe("Test Queue functionality", function () {
    it("Test empty queues", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        testEmptyQueue(al, "ArrayList");
        testEmptyQueue(ll, "LinkedList");
    });
    it("Test adding items to queues", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        testAddToQueue(al, "ArrayList");
        testAddToQueue(ll, "LinkedList");
    });
    it("Test offering items to queues", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        testOfferToQueue(al, "ArrayList");
        testOfferToQueue(ll, "LinkedList");
    });
    it("Test polling items from queues", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        testPollFromQueue(al, "ArrayList");
        testPollFromQueue(ll, "LinkedList");
    });
    it("Test removing items from queues", function () {
        var al = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        var ll = new ArrayList_1.ArrayList(new AllFieldCollectable_1.AllFieldCollectable());
        testRemoveFromQueue(al, "ArrayList");
        testRemoveFromQueue(ll, "LinkedList");
    });
});
function testEmptyQueue(queue, prefix) {
    jasts_1.TestString.null(prefix + " peek returns null for empty queue", queue.peek());
    jasts_1.TestString.null(prefix + " poll returns null for empty queue", queue.poll());
    jasts_1.TestString.undefined(prefix + " removeQueue returns undefined for empty queue", queue.removeQueue());
    jasts_1.TestString.undefined(prefix + " element returns undefined for empty queue", queue.element());
    jasts_1.TestString.null(prefix + " second peek returns null for empty queue", queue.peek());
    jasts_1.TestString.null(prefix + " second poll returns null for empty queue", queue.poll());
    jasts_1.TestString.undefined(prefix + " second removeQueue returns undefined for empty queue", queue.removeQueue());
    jasts_1.TestString.undefined(prefix + " second element returns undefined for empty queue", queue.element());
}
function testAddToQueue(queue, prefix) {
    jasts_1.TestBoolean.true(prefix + " add should return true", queue.add("first"));
    jasts_1.TestString.equals(prefix + " peek returns first for queue containing only first", queue.peek(), "first");
    jasts_1.TestString.equals(prefix + " element returns first for queue containing only first", queue.element(), "first");
    jasts_1.TestString.equals(prefix + " second peek returns first for queue containing only first", queue.peek(), "first");
    jasts_1.TestString.equals(prefix + " second element returns first for queue containing only first", queue.element(), "first");
}
function testOfferToQueue(queue, prefix) {
    jasts_1.TestBoolean.true(prefix + " offer should return true", queue.offer("first"));
    jasts_1.TestString.equals(prefix + " peek returns first for queue containing only first", queue.peek(), "first");
    jasts_1.TestString.equals(prefix + " element returns first for queue containing only first", queue.element(), "first");
    jasts_1.TestString.equals(prefix + " second peek returns first for queue containing only first", queue.peek(), "first");
    jasts_1.TestString.equals(prefix + " second element returns first for queue containing only first", queue.element(), "first");
}
function testPollFromQueue(queue, prefix) {
    queue.add("first");
    jasts_1.TestString.equals(prefix + " poll returns first for queue containing only first", queue.poll(), "first");
    testEmptyQueue(queue, prefix);
}
function testRemoveFromQueue(queue, prefix) {
    queue.add("first");
    jasts_1.TestString.equals(prefix + " poll returns first for queue containing only first", queue.removeQueue(), "first");
    testEmptyQueue(queue, prefix);
}
