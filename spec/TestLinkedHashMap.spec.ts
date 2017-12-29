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
import {HashMap} from "../src/HashMap";
import {Hashable} from "../src/Hashable";
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
import {KeyIterator, LinkedHashMap} from "../src/LinkedHashMap";
import {MapEntry} from "../src/MapEntry";

describe("Test HashMap functionality", function() {

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
    private blah1:number = 1;
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

  it("Test keyset jiterator two entry", function() {
    const petStoreMap1:LinkedHashMap<PetStoreProduct,ValueClass> = new LinkedHashMap<PetStoreProduct,ValueClass> ();
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    count = 0;
    keyset = petStoreMap1.keySet();

    let linkedIter:KeyIterator<PetStoreProduct, ValueClass> = petStoreMap1.newKeyIterator();
    for (; linkedIter.hasNext(); ) {
      const p:PetStoreProduct = linkedIter._next();
      count = count + 1;
    }
    expect (count).toEqual (2);
    expect (petStoreMap1.containsKey(product2)).toEqual(true);
  });


});
