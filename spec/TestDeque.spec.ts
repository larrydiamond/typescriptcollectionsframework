/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldCollectable} from "../src/AllFieldCollectable";
import {ArrayList} from "../src/ArrayList";
import {LinkedList} from "../src/LinkedList";
import {Deque} from "../src/Deque";
import {TestBoolean, TestNumber, TestString} from 'jasts';

describe("Test Deque functionality", function() {

  it("Test empty Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testEmptyDeque(al, "ArrayList");
    testEmptyDeque(ll, "LinkedList");
  });

  it("Test adding first items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testAddFirstToDeque(al, "ArrayList");
    testAddFirstToDeque(ll, "LinkedList");
  });

  it("Test adding last items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testAddLastToDeque(al, "ArrayList");
    testAddLastToDeque(ll, "LinkedList");
  });

  it("Test offering first items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testOfferFirstToDeque(al, "ArrayList");
    testOfferFirstToDeque(ll, "LinkedList");
  });

  it("Test offering last items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testOfferLastToDeque(al, "ArrayList");
    testOfferLastToDeque(ll, "LinkedList");
  });

});

function testEmptyDeque (Deque:Deque<string>, prefix:string) : void {
  TestNumber.equals (prefix + " size should initially be zero", Deque.size(), 0);
  TestString.undefined (prefix + " removeFirst returns undefined for empty Deque", Deque.removeFirst());
  TestString.undefined (prefix + " removeLast returns undefined for empty Deque", Deque.removeLast());
  TestString.null (prefix + " pollFirst returns null for empty Deque", Deque.pollFirst());
  TestString.null (prefix + " pollLast returns null for empty Deque", Deque.pollLast());
  TestString.undefined (prefix + " getFirst returns undefined for empty Deque", Deque.getFirst());
  TestString.undefined (prefix + " getLast returns undefined for empty Deque", Deque.getLast());
  TestString.null (prefix + " peekFirst returns null for empty Deque", Deque.peekFirst());
  TestString.null (prefix + " peekLast returns null for empty Deque", Deque.peekLast());
  TestNumber.equals (prefix + " size should still be zero", Deque.size(), 0);

  TestString.undefined (prefix + " second removeFirst returns undefined for empty Deque", Deque.removeFirst());
  TestString.undefined (prefix + " second removeLast returns undefined for empty Deque", Deque.removeLast());
  TestString.null (prefix + " second pollFirst returns null for empty Deque", Deque.pollFirst());
  TestString.null (prefix + " second pollLast returns null for empty Deque", Deque.pollLast());
  TestString.undefined (prefix + " second getFirst returns undefined for empty Deque", Deque.getFirst());
  TestString.undefined (prefix + " second getLast returns undefined for empty Deque", Deque.getLast());
  TestString.null (prefix + " second peekFirst returns null for empty Deque", Deque.peekFirst());
  TestString.null (prefix + " second peekLast returns null for empty Deque", Deque.peekLast());
  TestNumber.equals (prefix + " size should be zero", Deque.size(), 0);
}

function testAddFirstToDeque (Deque:Deque<string>, prefix:string) : void {
  TestNumber.equals (prefix + " size should be zero", Deque.size(), 0);
  TestBoolean.true (prefix + " addFirst should return true", Deque.addFirst ("first"));
  TestNumber.equals (prefix + " size should be one", Deque.size(), 1);
  TestString.equals (prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");

  TestNumber.equals (prefix + " preremove size should be one", Deque.size(), 1);
  TestString.equals (prefix + " removeFirst should return first for one element Deque", Deque.removeFirst(), "first");
  TestNumber.equals (prefix + " preremove size should be zero", Deque.size(), 0);
  testEmptyDeque(Deque, "testAddFirstToDeque-" + prefix);
}

function testAddLastToDeque (Deque:Deque<string>, prefix:string) : void {
  TestBoolean.true (prefix + " addLast should return true", Deque.addLast ("first"));
  TestString.equals (prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");

  TestString.equals (prefix + " removeLast should return first for one element Deque", Deque.removeLast(), "first");
  testEmptyDeque(Deque, prefix);
}

function testOfferFirstToDeque (Deque:Deque<string>, prefix:string) : void {
  TestBoolean.true (prefix + " offerFirst should return true", Deque.offerFirst ("first"));
  TestString.equals (prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");

  TestString.equals (prefix + " pollFirst should return first for one element Deque", Deque.pollFirst(), "first");
  testEmptyDeque(Deque, prefix);
}

function testOfferLastToDeque (Deque:Deque<string>, prefix:string) : void {
  TestBoolean.true (prefix + " offerLast should return true", Deque.offerLast ("first"));
  TestString.equals (prefix + " peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for Deque containing only first", Deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for Deque containing only first", Deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for Deque containing only first", Deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for Deque containing only first", Deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for Deque containing only first", Deque.getLast(), "first");

  TestString.equals (prefix + " pollLast should return first for one element Deque", Deque.pollLast(), "first");
  testEmptyDeque(Deque, prefix);
}
