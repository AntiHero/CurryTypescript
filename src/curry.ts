/**
 * With the help of this utility type we can check how much args still have to be passed to our function
 * https://medium.com/codex/currying-in-typescript-ca5226c85b85
 * E - Expected, P - Provided
 */
type RemainingParameters<P extends any[], E extends any[]> = E extends [
  any,
  ...infer EX
]
  ? P extends [any, ...infer PX]
    ? RemainingParameters<PX, EX>
    : E
  : [];

/**
 * Here we provide Curry type with two generics, last of which defines number of expected arguments
 * with default set to Parameters<Fn> https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype,
 * after that using RemainigParameters type we calculate the remaining tuple type, if it is empty we return ReturnType 
 * of provided function, otherwise we use Curry again (recursively) with second generic (Expected) set to remaining tuple type
 */
type Curry<
  Fn extends (...args: any[]) => any,
  E extends any[] = Parameters<Fn>
> = <P extends Partial<E>>(
  ...args: P
) => RemainingParameters<P, E> extends []
  ? ReturnType<Fn>
  : Curry<Fn, RemainingParameters<P, E>>;

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
