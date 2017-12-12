import { Collectable } from "./Collectable";
import { Comparator } from "./Comparator";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
import { ImmutableMap } from "./ImmutableMap";
import { ImmutableSet } from "./ImmutableSet";
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
    static emptyMap<K, V>(): ImmutableMap<K, V>;
    /**
     * Returns an Collectable made from the Comparator passed in
     */
    static collectableFromComparator<K>(iComp: Comparator<K>): Collectable<K>;
    static dynamicCollectable<K>(...values: string[]): Collectable<K>;
}
