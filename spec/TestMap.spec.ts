/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Test, TestBoolean, TestString, TestNumber} from 'jasts';

import {AllFieldHashable} from "../src/AllFieldHashable";
import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {HashMap} from "../src/HashMap";
import {Hashable} from "../src/Hashable";
import {ImmutableMap} from "../src/ImmutableMap";
import {ImmutableSet} from "../src/ImmutableSet";
import {JIterator} from "../src/JIterator";
import {LinkedHashMap} from "../src/LinkedHashMap";
import {JMap} from "../src/JMap";
import {MapEntry} from "../src/MapEntry";
import {NavigableHashMap} from "../src/NavigableHash";
import {SkipListMap} from "../src/SkipList";
import {TreeMap} from "../src/TreeMap";

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

// Wanted to show a class in the value object but anything would work fine
class ValueClass {
  private blah1:number;
  private blah2:string;
}

describe("Test Map functionality", function() {

  it("Test empty maps", function() {
    testEmptyStringStringMap (Collections.emptyMap<string,string>());
    testEmptyStringNumberMap (Collections.emptyMap<string,number>());
    testEmptyPetStoreProductAndValueClassMap (Collections.emptyMap<PetStoreProduct,ValueClass>());

    testEmptyStringStringMap (new HashMap<string,string> ());
    testEmptyStringStringMap (new HashMap<string,string> (new AllFieldHashable<string>()));
    testEmptyStringNumberMap (new HashMap<string,number> ());
    testEmptyStringNumberMap (new HashMap<string,number> (new AllFieldHashable<string>()));
    testEmptyPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> ());
    testEmptyPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyStringStringMap (new LinkedHashMap<string,string> ());
    testEmptyStringStringMap (new LinkedHashMap<string,string> (new AllFieldHashable<string>()));
    testEmptyStringNumberMap (new LinkedHashMap<string,number> ());
    testEmptyStringNumberMap (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testEmptyPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> ());
    testEmptyPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testEmptyStringStringMap (new TreeMap<string,string> (Collections.getStringComparator()));
    testEmptyStringNumberMap (new TreeMap<string,number> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassMap (new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testEmptyStringStringMap (new SkipListMap<string,string> (Collections.getStringComparator()));
    testEmptyStringNumberMap (new SkipListMap<string,number> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassMap (new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testEmptyStringStringMap (new NavigableHashMap<string,string> (Collections.getStringComparator()));
    testEmptyStringNumberMap (new NavigableHashMap<string,number> (Collections.getStringComparator()));
    testEmptyPetStoreProductAndValueClassMap (new NavigableHashMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding to empty maps", function() {
    testAddingOneEntryStringStringMap (new HashMap<string,string> (), "HashMap default");
    testAddingOneEntryStringStringMap (new HashMap<string,string> (new AllFieldHashable<string>()), "HashMap AllFieldHashable");
    testAddingOneEntryStringNumberMap (new HashMap<string,number> ());
    testAddingOneEntryStringNumberMap (new HashMap<string,number> (new AllFieldHashable<string>()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> ());
    testAddingOneEntryPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryStringStringMap (new LinkedHashMap<string,string> (), "LinkedHashMap default");
    testAddingOneEntryStringStringMap (new LinkedHashMap<string,string> (new AllFieldHashable<string>()), "LinkedHashMap AllFieldHashable");
    testAddingOneEntryStringNumberMap (new LinkedHashMap<string,number> ());
    testAddingOneEntryStringNumberMap (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> ());
    testAddingOneEntryPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testAddingOneEntryStringStringMap (new TreeMap<string,string> (Collections.getStringComparator()), "TreeMap");
    testAddingOneEntryStringNumberMap (new TreeMap<string,number> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testAddingOneEntryStringStringMap (new SkipListMap<string,string> (Collections.getStringComparator()), "SkipListMap");
    testAddingOneEntryStringNumberMap (new SkipListMap<string,number> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testAddingOneEntryStringStringMap (new NavigableHashMap<string,string> (Collections.getStringComparator()), "NavigableHashMap");
    testAddingOneEntryStringNumberMap (new NavigableHashMap<string,number> (Collections.getStringComparator()));
    testAddingOneEntryPetStoreProductAndValueClassMap (new NavigableHashMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));
  });

  it("Test adding two items to empty maps", function() {
    testAddingTwoEntriesStringStringMap (new HashMap<string,string> ());
    testAddingTwoEntriesStringStringMap (new HashMap<string,string> (new AllFieldHashable<string>()));
    testAddingTwoEntriesStringNumberMap (new HashMap<string,number> ());
    testAddingTwoEntriesStringNumberMap (new HashMap<string,number> (new AllFieldHashable<string>()));
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> ());
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testAddingTwoEntriesStringStringMap (new LinkedHashMap<string,string> ());
    testAddingTwoEntriesStringStringMap (new LinkedHashMap<string,string> (new AllFieldHashable<string>()));
    testAddingTwoEntriesStringNumberMap (new LinkedHashMap<string,number> ());
    testAddingTwoEntriesStringNumberMap (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> ());
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testAddingTwoEntriesStringStringMap (new TreeMap<string,string> (Collections.getStringComparator()));
    testAddingTwoEntriesStringNumberMap (new TreeMap<string,number> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testAddingTwoEntriesStringStringMap (new SkipListMap<string,string> (Collections.getStringComparator()));
    testAddingTwoEntriesStringNumberMap (new SkipListMap<string,number> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testAddingTwoEntriesStringStringMap (new NavigableHashMap<string,string> (Collections.getStringComparator()));
    testAddingTwoEntriesStringNumberMap (new NavigableHashMap<string,number> (Collections.getStringComparator()));
    testAddingTwoEntriesPetStoreProductAndValueClassMap (new NavigableHashMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));
  });

  it("Test clearing maps", function() {
    testClearingStringStringMap (new HashMap<string,string> ());
    testClearingStringStringMap (new HashMap<string,string> (new AllFieldHashable<string>()));
    testClearingStringNumberMap (new HashMap<string,number> ());
    testClearingStringNumberMap (new HashMap<string,number> (new AllFieldHashable<string>()));
    testClearingPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> ());
    testClearingPetStoreProductAndValueClassMap (new HashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testClearingStringStringMap (new LinkedHashMap<string,string> ());
    testClearingStringStringMap (new LinkedHashMap<string,string> (new AllFieldHashable<string>()));
    testClearingStringNumberMap (new LinkedHashMap<string,number> ());
    testClearingStringNumberMap (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testClearingPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> ());
    testClearingPetStoreProductAndValueClassMap (new LinkedHashMap<PetStoreProduct,ValueClass> (new AllFieldHashable<PetStoreProduct>()));

    testClearingStringStringMap (new TreeMap<string,string> (Collections.getStringComparator()));
    testClearingStringNumberMap (new TreeMap<string,number> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassMap (new TreeMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testClearingStringStringMap (new SkipListMap<string,string> (Collections.getStringComparator()));
    testClearingStringNumberMap (new SkipListMap<string,number> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassMap (new SkipListMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));

    testClearingStringStringMap (new NavigableHashMap<string,string> (Collections.getStringComparator()));
    testClearingStringNumberMap (new NavigableHashMap<string,number> (Collections.getStringComparator()));
    testClearingPetStoreProductAndValueClassMap (new NavigableHashMap<PetStoreProduct,ValueClass> (alphabeticalSortPetStoreProduct));
  });

  it("Test replacing entries", function() {
    testMapEntryReplacement (new HashMap<string,number> ());
    testMapEntryReplacement (new HashMap<string,number> (new AllFieldHashable<string>()));
    testMapEntryReplacement (new LinkedHashMap<string,number> ());
    testMapEntryReplacement (new LinkedHashMap<string,number> (new AllFieldHashable<string>()));
    testMapEntryReplacement (new TreeMap<string,number> (Collections.getStringComparator()));
    testMapEntryReplacement (new SkipListMap<string,number> (Collections.getStringComparator()));
    testMapEntryReplacement (new NavigableHashMap<string,number> (Collections.getStringComparator()));
  });

  it("Test copy constructor", function() {
    testCopyConstructor (new HashMap<string,number> (new AllFieldHashable<string>(), populateTestData (new HashMap<string,number> (new AllFieldHashable<string>()))));
    testCopyConstructor (new LinkedHashMap<string,number> (new AllFieldHashable<string>(), populateTestData (new LinkedHashMap<string,number> (new AllFieldHashable<string>()))));
    testCopyConstructor (new TreeMap<string,number> (Collections.getStringComparator(), populateTestData (new TreeMap<string,number> (Collections.getStringComparator()))));
    testCopyConstructor (new SkipListMap<string,number> (Collections.getStringComparator(), populateTestData (new SkipListMap<string,number> (Collections.getStringComparator()))));
    testCopyConstructor (new NavigableHashMap<string,number> (Collections.getStringComparator(), populateTestData (new NavigableHashMap<string,number> (Collections.getStringComparator()))));
  });

//  it("Test JSON stringify", function() {
//    testJsonStringify (new HashMap<string,number> ());
//    testJsonStringify (new LinkedHashMap<string,number> ());
//    testJsonStringify (new TreeMap<string,number> (Collections.getStringComparator()));
//    testJsonStringify (new SkipListMap<string,number> (Collections.getStringComparator()));
//  });

});

function testEmptyStringStringMap (map:ImmutableMap<string,string>) : void {
  TestNumber.equals ("Testing empty string string map size", map.size(), 0);
  TestBoolean.true ("Testing empty string string map isEmpty", map.isEmpty());
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  expect (map.isEmpty ()).toEqual(true);
  expect (map.size ()).toEqual(0);
  expect ('"[]"').toEqual (JSON.stringify(map));
  expect (false).toEqual (map.containsValue(null));
  expect (false).toEqual (map.containsValue(undefined));
  expect (false).toEqual (map.containsValue("notfound"));

  const keyset:ImmutableSet<string> = map.keySet();
  let count:number = 0;
  const iter:JIterator<string> = keyset.iterator();
  for (; iter.hasNext(); ) {
    const p:string = iter.next();
    count = count + 1;
  }
  expect (count).toEqual (0);

  const entryset:ImmutableSet<MapEntry<string,string>> = map.entrySet();
  let count2:number = 0;
  const iter2:JIterator<MapEntry<string,string>> = entryset.iterator();
  for (; iter2.hasNext(); ) {
    const p2:MapEntry<string,string> = iter2.next();
    count2 = count2 + 1;
  }
  expect (count2).toEqual (0);

  const keyset3:ImmutableSet<string> = map.keySet();
  let count3:number = 0;
  const tsi3:Iterator<string> = keyset3[Symbol.iterator]();
  let tmp3:IteratorResult<string> = tsi3.next();
  while (!tmp3.done) {
    count3 = count + 1;
    tmp3 = tsi3.next();
  }
  expect (count3).toEqual (0);

  const entryset4:ImmutableSet<MapEntry<string,string>> = map.entrySet();
  let count4:number = 0;
  const tsi4:Iterator<MapEntry<string,string>> = entryset4[Symbol.iterator]();
  let tmp4:IteratorResult<MapEntry<string,string>> = tsi4.next();
  while (!tmp4.done) {
    count4 = count4 + 1;
    tmp4 = tsi4.next();
  }
  expect (count4).toEqual (0);
}


function testEmptyStringNumberMap (map:ImmutableMap<string,number>) : void {
  expect (map.isEmpty ()).toEqual(true);
  expect (map.size ()).toEqual(0);
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
}

function testEmptyPetStoreProductAndValueClassMap (map:ImmutableMap<PetStoreProduct,ValueClass>) : void {
  expect (map.isEmpty ()).toEqual(true);
  expect (map.size ()).toEqual(0);
}

function testAddingOneEntryStringStringMap (map:JMap<string,string>, typestring:string) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (map.remove("bogus")).toEqual (null);
  expect (undefined).toEqual(map.put("testkey", "testvalue"));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect ("testvalue").toEqual (map.get ("testkey"));
  TestString.undefined ("Getting key not in map will return undefined " + typestring, map.get ("key not found"));
  expect (undefined).toEqual (map.get ("key not found"));
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  expect ('"[{\\\"testkey\\\",\\\"testvalue\\\"}]"').toEqual (JSON.stringify(map));
  expect (false).toEqual (map.containsValue(null));
  expect (false).toEqual (map.containsValue(undefined));
  expect (false).toEqual (map.containsValue("notfound"));
  expect (false).toEqual (map.containsValue("testkey"));
  expect (true).toEqual (map.containsValue("testvalue"));
}

function testAddingOneEntryStringNumberMap (map:JMap<string,number>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", 1));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (1).toEqual (map.get ("testkey"));
  expect (undefined).toEqual (map.get ("key not found"));
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  TestBoolean.true ("Testing known key is contained", map.containsKey ("testkey"));

  const keyset:ImmutableSet<string> = map.keySet();
  let count:number = 0;
  const iter:JIterator<string> = keyset.iterator();
  for (; iter.hasNext(); ) {
    const p:string = iter.next();
    count = count + 1;
  }
  expect (count).toEqual (1);

  const entryset:ImmutableSet<MapEntry<string,number>> = map.entrySet();
  let count2:number = 0;
  const iter2:JIterator<MapEntry<string,number>> = entryset.iterator();
  for (; iter2.hasNext(); ) {
    const p2:MapEntry<string,number> = iter2.next();
    count2 = count2 + 1;
  }
  expect (count2).toEqual (1);

  const keyset3:ImmutableSet<string> = map.keySet();
  let count3:number = 0;
  const tsi3:Iterator<string> = keyset3[Symbol.iterator]();
  let tmp3:IteratorResult<string> = tsi3.next();
  while (!tmp3.done) {
    count3 = count3 + 1;
    tmp3 = tsi3.next();
  }
  expect (count3).toEqual (1);

  const entryset4:ImmutableSet<MapEntry<string,number>> = map.entrySet();
  let count4:number = 0;
  const tsi4:Iterator<MapEntry<string,number>> = entryset4[Symbol.iterator]();
  let tmp4:IteratorResult<MapEntry<string,number>> = tsi4.next();
  while (!tmp4.done) {
    count4 = count4 + 1;
    tmp4 = tsi4.next();
  }
  expect (count4).toEqual (1);
}

function testAddingOneEntryPetStoreProductAndValueClassMap (map:JMap<PetStoreProduct,ValueClass>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put(product1, new ValueClass()));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
}

function testAddingTwoEntriesStringStringMap (map:JMap<string,string>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", "testvalue"));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.put("secondkey", "secondvalue"));
  expect (map.size ()).toEqual(2);
  expect (map.isEmpty ()).toEqual(false);
  expect ("testvalue").toEqual (map.get ("testkey"));
  expect (undefined).toEqual (map.get ("key not found"));
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  TestBoolean.true ("Testing known key is contained", map.containsKey ("testkey"));
}

function testAddingTwoEntriesStringNumberMap (map:JMap<string,number>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", 1));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.put("secondkey", 1));
  expect (map.size ()).toEqual(2);
  expect (map.isEmpty ()).toEqual(false);
  expect (1).toEqual (map.get ("secondkey"));
  expect (undefined).toEqual (map.get ("key not found"));
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  TestBoolean.true ("Testing known key is contained", map.containsKey ("testkey"));
}

function testAddingTwoEntriesPetStoreProductAndValueClassMap (map:JMap<PetStoreProduct,ValueClass>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put(product1, new ValueClass()));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.put(product2, new ValueClass()));
  expect (map.size ()).toEqual(2);
  expect (map.isEmpty ()).toEqual(false);
}

function testClearingStringStringMap (map:JMap<string,string>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", "testvalue"));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.put("secondkey", "secondvalue"));
  expect (map.size ()).toEqual(2);
  expect (map.isEmpty ()).toEqual(false);
  expect ("testvalue").toEqual (map.get ("testkey"));
  expect (undefined).toEqual (map.get ("key not found"));
  expect (undefined).toEqual(map.clear());
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual (map.get ("testkey"));
  expect (undefined).toEqual (map.get ("key not found"));
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  TestBoolean.false ("Testing cleared map does not find key", map.containsKey ("testkey"));
}

function testClearingStringNumberMap (map:JMap<string,number>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put("testkey", 1));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.put("secondkey", 1));
  expect (map.size ()).toEqual(2);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.clear());
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  TestBoolean.false ("Testing non existent key is not contained", map.containsKey ("not going to find it"));
  TestBoolean.false ("Testing cleared map does not find key", map.containsKey ("testkey"));
}

function testClearingPetStoreProductAndValueClassMap (map:JMap<PetStoreProduct,ValueClass>) : void {
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
  expect (undefined).toEqual(map.put(product1, new ValueClass()));
  expect (map.size ()).toEqual(1);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.put(product2, new ValueClass()));
  expect (map.size ()).toEqual(2);
  expect (map.isEmpty ()).toEqual(false);
  expect (undefined).toEqual(map.clear());
  expect (map.size ()).toEqual(0);
  expect (map.isEmpty ()).toEqual(true);
}

function testMapEntryReplacement (map:JMap<string,number>) : void {
  expect (map.put ("ChewToy", 14.99)).toEqual(undefined);
  expect (map.put ("Catnip", 4.99)).toEqual(undefined);
  expect (map.get ("ChewToy")).toEqual (14.99);
  expect (map.get ("Catnip")).toEqual (4.99);
  expect (map.put ("Catnip", 9.99)).toEqual(4.99);
  expect (map.get ("Catnip")).toEqual (9.99);  // This one should change to the new value
  expect (map.get ("ChewToy")).toEqual (14.99);  // This one didnt change
  expect (false).toEqual (map.containsValue(null));
  expect (false).toEqual (map.containsValue(undefined));
  expect (false).toEqual (map.containsValue(100));
  expect (true).toEqual (map.containsValue(14.99));
};

function populateTestData (map:JMap<string,number>) : JMap<string,number> {
  map.put ("ChewToy", 14.99);
  map.put ("Leash", 9.99);
  map.put ("Catnip", 4.99);
  return map;
};

function testCopyConstructor (map:JMap<string,number>) : void {
  expect (map.get ("Leash")).toEqual (9.99);
  expect (map.get ("ChewToy")).toEqual (14.99);
  expect (map.get ("Catnip")).toEqual (4.99);
  expect (map.get ("Bananas")).toEqual (undefined);
  expect (map.size()).toEqual (3);
};

function testJsonStringify (map:JMap<string,number>) : void {
  console.log (JSON.stringify (map));
  expect (JSON.stringify (map)).toEqual ('"[]"');
  map.put ("ChewToy", 14.99);
  expect (JSON.stringify (map)).toEqual ('"[{\"key\":\"ChewToy\",\"value\":14.99}]"');
  console.log (JSON.stringify (map));
};
