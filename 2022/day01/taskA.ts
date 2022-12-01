import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const res = input.split('\n')
  .map(Number)
  .reduce(({currentElf, biggestElf}, current) => {
    if (current === 0) {
      return {currentElf: 0, biggestElf: currentElf > biggestElf ? currentElf : biggestElf};
    }
    return {currentElf: currentElf + current, biggestElf};
  }, {currentElf: 0, biggestElf: 0});

console.log(res.biggestElf);
