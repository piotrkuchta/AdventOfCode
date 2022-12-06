import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');


function lookup(i: number) {
  let found = false;
  for (let j = 0; j < 14; j++) {
    for (let k = j + 1; k < 14; k++) {
      if (input[i - j] === input[i - k]) {
        console.log(j, k);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
  return found;
}

for (let i = 14; i < input.length; i++) {
  let found = lookup(i);
  if (!found) {
    console.log(i + 1);
    break;
  }
}
