/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */

import {Collectable} from "./Collectable";
import {Collection} from "./Collection";

export interface List<T extends Collectable> extends Collection<T> {
  /*
  Modified from https://docs.oracle.com/javase/8/docs/api/java/util/List.html
  Returns the element at the specified position in this list.
  Parameters:
  index - index of the element to return
  Returns:
  the element at the specified position in this list
  */
  get(index:number):T;

  /*
  Modified from https://docs.oracle.com/javase/8/docs/api/java/util/List.html
  Replaces the element at the specified position in this list with the specified element (optional operation).
  Parameters:
  index - index of the element to replace
  element - element to be stored at the specified position
  Returns:
  the element previously at the specified position
  */
  set(index:number, element:T):T;
}
