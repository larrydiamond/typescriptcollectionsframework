/**
* @license
* Copyright Larry Diamond 2018 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
*/

import {ArrayList} from "./ArrayList";
import {BasicIteratorResult} from "./BasicIteratorResult";
import {Collections} from "./Collections";
import {Consumer} from "./Consumer";
import {ImmutableCollection} from "./ImmutableCollection";
import {JIterator} from "./JIterator";

/**
 * Decorates a collection of other collection to provide a single unified view.
 *
 * This class corresponds to org.apache.commons.collections4.collection.CompositeCollection
 */


export class CompositeCollection<K> implements ImmutableCollection<K> {

  private impl: CompositeCollectionImpl<K>;

  constructor (... values : ImmutableCollection<K>[]) {
    this.impl = new CompositeCollectionImpl<K> ();

    for (let loop : number = 0; loop < values.length; loop++) {
      const tmp : ImmutableCollection<K> = values [loop];
      if ((tmp !== null) && (tmp !== undefined)) {
        this.impl.add (tmp);
      }
    }
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
      return this.impl.isEmpty();
    }

    /**
    * Returns true if this set contains the specified element.   This method uses the comparator and does not invoke equals
    * @param {K} item object to be checked for containment in this set
    * @return {boolean} true if this set contains the specified element
    */
    public contains (item:K) : boolean {
      return this.impl.contains(item);
    }

    /**
     * Performs the given action for each element until all elements have been processed or the action throws and exception.
     * Exceptions thrown by the action are relayed to the caller
     */
    public forEach (consumer: Consumer<K>) : void {
      return this.impl.forEach(consumer);
    }

    /**
    * Override JSON.stringify handling
    */
    public toJSON () : Array<K> {
      return this.impl.toJSON();
    }

   /**
    * Returns a Java style iterator.   The order of the elements returned by the iterator should not be relied upon.
    * Since the underlying Collections could be modified between the call to hasNext() and next(),
    * there is no guarantee that next() will return a value even if hasNext() returns true.
    * In this scenario then next() will return undefined
    * @return {JIterator<K>} the Java style iterator
    */
    public iterator():JIterator<K> {
      return this.impl.iterator();
    }

    /**
    * Returns a TypeScript style iterator.   The order of the elements returned by the iterator should not be relied upon
    * @return {Iterator<K>} the TypeScript style iterator
    */
    public [Symbol.iterator] ():Iterator<K> {
      return this.impl.tsIterator();
    }
}

/* Java style iterator */
class CompositeCollectionJavaIterator<T> implements JIterator<T> {
  private ic:CompositeCollectionImpl<T>;

  private collit:JIterator<ImmutableCollection<T>>;
  private cloc:ImmutableCollection<T>;

  private locit:JIterator<T>;

  constructor (iic:CompositeCollectionImpl<T>) {
    this.ic = iic;
  }

  public hasNext():boolean {
    if ((this.collit === null) || (this.collit === undefined)) {
      this.collit = this.ic.components.iterator();

      while (true) {
        if (this.collit.hasNext()) {
          this.cloc = this.collit.next();
          this.locit = this.cloc.iterator();
          if (this.locit.hasNext())
            return true;
        } else {
          return false;
        }
      }
    } else {
      if (this.locit.hasNext()) {
        return true;
      } else {
        while (true) {
          if (this.collit.hasNext()) {
            this.cloc = this.collit.next();
            this.locit = this.cloc.iterator();
            if (this.locit.hasNext())
              return true;
          } else {
            return false;
          }
        }
      }
    }
  }

  public next():T {
    if (this.locit.hasNext()) {
      return this.locit.next();
    }
    else
    {
      while (true) {
        if (this.collit.hasNext()) {
          this.cloc = this.collit.next();
          this.locit = this.cloc.iterator();
          if (this.locit.hasNext())
            return this.locit.next();
        } else {
          return undefined;
        }
      }
    }
  }
}

/* TypeScript iterator */
class CompositeCollectionIterator<T> implements Iterator<T> {
  private ic:CompositeCollectionImpl<T>;

  private collit:JIterator<ImmutableCollection<T>>;
  private cloc:ImmutableCollection<T>;

  private locit:JIterator<T>;

  constructor (iic:CompositeCollectionImpl<T>) {
    this.ic = iic;
  }

  // tslint:disable-next-line:no-any
  public next(value?: any): IteratorResult<T> {
    if ((this.collit === null) || (this.collit === undefined)) {
      this.collit = this.ic.components.iterator();

      while (true) {
        if (this.collit.hasNext()) {
          this.cloc = this.collit.next();
          this.locit = this.cloc.iterator();
          if (this.locit.hasNext())
            return new BasicIteratorResult(false, this.locit.next());
        } else {
          return new BasicIteratorResult(true, null);
        }
      }
    } else {
      if (this.locit.hasNext()) {
        return new BasicIteratorResult(false, this.locit.next());
      } else {
        while (true) {
          if (this.collit.hasNext()) {
            this.cloc = this.collit.next();
            this.locit = this.cloc.iterator();
            if (this.locit.hasNext())
              return new BasicIteratorResult(false, this.locit.next());
          } else {
            return new BasicIteratorResult(true, null);
          }
        }
      }
    }
  }
}

class CompositeCollectionImpl<K> {
  public components: ArrayList<ImmutableCollection<K>>;

  constructor () {
    this.components = new ArrayList<ImmutableCollection<K>>();
  }

  public add (ic : ImmutableCollection<K>) {
    if ((ic !== null) && (ic !== undefined)) {
        this.components.add (ic);
    }
  }

  public size () : number {
    let tempSize:number = 0;

    for (const iter:JIterator<ImmutableCollection<K>> = this.components.iterator(); iter.hasNext(); ) {
      const is:ImmutableCollection<K> = iter.next();
      tempSize = tempSize + is.size();
    }

    return tempSize;
  }

  public isEmpty () : boolean {
    for (const iter:JIterator<ImmutableCollection<K>> = this.components.iterator(); iter.hasNext(); ) {
      const is:ImmutableCollection<K> = iter.next();
      if (!is.isEmpty()) {
        return false;
      }
    }

    return true;
  }

  public contains (item:K) : boolean {
    for (const iter:JIterator<ImmutableCollection<K>> = this.components.iterator(); iter.hasNext(); ) {
      const is:ImmutableCollection<K> = iter.next();
      if (is.contains(item)) {
        return true;
      }
    }

    return false;
  }

  public forEach (consumer: Consumer<K>) : void {
     for (const iter:JIterator<K> = this.iterator(); iter.hasNext(); ) {
       const t:K = iter.next();
       consumer.accept(t);
     }
  }

  public toJSON () : Array<K> {
    return Collections.asArray(this);
  }

  public iterator():JIterator<K> {
    return new CompositeCollectionJavaIterator(this);
  }

  public [Symbol.iterator] ():Iterator<K> {
    return new CompositeCollectionIterator(this);
  }

  public tsIterator ():Iterator<K> {
    return new CompositeCollectionIterator(this);
  }
}
