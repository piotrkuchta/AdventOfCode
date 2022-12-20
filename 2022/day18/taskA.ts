import { readFileSync } from 'fs';

type SnailNumber = (SnailNumber | number)[];

function parseInput(s: string) {
  return s.split(',').map(Number);
}

const droplets = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(s => parseInput(s));

// console.log(droplets);

let map = Array(100)
  .fill([])
  .map(() => Array(100)
    .fill([])
    .map(() => Array(100)
      .fill('.')));

droplets.forEach(([x, y, z]) => {
  map[x][y][z] = '#';
});

let number = droplets.reduce((sum, [x, y, z]) => {
  if (map[x + 1][y][z] === '.') {
    sum++;
  }
  if (x === 0 || map[x - 1][y][z] === '.') {
    sum++;
  }
  if (map[x][y + 1][z] === '.') {
    sum++;
  }
  if (y === 0 || map[x][y - 1][z] === '.') {
    sum++;
  }
  if (map[x][y][z + 1] === '.') {
    sum++;
  }
  if (z === 0 || map[x][y][z - 1] === '.') {
    sum++;
  }
  return sum;
}, 0);

console.log(number);