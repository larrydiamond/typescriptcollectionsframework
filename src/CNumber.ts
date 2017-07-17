/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

export class CNumber implements Collectable {
  num:number;
  constructor (inum:number) {
    this.num = inum;
  }

  equals (t:any) : boolean {
    if (this.num === t)
      return true;
    return false;
  }

  get () : number {
    return this.num;
  }
}
