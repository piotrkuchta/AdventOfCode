import { readFileSync } from 'fs';
import { compare, Signal } from "./signal";

const input = readFileSync('input.txt', 'utf-8');

let signalA = [[2]];
let signalB = [[6]];

let signals = input.split('\n')
  .filter(Boolean)
  .map(s => JSON.parse(s));

signals.push(signalA, signalB);

signals.sort(compare);

console.log((signals.indexOf(signalA) + 1) * (signals.indexOf(signalB) + 1));