import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { range } from "lodash";

type Rock = { x: number, y: number }[];

const AIR = '.'
const ROCK = '#'
const SAND = 'o'

const HEIGHT = 170;
const WIDTH = 600;

const input = readFileSync('input.txt', 'utf-8');

function parseRock(inputS: string): Rock {
  let s = inputS.split(' -> ');
  return s.map(ss => ({x: Number(ss.split(',')[0]), y: Number(ss.split(',')[1])}));
}

let rocks = input.split('\n')
  .filter(Boolean)
  .map(parseRock);

let map = Array(HEIGHT).fill([]).map(() => Array(WIDTH).fill(AIR));

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

console.log(rocks);

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

let result = 0;
for (let i = 0; i < 100000; i++) {
  let sand = {x: 500, y: 0};
  let overflow = false;

  while (downPossible(sand) || downLeftPossible(sand) || downRightPossible(sand)) {
    if (downPossible(sand)) {
      sand.y++;
    } else if (downLeftPossible(sand)) {
      sand.y++;
      sand.x--;
    } else if (downRightPossible(sand)) {
      sand.y++;
      sand.x++;
    }

    if (sand.y >= HEIGHT - 1) {
      overflow = true;
      break;
    }
  }

  if (overflow) break;
  result++;
  map[sand.y][sand.x] = SAND;
}

console.log(result);

writeFileSync("output.txt", '');
map.forEach(l => {
  appendFileSync("output.txt", l.join('') + '\n');
})

function numberRange (start: number, end: number) {
  // @ts-ignore
  return new Array(Math.abs(end - start) + 1).fill().map((d, i) => i + (start < end ? start : end));
}