import { readFileSync } from 'fs';
import { max } from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const trees = input.split('\n')
  .filter(Boolean)
  .map(parseInput);

let maxi = 0;


for (let i = 0; i < trees.length; i++) {
  for (let j = 0; j < trees.length; j++) {
    if (i === 0 || i === trees.length - 1 || j === 0 || j === trees[i].length - 1) {
      continue;
    }

    let scores = [0, 0, 0, 0];

    for (let left = j - 1; left >= 0; left--) {
      scores[0]++;
      if (trees[i][left] >= trees[i][j]) {
        break;
      }
    }

    for (let right = j + 1; right < trees.length; right++) {
      scores[1]++;
      if (trees[i][right] >= trees[i][j]) {
        break;
      }
    }

    for (let up = i - 1; up >= 0; up--) {
      scores[2]++;
      if (trees[up][j] >= trees[i][j]) {
        break;
      }
    }

    for (let down = i + 1; down < trees.length; down++) {
      scores[3]++;
      if (trees[down][j] >= trees[i][j]) {
        break;
      }
    }

    let localMax = scores.reduce((p, c) => p*c, 1);
    maxi = max([maxi, localMax])!;
  }
}

console.log(maxi);

function parseInput(line: string): number[] {
  return line.split('')
    .map(Number);
}
