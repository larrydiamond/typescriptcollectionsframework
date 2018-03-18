import { Hashable } from "./Hashable";
import { ImmutableSet } from "./ImmutableSet";
import { HashSet } from "./HashSet";
import { KeyIterator } from "./LinkedHashMap";
/**
 * Hash table and linked-list implementation of the Set interface with predictable iteration order.
 *
 * This class corresponds to java.util.LinkedHashSet
 */
export declare class LinkedHashSet<K> extends HashSet<K> {
    private initElements;
    private iInitialCapacityLinked;
    private iLoadFactorLinked;
    constructor(iHash?: Hashable<K>, initElements?: ImmutableSet<K>, iInitialCapacityLinked?: number, iLoadFactorLinked?: number);
    newKeyIterator(): KeyIterator<K, any>;
}
