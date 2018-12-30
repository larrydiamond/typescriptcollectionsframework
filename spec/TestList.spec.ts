/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptListsframework/LICENSE
 */

import {AllFieldCollectable} from "../src/AllFieldCollectable";
import {ArrayList} from "../src/ArrayList";
import {ImmutableList} from "../src/ImmutableList";
import {List} from "../src/List";
import {LinkedList} from "../src/LinkedList";
import {Test, TestBoolean, TestNumber, TestString} from 'jasts';

describe("Test Lists", function() {
  it("Test empty string Lists", function() {
    const al:ArrayList<string> = new ArrayList<string> ();
    const ll:LinkedList<string> = new LinkedList<string> ();
    const alc:ArrayList<string> = new ArrayList<string> (new AllFieldCollectable());
    const llc:LinkedList<string> = new LinkedList<string> (new AllFieldCollectable());

    testEmptyStringList(al);
    testEmptyStringList(ll);
    testEmptyStringList(alc);
    testEmptyStringList(llc);
  });

  it("Test empty number Lists", function() {
    const al:ArrayList<number> = new ArrayList<number> ();
    const ll:LinkedList<number> = new LinkedList<number> ();
    const alc:ArrayList<number> = new ArrayList<number> (new AllFieldCollectable());
    const llc:LinkedList<number> = new LinkedList<number> (new AllFieldCollectable());

    testEmptyNumberList(al);
    testEmptyNumberList(ll);
    testEmptyNumberList(alc);
    testEmptyNumberList(llc);
  });

  it ("Test JSON.stringify for numbers", function () {
    testStringifyNumbers (new ArrayList<number>());
    testStringifyNumbers (new LinkedList<number>());
    testStringifyNumbers (new ArrayList<number>(new AllFieldCollectable()));
    testStringifyNumbers (new LinkedList<number>(new AllFieldCollectable()));
  });

  it ("Test JSON.stringify for strings", function () {
    testStringifyStrings (new ArrayList<string>());
    testStringifyStrings (new LinkedList<string>());
    testStringifyStrings (new ArrayList<string>(new AllFieldCollectable()));
    testStringifyStrings (new LinkedList<string>(new AllFieldCollectable()));
  });
});

function testEmptyStringList (list:ImmutableList<string>) : void {
   expect (list.isEmpty ()).toEqual(true);
   expect (list.size ()).toEqual(0);
}

function testEmptyNumberList (list:ImmutableList<number>) : void {
  expect (list.isEmpty ()).toEqual(true);
  expect (list.size ()).toEqual(0);
}

function testStringifyNumbers (list:List<number>) : void {
  expect (list.add (100)).toEqual(true);
  expect (list.add (200)).toEqual(true);
  expect (list.add (300)).toEqual(true);
  expect (list.add (400)).toEqual(true);
  expect (list.add (500)).toEqual(true);
  expect (list.add (600)).toEqual(true);
  expect (list.add (700)).toEqual(true);
  expect (list.add (800)).toEqual(true);
  expect (list.add (900)).toEqual(true);
  expect (list.add (1000)).toEqual(true);

  const tmparray = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  
  TestString.equals ("Number list stringify", JSON.stringify (list), JSON.stringify(tmparray));
}

function testStringifyStrings (list:List<string>) : void {
  expect (list.add ("Cat")).toEqual(true);
  expect (list.add ("Dog")).toEqual(true);
  expect (list.add ("Bird")).toEqual(true);
  expect (list.add ("Fish")).toEqual(true);

  const tmparray = ["Cat", "Dog", "Bird", "Fish"]
  
  TestString.equals ("String list stringify", JSON.stringify (list), JSON.stringify(tmparray));
}

