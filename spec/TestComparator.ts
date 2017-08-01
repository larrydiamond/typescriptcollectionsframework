/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {CollectionUtils} from "../src/CollectionUtils";
import {Comparator} from "../src/Comparator";

describe("Test Comparator", function() {

  it ("get the string comparator", function () {
    let x:Comparator<string> = CollectionUtils.getStringComparator();
    expect (x.compare ("x", "X") === 0);
  });

});
