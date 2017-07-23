/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

export class BasicIteratorResult<T> implements IteratorResult<T> {
    done:boolean;
    value:T;

    constructor(iDone:boolean, iValue:T) {
      this.done = iDone;
      this.value = iValue;
    }
}
