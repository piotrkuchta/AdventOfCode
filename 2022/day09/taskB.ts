import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8').split('\n')
  .filter(Boolean)
  .map(parseInput)

let R = [
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
];

let visited: Set<string> = new Set;

input.forEach(({direction, value}) => {
  for (let i = 0; i < value; i++) {
    switch (direction) {
      case 'R':
        R[0] = {...R[0], x: R[0].x + 1};
        break;
      case 'L':
        R[0] = {...R[0], x: R[0].x - 1};
        break;
      case 'U':
        R[0] = {...R[0], y: R[0].y + 1};
        break;
      case 'D':
        R[0] = {...R[0], y: R[0].y - 1};
    }
    followTH();
    visited.add(JSON.stringify(R[9]));
  }

});

console.log(visited.size);

function followTH() {
  for (let i = 1; i < R.length; i++) {
    if ((Math.abs(R[i].x - R[i - 1].x) > 0 && Math.abs(R[i].y - R[i - 1].y) > 1)||
      (Math.abs(R[i].x - R[i - 1].x) > 1 && Math.abs(R[i].y - R[i - 1].y) > 0)) {
      R[i] = {...R[i], x: R[i].x + (R[i].x > R[i - 1].x ? -1 : 1), y: R[i].y + (R[i].y > R[i - 1].y ? -1 : 1)};
    } else if (Math.abs(R[i].y - R[i - 1].y) > 1) {
      R[i] = {...R[i], y: R[i].y + (R[i].y > R[i - 1].y ? -1 : 1)};
    } else if (Math.abs(R[i].x - R[i - 1].x) > 1) {
      R[i] = {...R[i], x: R[i].x + (R[i].x > R[i - 1].x ? -1 : 1)};
    } else {
      return;
    }
  }
}

function parseInput(inputLine: string) {
  const splitted = inputLine.split(' ');

  return {direction: splitted[0], value: Number(splitted[1])};
}