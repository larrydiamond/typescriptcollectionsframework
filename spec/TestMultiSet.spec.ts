/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldHashable} from "../src/AllFieldHashable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {HashMultiSet} from "../src/HashClasses";
import {HashSet} from "../src/HashSet";
import {ImmutableMultiSet} from "../src/ImmutableMultiSet";
import {ImmutableSet} from "../src/ImmutableSet";
import {JSet} from "../src/JSet";
import {MultiSet} from "../src/MultiSet";

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


describe("Test generic MultiSet functionality", function () {
    it("Test empty MultiSets", function () {
        testEmptyStringMultiSet(Collections.emptyMultiSet<string>());
        testEmptyPetStoreProductAndValueClassMultiSet(Collections.emptyMultiSet<PetStoreProduct>());
        testEmptyStringMultiSet(new HashMultiSet<string>());
        testEmptyStringMultiSet(new HashMultiSet<string>(new AllFieldHashable<string>()));

        testEmptyNumberMultiSet(Collections.emptyMultiSet<number>());
        testEmptyPetStoreProductAndValueClassMultiSet(Collections.emptyMultiSet<PetStoreProduct>());
        testEmptyNumberMultiSet(new HashMultiSet<number>());
        testEmptyNumberMultiSet(new HashMultiSet<number>(new AllFieldHashable<number>()));

        testEmptyPetStoreProductAndValueClassMultiSet(new HashMultiSet<PetStoreProduct>());
        testEmptyPetStoreProductAndValueClassMultiSet(new HashMultiSet<PetStoreProduct>(new AllFieldHashable<PetStoreProduct>()));
    });

  it("Test adding one item to empty MultiSet", function() {
    testAddingOneEntryStringSet (new HashMultiSet<string> ());
    testAddingOneEntryStringSet (new HashMultiSet<string> (new AllFieldHashable<string>()));

    testAddingOneEntryNumberSet (new HashMultiSet<number> ());
    testAddingOneEntryNumberSet (new HashMultiSet<number> (new AllFieldHashable<number>()));

    testAddingOneEntryPetStoreProductAndValueClassSet (new HashMultiSet<PetStoreProduct> ());
    testAddingOneEntryPetStoreProductAndValueClassSet (new HashMultiSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));
  });
});

function testEmptyStringMultiSet (tmp:ImmutableMultiSet<string>) : void {
    expect (tmp.isEmpty ()).toEqual(true);
    expect (tmp.size ()).toEqual(0);
 }
 
 function testEmptyNumberMultiSet (tmp:ImmutableMultiSet<number>) : void {
    expect (tmp.isEmpty ()).toEqual(true);
    expect (tmp.size ()).toEqual(0);
 }
 
 function testEmptyPetStoreProductAndValueClassMultiSet (tmp:ImmutableMultiSet<PetStoreProduct>) : void {
   expect (tmp.isEmpty ()).toEqual(true);
   expect (tmp.size ()).toEqual(0);
}

function testAddingOneEntryStringSet (tmp:MultiSet<string>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add("testkey"));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains ("testkey"));
    expect (false).toEqual (tmp.contains ("key not found"));
  }
  
  function testAddingOneEntryNumberSet (tmp:MultiSet<number>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(100));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains (100));
    expect (false).toEqual (tmp.contains (200));
  }
  
  function testAddingOneEntryPetStoreProductAndValueClassSet (tmp:MultiSet<PetStoreProduct>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(product1));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
  }
  