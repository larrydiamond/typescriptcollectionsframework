import { Collectable } from "./Collectable";
import { Comparator } from "./Comparator";
import { Hashable } from "./Hashable";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
export declare class CollectionUtils {
    static getStringComparator(): Comparator<string>;
    static getNumberComparator(): Comparator<number>;
    getHashCodeForString(o: string): number;
    getHashCodeForStrings(o: ImmutableCollection<string>): number;
    getHashCodeForNumber(o: number): number;
    stringList(...values: string[]): ImmutableList<string>;
    numberList(...values: number[]): ImmutableList<number>;
}
export declare class GenericCollectable<T> implements Collectable<T> {
    equals(o1: T, o2: T): boolean;
}
export declare class GenericHashable<T> implements Hashable<T> {
    equals(o1: T, o2: T): boolean;
    hashCode(o: T): number;
}
