"use strict";
/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
Object.defineProperty(exports, "__esModule", { value: true });
var CString_1 = require("../src/CString");
describe("Test CString", function () {
    it("Test Creation string", function () {
        var c = new CString_1.CString("test");
        expect(c.get() === "test");
    });
    it("Test Creation empty", function () {
        var c = new CString_1.CString("");
        expect(c.get() === "");
    });
    it("Test Creation null", function () {
        var c = new CString_1.CString(null);
        expect(c.get() === null);
    });
    it("Test Creation undefined", function () {
        var c = new CString_1.CString(undefined);
        expect(c.get() === undefined);
    });
    it("Test equals string", function () {
        var a = new CString_1.CString("test");
        var b = new CString_1.CString("test");
        expect(a.equals(b));
        expect(b.equals(a));
        expect(a.equals(a));
        expect(b.equals(b));
    });
});
