/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {CString} from "../src/CString";

describe("Test CString", function() {

  it("Test Creation string", function() {
    let c:CString = new CString("test");
    expect (c.get() === "test");
  });

  it("Test Creation empty", function() {
    let c:CString = new CString("");
    expect (c.get() === "");
  });

  it("Test Creation null", function() {
    let c:CString = new CString(null);
    expect (c.get() === null);
  });

  it("Test Creation undefined", function() {
    let c:CString = new CString(undefined);
    expect (c.get() === undefined);
  });

  it("Test equals string", function () {
    let a:CString = new CString("test");
    let b:CString = new CString("test");
    expect (a.equals (b));
    expect (b.equals (a));
    expect (a.equals (a));
    expect (b.equals (b));
  })

});
