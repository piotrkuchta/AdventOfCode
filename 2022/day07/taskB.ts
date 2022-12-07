import { readFileSync } from 'fs';
import { isNumber, min } from "lodash";

const input = readFileSync('input.txt', 'utf-8').split('\n');
let curr = 0;
let total = 70_000_000
let need = 30_000_000;

function parseInput(currObj = {}) {
  while (true) {
    curr++;

    if (curr >= input.length) {
      return currObj;
    }

    let line = input[curr].split(' ');
    // console.log(line);
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

let result: unknown[] = [];
let fileSystem = parseInput();
console.log(fileSystem)

function sumDir(dir: any): unknown {
  let reduce = Object.values(dir).reduce((sum, c) => {
    if (isNumber(c)) {
      // @ts-ignore
      return sum + c;
    } else {
      // @ts-ignore
      return sum + sumDir(c);
    }
  }, 0);

  result.push(reduce);
  return reduce
}

let sumAll = sumDir(fileSystem) as number;

let free = total - sumAll;
let toLoose = need - free

console.log(free);
console.log(toLoose);
// @ts-ignore
console.log(sumAll);
// @ts-ignore
console.log(result.filter(r => r >= toLoose));
// @ts-ignore
console.log(min(result.filter(r => r >= toLoose)));