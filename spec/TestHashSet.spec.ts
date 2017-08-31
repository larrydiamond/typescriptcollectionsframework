/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {BasicMapEntry} from "../src/BasicMapEntry";
import {Collectable} from "../src/Collectable";
import {CollectionUtils} from "../src/CollectionUtils";
import {Comparator} from "../src/Comparator";
import {Hashable} from "../src/Hashable";
import {HashSet} from "../src/HashSet";

describe("Test HashSet functionality", function() {

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

  let product1:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  let product2:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  let product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);

  it("Test Creation state", function() {
    let set1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();
    expect (set1.size ()).toEqual(0);
    expect (set1.isEmpty ()).toEqual(true);
  });

  it("Test Adding one item", function() {
    let set1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();
    expect (set1.size ()).toEqual(0);
    expect (set1.isEmpty ()).toEqual(true);
    expect (set1.add (product1)).toEqual(true);
    expect (1).toEqual(set1.size ());
    expect (false).toEqual(set1.isEmpty ());
  });

  it("Test adding two entries", function() {
    let mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();
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
    let mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();
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
    let mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.contains(product1));
    expect (false).toEqual(mySet1.contains(product2));
  });

  it("Test clear", function() {
    let mySet1:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();
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

/* iteration isnt ready yet :(

  it("Test java iteration", function() {
    let set2:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();

    expect (set2.add (product1)).toEqual (true);
    expect (set2.add (product2)).toEqual (true);

    let found1:boolean = false;
    let found2:boolean = false;

    for (let iter = set2.iterator(); iter.hasNext(); ) {
      let psp:PetStoreProduct = iter.next ();

      if (product1.equals (psp)) {
        found1 = true;
      } else {
        if (product2.equals (psp)) {
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
    let set2:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> ();

    expect (set2.add (product1)).toEqual (true);
    expect (set2.add (product2)).toEqual (true);

    let found1:boolean = false;
    let found2:boolean = false;

    let tsi:Iterator<PetStoreProduct> = set2[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    expect (tmp.done).toEqual(false);

    if (product1.equals (tmp.value)) {
      found1 = true;
    } else {
      if (product2.equals (tmp.value)) {
        found2 = true;
      } else {
        fail("Found something that wasnt product1 or product2");
      }
    }

    tmp = tsi.next();
    expect (tmp.done).toEqual(false);

    if (product1.equals (tmp.value)) {
      found1 = true;
    } else {
      if (product2.equals (tmp.value)) {
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
  */

});
