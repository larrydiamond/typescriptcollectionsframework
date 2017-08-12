/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {BasicMapEntry} from "../src/BasicMapEntry";
import {Collectable} from "../src/Collectable";
import {CollectionUtils} from "../src/CollectionUtils";
import {Comparator} from "../src/Comparator";
import {TreeMap} from "../src/TreeMap";

describe("Test TreeMap functionality", function() {

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
      if (o1 === null)
        return -1;
      if (o1 === undefined)
        return -1;
      if (o2 === null)
        return 1;
      if (o2 === undefined)
        return 1;
      if (o1.getProductName() === o2.getProductName())
        return 0;
      if (o1.getProductName() === null)
        return -1;
      if (o1.getProductName() === undefined)
        return -1;
      if (o2.getProductName() === null)
        return 1;
      if (o2.getProductName() === undefined)
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
      if (o1 === null)
        return -1;
      if (o1 === undefined)
        return -1;
      if (o2 === null)
        return 1;
      if (o2 === undefined)
        return 1;
      if (o1.getPrice() === o2.getPrice())
        return 0;
      if (o1.getPrice() === null)
        return -1;
      if (o1.getPrice() === undefined)
        return -1;
      if (o2.getPrice() === null)
        return 1;
      if (o2.getPrice() === undefined)
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
    }
  }

  it("Test Creation state", function() {
    let TreeMap1:TreeMap<PetStoreProduct,ValueClass> = new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    expect (TreeMap1.size ()).toEqual(0);
    expect (TreeMap1.firstKey()).toEqual(null);
    expect (TreeMap1.firstEntry()).toEqual(null);
    expect (TreeMap1.lastKey()).toEqual(null);
    expect (TreeMap1.lastEntry()).toEqual(null);

    let TreeMap2:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (TreeMap2.size ()).toEqual(0);
    expect (TreeMap2.firstKey()).toEqual(null);
    expect (TreeMap2.firstEntry()).toEqual(null);
    expect (TreeMap2.lastKey()).toEqual(null);
    expect (TreeMap2.lastEntry()).toEqual(null);
  });

  it("Test Adding one item", function() {
    let petStoreMap1:TreeMap<PetStoreProduct,ValueClass> = new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    expect (petStoreMap1.put (product1, new ValueClass())).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(1);
    expect (petStoreMap1.firstKey()).toEqual(product1);
    expect (petStoreMap1.firstEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
    expect (petStoreMap1.lastKey()).toEqual(product1);
    expect (petStoreMap1.lastEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
  });

  it("Test Adding one native item", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.firstKey()).toEqual("ChewToy");
    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
  });

  it("Test Adding two items", function() {
    let petStoreMap1:TreeMap<PetStoreProduct,ValueClass> = new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    expect (petStoreMap1.put (product1, new ValueClass())).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(1);
    expect (petStoreMap1.firstKey()).toEqual(product1);
    expect (petStoreMap1.firstEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
    expect (petStoreMap1.lastKey()).toEqual(product1);
    expect (petStoreMap1.lastEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));

    expect (petStoreMap1.put (product2, new ValueClass(10))).toEqual(null);
    expect (petStoreMap1.size ()).toEqual(2);
    expect (petStoreMap1.firstKey()).toEqual(product2);
    expect (petStoreMap1.firstEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product2, new ValueClass(10)));
    expect (petStoreMap1.lastKey()).toEqual(product1);
    expect (petStoreMap1.lastEntry()).toEqual(new BasicMapEntry<PetStoreProduct,ValueClass>(product1, new ValueClass()));
  });

  it("Test Adding two native items", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.firstKey()).toEqual("ChewToy");
    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));

    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(2);
    expect (basicTypesMap1.firstKey()).toEqual("Catnip");
    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("Catnip", 4.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
  });

  it("Test ContainsKey where the item is contained", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Catnip")).toEqual (true);
  });

  it("Test ContainsKey where the item is not contained", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Bananas")).toEqual (false);  // I guess we have no bananas today
  });

  it("Test ContainsKey where the item is contained", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Catnip")).toEqual (true);
  });

  it("Test ContainsKey where the item is not contained", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.containsKey ("Bananas")).toEqual (false);  // I guess we have no bananas today
  });

  it("Test Adding three native items", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    basicTypesMap1.clear();
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.firstKey()).toEqual("ChewToy");
    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(2);
    expect (basicTypesMap1.firstKey()).toEqual("Catnip");
    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("Catnip", 4.99));
    expect (basicTypesMap1.lastKey()).toEqual("ChewToy");
    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("ChewToy", 14.99));
    expect (basicTypesMap1.validateMap ()).toEqual(true);

    expect (basicTypesMap1.put ("Leash", 1.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.firstKey()).toEqual("Catnip");
    expect (basicTypesMap1.firstEntry()).toEqual(new BasicMapEntry<string,number>("Catnip", 4.99));
    expect (basicTypesMap1.lastKey()).toEqual("Leash");
    expect (basicTypesMap1.lastEntry()).toEqual(new BasicMapEntry<string,number>("Leash", 1.99));
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
    let petStoreMap1:TreeMap<PetStoreProduct,ValueClass> = new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct);
    let petStoreMap2:TreeMap<PetStoreProduct,ValueClass> = new TreeMap<PetStoreProduct,ValueClass> (priceSortPetStoreProduct);
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    let basicTypesMap2:TreeMap<number,string> = new TreeMap<number,string>(CollectionUtils.getNumberComparator());

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
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
  });

  it("Test Remove from one entry map", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.size ()).toEqual(0);
    basicTypesMap1.clear();
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(1);
    basicTypesMap1.clear();
    expect (basicTypesMap1.remove ("Bananas")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(0);
  });

  it("Test Remove head both sides loaded", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("Goldfish", 9.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(4);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.size ()).toEqual(3);
  });

  it("Test Remove head left full right empty", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.remove ("ChewToy")).toEqual(14.99);
    expect (basicTypesMap1.size ()).toEqual(2);
  });

  it("Test Remove head right full left empty", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.size ()).toEqual(0);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.size ()).toEqual(3);
    expect (basicTypesMap1.remove ("AAAAA")).toEqual(0.99);
    expect (basicTypesMap1.size ()).toEqual(2);
  });

  it("Test getNextHigherKey empty map", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.getNextHigherKey ("Dog")).toEqual(null);
  });

  it("Test getNextHigherKey one element", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.getNextHigherKey ("Dog")).toEqual(null);
    expect (basicTypesMap1.getNextHigherKey ("AAAAA")).toEqual(null);
  });

  it("Test getNextHigherKey more complex map", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();

    expect (basicTypesMap1.getNextHigherKey ("AAAAA")).toEqual("Catnip");
    expect (basicTypesMap1.getNextHigherKey ("Catnip")).toEqual("ChewToy");
    expect (basicTypesMap1.getNextHigherKey ("ChewToy")).toEqual("Dry Food");
    expect (basicTypesMap1.getNextHigherKey ("Dry Food")).toEqual("Leash");
    expect (basicTypesMap1.getNextHigherKey ("Leash")).toEqual("Wet Food");
    expect (basicTypesMap1.getNextHigherKey ("Wet Food")).toEqual(null);
  });

  it("Test ceilingEntry", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.ceilingEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("AAAAA", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();

    expect (basicTypesMap1.ceilingEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.ceilingEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.ceilingEntry ("AAAAA")).toEqual(new BasicMapEntry<string,number> ("AAAAA", 0.99));
    expect (basicTypesMap1.ceilingEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.ceilingEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.ceilingEntry ("Wet Food")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));

    expect (basicTypesMap1.ceilingEntry ("Ceiling")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.ceilingEntry ("Beer")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.ceilingEntry ("Dalias")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));

    expect (basicTypesMap1.ceilingEntry ("ZZZZZ")).toEqual(null);
  });

  it("Test higherEntry", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.higherEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

  //    basicTypesMap1.printMap();

    expect (basicTypesMap1.higherEntry ("ZZZZZ")).toEqual(null);
    expect (basicTypesMap1.higherEntry ("AAAAAA")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));

    expect (basicTypesMap1.higherEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.higherEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.higherEntry ("BBBBBB")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.higherEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));
    expect (basicTypesMap1.higherEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.higherEntry ("Wet Food")).toEqual(null);

    expect (basicTypesMap1.higherEntry ("Ceiling")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.higherEntry ("Beer")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.higherEntry ("Dalias")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));

  });

  it("Test lowerEntry", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.lowerEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

    expect (basicTypesMap1.floorEntry ("AAAAAA")).toEqual(null);
    expect (basicTypesMap1.lowerEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.lowerEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.lowerEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
    expect (basicTypesMap1.lowerEntry ("Wet Food")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.lowerEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));

    expect (basicTypesMap1.lowerEntry ("Chia")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.lowerEntry ("Center")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.lowerEntry ("BCCCCC")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
    expect (basicTypesMap1.lowerEntry ("LongLeash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.lowerEntry ("Dry Kibble")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.lowerEntry ("Wet Kibble wow am I out of ideas for text")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));
  });

  it("Test floorEntry", function() {
    let basicTypesMap1:TreeMap<string,number> = new TreeMap<string,number>(CollectionUtils.getStringComparator());
    expect (basicTypesMap1.floorEntry ("TheresNothingInThisMap")).toEqual (null);
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(null);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(null);
    expect (basicTypesMap1.put ("BBBBBB", 0.99)).toEqual(null);
    expect (basicTypesMap1.put ("Leash", 6.99)).toEqual(null);
    expect (basicTypesMap1.put ("Dry Food", 7.99)).toEqual(null);
    expect (basicTypesMap1.put ("Wet Food", 7.49)).toEqual(null);

//    basicTypesMap1.printMap();

    expect (basicTypesMap1.floorEntry ("AAAAAA")).toEqual(null);

    expect (basicTypesMap1.floorEntry ("ChewToy")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.floorEntry ("Catnip")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.floorEntry ("BBBBBB")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
    expect (basicTypesMap1.floorEntry ("Leash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.floorEntry ("Dry Food")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.floorEntry ("Wet Food")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));

    expect (basicTypesMap1.floorEntry ("Chia")).toEqual(new BasicMapEntry<string,number> ("ChewToy", 14.99));
    expect (basicTypesMap1.floorEntry ("Center")).toEqual(new BasicMapEntry<string,number> ("Catnip", 4.99));
    expect (basicTypesMap1.floorEntry ("BCCCCC")).toEqual(new BasicMapEntry<string,number> ("BBBBBB", 0.99));
    expect (basicTypesMap1.floorEntry ("LongLeash")).toEqual(new BasicMapEntry<string,number> ("Leash", 6.99));
    expect (basicTypesMap1.floorEntry ("Dry Kibble")).toEqual(new BasicMapEntry<string,number> ("Dry Food", 7.99));
    expect (basicTypesMap1.floorEntry ("Wet Kibble wow am I out of ideas for text")).toEqual(new BasicMapEntry<string,number> ("Wet Food", 7.49));

  });




});
