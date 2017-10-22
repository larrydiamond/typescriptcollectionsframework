/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {AllFieldCollectable} from "./AllFieldCollectable";
import {ArrayList} from "./ArrayList";
import {BasicIteratorResult} from "./BasicIteratorResult";
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

export class SkipListMapImpl<K,V> {
  private head:ArrayList<SkipListNode<K,V>> = null;
  private height:number = 10;
  private mapComparator:Comparator<K> = null;
  private mapCollectable:Collectable<K> = null;
  private numberElements: number = 0;
  private skipListNodeComparator:Comparator<SkipListNode<K,V>> = null;
  private skipListNodeCollectable:Collectable<SkipListNode<K,V>> = null;

  constructor(iComparator:Comparator<K>, private initialElements:ImmutableMap<K, V> = null) {
    this.mapComparator = iComparator;
    this.skipListNodeComparator = new SkipListNodeComparator<K,V>(this.mapComparator);
    this.mapCollectable = Collections.collectableFromComparator(iComparator);
    this.skipListNodeCollectable = new SkipListNodeCollectable<K,V>(this.mapCollectable);

    this.head = new ArrayList<SkipListNode<K,V>>(this.skipListNodeCollectable);
    for (let loop:number = 0; loop < this.height; loop++) {
      this.head.add (null);
    }

    if ((initialElements !== null) && (initialElements !== undefined)) {
//      console.log ("skiplist::constructor initial has " + initialElements.size());
      for (const iter = initialElements.entrySet().iterator(); iter.hasNext(); ) {
        const t:MapEntry<K,V> = iter.next ();
//        console.log ("skiplist::constructor adding " + t.getKey());
        this.put (t.getKey(), t.getValue());
      }
    }
  }

  public getSkipListNodeComparator() : Comparator<SkipListNode<K,V>> { return this.skipListNodeComparator; }
  public getSkipListNodeCollectable() : Collectable<SkipListNode<K,V>> { return this.skipListNodeCollectable; }

  public validateDisplay () : boolean {
    console.log ("Start::Size of SkipListMap = " + this.numberElements);
    let count : number = 0;
    let tmp : SkipListNode<K,V> = this.head.get (0);
    if ((tmp !== null) && (tmp !== undefined)) {
      console.log (JSON.stringify(tmp.getKey()));
      count++;
    }
    while ((tmp !== null) && (tmp !== undefined)) {
      const next : SkipListNode<K,V> = tmp.getNextNodeArray().get(0);
      if ((next !== null) && (next !== undefined)) {
        console.log (JSON.stringify(next.getKey()));
        count++;
        const prev : SkipListNode<K,V> = next.getLastNodeArray().get (0);
        if (prev !== null) {
          const cmp:number = this.mapComparator.compare(prev.getKey(), tmp.getKey());
          if (cmp !== 0) {
            console.log ("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
            return false;
          }
        }
      }
      tmp = next;
    }
    console.log ("End::Size of SkipListMap = " + this.numberElements + " found " + count);
    if (this.numberElements === count) {
      return true;
    } else {
      return false;
    }
  }

  public validate () : boolean {
    let count : number = 0;
    let tmp : SkipListNode<K,V> = this.head.get (0);
    if ((tmp !== null) && (tmp !== undefined)) {
      count++;
    }
    while ((tmp !== null) && (tmp !== undefined)) {
      const next : SkipListNode<K,V> = tmp.getNextNodeArray().get(0);
      if ((next !== null) && (next !== undefined)) {
        count++;
        const prev : SkipListNode<K,V> = next.getLastNodeArray().get (0);
        if (prev !== null) {
          const cmp:number = this.mapComparator.compare(prev.getKey(), tmp.getKey());
          if (cmp !== 0) {
            console.log ("Last node doesnt match " + next.getKey() + " " + tmp.getKey() + " " + prev.getKey());
            return false;
          }
        }
      }
      tmp = next;
    }
    if (this.numberElements === count) {
      return true;
    } else {
      console.log ("End::Size of SkipListMap = " + this.numberElements + " found " + count);
      return false;
    }
  }

  /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public remove (key:K) : V {
    const tmp : SkipListNode<K,V> = this.getEntry (key);
    if ((tmp === null) || (tmp === undefined)) {
      return null;
    }
    this.removeElement (tmp);
    return tmp.getValue();
  }

  /**
  * Removes this node from the Map
  * @param {MapEntry<K,V>} node node to remove
  */
  public removeElement (node:SkipListNode<K,V>) : void {
    const size : number = node.getNextNodeArray().size();
    const lna:ArrayList<SkipListNode<K,V>> = node.getLastNodeArray();
    const nna:ArrayList<SkipListNode<K,V>> = node.getNextNodeArray();
    for (let loop:number = 0; loop < size; loop++) {
      const ln:SkipListNode<K,V> = lna.get (loop);
      const nn:SkipListNode<K,V> = nna.get (loop);

      if ((ln !== null) && (ln !== undefined)) {
        ln.getNextNodeArray().set(loop, nn);
      }
      if ((nn !== null) && (nn !== undefined)) {
        nn.getNextNodeArray().set(loop, ln);
      }
      if (this.head.get (loop) === node) {
        this.head.set(loop, nn);
      }
    }
    return;
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.numberElements = 0;
    this.head = new ArrayList<SkipListNode<K,V>>(this.skipListNodeCollectable);
    for (let loop:number = 0; loop < this.height; loop++) {
      this.head.add (null);
    }
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
    return this.numberElements;
  }

  /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  public isEmpty () : boolean {
    if (this.size() > 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
   * @param {K} key key with which the specified value is to be associated
   * @param {V} value value to be associated with the specified key
   * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
   */
  public put (key:K, value:V) : V {
    if (this.numberElements < 1) {
//      console.log ("SkipListImpl::put empty insert " + JSON.stringify(key));
      const newnode:SkipListNode<K,V> = new SkipListNode<K,V>(key, value, this.height, this.skipListNodeCollectable);
      for (let loop:number = 0; loop < this.height; loop++) {
        this.head.set (loop, newnode);
      }
      this.numberElements = 1;
      return null;
    } else {
      const lastNode:SkipListNode<K,V> = this.floorEntry(key);
      if ((lastNode === null) || (lastNode === undefined)) { // there's no node less than or equal to this node, make a new node and it's going to be the first node
//        console.log ("SkipListImpl::put least element insert " + JSON.stringify(key));
        const nodeHeight = Math.floor(Math.random() * (this.height - 1) + 1);  // Random number between 1 and this.height (both inclusive)
        const newnode:SkipListNode<K,V> = new SkipListNode<K,V>(key, value, nodeHeight, this.skipListNodeCollectable);
        for (let loop:number = 0; loop < nodeHeight; loop++) {
          const existingNode : SkipListNode<K,V> = this.head.get (loop);
          newnode.getNextNodeArray().set(loop, existingNode);
          if ((existingNode !== null) && (existingNode !== undefined)) {
            existingNode.getLastNodeArray().set(loop, newnode);
          }
          this.head.set (loop, newnode);
        }
        this.numberElements = this.numberElements + 1;
        return null;
      } else {
        if (this.mapComparator.compare (key, lastNode.getKey()) === 0) {
          const lastValue : V = lastNode.getValue();
          lastNode.setValue (value);
          return lastValue;
        } else {  // This node will immediately preceed the new node
          const nodeHeight:number = Math.floor(Math.random() * (this.height - 1) + 1);  // Random number between 1 and this.height (both inclusive)
          const newnode:SkipListNode<K,V> = new SkipListNode<K,V>(key, value, nodeHeight, this.skipListNodeCollectable);
          this.hookUpNodePointers (newnode, lastNode);

          this.numberElements = this.numberElements + 1;
          return null;
        }
      }
    }
  }

  private hookUpNodePointers (newNode:SkipListNode<K,V>, immediatePreceedingNode:SkipListNode<K,V>) : void {
    const lastNode:SkipListNode<K,V> = immediatePreceedingNode;
    const nodeHeight:number = newNode.getNextNodeArray().size();
    for (let height:number = 0; height < newNode.getNextNodeArray().size() - 1; height++) {
      if ((lastNode !== null) && (lastNode !== undefined)) {
        if (lastNode.getNextNodeArray().size() > height) {
          const nextNode:SkipListNode<K,V> = lastNode.getNextNodeArray().get(height);
          if ((nextNode === null) || (nextNode === undefined)) { // end of the map
            lastNode.getNextNodeArray().set (height, newNode);
            newNode.getLastNodeArray().set (height, lastNode);
          } else {
            newNode.getLastNodeArray().set (height, lastNode);
            newNode.getNextNodeArray().set (height, nextNode);

            lastNode.getNextNodeArray().set (height, newNode);
            nextNode.getLastNodeArray().set (height, newNode);
          }
        } else {
          // find the new last node if it exists
          console.log ("Unwritten code");
        }
      } else {
        this.head.set (height, newNode); // nothing before us so set the head to our node
      }
    }
/*


              let nextNode = lastNode.getNextNodeArray().get(0);
              newnode.getNextNodeArray().set(0, nextNode);
              lastNode.getNextNodeArray().set(0, newnode);
              if ((nextNode !== null) && (nextNode !== undefined)) {
                nextNode.getLastNodeArray().set(0, newnode);
              }
              // Hook up last array
              let doneSoFar:number = 0;
              while (doneSoFar < (nodeHeight - 1)) {
                let thisOffset:number = doneSoFar + 1;
                if (lastNode.getNextNodeArray().size() > thisOffset) {
                  let linkedNode : SkipListNode<K,V> = lastNode.getNextNodeArray().get(thisOffset);
                  newnode.getNextNodeArray().set(thisOffset, linkedNode);
                  lastNode.getNextNodeArray().set(thisOffset, newnode);
                  linkedNode.getLastNodeArray().set(thisOffset, newnode);
                  newnode.getLastNodeArray().set (thisOffset, lastNode);
                  doneSoFar++;
                } else {
                  console.log ("Unwritten code"); // TODO
                }
              }

              console.log ("Unwritten code");


              */
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {SkipListNode} an entry with the least key, or null if this map is empty
  */
  public firstEntry () : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }
    return this.head.get (0);
  }

  /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingEntry (key:K) : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }
    console.log ("SkipList::ceilingEntry unwritten code");
    return undefined;   // TODO
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public higherEntry (key:K) : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    console.log ("SkipList::higherEntry unwritten code");
    return undefined;   // TODO
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public nextHigherNode (node : SkipListNode<K,V>) : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }
    if ((node === null) || (node === undefined)) return null;
    const ta:ArrayList<SkipListNode<K,V>> = node.getNextNodeArray();
    if ((ta === null) || (ta === undefined)) return null;
    const tmpn = ta.get(0);
    if ((tmpn === null) || (tmpn === undefined)) return null;
    return tmpn;
  }

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  public lowerEntry (key:K) : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    // Get a first node, highest -1 entry
    let node:SkipListNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      const tmp:SkipListNode<K,V> = this.head.get ((this.height - 1) - loop);
      if ((tmp !== null) && (tmp !== undefined)) {
        const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
        if (cmp === -1) {
          node = tmp;
        }
      }
    }
    if (node === null) { // we only got here if every element was higher than or equal this one
      return null;
    }

    // keep moving forward until we every node in the next array is equal to or past the key
    let keepGoing : boolean = true;
    while (keepGoing === true) {
      if (node.getNextNodeArray().get(0) === null) {
        keepGoing = false;
      } else {
        if (node.getNextNodeArray().get(0) === undefined) {
          keepGoing = false;
        } else {
          let nextNode : SkipListNode<K,V> = null;
          for (let loop : number = 0; ((nextNode === null) && (loop < node.getNextNodeArray().size())); loop++) {
            const tmp : SkipListNode<K,V> = node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1);
            if (tmp !== null) {
              const cmp : number = this.mapComparator.compare (key, tmp.getKey());
              if (cmp === -1) {
                nextNode = tmp;
              }
            }
          }
          if (nextNode === null) {
              keepGoing = false;
          } else {
            node = nextNode;
          }
        }
      }
    }
    return node;
  }

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  public floorEntry (key:K) : SkipListNode<K,V> {
    if (this.numberElements < 1) {
//      console.log ("SkipList::FloorEntry no nodes");
      return null;
    }

    // Get a first node, highest -1 entry
    let node:SkipListNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      const tmp:SkipListNode<K,V> = this.head.get ((this.height - 1) - loop);
      if ((tmp !== null) && (tmp !== undefined)) {
        const cmp:number = this.mapComparator.compare (tmp.getKey(), key);
//        console.log ("SkipList::FloorEntry compared " + key + " and " + tmp.getKey() + " returned " + cmp);
        if (cmp === 0) {
          return tmp;
        }
        if (cmp === -1) {
          node = tmp;
        }
      }
    }
    if (node === null) { // we only got here if every element was higher than this one
//      console.log ("SkipList::FloorEntry all elements are higher");
      return null;
    }

    // keep moving forward until we every node in the next array is past the key
    let keepGoing : boolean = true;
    while (keepGoing === true) {
      if (node.getNextNodeArray().get(0) === null) {
        keepGoing = false;
      } else {
        if (node.getNextNodeArray().get(0) === undefined) {
          keepGoing = false;
        } else {
          let nextNode : SkipListNode<K,V> = null;
          for (let loop : number = 0; ((nextNode === null) && (loop < node.getNextNodeArray().size())); loop++) {
            const tmp : SkipListNode<K,V> = node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1);
            if (tmp !== null) {
              const cmp : number = this.mapComparator.compare (key, tmp.getKey());
              if (cmp === 0) {
                return tmp;
              }
              if (cmp === -1) {
                nextNode = tmp;
              }
            }
          }
          if (nextNode === null) {
              keepGoing = false;
          } else {
            node = nextNode;
          }
        }
      }
    }
//    console.log ("SkipList::FloorEntry returning " + node.getKey());
    return node;
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public lastEntry () : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    // Get a first node
    let node:SkipListNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      node = this.head.get ((this.height - 1) - loop);
    }

    if ((node === null) && (node === undefined)) {
      return null;
    }

    // get to the last node
    while (node.getNextNodeArray().get (0) !== null) {
      let foundNext : boolean = false;
      for (let loop : number = 0; ((foundNext === false) && (loop < node.getNextNodeArray().size())); loop++) {
        if (node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1) !== null) {
          foundNext = true;
          node = node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1);
        }
      }
    }

    return node;
  }

  /**
  * Returns a key-value mapping associated with the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the key, or null if there is no such key
  */
  public getEntry (key:K) : SkipListNode<K,V> {
    if (this.numberElements < 1) {
      return null;
    }

    // Get a first node, highest -1 entry
    let node:SkipListNode<K,V> = null;
    for (let loop:number = 0; ((loop < this.height) && (node === null)); loop++) {
      const tmp:SkipListNode<K,V> = this.head.get ((this.height - 1) - loop);
      if ((tmp !== null) && (tmp !== undefined)) {
        const cmp:number = this.mapComparator.compare (key, tmp.getKey());
        if (cmp === 0) {
          return tmp;
        }
        if (cmp === -1) {
          node = tmp;
        }
      }
    }
    if (node === null) { // we only got here if every element was higher than this one
      return null;
    }

    // keep moving forward until we find the node or cant find any node less than it
    while (node.getNextNodeArray().get (0) !== null) {
      let cmp:number = this.mapComparator.compare (key, node.getKey());
      if (cmp === 0) {
        return node;
      }
      if (cmp === 1) { // the next node is past the desired node
        return null;
      }

      let nextNode : SkipListNode<K,V> = null;
      for (let loop : number = 0; ((nextNode === null) && (loop < node.getNextNodeArray().size())); loop++) {
        const tmp : SkipListNode<K,V> = node.getNextNodeArray().get (node.getNextNodeArray().size() - loop - 1);
        if (tmp !== null) {
          cmp = this.mapComparator.compare (key, tmp.getKey());
          if (cmp === 0) {
            return tmp;
          }
          if (cmp === -1) {
            nextNode = tmp;
          }
        }
      }
    }
    return null;
  }

}

export class SkipListNode<K,V> extends BasicMapEntry<K,V> {
  constructor (key:K, value:V, height:number, iNodeCollectable:Collectable<SkipListNode<K,V>>) {
    super(key, value);
    this.lastNodeArray = new ArrayList<SkipListNode<K,V>>(iNodeCollectable);
    this.nextNodeArray = new ArrayList<SkipListNode<K,V>>(iNodeCollectable);
    for (let loop:number = 0; loop < height; loop++) {
      this.nextNodeArray.add (null);
      this.lastNodeArray.add (null);
    }
  }
  public setValue (iValue:V) : void {
    this.value = iValue;
  }
  private lastNodeArray:ArrayList<SkipListNode<K,V>> = null;
  public getLastNodeArray () : ArrayList<SkipListNode<K,V>> {
    return this.lastNodeArray;
  }
  private nextNodeArray:ArrayList<SkipListNode<K,V>> = null;
  public getNextNodeArray () : ArrayList<SkipListNode<K,V>> {
    return this.nextNodeArray;
  }
}

class SkipListNodeCollectable<K,V> implements Collectable<SkipListNode<K,V>> {
  private coll:Collectable<K> = null;

  constructor(iColl:Collectable<K>) {
    this.coll = iColl;
  }
  public equals (o1: SkipListNode<K,V>, o2: SkipListNode<K,V>) {
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

class SkipListNodeComparator<K,V> implements Comparator<SkipListNode<K,V>> {
  private comp:Comparator<K> = null;

  constructor(iComp:Comparator<K>) {
    this.comp = iComp;
  }

  public compare (o1:SkipListNode<K,V>, o2:SkipListNode<K,V>) : number {
    if (o1 === o2) {
      return 0;
    }
    if ((o1 === undefined) || (o1 === null)) {
      return -1;
    }
    if ((o2 === undefined) || (o2 === null)) {
      return 1;
    }
    return this.comp.compare (o1.getKey(), o2.getKey());
  }
}


export class SkipListMap<K,V> implements NavigableMap<K,V> {
  private impl:SkipListMapImpl<K,V> = null;

  constructor (comp:Comparator<K>, iInitial:ImmutableMap<K,V> = null) {
    this.impl = new SkipListMapImpl(comp, iInitial);
  }

  public validateMap () : boolean { return this.impl.validate(); }
  public validateMapDisplay () : boolean { return this.impl.validateDisplay(); }

  public getNextHigherKey (key : K) {
    console.log ("unwritten code");
    return undefined;
  }

  /**
  * Returns the number of key-value mappings in this map.
  * @return {number} the number of key-value mappings in this map
  */
  public size () : number {
    return this.impl.size();
  }

  /**
  * Returns the value to which the specified key is mapped, or null if this map contains no mapping for the key.
  * @param {K} key the key whose associated value is to be returned
  * @return {V} the value to which the specified key is mapped, or null if this map contains no mapping for the key
  */
  public get (key:K) : V {
    const node : SkipListNode<K,V> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getValue();
  }

  /**
  * Returns true if this map contains a mapping for the specified key.
  * @param {K} key The key whose presence in this map is to be tested
  * @return {V} true if this map contains a mapping for the specified key.
  */
  public containsKey (key:K) : boolean {
    const node : SkipListNode<K,V> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return false;
    }
    return true;
  }

  /**
  * Returns true if this map contains no key-value mappings.
  * @return {boolean} true if this map contains no key-value mappings
  */
  public isEmpty () : boolean {
    if (this.impl.size() > 0) {
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
  public keySet () : ImmutableSet<K> {
    console.log ("SkipList::keyset unwritten code");
    return undefined;   // TODO
  }

  /**
  * Returns an ImmutableSet view of the mappings contained in this map.
  * The set's iterator returns the mappings in ascending key order.
  * The set is backed by the map, so changes to the map are reflected in the set.
  * If the map is modified while an iteration over the set is in progress the results of the iteration are undefined.
  * The contains method on this entrySet will only compare keys not values.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public entrySet () : ImmutableSet<MapEntry<K,V>> {
    return new ImmutableEntrySetForSkipListMapImpl(this.impl);
  }

  /**
  * Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced.
  * @param {K} key key with which the specified value is to be associated
  * @param {V} value value to be associated with the specified key
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public put (key:K, value:V) : V {
    return this.impl.put(key, value);
  }

  /**
  * Removes the mapping for this key from this Map if present.
  * @param {K} key key for which mapping should be removed
  * @return {V} the previous value associated with key, or null if there was no mapping for key. (A null return can also indicate that the map previously associated null with key.)
  */
  public remove (key:K) : V {
    return this.impl.remove(key);
  }

  /**
  * Removes all of the mappings from this map. The map will be empty after this call returns.
  */
  public clear () : void {
    this.impl.clear();
  }

  /**
  * Returns an ImmutableMap backed by this Map
  */
  public immutableMap () : ImmutableMap<K,V> {
    return this;
  }

  /**
  * Returns the first (lowest) key currently in this map.
  * @return {K} the first (lowest) key currently in this map, returns null if the Map is empty
  */
  public firstKey () : K {
    const firstNode : SkipListNode<K,V> = this.impl.firstEntry();
    if ((firstNode === undefined) || (firstNode === null)) {
      return null;
    }
    return firstNode.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the least key, or null if this map is empty
  */
  public firstEntry () : BasicMapEntry<K,V> {
    const firstNode : SkipListNode<K,V> = this.impl.firstEntry();
    if ((firstNode === undefined) || (firstNode === null)) {
      return null;
    }
    return firstNode;
  }

  /**
  * Returns a key-value mapping associated with the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingEntry (key:K) : MapEntry<K,V> {
    const node : SkipListNode<K,V> = this.impl.ceilingEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the least key greater than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than or equal to key, or null if there is no such key
  */
  public ceilingKey (key:K) : K {
    const node : SkipListNode<K,V> = this.impl.ceilingEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public higherKey (key:K) : K {
    const node : SkipListNode<K,V> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key greater than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the least key greater than key, or null if there is no such key
  */
  public higherEntry (key:K) : MapEntry<K,V> {
    const node : SkipListNode<K,V> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the highest key lower than key, or null if there is no such key
  */
  public lowerKey (key:K) : K {
    const node : SkipListNode<K,V> = this.impl.lowerEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the highest key lower than the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the highest key lower than key, or null if there is no such key
  */
  public lowerEntry (key:K) : MapEntry<K,V> {
    const node : SkipListNode<K,V> = this.impl.lowerEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {K} the greatest key less than or equal to key, or null if there is no such key
  */
  public floorKey (key:K) : K {
    const node : SkipListNode<K,V> = this.impl.floorEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the greatest key less than or equal to the given key, or null if there is no such key.
  * @param {K} key the key
  * @return {MapEntry} an entry with the greatest key less than or equal to key, or null if there is no such key
  */
  public floorEntry (key:K) : MapEntry<K,V> {
    const node : SkipListNode<K,V> = this.impl.floorEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }

  /**
  * Returns the last (highest) key currently in this map.
  * @return {K} the last (highest) key currently in this map, returns null if the Map is empty
  */
  public lastKey () : K {
    const node : SkipListNode<K,V> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a key-value mapping associated with the least key in this map, or null if the map is empty.
  * @return {MapEntry} an entry with the greatest key, or null if this map is empty
  */
  public lastEntry () : MapEntry<K,V> {
    const node : SkipListNode<K,V> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node;
  }
}


export class ImmutableEntrySetForSkipListMapImpl<K,V> implements ImmutableSet<MapEntry<K,V>> {
  private map:SkipListMapImpl<K,V>;
  constructor(iMap:SkipListMapImpl<K,V>) {
    this.map = iMap;
  }

  public size():number { return this.map.size(); }

  public isEmpty():boolean { return this.map.isEmpty(); }

  public contains(item:MapEntry<K,V>) : boolean {
    if (item === null) return false;
    if (item === undefined) return false;
    const node : SkipListNode<K,V> = this.map.getEntry(item.getKey());
    if ((node === undefined) || (node === null)) {
      return false;
    }
    return true;
  }

  public iterator():JIterator<MapEntry<K,V>> { return new SkipListMapEntrySetJIterator(this.map); }

  public [Symbol.iterator] ():Iterator<MapEntry<K,V>> { return new SkipListMapEntrySetIterator (this.map); }
}

/* Java style iterator */
export class SkipListMapEntrySetJIterator<K,V> implements JIterator<MapEntry<K,V>> {
  private location:SkipListNode<K,V>;
  private map:SkipListMapImpl<K,V>;

  constructor(iMap:SkipListMapImpl<K,V>) {
    this.map = iMap;
  }

  public hasNext():boolean {
//    console.log ("SkipListMapEntrySetJIterator::hasNext");
    if (this.location === undefined) { // first time caller
      const firstEntry:SkipListNode<K,V> = this.map.firstEntry();
      if (firstEntry === null) return false;
      if (firstEntry === undefined) return false;
      return true;
    } else { // we've already called this iterator before
      const tmpEntry:SkipListNode<K,V> = this.map.nextHigherNode(this.location);
      if (tmpEntry === null) return false;
      if (tmpEntry === undefined) return false;
      return true;
    }
  }

  public next():MapEntry<K,V> {
//    console.log ("SkipListMapEntrySetJIterator::next");
    if (this.location === undefined) { // first time caller
      const firstEntry:SkipListNode<K,V> = this.map.firstEntry();
      if (firstEntry === null) return null;
      if (firstEntry === undefined) return null;
      this.location = firstEntry;
      return firstEntry;
    } else { // we've already called this iterator before
      const tmpEntry:SkipListNode<K,V> = this.map.nextHigherNode(this.location);
      if (tmpEntry === null) return null;
      if (tmpEntry === undefined) return null;
      this.location = tmpEntry;
      return tmpEntry;
    }
  }
}

/* TypeScript iterator */
export class SkipListMapEntrySetIterator<K,V> implements Iterator<MapEntry<K,V>> {
  private location:SkipListNode<K,V>;
  private map:SkipListMapImpl<K,V>;

  constructor(iMap:SkipListMapImpl<K,V>) {
    this.map = iMap;
    this.location = this.map.firstEntry();
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<MapEntry<K,V>> {
    if (this.location === null) {
      return new BasicIteratorResult(true, null);
    }
    if (this.location === undefined) {
      return new BasicIteratorResult(true, null);
    }
    const tmp:BasicIteratorResult<MapEntry<K,V>> = new BasicIteratorResult (false, this.location);
    this.location = this.map.nextHigherNode(this.location);
    return tmp;
  }
}

export class SkipListSet<K> implements NavigableSet<K> {
  private impl:SkipListMapImpl<K,number> = null;

  constructor(iComparator:Comparator<K>, private initialElements?:ImmutableCollection<K>) {
    this.impl = new SkipListMapImpl<K,number>(iComparator, null);
    if ((initialElements !== null) && (initialElements !== undefined)) {
      for (const iter = initialElements.iterator(); iter.hasNext(); ) {
        const key:K = iter.next ();
        this.impl.put (key, 0);
      }
    }
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    const tmp:number = this.impl.put (element, 0);
    if (tmp === 0) {
      return false;
    }
    return true;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    return this.impl.size();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    if (this.impl.size() > 0) {
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
  public contains (key:K) : boolean {
    const node : SkipListNode<K,number> = this.impl.getEntry(key);
    if ((node === undefined) || (node === null)) {
      return false;
    }
    return true;
  }

  /**
  * Returns the greatest element in this set less than or equal to the given element, or null if there is no such element.
  * @param {K} item to find floor node for
  * @return {K} the greatest element less than or equal to e, or null if there is no such element
  */
  public floor (key:K) : K {
    const node : SkipListNode<K,number> = this.impl.floorEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the least element in this set greater than or equal to the given element, or null if there is no such element.
  * @param {K} item to find ceiling node for
  * @return {K} the least element greater than or equal to item, or null if there is no such element
  */
  public ceiling (key:K) : K {
    const node : SkipListNode<K,number> = this.impl.ceilingEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }


  /**
  * Returns the first (lowest) element currently in this set.
  * @return {K} the first (lowest) element currently in this set, undefined if there are no elements in this set
  */
  public first () : K {
    const node : SkipListNode<K,number> = this.impl.firstEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns the last (highest) element currently in this set.
  * @return {K} the last (highest) element currently in this set, undefined if there are no elements in this set
  */
  public last () : K {
    const node : SkipListNode<K,number> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Removes the specified element from this set if it is present.
  * @param {K} element element to be removed from this set
  * @return {boolean} true if the set contained the specified element
  */
  public remove (element:K) : boolean {
    const tmp:number = this.impl.remove(element);
    if ((tmp === undefined) || (tmp === null)) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * Removes all of the elements from this set. The set will be empty after this call returns.
  */
  public clear () : void {
    this.impl.clear();
  }

  /**
  * Retrieves and removes the first (lowest) element, or returns null if this set is empty.
  * @return {K} the first (lowest) element, or null if this set is empty
  */
  public pollFirst () : K {
    const node : SkipListNode<K, number> = this.impl.firstEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    } else {
      const tmp:K = node.getKey();
      this.impl.removeElement(node);
      return tmp;
    }
  }

  /**
  * Retrieves and removes the last (highest) element, or returns null if this set is empty.
  * @return {K} the last (highest) element, or null if this set is empty
  */
  public pollLast () : K {
    const node : SkipListNode<K, number> = this.impl.lastEntry();
    if ((node === undefined) || (node === null)) {
      return null;
    } else {
      const tmp:K = node.getKey();
      this.impl.removeElement(node);
      return tmp;
    }
  }

  /**
  * Needed For Iterator
  * @param {K} key the given key
  * @return {K} the least key greater than key, or null if there is no such key
  */
  public getNextHigherKey (key:K) : K {
    const node : SkipListNode<K,number> = this.impl.higherEntry(key);
    if ((node === undefined) || (node === null)) {
      return null;
    }
    return node.getKey();
  }

  /**
  * Returns a Java style iterator
  * @return {JIterator<K>} the Java style iterator
  */
  public iterator():JIterator<K> {
    console.log ("SkipList::jiterator unwritten code");
    return undefined;   // TODO
  }

  /**
  * Returns a TypeScript style iterator
  * @return {Iterator<K>} the TypeScript style iterator
  */
  public [Symbol.iterator] ():Iterator<K> {
    console.log ("SkipList::iterator unwritten code");
    return undefined;   // TODO
  }

  /**
  * Returns an ImmutableCollection backed by this Collection
  */
  public immutableCollection () : ImmutableCollection<K> {
    return this;
  }

  /**
  * Returns an ImmutableSet backed by this Set
  */
  public immutableSet () : ImmutableSet<K> {
    return this;
  }
}
