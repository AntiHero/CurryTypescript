/**
 * With the help of this utility type we can check how much args still have to be passed to our function
 * https://medium.com/codex/currying-in-typescript-ca5226c85b85
 */
type RemainingParameters<
  Provided extends any[],
  Expected extends any[]
> = Expected extends [infer E1, ...infer EX]
  ? Provided extends [infer P1, ...infer PX]
    ? RemainingParameters<PX, EX>
    : Expected
  : [];

type Curry<
  Fn extends (...args: any[]) => any,
  Expected extends any[] = Parameters<Fn>
> = <Provided extends Partial<Expected>>(
  ...args: Provided
) => RemainingParameters<Provided, Expected> extends []
  ? ReturnType<Fn>
  : Curry<Fn, RemainingParameters<Provided, Expected>>;

export function curry<Fn extends (...args: any[]) => any>(func: Fn): Curry<Fn>;

export function curry(fn: (...args: any[]) => any): any {
  return function curried(...args: any[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...restArgs: any[]) {
        return curried(...args.concat(restArgs));
      };
    }
  };
}
