/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

export class ArrayList<T extends Collectable> implements List<T> {
  elements:T[] = null;
  sizeValue:number = 0;

  add (t:T) : boolean {
    if (this.elements == null) {
      this.elements = new Array<T>();
    }
    this.elements.push (t);
    this.sizeValue = this.sizeValue + 1;
    return true;
  }

  clear () {
    this.elements = new Array<T>();
    this.sizeValue = 0;
  }

  get(index:number):T {
    return this.elements [index];
  }

  indexOf (t:T) : number {
    if (this.elements == null)
      return -1;
    if (this.sizeValue <= 0)
      return -1;

    for (let loop:number = 0; loop < this.sizeValue; loop++) {
      let e = this.get (loop);
      if (e.equals (t))
        return loop;
    }

    return -1;
  }

  isEmpty () : boolean {
    if (this.sizeValue == 0)
      return true;

    return false;
  }

  set(index:number, element:T):T {
    let tmp:T = this.elements [index];
    this.elements [index] = element;
    return tmp;
  }

  size () : number {
    return this.sizeValue;
  }

}
