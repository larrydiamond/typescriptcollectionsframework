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
import {EvictingDeque} from "../src/EvictingDeque";

describe("Test Deque functionality", function() {

  it("Test empty Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testEmptyDeque(al, "ArrayList");
    testEmptyDeque(ll, "LinkedList");
    testEmptyDeque(new EvictingDeque<string> (1000, new AllFieldCollectable()), "EvictingDeque");
  });

  it("Test adding first items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testAddFirstToDeque(al, "ArrayList");
    testAddFirstToDeque(ll, "LinkedList");
    testAddFirstToDeque(new EvictingDeque<string> (1000, new AllFieldCollectable()), "EvictingDeque");
  });

  it("Test adding last items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testAddLastToDeque(al, "ArrayList");
    testAddLastToDeque(ll, "LinkedList");
    testAddLastToDeque(new EvictingDeque<string> (1000, new AllFieldCollectable()), "EvictingDeque");
  });

  it("Test offering first items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testOfferFirstToDeque(al, "ArrayList");
    testOfferFirstToDeque(ll, "LinkedList");
    testOfferFirstToDeque(new EvictingDeque<string> (1000, new AllFieldCollectable()), "EvictingDeque");
  });

  it("Test offering last items to Deques", function() {
    const al:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const ll:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testOfferLastToDeque(al, "ArrayList");
    testOfferLastToDeque(ll, "LinkedList");
    testOfferLastToDeque(new EvictingDeque<string> (1000, new AllFieldCollectable()), "EvictingDeque");
  });

});

function testEmptyDeque (deque:Deque<string>, prefix:string) : void {
  TestNumber.equals (prefix + " size should initially be zero", deque.size(), 0);
  TestString.undefined (prefix + " removeFirst returns undefined for empty deque", deque.removeFirst());
  TestString.undefined (prefix + " removeLast returns undefined for empty deque", deque.removeLast());
  TestString.null (prefix + " pollFirst returns null for empty deque", deque.pollFirst());
  TestString.null (prefix + " pollLast returns null for empty deque", deque.pollLast());
  TestString.undefined (prefix + " getFirst returns undefined for empty deque", deque.getFirst());
  TestString.undefined (prefix + " getLast returns undefined for empty deque", deque.getLast());
  TestString.null (prefix + " peekFirst returns null for empty deque", deque.peekFirst());
  TestString.null (prefix + " peekLast returns null for empty deque", deque.peekLast());
  TestNumber.equals (prefix + " size should still be zero", deque.size(), 0);

  TestString.undefined (prefix + " second removeFirst returns undefined for empty deque", deque.removeFirst());
  TestString.undefined (prefix + " second removeLast returns undefined for empty deque", deque.removeLast());
  TestString.null (prefix + " second pollFirst returns null for empty deque", deque.pollFirst());
  TestString.null (prefix + " second pollLast returns null for empty deque", deque.pollLast());
  TestString.undefined (prefix + " second getFirst returns undefined for empty deque", deque.getFirst());
  TestString.undefined (prefix + " second getLast returns undefined for empty deque", deque.getLast());
  TestString.null (prefix + " second peekFirst returns null for empty deque", deque.peekFirst());
  TestString.null (prefix + " second peekLast returns null for empty deque", deque.peekLast());
  TestNumber.equals (prefix + " size should be zero", deque.size(), 0);
}

function testAddFirstToDeque (deque:Deque<string>, prefix:string) : void {
  TestNumber.equals (prefix + " size should be zero", deque.size(), 0);
  TestBoolean.true (prefix + " addFirst should return true", deque.addFirst ("first"));
  TestNumber.equals (prefix + " size should be one", deque.size(), 1);
  TestString.equals (prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");

  TestNumber.equals (prefix + " preremove size should be one", deque.size(), 1);
  TestString.equals (prefix + " removeFirst should return first for one element deque", deque.removeFirst(), "first");
  TestNumber.equals (prefix + " preremove size should be zero", deque.size(), 0);
  testEmptyDeque(deque, "testAddFirstToDeque-" + prefix);
}

function testAddLastToDeque (deque:Deque<string>, prefix:string) : void {
  TestBoolean.true (prefix + " addLast should return true", deque.addLast ("first"));
  TestString.equals (prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");

  TestString.equals (prefix + " removeLast should return first for one element deque", deque.removeLast(), "first");
  testEmptyDeque(deque, prefix);
}

function testOfferFirstToDeque (deque:Deque<string>, prefix:string) : void {
  TestBoolean.true (prefix + " offerFirst should return true", deque.offerFirst ("first"));
  TestString.equals (prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");

  TestString.equals (prefix + " pollFirst should return first for one element deque", deque.pollFirst(), "first");
  testEmptyDeque(deque, prefix);
}

function testOfferLastToDeque (deque:Deque<string>, prefix:string) : void {
  TestBoolean.true (prefix + " offerLast should return true", deque.offerLast ("first"));
  TestString.equals (prefix + " peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " getLast returns first for deque containing only first", deque.getLast(), "first");
  TestString.equals (prefix + " second peekFirst returns first for deque containing only first", deque.peekFirst(), "first");
  TestString.equals (prefix + " second peekLast returns first for deque containing only first", deque.peekLast(), "first");
  TestString.equals (prefix + " second getFirst returns first for deque containing only first", deque.getFirst(), "first");
  TestString.equals (prefix + " second getLast returns first for deque containing only first", deque.getLast(), "first");

  TestString.equals (prefix + " pollLast should return first for one element deque", deque.pollLast(), "first");
  testEmptyDeque(deque, prefix);
}
