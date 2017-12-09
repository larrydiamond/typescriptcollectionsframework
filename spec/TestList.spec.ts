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
});

function testEmptyStringList (list:ImmutableList<string>) : void {
   expect (list.isEmpty ()).toEqual(true);
   expect (list.size ()).toEqual(0);
}

function testEmptyNumberList (list:ImmutableList<number>) : void {
  expect (list.isEmpty ()).toEqual(true);
  expect (list.size ()).toEqual(0);
}
