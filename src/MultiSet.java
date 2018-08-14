/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {Collection} from "./Collection";
import {ImmutableSet} from "./ImmutableSet";

export interface MultiSet<K> extends ImmutableSet<K>, Collection<K> {

  /**
  * Adds the specified element to this set if it is not already present.
  * @param {K} element element to be added to this set
  * @return {boolean} true if this set did not already contain the specified element
  */
  add (element:K) : boolean;

  /**
  * Returns an ImmutableSet backed by this Set
  */
  immutableSet () : ImmutableSet<K>;
}
