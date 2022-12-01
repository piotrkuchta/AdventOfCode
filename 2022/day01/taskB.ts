import { readFileSync } from 'fs';
import { sum } from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const res = input.split('\n')
  .map(Number)
  .reduce(({currentElf, biggestElfs}, current) => {
    if (current === 0) {
      return {currentElf: 0, biggestElfs: [...biggestElfs, currentElf].sort((a, b) => b - a).slice(0, 3)};
    }
    return {currentElf: currentElf + current, biggestElfs};
  }, {currentElf: 0, biggestElfs: [0, 0, 0]});

console.log(sum(res.biggestElfs));
