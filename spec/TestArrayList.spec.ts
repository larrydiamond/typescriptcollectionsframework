/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {AllFieldCollectable} from "../src/AllFieldCollectable";
import {AllFieldHashable} from "../src/AllFieldHashable";
import {ArrayList} from "../src/ArrayList";
import {Collectable} from "../src/Collectable";
import {Collection} from "../src/Collection";
import {Comparator} from "../src/Comparator";
import {HashSet} from "../src/HashSet";
import {JIterator} from "../src/JIterator";
import {LinkedList} from "../src/LinkedList";
import {List} from "../src/List";
import {TreeSet} from "../src/TreeSet";

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

  const product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  const product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
  const productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 0.00); // we have no bananas today


  it("Test Creation state", function() {
    const list:List<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (list.isEmpty ()).toEqual(true);
    expect (list.size ()).toEqual(0);

    const collection:Collection<PetStoreProduct> = list;
    expect (collection.isEmpty ()).toEqual(true);
    expect (collection.size ()).toEqual(0);
  });

  it("Test Adding some items", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    const list:List<PetStoreProduct> = arraylist;
    const collection:Collection<PetStoreProduct> = list;

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
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    const list:List<PetStoreProduct> = arraylist;
    const collection:Collection<PetStoreProduct> = list;

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
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    const index0:PetStoreProduct = arraylist.get (0);
    const index1:PetStoreProduct = arraylist.get (1);

    expect (product1.getProductName()).toEqual (index0.getProductName());
    expect (product2.getProductName()).toEqual (index1.getProductName());
    expect (product1.getPrice()).toEqual (index0.getPrice());
    expect (product2.getPrice()).toEqual (index1.getPrice());
  });

  it("Test indexof", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
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
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    const oldElement:PetStoreProduct = arraylist.set (1, product3);
    expect (oldElement).toEqual(product2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test java iteration", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    let offset:number = 0;
    for (const iter = arraylist.iterator(); iter.hasNext(); ) {
      const psp:PetStoreProduct = iter.next ();

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
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    arraylist.addIndex (0, product3);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(1);
    expect (arraylist.indexOf (product2)).toEqual(2);
    expect (arraylist.indexOf (product3)).toEqual(0);
  });

  it("Test addElement in middle of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    arraylist.addIndex (1, product3);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(2);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test addElement at end of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    arraylist.addIndex (2, product3);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(2);
  });

  it("Test remove at front of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (arraylist.removeIndex (0)).toEqual (undefined);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.removeIndex (0)).toEqual (product1);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(-1);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test remove in middle of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.removeIndex (1)).toEqual (product2);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test remove at end of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.removeIndex (2)).toEqual (product3);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(-1);
  });


  it("Test removeElement at front of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (arraylist.remove (product1)). toEqual (false);

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.remove (product1)). toEqual (true);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(-1);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test removeElement in middle of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.remove (product2)). toEqual (true);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(-1);
    expect (arraylist.indexOf (product3)).toEqual(1);
  });

  it("Test removeElement at end of list", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.remove (product3)). toEqual (true);

    expect (arraylist.size ()).toEqual(2);
    expect (arraylist.indexOf (product1)).toEqual(0);
    expect (arraylist.indexOf (product2)).toEqual(1);
    expect (arraylist.indexOf (product3)).toEqual(-1);
  });

  it("Test duplicates in array", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.size ()).toEqual(4);

    expect (arraylist.remove (product1)). toEqual (true);

    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(2);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(1);

    arraylist.add (product3);
    expect (arraylist.size ()).toEqual(4);
    expect (arraylist.indexOf (product3)).toEqual(1);

    expect (arraylist.remove (product3)). toEqual (true);
    expect (arraylist.size ()).toEqual(3);
    expect (arraylist.indexOf (product1)).toEqual(1);
    expect (arraylist.indexOf (product2)).toEqual(0);
    expect (arraylist.indexOf (product3)).toEqual(2);

    expect (arraylist.remove (productNotAvailable)). toEqual (false);
  });

  it("Test addall", function() {
    const victim:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (victim.addAll (null)).toEqual (false);
    expect (victim.addAll (undefined)).toEqual (false);
    expect (victim.addAll (new ArrayList<PetStoreProduct>(new AllFieldCollectable<PetStoreProduct>()))).toEqual (false);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);
    expect (arraylist.add (product3)).toEqual (true);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.size ()).toEqual(4);
    expect (victim.addAll (arraylist)).toEqual (true);
  });

  it("Test removeall", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (arraylist.removeAll(null)).toEqual(false);
    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    const removelist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (arraylist.removeAll(removelist)).toEqual(false);
    expect (removelist.add (product2)).toEqual (true);
    expect (removelist.add (product3)).toEqual (true);

    expect (arraylist.removeAll(removelist)).toEqual(true);
    expect (arraylist.size ()).toEqual(1);

    expect (removelist.add (productNotAvailable)).toEqual (true);
    expect (arraylist.removeAll(removelist)).toEqual(false);
    expect (arraylist.size ()).toEqual(1);
  });

  it("Test typescript iteration", function() {
    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

    expect (arraylist.add (product1)).toEqual (true);
    expect (arraylist.add (product2)).toEqual (true);

    const offset:number = 0;
    const pspi:Iterator<PetStoreProduct> = arraylist[Symbol.iterator]();
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
    const sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (sourceList.getCollectable(), sourceList);
    expect (arraylist.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from a LinkedList", function() {
    const sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (sourceList.getCollectable(), sourceList);
    expect (arraylist.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from an HashSet", function() {
    const source:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (source.add (product1)).toEqual (true);
    expect (source.add (product2)).toEqual (true);

    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (source.getHashable(), source);
    expect (arraylist.size ()).toEqual(source.size());
  });


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
    }

  it("Test constructing with elements from a TreeSet", function() {
    const source:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (source.add (product1)).toEqual (false);
    expect (source.add (product2)).toEqual (false);

    const arraylist:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>(), source);
    expect (arraylist.size ()).toEqual(source.size());
  });

});
