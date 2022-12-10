import { readFileSync } from 'fs';
import { isNumber } from "lodash";

interface Dir {
  [key: string]: Dir | number;
}

const input = readFileSync('input.txt', 'utf-8').split('\n');
let curr = 0;

function parseInput(currObj: Dir = {}) {
  while (true) {
    curr++;

    if (curr >= input.length) {
      return currObj;
    }

    let line = input[curr].split(' ');
    if (line[0] === 'dir') {
      currObj[line[1]] = {};
    } else if (!isNaN(Number(line[0]))) {
      currObj[line[1]] = Number(line[0]);
    } else if (line[1] === 'cd') {
      if (line[2] === '..') {
        return currObj;
      } else {
        currObj[line[2]] = parseInput({});
      }
    }
  }
}

let result = 0;
let fileSystem = parseInput();

function sumDir(dir: any): number {
  let reduce = Object.values(dir).reduce((sum: number, c) => {
    if(isNumber(c)) {
      return sum + c;
    } else {
      return sum + sumDir(c);
    }
  }, 0);

  if (reduce < 100_000) {
    result += reduce;
  }
  return reduce
}

sumDir(fileSystem);

console.log(result);