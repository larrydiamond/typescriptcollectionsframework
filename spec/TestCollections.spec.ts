/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Collectable} from "../src/Collectable";
import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
import {ImmutableList} from "../src/ImmutableList";
import {TestBoolean} from 'jasts';
import {TestNumber} from 'jasts';

describe("Test Collections static methods", function() {

  it("getStringComparator compare with self", function() {
    const comp:Comparator<string> = Collections.getStringComparator();

    TestNumber.equals ("Comparing something with itself returns 0", comp.compare ("something", "something"), 0);
    TestNumber.equals ("Comparing null with itself returns 0", comp.compare (null, null), 0);
    TestNumber.equals ("Comparing undefined with itself returns 0", comp.compare (undefined, undefined), 0);
  });

  it("getStringComparator compare with undefined", function() {
    const comp:Comparator<string> = Collections.getStringComparator();
    TestNumber.equals ("Comparing undefined vs undefined returns 0", comp.compare (undefined, undefined), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, "something"), -1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare ("something", undefined), 1);
  });

  it("getStringComparator compare with null", function() {
    const comp:Comparator<string> = Collections.getStringComparator();
    TestNumber.equals ("Comparing null vs null returns 0", comp.compare (null, null), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare ("something", null), 1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, "something"), -1);
  });

  it("getStringComparator compare with a real string", function() {
    const comp:Comparator<string> = Collections.getStringComparator();
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, "something"), -1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, "something"), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare ("something", null), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare ("something", undefined), 1);

    TestNumber.equals ("Comparing a lower string vs a higher string returns -1", comp.compare ("AAA", "BBB"), -1);
    TestNumber.equals ("Comparing a higher string vs a lower string returns 1", comp.compare ("CCC", "BBB"), 1);
    TestNumber.equals ("Comparing a string vs itself returns 0", comp.compare ("DDD", "DDD"), 0);
  });

  it("getNumberComparator compare with self", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();

    TestNumber.equals ("Comparing something with itself returns 0", comp.compare (50, 50), 0);
    TestNumber.equals ("Comparing null with itself returns 0", comp.compare (null, null), 0);
    TestNumber.equals ("Comparing undefined with itself returns 0", comp.compare (undefined, undefined), 0);
  });

  it("getNumberComparator compare with undefined", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();
    TestNumber.equals ("Comparing undefined vs undefined returns 0", comp.compare (undefined, undefined), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, 50), -1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare (50, undefined), 1);
  });

  it("getNumberComparator compare with null", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();
    TestNumber.equals ("Comparing null vs null returns 0", comp.compare (null, null), 0);

    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare (50, null), 1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, 50), -1);
  });

  it("getNumberComparator compare with a real string", function() {
    const comp:Comparator<number> = Collections.getNumberComparator();
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, 50), -1);
    TestNumber.equals ("Comparing null vs something returns -1", comp.compare (null, 50), -1);
    TestNumber.equals ("Comparing something vs null returns 1", comp.compare (50, null), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare (50, undefined), 1);

    TestNumber.equals ("Comparing a lower number vs a higher number returns -1", comp.compare (10, 100), -1);
    TestNumber.equals ("Comparing a higher number vs a lower number returns 1", comp.compare (200, 20), 1);
    TestNumber.equals ("Comparing a number vs itself returns 0", comp.compare (1000, 1000), 0);
  });

  it("getHashCodeForString undefined", function() {
    TestNumber.equals ("undefined hash code is zero", Collections.getHashCodeForString (undefined), 0);
  });

  it("getHashCodeForString null", function() {
    TestNumber.equals ("null hash code is zero", Collections.getHashCodeForString (null), 0);
  });

  it("getHashCodeForString data", function() {
    TestNumber.greaterThan ("hash code for One is valid", Collections.getHashCodeForString ("One"), 0);
  });

  it("getHashCodeForStrings undefined", function() {
    TestNumber.equals ("undefined hash code is zero", Collections.getHashCodeForStrings (undefined), 0);
  });

  it("getHashCodeForStrings null", function() {
    TestNumber.equals ("null hash code is zero", Collections.getHashCodeForStrings (null), 0);
  });

  it("getHashCodeForStrings data", function() {
    const tmp:ImmutableList<string> = Collections.list("One", "Two", "Three");
    TestNumber.greaterThan ("hash code for OneTwothree is valid", Collections.getHashCodeForStrings (tmp), 0);
  });

  it("getHashCodeForNumber undefined", function() {
    TestNumber.equals ("undefined hash code is zero", Collections.getHashCodeForNumber (undefined), 0);
  });

  it("getHashCodeForNumber null", function() {
    TestNumber.equals ("null hash code is zero", Collections.getHashCodeForNumber (null), 0);
  });

  it("getHashCodeForNumber small", function() {
    TestNumber.equals ("hash code for low integers is itself", Collections.getHashCodeForNumber (50), 50);
  });

  it ("Dynamic Collectable skuCollectable", function () {
    const skuCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("sku");
    // SkuCollectable will differentiate psp1 psp2 psp3
    TestBoolean.false ("skuCollectable psp1 psp2", skuCollectable.equals(psp1, psp2));
    TestBoolean.false ("skuCollectable psp1 psp3", skuCollectable.equals(psp1, psp3));
    TestBoolean.false ("skuCollectable psp2 psp3", skuCollectable.equals(psp2, psp3));

    // SkuCollectable cannot differentiate psp1 psp1copy and psp3copy
    TestBoolean.true ("skuCollectable psp1 psp1copy", skuCollectable.equals(psp1, psp1copy));
    TestBoolean.true ("skuCollectable psp1 psp3copy", skuCollectable.equals(psp1, psp3copy));

    // The others will be differentiated
    TestBoolean.false ("skuCollectable psp1copy psp2", skuCollectable.equals(psp1copy, psp2));
    TestBoolean.false ("skuCollectable psp1copy psp3", skuCollectable.equals(psp1copy, psp3));
    TestBoolean.false ("skuCollectable psp3copy psp2", skuCollectable.equals(psp3copy, psp2));
    TestBoolean.false ("skuCollectable psp3copy psp3", skuCollectable.equals(psp3copy, psp3));

    // Compare vs null and undefined
    TestBoolean.false ("skuCollectable psp1 null", skuCollectable.equals(psp1, null));
    TestBoolean.false ("skuCollectable psp1 undefined", skuCollectable.equals(psp1, undefined));
    TestBoolean.false ("skuCollectable null psp1", skuCollectable.equals(null, psp1));
    TestBoolean.false ("skuCollectable undefined psp1", skuCollectable.equals(undefined, psp1));
    TestBoolean.true ("skuCollectable null null", skuCollectable.equals(null, null));
    TestBoolean.true ("skuCollectable undefined undefined", skuCollectable.equals(undefined, undefined));
    TestBoolean.false ("skuCollectable null undefined", skuCollectable.equals(null, undefined));
    TestBoolean.false ("skuCollectable undefined null", skuCollectable.equals(undefined, null));
  });

  it ("Dynamic Collectable nameCollectable", function () {
    const nameCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("name");
    // NameCollectable will differentiate psp1 psp2 psp3
    TestBoolean.false ("nameCollectable psp1 psp2", nameCollectable.equals(psp1, psp2));
    TestBoolean.false ("nameCollectable psp1 psp3", nameCollectable.equals(psp1, psp3));
    TestBoolean.false ("nameCollectable psp2 psp3", nameCollectable.equals(psp2, psp3));

    // nameCollectable cannot differentiate psp2 and psp2copy
    TestBoolean.true ("nameCollectable psp2 psp2copy", nameCollectable.equals(psp2, psp2copy));

    // The others will be differentiated
    TestBoolean.false ("nameCollectable psp2copy psp1", nameCollectable.equals(psp2copy, psp1));
    TestBoolean.false ("nameCollectable psp2copy psp3", nameCollectable.equals(psp2copy, psp3));

    // Compare vs null and undefined
    TestBoolean.false ("nameCollectable psp1 null", nameCollectable.equals(psp1, null));
    TestBoolean.false ("nameCollectable psp1 undefined", nameCollectable.equals(psp1, undefined));
    TestBoolean.false ("nameCollectable null psp1", nameCollectable.equals(null, psp1));
    TestBoolean.false ("nameCollectable undefined psp1", nameCollectable.equals(undefined, psp1));
    TestBoolean.true ("nameCollectable null null", nameCollectable.equals(null, null));
    TestBoolean.true ("nameCollectable undefined undefined", nameCollectable.equals(undefined, undefined));
    TestBoolean.false ("nameCollectable null undefined", nameCollectable.equals(null, undefined));
    TestBoolean.false ("nameCollectable undefined null", nameCollectable.equals(undefined, null));
  });

  it ("Dynamic Collectable skuNameCollectable", function () {
    const skuNameCollectable:Collectable<PetStoreProduct> = Collections.dynamicCollectable("sku", "name");

    // skuNameCollectable will differentiate psp1 psp2 psp3 psp1copy psp2copy
    TestBoolean.false ("skuNameCollectable psp1 psp2", skuNameCollectable.equals(psp1, psp2));
    TestBoolean.false ("skuNameCollectable psp1 psp3", skuNameCollectable.equals(psp1, psp3));
    TestBoolean.false ("skuNameCollectable psp1 psp1copy", skuNameCollectable.equals(psp1, psp1copy));
    TestBoolean.false ("skuNameCollectable psp1 psp2copy", skuNameCollectable.equals(psp1, psp2copy));
    TestBoolean.false ("skuNameCollectable psp2 psp3", skuNameCollectable.equals(psp2, psp3));
    TestBoolean.false ("skuNameCollectable psp2 psp1copy", skuNameCollectable.equals(psp2, psp1copy));
    TestBoolean.false ("skuNameCollectable psp2 psp2copy", skuNameCollectable.equals(psp2, psp2copy));
    TestBoolean.false ("skuNameCollectable psp2 psp3copy", skuNameCollectable.equals(psp2, psp3copy));
    TestBoolean.false ("skuNameCollectable psp3 psp1copy", skuNameCollectable.equals(psp3, psp1copy));
    TestBoolean.false ("skuNameCollectable psp3 psp2copy", skuNameCollectable.equals(psp3, psp2copy));
    TestBoolean.false ("skuNameCollectable psp3 psp3copy", skuNameCollectable.equals(psp3, psp3copy));
    TestBoolean.false ("skuNameCollectable psp1copy psp2copy", skuNameCollectable.equals(psp1copy, psp2copy));
    TestBoolean.false ("skuNameCollectable psp1copy psp3copy", skuNameCollectable.equals(psp1copy, psp3copy));

    // nameCollectable cannot differentiate psp1 and psp3copy
    TestBoolean.true ("nameCollectable psp1 psp3copy", skuNameCollectable.equals(psp1, psp3copy));

    // Compare vs null and undefined
    TestBoolean.false ("skuNameCollectable psp1 null", skuNameCollectable.equals(psp1, null));
    TestBoolean.false ("skuNameCollectable psp1 undefined", skuNameCollectable.equals(psp1, undefined));
    TestBoolean.false ("skuNameCollectable null psp1", skuNameCollectable.equals(null, psp1));
    TestBoolean.false ("skuNameCollectable undefined psp1", skuNameCollectable.equals(undefined, psp1));
    TestBoolean.true ("skuNameCollectable null null", skuNameCollectable.equals(null, null));
    TestBoolean.true ("skuNameCollectable undefined undefined", skuNameCollectable.equals(undefined, undefined));
    TestBoolean.false ("skuNameCollectable null undefined", skuNameCollectable.equals(null, undefined));
    TestBoolean.false ("skuNameCollectable undefined null", skuNameCollectable.equals(undefined, null));

  });


});

/*
 * This class is a simple class that the default Collectable
 * will properly handle.
 * The copy instances below are to test the dynamicCollectable method
 */
class PetStoreProduct {
  sku:number;
  name:string;
  brand:string;

  constructor (isku:number, iname:string, ibrand:string) {
    this.sku = isku;
    this.name = iname;
    this.brand = ibrand;
  }
}

const psp1:PetStoreProduct = new PetStoreProduct (1, "A", "A");
const psp2:PetStoreProduct = new PetStoreProduct (2, "B", "B");
const psp3:PetStoreProduct = new PetStoreProduct (3, "C", "C");

const psp1copy:PetStoreProduct = new PetStoreProduct (1, "D", "D");  // duplicate sku
const psp2copy:PetStoreProduct = new PetStoreProduct (5, "B", "E");  // duplicate product name
const psp3copy:PetStoreProduct = new PetStoreProduct (1, "A", "F");  // duplicate sku and product name
