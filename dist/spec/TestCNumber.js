"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var CNumber_1 = require("../src/CNumber");
describe("Test CNumber", function () {
    it("Test Creation integer", function () {
        var c = new CNumber_1.CNumber(1);
        expect(c.get() === 1);
    });
    it("Test Creation non-integer", function () {
        var c = new CNumber_1.CNumber(1.5);
        expect(c.get() === 1.5);
    });
    it("Test Creation null", function () {
        var c = new CNumber_1.CNumber(null);
        expect(c.get() === null);
    });
    it("Test Creation undefined", function () {
        var c = new CNumber_1.CNumber(undefined);
        expect(c.get() === undefined);
    });
    it("Test equals integer", function () {
        var a = new CNumber_1.CNumber(1);
        var b = new CNumber_1.CNumber(1);
        expect(a.equals(b));
        expect(b.equals(a));
        expect(a.equals(a));
        expect(b.equals(b));
    });
});
