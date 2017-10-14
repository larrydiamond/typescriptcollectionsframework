/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldCollectable} from "./AllFieldCollectable";
import {ArrayList} from "./ArrayList";
import {BasicMapEntry} from "./BasicMapEntry";
import {Collectable} from "./Collectable";
import {Collections} from "./Collections";
import {Comparator} from "./Comparator";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableMap} from "./ImmutableMap";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";
import {JSet} from "./JSet";
import {LinkedList} from "./LinkedList";
import {MapEntry} from "./MapEntry";
import {NavigableMap} from "./NavigableMap";
import {NavigableSet} from "./NavigableSet";


class SkipListMapImpl<K,V> {
  private nodeList:LinkedList<SkipListNode<K,V>> = null;
  private height:number = 10;
  private mapComparator:Comparator<K> = null;
  private mapCollectable:Collectable<K> = null;
  private numberElements: number = 0;
  private skipListNodeComparator:Comparator<SkipListNode<K,V>> = null;
  private skipListNodeCollectable:Collectable<SkipListNode<K,V>> = null;

  constructor(iComparator:Comparator<K>, private initialElements:ImmutableMap<K, V>) {
    this.mapComparator = iComparator;
  //  this.skipListNodeComparator = new SkipListNodeComparator<K,V>(this.mapComparator);
    this.mapCollectable = Collections.collectableFromComparator(iComparator);
    this.skipListNodeCollectable = new SkipListNodeCollectable<K,V>(this.mapCollectable);

    if ((initialElements !== null) && (initialElements !== undefined)) {
      for (let iter = initialElements.entrySet().iterator(); iter.hasNext(); ) {
        let t:MapEntry<K,V> = iter.next ();
        this.put (t.getKey(), t.getValue());
      }
    }
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.nodeList = null;
    this.numberElements = 0;
  }

  /**
  * Returns the comparator used to order the keys in this map
  * @return {Comparator} the comparator used to order the keys in this map
  */
  public comparator () : Comparator<K> {
    return this.mapComparator;
  }

  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    if (this.nodeList === null)
      return 0;

    if (this.nodeList === undefined)
      return 0;

    return this.numberElements;
  }

  /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  public isEmpty () : boolean {
    if (this.size() < 1) return true;
    return false;
  }

  /**
   * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
   * @param {K} key key with which the specified value is to be associated
   * @param {V} value value to be associated with the specified key
   * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
   */
  public put (key:K, value:V) : V {
    if ((this.nodeList === undefined) || (this.nodeList === null)) {
      let newnode:SkipListNode<K,V> = new SkipListNode<K,V>(key, value, this.height, this.skipListNodeCollectable);
      return value;
    } else {
      return undefined;
    }
  }
}

class SkipListNode<K,V> extends BasicMapEntry<K,V> {
  private lastNodeArray:ArrayList<SkipListNode<K,V>> = null;
  public getLastNodeArray () : ArrayList<SkipListNode<K,V>> {
    return this.lastNodeArray;
  }
  private nextNodeArray:ArrayList<SkipListNode<K,V>> = null;
  public getNextNodeArray () : ArrayList<SkipListNode<K,V>> {
    return this.nextNodeArray;
  }
  constructor (key:K, value:V, height:number, iNodeCollectable:Collectable<SkipListNode<K,V>>) {
    super(key, value);
    this.lastNodeArray = new ArrayList<SkipListNode<K,V>>(iNodeCollectable);
  }
}

class SkipListNodeCollectable<K,V> implements Collectable<SkipListNode<K,V>> {
  private coll:Collectable<K> = null;

  constructor(iColl:Collectable<K>) {
    this.coll = iColl;
  }
  equals (o1: SkipListNode<K,V>, o2: SkipListNode<K,V>) {
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
    if (this.coll.equals(o1.getKey(), o2.getKey())) {
      return true;
    }
    return false;
  }
}







export class SkipListMap<K,V> implements NavigableMap<K,V> {
  private impl:SkipListMapImpl<K,V> = null;

  constructor (comp:Comparator<K>, iInitial:ImmutableMap<K,V>) {
    this.impl = new SkipListMapImpl(comp, iInitial);
  }

  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  size () : number {
    return this.impl.size();
  }

  /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  get (key:K) : V {
    return undefined;
  }

  /**
  * Returns true if this map contains a mapping for the specified key.
  * @param {K} key The key whose presence in this map is to be tested
  * @return {V} true if this map contains a mapping for the specified key.
  */
  containsKey (key:K) : boolean {
    return undefined;
  }

  /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  isEmpty () : boolean {
    if (1 < this.impl.size()) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * Returns an ImmutableSet view of the keys contained in this map.
  * The set's iterator returns the keys in ascending order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  keySet () : ImmutableSet<K> {
    return undefined;
  }

  /**
  * Returns an ImmutableSet view of the mappings contained in this map.
  * The set's iterator returns the mappings in ascending key order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * The contains method on this entrySet will only compare keys not values.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  entrySet () : ImmutableSet<MapEntry<K,V>> {
    return undefined;
  }

  /**
  * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  put (key:K, value:V) : V {
    return undefined;
  }

  /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  remove (key:K) : V {
    return undefined;
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  clear () : void {
    return undefined;
  }

  /**
  * Returns an ImmutableMap backed by this Map
  */
  immutableMap () : ImmutableMap<K,V> {
    return this;
  }

  /**
  * Returns the first (lowest) key currently in this map.
  * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
  */
  firstKey () : K {
    return undefined;
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  firstEntry () : BasicMapEntry<K,V> {
    return undefined;
  }

  /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  ceilingEntry (key:K) : MapEntry<K,V> {
    return undefined;
  }

  /**
  * Returns the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than or equal to key, or null if there is no such key
  */
  ceilingKey (key:K) : K {
    return undefined;
  }

  /**
  * Returns the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  higherKey (key:K) : K {
    return undefined;
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  higherEntry (key:K) : MapEntry<K,V> {
    return undefined;
  }


  /**
  * Returns the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the highest key lower than key, or null if there is no such key
  */
  lowerKey (key:K) : K {
    return undefined;
  }

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  lowerEntry (key:K) : MapEntry<K,V> {
    return undefined;
  }

  /**
  * Returns the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the greatest key less than or equal to key, or null if there is no such key
  */
  floorKey (key:K) : K {
    return undefined;
  }

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  floorEntry (key:K) : MapEntry<K,V> {
    return undefined;
  }

  /**
  * Returns the last (highest) key currently in this map.
  * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
  */
  lastKey () : K {
    return undefined;
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  lastEntry () : MapEntry<K,V> {
    return undefined;
  }
}


export class SkipListSet<K> implements NavigableSet<K> {
  private impl:SkipListMapImpl<K,number> = null;

  constructor(iComparator:Comparator<K>, private initialElements?:ImmutableCollection<K>) {
    this.impl = new SkipListMapImpl(iComparator, null);
  }

  public validateSet() : boolean {
    return undefined;
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    return undefined;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    return this.impl.size();
  }

  /**
  * Returns the comparator used to order the keys in this set
  * @return {Comparator} the comparator used to order the keys in this set
  */
  public comparator () : Comparator<K> {
    return undefined;
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    if (1 < this.impl.size()) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this set
  * @return {boolean} true if this set contains the specified element
  */
  public contains (item:K) : boolean {
    return undefined;
  }

  /**
  * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
  * @param {K} item to find floor node for
  * @return {K} the greatest element less than or equal to e, or null if there is no such element
  */
  public floor (item:K) : K {
    return undefined;
  }

  /**
  * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
  * @param {K} item to find ceiling node for
  * @return {K} the least element greater than or equal to item, or null if there is no such element
  */
  public ceiling (item:K) : K {
    return undefined;
  }


  /**
  * Returns the first (lowest) element currently in this set.
  * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
  */
  public first () : K {
    return undefined;
  }

  /**
  * Returns the last (highest) element currently in this set.
  * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
  */
  public last () : K {
    return undefined;
  }

  /**
  * Removes the specified element from this set if it is present.
  * @param {K} element element to be removed from this set
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    return undefined;
  }

  /**
  * Removes all of the elements from this set. The set will be empty after this call returns.
  */
  public clear () : void {
    return undefined;
  }

  /**
  * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
  * @return {K} the first (lowest) element, or null if this set is empty
  */
  public pollFirst () : K {
    return undefined;
  }

  /**
  * Retrieves and removes the last (highest) element, or returns null if this set is empty.
  * @return {K} the last (highest) element, or null if this set is empty
  */
  public pollLast () : K {
    return undefined;
  }

  /**
  * Needed For Iterator
  * @param {K} key the given key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public getNextHigherKey (key:K) : K {
    return undefined;
  }

  /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    return undefined;
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    return undefined;
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  };

  /**
  * Returns an ImmutableSet backed by this Set
  */
  immutableSet () : ImmutableSet<K> {
    return this;
  };
}
