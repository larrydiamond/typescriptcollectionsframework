/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {NaiveMap} from "../src/NaiveMap";
import {Comparator} from "../src/Comparator";
import {Collectable} from "../src/Collectable";

 describe("Test NaiveMap functionality", function() {

   // PetStoreProduct will be used in testing
   class PetStoreProduct implements Collectable {
     public productName:string;
     public price:number;

     constructor (iName:string, iPrice:number) {
       this.productName = iName;
       this.price = iPrice;
     }

     equals (t:any) : boolean {
       if (JSON.stringify(this) === JSON.stringify(t))
         return true;
       return false;
     };
   };



 });
