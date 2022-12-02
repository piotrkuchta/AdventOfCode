import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const scores = {
  A: { //rock 1
    X: 4,
    Y: 8,  //paper
    Z: 3,
  },
  B: { //paper 2
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: { //scizors 3
    X: 7,
    Y: 2,
    Z: 6,
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
