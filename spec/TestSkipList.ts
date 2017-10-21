/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {BasicMapEntry} from "../src/BasicMapEntry";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {SkipListMap} from "../src/SkipList";
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
import {MapEntry} from "../src/MapEntry";

export class testNumber {
  public static equals (failMessage:string, val:number, expected:number) : void {
    if (val !== expected) {
      fail (failMessage + " - value was " + val + " expected " + expected);
    }
  }
  public static notNullOrUndefined (failMessage:string, val:number) : void {
    if ((val === null) || (val === undefined)) {
      fail (failMessage + " - expected not null or undefined value was " + val);
    }
  }
}

export class testString {
  public static equals (failMessage:string, val:string, expected:string) : void {
    if (val !== expected) {
      fail (failMessage + " - value was " + val + " expected " + expected);
    }
  }
  public static notNullOrUndefined (failMessage:string, val:string) : void {
    if ((val === null) || (val === undefined)) {
      fail (failMessage + " - expected not null or undefined value was " + val);
    }
  }
}

export class testBoolean {
  public static equals (failMessage:string, val:boolean, expected:boolean) : void {
    if (val !== expected) {
      fail (failMessage + " - value was " + val + " expected " + expected);
    }
  }
  public static equalsTrue (failMessage:string, val:boolean) {
    if (val !== true) {
      fail (failMessage + " - expected true value was " + val);
    }
  }
  public static equalsFalse (failMessage:string, val:boolean) {
    if (val !== false) {
      fail (failMessage + " - expected true value was " + val);
    }
  }
  public static notNullOrUndefined (failMessage:string, val:boolean) : void {
    if ((val === null) || (val === undefined)) {
      fail (failMessage + " - expected not null or undefined value was " + val);
    }
  }
}

export class test {
  public static equals (failMessage:string, val:any, expected:any) : void {
    if (val !== expected) {
      fail (failMessage + " - value was " + val + " expected " + expected);
    }
  }
  public static notNullOrUndefined (failMessage:string, val:any) : void {
    if ((val === null) || (val === undefined)) {
      fail (failMessage + " - expected not null or undefined value was " + val);
    }
  }
}

describe("Test SkipListMap functionality", function() {

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
  };

  let product1:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  let product2:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  let product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);

  let alphabeticalSortPetStoreProduct:Comparator<PetStoreProduct> = {
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
  }

  let priceSortPetStoreProduct:Comparator<PetStoreProduct> = {
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
      if (o1.getPrice() === o2.getPrice())
        return 0;
        if (o1.getPrice() === undefined)
          return -1;
      if (o1.getPrice() === null)
        return -1;
        if (o2.getPrice() === undefined)
          return 1;
      if (o2.getPrice() === null)
        return 1;

      if (o1.getPrice() < o2.getPrice())
        return -1;

      return 1;
    }
  }

  // Wanted to show a class in the value object but anything would work fine
  class ValueClass {
    blah1:number;
    blah2:string;

    constructor (blah1 = 100) {
      this.blah2 = "blah";
    }
  }

  it("Test Creation state", function() {
    let SkipListMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    testNumber.equals("Expected newly constructed SkipListMap to be empty", SkipListMap1.size (), 0);
    testBoolean.equalsTrue("Expected isempty to return true for new SkipListMap", SkipListMap1.isEmpty ());
    expect (SkipListMap1.firstKey()).toEqual(null);
    expect (SkipListMap1.firstEntry()).toEqual(null);
    expect (SkipListMap1.lastKey()).toEqual(null);
    expect (SkipListMap1.lastEntry()).toEqual(null);
    test.equals ("Validate map failed", true, SkipListMap1.validateMap());

    let SkipListMap2:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    testNumber.equals("Expected newly constructed SkipListMap to be empty", SkipListMap2.size (), 0);
    expect (SkipListMap2.firstKey()).toEqual(null);
    expect (SkipListMap2.firstEntry()).toEqual(null);
    expect (SkipListMap2.lastKey()).toEqual(null);
    expect (SkipListMap2.lastEntry()).toEqual(null);
    test.equals ("Validate map failed", true, SkipListMap2.validateMap());
  });

  it("Test Adding one item", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    expect (petStoreMap1.put (product1, new ValueClass())).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(1);
    expect (petStoreMap1.isEmpty ()).toEqual(false);
    expect (petStoreMap1.firstKey()).toEqual(product1);
//    expect (petStoreMap1.firstEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
    expect (petStoreMap1.lastKey()).toEqual(product1);
//    expect (petStoreMap1.lastEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
    test.equals ("Validate map failed", true, petStoreMap1.validateMap());
  });

  it("Test Adding one native item", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.firstKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    test.equals ("Validate map failed", true, basicTypesMap1.validateMap());
  });

  it ("Test adding initial elements out of order", function () {
    let sourceMap:SkipListMap<string,string> = new SkipListMap<string,string>(Collections.getStringComparator());
    test.equals ("Adding C to empty map", null, sourceMap.put ("C", "D"));
    test.equals ("Adding A to 1 entry map", null, sourceMap.put ("A", "B"));
    test.equals ("Expected sourceMap size incorrect", 2, sourceMap.size());
    test.equals ("Validate sourceMap failed", true, sourceMap.validateMap());
  });

/*
  it ("Test adding initial elements in order ", function () {
    let sourceMap:SkipListMap<string,string> = new SkipListMap<string,string>(Collections.getStringComparator());
    test.equals ("Adding A to empty map", null, sourceMap.put ("A", "B"));
    test.equals ("Adding C to 1 entry map", null, sourceMap.put ("C", "D"));
    test.equals ("Expected sourceMap size incorrect", 2, sourceMap.size());
    test.equals ("Validate sourceMap failed", true, sourceMap.validateMapDisplay());

    let destinationMap:SkipListMap<string,string> = new SkipListMap<string,string>(Collections.getStringComparator(), sourceMap);
    test.equals ("Expected destination Map size incorrect", 2, destinationMap.size());
    test.equals ("Validate destinationMap failed", true, destinationMap.validateMapDisplay());
  });

  it ("Test adding and copying initial elements out of order", function () {
    let sourceMap:SkipListMap<string,string> = new SkipListMap<string,string>(Collections.getStringComparator());
    test.equals ("Adding C to empty map", null, sourceMap.put ("C", "D"));
    test.equals ("Adding A to 1 entry map", null, sourceMap.put ("A", "B"));
    test.equals ("Expected sourceMap size incorrect", 2, sourceMap.size());
    test.equals ("Validate sourceMap failed", true, sourceMap.validateMap());

    let destinationMap:SkipListMap<string,string> = new SkipListMap<string,string>(Collections.getStringComparator(), sourceMap);
    test.equals ("Expected destination Map size incorrect", 2, destinationMap.size());
    test.equals ("Validate destinationMap failed", true, destinationMap.validateMap());
  });

  it("Test Adding two items", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    expect (petStoreMap1.put (product1, new ValueClass())).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(1);
    expect (petStoreMap1.firstKey()).toEqual(product1);
//    expect (petStoreMap1.firstEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
    expect (petStoreMap1.lastKey()).toEqual(product1);
//    expect (petStoreMap1.lastEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));

    expect (petStoreMap1.put (product2, new ValueClass(10))).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(2);
    expect (petStoreMap1.firstKey()).toEqual(product2);
//    expect (petStoreMap1.firstEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product2, new ValueClass(10)));
    expect (petStoreMap1.lastKey()).toEqual(product1);
//    expect (petStoreMap1.lastEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
  });

  it("Test Adding two native items", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.firstKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));

    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(2);
    expect (basicTypesMap1.firstKey()).toEqual("Catnip");
//    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("Catnip", 4.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
  });

  it("Test ContainsKey where the item is contained", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.containsKey ("ZZZZZZ")).toEqual (false);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Catnip")).toEqual (true);
  });

  it("Test ContainsKey where the item is not contained", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Bananas")).toEqual (false);  // I guess we have no bananas today
  });

  it("Test ContainsKey where the item is contained", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Catnip")).toEqual (true);
  });

  it("Test ContainsKey where the item is not contained", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Bananas")).toEqual (false);  // I guess we have no bananas today
  });

  it("Test Adding three native items", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    basicTypesMap1.clear();
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.firstKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(2);
    expect (basicTypesMap1.firstKey()).toEqual("Catnip");
//    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("Catnip", 4.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
//    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("Leash", 1.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.firstKey()).toEqual("Catnip");
//    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("Catnip", 4.99));
    expect (basicTypesMap1.lastKey()).toEqual("Leash");
//    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("Leash", 1.99));
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.size ()).toEqual(3);
    basicTypesMap1.clear();
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 1.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.validateMap ()).toEqual(true);

  });

  it("Test Adding some items", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    let petStoreMap2:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    let basicTypesMap2:SkipListMap<number,string> = new SkipListMap<number,string>(Collections.getNumberComparator());

    expect (basicTypesMap1.get ("ZZZZZZ")).toEqual (null);

    expect (petStoreMap1.put (product1, new ValueClass())).toEqual(null);
    expect (petStoreMap1.put (product2, new ValueClass(10))).toEqual(null);
    expect (petStoreMap1.put (product3, new ValueClass())).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(3);

    expect (petStoreMap2.put (product1, new ValueClass())).toEqual(null);
    expect (petStoreMap2.put (product2, new ValueClass())).toEqual(null);
    expect (petStoreMap2.size ()).toEqual(2);

    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("Goldfish", 9.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(4);
    expect (basicTypesMap1.get ("ZZZZZZ")).toEqual (null);

    let oldPrice:number = basicTypesMap1.put ("ChewToy", 9.99);
    expect (oldPrice).toEqual (14.99);
    expect (basicTypesMap1.size ()).toEqual(4);
    expect (basicTypesMap1.get ("Catnip")).toEqual (4.99);
    expect (basicTypesMap1.put ("Catnip", 5.99)).toEqual (4.99);
    expect (basicTypesMap1.size ()).toEqual(4);
    expect (basicTypesMap1.get ("Catnip")).toEqual (5.99);

    expect (basicTypesMap2.put (14.99, "ChewToy")).toEqual(null);
    expect (basicTypesMap2.put (4.99, "Catnip")).toEqual(null);
    expect (basicTypesMap2.put (9.99, "Goldfish")).toEqual(null);
    expect (basicTypesMap2.put (0.99, "AAAAA")).toEqual(null);
    expect (basicTypesMap2.put (0.99, "BBBBB")).toEqual("AAAAA");
    expect (basicTypesMap2.size ()).toEqual(4);
  });

  it("Test Remove from empty", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.validateMap()).toEqual (true);
  });

  it("Test Remove from one entry map", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    basicTypesMap1.clear();
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    basicTypesMap1.clear();
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.validateMap()).toEqual (true);
  });

  it("Test Remove head both sides loaded", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("Goldfish", 9.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(4);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.validateMap()).toEqual (true);
  });

  it("Test Remove head left full right empty", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.size ()).toEqual(2);
    expect (basicTypesMap1.validateMap()).toEqual (true);
  });

  it("Test Remove head right full left empty", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.remove ("AAAAA")).toEqual(0.99);
    expect (basicTypesMap1.size ()).toEqual(2);
    expect (basicTypesMap1.validateMap()).toEqual (true);
  });

  it ("Test remove cover all the cases", function () {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.size ()).toEqual(6);
    expect (basicTypesMap1.put ("Furry Food", 0.49)).toEqual(null);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.size ()).toEqual(7);
    expect (basicTypesMap1.remove ("Dry Food")).toEqual(7.99);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.size ()).toEqual(6);
    expect (basicTypesMap1.put ("Gaspacho   why would a pet store sell soup?   why not?", 9.49)).toEqual(null);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.size ()).toEqual(7);
    expect (basicTypesMap1.remove ("Furry Food")).toEqual(0.49);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.size ()).toEqual(6);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.validateMap()).toEqual (true);
    expect (basicTypesMap1.size ()).toEqual(5);
  });

  it("Test getNextHigherKey empty map", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.getNextHigherKey ("Dog")).toEqual(null);
  });

  it("Test getNextHigherKey one element", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.getNextHigherKey ("Dog")).toEqual(null);
    expect (basicTypesMap1.getNextHigherKey ("AAAAA")).toEqual(null);
  });

  it("Test getNextHigherKey more complex map", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();
    expect (basicTypesMap1.getNextHigherKey ("BBBBBB")).toEqual("Catnip");
    expect (basicTypesMap1.getNextHigherKey ("Catnip")).toEqual("ChewToy");
    expect (basicTypesMap1.getNextHigherKey ("ChewToy")).toEqual("Dry Food");
    expect (basicTypesMap1.getNextHigherKey ("Dry Food")).toEqual("Leash");
    expect (basicTypesMap1.getNextHigherKey ("Leash")).toEqual("Wet Food");
    expect (basicTypesMap1.getNextHigherKey ("Wet Food")).toEqual(null);

    expect (basicTypesMap1.getNextHigherKey ("AAAAAA")).toEqual(null);
    expect (basicTypesMap1.getNextHigherKey ("GGGGGG")).toEqual(null);
    expect (basicTypesMap1.getNextHigherKey ("ZZZZZZ")).toEqual(null);

  });

  it("Test ceilingEntry", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.ceilingEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();

//    expect (basicTypesMap1.ceilingEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.ceilingEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.ceilingEntry ("AAAAA")).toEqual(new BasicMapEntry<string,number> ("AAAAA", 0.99));
//    expect (basicTypesMap1.ceilingEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
//    expect (basicTypesMap1.ceilingEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
//    expect (basicTypesMap1.ceilingEntry ("Wet Food")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));

//    expect (basicTypesMap1.ceilingEntry ("Ceiling")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.ceilingEntry ("Beer")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.ceilingEntry ("Dalias")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));

    expect (basicTypesMap1.ceilingEntry ("ZZZZZ")).toEqual(null);
  });

  it("Test ceilingKey", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.ceilingKey ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();

    expect (basicTypesMap1.ceilingKey ("ChewToy")).toEqual("ChewToy");
    expect (basicTypesMap1.ceilingKey ("Catnip")).toEqual("Catnip");
    expect (basicTypesMap1.ceilingKey ("BBBBBB")).toEqual("BBBBBB");
    expect (basicTypesMap1.ceilingKey ("Leash")).toEqual("Leash");
    expect (basicTypesMap1.ceilingKey ("Dry Food")).toEqual("Dry Food");
    expect (basicTypesMap1.ceilingKey ("Wet Food")).toEqual("Wet Food");

    expect (basicTypesMap1.ceilingKey ("AAAAAA")).toEqual("BBBBBB");
    expect (basicTypesMap1.ceilingKey ("Ceiling")).toEqual("ChewToy");
    expect (basicTypesMap1.ceilingKey ("Beer")).toEqual("Catnip");
    expect (basicTypesMap1.ceilingKey ("Dalias")).toEqual("Dry Food");
    expect (basicTypesMap1.ceilingKey ("VVVVV")).toEqual("Wet Food");

    expect (basicTypesMap1.ceilingKey ("ZZZZZ")).toEqual(null);
  });

  it("Test higherEntry", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.higherEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

  //    basicTypesMap1.printMap();

    expect (basicTypesMap1.higherEntry ("ZZZZZ")).toEqual(null);
//    expect (basicTypesMap1.higherEntry ("AAAAAA")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));

//    expect (basicTypesMap1.higherEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
//    expect (basicTypesMap1.higherEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.higherEntry ("BBBBBB")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.higherEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));
//    expect (basicTypesMap1.higherEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.higherEntry ("Wet Food")).toEqual(null);

//    expect (basicTypesMap1.higherEntry ("Ceiling")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.higherEntry ("Beer")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.higherEntry ("Dalias")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));

  });

  it("Test higherKey", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.higherKey ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

  //    basicTypesMap1.printMap();

    expect (basicTypesMap1.higherKey ("ZZZZZ")).toEqual(null);
    expect (basicTypesMap1.higherKey ("AAAAAA")).toEqual("BBBBBB");

    expect (basicTypesMap1.higherKey ("ChewToy")).toEqual("Dry Food");
    expect (basicTypesMap1.higherKey ("Catnip")).toEqual("ChewToy");
    expect (basicTypesMap1.higherKey ("BBBBBB")).toEqual("Catnip");
    expect (basicTypesMap1.higherKey ("Leash")).toEqual("Wet Food");
    expect (basicTypesMap1.higherKey ("Dry Food")).toEqual("Leash");
    expect (basicTypesMap1.higherKey ("Wet Food")).toEqual(null);

    expect (basicTypesMap1.higherKey ("Ceiling")).toEqual("ChewToy");
    expect (basicTypesMap1.higherKey ("Beer")).toEqual("Catnip");
    expect (basicTypesMap1.higherKey ("Dalias")).toEqual("Dry Food");

  });

  it("Test lowerEntry", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.lowerEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

    expect (basicTypesMap1.lowerEntry ("AAAAAA")).toEqual(null);
//    expect (basicTypesMap1.lowerEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.lowerEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.lowerEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
//    expect (basicTypesMap1.lowerEntry ("Wet Food")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
//    expect (basicTypesMap1.lowerEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));

//    expect (basicTypesMap1.lowerEntry ("Chia")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.lowerEntry ("Center")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.lowerEntry ("BCCCCC")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
//    expect (basicTypesMap1.lowerEntry ("LongLeash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
//    expect (basicTypesMap1.lowerEntry ("Dry Kibble")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.lowerEntry ("Wet Kibble wow am I out of ideas for text")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));
  });

  it("Test floorEntry", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.floorEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();

    expect (basicTypesMap1.floorEntry ("AAAAAA")).toEqual(null);

//    expect (basicTypesMap1.floorEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.floorEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.floorEntry ("BBBBBB")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
//    expect (basicTypesMap1.floorEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
//    expect (basicTypesMap1.floorEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
//    expect (basicTypesMap1.floorEntry ("Wet Food")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));

//    expect (basicTypesMap1.floorEntry ("Chia")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
//    expect (basicTypesMap1.floorEntry ("Center")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
//    expect (basicTypesMap1.floorEntry ("BCCCCC")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
//    expect (basicTypesMap1.floorEntry ("LongLeash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
//    expect (basicTypesMap1.floorEntry ("Dry Kibble")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.floorEntry ("Wet Kibble wow am I out of ideas for text")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));

  });

  it("Test lowerKey", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.lowerKey ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

    expect (basicTypesMap1.lowerKey ("AAAAAA")).toEqual(null);
    expect (basicTypesMap1.lowerKey ("Dry Food")).toEqual("ChewToy");
    expect (basicTypesMap1.lowerKey ("ChewToy")).toEqual("Catnip");
    expect (basicTypesMap1.lowerKey ("Catnip")).toEqual("BBBBBB");
    expect (basicTypesMap1.lowerKey ("Wet Food")).toEqual("Leash");
    expect (basicTypesMap1.lowerKey ("Leash")).toEqual("Dry Food");

    expect (basicTypesMap1.lowerKey ("Chia")).toEqual("ChewToy");
    expect (basicTypesMap1.lowerKey ("Center")).toEqual("Catnip");
    expect (basicTypesMap1.lowerKey ("BCCCCC")).toEqual("BBBBBB");
    expect (basicTypesMap1.lowerKey ("LongLeash")).toEqual("Leash");
    expect (basicTypesMap1.lowerKey ("Dry Kibble")).toEqual("Dry Food");
    expect (basicTypesMap1.lowerKey ("Wet Kibble wow am I out of ideas for text")).toEqual("Wet Food");
  });

  it("Test floorKey", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.floorKey ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

  //    basicTypesMap1.printMap();

    expect (basicTypesMap1.floorKey ("AAAAAA")).toEqual(null);

    expect (basicTypesMap1.floorKey ("ChewToy")).toEqual("ChewToy");
    expect (basicTypesMap1.floorKey ("Catnip")).toEqual("Catnip",);
    expect (basicTypesMap1.floorKey ("BBBBBB")).toEqual("BBBBBB");
    expect (basicTypesMap1.floorKey ("Leash")).toEqual("Leash");
    expect (basicTypesMap1.floorKey ("Dry Food")).toEqual("Dry Food");
    expect (basicTypesMap1.floorKey ("Wet Food")).toEqual("Wet Food");

    expect (basicTypesMap1.floorKey ("Chia")).toEqual("ChewToy");
    expect (basicTypesMap1.floorKey ("Center")).toEqual("Catnip");
    expect (basicTypesMap1.floorKey ("BCCCCC")).toEqual("BBBBBB");
    expect (basicTypesMap1.floorKey ("LongLeash")).toEqual("Leash");
    expect (basicTypesMap1.floorKey ("Dry Kibble")).toEqual("Dry Food");
    expect (basicTypesMap1.floorKey ("Wet Kibble wow am I out of ideas for text")).toEqual("Wet Food");

  });

  it("Test lots", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);

    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        for (let loop3 = 1; loop3 <= 1; loop3++) {
          let txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3);
          let product:PetStoreProduct = new PetStoreProduct(txt, loop1 + loop2 + loop3);
          petStoreMap1.put (product, new ValueClass());
//          console.log (txt + " " + (loop1 + loop2 + loop3));
        }
      }
    }

    expect (petStoreMap1.validateMap ()).toEqual(true);

    expect (petStoreMap1.size ()).toEqual(26 * 26);
//    expect (petStoreMap1.isEmpty ()).toEqual(false);
    expect (petStoreMap1.get (product1)).toEqual(null);

    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        for (let loop3 = 1; loop3 <= 1; loop3++) {
          let txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3);
          let product:PetStoreProduct = new PetStoreProduct(txt, loop1 + loop2 + loop3);
          expect (petStoreMap1.get (product)).not.toEqual(null);
          expect (petStoreMap1.remove (product)).not.toEqual (null);
        }
      }
    }

    expect (petStoreMap1.validateMap ()).toEqual(true);

    expect (petStoreMap1.size ()).toEqual(0);
//    expect (petStoreMap1.isEmpty ()).toEqual(true);

    for (let loop2 = 1; loop2 <= 26; loop2++) {
      for (let loop1 = 1; loop1 <= 26; loop1++) {
        for (let loop3 = 1; loop3 <= 1; loop3++) {
          let txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3);
          let product:PetStoreProduct = new PetStoreProduct(txt, loop1 + loop2 + loop3);
          petStoreMap1.put (product, new ValueClass());
//          console.log (txt + " " + (loop1 + loop2 + loop3));
        }
      }
    }

    expect (petStoreMap1.validateMap ()).toEqual(true);

    expect (petStoreMap1.size ()).toEqual(26 * 26);
//    expect (petStoreMap1.isEmpty ()).toEqual(false);
    expect (petStoreMap1.get (product1)).toEqual(null);

    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        for (let loop3 = 1; loop3 <= 1; loop3++) {
          let txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3);
          let product:PetStoreProduct = new PetStoreProduct(txt, loop1 + loop2 + loop3);
          expect (petStoreMap1.get (product)).not.toEqual(null);
          expect (petStoreMap1.remove (product)).not.toEqual (null);
        }
      }
    }

    expect (petStoreMap1.validateMap ()).toEqual(true);

    expect (petStoreMap1.size ()).toEqual(0);
//    expect (petStoreMap1.isEmpty ()).toEqual(true);
  });

  it("Test keyset jiterator basics", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let iter:JIterator<PetStoreProduct> = keyset.iterator();
    for (; iter.hasNext(); ) {
      let p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);
  });

  it("Test keyset iterator basics", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let tsi:Iterator<PetStoreProduct> = keyset[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);
  });

  it("Test entryset jiterator basics", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let iter:JIterator<MapEntry<PetStoreProduct,ValueClass>> = entryset.iterator();
    for (; iter.hasNext(); ) {
      let p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);
  });

  it("Test entryset iterator basics", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let tsi:Iterator<MapEntry<PetStoreProduct,ValueClass>> = entryset[Symbol.iterator]();
    let tmp:IteratorResult<MapEntry<PetStoreProduct,ValueClass>> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);
  });

  it("Test keyset jiterator one entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let iter:JIterator<PetStoreProduct> = keyset.iterator();
    for (; iter.hasNext(); ) {
      let p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    count = 0;
    keyset = petStoreMap1.keySet();
    iter = keyset.iterator();
    for (; iter.hasNext(); ) {
      let p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (1);
  });

  it("Test keyset iterator one entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let tsi:Iterator<PetStoreProduct> = keyset[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    count = 0;
    keyset = petStoreMap1.keySet();
    tsi = keyset[Symbol.iterator]();
    tmp = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (1);
  });

  it("Test entryset jiterator one entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let iter:JIterator<MapEntry<PetStoreProduct,ValueClass>> = entryset.iterator();
    for (; iter.hasNext(); ) {
      let p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    entryset = petStoreMap1.entrySet();
    count = 0;
    iter = entryset.iterator();
    for (; iter.hasNext(); ) {
      let p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (1);
  });

  it("Test entryset iterator one entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let tsi:Iterator<MapEntry<PetStoreProduct,ValueClass>> = entryset[Symbol.iterator]();
    let tmp:IteratorResult<MapEntry<PetStoreProduct,ValueClass>> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    count = 0;
    entryset = petStoreMap1.entrySet();
    tsi = entryset[Symbol.iterator]();
    tmp = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (1);
  });

  it("Test keyset jiterator two entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let iter:JIterator<PetStoreProduct> = keyset.iterator();
    for (; iter.hasNext(); ) {
      let p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    count = 0;
    keyset = petStoreMap1.keySet();
    iter = keyset.iterator();
    let found1:boolean = false;
    let found2:boolean = false;
    for (; iter.hasNext(); ) {
      let p:PetStoreProduct = iter.next();
      count = count + 1;
      if (p.getPrice() === (product1.getPrice())) {
        found1 = true;
      } else {
        if (p.getPrice() === (product2.getPrice())) {
          found2 = true;
        }
      }
    }
    expect (count).toEqual (2);
    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test keyset iterator two entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let tsi:Iterator<PetStoreProduct> = keyset[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    count = 0;
    keyset = petStoreMap1.keySet();
    tsi = keyset[Symbol.iterator]();
    tmp = tsi.next();
    let found1:boolean = false;
    let found2:boolean = false;
    while (!tmp.done) {
      let p:PetStoreProduct = tmp.value;
      if (p.getPrice() === (product1.getPrice())) {
        found1 = true;
      } else {
        if (p.getPrice() === (product2.getPrice())) {
          found2 = true;
        }
      }
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (2);
    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test entryset jiterator two entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let iter:JIterator<MapEntry<PetStoreProduct,ValueClass>> = entryset.iterator();
    for (; iter.hasNext(); ) {
      let p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    entryset = petStoreMap1.entrySet();
    count = 0;
    iter = entryset.iterator();
    let found1:boolean = false;
    let found2:boolean = false;
    for (; iter.hasNext(); ) {
      let p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
      if (p.getKey().getPrice() === (product1.getPrice())) {
        found1 = true;
      } else {
        if (p.getKey().getPrice() === (product2.getPrice())) {
          found2 = true;
        }
      }
    }
    expect (count).toEqual (2);
    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test entryset iterator two entry", function() {
    let petStoreMap1:SkipListMap<PetStoreProduct,ValueClass> = new SkipListMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let tsi:Iterator<MapEntry<PetStoreProduct,ValueClass>> = entryset[Symbol.iterator]();
    let tmp:IteratorResult<MapEntry<PetStoreProduct,ValueClass>> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    count = 0;
    entryset = petStoreMap1.entrySet();
    tsi = entryset[Symbol.iterator]();
    tmp = tsi.next();
    let found1:boolean = false;
    let found2:boolean = false;
    while (!tmp.done) {
      let p:PetStoreProduct = tmp.value.getKey();
      if (p.getPrice() === (product1.getPrice())) {
        found1 = true;
      } else {
        if (p.getPrice() === (product2.getPrice())) {
          found2 = true;
        }
      }
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (2);
    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test map entry replacement", function() {
    let basicTypesMap1:SkipListMap<string,number> = new SkipListMap<string,number>(Collections.getStringComparator());
    expect (basicTypesMap1.ceilingKey ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 9.99)).toEqual(4.99);
    expect (basicTypesMap1.get ("Catnip")).toEqual (9.99);  // Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.

  });
*/

});
