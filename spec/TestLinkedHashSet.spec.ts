/**
* @license
* Copyright Francesco Giordano 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "../src/AllFieldHashable";
import {LinkedHashSet, LinkedIterator, LinkedEntry} from "../src/LinkedHashSet";
import {JIterator} from "../src/JIterator";

describe("Test LinkedHashSet functionality", function() {

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

  it("Test Creation state", function() {
    const mySet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
  });

  it ("Test adding initial elements", function () {
    const sourceSet:LinkedHashSet<string> = new LinkedHashSet<string>(new AllFieldHashable<string>());
    expect (sourceSet.add ("A")).toEqual(true);
    expect (sourceSet.add ("C")).toEqual(true);
    expect (sourceSet.size ()).toEqual(2);
    const destinationSet:LinkedHashSet<string> = new LinkedHashSet<string>(new AllFieldHashable<string>(), sourceSet);
    expect (destinationSet.size ()).toEqual(2);
  });

  it ("Test adding more initial elements", function () {
    const sourceSet:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct>();
    expect (sourceSet.add (product1)).toEqual(true);
    expect (sourceSet.add (product2)).toEqual(true);
    expect (sourceSet.add (product3)).toEqual(true);
    expect (sourceSet.size ()).toEqual(3);
    const destinationSet:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct>(new AllFieldHashable<PetStoreProduct>(), sourceSet);
    expect (destinationSet.size ()).toEqual(3);
  });

  it("Test-1 adding one entry", function() {
    const mySet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test-2 adding one entry", function() {
    const mySet1:LinkedHashSet<string> = new LinkedHashSet<string> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add("frank"));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test-1 adding two entries", function() {
    const mySet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.add(product2));
    expect (mySet1.size ()).toEqual(2);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test-2 adding two entries", function() {
    const mySet1:LinkedHashSet<number> = new LinkedHashSet<number> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.add(2));
    expect (mySet1.size ()).toEqual(2);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test adding three entries", function() {
    const mySet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();
    expect (mySet1.size ()).toEqual(0);
    expect (mySet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(mySet1.add(product1));
    expect (mySet1.size ()).toEqual(1);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.add(product2));
    expect (mySet1.size ()).toEqual(2);
    expect (mySet1.isEmpty ()).toEqual(false);
    expect (true).toEqual(mySet1.add(product3));
    expect (mySet1.size ()).toEqual(3);
    expect (mySet1.isEmpty ()).toEqual(false);
  });

  it("Test-1 value jiterator three entries", function() {
    const petStoreSet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>());
    let count:number = 0;
    let values:string[] = [];

    petStoreSet1.add (product1);
    petStoreSet1.add (product2);
    petStoreSet1.add (product3);

    let linkedIter:LinkedIterator<PetStoreProduct> = petStoreSet1.Iterator();
    for (; linkedIter.hasNext(); ) {
      const p:PetStoreProduct = linkedIter._next();
      values[count] = p.getProductName();
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (petStoreSet1.contains(product2)).toEqual(true);
    expect (values[0]).toEqual("Catnip");
    expect (values[1]).toEqual("ChewToy");
    expect (values[2]).toEqual("Goldfish");
  });

  it("Test-2 value jiterator three entries", function() {
    const stringSet:LinkedHashSet<string> = new LinkedHashSet<string> (new AllFieldHashable<string>());
    let count:number = 0;
    let values:string[] = [];

    stringSet.add ("3");
    stringSet.add ("2");
    stringSet.add ("1");

    let linkedIter:LinkedIterator<string> = stringSet.Iterator();
    for (; linkedIter.hasNext(); ) {
      const s:string = linkedIter._next();
      values[count] = s;
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (stringSet.contains("2")).toEqual(true);
    expect (values[0]).toEqual("3");
    expect (values[1]).toEqual("2");
    expect (values[2]).toEqual("1");
  });

  it("Test value jiterator three initial entries", function() {
    // makes new list unorder.. it uses set. see initializeElements() 
    const sourceSet:LinkedHashSet<string> = new LinkedHashSet<string>(new AllFieldHashable<string>());
    expect (sourceSet.add ("A")).toEqual(true);
    expect (sourceSet.add ("C")).toEqual(true);
    expect (sourceSet.add ("B")).toEqual(true);
    expect (sourceSet.size ()).toEqual(3);
    const destinationSet:LinkedHashSet<string> = new LinkedHashSet<string>(new AllFieldHashable<string>(), sourceSet);
    expect (destinationSet.size ()).toEqual(3);

    let count:number = 0;
    let values:string[] = [];

    let linkedIter:LinkedIterator<string> = destinationSet.Iterator();
    for (; linkedIter.hasNext(); ) {
      const s:string = linkedIter._next();
      values[count] = s;
      count = count + 1;
    }
    expect (count).toEqual(3);
    expect (destinationSet.contains("C")).toEqual(true);
    expect (values[0]).toEqual("C");
    expect (values[1]).toEqual("B");
    expect (values[2]).toEqual("A");
  });

  it("Test remove LinkedHashSet entry success", function() {
    // makes new list unorder.. it uses set. see initializeElements() 
    const sourceSet:LinkedHashSet<string> = new LinkedHashSet<string>(new AllFieldHashable<string>());
    expect (sourceSet.add ("A")).toEqual(true);
    expect (sourceSet.add ("C")).toEqual(true);
    expect (sourceSet.add ("B")).toEqual(true);
    expect (sourceSet.size ()).toEqual(3);
    expect (sourceSet.remove("B")).toEqual(true);
  
    let count:number = 0;
    let values:string[] = [];

    let linkedIter:LinkedIterator<string> = sourceSet.Iterator();
    for (; linkedIter.hasNext(); ) {
      const s:string = linkedIter._next();
      values[count] = s;
      count = count + 1;
    }
    expect (count).toEqual(2);
    expect (sourceSet.contains("C")).toEqual(true);
    expect (values[0]).toEqual("A");
    expect (values[1]).toEqual("C");
  });

  it("Test remove LinkedHashSet entry failure", function() {
    // makes new list unorder.. it uses set. see initializeElements() 
    const sourceSet:LinkedHashSet<string> = new LinkedHashSet<string>(new AllFieldHashable<string>());
    expect (sourceSet.add ("A")).toEqual(true);
    expect (sourceSet.add ("C")).toEqual(true);
    expect (sourceSet.add ("B")).toEqual(true);
    expect (sourceSet.size ()).toEqual(3);
    expect (sourceSet.remove("D")).toEqual(false);
  });

  it("Test clear", function() {
    const petStoreSet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();

    petStoreSet1.add (product1);
    petStoreSet1.add (product2);
    petStoreSet1.add (product3);
    expect (petStoreSet1.size ()).toEqual(3);
    expect (petStoreSet1.isEmpty ()).toEqual(false);
    petStoreSet1.clear ();
    expect (petStoreSet1.size ()).toEqual(0);
    expect (petStoreSet1.isEmpty ()).toEqual(true);

    petStoreSet1.add (product1);
    petStoreSet1.add (product2);
    expect (petStoreSet1.size ()).toEqual(2);
    expect (petStoreSet1.isEmpty ()).toEqual(false);
    petStoreSet1.clear ();
    expect (petStoreSet1.size ()).toEqual(0);
    expect (petStoreSet1.isEmpty ()).toEqual(true);
  });

  it("Test hash remove", function() {
    const petStoreSet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();

    petStoreSet1.add (product1);
    petStoreSet1.add (product2);
    petStoreSet1.add (product3);
    expect (petStoreSet1.size ()).toEqual(3);
    expect (petStoreSet1.isEmpty ()).toEqual(false);
    petStoreSet1.remove (product2);
    expect (petStoreSet1.size ()).toEqual(2);
    expect (petStoreSet1.isEmpty ()).toEqual(false);
  });

  it("Test contains", function() {
    const petStoreSet1:LinkedHashSet<PetStoreProduct> = new LinkedHashSet<PetStoreProduct> ();
    expect (petStoreSet1.size ()).toEqual(0);
    expect (petStoreSet1.isEmpty ()).toEqual(true);
    expect (true).toEqual(petStoreSet1.add(product1));
    expect (petStoreSet1.contains (product1)).toEqual(true);
    expect (petStoreSet1.contains (product2)).toEqual(false);
  });

});
