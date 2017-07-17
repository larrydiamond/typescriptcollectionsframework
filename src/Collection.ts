/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

export interface Collection<T extends Collectable> {
  /*
  Modified from https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html
  Ensures that this collection contains the specified element (optional operation). Returns true if this collection changed as a result of the call. (Returns false if this collection does not permit duplicates and already contains the specified element.)
  Collections that support this operation may place limitations on what elements may be added to this collection. In particular, some collections will refuse to add null elements, and others will impose restrictions on the type of elements that may be added. Collection classes should clearly specify in their documentation any restrictions on what elements may be added.

  If a collection refuses to add a particular element for any reason other than that it already contains the element, it must throw an exception (rather than returning false). This preserves the invariant that a collection always contains the specified element after this call returns.

  Parameters:
  t - element whose presence in this collection is to be ensured
  Returns:
  true if this collection changed as a result of the call
  */
  add (t:T) : boolean;

  /*
  Modified from https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html
  Returns the number of elements in this collection.
  Returns:
  the number of elements in this collection
  */
  size () : number;

  /*
  Modified from https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html
  Removes all of the elements from this collection (optional operation). The collection will be empty after this method returns.
  */
  clear ();

  /*
  Modified from https://docs.oracle.com/javase/8/docs/api/java/util/Collection.html
  Returns true if this collection contains no elements.
  */
  isEmpty () : boolean;
}
