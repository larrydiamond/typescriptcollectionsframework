/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {AllFieldCollectable} from "../src/AllFieldCollectable";
import {AllFieldHashable} from "../src/AllFieldHashable";
import {ArrayList} from "../src/ArrayList";
import {Collectable} from "../src/Collectable";
import {Collection} from "../src/Collection";
import {Comparator} from "../src/Comparator";
import {CompositeCollection} from "../src/CompositeCollection";
import {Consumer} from "../src/Consumer";
import {ImmutableCollection} from "../src/ImmutableCollection";
import {JIterator} from "../src/JIterator";
import {LinkedList} from "../src/LinkedList";

 // PetStoreProduct will be used in testing
 class PetStoreProduct {
   private productName:string;
   private price:number;

   public constructor (iName:string, iPrice:number) {
     this.productName = iName;
     this.price = iPrice;
   }

   public getProductName ():string {
     return this.productName;
   }

   public getPrice():number {
     return this.price;
   }
 }

 const product1:PetStoreProduct = new PetStoreProduct("Catnip", 4.99);
 const product2:PetStoreProduct = new PetStoreProduct("CatFood", 6.99);
 const product3:PetStoreProduct = new PetStoreProduct("ChewToy", 14.99);
 const product4:PetStoreProduct = new PetStoreProduct("DogFood", 7.99);
 const product5:PetStoreProduct = new PetStoreProduct("FishTank", 19.99);
 const product6:PetStoreProduct = new PetStoreProduct("Goldfish", 9.99);
 const product7:PetStoreProduct = new PetStoreProduct("Leash", 5.99);
 const productNotAvailable:PetStoreProduct = new PetStoreProduct("Bananas", 0.00); // we have no bananas today

 describe("Test Composite Collection functionality", function() {
   it("Test Creation state with nothing in it", function() {
     let cc:CompositeCollection<PetStoreProduct> = new CompositeCollection<PetStoreProduct>(null);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(undefined);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(null, null);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(null, undefined);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(undefined, null);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(undefined, undefined);
     testEmptyPSP(cc);
   });

   it("Test creating composites built up of empty collections", function() {
     let cc:CompositeCollection<PetStoreProduct> = new CompositeCollection<PetStoreProduct>(new ArrayList<PetStoreProduct>());
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(new ArrayList<PetStoreProduct>(), null);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(new ArrayList<PetStoreProduct>(), null, new LinkedList<PetStoreProduct>());
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(undefined, new ArrayList<PetStoreProduct>(), null);
     testEmptyPSP(cc);
     cc = new CompositeCollection<PetStoreProduct>(undefined, new ArrayList<PetStoreProduct>(), null, new LinkedList<PetStoreProduct>());
     testEmptyPSP(cc);
   });

   it("Test single collection", function() {
     const underlying = new ArrayList<PetStoreProduct>();
     underlying.add (product1);
     underlying.add (product2);
     underlying.add (product3);
     underlying.add (product4);
     underlying.add (product5);
     underlying.add (product6);
     underlying.add (product7);

     const cc = new CompositeCollection<PetStoreProduct>(underlying);
     expect (cc.isEmpty ()).toEqual(false);
     expect (cc.size ()).toEqual(7);

     expect (cc.contains(product1)).toEqual (true);
     expect (cc.contains(productNotAvailable)).toEqual (false);

     let product:number = 1;
     for (const iter = cc.iterator(); iter.hasNext(); ) {
       const psp = iter.next();
       switch (product) {
         case 1:
          expect (psp.getProductName()).toEqual (product1.getProductName());
         break;
         case 2:
          expect (psp.getProductName()).toEqual (product2.getProductName());
         break;
         case 3:
          expect (psp.getProductName()).toEqual (product3.getProductName());
         break;
         case 4:
          expect (psp.getProductName()).toEqual (product4.getProductName());
         break;
         case 5:
          expect (psp.getProductName()).toEqual (product5.getProductName());
         break;
         case 6:
          expect (psp.getProductName()).toEqual (product6.getProductName());
         break;
         case 7:
          expect (psp.getProductName()).toEqual (product7.getProductName());
         break;
         default:
          fail ("iterator at invalid offset");
        break;
       }
       product = product + 1.0;
     }

     const i2:Iterator<PetStoreProduct> = cc[Symbol.iterator]();
     let ir2:IteratorResult<PetStoreProduct> = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product1.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product2.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product3.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product4.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product5.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product6.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product7.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(true);
   });

   it("Test two collections", function() {
     const c1 = new ArrayList<PetStoreProduct>();
     const c2 = new ArrayList<PetStoreProduct>();
     c1.add (product1);
     c2.add (product2);
     c1.add (product3);
     c2.add (product4);
     c1.add (product5);
     c2.add (product6);

     const cc = new CompositeCollection<PetStoreProduct>(c1, c2);
     expect (cc.isEmpty ()).toEqual(false);
     expect (cc.size ()).toEqual(6);

     let product:number = 1;
     for (const iter = cc.iterator(); iter.hasNext(); ) {
       const psp = iter.next();
       switch (product) {
         case 1:
          expect (psp.getProductName()).toEqual (product1.getProductName());
         break;
         case 2:
          expect (psp.getProductName()).toEqual (product3.getProductName());
         break;
         case 3:
          expect (psp.getProductName()).toEqual (product5.getProductName());
         break;
         case 4:
          expect (psp.getProductName()).toEqual (product2.getProductName());
         break;
         case 5:
          expect (psp.getProductName()).toEqual (product4.getProductName());
         break;
         case 6:
          expect (psp.getProductName()).toEqual (product6.getProductName());
         break;
         default:
          fail ("iterator at invalid offset");
        break;
       }
       product = product + 1.0;
     }

     const i2:Iterator<PetStoreProduct> = cc[Symbol.iterator]();
     let ir2:IteratorResult<PetStoreProduct> = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product1.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product3.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product5.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product2.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product4.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product6.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(true);
   });

   it("Test adding empty collections", function() {
     const underlying = new ArrayList<PetStoreProduct>();
     underlying.add (product1);
     underlying.add (product2);
     underlying.add (product3);
     underlying.add (product4);
     underlying.add (product5);
     underlying.add (product6);
     underlying.add (product7);

     const cc = new CompositeCollection<PetStoreProduct>(new ArrayList<PetStoreProduct>(), underlying, null, undefined, new ArrayList<PetStoreProduct>());
     expect (cc.isEmpty ()).toEqual(false);
     expect (cc.size ()).toEqual(7);

     let product:number = 1;
     for (const iter = cc.iterator(); iter.hasNext(); ) {
       const psp = iter.next();
       switch (product) {
         case 1:
          expect (psp.getProductName()).toEqual (product1.getProductName());
         break;
         case 2:
          expect (psp.getProductName()).toEqual (product2.getProductName());
         break;
         case 3:
          expect (psp.getProductName()).toEqual (product3.getProductName());
         break;
         case 4:
          expect (psp.getProductName()).toEqual (product4.getProductName());
         break;
         case 5:
          expect (psp.getProductName()).toEqual (product5.getProductName());
         break;
         case 6:
          expect (psp.getProductName()).toEqual (product6.getProductName());
         break;
         case 7:
          expect (psp.getProductName()).toEqual (product7.getProductName());
         break;
         default:
          fail ("iterator at invalid offset");
        break;
       }
       product = product + 1.0;
     }

     const i2:Iterator<PetStoreProduct> = cc[Symbol.iterator]();
     let ir2:IteratorResult<PetStoreProduct> = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product1.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product2.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product3.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product4.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product5.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product6.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(false);
     expect (ir2.value.getProductName()).toEqual (product7.getProductName());

     ir2 = i2.next();
     expect (ir2.done).toEqual(true);
   });




 });



 const failEmptyConsumerPSP:Consumer<PetStoreProduct> = {
   accept(element:PetStoreProduct) {
     fail ('Unwanted code branch in failEmptyConsumerPSP');
     throw new Error('Unwanted code branch in failEmptyConsumerPSP');
   }
 }

 function testEmptyPSP (c:CompositeCollection<PetStoreProduct>) : void {
   expect (c.isEmpty ()).toEqual(true);
   expect (c.size ()).toEqual(0);
   c.forEach(failEmptyConsumerPSP);
   for (const iter = c.iterator(); iter.hasNext(); ) {
     fail ("Should not iterate on empty composite collection");
   }
   const i:Iterator<PetStoreProduct> = c[Symbol.iterator]();
   const ir:IteratorResult<PetStoreProduct> = i.next();
   expect (ir.done).toEqual(true);

   expect (c.contains(product1)).toEqual (false);
   expect (c.contains(productNotAvailable)).toEqual (false);

   const collection:ImmutableCollection<PetStoreProduct> = c;
   expect (collection.isEmpty ()).toEqual(true);
   expect (collection.size ()).toEqual(0);
   collection.forEach(failEmptyConsumerPSP);
   for (const iter = c.iterator(); iter.hasNext(); ) {
     fail ("Should not iterate on empty collection");
   }
   const i2:Iterator<PetStoreProduct> = collection[Symbol.iterator]();
   const ir2:IteratorResult<PetStoreProduct> = i2.next();
   expect (ir2.done).toEqual(true);

   expect (collection.contains(product1)).toEqual (false);
   expect (collection.contains(productNotAvailable)).toEqual (false);
 }
