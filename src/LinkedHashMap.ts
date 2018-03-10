/**
* @license
* Copyright Francesco Giordano 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "./AllFieldHashable";
import {Hashable} from "./Hashable";
import {HashMap, HashMapEntry} from "./HashMap";
import {ImmutableMap} from "./ImmutableMap";
import {JIterator} from "./JIterator";
import {MapEntry} from "./MapEntry";

/**
 * Hash table and linked list implementation of the Map interface, with predictable iteration order. This implementation
 * differs from HashMap in that it maintains a doubly-linked list running through all of its entries. This linked list
 * defines the iteration ordering, which is normally the order in which keys were inserted into the map (insertion-order).
 * Note that insertion order is not affected if a key is re-inserted into the map.
 *
 * This class corresponds to java.util.LinkedHashMap
 */
export class LinkedHashMap<K, V> extends HashMap<K, V> {

    // The head of the doubly linked list.
    private header: LinkedEntry<K,V>;

    /*
    * Constructs an empty insertion-ordered LinkedHashMap instance with the default
    * initial capacity (20-from super class) and load factor (0.75).
    */
    constructor (iHash:Hashable<K> = AllFieldHashable.instance, private initialElementsLinked:ImmutableMap<K, V> = null, private iInitialCapacityLinked:number=20, private iLoadFactorLinked:number=0.75) {
        super(iHash, null, iInitialCapacityLinked, iLoadFactorLinked);
        this.initChain();
        this.initializeIncomingElements(initialElementsLinked);
    }

    /**
     * Initializes the chain before any entries are inserted into the map.
     */
    private initChain () : void {
        this.header = new LinkedEntry<K,V>(-1, null, null);
        // make circular
        this.header.before = this.header.after = this.header;
    }

    /**
     * Use Incoming elements from constructor and add to this LinkedHashMap
     * @param elements imcoming elements to populate
     */
    private initializeIncomingElements(elements:ImmutableMap<K, V>) : void {
        // makes new list unorder.. it uses set..
        if ((elements !== null) && (elements !== undefined)) {
            for (const iter = elements.entrySet().iterator(); iter.hasNext(); ) {
                const t:MapEntry<K,V> = iter.next ();
                this.put (t.getKey(), t.getValue());
            }
        }
    }
    
    /**
     * Returns true if this map maps one or more keys to the specified value.
     * @param value value whose presence in this map is to be tested
     */
    public containsValue (value: V) : boolean {
        if (value === null || value === undefined)
            return false;
        else {
            for (let e: LinkedEntry<K,V> = this.header.after; e !== this.header; e = e.after)
                if (value === e.getValue())
                    return true;
        }
        return false;
    }

    /**
     * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     * @param key key with which the specified value is to be associated
     */
    public get (key: K) : V {
        let entry:LinkedEntry<K,V> = <LinkedEntry<K,V>>this.getEntry(key);
        if ((entry === null) || (entry === undefined))
          return undefined;
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
    public addEntry (hash: number, key: K, value: V, bucket?: number) : void {
        this.createEntry(hash, key, value, bucket);
        let eldest:LinkedEntry<K,V> = this.header.after;
        if (this.removeEldestEntry(eldest)) {
            this.removeEntryForKey(eldest.getKey());
        } else {
            // resize;
        }
    }

    private createEntry (hash:number, key:K, value:V, bucket?:number) : void {
        let e:LinkedEntry<K,V> = new LinkedEntry<K,V>(hash,key,value);
        e.addBefore(this.header);
    }

    /**
     * Returns true if this map should remove its eldest entry. This method is invoked by put and
     * putAll after inserting a new entry into the map. It provides the implementor with the opportunity to remove the
     * eldest entry each time a new one is added. This is useful if the map represents a cache: it allows the map to reduce
     * memory consumption by deleting stale entries.
     * @param eldest eldest entry
     */
    private removeEldestEntry (eldest:LinkedEntry<K,V>) : boolean {
        return false;
    }
    private removeEntryForKey (key:K) : LinkedEntry<K,V> {
        return null;
    }

    public clear () : void {
        super.clear();
        this.header.before = this.header.after = this.header;
    }

    public getHeader () : LinkedEntry<K,V> {
        return this.header;
    }

    public newKeyIterator () : KeyIterator<K,V> {
        return new KeyIterator<K,V>(this);
    }
    public newValueIterator () : ValueIterator<K,V> {
        return new ValueIterator<K,V>(this);
    }
    public newEntryIterator () : EntryIterator<K,V> {
        return new EntryIterator<K,V>(this);
    }

}

/**
 * LinkedHashMap entry class
 */
export class LinkedEntry<K,V> extends HashMapEntry<K,V> {

    // These fields comprise the doubly linked list used for iteration.
    public before: LinkedEntry<K,V>;
    public after: LinkedEntry<K,V>;

    constructor (hash: number, key: K, value: V) {
        super(key, value, hash);
    }

    /**
     * Removes this entry from the linked list.
     */
    private remove () : void {
        this.before.after = this.after;
        this.after.before = this.before;
    }

    /**
     * Inserts this entry before the specified existing entry in the list.
     * @param existingEntry existing entry
     */
    public addBefore (existingEntry: LinkedEntry<K,V>) : void {
        this.after = existingEntry;
        this.before = existingEntry.before;
        this.before.after = this;
        this.after.before = this;
    }

    public recordRemoval (m: HashMap<K,V>) : void {
        this.remove();
    }

    public equals (o: any) {
      if (o === undefined || o === null) {
         return false;
      }
      if (JSON.stringify(o) === JSON.stringify(this.key))
        return true;
      return false;
    }
}

/* Java style iterator */
export class LinkedHashIterator<K,V> implements JIterator<LinkedEntry<K,V>> {
    private header:LinkedEntry<K,V>;
    private next_Entry:LinkedEntry<K,V>;
    private lastReturned:LinkedEntry<K,V>;

    constructor (linkedHashMap:LinkedHashMap<K, V>) {
        this.header = linkedHashMap.getHeader();
        this.next_Entry = linkedHashMap.getHeader().after;
        this.lastReturned = null;
    }

    public next () : LinkedEntry<K,V> {
       return this.nextEntry();
    }

    public hasNext () : boolean {
        return this.next_Entry !== this.header;
    }

    private nextEntry () : LinkedEntry<K,V> {
        if(this.check() === false)
          return null;
        let e:LinkedEntry<K,V> = this.lastReturned = this.next_Entry;
        this.next_Entry = e.after;
        return e;
    }

    private check () : boolean {
        if(this.next_Entry === this.header)
          return false;
        return true;
    }
}

// These Overrides alter the behavior of superclass view JIterator() methods
export class EntryIterator<K,V> extends LinkedHashIterator<K,V> {
    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        super(linkedHashMap);
    }
    public _next () : LinkedEntry<K,V> {
        return this.next();
    }
}

export class KeyIterator<K,V> extends LinkedHashIterator<K,V> {
    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        super(linkedHashMap);
    }
    public _next () : K {
        return this.next().getKey();
    }
}

export class ValueIterator<K,V> extends LinkedHashIterator<K,V> {
    constructor(linkedHashMap:LinkedHashMap<K, V>) {
        super(linkedHashMap);
    }
    public _next () : V {
        return this.next().getValue();
    }
}
