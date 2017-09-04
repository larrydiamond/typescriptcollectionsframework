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
import {GenericCollectable} from "../src/CollectionUtils";
import {JIterator} from "../src/JIterator";
import {LinkedList} from "../src/LinkedList";
import {List} from "../src/List";

describe("Test ArrayList functionality", function() {

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

  let product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  let product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  let product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
  let productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 0.00); // we have no bananas today


  it("Test Creation state", function() {
    let list:List<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);

    let collection:Collection<PetStoreProduct> = list;
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);
  });

  it("Test Adding some items", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    let list:List<PetStoreProduct> = arraylist;
    let collection:Collection<PetStoreProduct> = list;

    expect (arraylist.contains (product3)).toEqual (false);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.contains (product2)).toEqual (true);
    expect (arraylist.contains (product3)).toEqual (false);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);
  });

  it("Test clearing the ArrayList", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    let list:List<PetStoreProduct> = arraylist;
    let collection:Collection<PetStoreProduct> = list;

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    arraylist.clear();  // returns void, nothing to expect :(

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    expect (arraylist.isEmpty ()).toEqual(false);
    expect (arraylist.size ()).toEqual(2);
    expect (list.isEmpty ()).toEqual(false);
    expect (list.size ()).toEqual(2);
    expect (collection.isEmpty ()).toEqual(false);
    expect (collection.size ()).toEqual(2);

    list.clear ();  // returns void, nothing to expect :(

    expect (arraylist.isEmpty ()).toEqual(true);
    expect (arraylist.size ()).toEqual(0);
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

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
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    let index0:PetStoreProduct = arraylist.get (0);
    let index1:PetStoreProduct = arraylist.get (1);

    expect (product1.getProductName()).toEqual (index0.getProductName());
    expect (product2.getProductName()).toEqual (index1.getProductName());
    expect (product1.getPrice()).toEqual (index0.getPrice());
    expect (product2.getPrice()).toEqual (index1.getPrice());
  });

  it("Test indexof", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (arraylist.lastIndexOf(product1)).toEqual(-1);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(-1);
    expect (arraylist.lastIndexOf(product1)).toEqual(0);
    expect (arraylist.lastIndexOf (product3)).toEqual(-1);
    expect (arraylist.lastIndexOf (product2)).toEqual(5);
  });

  it("Test set", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    let oldElement:PetStoreProduct = arraylist.set (1, product3);
    expect (oldElement).toEqual(product2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test java iteration", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    let offset:number = 0;
    for (let iter = arraylist.iterator(); iter.hasNext(); ) {
      let psp:PetStoreProduct = iter.next ();

      if (offset === 0)
        expect (psp.getProductName()).toEqual (product1.getProductName());
      if (offset === 1)
        expect (psp.getProductName()).toEqual (product2.getProductName());
      if (offset > 1)
        fail();

       offset++;
    }
  });

  it("Test addElement at front of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    arraylist.addElement (0, product3);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(1);
    expect (arraylist.indexOf (product2)).toEqual(2);
    expect (arraylist.indexOf (product3)).toEqual(0);
  });

  it("Test addElement in middle of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    arraylist.addElement (1, product3);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(2);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test addElement at end of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    arraylist.addElement (2, product3);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(2);
  });

  it("Test remove at front of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (arraylist.remove (0)).toEqual (undefined);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.remove (0)).toEqual (product1);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(-1);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test remove in middle of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.remove (1)).toEqual (product2);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test remove at end of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.remove (2)).toEqual (product3);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(-1);
  });


  it("Test removeElement at front of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (arraylist.removeElement (product1)). toEqual (false);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.removeElement (product1)). toEqual (true);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(-1);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test removeElement in middle of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.removeElement (product2)). toEqual (true);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test removeElement at end of list", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.removeElement (product3)). toEqual (true);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(-1);
  });

  it("Test duplicates in array", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.size ()).toEqual(4);

    expect (arraylist.removeElement (product1)). toEqual (true);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(2);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(1);

    arraylist.add (product3);
    expect (arraylist.size ()).toEqual(4);
    expect (arraylist.indexOf (product3)).toEqual(1);

    expect (arraylist.removeElement (product3)). toEqual (true);
    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(1);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(2);

    expect (arraylist.removeElement (productNotAvailable)). toEqual (false);
  });

  it("Test addall", function() {
    let victim:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (victim.addAll (null)).toEqual (false);
    expect (victim.addAll (undefined)).toEqual (false);
    expect (victim.addAll (new ArrayList<PetStoreProduct>(new GenericCollectable<PetStoreProduct>()))).toEqual (false);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.size ()).toEqual(4);
    expect (victim.addAll (arraylist)).toEqual (true);
  });

  it("Test removeall", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (arraylist.removeAll(null)).toEqual(false);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    let removelist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (arraylist.removeAll(removelist)).toEqual(false);
    expect (removelist.add (product2)).toEqual (true);
    expect (removelist.add (product3)).toEqual (true);

    expect (arraylist.removeAll(removelist)).toEqual(true);
    expect (arraylist.size ()).toEqual(1);

    expect (removelist.add (productNotAvailable)).toEqual (true);
    expect (arraylist.removeAll(removelist)).toEqual(false);
    expect (arraylist.size ()).toEqual(1);
  });

  it("Test equals", function() {
      let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (arraylist.add (product1)).toEqual (true);
      expect (arraylist.add (product2)).toEqual (true);

      let list2:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (list2.add (product1)).toEqual (true);
      expect (list2.add (product2)).toEqual (true);
      expect (list2.add (product3)).toEqual (true);

      expect (arraylist.equals (null)).toEqual(false);
      expect (arraylist.equals (undefined)).toEqual(false);
      expect (arraylist.equals (list2)).toEqual(false);
      expect (arraylist.equals (arraylist)).toEqual(true);
      expect (list2.equals (list2)).toEqual(true);
  });

  it("Test typescript iteration", function() {
    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    let offset:number = 0;
    let pspi:Iterator<PetStoreProduct> = arraylist[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = pspi.next();
    expect (tmp.done).toEqual(false);
    expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));
    tmp = pspi.next();
    expect (tmp.done).toEqual(false);
    expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));
    tmp = pspi.next();
    expect (tmp.done).toEqual(true);
  });

  it("Test constructing with elements from an ArrayList", function() {
    let sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (sourceList);
    expect (arraylist.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from a LinkedList", function() {
    let sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    let arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (sourceList);
    expect (arraylist.size ()).toEqual(sourceList.size());
  });

});
