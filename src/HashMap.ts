/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import {AllFieldHashable} from "./AllFieldHashable";
import {ArrayList} from "./ArrayList";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {BasicMapEntry} from "./BasicMapEntry";
import {Collectable} from "./Collectable";
import {Consumer} from "./Consumer";
import {Hashable} from "./Hashable";
import {ImmutableMap} from "./ImmutableMap";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";
import {JMap} from "./JMap";
import {LinkedList} from "./LinkedList";
import {List} from "./List";
import {MapEntry} from "./MapEntry";

/**
 * Hash table based implementation of the Map interface.  This implementation permits null values and the null key.<br>
 * This class makes no guarantees as to the order of the map; in particular, it does not guarantee that the order will remain constant over time.<br>
 * This implementation provides constant-time performance for the basic operations (get and put), assuming the hash function disperses the elements properly among the buckets.<br>
 * Iteration over collection views requires time proportional to the "capacity" of the HashMap instance (the number of buckets) plus its size (the number of key-value mappings).
 *
 * An instance of HashMap has two parameters that affect its performance: initial capacity and load factor.<br>
 * The capacity is the number of buckets in the hash table, and the initial capacity is simply the capacity at the time the hash table is created.<br>
 * The load factor is a measure of how full the hash table is allowed to get before its capacity is automatically increased.<br>
 * When the number of entries in the hash table exceeds the product of the load factor and the current capacity, the hash table is rehashed (that is, internal data structures are rebuilt) so that the hash table has approximately twice the number of buckets.
 *
 * As a general rule, the default load factor (.75) offers a good tradeoff between time and space costs.<br>
 * Higher values decrease the space overhead but increase the lookup cost (reflected in most of the operations of the HashMap class, including get and put).<br>
 * The expected number of entries in the map and its load factor should be taken into account when setting its initial capacity, so as to minimize the number of rehash operations.<br>
 * If the initial capacity is greater than the maximum number of entries divided by the load factor, no rehash operations will ever occur.
 *
 * If many mappings are to be stored in a HashMap instance, creating it with a sufficiently large capacity will allow the mappings to be stored more efficiently than letting it perform automatic rehashing as needed to grow the table.<br>
 * Note that using many keys with the same hashCode() is a sure way to slow down performance of any hash table.
 *
 * This class corresponds to java.util.HashMap
 */

export class HashMap<K,V> implements JMap<K,V> {
  private data:ArrayList<List<HashMapEntry<K,V>>> = null;
  private elementCount:number = 0;
  private loadFactor:number = 0.75;
  private hashMethods:Hashable<K>;
  private MapEntryHashMethods:Hashable<HashMapEntry<K, V>>;
  private ListMapEntryMethods:Collectable<List<HashMapEntry<K, V>>>;

  public constructor (iHash:Hashable<K> = AllFieldHashable.instance, private initialElements:ImmutableMap<K, V> = null, private iInitialCapacity:number=20, private iLoadFactor:number=0.75) {
    this.hashMethods = iHash;
    this.MapEntryHashMethods = this.getHashMapEntryHashable(this.hashMethods);
    this.ListMapEntryMethods = this.getListHashMapEntryHashable(this.hashMethods);

    this.data = new ArrayList<List<HashMapEntry<K,V>>>(this.ListMapEntryMethods);
    for (let loop:number = 0; loop < iInitialCapacity; loop++) {
      this.data.add (new LinkedList<HashMapEntry<K,V>>(this.MapEntryHashMethods));
    }
    this.loadFactor = iLoadFactor;
    if ((initialElements !== null) && (initialElements !== undefined)) {
      for (const iter = initialElements.entrySet().iterator(); iter.hasNext(); ) {
        const t:MapEntry<K,V> = iter.next ();
        this.put (t.getKey(), t.getValue());
      }
    }
  }

  /**
  * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {V} the previous value associated with key, or undefined if there was no mapping for key. (An undefined return can also indicate that the map previously associated undefined with key.)
  */
  public put (key:K, value:V) : V {

    const mapEntry:HashMapEntry<K,V> = this.getMapEntry(key);
    if ((mapEntry === null) || (mapEntry === undefined)) {
      const hashCode:number = this.hashMethods.hashCode(key);
      const newNode:HashMapEntry<K,V> = new HashMapEntry<K,V> (key, value);
      newNode.setHashCode(hashCode);
      if (this.data.size() === 0) {
        const newList:List<HashMapEntry<K,V>> = new ArrayList<HashMapEntry<K,V>>(this.MapEntryHashMethods);
        this.data.add (newList);
        newList.add (newNode);
        this.elementCount = this.elementCount + 1;
        this.addEntry(hashCode, key, value);
      } else {
        const bucket = hashCode % this.data.size();
        const thisList:List<HashMapEntry<K,V>> = this.data.get (bucket);
        thisList.add (newNode);
        this.elementCount = this.elementCount + 1;
        this.addEntry(hashCode, key, value);
      }
      this.rehash();
      return undefined;
    } else {
      const tmp:V = mapEntry.getValue();
      mapEntry.setValue(value);
      return tmp;
    }
  }

  /**
   *
   * This is a placeholder that does nothing for HashMap object but needed to work with
   * LinkedHashMap's addEntry method which it overrides from here to fully provide the linked functionality.
   * @param {number} hash value that represents the hash value of the key
   * @param {K} key key with which the specified value is to be associated
   * @param {V} value value to be associated with the specified key
   * @param {number} bucket index of the bucket in which the Entry should be
   */
  protected addEntry(hash: number, key: K, value: V, bucket?: number): void {
    ; // added to remove tslint error
  }

 /**
  * Rehashes the entire hashmap.... gonna be slow you've been warned
  */
  private rehash() : void {
    if (this.elementCount > (this.data.size() * this.loadFactor)) { // Not enough buckets
      // How many buckets should there be?   Lets go with doubling the number of buckets

      const newBucketCount = (this.data.size() * 2) + 1;
      const newdata:ArrayList<List<HashMapEntry<K,V>>> = new ArrayList<List<HashMapEntry<K,V>>>(this.ListMapEntryMethods);
      for (let loop:number = 0; loop < newBucketCount; loop++) {
        newdata.add (new LinkedList<HashMapEntry<K,V>>(this.MapEntryHashMethods));
      }

      // Iterate through the nodes and add them all into newdata
      for (const bucketIter:JIterator<List<HashMapEntry<K,V>>> = this.data.iterator(); bucketIter.hasNext(); ) {
        const bucket:List<HashMapEntry<K,V>> = bucketIter.next();
        for (const entryIter:JIterator<HashMapEntry<K,V>> = bucket.iterator(); entryIter.hasNext(); ) {
          const entry:HashMapEntry<K,V> = entryIter.next();
          const hashCode:number = entry.getHashCode();
          const hashBucket:number = hashCode % newBucketCount;
          newdata.get (hashBucket).add (entry);
        }
      }
      this.data = newdata;
    }
  }

 /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  public isEmpty () : boolean {
    if (this.elementCount < 1) return true;
    return false;
  }

 /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    return this.elementCount;
  }

  /**
  * Returns the value to which the specified key is mapped, or undefined if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or undefined if this map contains no mapping for the key
  */
  public get (key:K) : V {
    const tmp:HashMapEntry<K,V> = this.getMapEntry(key);
    if ((tmp === null) || (tmp === undefined)) return undefined;
    return tmp.getValue();
  }

 /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public remove (key:K) : V {
    if ((this.data === null) || (this.data === undefined)) return null;
    if (this.data.size () < 1) return null;
    const hashCode:number = this.hashMethods.hashCode (key);
    let numBuckets = this.data.size();
    if (numBuckets < 1) numBuckets = 1;
    const bucket = hashCode % numBuckets;
    const thisList:List<HashMapEntry<K,V>> = this.data.get (bucket);
    for (let loop:number = 0; loop < thisList.size(); loop++) {
      if (this.hashMethods.equals (key, thisList.get(loop).getKey())) {
        this.elementCount = this.elementCount - 1;
        return thisList.removeIndex (loop).getValue();
      }
    }
    return null;
  }

 /**
  * Returns true if this map contains a mapping for the specified key.
  * @param {K} key The key whose presence in this map is to be tested
  * @return {V} true if this map contains a mapping for the specified key.
  */
  public containsKey (key:K) : boolean {
    const tmp:HashMapEntry<K,V> = this.getMapEntry(key);
    if ((tmp === null) || (tmp === undefined)) return false;
    return true;
  }

  public getEntry (key:K) : HashMapEntry<K,V> {
    return this.getMapEntry(key);
  }

  private getMapEntry (key:K) : HashMapEntry<K,V> {
    if ((this.data === null) || (this.data === undefined)) return undefined;
    if (this.data.size () < 1) return undefined;
    const hashCode:number = this.hashMethods.hashCode (key);
    let numBuckets = this.data.size();
    if (numBuckets < 1) numBuckets = 1;
    const bucket = hashCode % numBuckets;
    const thisList:List<HashMapEntry<K,V>> = this.data.get (bucket);
    for (let loop:number = 0; loop < thisList.size(); loop++) {
      if (this.hashMethods.equals (key, thisList.get(loop).getKey())) {
        return thisList.get(loop);
      }
    }
    return undefined;
  }

 /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.data.clear();
    this.data = new ArrayList<List<HashMapEntry<K,V>>>(this.ListMapEntryMethods);
    this.elementCount = 0;
  }

 /**
  * Returns an ImmutableSet view of the keys contained in this map.
  * The set's iterator returns the keys in ascending order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public keySet () : ImmutableSet<K> {
    return new ImmutableKeySetForHashMap (this);
  }

 /**
  * Returns an ImmutableSet view of the mappings contained in this map.
  * The set's iterator returns the mappings in random key order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * The contains method on this entrySet will only compare keys not values.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public entrySet () : ImmutableSet<MapEntry<K,V>> {
    return new ImmutableEntrySetForHashMap(this);
  }

  /**
  * Returns an ImmutableMap backed by Map
  */
  public immutableMap () : ImmutableMap<K,V> {
    return this;
  }

  /**
   * Returns an iterator over the entire entry set
   * @return {Iterator<K>} an iterator for the entry set
   */
  public [Symbol.iterator] ():Iterator<K> {
    return this.entrySet[Symbol.iterator]();
  }

 /**
  * This method is deprecated and will be removed in a future revision.
  * @deprecated
  */
  public deprecatedGetFirstEntryForIterator ():HashMapIteratorLocationTracker<K,V> {
    if (this.data === null) return null;
    if (this.data === undefined) return null;

    for (let offset:number = 0; offset < this.data.size(); offset++) {
      const tmpbucket:List<HashMapEntry<K,V>> = this.data.get (offset);
      if ((tmpbucket !== null) && (tmpbucket !== undefined)){
        if (tmpbucket.size() > 0) {
          const tmpentry:HashMapEntry<K,V> = tmpbucket.get (0);
          if (tmpentry !== null) {
            const tmp:HashMapIteratorLocationTracker<K,V> = new HashMapIteratorLocationTracker<K,V>();
            tmp.bucket = offset;
            tmp.offset = 0;
            tmp.entry = tmpentry;
            return tmp;
          }
        }
      }
    }

    return null;
  }

 /**
  * This method is deprecated and will be removed in a future revision.
  * @deprecated
  */
  public deprecatedGetNextEntryForIterator (current:HashMapIteratorLocationTracker<K,V>):HashMapIteratorLocationTracker<K,V> {
    if (this.data === null) return null;
    if (this.data === undefined) return null;

    // did the hashmap shrink?
    if (current.bucket > this.data.size()) return null;

    // get the next node in the current bucket if possible
    const tmpbucket:List<HashMapEntry<K,V>> = this.data.get (current.bucket);
    if (tmpbucket.size() > (current.offset + 1)) {
      const tmp:HashMapIteratorLocationTracker<K,V> = new HashMapIteratorLocationTracker<K,V>();
      tmp.bucket = current.bucket;
      tmp.offset = current.offset + 1;
      tmp.entry = tmpbucket.get (tmp.offset);
      return tmp;
    }

    // get the first node you can find in the next populated bucket if any exists
    let bucket:number = current.bucket + 1;
    while (bucket < this.data.size()) {
      const tmpb:List<HashMapEntry<K,V>> = this.data.get (bucket);
      if ((tmpb !== null) && (tmpb !== undefined)){
        const tmpentry:HashMapEntry<K,V> = tmpb.get (0);
        if (tmpentry !== null) {
          const tmp:HashMapIteratorLocationTracker<K,V> = new HashMapIteratorLocationTracker<K,V>();
          tmp.bucket = bucket;
          tmp.offset = 0;
          tmp.entry = tmpentry;
          return tmp;
        }
      }
      bucket = bucket + 1;
    }
    return null;
  }

  private getHashMapEntryHashable(iHash:Hashable<K>) : Hashable<HashMapEntry<K, V>> {
    const thisHash:Hashable<HashMapEntry<K,V>> = {
      hashCode (o:HashMapEntry<K,V>) : number {
        return iHash.hashCode (o.getKey());
      },
      equals (o1:HashMapEntry<K,V>, o2:HashMapEntry<K,V>) : boolean {
        return iHash.equals (o1.getKey(), o2.getKey());
      }
    };
    return thisHash;
  }

  private getListHashMapEntryHashable(iHash:Hashable<K>) : Collectable<List<HashMapEntry<K, V>>> {
    const thisHash:Collectable<List<HashMapEntry<K,V>>> = {
      equals (o1:List<HashMapEntry<K,V>>, o2:List<HashMapEntry<K,V>>) : boolean {
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

        if (o1.size() !== o2.size()) {
          return false;
        }

        for (let loop:number = 0; loop < this.size(); loop++) {
          const thisentry:HashMapEntry<K,V> = o1.get (loop);
          const thatentry:HashMapEntry<K,V> = o2.get (loop);
          if (this.equality.equals (thisentry, thatentry)) {
            // keep going
          } else {
            return false;
          }
        }

        return true;
      }
    };
    return thisHash;
  }
}

export class HashMapIteratorLocationTracker<K,V> {
  public bucket:number;
  public offset:number;
  public entry:HashMapEntry<K,V>;
}

export class HashMapEntry<K,V> extends BasicMapEntry<K,V> {
  private hashCode:number;
  constructor(key?: K, value?: V, hash?: number) {
    super(key, value);
    this.hashCode = hash;
  }

  // private hashCode:number;
  public getHashCode():number {
    return this.hashCode;
  }
  public setHashCode(iHashCode:number) {
    this.hashCode = iHashCode;
  }

  public setValue (newValue:V) {
    this.value = newValue;
  }
}

export class ImmutableKeySetForHashMap<K,V> implements ImmutableSet<K> {
  private map:HashMap<K,V>;
  constructor(iHashMap:HashMap<K,V>) {
    this.map = iHashMap;
  }

  public size():number { return this.map.size(); }

  public isEmpty():boolean { return this.map.isEmpty(); }

  public contains(item:K) : boolean { return this.map.containsKey (item); }

  public iterator():JIterator<K> { return new HashMapKeySetJIterator(this.map); }

  public [Symbol.iterator] ():Iterator<K> { return new HashMapKeySetIterator (this.map); }

  /**
  * Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception. Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified). Exceptions thrown by the action are relayed to the caller.
  * @param {Consumer} consumer - the action to be performed for each element
  */
  public forEach(consumer:Consumer<K>) : void {
   for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
     const t:K = iter.next();
     consumer.accept(t);
   }
  }

}

/* Java style iterator */
export class HashMapKeySetJIterator<K,V> implements JIterator<K> {
  private location:HashMapIteratorLocationTracker<K,V>;
  private map:HashMap<K,V>;

  constructor(iHashMap:HashMap<K,V>) {
    this.map = iHashMap;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const firstEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetFirstEntryForIterator();
      if ((firstEntry === null) || (firstEntry === undefined)) return false;
      if ((firstEntry.entry === null) || (firstEntry.entry === undefined)) return false;
      const first:K = firstEntry.entry.getKey();
      return true;
    } else { // we've already called this iterator before
      const tmpEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetNextEntryForIterator(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return false;
      if ((tmpEntry.entry === null) || (tmpEntry.entry === undefined)) return false;
      const tmp:K = tmpEntry.entry.getKey();
      return true;
    }
  }

  public next():K {
    if (this.location === undefined) { // first time caller
      const firstEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetFirstEntryForIterator();
      if ((firstEntry === null) || (firstEntry === undefined)) return null;
      if ((firstEntry.entry === null) || (firstEntry.entry === undefined)) return null;
      const first:K = firstEntry.entry.getKey();
      this.location = firstEntry;
      return first;
    } else { // we've already called this iterator before
      const tmpEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetNextEntryForIterator(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return null;
      if ((tmpEntry.entry === null) || (tmpEntry.entry === undefined)) return null;
      const tmp:K = tmpEntry.entry.getKey();
      this.location = tmpEntry;
      return tmp;
    }
  }
}

/* TypeScript iterator */
export class HashMapKeySetIterator<K,V> implements Iterator<K> {
  private location:HashMapIteratorLocationTracker<K,V>;
  private map:HashMap<K,V>;

  constructor(iHashMap:HashMap<K,V>) {
    this.map = iHashMap;
    this.location = this.map.deprecatedGetFirstEntryForIterator();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<K> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<K> = new BasicIteratorResult (false, this.location.entry.getKey());
    this.location = this.map.deprecatedGetNextEntryForIterator(this.location);
    return tmp;
  }
}


export class ImmutableEntrySetForHashMap<K,V> implements ImmutableSet<MapEntry<K,V>> {
  private map:HashMap<K,V>;
  constructor(iHashMap:HashMap<K,V>) {
    this.map = iHashMap;
  }

  public size():number { return this.map.size(); }

  public isEmpty():boolean { return this.map.isEmpty(); }

  public contains(item:MapEntry<K,V>) : boolean { return this.map.containsKey (item.getKey()); }

  public iterator():JIterator<MapEntry<K,V>> { return new HashMapEntrySetJIterator(this.map); }

  public [Symbol.iterator] ():Iterator<MapEntry<K,V>> { return new HashMapEntrySetIterator (this.map); }

  public forEach(consumer:Consumer<MapEntry<K,V>>) : void {
   for (const iter:JIterator<MapEntry<K,V>> = this.iterator(); iter.hasNext(); ) {
     const t:MapEntry<K,V> = iter.next();
     consumer.accept(t);
   }
  }

}

/* Java style iterator */
export class HashMapEntrySetJIterator<K,V> implements JIterator<MapEntry<K,V>> {
  private location:HashMapIteratorLocationTracker<K,V>;
  private map:HashMap<K,V>;

  constructor(iHashMap:HashMap<K,V>) {
    this.map = iHashMap;
  }

  public hasNext():boolean {
    if (this.location === undefined) { // first time caller
      const firstEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetFirstEntryForIterator();
      if ((firstEntry === null) || (firstEntry === undefined)) return null;
      if ((firstEntry.entry === null) || (firstEntry.entry === undefined)) return null;
      const first:K = firstEntry.entry.getKey();
      return true;
    } else { // we've already called this iterator before
      const tmpEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetNextEntryForIterator(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return null;
      if ((tmpEntry.entry === null) || (tmpEntry.entry === undefined)) return null;
      const tmp:K = tmpEntry.entry.getKey();
      return true;
    }
  }

  public next():MapEntry<K,V> {
    if (this.location === undefined) { // first time caller
      const firstEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetFirstEntryForIterator();
      if ((firstEntry === null) || (firstEntry === undefined)) return null;
      if ((firstEntry.entry === null) || (firstEntry.entry === undefined)) return null;
      const first:MapEntry<K,V> = firstEntry.entry;
      this.location = firstEntry;
      return first;
    } else { // we've already called this iterator before
      const tmpEntry:HashMapIteratorLocationTracker<K,V> = this.map.deprecatedGetNextEntryForIterator(this.location);
      if ((tmpEntry === null) || (tmpEntry === undefined)) return null;
      if ((tmpEntry.entry === null) || (tmpEntry.entry === undefined)) return null;
      const tmp:MapEntry<K,V> = tmpEntry.entry;
      this.location = tmpEntry;
      return tmp;
    }
  }
}

/* TypeScript iterator */
export class HashMapEntrySetIterator<K,V> implements Iterator<MapEntry<K,V>> {
  private location:HashMapIteratorLocationTracker<K,V>;
  private map:HashMap<K,V>;

  constructor(iHashMap:HashMap<K,V>) {
    this.map = iHashMap;
    this.location = this.map.deprecatedGetFirstEntryForIterator();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<MapEntry<K,V>> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<MapEntry<K,V>> = new BasicIteratorResult (false, this.location.entry);
    this.location = this.map.deprecatedGetNextEntryForIterator(this.location);
    return tmp;
  }
}
