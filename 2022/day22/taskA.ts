import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { initial, last, max, sample } from 'lodash';
import { createCanvas } from "canvas";


let input = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);


// console.log(input);

let match = last(input)?.matchAll(/(\d*)(R|L)*/g);
let moves = []
for (let match1 of match) {
  moves.push(...[match1[1], match1[2]].filter(Boolean));
}
console.log(moves);

let map = initial(input).map(s => s.split(''));

let directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
let symbols = ['>', 'V', '<', '^'];

let currPos = {row: 0, column: map[0].indexOf('.'), facing: 0};


// const GIFEncoder = require('gifencoder');
// const encoder = new GIFEncoder(max(map.map(r => r.length))!, map.length);
// encoder.createReadStream().pipe(createWriteStream('result.gif'));
// encoder.start();
// encoder.setRepeat(0);
// encoder.setDelay(20);
// encoder.setQuality(1);
//
let width = max(map.map(r => r.length))!;
// const canvas = createCanvas(width, map.length);
// const context = canvas.getContext('2d')

// for (let i = 0; i < map.length; i++) {
//   for (let j = 0; j < map[i].length; j++) {
//     if (map[i][j] === '.') {
//       context.fillStyle = '#ffffff';
//       context.fillRect(j, i, 1, 1);
//     } else if (map[i][j] === '#') {
//       context.fillStyle = '#737373';
//       context.fillRect(j, i, 1, 1);
//     } else {
//       // context.fillStyle = '#000000';
//       // context.fillRect(j, i, 1, 1);
//     }
//   }
// }

map[currPos.row][currPos.column] = 'X'

moves.forEach((move, index) => {
  console.log(move);
  if (move === 'L') {
    currPos.facing = (currPos.facing + 3) % 4
  } else if (move === 'R') {
    currPos.facing = (currPos.facing + 1) % 4
  } else {
    let steps = Number(move);
    for (let i = 0; i < steps; i++) {
      map[currPos.row][currPos.column] = symbols[currPos.facing];
      // context.fillStyle = '#d30000';
      // context.fillRect(currPos.column, currPos.row, 1, 1);
      // encoder.addFrame(context);
      console.log([currPos.row, currPos.column])
      let search = 1;
      while (true) {
        let row = ((currPos.row + directions[currPos.facing][0] * search) + map.length) % map.length;
        if (map[row] !== undefined) {
          let column = ((currPos.column + directions[currPos.facing][1] * search) + width) % width;
          if ([...symbols, '.'].includes(map[row][column])) {
            currPos.row = row;
            currPos.column = column;
            break;
          } else if (map[row][column] === '#') {
            i = steps;
            break;
          }
        }
        search++;
      }
    }
  }
  // console.log(index, moves.length);
  // map.forEach(s => console.log(s.join('')));
  // console.log('');
});

// encoder.finish();

console.log((currPos.row + 1) * 1000 + (currPos.column + 1) * 4 + currPos.facing);

// const buffer = canvas.toBuffer('image/png');
// writeFileSync('./output.png', buffer);