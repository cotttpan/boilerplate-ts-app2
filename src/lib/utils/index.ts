/* tslint:disable:forin no-shadowed-variable */
// ------------------------------------------------------------------
// types
// ------------------------------------------------------------------
export type Func0<R> = () => R;
export type Func1<T1, R> = (a1: T1) => R;
export type Func2<T1, T2, R> = (a1: T1, a2: T2) => R;
export type Func3<T1, T2, T3, R> = (a1: T1, a2: T2, a3: T3) => R;
export type Func4<T1, T2, T3, T4, R> = (a1: T1, a2: T2, a3: T3, a4: T4, ...args: any[]) => R;

// ------------------------------------------------------------------
// lang
// ------------------------------------------------------------------
export function isPlainObject(obj: any) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
}

export function isFunction(target: any) {
    return typeof target === 'function';
}

// ------------------------------------------------------------------
// utils
// ------------------------------------------------------------------
export function noop(..._v: any[]) {/*  */ }

export function identity<T>(v: T) {
    return v;
}

export function constant<T>(v: T) {
    return (..._x: any[]) => v;
}

export function prefixer(prefix: string) {
    return (str: string) => prefix + str;
}

export function not<T extends Function>(predicate: T): T {
    return function () {
        return !predicate.apply(null, arguments);
    } as any;
}

export function existy(v: any) {
    return !(v === null || v === undefined);
}

// ------------------------------------------------------------------
// array / object
// ------------------------------------------------------------------
export function includes<T>(arr: T[], target: T) {
    return arr.indexOf(target) >= 0;
}

export function reverse<T>(arr: T[]) {
    return arr.reverse();
}

export function uniq<T>(arr: T[]) {
    return [...new Set(arr)];
}

export function difference<T>(a1: T[], a2: T[]) {
    return a1.filter(x => a2.indexOf(x) < 0);
}

export function intersection<T>(a1: T[], a2: T[]) {
    return [...new Set([...a1, ...a2])].filter(x => (a1.indexOf(x) > -1 && a2.indexOf(x) > -1));
}

export function makeGroupHash<T, K extends keyof T>(arr: T[], key: K): { [k: string]: T } {
    return arr.reduce((acc, obj) => {
        const k = obj[key];
        acc[k] = obj;
        return acc;
    }, {} as any);
}

export function clone<T extends object>(obj: T): T {
    return Array.isArray(obj) ? obj.slice(0) : Object.assign({}, obj) as any;
}

export function hasOwn(obj: object, target: string) {
    return obj.hasOwnProperty(target);
}

export function omit<T>(src: T, keys: (string | number)[]): Partial<T> {
    const clone = { ...src as any };
    let i = -1;
    const len = keys.length;
    while (++i < len) delete clone[keys[i]];
    return clone;
}

export function pick<T, K extends keyof T>(src: T, keys: K[]): Pick<T, K> {
    const result: any = {};
    let i = -1;
    const len = keys.length;
    while (++i < len) result[keys[i]] = (src as any)[keys[i]];
    return result;
}

export function values<T, K extends keyof T>(src: T) {
    const result: T[K][] = [];
    for (const k in src) {
        result.push(src[k]);
    }
    return result;
}

// ------------------------------------------------------------------
// combinator
// ------------------------------------------------------------------

export function bundle(...fns: Func0<any>[]): Func0<void>;
export function bundle<A1>(...fns: Func1<A1, any>[]): Func1<A1, void>;
export function bundle<A1, A2>(...fns: Func2<A1, A2, any>[]): Func2<A1, A2, void>;
export function bundle<A1, A2, A3>(...fns: Func3<A1, A2, A3, any>[]): Func3<A1, A2, A3, void>;
export function bundle<A1, A2, A3, A4>(...fns: Func4<A1, A2, A3, A4, any>[]): Func4<A1, A2, A3, A4, any> {
    return bundled;
    function bundled() {
        fns.forEach(f => f.apply(null, arguments));
    }
}

export function tap<T>(fn: (v: T) => any) {
    return (val: T) => {
        fn(val);
        return val;
    };
}

export function whenExists<T, R1, R2>(test: T, then: (a: T) => R1, fallback: () => R2) {
    if (existy(test)) return then(test);
    return fallback();
}

