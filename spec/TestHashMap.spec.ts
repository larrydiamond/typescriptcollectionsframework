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
  }

  it("Test Creation state", function() {
    let myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
  });

  it("Test adding one entry", function() {
    let myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    expect (myMap1.size ()).toEqual(0);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
    expect (myMap1.size ()).toEqual(1);
  });

  it("Test adding two entries", function() {
    let myMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
//    myMap1.printMap();
    expect (myMap1.size ()).toEqual(0);
    expect (undefined).toEqual(myMap1.put(product1, new ValueClass()));
//    myMap1.printMap();
    expect (myMap1.size ()).toEqual(1);
    expect (undefined).toEqual(myMap1.put(product2, new ValueClass()));
//    myMap1.printMap();
    expect (myMap1.size ()).toEqual(2);
  });

  it("Test Adding some items", function() {
    let petStoreMap1:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();
    let petStoreMap2:HashMap<PetStoreProduct,ValueClass> = new HashMap<PetStoreProduct,ValueClass> ();

    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    expect (petStoreMap1.size ()).toEqual(3);

    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);
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
    petStoreMap1.clear ();
    expect (petStoreMap1.size ()).toEqual(0);
    petStoreMap1.put (product1, new ValueClass());
    petStoreMap1.put (product2, new ValueClass());
    petStoreMap1.put (product3, new ValueClass());
    expect (petStoreMap1.size ()).toEqual(3);

    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);
    petStoreMap2.clear ();
    petStoreMap2.put (product1, new ValueClass());
    petStoreMap2.put (product2, new ValueClass());
    expect (petStoreMap2.size ()).toEqual(2);

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

});
