/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldHashable} from "../src/AllFieldHashable";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {HashMap} from "../src/HashMap";
import {Hashable} from "../src/Hashable";
import {ImmutableMap} from "../src/ImmutableMap";
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
import {LinkedHashMap} from "../src/LinkedHashMap";
import {JMap} from "../src/JMap";
import {MapEntry} from "../src/MapEntry";
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

describe("Test Map functionality", function() {

  it("Test empty maps", function() {
    testEmptyStringStringMap (Collections.emptyMap<string,string>());
    testEmptyStringNumberMap (Collections.emptyMap<string,number>());
    testEmptyPetStoreProductAndValueClassMap (Collections.emptyMap<PetStoreProduct,ValueClass>());

    testEmptyStringStringMap (new HashMap<string,string> ());
    testEmptyStringStringMap (new HashMap<string,string> (new AllFieldHashable<string>()));
    testEmptyStringNumberMap (new HashMap<string,number> ());
    testEmptyStringNumberMap (new HashMap<string,number> (new AllFieldHashable<string>()));
    testEmptyPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> ());
    testEmptyPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyStringStringMap (new LinkedHashMap<string,string> ());
    testEmptyStringStringMap (new LinkedHashMap<string,string> (new AllFieldHashable<string>()));
    testEmptyStringNumberMap (new LinkedHashMap<string,number> ());
    testEmptyStringNumberMap (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testEmptyPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> ());
    testEmptyPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyStringStringMap (new TreeMap<string,string> (Collections.getStringComparator()));
    testEmptyStringNumberMap (new TreeMap<string,number> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassMap (new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testEmptyStringStringMap (new SkipListMap<string,string> (Collections.getStringComparator()));
    testEmptyStringNumberMap (new SkipListMap<string,number> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassMap (new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding to empty maps", function() {
    testAddingOneEntryStringStringMap (new HashMap<string,string> ());
    testAddingOneEntryStringStringMap (new HashMap<string,string> (new AllFieldHashable<string>()));
    testAddingOneEntryStringNumberMap (new HashMap<string,number> ());
    testAddingOneEntryStringNumberMap (new HashMap<string,number> (new AllFieldHashable<string>()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> ());
    testAddingOneEntryPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryStringStringMap (new LinkedHashMap<string,string> ());
    testAddingOneEntryStringStringMap (new LinkedHashMap<string,string> (new AllFieldHashable<string>()));
    testAddingOneEntryStringNumberMap (new LinkedHashMap<string,number> ());
    testAddingOneEntryStringNumberMap (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> ());
    testAddingOneEntryPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryStringStringMap (new TreeMap<string,string> (Collections.getStringComparator()));
    testAddingOneEntryStringNumberMap (new TreeMap<string,number> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));
  });

});



function testEmptyStringStringMap (map:ImmutableMap<string,string>) : void {
   expect (map.isEmpty ()).toEqual(true);
   expect (map.size ()).toEqual(0);
}

function testEmptyStringNumberMap (map:ImmutableMap<string,number>) : void {
   expect (map.isEmpty ()).toEqual(true);
   expect (map.size ()).toEqual(0);
}

function testEmptyPetStoreProductAndValueClassMap (map:ImmutableMap<PetStoreProduct,ValueClass>) : void {
   expect (map.isEmpty ()).toEqual(true);
   expect (map.size ()).toEqual(0);
}

function testAddingOneEntryStringStringMap (map:JMap<string,string>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", "testvalue"));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
}

function testAddingOneEntryStringNumberMap (map:JMap<string,number>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", 1));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
}

function testAddingOneEntryPetStoreProductAndValueClassMap (map:JMap<PetStoreProduct,ValueClass>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put(product1, new ValueClass()));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
}
