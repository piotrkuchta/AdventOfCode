import { readFileSync } from 'fs';
import { inRange } from 'lodash';

const input = readFileSync('input.txt', 'utf-8');


const res = input.split('\n')
  .filter(Boolean)
  .map(parseInput)
  .reduce((score, pair) => {
    if (
      inRange(pair[0][0], pair[1][0], pair[1][1]) ||
      inRange(pair[0][1], pair[1][0], pair[1][1]) ||
      inRange(pair[1][1], pair[0][0], pair[0][1]) ||
      inRange(pair[1][0], pair[0][0], pair[0][1])
    ) {
      return score + 1;
    }

    return score;
  }, 0);

console.log(res);

function parseInput(inputLine: string) {
  const splitted = inputLine.split(',');

  // @ts-ignore
  return splitted.map(e => e.split('-').map(Number));
}
