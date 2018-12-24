/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldHashable} from "../src/AllFieldHashable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {HashSet} from "../src/HashSet";
import {ImmutableSet} from "../src/ImmutableSet";
import {JSet} from "../src/JSet";
import {LinkedHashSet} from "../src/LinkedHashSet";
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
    testEmptyStringSet (Collections.emptySet<string>());
    testEmptyPetStoreProductAndValueClassSet (Collections.emptySet<PetStoreProduct>());

    testEmptyStringSet (new HashSet<string> ());
    testEmptyStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testEmptyStringSet (new LinkedHashSet<string> (new AllFieldHashable<string>()));

    testEmptyPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testEmptyPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> ());
    testEmptyPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testEmptyStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testEmptyStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding to empty Sets", function() {
    testAddingOneEntryStringSet (new HashSet<string> ());
    testAddingOneEntryStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testAddingOneEntryStringSet (new LinkedHashSet<string> (new AllFieldHashable<string>()));

    testAddingOneEntryPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testAddingOneEntryPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> ());
    testAddingOneEntryPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingOneEntryStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingOneEntryStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding two items to empty Sets", function() {
    testAddingTwoEntriesStringSet (new HashSet<string> ());
    testAddingTwoEntriesStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testAddingTwoEntriesStringSet (new LinkedHashSet<string> (new AllFieldHashable<string>()));

    testAddingTwoEntriesPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testAddingTwoEntriesPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> ());
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testAddingTwoEntriesStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingTwoEntriesStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testAddingTwoEntriesStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it("Test clearing Sets", function() {
    testClearingStringSet (new HashSet<string> ());
    testClearingStringSet (new HashSet<string> (new AllFieldHashable<string>()));
    testClearingStringSet (new LinkedHashSet<string> (new AllFieldHashable<string>()));

    testClearingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
    testClearingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testClearingPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> ());
    testClearingPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

    testClearingStringSet (new TreeSet<string> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testClearingStringSet (new SkipListSet<string> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

    testClearingStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it ("Test attempting to add a duplicate is ignored", function () {
      testDuplicatingStringSet (new HashSet<string> ());
      testDuplicatingStringSet (new HashSet<string> (new AllFieldHashable<string>()));
      testDuplicatingStringSet (new LinkedHashSet<string> (new AllFieldHashable<string>()));

      testDuplicatingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
      testDuplicatingPetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

      testDuplicatingPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> ());
      testDuplicatingPetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

      testDuplicatingStringSet (new TreeSet<string> (Collections.getStringComparator()));
      testDuplicatingPetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testDuplicatingStringSet (new SkipListSet<string> (Collections.getStringComparator()));
      testDuplicatingPetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testDuplicatingStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
      testDuplicatingPetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

  it ("Test remove", function () {
      testRemoveStringSet (new HashSet<string> ());
      testRemoveStringSet (new HashSet<string> (new AllFieldHashable<string>()));
      testRemoveStringSet (new LinkedHashSet<string> (new AllFieldHashable<string>()));

      testRemovePetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> ());
      testRemovePetStoreProductAndValueClassSet (new HashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

      testRemovePetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> ());
      testRemovePetStoreProductAndValueClassSet (new LinkedHashSet<PetStoreProduct> (new AllFieldHashable<PetStoreProduct>()));

      testRemoveStringSet (new TreeSet<string> (Collections.getStringComparator()));
      testRemovePetStoreProductAndValueClassSet (new TreeSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testRemoveStringSet (new SkipListSet<string> (Collections.getStringComparator()));
      testRemovePetStoreProductAndValueClassSet (new SkipListSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));

      testRemoveStringSet (new NavigableHashSet<string> (Collections.getStringComparator()));
      testRemovePetStoreProductAndValueClassSet (new NavigableHashSet<PetStoreProduct> (alphabeticalSortPetStoreProduct));
  });

});

function testEmptyStringSet (Set:ImmutableSet<string>) : void {
   expect (Set.isEmpty ()).toEqual(true);
   expect (Set.size ()).toEqual(0);
}

function testEmptyPetStoreProductAndValueClassSet (Set:ImmutableSet<PetStoreProduct>) : void {
   expect (Set.isEmpty ()).toEqual(true);
   expect (Set.size ()).toEqual(0);
}

function testAddingOneEntryStringSet (Set:JSet<string>) : void {
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

function testAddingTwoEntriesStringSet (Set:JSet<string>) : void {
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

function testClearingStringSet (Set:JSet<string>) : void {
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

function testDuplicatingStringSet (Set:JSet<string>) : void {
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

function testRemoveStringSet (Set:JSet<string>) : void {
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
