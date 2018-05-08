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
import {JMap} from "../src/JMap";
import {NavigableHashMap} from "../src/NavigableHash";
import {NavigableMap} from "../src/NavigableMap";
import {SkipListMap} from "../src/SkipList";
import {TreeMap} from "../src/TreeMap";

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

// Wanted to show a class in the value object but anything would work fine
class ValueClass {
  private blah1:number;
  private blah2:string;
}

describe("Test NavigableMap functionality", function() {
  it ("Test firstKey", function () {
    testFirstKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testFirstKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testFirstKeyNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testFirstKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testFirstKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testFirstKeyStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test firstEntry", function () {
    testFirstEntryNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testFirstEntryNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testFirstEntryNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testFirstEntryStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testFirstEntryStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testFirstEntryStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test lastKey", function () {
    testLastKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testLastKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testLastKeyNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testLastKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testLastKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testLastKeyStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test lastEntry", function () {
    testLastEntryNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testLastEntryNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testLastEntryNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testLastEntryStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testLastEntryStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testLastEntryStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test ceilingKey", function () {
    testCeilingKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testCeilingKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testCeilingKeyNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testCeilingKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testCeilingKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testCeilingKeyStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

});

function testFirstKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.firstKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.firstKey()).toEqual (100);
  map.clear();
  expect (map.firstKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testFirstKeyStringString (map:NavigableMap<string,string>) {
  expect (map.firstKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.firstKey()).toEqual ("eighth");
  map.clear();
  expect (map.firstKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}


function testFirstEntryNumberString (map:NavigableMap<number,string>) {
  expect (map.firstEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  const entry = map.firstEntry();
  expect (entry.getKey()).toEqual (100);
  expect (entry.getValue()).toEqual ("100blah");
  map.clear();
  expect (map.firstEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testFirstEntryStringString (map:NavigableMap<string,string>) {
  expect (map.firstEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  const entry = map.firstEntry();
  expect (entry.getKey()).toEqual ("eighth");
  expect (entry.getValue()).toEqual ("eighthblah");
  map.clear();
  expect (map.firstEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}


function testLastKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.lastKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.lastKey()).toEqual (1000);
  map.clear();
  expect (map.lastKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testLastKeyStringString (map:NavigableMap<string,string>) {
  expect (map.lastKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.lastKey()).toEqual ("third");
  map.clear();
  expect (map.lastKey()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}


function testLastEntryNumberString (map:NavigableMap<number,string>) {
  expect (map.lastEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  const entry = map.lastEntry();
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");
  map.clear();
  expect (map.lastEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testLastEntryStringString (map:NavigableMap<string,string>) {
  expect (map.lastEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  const entry = map.lastEntry();
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");
  map.clear();
  expect (map.lastEntry()).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}


function testCeilingKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.ceilingKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.ceilingKey(1)).toEqual (100);
  expect (map.ceilingKey(100)).toEqual (100);
  expect (map.ceilingKey(399)).toEqual (400);
  expect (map.ceilingKey(500)).toEqual (500);
  expect (map.ceilingKey(601)).toEqual (700);
  expect (map.ceilingKey(999)).toEqual (1000);
  expect (map.ceilingKey(1000)).toEqual (1000);
  expect (map.ceilingKey(1001)).toEqual (null);
  map.clear();
  expect (map.ceilingKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testCeilingKeyStringString (map:NavigableMap<string,string>) {
  expect (map.ceilingKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.ceilingKey("a")).toEqual ("eighth");
  expect (map.ceilingKey("eighth")).toEqual ("eighth");
  expect (map.ceilingKey("seco")).toEqual ("second");
  expect (map.ceilingKey("second")).toEqual ("second");
  expect (map.ceilingKey("secone")).toEqual ("seventh");
  expect (map.ceilingKey("thira")).toEqual ("third");
  expect (map.ceilingKey("third")).toEqual ("third");
  expect (map.ceilingKey("thire")).toEqual (null);
  expect (map.ceilingKey("zzzzz")).toEqual (null);
  map.clear();
  expect (map.ceilingKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function addTestNumbers (map:JMap<number,string>) {
  expect (map.put (300, "300blah")).toEqual(undefined);
  expect (map.put (600, "600blah")).toEqual(undefined);
  expect (map.put (900, "900blah")).toEqual(undefined);
  expect (map.put (1000, "1000blah")).toEqual(undefined);
  expect (map.put (700, "700blah")).toEqual(undefined);
  expect (map.put (400, "400blah")).toEqual(undefined);
  expect (map.put (100, "100blah")).toEqual(undefined);
  expect (map.put (200, "200blah")).toEqual(undefined);
  expect (map.put (500, "500blah")).toEqual(undefined);
  expect (map.put (800, "800blah")).toEqual(undefined);
}

function addTestStrings (map:JMap<string,string>) {
  expect (map.put ("first", "firstblah")).toEqual(undefined);
  expect (map.put ("second", "secondblah")).toEqual(undefined);
  expect (map.put ("third", "thirdblah")).toEqual(undefined);
  expect (map.put ("fourth", "fourthblah")).toEqual(undefined);
  expect (map.put ("fifth", "fifthblah")).toEqual(undefined);
  expect (map.put ("sixth", "sixthblah")).toEqual(undefined);
  expect (map.put ("seventh", "seventhblah")).toEqual(undefined);
  expect (map.put ("eighth", "eighthblah")).toEqual(undefined);
  expect (map.put ("ninth", "ninthblah")).toEqual(undefined);
  expect (map.put ("tenth", "tenthblah")).toEqual(undefined);
}
