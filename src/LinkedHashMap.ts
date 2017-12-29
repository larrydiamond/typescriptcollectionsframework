/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {HashMap, HashMapEntry} from "./HashMap";
import {JIterator} from "./JIterator";

export class LinkedHashMap<K, V> extends HashMap<K, V> {

    private header: LinkedEntry<K,V>;
    private accessOrder: boolean;

    /*
    * Constructs an empty insertion-ordered LinkedHashMap instance with the default 
    * initial capacity (20) and load factor (0.75).
    */
    constructor() {
        super();
        this.accessOrder = false;
        this.init();
    }

    public init():void {
        this.header = new LinkedEntry<K,V>(-1, null, null, null);
        // console.log("header init = " + JSON.stringify(this.header));
        this.header.before = this.header.after = this.header;
    }

    public containsValue(value: LinkedEntry<K,V>):boolean {
        if (value === null || value === undefined)
            return false;
        else {
            for (let e: LinkedEntry<K,V> = this.header.after; e !== this.header; e = e.after) 
                if (value.equals(e))
                    return true;
        }
        return false;
    }

    public get(key: K):V {
        let entry:LinkedEntry<K,V> = <LinkedEntry<K,V>>this.getEntry(key);
        if (entry === null)
          return null;
        entry.recordAccess(this);
        return entry.getValue();
    }

    /**
     * This override alters behavior of superclass put method. It causes newly allocated entry
     * to get inserted at the end of the linked list and removes the eldest entry if appropriate.
     * @param {number} hash value that represents the hash value of the key
     * @param {K} key key with which the specified value is to be associated
     * @param {V} value value to be associated with the specified key
     * @param {number} bucket index of the bucket in which the Entry should be
     */
    public addEntry(hash: number, key: K, value: V, bucket: number):void {
        // console.log("inside addEntry from LinkedHashMap");
        this.createEntry(hash, key, value, bucket);
        let eldest:LinkedEntry<K,V> = this.header.after;
        if (this.removeEldestEntry(eldest)) {
            this.removeEntryForKey(eldest.getKey());
        } else {
            // resize;
        }
    }

    private createEntry(hash:number, key:K, value:V, bucket?:number):void {
        let old:HashMapEntry<K,V> = this.getEntry(key);
        if (old === null || old === undefined) return null;
        let e:LinkedEntry<K,V> = new LinkedEntry<K,V>(hash,key,value,old);
        // console.log("--------------------------------");
        // console.log("e=" + JSON.stringify(e));
        e.addBefore(this.header);
        // console.log("h=" + hash + ",k=" + JSON.stringify(key) + ",v=" + JSON.stringify(value) + ",b=" + bucket);
        // console.log("old=" + JSON.stringify(old));
        // console.log("--------------------------------");
    }

    private removeEldestEntry(eldest:LinkedEntry<K,V>):boolean {
        return false;
    }
    private removeEntryForKey(key:K):LinkedEntry<K,V> {
        return null;
    }

    public clear():void {
        super.clear();
        this.header.before = this.header.after = this.header;
    }

    public getAccessOrder():boolean {
        return this.accessOrder;
    } 
    public getHeader():LinkedEntry<K,V> {
        return this.header;
    }

    public newKeyIterator():KeyIterator<K,V> {
        return new KeyIterator<K,V>(this);
    }
    public newValueIterator():JIterator<LinkedEntry<K,V>> {
        return new ValueIterator<K,V>(this);
    }
    public newEntryIterator():JIterator<LinkedEntry<K,V>> {
        return new EntryIterator<K,V>(this);
    }

}

export class LinkedEntry<K,V> extends HashMapEntry<K,V> {
    public before: LinkedEntry<K,V>;
    public after: LinkedEntry<K,V>;

    constructor(hash: number, key: K, value: V, next: HashMapEntry<K,V>) {
        super(key, value, hash, next);
    }

    private remove():void {
        this.before.after = this.after;
        this.after.before = this.before;
    }

    public addBefore(existingEntry: LinkedEntry<K,V>):void {
        // console.log("addBefore = " + JSON.stringify(existingEntry));
        this.after = existingEntry;
        this.before = existingEntry.before;
        this.before.after = this;
        this.after.before = this;
    }

    public recordAccess(m: HashMap<K,V>):void {
        let lm:LinkedHashMap<K,V> = <LinkedHashMap<K,V>>m;
        if (lm.getAccessOrder()) {
            this.remove();
            this.addBefore(lm.getHeader());
        }
    }

    public recordRemoval(m: HashMap<K,V>):void {
        this.remove();
    }

}

/* Java style iterator */
export class LinkedHashIterator<K,V> implements JIterator<LinkedEntry<K,V>> {
    private header:LinkedEntry<K,V>;
    private next_Entry:LinkedEntry<K,V>;
    private lastReturned:LinkedEntry<K,V>;

    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        this.header = linkedHashMap.getHeader();
        this.next_Entry = linkedHashMap.getHeader().after;
        this.lastReturned = null;
    }

    public next():LinkedEntry<K,V> {
       return this.nextEntry();
    }

    public hasNext():boolean {
        return this.next_Entry !== this.header;
    }

    private nextEntry():LinkedEntry<K,V> {
        if(this.check() === false)
          return null;
        let e:LinkedEntry<K,V> = this.lastReturned = this.next_Entry;
        this.next_Entry = e.after; 
        return e;
    }

    private check():boolean {
        if(this.next_Entry === this.header)
          return false;
        return true;
    }
}

export class EntryIterator<K,V> extends LinkedHashIterator<K,V> {
    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        super(linkedHashMap);
    }
    public _next():LinkedEntry<K,V> {
        return this.next();
    }
}

export class KeyIterator<K,V> extends LinkedHashIterator<K,V> {
    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        super(linkedHashMap);
    }
    public _next():K {
        return this.next().getKey();
    }
}

export class ValueIterator<K,V> extends LinkedHashIterator<K,V> {
    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        super(linkedHashMap);
    }
    public _next():V {
        return this.next().getValue();
    }
}