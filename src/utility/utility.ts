export function deepCopy<T>(copy: T): T {
    return JSON.parse(JSON.stringify(copy)) as T;
}