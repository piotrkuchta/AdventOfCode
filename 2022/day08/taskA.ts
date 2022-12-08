import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const trees = input.split('\n')
    .filter(Boolean)
    .map(parseInput);

let visible = 0;

for (let i = 0; i < trees.length; i++) {
  for (let j = 0; j < trees.length; j++) {
    if (i === 0 || i === trees.length - 1 || j === 0 || j === trees[i].length - 1) {
      visible++;
      continue;
    }
    let vis = true;
    for (let left = 0; left < j; left++) {
      if (trees[i][left] >= trees[i][j]) {
        vis = false;
        break;
      }
    }
    if (vis) {
      visible++;
      continue;
    }

    vis = true;
    for (let right = trees[i].length - 1; right > j; right--) {
      if (trees[i][right] >= trees[i][j]) {
        vis = false;
        break;
      }
    }
    if (vis) {
      visible++;
      continue;
    }

    vis = true;
    for (let up = 0; up < i; up++) {
      if (i === 1 && j === 2){
        console.log(trees[up][j], trees[up][j] >= trees[i][j]);
      }
      if (trees[up][j] >= trees[i][j]) {
        vis = false;
        break;
      }
    }
    if (vis) {
      visible++;
      continue;
    }

    vis = true;
    for (let down = trees.length - 1; down > i; down--) {
      if (trees[down][j] >= trees[i][j]) {
        vis = false;
        break;
      }
    }
    if (vis) {
      visible++;
      continue;
    }

  }
}

console.log(visible);

function parseInput(line: string): number[] {
    return line.split('')
      .map(Number);
}
