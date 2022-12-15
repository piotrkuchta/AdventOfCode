import { appendFileSync, createWriteStream, readFileSync, writeFile, writeFileSync } from 'fs';
import { createCanvas } from "canvas";
import { sample } from "lodash";
import { Gif } from "make-a-gif";

type Rock = { x: number, y: number }[];
type Sand = { x: number, y: number, color: string }[];

const AIR = '.'
const ROCK = '#'
const SAND = 'o'

// const HEIGHT = 170;
const WIDTH = 650;
const START_CANVAS = 300;
let height = 0;

const input = readFileSync('input.txt', 'utf-8');

function parseRock(inputS: string): Rock {
  let s = inputS.split(' -> ');
  return s.map(ss => {
    let y = Number(ss.split(',')[1]);

    height = Math.max(height, y);

    return {x: Number(ss.split(',')[0]), y};
  });
}

let rocks = input.split('\n')
  .filter(Boolean)
  .map(parseRock);

height += 3;

let map = Array(height).fill([]).map(() => Array(WIDTH).fill(AIR));
map[height - 1].fill(ROCK);

rocks.forEach(r => {
  for (let i = 0; i < r.length - 1; i++) {
    if (r[i].x === r[i + 1].x) {
      numberRange(r[i].y, r[i + 1].y).forEach(y => {
        map[y][r[i].x] = ROCK;
      })
    }

    if (r[i].y === r[i + 1].y) {
      numberRange(r[i].x, r[i + 1].x).forEach(x => {
        map[r[i].y][x] = ROCK;
      })
    }
  }
})

// console.log(rocks);

function downPossible(sand: { x: number; y: number }) {
  return map[sand.y + 1][sand.x] === AIR;
}

function downLeftPossible(sand: { x: number; y: number }) {
  // return map[sand.y][sand.x - 1] === AIR && map[sand.y + 1][sand.x - 1] === AIR;
  return map[sand.y + 1][sand.x - 1] === AIR;
}

function downRightPossible(sand: { x: number; y: number }) {
  // return map[sand.y][sand.x + 1] === AIR && map[sand.y + 1][sand.x + 1] === AIR;
  return map[sand.y + 1][sand.x + 1] === AIR;
}


const GIFEncoder = require('gifencoder');
const encoder = new GIFEncoder(WIDTH - START_CANVAS, height);
encoder.createReadStream().pipe(createWriteStream('result.gif'));
encoder.start();
encoder.setRepeat(0);
encoder.setDelay(20);
encoder.setQuality(1);


const canvas = createCanvas(WIDTH - START_CANVAS, height)
const context = canvas.getContext('2d')

// for (let frame = 0; frame < 100; frame++) {
  for (let i = 0; i < map.length; i++) {
    for (let j = START_CANVAS; j < map[i].length; j++) {
      if (map[i][j] === ROCK) {
        context.fillStyle = sample(['#151515', '#1a1a1a', '#1e1e1e', '#070707'])!;
        context.fillRect(j - START_CANVAS, i, 1, 1);
      } else if (map[i][j] === SAND) {
        context.fillStyle = sample(['#f5a742', '#ad7a3b', '#d98c21', '#e8b56e'])!;
        context.fillRect(j - START_CANVAS, i, 1, 1);
      } else {
        context.fillStyle = sample(['#5d5d5d', '#545454', '#565656', '#484848'])!;
        context.fillRect(j - START_CANVAS, i, 1, 1);
      }
    }
  }
// }

let sands = [];
for (let i = 0; i < 20870; i++) {
// for (let i = 0; i < 200; i++) {
  sands.push({x: 500, y: 0, color: sample(['#f5a742', '#ad7a3b', '#d98c21', '#e8b56e'])!, inPlace: false});

  for (let i1 = 0; i1 < sands.length; i1++){
    const sand = sands[i1];
    if (sand.inPlace) continue;
    if (downPossible(sand)) {
      sand.y++;
    } else if (downLeftPossible(sand)) {
      sand.y++;
      sand.x--;
    } else if (downRightPossible(sand)) {
      sand.y++;
      sand.x++;
    } else {
      // console.log('sand');
      sand.inPlace = true;
      map[sand.y][sand.x] = SAND;
    }
  }

  sands.filter(sand => !sand.inPlace).forEach(sand => {
    context.fillStyle = sand.color;
    context.fillRect(sand.x - START_CANVAS, sand.y, 1, 1);
  });
  encoder.addFrame(context);
  console.log(i);
}

encoder.finish();


writeFileSync("output.txt", '');
map.forEach(l => {
  appendFileSync("output.txt", l.join('') + '\n');

})

// const buffer = canvas.toBuffer('image/png');
// writeFileSync('./output.png', buffer);


function numberRange(start: number, end: number) {
  // @ts-ignore
  return new Array(Math.abs(end - start) + 1).fill().map((d, i) => i + (start < end ? start : end));
}