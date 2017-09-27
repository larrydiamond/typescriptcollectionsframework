import { Comparator } from "./Comparator";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
import { ImmutableMap } from "./ImmutableMap";
import { ImmutableSet } from "./ImmutableSet";
export declare class Collections {
    static getStringComparator(): Comparator<string>;
    static getNumberComparator(): Comparator<number>;
    static getHashCodeForString(o: string): number;
    static getHashCodeForStrings(o: ImmutableCollection<string>): number;
    static getHashCodeForNumber(o: number): number;
    static list<T>(...values: T[]): ImmutableList<T>;
    static emptyList<T>(): ImmutableList<T>;
    static emptySet<T>(): ImmutableSet<T>;
    static emptyMap<K, V>(): ImmutableMap<K, V>;
}
