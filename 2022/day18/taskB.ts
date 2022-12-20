import { readFileSync } from 'fs';

type Droplet = [number, number, number];

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

let visited = new Set();
let xLength = map.length;
let ylength = map[0].length;
let zlength = map[0][0].length;
let Q: Droplet[] = []; //Queue
Q.push([xLength - 1, ylength - 1, zlength - 1]);
visited.add([xLength - 1, ylength - 1, zlength - 1].toString());

let dx = [-1, 1, 0, 0, 0, 0];
let dy = [0, 0, -1, 1, 0, 0];
let dz = [0, 0, 0, 0, -1, 1];

while (Q.length > 0) {
  let cur: Droplet = Q.shift()!;
  let x = cur[0];
  let y = cur[1];
  let z = cur[2];

  for (let k = 0; k < 6; k++) {
    let newX = x + dx[k];
    let newY = y + dy[k];
    let newZ = z + dz[k];

    if (!visited.has([newX, newY, newZ].toString()) &&
      map[newX] !== undefined &&
      map[newX][newY] !== undefined &&
      map[newX][newY][newZ] !== undefined &&
      map[newX][newY][newZ] === '.') {
      visited.add([newX, newY, newZ].toString());
      map[newX][newY][newZ] = ' ';
      Q.push([newX, newY, newZ]);
    }
  }
}

let number = droplets.reduce((sum, [x, y, z]) => {
  if (map[x + 1][y][z] === ' ') {
    sum++;
  }
  if (x === 0 || map[x - 1][y][z] === ' ') {
    sum++;
  }
  if (map[x][y + 1][z] === ' ') {
    sum++;
  }
  if (y === 0 || map[x][y - 1][z] === ' ') {
    sum++;
  }
  if (map[x][y][z + 1] === ' ') {
    sum++;
  }
  if (z === 0 || map[x][y][z - 1] === ' ') {
    sum++;
  }
  return sum;
}, 0);

console.log(number);