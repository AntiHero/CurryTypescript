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
      return function (...additionArgs: any[]) {
        return curried(...[...args, ...additionArgs]);
      };
    }
  };
}
