import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { initial, last, max, sample } from 'lodash';
import { createCanvas } from "canvas";


let input = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

let RIGHT = 0;
let DOWN = 1;
let LEFT = 2;
let UP = 3;

let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
let symbols = ['>', 'V', '<', '^'];

// console.log(input);

let match = last(input)?.matchAll(/(\d*)(R|L)*/g);
let moves = []
for (let match1 of match) {
  moves.push(...[match1[1], match1[2]].filter(Boolean));
}
console.log(moves);

let map = initial(input).map(s => s.split(''));
let connectedMap: { tile: string, directions: [number, number, number][] }[][] = [];
for (let i = 0; i < map.length; i++) {
  connectedMap.push([]);
  for (let j = 0; j < map[i].length; j++) {
    connectedMap[i].push({
      tile: map[i][j],
      directions: [
        [i, j + 1, RIGHT], // right
        [i + 1, j, DOWN], // down
        [i, j - 1, LEFT], // left
        [i - 1, j, UP], // up
      ]
    })
  }
}

// 2 -> 4
for (let i = 0; i < 50; i++) {
  connectedMap[i][149].directions[RIGHT] = [149 - i, 99, LEFT];
}
// 4 -> 2
for (let i = 0; i < 50; i++) {
  connectedMap[i + 100][99].directions[RIGHT] = [49 - i, 149, LEFT];
}
// 2 -> 3
for (let i = 0; i < 50; i++) {
  connectedMap[49][i + 100].directions[DOWN] = [50 + i, 99, LEFT];
}
// 3 -> 2
for (let i = 0; i < 50; i++) {
  connectedMap[50 + i][99].directions[RIGHT] = [49, i + 100, UP];
}
// 4 -> 6
for (let i = 0; i < 50; i++) {
  connectedMap[149][i + 50].directions[DOWN] = [150 + i, 49, LEFT];
}
// 6 -> 4
for (let i = 0; i < 50; i++) {
  connectedMap[150 + i][49].directions[RIGHT] = [149, i + 50, UP];
}
// 6 -> 2
for (let i = 0; i < 50; i++) {
  connectedMap[199][i].directions[DOWN] = [0, i + 100, DOWN];
}
// 2 -> 6
for (let i = 0; i < 50; i++) {
  connectedMap[0][i + 100].directions[UP] = [199, i, UP];
}
// 6 -> 1
for (let i = 0; i < 50; i++) {
  connectedMap[150 + i][0].directions[LEFT] = [0, i + 50, DOWN];
}
// 1 -> 6
for (let i = 0; i < 50; i++) {
  connectedMap[0][i + 50].directions[UP] = [150 + i, 0, RIGHT];
}
// 5 -> 1
for (let i = 0; i < 50; i++) {
  connectedMap[i + 100][0].directions[LEFT] = [49 - i, 50, RIGHT];
}
// 1 -> 5
for (let i = 0; i < 50; i++) {
  connectedMap[i][50].directions[LEFT] = [149 - i, 0, RIGHT];
}
// 5 -> 3
for (let i = 0; i < 50; i++) {
  connectedMap[100][i].directions[UP] = [50 + i, 50, RIGHT];
}
// 3 -> 5
for (let i = 0; i < 50; i++) {
  connectedMap[50 + i][50].directions[LEFT] = [100, i, DOWN];
}


let currPos = {row: 0, column: map[0].indexOf('.'), facing: 0};


const GIFEncoder = require('gifencoder');
const encoder = new GIFEncoder(max(map.map(r => r.length))!, map.length);
encoder.createReadStream().pipe(createWriteStream('resultBB.gif'));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(20);
encoder.setQuality(1);

let width = max(map.map(r => r.length))!;
const canvas = createCanvas(width, map.length);
const context = canvas.getContext('2d')

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === '.') {
      context.fillStyle = '#ffffff';
      context.fillRect(j, i, 1, 1);
    } else if (map[i][j] === '#') {
      context.fillStyle = '#737373';
      context.fillRect(j, i, 1, 1);
    } else {
      // context.fillStyle = '#000000';
      // context.fillRect(j, i, 1, 1);
    }
  }
}

map[currPos.row][currPos.column] = 'X'

let failed = false;
moves.forEach((move, index) => {
  if (failed) return;
  console.log(move);
  if (move === 'L') {
    currPos.facing = (currPos.facing + 3) % 4
  } else if (move === 'R') {
    currPos.facing = (currPos.facing + 1) % 4
  } else {
    let steps = Number(move);
    for (let i = 0; i < steps; i++) {
      map[currPos.row][currPos.column] = symbols[currPos.facing];
      console.log([currPos.row, currPos.column])
      let element = connectedMap[currPos.row][currPos.column];
      context.fillStyle = '#d30000';
      context.fillRect(currPos.column, currPos.row, 1, 1);
      try {
        if (map[element.directions[currPos.facing][0]][element.directions[currPos.facing][1]] !== '#') {
          currPos = {
            row: element.directions[currPos.facing][0],
            column: element.directions[currPos.facing][1],
            facing: element.directions[currPos.facing][2]
          }
        }
      } catch (ex) {
        failed = true;
        return;
      }
    }
  }
  // console.log(index, moves.length);
  // map.forEach(s => console.log(s.join('')));
  // console.log('');
  encoder.addFrame(context);
});

encoder.finish();

console.log((currPos.row + 1) * 1000 + (currPos.column + 1) * 4 + currPos.facing);

// const buffer = canvas.toBuffer('image/png');
// writeFileSync('./output.png', buffer);