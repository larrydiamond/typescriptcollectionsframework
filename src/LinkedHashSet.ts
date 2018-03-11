/**
* @license
* Copyright Francesco Giordano 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "./AllFieldHashable";
import {Hashable} from "./Hashable";
import {ImmutableSet} from "./ImmutableSet";
import {HashSet} from "./HashSet";
import {LinkedHashMap, LinkedEntry, KeyIterator} from "./LinkedHashMap";

/**
 * Hash table and linked-list implementation of the Set interface with predictable iteration order. 
 * 
 * This class corresponds to java.util.LinkedHashSet
 */
export class LinkedHashSet<K> extends HashSet<K> {

    /*
    * Constructs an empty insertion-ordered LinkedHashSet instance with the default
    * initial capacity (20-from super class) and load factor (0.75).
    */
    constructor (iHash:Hashable<K> = AllFieldHashable.instance, private initElements:ImmutableSet<K> = null, private iInitialCapacityLinked:number=20, private iLoadFactorLinked:number=0.75) {
        super(iHash, initElements, iInitialCapacityLinked, iLoadFactorLinked, new LinkedHashMap<K,any>(iHash, null, iInitialCapacityLinked, iLoadFactorLinked));
    }

    public newKeyIterator () : KeyIterator<K,any> {
        let map:LinkedHashMap<K,any> = <LinkedHashMap<K,any>> this.getDataStore();
        return map.newKeyIterator();
    }

}
