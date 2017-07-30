/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {Hashable} from "./Hashable";

export class CString implements Hashable {
  str:string;
  constructor (istr:string) {
    this.str = istr;
  }

  equals (t:any) : boolean {
    if (this.str === undefined)
      if (t === undefined)
        return true;

    if (this.str === null)
      if (t === null)
        return true;

    if (this.str === t)
      return true;
    return false;
  }

  get () : string {
    return this.str;
  }

  hashCode () : number {
    if (this.str === undefined)
      return 1;
    if (this.str === null)
      return 1;

    let hash:number = 0;

    for (let loop:number = 0; loop < this.str.length; loop++) {
      let tmp = this.str.charCodeAt(loop);
      hash = hash + (tmp * loop);
    }

    return hash;
  }
}
