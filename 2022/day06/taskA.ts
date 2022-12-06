import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const number = 3;
for (let i = number; i < input.length; i++) {
  let set = new Set(input.slice(i - number, i));
  if (set.size === number) {
    console.log(i);
    break;
  }
}