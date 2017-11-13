/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {Collections} from "../src/Collections";
import {Comparator} from "../src/Comparator";
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
    TestNumber.equals ("Comparing undefined vs null returns -1", comp.compare (undefined, null), -1);
    TestNumber.equals ("Comparing undefined vs something returns -1", comp.compare (undefined, "something"), -1);

    TestNumber.equals ("Comparing null vs undefined returns 1", comp.compare (null, undefined), 1);
    TestNumber.equals ("Comparing something vs undefined returns 1", comp.compare ("something", undefined), 1);
  });

});
