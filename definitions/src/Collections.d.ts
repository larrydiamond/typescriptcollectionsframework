/**
 * @license
 * Copyright Larry Diamond 2018 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/larrydiamond/typescriptcollectionsframework/blob/master/LICENSE
 */
import { Collectable } from "./Collectable";
import { Comparator } from "./Comparator";
import { Hashable } from "./Hashable";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
import { ImmutableMap } from "./ImmutableMap";
import { ImmutableMultiSet } from "./ImmutableMultiSet";
import { ImmutableSet } from "./ImmutableSet";
/**
 * This class consists exclusively of static methods that operate on or return collections.
 *
 * It contains polymorphic algorithms that operate on collections, "wrappers", which return a new collection backed by a specified collection, and a few other odds and ends.
 */
export declare class Collections {
    /**
     * Returns a Comparator that works correctly for string native objects
     */
    static getStringComparator(): Comparator<string>;
    /**
     * Returns a Comparator that works correctly for number native objects
     */
    static getNumberComparator(): Comparator<number>;
    /**
     * Returns a hash code good for string objects
     */
    static getHashCodeForString(o: string): number;
    /**
     * Returns a hash code good for Collections for objects
     */
    static getHashCodeForStrings(o: ImmutableCollection<string>): number;
    /**
     * Returns a hash code good for number objects
     */
    static getHashCodeForNumber(o: number): number;
    /**
     * Returns an ImmutableList of the entries passed in, using an AllFieldCollectable as the Collectable
     */
    static list<T>(...values: T[]): ImmutableList<T>;
    static emptyList<T>(): ImmutableList<T>;
    static emptySet<T>(): ImmutableSet<T>;
    static emptyMultiSet<T>(): ImmutableMultiSet<T>;
    static emptyMap<K, V>(): ImmutableMap<K, V>;
    /**
     * Returns an Collectable made from the Comparator passed in
     */
    static collectableFromComparator<K>(iComp: Comparator<K>): Collectable<K>;
    /**
     * This method creates a Collectable for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
     */
    static dynamicCollectable<K>(...values: string[]): Collectable<K>;
    /**
     * This method creates a Hashable for a class and prevents you from having to copy and paste and then test and debug all the boilerplate code
     */
    static dynamicHashable<K>(...values: string[]): Hashable<K>;
    /**
     * Returns an Array of the elements of this Immutable Collection
     */
    static asArray<T>(icoll: ImmutableCollection<T>): Array<T>;
    /**
     * JSON stringify for a Map
     */
    static jsonstringify<K, V>(imap: ImmutableMap<K, V>): string;
    static containsValue<K, V>(map: ImmutableMap<K, V>, value: V): boolean;
}
