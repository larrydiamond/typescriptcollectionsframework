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
  * Returns an ImmutableSet backed by this Set
  */
  immutableSet () : ImmutableSet<K>;
}
