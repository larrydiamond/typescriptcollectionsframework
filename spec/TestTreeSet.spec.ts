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



});
