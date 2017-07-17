/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

export class CString implements Collectable {
  str:string;
  constructor (istr:string) {
    this.str = istr;
  }

  equals (t:any) : boolean {
    if (this.str === t)
      return true;
    return false;
  }

  get () : string {
    return this.str;
  }
}
