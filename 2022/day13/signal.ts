import { isArray, isNumber, min } from "lodash";

export type Signal = Signal[] | number[] | number

export const compare = (a: Signal, b: Signal): number => {
  // console.log(`Compare ${a} ${b}`);
  if (isNumber(a) && isNumber(b)) {
    // console.log(`result: ${a - b}`);
    return a - b;
  }
  if (isArray(a) && isArray(b)) {
    for (let i = 0; i < min([a.length, b.length])!; i++) {
      const compared = compare(a[i], b[i]);
      if (compared !== 0) {
        return compared;
      }
    }

    return compare(a.length, b.length);
  }
  if (isNumber(a) && isArray(b)) {
    return compare([a], b);
  }
  if (isArray(a) && isNumber(b)) {
    return compare(a, [b]);
  }

  console.log('lol');
  return 0;
};