import { readFileSync } from 'fs';
import { isNumber } from "lodash";

const input = readFileSync('input.txt', 'utf-8').split('\n');
let curr = 0;

function parseInput(currObj = {}) {
  while (true) {
    curr++;

    if (curr >= input.length) {
      return currObj;
    }

    let line = input[curr].split(' ');
    console.log(line);
    if (line[0] === 'dir') {
      // @ts-ignore
      currObj[line[1]] = {};
    } else if (!isNaN(Number(line[0]))) {
      // @ts-ignore
      currObj[line[1]] = Number(line[0]);
    } else if (line[1] === 'cd') {
      if (line[2] === '..') {
        return currObj;
      } else {
        // @ts-ignore
        currObj[line[2]] = parseInput({});
      }
    }
  }
}

let result = 0;
let fileSystem = parseInput();
console.log(fileSystem)

function sumDir(dir: any): unknown {
  let reduce = Object.values(dir).reduce((sum, c) => {
    if(isNumber(c)) {
      // @ts-ignore
      return sum + c;
    } else {
      // @ts-ignore
      return sum + sumDir(c);
    }
  }, 0);

  console.log(reduce);

  // @ts-ignore
  if (reduce < 100_000) {
    // @ts-ignore
    result += reduce;
  }
  return reduce
}

sumDir(fileSystem);

console.log(result);