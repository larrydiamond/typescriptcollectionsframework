/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {CNumber} from "../src/CNumber";

describe("Test CNumber", function() {

  it("Test Creation integer", function() {
    let c:CNumber = new CNumber(1);
    expect (c.get() === 1);
  });

  it("Test Creation non-integer", function() {
    let c:CNumber = new CNumber(1.5);
    expect (c.get() === 1.5);
  });

  it("Test Creation null", function() {
    let c:CNumber = new CNumber(null);
    expect (c.get() === null);
  });

  it("Test Creation undefined", function() {
    let c:CNumber = new CNumber(undefined);
    expect (c.get() === undefined);
  });

});
