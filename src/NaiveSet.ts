/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/

import {NaiveMap} from "./NaiveMap";
import {Comparator} from "./Comparator";

export class NaiveSet<K> {
  private datastore:NaiveMap<K,number> = null;

  private comparator:Comparator<K> = null;

  constructor(iComparator:Comparator<K>) {
    this.comparator = iComparator;
  }

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  public add (element:K) : boolean {
    let tmp:number = this.datastore.put(element, 1);
    if (tmp === null)
      return false;
    return true;
  }

  /**
  * Returns the number of elements in this set (its cardinality).
  * @return {number} the number of elements in this set (its cardinality)
  */
  public size () : number {
    return this.datastore.size();
  }

  /**
  * Returns true if this set contains no elements.
  * @return {boolean} true if this set contains no elements
  */
  public isEmpty () : boolean {
    let tmp:number = this.datastore.size();
    if (tmp === 0)
      return true;
    return false;
  }


  /**
  * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
  * @param {K} item object to be checked for containment in this set
  * @return {boolean} true if this set contains the specified element
  */
  public contains (item:K) : boolean {
    let tmp:number = this.datastore.get(item);
    if (tmp === null)
      return false;
    return true;
  }

}
