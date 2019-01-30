/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */

import {AllFieldCollectable} from "./AllFieldCollectable";
import {ArrayList} from "./ArrayList";
import {BasicMapEntry} from "./BasicMapEntry";
import {Collectable} from "./Collectable";
import {Comparator} from "./Comparator";
import {Hashable} from "./Hashable";
import {HashMap} from "./HashMap";
import {HashMultiSet} from "./HashClasses";
import {HashSet} from "./HashSet";
import {ImmutableCollection} from "./ImmutableCollection";
import {ImmutableList} from "./ImmutableList";
import {ImmutableMap} from "./ImmutableMap";
import {ImmutableMultiSet} from "./ImmutableMultiSet";
import {ImmutableSet} from "./ImmutableSet";
import {JIterator} from "./JIterator";
import {MapEntry} from "../src/MapEntry";

/**
 * This class consists exclusively of static methods that operate on or return collections.
 *
 * It contains polymorphic algorithms that operate on collections, "wrappers", which return a new collection backed by a specified collection, and a few other odds and ends.
 */
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
        if (o2 === undefined)
          return 1;
        if (o1 === null)
          return -1;
        if (o2 === null)
          return 1;
        if (o1 < o2)
          return -1;

        return 1;
      }
    };

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
        if (o2 === undefined)
          return 1;
        if (o1 === null)
          return -1;
        if (o2 === null)
          return 1;
        if (o1 < o2)
          return -1;

        return 1;
      }
    };
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
    const list : ArrayList<T> = new ArrayList<T>();
    return list.immutableList();
  }

  public static emptySet<T> () : ImmutableSet<T> {
    const tmp : HashSet<T> = new HashSet<T>();
    return tmp.immutableSet();
  }

  public static emptyMultiSet<T> () : ImmutableMultiSet<T> {
    const tmp : HashMultiSet<T> = new HashMultiSet<T>();
    return tmp.immutableMultiSet();
  }

  public static emptyMap<K,V> () : ImmutableMap<K,V> {
    const tmp : HashMap<K,V> = new HashMap<K,V>();
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
    };
    return tmp;
  }

/**
 * This method creates a Collectable for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
 */
  public static dynamicCollectable<K> (... values : string []) : Collectable<K> {
    const tmp : Collectable<K> = {
      equals (o1: K, o2: K) : boolean {
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

        for (let loop = 0; loop < values.length; loop++) {
          const a = o1 [values [loop]];
          const b = o2 [values [loop]];

          if (a === undefined) {
            if (b !== undefined) {
              return false;
            }
          }
          if (a === null) {
            if (b !== null) {
              return false;
            }
          }
          if (b === undefined) {
            if (a !== undefined) {
              return false;
            }
          }
          if (b === null) {
            if (a !== null) {
              return false;
            }
          }

          if (JSON.stringify(a) !== JSON.stringify(b)) {
            return false;
          }
        }

        return true;

      }
    }
    return tmp;
  }

/**
 * This method creates a Hashable for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
 */
  public static dynamicHashable<K> (... values : string []) : Hashable<K> {
    const tmp : Hashable<K> = {
      equals (o1: K, o2: K) : boolean {
        // console.log ("Equals dynamic hashable " + JSON.stringify (o1) + " vs " + JSON.stringify (o2));
        if (o1 === undefined) {
          if (o2 === undefined) {
            // console.log ("return true both undefined");
            return true;
          } else {
            // console.log ("return false one undefined");
            return false;
          }
        }
        if (o1 === null) {
          if (o2 === null) {
            // console.log ("return true both null");
            return true;
          } else {
            // console.log ("return false one null");
            return false;
          }
        }
        if ((o2 === null) || (o2 === undefined)) {
          // console.log ("return false null or undefined");
          return false;
        }

        for (let loop = 0; loop < values.length; loop++) {
          const a = o1 [values [loop]];
          const b = o2 [values [loop]];

          // console.log ("field " + values [loop] + " of " + values.length + " - " + JSON.stringify(a) + " vs " + JSON.stringify(b));

          if (a === undefined) {
            if (b !== undefined) {
              // console.log ("return false one undefined");
              return false;
            }
          }
          if (a === null) {
            if (b !== null) {
              // console.log ("return false one null");
              return false;
            }
          }
          if (b === undefined) {
            if (a !== undefined) {
              // console.log ("return false one undefined");
              return false;
            }
          }
          if (b === null) {
            if (a !== null) {
              // console.log ("return false one null");
              return false;
            }
          }

          if (JSON.stringify(a) !== JSON.stringify(b)) {
            // console.log ("stringify notequal");
            return false;
          }
        }

        // console.log ("stringify all stringify equal true");
        return true;

      },
      hashCode (o:K) : number {
        if (o === undefined) return 0;
        if (o === null) return 0;

        let htmp : string = "";
        for (let loop = 0; loop < values.length; loop++) {
          const a = o [values [loop]];
          htmp = htmp + " " + JSON.stringify (a);
        }
        // console.log ("Start of hashcode for " + JSON.stringify(o) + " - " + JSON.stringify(htmp) + " " + Collections.getHashCodeForString(JSON.stringify(htmp)));
        return Collections.getHashCodeForString(JSON.stringify(htmp));
      }
    }
    return tmp;
  }

  /**
   * This method creates a Comparator for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
   */
    public static dynamicComparator<K> (... values : string []) : Comparator<K> {
      const tmp : Comparator<K> = {
        compare(o1:K, o2:K) : number {
          if (o1 === undefined) {
            if (o2 === undefined) {
              return 0;
            } else {
              return -1;
            }
          }

          if (o2 === undefined)
            return 1;

          if (o1 === null) {
            if (o2 === null) {
              return 0;
            } else {
              return -1;
            }
          }

          if (o2 === null)
            return 1;

          for (let loop = 0; loop < values.length; loop++) {
            const a = o1 [values [loop]];
            const b = o2 [values [loop]];

            if (a === undefined) {
              if (b === undefined) {
                return 0;
              } else {
                return -1;
              }
            }
  
            if (b === undefined)
              return 1;

            if (a === null) {
              if (b === null) {
                return 0;
              } else {
                return -1;
              }
            }

            if (b === null)
            return 1;

            if (typeof a === "boolean") {
              const x = Collections.booleanCompare (a, b);
              if (x !== 0)
                return x;
            } else {
              if (typeof a === "string") {
                const x = Collections.stringCompare (a, b);
                if (x !== 0)
                  return x;  
              } else {
                if (typeof a === "number") {
                  const x = Collections.numberCompare (a, b);
                  if (x !== 0)
                    return x;
                } else {
// other types?
                }
    
              }
  
            }

          }

          return 0;
        }
      }
      return tmp;
    }

    private static booleanCompare (a : boolean, b : boolean) {
      if (a === b) {
        return 0;
      }
      if (a === false) {
        return -1;
      } 
      return 1;
    }

    private static numberCompare (a : number, b : number) {
      if (a === b) {
        return 0;
      }
      if (a < b) {
        return -1;
      }
      return 1;
    }

    private static stringCompare (a : string, b : string) {
      return a.localeCompare(b);
    }

  /**
   * Returns an Array of the elements of this Immutable Collection
   */
  public static asArray<T> (icoll : ImmutableCollection<T>) : Array<T> {
    if (icoll === null) return null;
    if (icoll === undefined) return undefined;
    const tmp : Array<T> = new Array<T>(icoll.size());

//    console.log ("AsArray started size = " + icoll.size());
    let offset:number = 0;
    for (const iter:JIterator<T> = icoll.iterator(); iter.hasNext(); ) {
//      console.log ("AsArray iteration offset " + offset);
      const elem : T = iter.next();
      tmp [offset] = elem;
//      console.log ("AsArray iteration " + offset + " " + JSON.stringify(tmp[offset]));
      offset = offset + 1;
    }

    return tmp;
  }

  /**
   * Returns an Array of the elements of this Immutable Map
   */
  public static asArrayMap<K,V> (imap : ImmutableMap<K,V>) : Array<MapEntry<K,V>> {
    if (imap === null) return null;
    if (imap === undefined) return undefined;
    const tmp : Array<MapEntry<K,V>> = new Array<MapEntry<K,V>>(imap.size());

//    console.log ("AsArray started size = " + icoll.size());
    let offset:number = 0;
    for (const iter:JIterator<MapEntry<K,V>> = imap.entrySet().iterator(); iter.hasNext(); ) {
//      console.log ("AsArray iteration offset " + offset);
      const entry : MapEntry<K,V> = iter.next();
      const bme: BasicMapEntry<K,V> = new BasicMapEntry (entry.getKey(), entry.getValue())
      tmp [offset] = bme;
//      console.log ("AsArray iteration " + offset + " " + JSON.stringify(tmp[offset]));
      offset = offset + 1;
    }

    return tmp;
  }

  public static containsValue<K,V> (map : ImmutableMap<K,V>, value : V) : boolean {
    if ((map === null) || (map === undefined)) return false;
    for (const iter:JIterator<MapEntry<K,V>> = map.entrySet().iterator(); iter.hasNext(); )
      if (value === iter.next().getValue())
        return true;
    return false;
  }

}
