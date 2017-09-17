/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {ArrayList} from "../src/ArrayList";
import {BasicMapEntry} from "../src/BasicMapEntry";
import {Collectable} from "../src/Collectable";
import {CollectionUtils} from "../src/CollectionUtils";
import {Comparator} from "../src/Comparator";
import {GenericCollectable} from "../src/CollectionUtils";
import {GenericHashable} from "../src/CollectionUtils";
import {HashSet} from "../src/HashSet";
import {LinkedList} from "../src/LinkedList";
import {TreeSet} from "../src/TreeSet";

describe("Test TreeSet functionality", function() {

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

  let product1:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  let product2:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  let product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);

  let alphabeticalSortPetStoreProduct:Comparator<PetStoreProduct> = {
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

  let priceSortPetStoreProduct:Comparator<PetStoreProduct> = {
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
      if (o1.getPrice() === o2.getPrice())
      return 0;
      if (o1.getPrice() === undefined)
      return -1;
      if (o1.getPrice() === null)
      return -1;
      if (o2.getPrice() === undefined)
      return 1;
      if (o2.getPrice() === null)
      return 1;

      if (o1.getPrice() < o2.getPrice())
      return -1;

      return 1;
    }
  }

  it("Test Creation state", function() {
    let TreeSet1:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (TreeSet1.size ()).toEqual(0);
    expect (TreeSet1.isEmpty ()).toEqual(true);

    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
  });

  it("Test Adding one item", function() {
    let TreeSet1:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (TreeSet1.size ()).toEqual(0);
    expect (TreeSet1.isEmpty ()).toEqual(true);
    expect (TreeSet1.add (product1)).toEqual(false);
    expect (1).toEqual(TreeSet1.size ());
    expect (false).toEqual(TreeSet1.isEmpty ());
  });

  it("Test Adding one item basic datatypes", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test Adding two items basic datatypes", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Second")).toEqual(false);
    expect (2).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test Adding two items basic datatypessame value", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test contains basic datatypessame value", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (false).toEqual(TreeSet2.contains ("Hello"));
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (true).toEqual(TreeSet2.contains ("Hello"));
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Hello")).toEqual(true);
    expect (true).toEqual(TreeSet2.contains ("Hello"));
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test first basic datatypes", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.isEmpty ()).toEqual(true);
    expect (null).toEqual(TreeSet2.first());
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect ("Hello").toEqual(TreeSet2.first());
    expect (1).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Second")).toEqual(false);
    expect ("Hello").toEqual(TreeSet2.first());
    expect (2).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
    expect (TreeSet2.add ("Alpha")).toEqual(false);
    expect ("Alpha").toEqual(TreeSet2.first());
    expect (3).toEqual(TreeSet2.size ());
    expect (false).toEqual(TreeSet2.isEmpty ());
  });

  it("Test pollfirst", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollFirst()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollFirst()).toEqual("Hello");
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollFirst()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Second")).toEqual(false);
    expect (TreeSet2.add ("First")).toEqual(false);
    expect (TreeSet2.pollFirst()).toEqual("First");
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollFirst()).toEqual("Second");
    expect (TreeSet2.size ()).toEqual(0);
  });

  it("Test polllast", function() {
    let TreeSet2:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollLast()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Hello")).toEqual(false);
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollLast()).toEqual("Hello");
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.pollLast()).toEqual(null);
    expect (TreeSet2.size ()).toEqual(0);
    expect (TreeSet2.add ("Second")).toEqual(false);
    expect (TreeSet2.add ("First")).toEqual(false);
    expect (TreeSet2.pollLast()).toEqual("Second");
    expect (TreeSet2.size ()).toEqual(1);
    expect (TreeSet2.pollLast()).toEqual("First");
    expect (TreeSet2.size ()).toEqual(0);
  });

  it("Test java iteration", function() {
    let TreeSet2:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);

    expect (TreeSet2.add (product1)).toEqual (false);
    expect (TreeSet2.add (product2)).toEqual (false);

    let offset:number = 0;
    for (let iter = TreeSet2.iterator(); iter.hasNext(); ) {
      let psp:PetStoreProduct = iter.next ();

      if (offset === 0)
        expect (psp.getProductName()).toEqual (product2.getProductName());  // Catnip before ChewToy
      if (offset === 1)
        expect (psp.getProductName()).toEqual (product1.getProductName());  // Catnip before ChewToy
      if (offset > 1)
        fail();

       offset++;
    }
  });

  it("Test typescript iteration", function() {
    let TreeSet2:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);

    expect (TreeSet2.add (product1)).toEqual (false);
    expect (TreeSet2.add (product2)).toEqual (false);

    let offset:number = 0;

    let tsi:Iterator<PetStoreProduct> = TreeSet2[Symbol.iterator]();
    let tmp:IteratorResult<PetStoreProduct> = tsi.next();
    expect (tmp.done).toEqual(false);
    expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product2));  // Catnip before ChewToy
    tmp = tsi.next();
    expect (tmp.done).toEqual(false);
    expect (JSON.stringify(tmp.value)).toEqual(JSON.stringify(product1));  // Catnip before ChewToy
    tmp = tsi.next();
    expect (tmp.done).toEqual(true);

  });

  it("Test ceiling", function() {
    let TreeSet2:TreeSet<number> = new TreeSet<number>(CollectionUtils.getNumberComparator());
    expect (TreeSet2.add (44)).toEqual(false);
    expect (TreeSet2.add (5)).toEqual(false);
    expect (TreeSet2.add (20)).toEqual(false);
    expect (TreeSet2.add (88)).toEqual(false);
    expect (TreeSet2.add (50)).toEqual(false);
    expect (TreeSet2.add (30)).toEqual(false);
    expect (TreeSet2.add (1)).toEqual(false);
    expect (TreeSet2.add (48)).toEqual(false);
    expect (TreeSet2.add (62)).toEqual(false);
    expect (TreeSet2.add (78)).toEqual(false);
    expect (TreeSet2.add (17)).toEqual(false);
    expect (TreeSet2.add (70)).toEqual(false);
    expect (TreeSet2.add (80)).toEqual(false);
    expect (TreeSet2.add (32)).toEqual(false);
    expect (TreeSet2.ceiling (16)).toEqual(17); // 16 isnt there, 17 is
    expect (TreeSet2.ceiling (16)).toEqual(17); // 16 isnt there, 17 is
    expect (TreeSet2.ceiling (17)).toEqual(17); // 17 is there
  });

  it ("Test lots", function () {
    let tset = new TreeSet<string>(CollectionUtils.getStringComparator());
    for (let loop1 = 1; loop1 <= 26; loop1++) {
      for (let loop2 = 1; loop2 <= 26; loop2++) {
        let txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2);
        tset.add (txt);
      }
    }
    expect (tset.size ()).toEqual(26 * 26);

    let count:number = 0;
    for (let iter = tset.iterator(); iter.hasNext(); ) {
      count = count + 1;
      let psp:string = iter.next ();
    }
    expect (count).toEqual (26 * 26);
  });

  it ("Test lots2", function () {
    let tset = new TreeSet<string>(CollectionUtils.getStringComparator());
    for (let loop2 = 1; loop2 <= 26; loop2++) {
      for (let loop1 = 1; loop1 <= 26; loop1++) {
        let txt:string = String.fromCharCode (96 + loop1) + String.fromCharCode (96 + loop2);
        tset.add (txt);
      }
    }

    expect (tset.validateSet()).toEqual (true);
    expect (tset.size ()).toEqual(26 * 26);

    let count:number = 0;
    for (let iter = tset.iterator(); iter.hasNext(); ) {
      count = count + 1;
      let psp:string = iter.next ();
    }
    expect (count).toEqual (26 * 26);
  });

  it("Test constructing with elements from an ArrayList", function() {
    let sourceList:ArrayList<PetStoreProduct> = new ArrayList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    let tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, sourceList);
    expect (tset.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from a LinkedList", function() {
    let sourceList:LinkedList<PetStoreProduct> = new LinkedList<PetStoreProduct> (new GenericCollectable<PetStoreProduct>());
    expect (sourceList.add (product1)).toEqual (true);
    expect (sourceList.add (product2)).toEqual (true);

    let tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, sourceList);
    expect (tset.size ()).toEqual(sourceList.size());
  });

  it("Test constructing with elements from an HashSet", function() {
    let source:HashSet<PetStoreProduct> = new HashSet<PetStoreProduct> (new GenericHashable<PetStoreProduct>());
    expect (source.add (product1)).toEqual (true);
    expect (source.add (product2)).toEqual (true);

    let tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, source);
    expect (tset.size ()).toEqual(source.size());
  });

  it("Test constructing with elements from a TreeSet", function() {
    let source:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct);
    expect (source.add (product1)).toEqual (false);
    expect (source.add (product2)).toEqual (false);

    let tset:TreeSet<PetStoreProduct> = new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct, source);
    expect (tset.size ()).toEqual(source.size());
  });

  it("Focused test on reproducable error 0.8.0 16 Sep 2017", function() {
    let tsData:TreeSet<string> = new TreeSet<string>(CollectionUtils.getStringComparator());
    tsData.add ("Cat");
    tsData.add ("Squirrel");
    tsData.add ("Dog");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("Dog")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("hvhli");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("Cat")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("dybtc");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("dybtc")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("xuaqo");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
    expect (tsData.remove ("xuaqo")).toEqual (true);
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("ktwky");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
//    tsData.printSet ();
    expect (tsData.remove ("hvhli")).toEqual (true);
//    tsData.printSet ();
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
    tsData.add ("cnnlv");
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(3);
//    tsData.printSet ();
    expect (tsData.remove ("Squirrel")).toEqual (true);
//    tsData.printSet ();
    expect (tsData.validateSet()).toEqual (true);
    expect (tsData.size ()).toEqual(2);
  });

});
