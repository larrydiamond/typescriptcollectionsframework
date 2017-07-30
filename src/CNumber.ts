/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {Hashable} from "./Hashable";

export class CNumber implements Hashable {
  num:number;
  constructor (inum:number) {
    this.num = inum;
  }

  equals (t:any) : boolean {
    if (this.num === undefined)
      if (t === undefined)
        return true;

    if (this.num === null)
      if (t === null)
        return true;

    if (this.num === t)
      return true;
    return false;
  }

  get () : number {
    return this.num;
  }

  hashCode () : number {
    if (this.num === undefined)
      return 1;
    if (this.num === null)
      return 1;
    let tmp:number = Math.abs (this.num);
    return Math.ceil (tmp);
  }
}
