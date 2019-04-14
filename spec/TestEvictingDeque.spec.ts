/**
* @license
* Copyright Larry Diamond 2019 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {Deque} from "../src/Deque";
import {EvictingDeque} from "../src/EvictingDeque";

describe("Test EvictingDeque functionality", function() {
    it("Test add of full deque evicts an element", function() {
        const evicting : Deque<string> =  new EvictingDeque<string> (1);
        expect (evicting.isEmpty ()).toEqual(true);
        expect (evicting.size ()).toEqual(0);
        expect (evicting.add ("first")).toEqual(true);
        expect (evicting.size ()).toEqual(1);
        expect (evicting.contains("first")).toEqual(true);
        expect (evicting.contains("second")).toEqual(false);
        expect (evicting.add ("second")).toEqual(true);
        expect (evicting.size ()).toEqual(1);
        expect (evicting.contains("first")).toEqual(false);
        expect (evicting.contains("second")).toEqual(true);
    });




});
