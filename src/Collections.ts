/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {AllFieldCollectable} from "./AllFieldCollectable";
import {AllFieldHashable} from "./AllFieldHashable";
import {ArrayList} from "./ArrayList";
import {Collectable} from "./Collectable";
import {Comparator} from "./Comparator";
import {Hashable} from "./Hashable";
import {HashMap} from "./HashMap";
import {HashSet} from "./HashSet";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableList} from "./ImmutableList";
import {ImmutableMap} from "./ImmutableMap";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";

export class Collections {

  /**
   * Returns a Comparator that works correctly for string native objects
   */
  public static getStringComparator():Comparator<string> {
    const sortString:Comparator<string> = {
      compare(o1:string, o2:string) : number {
        if (o1 === o2)
          return 0;
        if (o1 === undefined)
          return -1;
        if (o1 === null)
          return -1;
        if (o2 === undefined)
          return 1;
        if (o2 === null)
          return 1;
        if (o1 < o2)
          return -1;

        return 1;
      }
    }

    return sortString;
  }

  /**
   * Returns a Comparator that works correctly for number native objects
   */
  public static getNumberComparator():Comparator<number> {
    const sortNumber:Comparator<number> = {
      compare(o1:number, o2:number) : number {
        if (o1 === o2)
          return 0;
        if (o1 === undefined)
          return -1;
        if (o1 === null)
          return -1;
        if (o2 === undefined)
          return 1;
        if (o2 === null)
          return 1;
        if (o1 < o2)
          return -1;

        return 1;
      }
    }
    return sortNumber;
  }

  /**
   * Returns a hash code good for string objects
   */
  public static getHashCodeForString (o:string) : number {
    if (o === undefined) {
      return 0;
    }
    if (o === null) {
      return 0;
    }
    const tmp:string = JSON.stringify (o);
    let hash: number = 0;
    for (let loop = 0; loop < tmp.length; loop++) {
      const n:number = tmp.charCodeAt (loop);
      hash = ((hash * 256) + n) % 1000000000;
    }
    return hash;
  }

  /**
   * Returns a hash code good for Collections for objects
   */
  public static getHashCodeForStrings (o:ImmutableCollection<string>) : number {
    if (o === undefined) {
      return 0;
    }
    if (o === null) {
      return 0;
    }
    let tmp:number = 0;
    for (const iter:JIterator<string> = o.iterator(); iter.hasNext(); ) {
      const ostr:string = iter.next();
      tmp = ((tmp * 256) + this.getHashCodeForString (ostr)) % 1000000000;
    }
    return tmp;
  }

  /**
   * Returns a hash code good for number objects
   */
  public static getHashCodeForNumber (o:number) : number {
    if (o === undefined) {
      return 0;
    }
    if (o === null) {
      return 0;
    }

    let tmp:number = o;
    while ((tmp < 1000000000) && (Math.floor (tmp) !== tmp)) {
      tmp = tmp * 10;
    }

    return tmp;
  }

  /**
   * Returns an ImmutableList of the entries passed in, using an AllFieldCollectable as the Collectable
   */
  public static list<T> (... values : T[]) : ImmutableList<T> {
    const list : ArrayList<T> = new ArrayList<T>(new AllFieldCollectable<T>());
    for (let loop : number = 0; loop < values.length; loop++) {
      const tmp : T = values [loop];
      list.add (tmp);
    }
    return list.immutableList();
  }

  public static emptyList<T> () : ImmutableList<T> {
    const list : ArrayList<T> = new ArrayList<T>(new AllFieldCollectable<T>());
    return list.immutableList();
  }

  public static emptySet<T> () : ImmutableSet<T> {
    const tmp : HashSet<T> = new HashSet<T>(new AllFieldHashable<T>());
    return tmp.immutableSet();
  }

  public static emptyMap<K,V> () : ImmutableMap<K,V> {
    const tmp : HashMap<K,V> = new HashMap<K,V>(new AllFieldHashable<K>());
    return tmp.immutableMap();
  }

  /**
   * Returns an Collectable made from the Comparator passed in
   */
  public static collectableFromComparator<K> (iComp:Comparator<K>): Collectable <K> {
    const tmp : Collectable<K> = {
      equals (o1:K, o2:K) : boolean {
        if (0 === iComp.compare (o1, o2))
          return true;
        else
          return false;
      }
    }
    return tmp;
  }

}
