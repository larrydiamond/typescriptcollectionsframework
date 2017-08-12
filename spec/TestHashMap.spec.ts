/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {Collectable} from "../src/Collectable";
import {CollectionUtils} from "../src/CollectionUtils";
import {Comparator} from "../src/Comparator";
import {HashMap} from "../src/HashMap";
import {Hashable} from "../src/Hashable";

describe("Test HashMap functionality", function() {

  // PetStoreProduct will be used in testing
  class PetStoreProduct implements Hashable {
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

    equals (t:any) : boolean {
      if (t instanceof PetStoreProduct) {
        if ((this.productName === t.getProductName()) && (this.price === t.getPrice()))
          return true;
      }
      return false;
    }

    hashCode () : number {
      if (this.price === undefined)
        return 1;
      if (this.price === null)
        return 1;
      let tmp:number = Math.abs (this.price);
      return Math.ceil (tmp);
    }
  };

  let product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  let product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  let product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
  let productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 1.99);

  // Wanted to show a class in the value object but anything would work fine
  class ValueClass {
    blah1:number;
    blah2:string;
  }

  it("Test Creation state", function() {
    let myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
  });

  it("Test adding one entry", function() {
    let myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (myMap1.isEmpty ()).toEqual(true);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
    expect (myMap1.size ()).toEqual(1);
    expect (myMap1.isEmpty ()).toEqual(false);
  });

  it("Test adding two entries", function() {
    let myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
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
    let petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    let petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();

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

  it("Test get", function() {
    let petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
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
    let petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    let petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();

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
    let petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
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
    let petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    let petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();

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

});
