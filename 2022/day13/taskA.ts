import { readFileSync } from 'fs';
import { compare, Signal } from "./signal";


const input = readFileSync('input.txt', 'utf-8');

function parseSignal(inputS: string): Signal[] {
  let s = inputS.split('\n');
  return [JSON.parse(s[0]), JSON.parse(s[1])];
}

let result = input.split('\n\n')
  .filter(Boolean)
  .map(parseSignal)
  .map(([a, b]) => compare(a, b))
  .reduce((s, c, i) => c < 0 ? s + i + 1 : s, 0);

console.log(result);
