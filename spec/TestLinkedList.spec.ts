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
import {LinkedList} from "../src/LinkedList";
import {List} from "../src/List";

describe("Test LinkedList functionality", function() {
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
      let list:List<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (list.isEmpty ()).toEqual(true);
      expect (list.size ()).toEqual(0);

      let collection:Collection<PetStoreProduct> = list;
      expect (collection.isEmpty ()).toEqual(true);
      expect (collection.size ()).toEqual(0);
    });

    it("Test Adding some items", function() {
      let ll:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      let list:List<PetStoreProduct> = ll;
      let collection:Collection<PetStoreProduct> = list;

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

    it("Test clearing the LinkedList", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      let list:List<PetStoreProduct> = thelist;
      let collection:Collection<PetStoreProduct> = list;

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
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      let index0:PetStoreProduct = thelist.get (0);
      let index1:PetStoreProduct = thelist.get (1);

      expect (product1.getProductName()).toEqual (index0.getProductName());
      expect (product2.getProductName()).toEqual (index1.getProductName());
      expect (product1.getPrice()).toEqual (index0.getPrice());
      expect (product2.getPrice()).toEqual (index1.getPrice());

      expect (thelist.get (5000)).toEqual (null);
    });

    it("Test indexof", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
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
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      let oldElement:PetStoreProduct = thelist.set (1, product3);
      expect (oldElement).toEqual(product2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(-1);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test java iteration", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      let offset:number = 0;
      for (let iter = thelist.iterator(); iter.hasNext(); ) {
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
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      thelist.addElement (0, product3);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(1);
      expect (thelist.indexOf (product2)).toEqual(2);
      expect (thelist.indexOf (product3)).toEqual(0);
    });

    it("Test addElement in middle of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      thelist.addElement (1, product3);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(2);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test addElement at end of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      thelist.addElement (2, product3);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(2);
    });

    it("Test remove at front of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (thelist.remove (0)).toEqual (undefined);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.remove (0)).toEqual (product1);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(-1);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(1);
      expect (thelist.remove (4000)).toEqual (undefined);
    });

    it("Test remove in middle of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.remove (1)).toEqual (product2);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(-1);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test remove at end of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.remove (2)).toEqual (product3);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(-1);
    });


    it("Test removeElement at front of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (thelist.removeElement (product1)). toEqual (false);

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.removeElement (product1)). toEqual (true);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(-1);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test removeElement in middle of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.removeElement (product2)). toEqual (true);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(-1);
      expect (thelist.indexOf (product3)).toEqual(1);
    });

    it("Test removeElement at end of list", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.removeElement (product3)). toEqual (true);

      expect (thelist.size ()).toEqual(2);
      expect (thelist.indexOf (product1)).toEqual(0);
      expect (thelist.indexOf (product2)).toEqual(1);
      expect (thelist.indexOf (product3)).toEqual(-1);
    });

    it("Test duplicates in array", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.size ()).toEqual(4);

      expect (thelist.removeElement (product1)). toEqual (true);

      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(2);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(1);

      thelist.add (product3);
      expect (thelist.size ()).toEqual(4);
      expect (thelist.indexOf (product3)).toEqual(1);

      expect (thelist.removeElement (product3)). toEqual (true);
      expect (thelist.size ()).toEqual(3);
      expect (thelist.indexOf (product1)).toEqual(1);
      expect (thelist.indexOf (product2)).toEqual(0);
      expect (thelist.indexOf (product3)).toEqual(2);

      expect (thelist.removeElement (productNotAvailable)). toEqual (false);
    });

    it("Test addall", function() {
      let victim:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (victim.addAll (null)).toEqual (false);
      expect (victim.addAll (undefined)).toEqual (false);
      expect (victim.addAll (new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>()))).toEqual (false);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);
      expect (thelist.add (product3)).toEqual (true);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.size ()).toEqual(4);
      expect (victim.addAll (thelist)).toEqual (true);
    });

    it("Test removeall", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (thelist.removeAll (null)).toEqual (false);
      expect (thelist.removeAll (undefined)).toEqual (false);
      expect (thelist.removeAll (new LinkedList<PetStoreProduct>(new GenericCollectable<PetStoreProduct>()))).toEqual (false);
      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      let removelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (removelist.add (product2)).toEqual (true);
      expect (removelist.add (product3)).toEqual (true);

      expect (thelist.removeAll(removelist)).toEqual(true);
      expect (thelist.size ()).toEqual(1);

      expect (removelist.add (productNotAvailable)).toEqual (true);
      expect (thelist.removeAll(removelist)).toEqual(false);
      expect (thelist.size ()).toEqual(1);
    });

    it("Test typescript iteration", function() {
      let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());

      expect (thelist.add (product1)).toEqual (true);
      expect (thelist.add (product2)).toEqual (true);

      let offset:number = 0;
      let pspi:Iterator<PetStoreProduct> = thelist[Symbol.iterator]();
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
        let thelist:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
        expect (thelist.getFirst()).toEqual (null);
        expect (thelist.add (product1)).toEqual (true);
        expect (thelist.add (product2)).toEqual (true);
        expect (thelist.getFirst()).toEqual (product1);
    });

    it("Test constructing with elements from an ArrayList", function() {
      let sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (sourceList.add (product1)).toEqual (true);
      expect (sourceList.add (product2)).toEqual (true);

      let list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (sourceList.getCollectable(), sourceList);
      expect (list.size ()).toEqual(sourceList.size());
    });

    it("Test constructing with elements from a LinkedList", function() {
      let sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
      expect (sourceList.add (product1)).toEqual (true);
      expect (sourceList.add (product2)).toEqual (true);

      let list:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (sourceList.getCollectable(), sourceList);
      expect (list.size ()).toEqual(sourceList.size());
    });

});
