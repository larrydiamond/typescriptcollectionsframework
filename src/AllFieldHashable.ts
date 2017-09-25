/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

 import {Hashable} from "./Hashable";

 export class AllFieldHashable<T> implements Hashable<T> {
   equals (o1: T, o2: T) : boolean {
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
   };
   hashCode (o:T) : number {
     if (o === undefined) {
       return 0;
     }
     if (o === null) {
       return 0;
     }
     let tmp:string = JSON.stringify (o);
     let hash: number = 0;
     for (let loop = 0; loop < tmp.length; loop++) {
       let n:number = tmp.charCodeAt (loop);
       hash = ((hash * 256) + n) % 1000000000;
     }
     return hash;
   };
 }
