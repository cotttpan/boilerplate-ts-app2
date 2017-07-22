import * as _ from '@utils';

// ------------------------------------------------------------------
// lang
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// utils
// ------------------------------------------------------------------
test('not', () => {
    const predicate = (n: number) => typeof n === 'number';
    expect(_.not(predicate)(1)).toBe(false);
});

// ------------------------------------------------------------------
// array / object
// ------------------------------------------------------------------

test('includes', () => {
    const src = [1, 2, 3];
    expect(_.includes(src, 1)).toBe(true);
    expect(_.includes(src, 4)).toBe(false);
});

test('reverse', () => {
    expect(_.reverse([1, 2, 3])).toEqual([3, 2, 1]);
});

test('uniq', () => {
    expect(_.uniq([1, 2, 1, 3])).toEqual([1, 2, 3]);
});

test('difference', () => {
    const a1 = [1, 2, 3, 4, 5];
    const a2 = [1, 2, 5, 6];
    expect(_.difference(a1, a2)).toEqual([3, 4]);
});

test('intersection', () => {
    const a1 = [1, 2, 3, 4, 5, 6];
    const a2 = [1, 2, 5, 7];
    expect(_.intersection(a1, a2)).toEqual([1, 2, 5]);
});

test('makeGroupHash', () => {
    const src = [{ id: 1 }, { id: 2 }];
    expect(_.makeGroupHash(src, 'id')).toEqual({ 1: { id: 1 }, 2: { id: 2 } });
});


test('omit', () => {
    const obj = { a: 'hello', b: 'world', c: '!!!' };
    const result = _.omit(obj, ['a', 'c']);
    expect(result).toEqual({ b: 'world' });
    expect(obj).toEqual({ a: 'hello', b: 'world', c: '!!!' });
});

test('pick', () => {
    const result = _.pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);
    expect(result).toEqual({ a: 1, c: 3 });
});

test('values', () => {
    const src = { 1: { id: 1 }, 2: { id: 2 } };
    expect(_.values(src)).toEqual([{ id: 1 }, { id: 2 }]);
});

// ------------------------------------------------------------------
// combinator
// ------------------------------------------------------------------
test('bundle', () => {
    const f1 = (a: number) => a;
    const f2 = (a: number, b: string) => a + b;
    const m1 = jest.fn(f1) as typeof f1;
    const m2 = jest.fn(f2) as typeof f2;

    _.bundle(m1, m2)(1, '1');
    expect(m1).toBeCalledWith(1, '1');
    expect(m2).toBeCalledWith(1, '1');
});

test('tap', () => {
    const f = (a: number) => a;
    const m = jest.fn(f) as typeof f;

    expect(_.tap(m)(1)).toBe(1);
    expect(m).toBeCalledWith(1);
});
