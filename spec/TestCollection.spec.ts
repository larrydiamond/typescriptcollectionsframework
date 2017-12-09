/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {AllFieldCollectable} from "../src/AllFieldCollectable";
import {AllFieldHashable} from "../src/AllFieldHashable";
import {ArrayList} from "../src/ArrayList";
import {Collection} from "../src/Collection";
import {Collections} from "../src/Collections";
import {HashSet} from "../src/HashSet";
import {ImmutableCollection} from "../src/ImmutableCollection";
import {JIterator} from "../src/JIterator";
import {LinkedList} from "../src/LinkedList";
import {TreeSet} from "../src/TreeSet";

describe("Test Collections", function() {
  it("Test empty string Collections", function() {
    testEmptyStringCollection(new ArrayList<string> ());
    testEmptyStringCollection(new ArrayList<string> (new AllFieldCollectable<string>()));
    testEmptyStringCollection(new LinkedList<string> ());
    testEmptyStringCollection(new LinkedList<string> (new AllFieldCollectable<string>()));
    testEmptyStringCollection(new HashSet<string> ());
    testEmptyStringCollection(new HashSet<string> (new AllFieldHashable<string>()));
    testEmptyStringCollection(Collections.emptyList<string>());
    testEmptyStringCollection(Collections.emptySet<string>());
    testEmptyStringCollection(new TreeSet<string> (Collections.getStringComparator()));
  });

  it("Test empty number Collections", function() {
    testEmptyNumberCollection(new ArrayList<number> ());
    testEmptyNumberCollection(new ArrayList<number> (new AllFieldCollectable<number>()));
    testEmptyNumberCollection(new LinkedList<number> ());
    testEmptyNumberCollection(new LinkedList<number> (new AllFieldCollectable<number>()));
    testEmptyNumberCollection(new HashSet<number> ());
    testEmptyNumberCollection(new HashSet<number> (new AllFieldHashable<number>()));
    testEmptyNumberCollection(Collections.emptyList<number>());
    testEmptyNumberCollection(Collections.emptySet<number>());
  });

  it("Test add one item to string Collections", function() {
    const al:ArrayList<string> = new ArrayList<string> ();
    const ll:LinkedList<string> = new LinkedList<string> ();
    const hs:HashSet<string> = new HashSet<string> ();
    const alc:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable<string>());
    const llc:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable<string>());
    const hsc:HashSet<string> = new HashSet<string> (new AllFieldHashable<string>());

    testAddOneItemToStringCollection(al);
    testAddOneItemToStringCollection(ll);
    testAddOneItemToStringCollection(hs);
    testAddOneItemToStringCollection(alc);
    testAddOneItemToStringCollection(llc);
    testAddOneItemToStringCollection(hsc);
    testAddOneItemToStringCollection(new TreeSet<string> (Collections.getStringComparator()));
  });

  it("Test add one item to number Collections", function() {
    const al:ArrayList<number> = new ArrayList<number> ();
    const ll:LinkedList<number> = new LinkedList<number> ();
    const hs:HashSet<number> = new HashSet<number> ();
    const alc:ArrayList<number> = new ArrayList<number> (new AllFieldCollectable<number>());
    const llc:LinkedList<number> = new LinkedList<number> (new AllFieldCollectable<number>());
    const hsc:HashSet<number> = new HashSet<number> (new AllFieldHashable<number>());

    testAddOneItemToNumberCollection(al);
    testAddOneItemToNumberCollection(ll);
    testAddOneItemToNumberCollection(hs);
    testAddOneItemToNumberCollection(alc);
    testAddOneItemToNumberCollection(llc);
    testAddOneItemToNumberCollection(hsc);
  });

  it("Test add two items to string Collections", function() {
    const al:ArrayList<string> = new ArrayList<string> ();
    const ll:LinkedList<string> = new LinkedList<string> ();
    const hs:HashSet<string> = new HashSet<string> ();
    const alc:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable<string>());
    const llc:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable<string>());
    const hsc:HashSet<string> = new HashSet<string> (new AllFieldHashable<string>());

    testAddTwoItemsToStringCollection(al);
    testAddTwoItemsToStringCollection(ll);
    testAddTwoItemsToStringCollection(hs);
    testAddTwoItemsToStringCollection(alc);
    testAddTwoItemsToStringCollection(llc);
    testAddTwoItemsToStringCollection(hsc);
    testAddTwoItemsToStringCollection(new TreeSet<string> (Collections.getStringComparator()));
  });

  it("Test add two items to number Collections", function() {
    const al:ArrayList<number> = new ArrayList<number> ();
    const ll:LinkedList<number> = new LinkedList<number> ();
    const hs:HashSet<number> = new HashSet<number> ();
    const alc:ArrayList<number> = new ArrayList<number> (new AllFieldCollectable<number>());
    const llc:LinkedList<number> = new LinkedList<number> (new AllFieldCollectable<number>());
    const hsc:HashSet<number> = new HashSet<number> (new AllFieldHashable<number>());

    testAddTwoItemsToNumberCollection(al);
    testAddTwoItemsToNumberCollection(ll);
    testAddTwoItemsToNumberCollection(hs);
    testAddTwoItemsToNumberCollection(alc);
    testAddTwoItemsToNumberCollection(llc);
    testAddTwoItemsToNumberCollection(hsc);
  });


  it("Test add items to string Collections", function() {
    const al:ArrayList<string> = new ArrayList<string> ();
    const ll:LinkedList<string> = new LinkedList<string> ();
    const hs:HashSet<string> = new HashSet<string> ();
    const alc:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable<string>());
    const llc:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable<string>());
    const hsc:HashSet<string> = new HashSet<string> (new AllFieldHashable<string>());

    testAddItemsToStringCollection(al);
    testAddItemsToStringCollection(ll);
    testAddItemsToStringCollection(hs);
    testAddItemsToStringCollection(alc);
    testAddItemsToStringCollection(llc);
    testAddItemsToStringCollection(hsc);
    testAddItemsToStringCollection(new TreeSet<string> (Collections.getStringComparator()));
  });

  it("Test add items to number Collections", function() {
    const al:ArrayList<number> = new ArrayList<number> ();
    const ll:LinkedList<number> = new LinkedList<number> ();
    const hs:HashSet<number> = new HashSet<number> ();
    const alc:ArrayList<number> = new ArrayList<number> (new AllFieldCollectable<number>());
    const llc:LinkedList<number> = new LinkedList<number> (new AllFieldCollectable<number>());
    const hsc:HashSet<number> = new HashSet<number> (new AllFieldHashable<number>());

    testAddItemsToNumberCollection(al);
    testAddItemsToNumberCollection(ll);
    testAddItemsToNumberCollection(hs);
    testAddItemsToNumberCollection(alc);
    testAddItemsToNumberCollection(llc);
    testAddItemsToNumberCollection(hsc);
  });
});

function addTestNumbers (coll:Collection<number>) {
  expect (coll.add (100)).toEqual(true);
  expect (coll.add (200)).toEqual(true);
  expect (coll.add (300)).toEqual(true);
  expect (coll.add (400)).toEqual(true);
  expect (coll.add (500)).toEqual(true);
  expect (coll.add (600)).toEqual(true);
  expect (coll.add (700)).toEqual(true);
  expect (coll.add (800)).toEqual(true);
  expect (coll.add (900)).toEqual(true);
  expect (coll.add (1000)).toEqual(true);
}

function addTestStrings (coll:Collection<string>) {
  expect (coll.add ("first")).toEqual(true);
  expect (coll.add ("second")).toEqual(true);
  expect (coll.add ("third")).toEqual(true);
  expect (coll.add ("fourth")).toEqual(true);
  expect (coll.add ("fifth")).toEqual(true);
  expect (coll.add ("sixth")).toEqual(true);
  expect (coll.add ("seventh")).toEqual(true);
  expect (coll.add ("eighth")).toEqual(true);
  expect (coll.add ("ninth")).toEqual(true);
  expect (coll.add ("tenth")).toEqual(true);
}

function testEmptyStringCollection (coll:ImmutableCollection<string>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  expect (coll.contains("blah")).toEqual(false);
  for (const iter:JIterator<string> = coll.iterator(); iter.hasNext(); ) {
    throw new Error('Unwanted code branch in testEmptyStringCollection');
  }
  const i:Iterator<string> = coll[Symbol.iterator]();
  let ir:IteratorResult<string> = i.next();
  expect (ir.done).toEqual(true);
}

function testEmptyNumberCollection (coll:ImmutableCollection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  expect (coll.contains(500)).toEqual(false);
  for (const iter:JIterator<number> = coll.iterator(); iter.hasNext(); ) {
    throw new Error('Unwanted code branch in testEmptyNumberCollection');
  }
  const i:Iterator<number> = coll[Symbol.iterator]();
  let ir:IteratorResult<number> = i.next();
  expect (ir.done).toEqual(true);
}

function testAddOneItemToStringCollection (coll:Collection<string>) : void {
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
   expect (coll.add ("blah")).toEqual (true);
   expect (coll.isEmpty ()).toEqual(false);
   expect (coll.size ()).toEqual(1);
}

function testAddOneItemToNumberCollection (coll:Collection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  expect (coll.add (100)).toEqual (true);
  expect (coll.isEmpty ()).toEqual(false);
  expect (coll.size ()).toEqual(1);
}

function testAddTwoItemsToStringCollection (coll:Collection<string>) : void {
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
   expect (coll.add ("blah")).toEqual (true);
   expect (coll.isEmpty ()).toEqual(false);
   expect (coll.size ()).toEqual(1);
   expect (coll.add ("more")).toEqual (true);
   expect (coll.isEmpty ()).toEqual(false);
   expect (coll.size ()).toEqual(2);
}

function testAddTwoItemsToNumberCollection (coll:Collection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  expect (coll.add (100)).toEqual (true);
  expect (coll.isEmpty ()).toEqual(false);
  expect (coll.size ()).toEqual(1);
  expect (coll.add (200)).toEqual (true);
  expect (coll.isEmpty ()).toEqual(false);
  expect (coll.size ()).toEqual(2);
}

function testAddItemsToStringCollection (coll:Collection<string>) : void {
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
   addTestStrings (coll);
   expect (coll.isEmpty ()).toEqual(false);
   expect (coll.size ()).toEqual(10);
}

function testAddItemsToNumberCollection (coll:Collection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  addTestNumbers (coll);
  expect (coll.isEmpty ()).toEqual(false);
  expect (coll.size ()).toEqual(10);
}
