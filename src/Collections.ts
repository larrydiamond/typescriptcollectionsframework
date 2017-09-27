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

  public static getStringComparator():Comparator<string> {
    let sortString:Comparator<string> = {
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

  public static getNumberComparator():Comparator<number> {
    let sortNumber:Comparator<number> = {
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

  public static getHashCodeForString (o:string) : number {
    if (o === undefined) {
      return 0;
    }
    if (o === null) {
      return 0;
    }
    let tmp:string = JSON.stringify (o);
    let hash: number = 0;
    for (let loop = 0; loop < tmp.length; loop++) {
      let n:number = tmp.charCodeAt (loop);
      hash = ((hash * 256) + n) % 1000000000;
    }
    return hash;
  }

  public static getHashCodeForStrings (o:ImmutableCollection<string>) : number {
    if (o === undefined) {
      return 0;
    }
    if (o === null) {
      return 0;
    }
    let tmp:number = 0;
    for (let iter:JIterator<string> = o.iterator(); iter.hasNext(); ) {
      let ostr:string = iter.next();
      tmp = ((tmp * 256) + this.getHashCodeForString (ostr)) % 1000000000;
    }
    return tmp;
  }

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

  public static list<T> (... values : T[]) : ImmutableList<T> {
    let list : ArrayList<T> = new ArrayList<T>(new AllFieldCollectable<T>());
    for (let loop : number = 0; loop < values.length; loop++) {
      let tmp : T = values [loop];
      list.add (tmp);
    }
    return list.immutableList();
  }

  public static emptyList<T> () : ImmutableList<T> {
    let list : ArrayList<T> = new ArrayList<T>(new AllFieldCollectable<T>());
    return list.immutableList();
  }

  public static emptySet<T> () : ImmutableSet<T> {
    let tmp : HashSet<T> = new HashSet<T>(new AllFieldHashable<T>());
    return tmp.immutableSet();
  }

  public static emptyMap<K,V> () : ImmutableMap<K,V> {
    let tmp : HashMap<K,V> = new HashMap<K,V>(new AllFieldHashable<K>());
    return tmp.immutableMap();
  }

}
