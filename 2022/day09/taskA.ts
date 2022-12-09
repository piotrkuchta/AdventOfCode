import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8').split('\n')
  .filter(Boolean)
  .map(parseInput)

let H = {x: 0, y: 0};
let T = {x: 0, y: 0};

let visited: Set<string> = new Set;

input.forEach(({direction, value}) => {
  for (let i = 0; i < value; i++) {
    switch (direction) {
      case 'R':
        H = {...H, x: H.x + 1};
        break;
      case 'L':
        H = {...H, x: H.x - 1};
        break;
      case 'U':
        H = {...H, y: H.y + 1};
        break;
      case 'D':
        H = {...H, y: H.y - 1};
    }
    followTH();
    visited.add(JSON.stringify(T));
  }

});

console.log(visited.size);


function followTH() {
  while (true) {
    if ((Math.abs(T.x - H.x) > 0 && Math.abs(T.y - H.y) > 1)||
      (Math.abs(T.x - H.x) > 1 && Math.abs(T.y - H.y) > 0)) {
      T = {...T, x: T.x + (T.x > H.x ? -1 : 1), y: T.y + (T.y > H.y ? -1 : 1)};
    } else if (Math.abs(T.y - H.y) > 1) {
      T = {...T, y: T.y + (T.y > H.y ? -1 : 1)};
    } else if (Math.abs(T.x - H.x) > 1) {
      T = {...T, x: T.x + (T.x > H.x ? -1 : 1)};
    } else {
      return;
    }
  }
}

function parseInput(inputLine: string) {
  const splitted = inputLine.split(' ');

  return {direction: splitted[0], value: Number(splitted[1])};
}