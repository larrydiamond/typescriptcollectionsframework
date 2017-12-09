/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {PriorityQueue} from "../src/PriorityQueue";
import {TreeSet} from "../src/TreeSet";

describe("Test Priority Queue functionality", function() {

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

  const product1:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
  const product2:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
  const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
  const product4:PetStoreProduct = new PetStoreProduct("Dog Leash", 6.99);

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
  };

  const priceSortPetStoreProduct:Comparator<PetStoreProduct> = {
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
  };

  it("Test adding items to priority queue and offer", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.offer(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.offer(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test adding items to priority queue and poll", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.poll().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test poll on empty queue", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product2)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.poll().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.poll().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.isEmpty()).toEqual(true);
    expect (PriorityQueue1.poll()).toBeNull();
  });

  it("Test adding items to priority queue and removeQueue", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test removeQueue on empty queue", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product2)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.isEmpty()).toEqual(true);
    expect (PriorityQueue1.removeQueue()).toEqual(undefined);
  });

  it("Test adding items to priority queue and peek", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product2)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.peek().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test peek on empty queue", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product2)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.peek().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.peek().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.isEmpty()).toEqual(true);
    expect (PriorityQueue1.peek()).toBeNull();
  });

  it("Test adding items to priority queue and element", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product2)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.element().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test element on empty queue", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product2)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.element().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("Catnip");
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.element().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.removeQueue().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.isEmpty()).toEqual(true);
    expect (PriorityQueue1.element()).toEqual(undefined);
  });

  it("Test adding items to priority queue and clear", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.peek().getProductName()).toEqual("ChewToy");
    expect (PriorityQueue1.isEmpty()).toEqual(false);
    PriorityQueue1.clear();
    expect (PriorityQueue1.isEmpty()).toEqual(true);
  });

  it("Test adding items to priority queue and remove", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.remove(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test empty priority queue", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.isEmpty()).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(0);
  });

  it("Test adding items to priority queue and contains true", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.contains(product1)).toEqual(true);
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test adding items to priority queue and contains false", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.size()).toEqual(0);
    expect (PriorityQueue1.add(product1)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(1);
    expect (PriorityQueue1.add(product3)).toEqual(true);
    expect (PriorityQueue1.size()).toEqual(2);
    expect (PriorityQueue1.contains(product1)).toEqual(true);
    expect (PriorityQueue1.contains(product4)).toEqual(false);
    expect (PriorityQueue1.isEmpty()).toEqual(false);
  });

  it("Test java iteration", function() {
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.add (product1)).toEqual (true);
    expect (PriorityQueue1.add (product2)).toEqual (true);

    let offset:number = 0;
    for (const iter = PriorityQueue1.iterator(); iter.hasNext(); ) {
      const psp:PetStoreProduct = iter.next ();

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
    const PriorityQueue1:PriorityQueue<PetStoreProduct> = new PriorityQueue<PetStoreProduct>(alphabeticalSortPetStoreProduct);
    expect (PriorityQueue1.add (product1)).toEqual (true);
    expect (PriorityQueue1.add (product2)).toEqual (true);

    const offset:number = 0;

    const tsi:Iterator<PetStoreProduct> = PriorityQueue1[Symbol.iterator]();
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
    const PriorityQueue1:PriorityQueue<number> = new PriorityQueue<number>(Collections.getNumberComparator());
    expect (PriorityQueue1.add (44)).toEqual(true);
    expect (PriorityQueue1.add (5)).toEqual(true);
    expect (PriorityQueue1.add (20)).toEqual(true);
    expect (PriorityQueue1.add (88)).toEqual(true);
    expect (PriorityQueue1.add (50)).toEqual(true);
    expect (PriorityQueue1.add (30)).toEqual(true);
    expect (PriorityQueue1.add (1)).toEqual(true);
    expect (PriorityQueue1.add (48)).toEqual(true);
    expect (PriorityQueue1.add (62)).toEqual(true);
    expect (PriorityQueue1.add (78)).toEqual(true);
    expect (PriorityQueue1.add (17)).toEqual(true);
    expect (PriorityQueue1.add (70)).toEqual(true);
    expect (PriorityQueue1.add (80)).toEqual(true);
    expect (PriorityQueue1.add (32)).toEqual(true);
    expect (PriorityQueue1.add (100)).toEqual(true);
    expect (PriorityQueue1.peek()).toEqual(1);
  });

});
