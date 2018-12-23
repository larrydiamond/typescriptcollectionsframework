/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import { AllFieldHashable } from "../src/AllFieldHashable";
import { Collections } from "../src/Collections";
import { Comparator } from "../src/Comparator";
import { HashMultiSet } from "../src/HashClasses";
import { HashSet } from "../src/HashSet";
import { ImmutableMultiSet } from "../src/ImmutableMultiSet";
import { ImmutableSet } from "../src/ImmutableSet";
import { JSet } from "../src/JSet";
import { MultiSet } from "../src/MultiSet";

// PetStoreProduct will be used in testing
class PetStoreProduct {
    private productName: string;
    private price: number;

    public constructor(iName: string, iPrice: number) {
        this.productName = iName;
        this.price = iPrice;
    }

    public getProductName(): string {
        return this.productName;
    }

    public getPrice(): number {
        return this.price;
    }
}

const petStoreProductHashable = Collections.dynamicHashable("productName"); // only check product name for equality
const petStorePriceHashable = Collections.dynamicHashable("price"); // only check price for equality

const product2: PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
const product1: PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
const product3: PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
const productNotAvailable: PetStoreProduct = new PetStoreProduct("Bananas", 1.99);

const productDuplicate1: PetStoreProduct = new PetStoreProduct("Catnip", 5.99);
const productDuplicate2: PetStoreProduct = new PetStoreProduct("Catnip", 6.99);
const productDuplicate3: PetStoreProduct = new PetStoreProduct("Catnip", 7.99);

const priceDuplicate1: PetStoreProduct = new PetStoreProduct("Leash", 14.99);
const priceDuplicate2: PetStoreProduct = new PetStoreProduct("UnderwaterCastle", 14.99);
const priceDuplicate3: PetStoreProduct = new PetStoreProduct("ScubaDiver", 14.99);

describe("Test generic MultiSet functionality", function () {
    it("Test empty MultiSets", function () {
        testEmptyStringMultiSet(Collections.emptyMultiSet<string>());
        testEmptyPetStoreProductAndValueClassMultiSet(Collections.emptyMultiSet<PetStoreProduct>());
        testEmptyStringMultiSet(new HashMultiSet<string>());
        testEmptyStringMultiSet(new HashMultiSet<string>(new AllFieldHashable<string>()));

        testEmptyNumberMultiSet(Collections.emptyMultiSet<number>());
        testEmptyPetStoreProductAndValueClassMultiSet(Collections.emptyMultiSet<PetStoreProduct>());
        testEmptyNumberMultiSet(new HashMultiSet<number>());
        testEmptyNumberMultiSet(new HashMultiSet<number>(new AllFieldHashable<number>()));

        testEmptyPetStoreProductAndValueClassMultiSet(new HashMultiSet<PetStoreProduct>());
        testEmptyPetStoreProductAndValueClassMultiSet(new HashMultiSet<PetStoreProduct>(new AllFieldHashable<PetStoreProduct>()));
    });

    it("Test adding one item to empty string MultiSet", function () {
        testAddingOneEntryString(new HashMultiSet<string>());
        testAddingOneEntryString(new HashMultiSet<string>(new AllFieldHashable<string>()));
    });

    it("Test adding one item to empty number MultiSet", function () {
        testAddingOneEntryNumber(new HashMultiSet<number>());
        testAddingOneEntryNumber(new HashMultiSet<number>(new AllFieldHashable<number>()));
    });

    it("Test adding one item to empty class MultiSet", function () {
        testAddingOneEntryPetStoreProduct(new HashMultiSet<PetStoreProduct>());
        testAddingOneEntryPetStoreProduct(new HashMultiSet<PetStoreProduct>(petStoreProductHashable));
        testAddingOneEntryPetStoreProduct(new HashMultiSet<PetStoreProduct>(new AllFieldHashable<PetStoreProduct>()));
    });

    it("Test adding two unrelated items to empty string MultiSet", function () {
        testAddingTwoUnrelatedEntriesString(new HashMultiSet<string>());
        testAddingTwoUnrelatedEntriesString(new HashMultiSet<string>(new AllFieldHashable<string>()));
    });

    it("Test adding two unrelated items to empty number MultiSet", function () {
        testAddingTwoUnrelatedEntriesNumber(new HashMultiSet<number>());
        testAddingTwoUnrelatedEntriesNumber(new HashMultiSet<number>(new AllFieldHashable<number>()));
    });

    it("Test adding two unrelated items to empty class MultiSet", function () {
        testAddingTwoUnrelatedEntriesPetStoreProduct(new HashMultiSet<PetStoreProduct>(petStoreProductHashable));
    });

    it("Test adding two related items to empty string MultiSet", function () {
        testAddingTwoRelatedEntriesString(new HashMultiSet<string>());
        testAddingTwoRelatedEntriesString(new HashMultiSet<string>(new AllFieldHashable<string>()));
    });

    it("Test adding two related items to empty number MultiSet", function () {
        testAddingTwoRelatedEntriesNumber(new HashMultiSet<number>());
        testAddingTwoRelatedEntriesNumber(new HashMultiSet<number>(new AllFieldHashable<number>()));
    });

    it("Test adding two related items to empty class MultiSet", function () {
        testAddingTwoRelatedEntriesPetStoreProduct(new HashMultiSet<PetStoreProduct>(petStoreProductHashable));
    });

    it("Test clearing string MultiSet", function () {
        testClearingString(new HashMultiSet<string>());
        testClearingString(new HashMultiSet<string>(new AllFieldHashable<string>()));
    });

    it("Test clearing number MultiSet", function () {
        testClearingNumber(new HashMultiSet<number>());
        testClearingNumber(new HashMultiSet<number>(new AllFieldHashable<number>()));
    });

    it("Test clearing class MultiSet", function () {
        testClearingPetStoreProduct(new HashMultiSet<PetStoreProduct>(petStoreProductHashable));
    });

    it("Test count string MultiSet", function () {
        testCountString(new HashMultiSet<string>());
        testCountString(new HashMultiSet<string>(new AllFieldHashable<string>()));
    });

    it("Test count number MultiSet", function () {
        testCountNumber(new HashMultiSet<number>());
        testCountNumber(new HashMultiSet<number>(new AllFieldHashable<number>()));
    });

    it("Test count class MultiSet all field hashable", function () {
        const tmp = new HashMultiSet<PetStoreProduct>();
        addPetStoreProducts(tmp);
        expect (tmp.count (productNotAvailable)).toEqual(0);
        expect (tmp.count (product1)).toEqual(1);
    });

    it("Test count class MultiSet string hashable", function () {
        const tmp = new HashMultiSet<PetStoreProduct>(petStoreProductHashable);
        addPetStoreProducts(tmp);
        expect (tmp.count (productNotAvailable)).toEqual(0);
        expect (tmp.count (product1)).toEqual(4);
    });

    it("Test count class MultiSet number hashable", function () {
        const tmp = new HashMultiSet<PetStoreProduct>(petStorePriceHashable);
        addPetStoreProducts(tmp);
        expect (tmp.count (productNotAvailable)).toEqual(0);
        expect (tmp.count (product2)).toEqual(4);
    });
});

function testEmptyStringMultiSet(tmp: ImmutableMultiSet<string>): void {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
}

function testEmptyNumberMultiSet(tmp: ImmutableMultiSet<number>): void {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
}

function testEmptyPetStoreProductAndValueClassMultiSet(tmp: ImmutableMultiSet<PetStoreProduct>): void {
    expect(tmp.isEmpty()).toEqual(true);
    expect(tmp.size()).toEqual(0);
}

function testAddingOneEntryString(tmp: MultiSet<string>): void {
    expect(tmp.size()).toEqual(0, 'expected starting size to be zero');
    expect(tmp.isEmpty()).toEqual(true, 'expected starting isempty to be false');
    expect(true).toEqual(tmp.add("testkey"), 'adding first key to empty multiset');
    expect(tmp.size()).toEqual(1, 'expected size to be one after adding');
    expect(tmp.isEmpty()).toEqual(false, 'expected isempty to be false after adding');
    expect(true).toEqual(tmp.contains("testkey"), 'expected contains to be true looking for existing string');
    expect(false).toEqual(tmp.contains("key not found"), 'expected not present element not be be contained');
}

function testAddingOneEntryNumber(tmp: MultiSet<number>): void {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(100));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(100));
    expect(false).toEqual(tmp.contains(200));
}

function testAddingOneEntryPetStoreProduct(tmp: MultiSet<PetStoreProduct>): void {
    expect(tmp.size()).toEqual(0);
    expect(tmp.isEmpty()).toEqual(true);
    expect(true).toEqual(tmp.add(product1));
    expect(tmp.size()).toEqual(1);
    expect(tmp.isEmpty()).toEqual(false);
    expect(true).toEqual(tmp.contains(product1));
    expect(false).toEqual(tmp.contains(productNotAvailable));
}


function testAddingTwoUnrelatedEntriesString (tmp: MultiSet<string>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add("testkey"));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual(tmp.add("secondkey"));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains ("testkey"));
    expect (false).toEqual (tmp.contains ("key not found"));
  }
  
  function testAddingTwoUnrelatedEntriesNumber (tmp: MultiSet<number>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(1000));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual(tmp.add(2000));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains (1000));
    expect (false).toEqual (tmp.contains (3000));
  }
  
  function testAddingTwoUnrelatedEntriesPetStoreProduct (tmp: MultiSet<PetStoreProduct>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(product1));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual(tmp.add(product2));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
  }

  function testAddingTwoRelatedEntriesString (tmp: MultiSet<string>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add("testkey"));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (false).toEqual(tmp.add("testkey"));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains ("testkey"));
    expect (false).toEqual (tmp.contains ("key not found"));
  }
  
  function testAddingTwoRelatedEntriesNumber (tmp: MultiSet<number>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(1000));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (false).toEqual(tmp.add(1000));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains (1000));
    expect (false).toEqual (tmp.contains (3000));
  }
  
  function testAddingTwoRelatedEntriesPetStoreProduct (tmp: MultiSet<PetStoreProduct>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(product1));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (false).toEqual(tmp.add(product1));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
  }

  function testClearingString (tmp: MultiSet<string>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add("testkey"));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (false).toEqual(tmp.add("testkey"));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains ("testkey"));
    expect (false).toEqual (tmp.contains ("key not found"));
    expect (true).toEqual(tmp.add("secondkey"));
    expect (tmp.size ()).toEqual(3);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(tmp.clear());
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (false).toEqual (tmp.contains ("testkey"));
    expect (false).toEqual (tmp.contains ("key not found"));
    expect (false).toEqual (tmp.contains ("secondkey"));
  }
  
  function testClearingNumber (tmp: MultiSet<number>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(1000));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (false).toEqual(tmp.add(1000));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual (tmp.contains (1000));
    expect (false).toEqual (tmp.contains (3000));
    expect (true).toEqual(tmp.add(2000));
    expect (tmp.size ()).toEqual(3);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(tmp.clear());
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (false).toEqual (tmp.contains (1000));
    expect (false).toEqual (tmp.contains (2000));
    expect (false).toEqual (tmp.contains (3000));
  }
  
  function testClearingPetStoreProduct (tmp: MultiSet<PetStoreProduct>) : void {
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (true).toEqual(tmp.add(product1));
    expect (tmp.size ()).toEqual(1);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (false).toEqual(tmp.add(product1));
    expect (tmp.size ()).toEqual(2);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (true).toEqual(tmp.add(product2));
    expect (tmp.size ()).toEqual(3);
    expect (tmp.isEmpty ()).toEqual(false);
    expect (undefined).toEqual(tmp.clear());
    expect (tmp.size ()).toEqual(0);
    expect (tmp.isEmpty ()).toEqual(true);
    expect (false).toEqual (tmp.contains (product1));
    expect (false).toEqual (tmp.contains (product2));
    expect (false).toEqual (tmp.contains (productNotAvailable));
  }

function testCountString (tmp:MultiSet<string>) : void {
    addStrings (tmp);
    expect (tmp.size ()).toEqual(15);

    expect (tmp.count ("zero")).toEqual(0);
    expect (tmp.count ("one")).toEqual(1);
    expect (tmp.count ("two")).toEqual(2);
    expect (tmp.count ("three")).toEqual(3);
    expect (tmp.count ("four")).toEqual(4);
    expect (tmp.count ("five")).toEqual(5);
    expect (tmp.count ("six")).toEqual(0);
}

function testCountNumber (tmp:MultiSet<number>) : void {
    addNumbers (tmp);
    expect (tmp.size ()).toEqual(15);

    expect (tmp.count (1)).toEqual(0);
    expect (tmp.count (100)).toEqual(1);
    expect (tmp.count (200)).toEqual(2);
    expect (tmp.count (300)).toEqual(3);
    expect (tmp.count (400)).toEqual(4);
    expect (tmp.count (500)).toEqual(5);
    expect (tmp.count (600)).toEqual(0);
}


function addStrings (tmp:MultiSet<string>) : void {
    expect (true).toEqual(tmp.add("one"));

    expect (true).toEqual(tmp.add("two"));
    expect (false).toEqual(tmp.add("two"));

    expect (true).toEqual(tmp.add("three"));
    expect (false).toEqual(tmp.add("three"));
    expect (false).toEqual(tmp.add("three"));

    expect (true).toEqual(tmp.add("four"));
    expect (false).toEqual(tmp.add("four"));
    expect (false).toEqual(tmp.add("four"));
    expect (false).toEqual(tmp.add("four"));

    expect (true).toEqual(tmp.add("five"));
    expect (false).toEqual(tmp.add("five"));
    expect (false).toEqual(tmp.add("five"));
    expect (false).toEqual(tmp.add("five"));
    expect (false).toEqual(tmp.add("five"));
}

function addNumbers (tmp:MultiSet<number>) : void {
    expect (true).toEqual(tmp.add(100));

    expect (true).toEqual(tmp.add(200));
    expect (false).toEqual(tmp.add(200));

    expect (true).toEqual(tmp.add(300));
    expect (false).toEqual(tmp.add(300));
    expect (false).toEqual(tmp.add(300));

    expect (true).toEqual(tmp.add(400));
    expect (false).toEqual(tmp.add(400));
    expect (false).toEqual(tmp.add(400));
    expect (false).toEqual(tmp.add(400));

    expect (true).toEqual(tmp.add(500));
    expect (false).toEqual(tmp.add(500));
    expect (false).toEqual(tmp.add(500));
    expect (false).toEqual(tmp.add(500));
    expect (false).toEqual(tmp.add(500));
}

function addPetStoreProducts (tmp:MultiSet<PetStoreProduct>) : void {
    tmp.add (product1);
    tmp.add (product2);
    tmp.add (product3);

    tmp.add (productDuplicate1);
    tmp.add (productDuplicate2);
    tmp.add (productDuplicate3);

    tmp.add (priceDuplicate1);
    tmp.add (priceDuplicate2);
    tmp.add (priceDuplicate3);
}