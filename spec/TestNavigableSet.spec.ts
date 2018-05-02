/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Test, TestBoolean, TestString, TestNumber} from 'jasts';

import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {JSet} from "../src/JSet";
import {NavigableSet} from "../src/NavigableSet";
import {SkipListSet} from "../src/SkipList";
import {TreeSet} from "../src/TreeSet";

// PetStoreProduct will be used in testing
class PetStoreProduct {
  private productName:string;
  private price:number;

  public constructor (iName:string, iPrice:number) {
    this.productName = iName;
    this.price = iPrice;
  }

  public getProductName ():string {
    return this.productName;
  }

  public getPrice():number {
    return this.price;
  }
}

const alphabeticalSortPetStoreProduct:Comparator<PetStoreProduct> = {
  compare(o1:PetStoreProduct, o2:PetStoreProduct) : number {
    if (o1 === o2)
      return 0;
      if (o1 === undefined)
        return -1;
    if (o1 === null)
      return -1;
      if (o2 === undefined)
        return 1;
    if (o2 === null)
      return 1;
    if (o1.getProductName() === o2.getProductName())
      return 0;
    if (o1.getProductName() === undefined)
      return -1;
      if (o1.getProductName() === null)
        return -1;
    if (o2.getProductName() === undefined)
      return 1;
      if (o2.getProductName() === null)
        return 1;

    if (o1.getProductName() < o2.getProductName())
      return -1;

    return 1;
  }
};

const product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
const product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
const productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 1.99);

describe("Test NavigableSet functionality", function() {
  it ("Test firstKey", function () {
    testFirstKeyNumberString (new TreeSet<number>(Collections.getNumberComparator()));
    testFirstKeyNumberString (new SkipListSet<number>(Collections.getNumberComparator()));

    testFirstKeyStringString (new TreeSet<string>(Collections.getStringComparator()));
    testFirstKeyStringString (new SkipListSet<string>(Collections.getStringComparator()));
  });

  it ("Test lastKey", function () {
    testLastKeyNumberString (new TreeSet<number>(Collections.getNumberComparator()));
    testLastKeyNumberString (new SkipListSet<number>(Collections.getNumberComparator()));

    testLastKeyStringString (new TreeSet<string>(Collections.getStringComparator()));
    testLastKeyStringString (new SkipListSet<string>(Collections.getStringComparator()));
  });

  it ("Test pollFirstKey", function () {
    testPollFirstKeyNumberString (new TreeSet<number>(Collections.getNumberComparator()));
    testPollFirstKeyNumberString (new SkipListSet<number>(Collections.getNumberComparator()));

    testPollFirstKeyStringString (new TreeSet<string>(Collections.getStringComparator()));
    testPollFirstKeyStringString (new SkipListSet<string>(Collections.getStringComparator()));
  });

  it ("Test pollLastKey", function () {
    testPollLastKeyNumberString (new TreeSet<number>(Collections.getNumberComparator()));
    testPollLastKeyNumberString (new SkipListSet<number>(Collections.getNumberComparator()));

    testPollLastKeyStringString (new TreeSet<string>(Collections.getStringComparator()));
    testPollLastKeyStringString (new SkipListSet<string>(Collections.getStringComparator()));
  });





});

function testFirstKeyNumberString (set:NavigableSet<number>) {
  expect (set.first()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestNumbers(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.first()).toEqual (100);
}

function testFirstKeyStringString (set:NavigableSet<string>) {
  expect (set.first()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestStrings(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.first()).toEqual ("eighth");
}

function testLastKeyNumberString (set:NavigableSet<number>) {
  expect (set.last()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestNumbers(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.last()).toEqual (1000);
}

function testLastKeyStringString (set:NavigableSet<string>) {
  expect (set.last()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestStrings(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.last()).toEqual ("third");
}

function testPollFirstKeyNumberString (set:NavigableSet<number>) {
  expect (set.pollFirst()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestNumbers(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.pollFirst()).toEqual (100);
  expect (set.pollFirst()).toEqual (200);
  expect (set.size ()).toEqual(8);
  expect (set.isEmpty ()).toEqual(false);
}

function testPollFirstKeyStringString (set:NavigableSet<string>) {
  expect (set.pollFirst()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestStrings(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.pollFirst()).toEqual ("eighth");
  expect (set.pollFirst()).toEqual ("fifth");
  expect (set.size ()).toEqual(8);
  expect (set.isEmpty ()).toEqual(false);
}

function testPollLastKeyNumberString (set:NavigableSet<number>) {
  expect (set.pollLast()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestNumbers(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.pollLast()).toEqual (1000);
  expect (set.pollLast()).toEqual (900);
  expect (set.size ()).toEqual(8);
  expect (set.isEmpty ()).toEqual(false);
}

function testPollLastKeyStringString (set:NavigableSet<string>) {
  expect (set.pollLast()).toEqual (null);
  expect (set.size ()).toEqual(0);
  expect (set.isEmpty ()).toEqual(true);
  addTestStrings(set);
  expect (set.size ()).toEqual(10);
  expect (set.isEmpty ()).toEqual(false);
  expect (set.pollLast()).toEqual ("third");
  expect (set.pollLast()).toEqual ("tenth");
  expect (set.size ()).toEqual(8);
  expect (set.isEmpty ()).toEqual(false);
}






function addTestNumbers (set:JSet<number>) {
  expect (set.add (300)).toEqual(true);
  expect (set.add (600)).toEqual(true);
  expect (set.add (900)).toEqual(true);
  expect (set.add (1000)).toEqual(true);
  expect (set.add (700)).toEqual(true);
  expect (set.add (400)).toEqual(true);
  expect (set.add (100)).toEqual(true);
  expect (set.add (200)).toEqual(true);
  expect (set.add (500)).toEqual(true);
  expect (set.add (800)).toEqual(true);
}

function addTestStrings (set:JSet<string>) {
  expect (set.add ("first")).toEqual(true);
  expect (set.add ("second")).toEqual(true);
  expect (set.add ("third")).toEqual(true);
  expect (set.add ("fourth")).toEqual(true);
  expect (set.add ("fifth")).toEqual(true);
  expect (set.add ("sixth")).toEqual(true);
  expect (set.add ("seventh")).toEqual(true);
  expect (set.add ("eighth")).toEqual(true);
  expect (set.add ("ninth")).toEqual(true);
  expect (set.add ("tenth")).toEqual(true);
}
