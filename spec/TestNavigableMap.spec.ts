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

  it ("Test ceilingEntry", function () {
    testCeilingEntryNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testCeilingEntryNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testCeilingEntryNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testCeilingEntryStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testCeilingEntryStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testCeilingEntryStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test higherKey", function () {
    testHigherKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testHigherKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testHigherKeyNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testHigherKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testHigherKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testHigherKeyStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test higherEntry", function () {
    testHigherEntryNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testHigherEntryNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testHigherEntryNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testHigherEntryStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testHigherEntryStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testHigherEntryStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });


  it ("Test lowerKey", function () {
    testLowerKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testLowerKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testLowerKeyNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testLowerKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testLowerKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testLowerKeyStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test lowerEntry", function () {
    testLowerEntryNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testLowerEntryNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testLowerEntryNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testLowerEntryStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testLowerEntryStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testLowerEntryStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });


  it ("Test floorKey", function () {
    testFloorKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testFloorKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testFloorKeyNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testFloorKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testFloorKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testFloorKeyStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test floorEntry", function () {
    testFloorEntryNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testFloorEntryNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));
    testFloorEntryNumberString (new NavigableHashMap<number,string>(Collections.getNumberComparator()));

    testFloorEntryStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testFloorEntryStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
    testFloorEntryStringString (new NavigableHashMap<string,string>(Collections.getStringComparator()));
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


function testCeilingEntryNumberString (map:NavigableMap<number,string>) {
  expect (map.ceilingEntry(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  let entry = map.ceilingEntry(1);
  expect (entry.getKey()).toEqual (100);
  expect (entry.getValue()).toEqual ("100blah");

  entry = map.ceilingEntry(100);
  expect (entry.getKey()).toEqual (100);
  expect (entry.getValue()).toEqual ("100blah");

  entry = map.ceilingEntry(399);
  expect (entry.getKey()).toEqual (400);
  expect (entry.getValue()).toEqual ("400blah");

  entry = map.ceilingEntry(500);
  expect (entry.getKey()).toEqual (500);
  expect (entry.getValue()).toEqual ("500blah");

  entry = map.ceilingEntry(601);
  expect (entry.getKey()).toEqual (700);
  expect (entry.getValue()).toEqual ("700blah");

  entry = map.ceilingEntry(999);
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");

  entry = map.ceilingEntry(1000);
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");

  expect (map.ceilingEntry(1001)).toEqual (null);
  map.clear();
  expect (map.ceilingEntry(401)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testCeilingEntryStringString (map:NavigableMap<string,string>) {
  expect (map.ceilingEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  let entry = map.ceilingEntry("a");
  expect (entry.getKey()).toEqual ("eighth");
  expect (entry.getValue()).toEqual ("eighthblah");

  entry = map.ceilingEntry("eighth");
  expect (entry.getKey()).toEqual ("eighth");
  expect (entry.getValue()).toEqual ("eighthblah");

  entry = map.ceilingEntry("seco");
  expect (entry.getKey()).toEqual ("second");
  expect (entry.getValue()).toEqual ("secondblah");

  entry = map.ceilingEntry("second");
  expect (entry.getKey()).toEqual ("second");
  expect (entry.getValue()).toEqual ("secondblah");

  entry = map.ceilingEntry("secone");
  expect (entry.getKey()).toEqual ("seventh");
  expect (entry.getValue()).toEqual ("seventhblah");

  entry = map.ceilingEntry("thira");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  entry = map.ceilingEntry("third");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  expect (map.ceilingEntry("thire")).toEqual (null);
  expect (map.ceilingEntry("zzzzz")).toEqual (null);
  map.clear();
  expect (map.ceilingEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}


function testHigherKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.higherKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.higherKey(1)).toEqual (100);
  expect (map.higherKey(100)).toEqual (200);
  expect (map.higherKey(399)).toEqual (400);
  expect (map.higherKey(500)).toEqual (600);
  expect (map.higherKey(601)).toEqual (700);
  expect (map.higherKey(999)).toEqual (1000);
  expect (map.higherKey(1000)).toEqual (null);
  expect (map.higherKey(1001)).toEqual (null);
  map.clear();
  expect (map.higherKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testHigherKeyStringString (map:NavigableMap<string,string>) {
  expect (map.higherKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.higherKey("a")).toEqual ("eighth");
  expect (map.higherKey("eighth")).toEqual ("fifth");
  expect (map.higherKey("seco")).toEqual ("second");
  expect (map.higherKey("second")).toEqual ("seventh");
  expect (map.higherKey("secone")).toEqual ("seventh");
  expect (map.higherKey("thira")).toEqual ("third");
  expect (map.higherKey("third")).toEqual (null);
  expect (map.higherKey("thire")).toEqual (null);
  expect (map.higherKey("zzzzz")).toEqual (null);
  map.clear();
  expect (map.higherKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}


function testHigherEntryNumberString (map:NavigableMap<number,string>) {
  expect (map.higherEntry(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  let entry = map.higherEntry(1);
  expect (entry.getKey()).toEqual (100);
  expect (entry.getValue()).toEqual ("100blah");

  entry = map.higherEntry(100);
  expect (entry.getKey()).toEqual (200);
  expect (entry.getValue()).toEqual ("200blah");

  entry = map.higherEntry(399);
  expect (entry.getKey()).toEqual (400);
  expect (entry.getValue()).toEqual ("400blah");

  entry = map.higherEntry(500);
  expect (entry.getKey()).toEqual (600);
  expect (entry.getValue()).toEqual ("600blah");

  entry = map.higherEntry(601);
  expect (entry.getKey()).toEqual (700);
  expect (entry.getValue()).toEqual ("700blah");

  entry = map.higherEntry(999);
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");

  expect (map.higherEntry(1000)).toEqual (null);
  expect (map.higherEntry(1001)).toEqual (null);
  map.clear();
  expect (map.higherEntry(401)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testHigherEntryStringString (map:NavigableMap<string,string>) {
  expect (map.higherEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  let entry = map.higherEntry("a");
  expect (entry.getKey()).toEqual ("eighth");
  expect (entry.getValue()).toEqual ("eighthblah");

  entry = map.higherEntry("eighth");
  expect (entry.getKey()).toEqual ("fifth");
  expect (entry.getValue()).toEqual ("fifthblah");

  entry = map.higherEntry("seco");
  expect (entry.getKey()).toEqual ("second");
  expect (entry.getValue()).toEqual ("secondblah");

  entry = map.higherEntry("second");
  expect (entry.getKey()).toEqual ("seventh");
  expect (entry.getValue()).toEqual ("seventhblah");

  entry = map.higherEntry("secone");
  expect (entry.getKey()).toEqual ("seventh");
  expect (entry.getValue()).toEqual ("seventhblah");

  entry = map.higherEntry("thira");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  expect (map.higherEntry("third")).toEqual (null);
  expect (map.higherEntry("thire")).toEqual (null);
  expect (map.higherEntry("zzzzz")).toEqual (null);
  map.clear();
  expect (map.higherEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}



function testLowerKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.lowerKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.lowerKey(1)).toEqual (null);
  expect (map.lowerKey(100)).toEqual (null);
  expect (map.lowerKey(399)).toEqual (300);
  expect (map.lowerKey(500)).toEqual (400);
  expect (map.lowerKey(601)).toEqual (600);
  expect (map.lowerKey(999)).toEqual (900);
  expect (map.lowerKey(1000)).toEqual (900);
  expect (map.lowerKey(1001)).toEqual (1000);
  map.clear();
  expect (map.lowerKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testLowerKeyStringString (map:NavigableMap<string,string>) {
  expect (map.lowerKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.lowerKey("a")).toEqual (null);
  expect (map.lowerKey("eighth")).toEqual (null);
  expect (map.lowerKey("seco")).toEqual ("ninth");
  expect (map.lowerKey("second")).toEqual ("ninth");
  expect (map.lowerKey("secone")).toEqual ("second");
  expect (map.lowerKey("thira")).toEqual ("tenth");
  expect (map.lowerKey("third")).toEqual ("tenth");
  expect (map.lowerKey("thire")).toEqual ("third");
  expect (map.lowerKey("zzzzz")).toEqual ("third");
  map.clear();
  expect (map.lowerKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testLowerEntryNumberString (map:NavigableMap<number,string>) {
  expect (map.lowerEntry(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  expect (map.lowerEntry(1)).toEqual (null);
  expect (map.lowerEntry(100)).toEqual (null);

  let entry = map.lowerEntry(399);
  expect (entry.getKey()).toEqual (300);
  expect (entry.getValue()).toEqual ("300blah");

  entry = map.lowerEntry(500);
  expect (entry.getKey()).toEqual (400);
  expect (entry.getValue()).toEqual ("400blah");

  entry = map.lowerEntry(601);
  expect (entry.getKey()).toEqual (600);
  expect (entry.getValue()).toEqual ("600blah");

  entry = map.lowerEntry(999);
  expect (entry.getKey()).toEqual (900);
  expect (entry.getValue()).toEqual ("900blah");

  entry = map.lowerEntry(1000);
  expect (entry.getKey()).toEqual (900);
  expect (entry.getValue()).toEqual ("900blah");

  entry = map.lowerEntry(1001);
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");

  map.clear();
  expect (map.lowerEntry(401)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testLowerEntryStringString (map:NavigableMap<string,string>) {
  expect (map.lowerEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  expect (map.lowerEntry("a")).toEqual (null);
  expect (map.lowerEntry("eighth")).toEqual (null);

  let entry = map.lowerEntry("seco");
  expect (entry.getKey()).toEqual ("ninth");
  expect (entry.getValue()).toEqual ("ninthblah");

  entry = map.lowerEntry("second");
  expect (entry.getKey()).toEqual ("ninth");
  expect (entry.getValue()).toEqual ("ninthblah");

  entry = map.lowerEntry("secone");
  expect (entry.getKey()).toEqual ("second");
  expect (entry.getValue()).toEqual ("secondblah");

  entry = map.lowerEntry("thira");
  expect (entry.getKey()).toEqual ("tenth");
  expect (entry.getValue()).toEqual ("tenthblah");

  entry = map.lowerEntry("third");
  expect (entry.getKey()).toEqual ("tenth");
  expect (entry.getValue()).toEqual ("tenthblah");

  entry = map.lowerEntry("thire");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  entry = map.lowerEntry("zzzzz");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");


  map.clear();
  expect (map.lowerEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}



function testFloorKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.floorKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.floorKey(1)).toEqual (null);
  expect (map.floorKey(100)).toEqual (100);
  expect (map.floorKey(399)).toEqual (300);
  expect (map.floorKey(500)).toEqual (500);
  expect (map.floorKey(601)).toEqual (600);
  expect (map.floorKey(999)).toEqual (900);
  expect (map.floorKey(1000)).toEqual (1000);
  expect (map.floorKey(1001)).toEqual (1000);
  map.clear();
  expect (map.floorKey(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testFloorKeyStringString (map:NavigableMap<string,string>) {
  expect (map.floorKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.floorKey("a")).toEqual (null);
  expect (map.floorKey("eighth")).toEqual ("eighth");
  expect (map.floorKey("seco")).toEqual ("ninth");
  expect (map.floorKey("second")).toEqual ("second");
  expect (map.floorKey("secone")).toEqual ("second");
  expect (map.floorKey("thira")).toEqual ("tenth");
  expect (map.floorKey("third")).toEqual ("third");
  expect (map.floorKey("thire")).toEqual ("third");
  expect (map.floorKey("zzzzz")).toEqual ("third");
  map.clear();
  expect (map.floorKey("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}



function testFloorEntryNumberString (map:NavigableMap<number,string>) {
  expect (map.floorEntry(501)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  expect (map.floorEntry(1)).toEqual (null);

  let entry = map.floorEntry(100);
  expect (entry.getKey()).toEqual (100);
  expect (entry.getValue()).toEqual ("100blah");

  entry = map.floorEntry(399);
  expect (entry.getKey()).toEqual (300);
  expect (entry.getValue()).toEqual ("300blah");

  entry = map.floorEntry(500);
  expect (entry.getKey()).toEqual (500);
  expect (entry.getValue()).toEqual ("500blah");

  entry = map.floorEntry(601);
  expect (entry.getKey()).toEqual (600);
  expect (entry.getValue()).toEqual ("600blah");

  entry = map.floorEntry(999);
  expect (entry.getKey()).toEqual (900);
  expect (entry.getValue()).toEqual ("900blah");

  entry = map.floorEntry(1000);
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");

  entry = map.floorEntry(1001);
  expect (entry.getKey()).toEqual (1000);
  expect (entry.getValue()).toEqual ("1000blah");

  map.clear();
  expect (map.floorEntry(401)).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testFloorEntryStringString (map:NavigableMap<string,string>) {
  expect (map.floorEntry("a")).toEqual (null);
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);

  expect (map.floorEntry("a")).toEqual (null);

  let entry = map.floorEntry("eighth");
  expect (entry.getKey()).toEqual ("eighth");
  expect (entry.getValue()).toEqual ("eighthblah");

  entry = map.floorEntry("seco");
  expect (entry.getKey()).toEqual ("ninth");
  expect (entry.getValue()).toEqual ("ninthblah");

  entry = map.floorEntry("second");
  expect (entry.getKey()).toEqual ("second");
  expect (entry.getValue()).toEqual ("secondblah");

  entry = map.floorEntry("secone");
  expect (entry.getKey()).toEqual ("second");
  expect (entry.getValue()).toEqual ("secondblah");

  entry = map.floorEntry("thira");
  expect (entry.getKey()).toEqual ("tenth");
  expect (entry.getValue()).toEqual ("tenthblah");

  entry = map.floorEntry("third");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  entry = map.floorEntry("thire");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  entry = map.floorEntry("zzzzz");
  expect (entry.getKey()).toEqual ("third");
  expect (entry.getValue()).toEqual ("thirdblah");

  map.clear();
  expect (map.floorEntry("a")).toEqual (null);
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
