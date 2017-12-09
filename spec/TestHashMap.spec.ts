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
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
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
    private blah1:number;
    private blah2:string;
  }

  it("Test Creation state", function() {
    const myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
  });

  it("Test adding one entry", function() {
    const myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
    expect (myMap1.size ()).toEqual(1);
    expect (myMap1.isEmpty ()).toEqual(false);
  });

  it("Test adding two entries", function() {
    const myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
//    myMap1.printMap();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
//    myMap1.printMap();
    expect (myMap1.size ()).toEqual(1);
    expect (myMap1.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(myMap1.put(product2, new ValueClass()));
//    myMap1.printMap();
    expect (myMap1.size ()).toEqual(2);
    expect (myMap1.isEmpty ()).toEqual(false);
  });

  it("Test Adding some items", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    expect (petStoreMap1.size ()).toEqual(3);
    expect (petStoreMap1.isEmpty ()).toEqual(false);

    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);
    expect (petStoreMap2.isEmpty ()).toEqual(false);
  });

  it ("Test adding initial elements", function () {
    const sourceMap:HashMap<string,string> = new HashMap<string,string>(new AllFieldHashable<string>());
    expect (sourceMap.put ("A", "B")).toEqual(undefined);
    expect (sourceMap.put ("C", "D")).toEqual(undefined);
    expect (sourceMap.size ()).toEqual(2);
    const destinationMap:HashMap<string,string> = new HashMap<string,string>(new AllFieldHashable<string>(), sourceMap);
    expect (destinationMap.size ()).toEqual(2);
  });

  it("Test get", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    expect (petStoreMap1.get (product1)).toEqual(null);

    petStoreMap1.put (product1, new ValueClass());
    expect (petStoreMap1.get (product1)).not.toEqual(null);
    expect (petStoreMap1.get (product2)).toEqual(null);

    petStoreMap1.put (product2, new ValueClass());
    expect (petStoreMap1.get (product1)).not.toEqual(null);
    expect (petStoreMap1.get (product2)).not.toEqual(null);
    expect (petStoreMap1.get (product3)).toEqual(null);
  });

  it("Test clear", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());

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
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    expect (petStoreMap1.get (product1)).toEqual(null);
    expect (petStoreMap1.containsKey (product1)).toEqual(false);

    petStoreMap1.put (product1, new ValueClass());
    expect (petStoreMap1.get (product1)).not.toEqual(null);
    expect (petStoreMap1.containsKey (product1)).toEqual(true);
    expect (petStoreMap1.get (product2)).toEqual(null);
    expect (petStoreMap1.containsKey (product2)).toEqual(false);

    petStoreMap1.put (product2, new ValueClass());
    expect (petStoreMap1.get (product1)).not.toEqual(null);
    expect (petStoreMap1.containsKey (product1)).toEqual(true);
    expect (petStoreMap1.get (product2)).not.toEqual(null);
    expect (petStoreMap1.containsKey (product2)).toEqual(true);
    expect (petStoreMap1.get (product3)).toEqual(null);
    expect (petStoreMap1.containsKey (product3)).toEqual(false);
  });

  it("Test remove", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());

    expect (petStoreMap1.remove (productNotAvailable)).toEqual (null);

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    expect (petStoreMap1.size ()).toEqual(3);
    expect (petStoreMap1.isEmpty ()).toEqual(false);
    expect (petStoreMap1.remove (productNotAvailable)).toEqual (null);
    expect (petStoreMap1.size ()).toEqual(3);
    expect (petStoreMap1.isEmpty ()).toEqual(false);

    expect (petStoreMap1.containsKey (product1)).toEqual (true);
    expect (petStoreMap1.remove (product1)).not.toEqual (null);
    expect (petStoreMap1.size ()).toEqual(2);
    expect (petStoreMap1.isEmpty ()).toEqual(false);

    expect (petStoreMap1.containsKey (product1)).toEqual (false);

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

  it("Test rehash", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());

    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        for (let loop3 = 1; loop3 <= 26; loop3++) {
          for (let loop4 = 1; loop4 <= 26; loop4++) {
            const txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3) + String.fromCharCode (96 + loop4);
            const product:PetStoreProduct = new PetStoreProduct(txt, loop1 + loop2 + loop3 + loop4);
            petStoreMap1.put (product, new ValueClass());
//          console.log (txt + " " + (loop1 + loop2 + loop3));
          }
        }
      }
    }

    expect (petStoreMap1.size ()).toEqual(26 * 26 * 26 * 26);
    expect (petStoreMap1.isEmpty ()).toEqual(false);
    expect (petStoreMap1.get (product1)).toEqual(null);

    for (let loop2 = 1; loop2 <= 26; loop2++) {
      for (let loop1 = 1; loop1 <= 26; loop1++) {
        for (let loop3 = 1; loop3 <= 26; loop3++) {
          for (let loop4 = 1; loop4 <= 26; loop4++) {
            const txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3) + String.fromCharCode (96 + loop4);
            const product:PetStoreProduct = new PetStoreProduct(txt, loop1 + loop2 + loop3 + loop4);
            expect (petStoreMap1.get (product)).not.toEqual(null);
            expect (petStoreMap1.remove (product)).not.toEqual (null);
          }
        }
      }
    }


    expect (petStoreMap1.size ()).toEqual(0);
    expect (petStoreMap1.isEmpty ()).toEqual(true);
  });

  it("Test keyset jiterator basics", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    const iter:JIterator<PetStoreProduct> = keyset.iterator();
    for (; iter.hasNext(); ) {
      const p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);
  });

  it("Test keyset iterator basics", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    const tsi:Iterator<PetStoreProduct> = keyset[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);
  });

  it("Test entryset jiterator basics", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    const iter:JIterator<MapEntry<PetStoreProduct,ValueClass>> = entryset.iterator();
    for (; iter.hasNext(); ) {
      const p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);
  });

  it("Test entryset iterator basics", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    const entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    const tsi:Iterator<MapEntry<PetStoreProduct,ValueClass>> = entryset[Symbol.iterator]();
    let tmp:IteratorResult<MapEntry<PetStoreProduct,ValueClass>> = tsi.next();
    while (!tmp.done) {
      count = count + 1;
      tmp = tsi.next();
    }
    expect (count).toEqual (0);
  });

  it("Test keyset jiterator one entry", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let iter:JIterator<PetStoreProduct> = keyset.iterator();
    for (; iter.hasNext(); ) {
      const p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    count = 0;
    keyset = petStoreMap1.keySet();
    iter = keyset.iterator();
    for (; iter.hasNext(); ) {
      const p:PetStoreProduct = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (1);
  });

  it("Test keyset iterator one entry", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
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
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let iter:JIterator<MapEntry<PetStoreProduct,ValueClass>> = entryset.iterator();
    for (; iter.hasNext(); ) {
      const p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (0);

    petStoreMap1.put (product1, new ValueClass());
    entryset = petStoreMap1.entrySet();
    count = 0;
    iter = entryset.iterator();
    for (; iter.hasNext(); ) {
      const p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
    }
    expect (count).toEqual (1);
  });

  it("Test entryset iterator one entry", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
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
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    let keyset:ImmutableSet<PetStoreProduct> = petStoreMap1.keySet();
    let count:number = 0;
    let iter:JIterator<PetStoreProduct> = keyset.iterator();
    for (; iter.hasNext(); ) {
      const p:PetStoreProduct = iter.next();
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
      const p:PetStoreProduct = iter.next();
      count = count + 1;
      if (p.getProductName() === product1.getProductName()) {
        found1 = true;
      } else {
        if (p.getProductName() === product2.getProductName()) {
          found2 = true;
        }
      }
    }
    expect (count).toEqual (2);
    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test keyset iterator two entry", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
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
      const p:PetStoreProduct = tmp.value;
      if (p.getProductName() === product1.getProductName()) {
        found1 = true;
      } else {
        if (p.getProductName() === product2.getProductName()) {
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
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
    let entryset:ImmutableSet<MapEntry<PetStoreProduct,ValueClass>> = petStoreMap1.entrySet();
    let count:number = 0;
    let iter:JIterator<MapEntry<PetStoreProduct,ValueClass>> = entryset.iterator();
    for (; iter.hasNext(); ) {
      const p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
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
      const p:MapEntry<PetStoreProduct,ValueClass> = iter.next();
      count = count + 1;
      if (p.getKey().getProductName() === product1.getProductName()) {
        found1 = true;
      } else {
        if (p.getKey().getProductName() === product2.getProductName()) {
          found2 = true;
        }
      }
    }
    expect (count).toEqual (2);
    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test entryset iterator two entry", function() {
    const petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>());
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
      const p:PetStoreProduct = tmp.value.getKey();
      if (p.getProductName() === product1.getProductName()) {
        found1 = true;
      } else {
        if (p.getProductName() === product2.getProductName()) {
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
    const basicTypesMap1:HashMap<string,number> = new HashMap<string,number>(new AllFieldHashable<string>());
    expect (basicTypesMap1.put ("ChewToy", 14.99)).toEqual(undefined);
    expect (basicTypesMap1.put ("Catnip", 4.99)).toEqual(undefined);
    expect (basicTypesMap1.put ("Catnip", 9.99)).toEqual(4.99);
    expect (basicTypesMap1.get ("Catnip")).toEqual (9.99);  // Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  });

});
