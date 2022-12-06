import { readFileSync } from 'fs';
import { isEqual } from "lodash";

const input = readFileSync('input.txt', 'utf-8');


for (let i = 3; i < input.length; i++) {
  if (input[i] !== input[i - 1] && input[i] !== input[i - 2] && input[i] !== input[i - 3] &&
    input[i - 1] !== input[i - 2] && input[i - 1] !== input[i - 3] &&
    input[i - 2] !== input[i - 3]) {
    console.log(i + 1);
    break;
  }
}
