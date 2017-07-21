/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {ArrayList} from "../src/ArrayList";
import {Collectable} from "../src/Collectable";
import {Collection} from "../src/Collection";
import {JIterator} from "../src/JIterator";
import {List} from "../src/List";

describe("Test ArrayList functionality", function() {

  // PetStoreProduct will be used in testing the ArrayList class
  class PetStoreProduct implements Collectable {
    public productName:string;
    public price:number;

    constructor (iName:string, iPrice:number) {
      this.productName = iName;
      this.price = iPrice;
    }

    equals (t:any) : boolean {
      if (JSON.stringify(this) === JSON.stringify(t))
        return true;
      return false;
    };
  };

  let product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  let product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  let product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);


  it("Test Creation state", function() {
    let list:List<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);

    let collection:Collection<PetStoreProduct> = list;
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);
  });

  it("Test Adding some items", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    let list:List<PetStoreProduct> = arraylist;
    let collection:Collection<PetStoreProduct> = list;

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);
  });

  it("Test clearing the ArrayList", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();
    let list:List<PetStoreProduct> = arraylist;
    let collection:Collection<PetStoreProduct> = list;

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    arraylist.clear();

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    list.clear ();

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    collection.clear ();

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);
  });

  it("Test get", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();

    arraylist.add (product1);
    arraylist.add (product2);

    let index0:PetStoreProduct = arraylist.get (0);
    let index1:PetStoreProduct = arraylist.get (1);

    expect (product1.equals (index0)).toEqual(true);
    expect (product1.equals (index1)).toEqual(false);
    expect (product2.equals (index0)).toEqual(false);
    expect (product2.equals (index1)).toEqual(true);
  });

  it("Test indexof", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();

    arraylist.add (product1);
    arraylist.add (product2);

    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(-1);
  });

  it("Test set", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();

    arraylist.add (product1);
    arraylist.add (product2);

    arraylist.set (1, product3);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test java iteration", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();

    arraylist.add (product1);
    arraylist.add (product2);

    let offset:number = 0;
    for (let iter = arraylist.iterator(); iter.hasNext(); ) {
      let psp:PetStoreProduct = iter.next ();

      if (offset === 0)
        expect (psp.productName).toEqual (product1.productName);
      if (offset === 1)
        expect (psp.productName).toEqual (product2.productName);
      if (offset > 1)
        fail();

       offset++;
    }
  });

/*
  it("Easy iteration", function () {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> ();

    arraylist.add (product1);
    arraylist.add (product2);

    let offset:number = 0;

    arraylist.for (thisElement => {
      if (offset === 0)
        expect (thisElement.productName).toEqual (product1.productName);
      if (offset === 1)
        expect (thisElement.productName).toEqual (product2.productName);
      if (offset > 1)
        fail();

        offset++;
    });
  });
*/

});
