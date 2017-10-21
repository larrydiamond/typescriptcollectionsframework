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
import {BasicMapEntry} from "../src/BasicMapEntry";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {Hashable} from "../src/Hashable";
import {HashSet} from "../src/HashSet";
import {LinkedList} from "../src/LinkedList";
import {TreeSet} from "../src/TreeSet";

describe("Test HashSet functionality", function() {

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

  const product1:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  const product2:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);

  it("Test Creation state", function() {
    const set1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (set1.size ()).toEqual(0);
    expect (set1.isEmpty ()).toEqual(true);
  });

  it("Test Adding one item", function() {
    const set1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (set1.size ()).toEqual(0);
    expect (set1.isEmpty ()).toEqual(true);
    expect (set1.add (product1)).toEqual(true);
    expect (1).toEqual(set1.size ());
    expect (false).toEqual(set1.isEmpty ());
  });

  it("Test adding two entries", function() {
    const mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
  //    mySet1.printMap();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
  //    mySet1.printMap();
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.add(product2));
  //    mySet1.printMap();
    expect (mySet1.size ()).toEqual(2);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test adding duplicates", function() {
    const mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (false).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test contains", function() {
    const mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.contains(product1));
    expect (false).toEqual(mySet1.contains(product2));
  });

  it("Test clear", function() {
    const mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.contains(product1));
    expect (false).toEqual(mySet1.contains(product2));
    mySet1.clear();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (false).toEqual(mySet1.contains(product1));
    expect (false).toEqual(mySet1.contains(product2));
  });

  it("Test java iteration", function() {
    const set2:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());

    expect (set2.add (product1)).toEqual (true);
    expect (set2.add (product2)).toEqual (true);

    let found1:boolean = false;
    let found2:boolean = false;

    for (const iter = set2.iterator(); iter.hasNext(); ) {
      const psp:PetStoreProduct = iter.next ();

      if (psp.getProductName() === product1.getProductName()) {
        found1 = true;
      } else {
      if (psp.getProductName() === product2.getProductName()) {
          found2 = true;
        } else {
          fail("Found something that wasnt product1 or product2");
        }
      }
    }

    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it("Test typescript iteration", function() {
    const set2:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());

    expect (set2.add (product1)).toEqual (true);
    expect (set2.add (product2)).toEqual (true);

    let found1:boolean = false;
    let found2:boolean = false;

    const tsi:Iterator<PetStoreProduct> = set2[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    expect (tmp.done).toEqual(false);

    if (tmp.value.getProductName() === product1.getProductName()) {
      found1 = true;
    } else {
      if (tmp.value.getProductName() === product2.getProductName()) {
        found2 = true;
      } else {
        fail("Found something that wasnt product1 or product2");
      }
    }

    tmp = tsi.next();
    expect (tmp.done).toEqual(false);

    if (tmp.value.getProductName() === product1.getProductName()) {
      found1 = true;
    } else {
      if (tmp.value.getProductName() === product2.getProductName()) {
        found2 = true;
      } else {
        fail("Found something that wasnt product1 or product2");
      }
    }

    tmp = tsi.next();
    expect (tmp.done).toEqual(true);

    expect (found1).toEqual (true);
    expect (found2).toEqual (true);
  });

  it ("Test native strings", function () {
    const hset = new HashSet<string>(new AllFieldHashable<string>());
    hset.add ("Cat");
    hset.add ("Dog");
    hset.add ("Squirrel");

    expect (hset.size ()).toEqual(3);
    expect (hset.isEmpty ()).toEqual(false);

    let foundcat:boolean = false;
    let founddog:boolean = false;
    let foundsquirrel:boolean = false;

    let count:number = 0;

    for (const iter = hset.iterator(); iter.hasNext(); ) {
      count = count + 1;
      const psp:string = iter.next ();

      if (psp === "Cat") {
        foundcat = true;
      } else {
        if (psp === "Dog") {
          founddog = true;
        } else {
          if (psp === "Squirrel") {
            foundsquirrel = true;
          } else {
            fail("Found something that wasnt added");
          }
        }
      }
    }

    expect (count).toEqual (3);
    expect (foundcat).toEqual (true);
    expect (founddog).toEqual (true);
    expect (foundsquirrel).toEqual (true);
  });

  it ("Test lots", function () {
    const hset = new HashSet<string>(new AllFieldHashable<string>());
    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        for (let loop3 = 1; loop3 <= 26; loop3++) {
          const txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2) + String.fromCharCode (96 + loop3);
          hset.add (txt);
        }
      }
    }
    expect (hset.size ()).toEqual(26 * 26 * 26);

    let count:number = 0;
    for (const iter = hset.iterator(); iter.hasNext(); ) {
      count = count + 1;
      const psp:string = iter.next ();
    }
    expect (count).toEqual (26 * 26 * 26);
  });

    it("Test constructing with elements from an ArrayList", function() {
      const sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (sourceList.add (product1)).toEqual (true);
      expect (sourceList.add (product2)).toEqual (true);

      const tset:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>(), sourceList);
      expect (tset.size ()).toEqual(sourceList.size());
    });

    it("Test constructing with elements from a LinkedList", function() {
      const sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new AllFieldCollectable<PetStoreProduct>());
      expect (sourceList.add (product1)).toEqual (true);
      expect (sourceList.add (product2)).toEqual (true);

      const tset:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>(), sourceList);
      expect (tset.size ()).toEqual(sourceList.size());
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

    const tset:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>(), source);
    expect (tset.size ()).toEqual(source.size());
  });

});
