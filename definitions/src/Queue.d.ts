/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { Collection } from "./Collection";
export interface Queue<K> extends Collection<K> {
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions, returning true upon success
    * and returning false if no space is currently available or if the implementation does not permit duplicates and already contains the specified element
    */
    add(k: K): boolean;
    /**
    * Inserts the specified element into this queue if it is possible to do so immediately without violating capacity restrictions.
    */
    offer(k: K): boolean;
    poll(): K;
    removeQueue(): K;
    peek(): K;
    element(): K;
}
