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
import {LinkedList} from "../src/LinkedList";
import {List} from "../src/List";
import {TreeSet} from "../src/TreeSet";

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
const productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 0.00); // we have no bananas today

describe("Test LinkedList functionality", function() {


    it("Test Creation state", function() {
      const list:List<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (list.isEmpty ()).toEqual(true);
      expect (list.size ()).toEqual(0);

      const collection:Collection<PetStoreProduct> = list;
      expect (collection.isEmpty ()).toEqual(true);
      expect (collection.size ()).toEqual(0);
    });

    it("Test Adding some items", function() {
      const ll:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      const list:List<PetStoreProduct> = ll;
      const collection:Collection<PetStoreProduct> = list;

      expect (ll.contains (product3)).toEqual (false);
      expect (ll.add (product1)).toEqual (true);
      expect (ll.add (product2)).toEqual (true);
      expect (ll.contains (product2)).toEqual (true);
      expect (ll.contains (product3)).toEqual (false);

      expect (ll.isEmpty ()).toEqual(false);
      expect (ll.size ()).toEqual(2);
      expect (list.isEmpty ()).toEqual(false);
      expect (list.size ()).toEqual(2);
      expect (collection.isEmpty ()).toEqual(false);
      expect (collection.size ()).toEqual(2);

    });

    it("Test AddFirst", function() {
      const ll:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> ();
      const list:List<PetStoreProduct> = ll;
      const collection:Collection<PetStoreProduct> = list;

      expect (ll.contains (product3)).toEqual (false);
      expect (ll.addFirst (product1)).toEqual (true);
      expect (ll.addFirst (product2)).toEqual (true);
      expect (ll.contains (product2)).toEqual (true);
      expect (ll.contains (product3)).toEqual (false);

      expect (ll.isEmpty ()).toEqual(false);
      expect (ll.size ()).toEqual(2);
      expect (list.isEmpty ()).toEqual(false);
      expect (list.size ()).toEqual(2);
      expect (collection.isEmpty ()).toEqual(false);
      expect (collection.size ()).toEqual(2);

    });

    it("Test clearing the LinkedList", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      const list:List<PetStoreProduct> = thelist;
      const collection:Collection<PetStoreProduct> = list;

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      expect (thelist.isEmpty ()).toEqual(false);
      expect (thelist.size ()).toEqual(2);
      expect (list.isEmpty ()).toEqual(false);
      expect (list.size ()).toEqual(2);
      expect (collection.isEmpty ()).toEqual(false);
      expect (collection.size ()).toEqual(2);

      thelist.clear();  // returns void, nothing to expect :(

      expect (thelist.isEmpty ()).toEqual(true);
      expect (thelist.size ()).toEqual(0);
      expect (list.isEmpty ()).toEqual(true);
      expect (list.size ()).toEqual(0);
      expect (collection.isEmpty ()).toEqual(true);
      expect (collection.size ()).toEqual(0);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      expect (thelist.isEmpty ()).toEqual(false);
      expect (thelist.size ()).toEqual(2);
      expect (list.isEmpty ()).toEqual(false);
      expect (list.size ()).toEqual(2);
      expect (collection.isEmpty ()).toEqual(false);
      expect (collection.size ()).toEqual(2);

      list.clear ();  // returns void, nothing to expect :(

      expect (thelist.isEmpty ()).toEqual(true);
      expect (thelist.size ()).toEqual(0);
      expect (list.isEmpty ()).toEqual(true);
      expect (list.size ()).toEqual(0);
      expect (collection.isEmpty ()).toEqual(true);
      expect (collection.size ()).toEqual(0);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      expect (thelist.isEmpty ()).toEqual(false);
      expect (thelist.size ()).toEqual(2);
      expect (list.isEmpty ()).toEqual(false);
      expect (list.size ()).toEqual(2);
      expect (collection.isEmpty ()).toEqual(false);
      expect (collection.size ()).toEqual(2);

      collection.clear ();

      expect (thelist.isEmpty ()).toEqual(true);
      expect (thelist.size ()).toEqual(0);
      expect (list.isEmpty ()).toEqual(true);
      expect (list.size ()).toEqual(0);
      expect (collection.isEmpty ()).toEqual(true);
      expect (collection.size ()).toEqual(0);
    });

    it("Test get", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      const index0:PetStoreProduct = thelist.get (0);
      const index1:PetStoreProduct = thelist.get (1);

      expect (product1.getProductName()).toEqual (index0.getProductName());
      expect (product2.getProductName()).toEqual (index1.getProductName());
      expect (product1.getPrice()).toEqual (index0.getPrice());
      expect (product2.getPrice()).toEqual (index1.getPrice());

      expect (thelist.get (5000)).toEqual (null);
    });

    it("Test indexof", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (thelist.indexOf (product1)).toEqual(-1);
      expect (thelist.lastIndexOf(product1)).toEqual(-1);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(-1);
      expect (thelist.lastIndexOf(product1)).toEqual(0);
      expect (thelist.lastIndexOf (product3)).toEqual(-1);
      expect (thelist.lastIndexOf (product2)).toEqual(5);
    });

    it("Test set", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      const oldElement:PetStoreProduct = thelist.set (1, product3);
      expect (oldElement).toEqual(product2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(-1);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test java iteration", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      let offset:number = 0;
      for (const iter = thelist.iterator(); iter.hasNext(); ) {
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
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      thelist.addIndex (0, product3);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(1);
      expect (thelist.indexOf (product2)).toEqual(2);
      expect (thelist.indexOf (product3)).toEqual(0);
    });

    it("Test addElement in middle of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      thelist.addIndex (1, product3);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(2);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test addElement at end of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      thelist.addIndex (2, product3);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(2);
    });

    it("Test remove at front of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (thelist.removeIndex (0)).toEqual (undefined);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.removeIndex (0)).toEqual (product1);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(-1);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(1);
      expect (thelist.removeIndex (4000)).toEqual (undefined);
    });

    it("Test remove in middle of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.removeIndex (1)).toEqual (product2);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(-1);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test remove at end of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.removeIndex (2)).toEqual (product3);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(-1);
    });


    it("Test removeElement at front of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (thelist.remove (product1)). toEqual (false);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.remove (product1)). toEqual (true);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(-1);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test removeElement in middle of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.remove (product2)). toEqual (true);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(-1);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test removeElement at end of list", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.remove (product3)). toEqual (true);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(-1);
    });

    it("Test duplicates in array", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.size ()).toEqual(4);

      expect (thelist.remove (product1)). toEqual (true);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(2);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(1);

      thelist.add (product3);
      expect (thelist.size ()).toEqual(4);
      expect (thelist.indexOf (product3)).toEqual(1);

      expect (thelist.remove (product3)). toEqual (true);
      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(1);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(2);

      expect (thelist.remove (productNotAvailable)). toEqual (false);
    });

    it("Test addall", function() {
      const victim:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (victim.addAll (null)).toEqual (false);
      expect (victim.addAll (undefined)).toEqual (false);
      expect (victim.addAll (new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>()))).toEqual (false);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.size ()).toEqual(4);
      expect (victim.addAll (thelist)).toEqual (true);
    });

    it("Test removeall", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (thelist.removeAll (null)).toEqual (false);
      expect (thelist.removeAll (undefined)).toEqual (false);
      expect (thelist.removeAll (new LinkedList<PetStoreProduct>(new AllFieldCollectable<PetStoreProduct>()))).toEqual (false);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      const removelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (removelist.add (product2)).toEqual (true);
      expect (removelist.add (product3)).toEqual (true);

      expect (thelist.removeAll(removelist)).toEqual(true);
      expect (thelist.size ()).toEqual(1);

      expect (removelist.add (productNotAvailable)).toEqual (true);
      expect (thelist.removeAll(removelist)).toEqual(false);
      expect (thelist.size ()).toEqual(1);
    });

    it("Test typescript iteration", function() {
      const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      const offset:number = 0;
      const pspi:Iterator<PetStoreProduct> = thelist[Symbol.iterator]();
      let tmp:IteratorResult<PetStoreProduct> = pspi.next();
      expect (tmp.done).toEqual(false);
      expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));
      tmp = pspi.next();
      expect (tmp.done).toEqual(false);
      expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));
      tmp = pspi.next();
      expect (tmp.done).toEqual(true);
    });

    it("Test getfirst", function() {
        const thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
        expect (thelist.getFirst()).toEqual (undefined);
        expect (thelist.add (product1)).toEqual (true);
        expect (thelist.add (product2)).toEqual (true);
        expect (thelist.getFirst()).toEqual (product1);
    });

    it("Test constructing with elements from an ArrayList", function() {
      const sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (sourceList.add (product1)).toEqual (true);
      expect (sourceList.add (product2)).toEqual (true);

      const list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (sourceList.getCollectable(), sourceList);
      expect (list.size ()).toEqual(sourceList.size());
    });

    it("Test constructing with elements from a LinkedList", function() {
      const sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (sourceList.add (product1)).toEqual (true);
      expect (sourceList.add (product2)).toEqual (true);

      const list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (sourceList.getCollectable(), sourceList);
      expect (list.size ()).toEqual(sourceList.size());
    });

        const alphabeticalSortPetStoreProduct:Comparator<PetStoreProduct> = {
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
        };

      it("Test constructing with elements from a TreeSet", function() {
        const source:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
        expect (source.add (product1)).toEqual (true);
        expect (source.add (product2)).toEqual (true);

        const list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>(), source);
        expect (list.size ()).toEqual(source.size());
      });

      it("Test constructing with elements from an HashSet", function() {
        const source:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
        expect (source.add (product1)).toEqual (true);
        expect (source.add (product2)).toEqual (true);

        const list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (source.getHashable(), source);
        expect (list.size ()).toEqual(source.size());
      });

      it ("Test null", function () {
        const list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
        list.add (null);
        expect (list.contains (null)).toEqual (true);
        expect (list.isEmpty ()).toEqual(false);
        expect (list.size ()).toEqual(1);
        expect (list.get (0)).toEqual (null);
        expect (list.indexOf (null)).toEqual (0);
        expect (list.lastIndexOf (null)).toEqual (0);
      });

      it ("Test undefined", function () {
        const list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
        list.add (undefined);
        expect (list.contains (undefined)).toEqual (true);
        expect (list.isEmpty ()).toEqual(false);
        expect (list.size ()).toEqual(1);
        expect (list.get (0)).toEqual (undefined);
        expect (list.indexOf (undefined)).toEqual (0);
        expect (list.lastIndexOf (undefined)).toEqual (0);
      });

});
