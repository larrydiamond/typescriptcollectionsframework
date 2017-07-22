/**
* @license
* Copyright Larry Diamond 2017 All Rights Reserved.
*
* Use of this source code is governed by an MIT-style license that can be
* found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
*/
import { Collection } from "./Collection";
import { Collectable } from "./Collectable";
export interface Queue<K extends Collectable> extends Collection<K> {
}
