/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

 import {Collectable} from "./Collectable";
 import {Queue} from "./Queue";

 export interface PriorityQueue<K> extends Queue<K> {
   // A very talented volunteer stepped up to write PriorityQueue.   Im preparing some files for him.   Thank you very much!

   // Hi Frank I just made this temporarily an interface instead of a class so that the library would compile.
   // When you begin you'll need to change this back to export class PriorityQueue<K extends Collectable> implements Queue<K> {
   // Thank you very much!
 }
