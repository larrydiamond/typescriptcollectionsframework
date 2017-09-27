import { Hashable } from "./Hashable";
export declare class AllFieldHashable<T> implements Hashable<T> {
    equals(o1: T, o2: T): boolean;
    hashCode(o: T): number;
}
