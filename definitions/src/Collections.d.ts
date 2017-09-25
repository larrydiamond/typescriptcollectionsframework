import { Comparator } from "./Comparator";
import { ImmutableCollection } from "./ImmutableCollection";
import { ImmutableList } from "./ImmutableList";
export declare class Collections {
    static getStringComparator(): Comparator<string>;
    static getNumberComparator(): Comparator<number>;
    getHashCodeForString(o: string): number;
    getHashCodeForStrings(o: ImmutableCollection<string>): number;
    getHashCodeForNumber(o: number): number;
    stringList(...values: string[]): ImmutableList<string>;
    numberList(...values: number[]): ImmutableList<number>;
}
