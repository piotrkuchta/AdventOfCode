import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const scores = {
  A: { //rock 1
    X: 3, //lose 0
    Y: 4, //draw 3
    Z: 8, //win 6
  },
  B: { //paper 2
    X: 1, //lose 0
    Y: 5, //draw 3
    Z: 9, //win 6
  },
  C: { //scizors 3
    X: 2, //lose 0
    Y: 6, //draw 3
    Z: 7, //win 6
  }
}

const res = input.split('\n')
  .filter(Boolean)
  .map(parseInput)
  .reduce((score, {opponent, you}) => score + scores[opponent][you], 0);

console.log(res);

function parseInput(inputLine: string): { opponent: 'A' | 'B' | 'C'; you: 'X' | 'Y' | 'Z' } {
  const splitted = inputLine.split(' ');

  // @ts-ignore
  return {opponent: splitted[0], you: splitted[1]};
}
