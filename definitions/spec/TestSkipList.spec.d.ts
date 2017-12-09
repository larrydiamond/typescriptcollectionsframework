export declare class testNumber {
    static equals(failMessage: string, val: number, expected: number): void;
    static notNullOrUndefined(failMessage: string, val: number): void;
}
export declare class testString {
    static equals(failMessage: string, val: string, expected: string): void;
    static notNullOrUndefined(failMessage: string, val: string): void;
}
export declare class testBoolean {
    static equals(failMessage: string, val: boolean, expected: boolean): void;
    static equalsTrue(failMessage: string, val: boolean): void;
    static equalsFalse(failMessage: string, val: boolean): void;
    static notNullOrUndefined(failMessage: string, val: boolean): void;
}
export declare class test {
    static equals(failMessage: string, val: any, expected: any): void;
    static notNullOrUndefined(failMessage: string, val: any): void;
    static notNull(failMessage: string, val: any): void;
    static notUndefined(failMessage: string, val: any): void;
}
