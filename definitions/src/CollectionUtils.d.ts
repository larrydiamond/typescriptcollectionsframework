import { Collectable } from "./Collectable";
import { Comparator } from "./Comparator";
import { Hashable } from "./Hashable";
export declare class CollectionUtils {
    static getStringComparator(): Comparator<string>;
    static getNumberComparator(): Comparator<number>;
}
export declare class GenericCollectable<T> implements Collectable<T> {
    equals(o1: T, o2: T): boolean;
}
export declare class GenericHashable<T> implements Hashable<T> {
    equals(o1: T, o2: T): boolean;
    hashCode(o: T): number;
}
