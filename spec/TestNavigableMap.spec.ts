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

    testFirstKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testFirstKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
  });

  it ("Test lastKey", function () {
    testLastKeyNumberString (new TreeMap<number,string>(Collections.getNumberComparator()));
    testLastKeyNumberString (new SkipListMap<number,string>(Collections.getNumberComparator()));

    testLastKeyStringString (new TreeMap<string,string>(Collections.getStringComparator()));
    testLastKeyStringString (new SkipListMap<string,string>(Collections.getStringComparator()));
  });





});

function testFirstKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.firstKey()).toEqual (100);
}

function testFirstKeyStringString (map:NavigableMap<string,string>) {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.firstKey()).toEqual ("eighth");
}

function testLastKeyNumberString (map:NavigableMap<number,string>) {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestNumbers(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.lastKey()).toEqual (1000);
}

function testLastKeyStringString (map:NavigableMap<string,string>) {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  addTestStrings(map);
  expect (map.size ()).toEqual(10);
  expect (map.isEmpty ()).toEqual(false);
  expect (map.lastKey()).toEqual ("third");
}






function addTestNumbers (map:JMap<number,string>) {
  expect (map.put (300, "blah")).toEqual(undefined);
  expect (map.put (600, "blah")).toEqual(undefined);
  expect (map.put (900, "blah")).toEqual(undefined);
  expect (map.put (1000, "blah")).toEqual(undefined);
  expect (map.put (700, "blah")).toEqual(undefined);
  expect (map.put (400, "blah")).toEqual(undefined);
  expect (map.put (100, "blah")).toEqual(undefined);
  expect (map.put (200, "blah")).toEqual(undefined);
  expect (map.put (500, "blah")).toEqual(undefined);
  expect (map.put (800, "blah")).toEqual(undefined);
}

function addTestStrings (map:JMap<string,string>) {
  expect (map.put ("first", "blah")).toEqual(undefined);
  expect (map.put ("second", "blah")).toEqual(undefined);
  expect (map.put ("third", "blah")).toEqual(undefined);
  expect (map.put ("fourth", "blah")).toEqual(undefined);
  expect (map.put ("fifth", "blah")).toEqual(undefined);
  expect (map.put ("sixth", "blah")).toEqual(undefined);
  expect (map.put ("seventh", "blah")).toEqual(undefined);
  expect (map.put ("eighth", "blah")).toEqual(undefined);
  expect (map.put ("ninth", "blah")).toEqual(undefined);
  expect (map.put ("tenth", "blah")).toEqual(undefined);
}
