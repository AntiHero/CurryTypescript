import { curry } from './curry';

describe('curry', () => {
  it('curried should return exptected value', () => {
    const fn: (...args: [number, number, number, number, number]) => number = (
      a,
      b,
      c,
      d,
      e
    ) => a + b + c + d + e;
    const curried = curry(fn);

    expect(curried(1, 2, 3, 4, 5)).toEqual(15);
    expect(curried(2, 3, 4)(5, 6)).toEqual(20);
    expect(curried(3, 4)(5, 6)(7)).toEqual(25);
    expect(curried(5)(6)(7)(8)(9)).toEqual(35);
  });
});
