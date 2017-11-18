/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldHashable} from "../src/AllFieldHashable";
import {Hashable} from "../src/Hashable";
import {Test, TestBoolean, TestString} from 'jasts';

describe("Test All Field Hashable", function() {

  class SomeClass {
    private someField:number;
    private someOtherField:string;
    public constructor (someInput:number = 20, someOtherInput:string = "blah") {
      this.someField = someInput;
      this.someOtherField = someOtherInput;
    }
  }

  it("Test comparing undefined number", function() {
    const c:Hashable<number> = new AllFieldHashable<number>();
    TestBoolean.true ("Testing two undefined", c.equals (undefined, undefined));
    TestBoolean.false ("Testing undefined to null", c.equals (undefined, null));
    TestBoolean.false ("Testing undefined to value", c.equals (undefined, 11111));
    TestBoolean.false ("Testing null to undefined", c.equals (null, undefined));
    TestBoolean.false ("Testing value to undefined", c.equals (11111, undefined));
  });

  it("Test comparing null number", function() {
    const c:Hashable<number> = new AllFieldHashable<number>();
    TestBoolean.true ("Testing two null", c.equals (null, null));
    TestBoolean.false ("Testing null to undefined", c.equals (null, undefined));
    TestBoolean.false ("Testing null to value", c.equals (null, 11111));
    TestBoolean.false ("Testing undefined to null", c.equals (undefined, null));
    TestBoolean.false ("Testing value to null", c.equals (11111, null));
  });

  it("Test comparing a valid number", function() {
    const c:Hashable<number> = new AllFieldHashable<number>();
    TestBoolean.true ("Testing two same valid numbers", c.equals (22222, 22222));
    TestBoolean.false ("Testing two different valid numbers", c.equals (11111, 22222));
    TestBoolean.false ("Testing value to undefined", c.equals (11111, undefined));
    TestBoolean.false ("Testing value to null", c.equals (11111, null));
    TestBoolean.false ("Testing undefined to value", c.equals (undefined, 11111));
    TestBoolean.false ("Testing null to value", c.equals (null, 11111));
  });


  it("Test comparing undefined string", function() {
    const c:Hashable<string> = new AllFieldHashable<string>();
    TestBoolean.true ("Testing two undefined", c.equals (undefined, undefined));
    TestBoolean.false ("Testing undefined to null", c.equals (undefined, null));
    TestBoolean.false ("Testing undefined to value", c.equals (undefined, "blah"));
    TestBoolean.false ("Testing null to undefined", c.equals (null, undefined));
    TestBoolean.false ("Testing value to undefined", c.equals ("blah", undefined));
  });

  it("Test comparing null string", function() {
    const c:Hashable<string> = new AllFieldHashable<string>();
    TestBoolean.true ("Testing two null", c.equals (null, null));
    TestBoolean.false ("Testing null to undefined", c.equals (null, undefined));
    TestBoolean.false ("Testing null to value", c.equals (null, "blah"));
    TestBoolean.false ("Testing undefined to null", c.equals (undefined, null));
    TestBoolean.false ("Testing value to null", c.equals ("blah", null));
  });

  it("Test comparing a valid string", function() {
    const c:Hashable<string> = new AllFieldHashable<string>();
    TestBoolean.true ("Testing two same valid strings", c.equals ("another", "another"));
    TestBoolean.false ("Testing two different valid strings", c.equals ("blah", "another"));
    TestBoolean.false ("Testing value to undefined", c.equals ("blah", undefined));
    TestBoolean.false ("Testing value to null", c.equals ("blah", null));
    TestBoolean.false ("Testing undefined to value", c.equals (undefined, "blah"));
    TestBoolean.false ("Testing null to value", c.equals (null, "blah"));
  });


  it("Test comparing undefined object", function() {
    const c:Hashable<SomeClass> = new AllFieldHashable<SomeClass>();
    TestBoolean.true ("Testing two undefined", c.equals (undefined, undefined));
    TestBoolean.false ("Testing undefined to null", c.equals (undefined, null));
    TestBoolean.false ("Testing undefined to value", c.equals (undefined, new SomeClass()));
    TestBoolean.false ("Testing null to undefined", c.equals (null, undefined));
    TestBoolean.false ("Testing value to undefined", c.equals (new SomeClass(), undefined));
  });

  it("Test comparing null object", function() {
    const c:Hashable<SomeClass> = new AllFieldHashable<SomeClass>();
    TestBoolean.true ("Testing two null", c.equals (null, null));
    TestBoolean.false ("Testing null to undefined", c.equals (null, undefined));
    TestBoolean.false ("Testing null to value", c.equals (null, new SomeClass()));
    TestBoolean.false ("Testing undefined to null", c.equals (undefined, null));
    TestBoolean.false ("Testing value to null", c.equals (new SomeClass(), null));
  });

  it("Test comparing a valid object", function() {
    const c:Hashable<SomeClass> = new AllFieldHashable<SomeClass>();
    TestBoolean.true ("Testing two same valid SomeClass", c.equals (new SomeClass(12345, "Another"), new SomeClass(12345, "Another")));
    TestBoolean.false ("Testing two different valid SomeClass", c.equals (new SomeClass(), new SomeClass(12345, "Another")));
    TestBoolean.false ("Testing value to undefined", c.equals (new SomeClass(), undefined));
    TestBoolean.false ("Testing value to null", c.equals (new SomeClass(), null));
    TestBoolean.false ("Testing undefined to value", c.equals (undefined, new SomeClass()));
    TestBoolean.false ("Testing null to value", c.equals (null, new SomeClass()));
  });

});
