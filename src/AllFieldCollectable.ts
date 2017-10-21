/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

 import {Collectable} from "./Collectable";

 export class AllFieldCollectable<T> implements Collectable<T> {
   public equals (o1: T, o2: T) {
     if (o1 === undefined) {
       if (o2 === undefined) {
         return true;
       } else {
         return false;
       }
     }
     if (o1 === null) {
       if (o2 === null) {
         return true;
       } else {
         return false;
       }
     }
     if ((o2 === null) || (o2 === undefined)) {
       return false;
     }

     if (JSON.stringify(o1) === JSON.stringify(o2))
     return true;
     return false;
   }
 }
