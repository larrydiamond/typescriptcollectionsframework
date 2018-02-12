/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "../src/AllFieldHashable";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {EntryIterator, KeyIterator, LinkedEntry, LinkedHashMap, ValueIterator} from "../src/LinkedHashMap";
import {HashMap} from "../src/HashMap";
import {Hashable} from "../src/Hashable";
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
import {MapEntry} from "../src/MapEntry";

describe("Test LinkedHashMap functionality", function() {

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

  const product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  const product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
  const productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 1.99);

  // Wanted to show a class in the value object but anything would work fine
  class ValueClass {
    public blah1:number = 1;
    private blah2:string = "1";
  }

  it("Test Creation state", function() {
    const myMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
  });

  it("Test adding one entry", function() {
    const myMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
    expect (myMap1.size ()).toEqual(1);
    expect (myMap1.isEmpty ()).toEqual(false);
  });

  it("Test adding two entries", function() {
    const myMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
    expect (myMap1.size ()).toEqual(1);
    expect (myMap1.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(myMap1.put(product2, new ValueClass()));
    expect (myMap1.size ()).toEqual(2);
    expect (myMap1.isEmpty ()).toEqual(false);
  });

  it("Test adding three entries", function() {
    const myMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
    expect (myMap1.size ()).toEqual(1);
    expect (myMap1.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(myMap1.put(product2, new ValueClass()));
    expect (myMap1.size ()).toEqual(2);
    expect (myMap1.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(myMap1.put(product3, new ValueClass()));
    expect (myMap1.size ()).toEqual(3);
    expect (myMap1.isEmpty ()).toEqual(false);
  });

  it("Test key jiterator three entry", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let count:number = 0;
    let keys:string[] = [];

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    count = 0;

    let linkedIter:KeyIterator<PetStoreProduct, ValueClass> = petStoreMap1.newKeyIterator();
    for (; linkedIter.hasNext(); ) {
      const p:PetStoreProduct = linkedIter._next();
      keys[count] = p.getProductName();
      count = count + 1;
    }
    expect (count).toEqual (3);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
    expect (keys[0]).toEqual("Catnip");
    expect (keys[1]).toEqual("ChewToy");
    expect (keys[2]).toEqual("Goldfish");
  });

  it("Test value jiterator two entry", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let count:number = 0;
    let values:number[] = [];

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    count = 0;

    let linkedIter:ValueIterator<PetStoreProduct, ValueClass> = petStoreMap1.newValueIterator();
    for (; linkedIter.hasNext(); ) {
      const p:ValueClass = linkedIter._next();
      values[count] = p.blah1;
      count = count + 1;
    }
    expect (count).toEqual (2);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
    expect (values[0]).toEqual(1);
    expect (values[1]).toEqual(1);
  });

  it("Test Entry jiterator two entry", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let count:number = 0;

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    count = 0;

    let linkedIter:EntryIterator<PetStoreProduct, ValueClass> = petStoreMap1.newEntryIterator();
    for (; linkedIter.hasNext(); ) {
      const p:LinkedEntry<PetStoreProduct,ValueClass> = linkedIter._next();
      count = count + 1;
    }
    expect (count).toEqual (2);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
  });

  it("Test clear", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    const petStoreMap2:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    expect (petStoreMap1.size ()).toEqual(3);
    expect (petStoreMap1.isEmpty ()).toEqual(false);
    petStoreMap1.clear ();
    expect (petStoreMap1.size ()).toEqual(0);
    expect (petStoreMap1.isEmpty ()).toEqual(true);
    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    expect (petStoreMap1.size ()).toEqual(3);
    expect (petStoreMap1.isEmpty ()).toEqual(false);

    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);
    expect (petStoreMap2.isEmpty ()).toEqual(false);
    petStoreMap2.clear ();
    expect (petStoreMap2.isEmpty ()).toEqual(true);
    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);
    expect (petStoreMap2.isEmpty ()).toEqual(false);
  });

  it("Test containskey", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    expect (petStoreMap1.get (product1)).toEqual(undefined);
    expect (petStoreMap1.containsKey (product1)).toEqual(false);

    petStoreMap1.put (product1, new ValueClass());
    expect (petStoreMap1.get (product1)).not.toEqual(undefined);
    expect (petStoreMap1.containsKey (product1)).toEqual(true);
    expect (petStoreMap1.get (product2)).toEqual(undefined);
    expect (petStoreMap1.containsKey (product2)).toEqual(false);

    petStoreMap1.put (product2, new ValueClass());
    expect (petStoreMap1.get (product1)).not.toEqual(undefined);
    expect (petStoreMap1.containsKey (product1)).toEqual(true);
    expect (petStoreMap1.get (product2)).not.toEqual(undefined);
    expect (petStoreMap1.containsKey (product2)).toEqual(true);
    expect (petStoreMap1.get (product3)).toEqual(undefined);
    expect (petStoreMap1.containsKey (product3)).toEqual(false);
  });


});
