/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "../src/AllFieldHashable";
import {EntryIterator, KeyIterator, LinkedEntry, LinkedHashMap, ValueIterator} from "../src/LinkedHashMap";

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

  const product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  const product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
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

  it ("Test adding initial elements", function () {
    const sourceMap:LinkedHashMap<string,string> = new LinkedHashMap<string,string>(new AllFieldHashable<string>());
    expect (sourceMap.put ("A", "B")).toEqual(undefined);
    expect (sourceMap.put ("C", "D")).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(2);
    const destinationMap:LinkedHashMap<string,string> = new LinkedHashMap<string,string>(new AllFieldHashable<string>(), sourceMap);
    expect (destinationMap.size ()).toEqual(2);
  });

  it ("Test adding more initial elements", function () {
    const sourceMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>();
    expect (sourceMap.put (product1, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product2, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product3, new ValueClass())).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(3);
    const destinationMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>(new AllFieldHashable<PetStoreProduct>(), sourceMap);
    expect (destinationMap.size ()).toEqual(3);
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

  it("Test key jiterator three entries", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let count:number = 0;
    let keys:string[] = [];

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());

    let linkedIter:KeyIterator<PetStoreProduct, ValueClass> = petStoreMap1.newKeyIterator();
    for (; linkedIter.hasNext(); ) {
      const p:PetStoreProduct = linkedIter._next();
      keys[count] = p.getProductName();
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
    expect (keys[0]).toEqual("Catnip");
    expect (keys[1]).toEqual("ChewToy");
    expect (keys[2]).toEqual("Goldfish");
  });

  it("Test-1 value jiterator two entries", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let count:number = 0;
    let values:number[] = [];

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());

    let linkedIter:ValueIterator<PetStoreProduct, ValueClass> = petStoreMap1.newValueIterator();
    for (; linkedIter.hasNext(); ) {
      const p:ValueClass = linkedIter._next();
      values[count] = p.blah1;
      count = count + 1;
    }
    expect (count).toEqual(2);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
    expect (values[0]).toEqual(1);
    expect (values[1]).toEqual(1);
  });

  it("Test-2 value jiterator three entries", function() {
    const petStoreMap1:LinkedHashMap<string,string> = new LinkedHashMap<string,string> ();
    let count:number = 0;
    let values:string[] = [];

    petStoreMap1.put ("A", "B");
    petStoreMap1.put ("C", "D");
    petStoreMap1.put ("E", "F");

    let linkedIter:ValueIterator<string,string> = petStoreMap1.newValueIterator();
    for (; linkedIter.hasNext(); ) {
      const p:string = linkedIter._next();
      values[count] = p
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (petStoreMap1.containsKey("E")).toEqual(true);
    expect (values[0]).toEqual("B");
    expect (values[1]).toEqual("D");
    expect (values[2]).toEqual("F");
  });

  it("Test-1 entry jiterator two entries", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let count:number = 0;

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());

    let linkedIter:EntryIterator<PetStoreProduct, ValueClass> = petStoreMap1.newEntryIterator();
    for (; linkedIter.hasNext(); ) {
      const p:LinkedEntry<PetStoreProduct,ValueClass> = linkedIter._next();
      count = count + 1;
    }
    expect (count).toEqual(2);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
  });

  it("Test-2 entry jiterator three entries", function() {
    const petStoreMap1:LinkedHashMap<string,string> = new LinkedHashMap<string,string> ();
    let count:number = 0;
    let p:LinkedEntry<string,string>;

    petStoreMap1.put ("A", "B");
    petStoreMap1.put ("C", "D");
    petStoreMap1.put ("E", "F");

    let linkedIter:EntryIterator<string, string> = petStoreMap1.newEntryIterator();
    for (; linkedIter.hasNext(); ) {
      p = linkedIter._next();
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (p.getKey()).toEqual("E");
    expect (p.getValue()).toEqual("F");
  });

  it ("Test-1 Entry jiterator two entries with initial elements", function () {
    const sourceMap:LinkedHashMap<string,string> = new LinkedHashMap<string,string>(new AllFieldHashable<string>());
    expect (sourceMap.put ("A", "B")).toEqual(undefined);
    expect (sourceMap.put ("C", "D")).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(2);
    const destinationMap:LinkedHashMap<string,string> = new LinkedHashMap<string,string>(new AllFieldHashable<string>(), sourceMap);
    expect (destinationMap.size ()).toEqual(2);

    let count:number = 0;

    let linkedIter:EntryIterator<string,string> = destinationMap.newEntryIterator();
    for (; linkedIter.hasNext(); ) {
      const p:LinkedEntry<string,string> = linkedIter._next();
      count = count + 1;
    }
    expect (count).toEqual(2);
    expect (destinationMap.containsKey("C")).toEqual(true);

  });

  it ("Test-2 Entry jiterator two entries with initial elements", function () {
    const sourceMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>();
    expect (sourceMap.put (product1, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product2, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product3, new ValueClass())).toEqual(undefined);
    expect (sourceMap.size()).toEqual(3);
    const destinationMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>(new AllFieldHashable<PetStoreProduct>(), sourceMap);
    expect (destinationMap.size()).toEqual(3);

    let count:number = 0;

    let linkedIter:EntryIterator<PetStoreProduct,ValueClass> = destinationMap.newEntryIterator();
    for (; linkedIter.hasNext(); ) {
      const p:LinkedEntry<PetStoreProduct,ValueClass> = linkedIter._next();
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (destinationMap.containsKey(product3)).toEqual(true);

  });

  it ("Test-1 value jiterator two entries with initial elements", function () {
    const sourceMap:LinkedHashMap<string,string> = new LinkedHashMap<string,string>(new AllFieldHashable<string>());
    expect (sourceMap.put ("A", "B")).toEqual(undefined);
    expect (sourceMap.put ("C", "D")).toEqual(undefined);
    expect (sourceMap.put ("E", "F")).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(3);
    const destinationMap:LinkedHashMap<string,string> = new LinkedHashMap<string,string>(new AllFieldHashable<string>(), sourceMap);
    expect (destinationMap.size ()).toEqual(3);

    let count:number = 0;
    let values:string[] = [];

    let linkedIter:ValueIterator<string,string> = destinationMap.newValueIterator();
    for (; linkedIter.hasNext(); ) {
      const p:string = linkedIter._next();
      values[count] = p;
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (destinationMap.containsKey("A")).toEqual(true);
    expect (destinationMap.containsKey("C")).toEqual(true);
    expect (destinationMap.containsKey("E")).toEqual(true);
    expect (values[0]).toEqual("D");
    expect (values[1]).toEqual("B");
    expect (values[2]).toEqual("F");
  });

  it ("Test-2 value jiterator two entries with initial elements", function () {
    const sourceMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>();
    expect (sourceMap.put (product1, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product2, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product3, new ValueClass())).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(3);
    const destinationMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>(new AllFieldHashable<PetStoreProduct>(), sourceMap);
    expect (destinationMap.size ()).toEqual(3);

    let count:number = 0;
    let values:number[] = [];

    let linkedIter:ValueIterator<PetStoreProduct,ValueClass> = destinationMap.newValueIterator();
    for (; linkedIter.hasNext(); ) {
      const p:ValueClass = linkedIter._next();
      values[count] = p.blah1;
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (destinationMap.containsKey(product1)).toEqual(true);
    expect (destinationMap.containsKey(product2)).toEqual(true);
    expect (destinationMap.containsKey(product3)).toEqual(true);
    expect (values[0]).toEqual(1);
    expect (values[1]).toEqual(1);
    expect (values[2]).toEqual(1);
  });

  it ("Test value remove entry success", function () {
    const sourceMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>();
    expect (sourceMap.put (product1, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product2, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product3, new ValueClass())).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(3);
    expect (sourceMap.remove(product1)).toEqual(new ValueClass());

    let count:number = 0;
    let values:number[] = [];

    let linkedIter:ValueIterator<PetStoreProduct,ValueClass> = sourceMap.newValueIterator();
    for (; linkedIter.hasNext(); ) {
      const p:ValueClass = linkedIter._next();
      values[count] = p.blah1;
      count = count + 1;
    }
    expect (count).toEqual(2);
    expect (sourceMap.containsKey(product1)).toEqual(false);
    expect (sourceMap.containsKey(product2)).toEqual(true);
    expect (sourceMap.containsKey(product3)).toEqual(true);
    expect (values[0]).toEqual(1);
    expect (values[1]).toEqual(1);
  });

  it ("Test value remove entry failure", function () {
    const sourceMap:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass>();
    expect (sourceMap.put (product1, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product2, new ValueClass())).toEqual(undefined);
    expect (sourceMap.put (product3, new ValueClass())).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(3);
    const product5:PetStoreProduct = new PetStoreProduct("test", 4.99);
    expect (sourceMap.remove(product5)).toBeNull();
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
    expect (petStoreMap1.size ()).toEqual(2);
    expect (petStoreMap1.isEmpty ()).toEqual(false);
    petStoreMap1.clear ();

    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);
    expect (petStoreMap2.isEmpty ()).toEqual(false);
    petStoreMap2.clear ();
    expect (petStoreMap2.size ()).toEqual(0);
    expect (petStoreMap2.isEmpty ()).toEqual(true);

    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    petStoreMap2.put (product3, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(3);
    expect (petStoreMap2.isEmpty ()).toEqual(false);
    petStoreMap2.clear ();
    expect (petStoreMap2.size ()).toEqual(0);
    expect (petStoreMap2.isEmpty ()).toEqual(true);
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

  it("Test containsvalue", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let value:ValueClass = new ValueClass();
    value.blah1 = 9;
    expect (petStoreMap1.containsValue (value)).toEqual(false);

    petStoreMap1.put (product1, value);
    expect (petStoreMap1.get (product1)).not.toEqual(undefined);
    expect (petStoreMap1.containsValue (value)).toEqual(true);
  });

});
