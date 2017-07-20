/**
 * @license
 * Copyright Larry Diamond 2017 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/LICENSE
 */
import { Collectable } from "./Collectable";
import { JIterator } from "./JIterator";
import { List } from "./List";
export declare class ArrayListJIterator<T extends Collectable> implements JIterator<T> {
    private offset;
    private arraylist;
    constructor(iArrayList: ArrayList<T>);
    hasNext(): boolean;
    next(): T;
}
export declare class ArrayList<T extends Collectable> implements List<T>, Iterable<T> {
    elements: T[];
    sizeValue: number;
    add(t: T): boolean;
    clear(): void;
    get(index: number): T;
    indexOf(t: T): number;
    isEmpty(): boolean;
    set(index: number, element: T): T;
    size(): number;
    iterator(): JIterator<T>;
    [Symbol.iterator](): Iterator<T>;
}
export declare class ArrayListIteratorResult<T extends Collectable> implements IteratorResult<T> {
    done: boolean;
    value: T;
    constructor(iDone: boolean, iValue: T);
}
export declare class ArrayListIterator<T extends Collectable> implements Iterator<T> {
    private offset;
    private arraylist;
    constructor(iArrayList: ArrayList<T>);
    next(value?: any): IteratorResult<T>;
}
