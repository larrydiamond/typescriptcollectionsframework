/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldHashable} from "../src/AllFieldHashable";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {HashSet} from "../src/HashSet";
import {Hashable} from "../src/Hashable";
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
import {JSet} from "../src/JSet";
import {NavigableHashSet} from "../src/NavigableHash";
import {SkipListSet} from "../src/SkipList";
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

const product2:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
const product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
const product3:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
const productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 1.99);

describe("Test generic Set functionality", function() {

  it("Test empty Sets", function() {
    testEmptyStringStringSet (Collections.emptySet<string>());
    testEmptyPetStoreProductAndValueClassSet (Collections.emptySet<PetStoreProduct>());

    testEmptyStringStringSet (new HashSet<string> ());
    testEmptyStringStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testEmptyPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testEmptyPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyStringStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testEmptyStringStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testEmptyStringStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding to empty Sets", function() {
    testAddingOneEntryStringStringSet (new HashSet<string> ());
    testAddingOneEntryStringStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testAddingOneEntryPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryStringStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingOneEntryStringStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingOneEntryStringStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding two items to empty Sets", function() {
    testAddingTwoEntriesStringStringSet (new HashSet<string> ());
    testAddingTwoEntriesStringStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testAddingTwoEntriesStringStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingTwoEntriesStringStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingTwoEntriesStringStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it("Test clearing Sets", function() {
    testClearingStringStringSet (new HashSet<string> ());
    testClearingStringStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testClearingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testClearingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testClearingStringStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testClearingStringStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testClearingStringStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it ("Test attempting to add a duplicate is ignored", function () {
      testDuplicatingStringStringSet (new HashSet<string> ());
      testDuplicatingStringStringSet (new HashSet<string> (new AllFieldHashable<string>()));
      testDuplicatingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
      testDuplicatingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

      testDuplicatingStringStringSet (new TreeSet<string> (Collections.getStringComparator()));
      testDuplicatingPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testDuplicatingStringStringSet (new SkipListSet<string> (Collections.getStringComparator()));
      testDuplicatingPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testDuplicatingStringStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
      testDuplicatingPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it ("Test remove", function () {
      testRemoveStringStringSet (new HashSet<string> ());
      testRemoveStringStringSet (new HashSet<string> (new AllFieldHashable<string>()));
      testRemovePetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
      testRemovePetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

      testRemoveStringStringSet (new TreeSet<string> (Collections.getStringComparator()));
      testRemovePetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testRemoveStringStringSet (new SkipListSet<string> (Collections.getStringComparator()));
      testRemovePetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testRemoveStringStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
      testRemovePetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

});

function testEmptyStringStringSet (Set:ImmutableSet<string>) : void {
   expect (Set.isEmpty ()).toEqual(true);
   expect (Set.size ()).toEqual(0);
}

function testEmptyPetStoreProductAndValueClassSet (Set:ImmutableSet<PetStoreProduct>) : void {
   expect (Set.isEmpty ()).toEqual(true);
   expect (Set.size ()).toEqual(0);
}

function testAddingOneEntryStringStringSet (Set:JSet<string>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add("testkey"));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual (Set.contains ("testkey"));
  expect (false).toEqual (Set.contains ("key not found"));
}

function testAddingOneEntryPetStoreProductAndValueClassSet (Set:JSet<PetStoreProduct>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add(product1));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
}

function testAddingTwoEntriesStringStringSet (Set:JSet<string>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add("testkey"));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual(Set.add("secondkey"));
  expect (Set.size ()).toEqual(2);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual (Set.contains ("testkey"));
  expect (false).toEqual (Set.contains ("key not found"));
}

function testAddingTwoEntriesPetStoreProductAndValueClassSet (Set:JSet<PetStoreProduct>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add(product1));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual(Set.add(product2));
  expect (Set.size ()).toEqual(2);
  expect (Set.isEmpty ()).toEqual(false);
}

function testClearingStringStringSet (Set:JSet<string>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add("testkey"));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual(Set.add("secondkey"));
  expect (Set.size ()).toEqual(2);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual (Set.contains ("testkey"));
  expect (false).toEqual (Set.contains ("key not found"));
  expect (undefined).toEqual(Set.clear());
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (false).toEqual (Set.contains ("testkey"));
  expect (false).toEqual (Set.contains ("key not found"));
}

function testClearingPetStoreProductAndValueClassSet (Set:JSet<PetStoreProduct>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add(product1));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (true).toEqual(Set.add(product2));
  expect (Set.size ()).toEqual(2);
  expect (Set.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(Set.clear());
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
}

function testDuplicatingStringStringSet (Set:JSet<string>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add("testkey"));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (false).toEqual(Set.add("testkey"));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
}

function testDuplicatingPetStoreProductAndValueClassSet (Set:JSet<PetStoreProduct>) : void {
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (true).toEqual(Set.add(product1));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (false).toEqual(Set.add(product1));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
}

function testRemoveStringStringSet (Set:JSet<string>) : void {
  expect (Set.contains ("testkey")).toEqual (false);
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);

  expect (true).toEqual(Set.add("testkey"));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (Set.contains ("testkey")).toEqual (true);

  expect (false).toEqual (Set.remove ("NoSuchString"));
  expect (Set.contains ("testkey")).toEqual (true);
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);

  expect (true).toEqual (Set.remove ("testkey"));
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
  expect (Set.contains ("testkey")).toEqual (false);
}

function testRemovePetStoreProductAndValueClassSet (Set:JSet<PetStoreProduct>) : void {
  expect (Set.contains (product1)).toEqual (false);
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);

  expect (true).toEqual(Set.add(product1));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (Set.contains (product1)).toEqual (true);

  expect (false).toEqual (Set.remove (product2));
  expect (Set.size ()).toEqual(1);
  expect (Set.isEmpty ()).toEqual(false);
  expect (Set.contains (product1)).toEqual (true);

  expect (true).toEqual (Set.remove (product1));
  expect (Set.contains (product1)).toEqual (false);
  expect (Set.size ()).toEqual(0);
  expect (Set.isEmpty ()).toEqual(true);
}
