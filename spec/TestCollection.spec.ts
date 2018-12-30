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
import {Comparator} from "../src/Comparator";
import {CompositeCollection} from "../src/CompositeCollection";
import {Consumer} from "../src/Consumer";
import {HashSet} from "../src/HashSet";
import {ImmutableCollection} from "../src/ImmutableCollection";
import {JIterator} from "../src/JIterator";
import {LinkedList} from "../src/LinkedList";
import {HashMultiSet} from "../src/HashClasses";
import {NavigableHashSet} from "../src/NavigableHash";
import {PriorityQueue} from "../src/PriorityQueue";
import {SkipListSet} from "../src/SkipList";
import {TreeSet} from "../src/TreeSet";
import {Test, TestBoolean, TestNumber, TestString} from 'jasts';

describe("Test Collection", function() {
  it("Test empty string Collections ArrayList", function() {
    testEmptyStringCollection(new ArrayList<string> (), "ArrayList");
    testEmptyStringCollection(new ArrayList<string> (new AllFieldCollectable<string>()), "ArrayList AllFieldCollectable");
  });
  it("Test empty string Collections LinkedList", function() {
    testEmptyStringCollection(new LinkedList<string> (), "LinkedList");
    testEmptyStringCollection(new LinkedList<string> (new AllFieldCollectable<string>()), "LinkedList AllFieldCollectable");
  });
  it("Test empty string Collections HashSet", function() {
    testEmptyStringCollection(new HashSet<string> (), "HashSet");
    testEmptyStringCollection(new HashSet<string> (new AllFieldHashable<string>()), "HashSet AllFieldHashable");
  });
  it("Test empty string Collections Empty", function() {
    testEmptyStringCollection(Collections.emptyList<string>(), "EmptyList");
    testEmptyStringCollection(Collections.emptySet<string>(), "EmptySet");
  });
  it("Test empty string Collections NavigableHashSet", function() {
    testEmptyStringCollection(new NavigableHashSet<string> (Collections.getStringComparator()), "NavigableHashSet");
  });
  it("Test empty string Collections SkipListSet", function() {
    testEmptyStringCollection(new SkipListSet<string> (Collections.getStringComparator()), "SkipListSet");
  });
  it("Test empty string Collections TreeSet", function() {
    testEmptyStringCollection(new TreeSet<string> (Collections.getStringComparator()), "TreeSet");
  });
  it("Test empty string Collections PriorityQueue", function() {
    testEmptyStringCollection(new PriorityQueue<string> (Collections.getStringComparator()), "PriorityQueue");
  });
  it("Test empty string Collections HashMultiSet", function() {
    testEmptyStringCollection(new HashMultiSet<string> (), "HashMultiSet");
    testEmptyStringCollection(new HashMultiSet<string> (new AllFieldHashable<string>()), "HashMultiSet");
  });
  it("Test empty string Collections CompositeCollections", function() {
    testEmptyStringCollection(new CompositeCollection<string> (undefined), "CompositeCollection undefined");
    testEmptyStringCollection(new CompositeCollection<string> (null), "CompositeCollection null");
    testEmptyStringCollection(new CompositeCollection<string> (new ArrayList<string>()), "CompositeCollection empty");
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
    testEmptyNumberCollection(new NavigableHashSet<number> (Collections.getNumberComparator()));
    testEmptyNumberCollection(new SkipListSet<number> (Collections.getNumberComparator()));
    testEmptyNumberCollection(new TreeSet<number> (Collections.getNumberComparator()));
    testEmptyNumberCollection(new PriorityQueue<number> (Collections.getNumberComparator()));
    testEmptyNumberCollection(new HashMultiSet<number> ());
    testEmptyNumberCollection(new HashMultiSet<number> (new AllFieldHashable<number>()));
    testEmptyNumberCollection(new CompositeCollection<number> (undefined));
    testEmptyNumberCollection(new CompositeCollection<number> (null));
    testEmptyNumberCollection(new CompositeCollection<number> (new ArrayList<number>()));
  });

  it("Test add one item to string Collections", function() {
    const al:ArrayList<string> = new ArrayList<string> ();
    const ll:LinkedList<string> = new LinkedList<string> ();
    const hs:HashSet<string> = new HashSet<string> ();
    const alc:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable<string>());
    const llc:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable<string>());
    const hsc:HashSet<string> = new HashSet<string> (new AllFieldHashable<string>());

    testAddOneItemToStringCollection(al, "ArrayList");
    testAddOneItemToStringCollection(ll, "LinkedList");
    testAddOneItemToStringCollection(hs, "HashSet");
    testAddOneItemToStringCollection(alc, "ArrayList AllFieldCollectable");
    testAddOneItemToStringCollection(llc, "LinkedList AllFieldCollectable");
    testAddOneItemToStringCollection(hsc, "HashSet AllFieldHashable");
    testAddOneItemToStringCollection(new NavigableHashSet<string> (Collections.getStringComparator()), "NavigableHashSet StringComparator");
    testAddOneItemToStringCollection(new SkipListSet<string> (Collections.getStringComparator()), "SkipListSet StringComparator");
    testAddOneItemToStringCollection(new TreeSet<string> (Collections.getStringComparator()), "TreeSet StringComparator");
    testAddOneItemToStringCollection(new PriorityQueue<string> (Collections.getStringComparator()), "PriorityQueue StringComparator");
  });

  it("Test add one item to string Collection Hash MultiSet", function() {
    testAddOneItemToStringCollection(new HashMultiSet<string> (new AllFieldHashable<string>()), "HashMultiSet AllFieldHashable");
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
    testAddOneItemToNumberCollection(new NavigableHashSet<number> (Collections.getNumberComparator()));
    testAddOneItemToNumberCollection(new SkipListSet<number> (Collections.getNumberComparator()));
    testAddOneItemToNumberCollection(new TreeSet<number> (Collections.getNumberComparator()));
    testAddOneItemToNumberCollection(new PriorityQueue<number> (Collections.getNumberComparator()));
    testAddOneItemToNumberCollection(new HashMultiSet<number> (new AllFieldHashable<number>()));
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
    testAddTwoItemsToStringCollection(new NavigableHashSet<string> (Collections.getStringComparator()));
    testAddTwoItemsToStringCollection(new SkipListSet<string> (Collections.getStringComparator()));
    testAddTwoItemsToStringCollection(new TreeSet<string> (Collections.getStringComparator()));
    testAddTwoItemsToStringCollection(new PriorityQueue<string> (Collections.getStringComparator()));
    testAddTwoItemsToStringCollection(new HashMultiSet<string> (new AllFieldHashable<string>()));
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
    testAddTwoItemsToNumberCollection(new NavigableHashSet<number> (Collections.getNumberComparator()));
    testAddTwoItemsToNumberCollection(new SkipListSet<number> (Collections.getNumberComparator()));
    testAddTwoItemsToNumberCollection(new TreeSet<number> (Collections.getNumberComparator()));
    testAddTwoItemsToNumberCollection(new PriorityQueue<number> (Collections.getNumberComparator()));
    testAddTwoItemsToNumberCollection(new HashMultiSet<number> (new AllFieldHashable<number>()));
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
    testAddItemsToStringCollection(new NavigableHashSet<string> (Collections.getStringComparator()));
    testAddItemsToStringCollection(new SkipListSet<string> (Collections.getStringComparator()));
    testAddItemsToStringCollection(new TreeSet<string> (Collections.getStringComparator()));
    testAddItemsToStringCollection(new PriorityQueue<string> (Collections.getStringComparator()));
    testAddItemsToStringCollection(new HashMultiSet<string> (new AllFieldHashable<string>()));
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
    testAddItemsToNumberCollection(new NavigableHashSet<number> (Collections.getNumberComparator()));
    testAddItemsToNumberCollection(new SkipListSet<number> (Collections.getNumberComparator()));
    testAddItemsToNumberCollection(new TreeSet<number> (Collections.getNumberComparator()));
    testAddItemsToNumberCollection(new PriorityQueue<number> (Collections.getNumberComparator()));
    testAddItemsToNumberCollection(new HashMultiSet<number> (new AllFieldHashable<number>()));
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

const failActionString:Consumer<string> = {
  accept(element:string) {
    fail ('Unwanted code branch in testEmptyStringCollection');
    throw new Error('Unwanted code branch in testEmptyStringCollection');
  }
}

function testEmptyStringCollection (coll:ImmutableCollection<string>, typestring:string) : void {
  TestBoolean.true ("Expect empty string collection isEmpty true " + typestring, coll.isEmpty());
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  TestBoolean.false ("Empty string collection will not contain blah " + typestring, coll.contains("blah"));
  for (const iter:JIterator<string> = coll.iterator(); iter.hasNext(); ) {
    fail ('Unwanted code branch in testEmptyStringCollection');
    throw new Error('Unwanted code branch in testEmptyStringCollection');
  }
  const i:Iterator<string> = coll[Symbol.iterator]();
  const ir:IteratorResult<string> = i.next();
  expect (ir.done).toEqual(true);

  coll.forEach(failActionString);

  TestString.equals ("Empty array should stringify to []", JSON.stringify (coll), "[]");
}

const failActionNumber:Consumer<number> = {
  accept(element:number) {
    fail ('Unwanted code branch in testEmptyNumberCollection');
    throw new Error('Unwanted code branch in testEmptyNumberCollection');
  }
}

function testEmptyNumberCollection (coll:ImmutableCollection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  expect (coll.contains(500)).toEqual(false);
  for (const iter:JIterator<number> = coll.iterator(); iter.hasNext(); ) {
    fail ('Unwanted code branch in testEmptyNumberCollection');
    throw new Error('Unwanted code branch in testEmptyNumberCollection');
  }
  const i:Iterator<number> = coll[Symbol.iterator]();
  const ir:IteratorResult<number> = i.next();
  expect (ir.done).toEqual(true);

  coll.forEach(failActionNumber);
  TestString.equals ("Empty array should stringify to []", JSON.stringify (coll), "[]");
}


function testAddOneItemToStringCollection (coll:Collection<string>, typestring:string) : void {
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
   coll.clear();
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
   expect (coll.add ("blah")).toEqual (true);
   expect (coll.isEmpty ()).toEqual(false);
   expect (coll.size ()).toEqual(1);

   let testCount : number = 0;
   coll.forEach ({ accept(element:string) { testCount = testCount + 1; } });
   expect (testCount).toEqual (1);

//   console.log ("About to run test for " + typestring);
   TestString.equals ("One element array should stringify to [blah]", JSON.stringify (coll), "[\"blah\"]");
}

function testAddOneItemToNumberCollection (coll:Collection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  coll.clear();
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  expect (coll.add (100)).toEqual (true);
  expect (coll.isEmpty ()).toEqual(false);
  expect (coll.size ()).toEqual(1);

  let testCount : number = 0;
  coll.forEach ({ accept(element:number) { testCount = testCount + 1; } });
  expect (testCount).toEqual (1);

  TestString.equals ("One element array should stringify to [100]", JSON.stringify (coll), "[100]");
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

   let testCount : number = 0;
   coll.forEach ({ accept(element:string) { testCount = testCount + 1; } });
   expect (testCount).toEqual (2);
   coll.clear();
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
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

  let testCount : number = 0;
  coll.forEach ({ accept(element:number) { testCount = testCount + 1; } });
  expect (testCount).toEqual (2);
  coll.clear();
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
}

function testAddItemsToStringCollection (coll:Collection<string>) : void {
   expect (coll.isEmpty ()).toEqual(true);
   expect (coll.size ()).toEqual(0);
   addTestStrings (coll);
   expect (coll.isEmpty ()).toEqual(false);
   expect (coll.size ()).toEqual(10);
   expect (coll.contains ("notfound")).toEqual (false);
   expect (coll.contains ("sixth")).toEqual (true);

   let testCount : number = 0;
   coll.forEach ({ accept(element:string) { testCount = testCount + 1; } });
   expect (testCount).toEqual (10);
}

function testAddItemsToNumberCollection (coll:Collection<number>) : void {
  expect (coll.isEmpty ()).toEqual(true);
  expect (coll.size ()).toEqual(0);
  addTestNumbers (coll);
  expect (coll.isEmpty ()).toEqual(false);
  expect (coll.size ()).toEqual(10);
  expect (coll.contains (31415926553)).toEqual (false);
  expect (coll.contains (500)).toEqual (true);

  let testCount : number = 0;
  coll.forEach ({ accept(element:number) { testCount = testCount + 1; } });
  expect (testCount).toEqual (10);
}
