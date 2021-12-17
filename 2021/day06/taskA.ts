import { readFileSync } from 'fs';
import {isEqual} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const squids = input.split(',')
    .filter(Boolean)
    .map(v => parseInt(v));

console.log(squids)

for (let i = 0; i < 80; i++) {
    let currLength = squids.length;
    for (let j = 0; j < currLength; j++) {
        if (squids[j] === 0) {
            squids[j] = 6;
            squids.push(8);
        } else {
            squids[j]--;
        }
    }
    // console.log(squids);
}
console.log(squids.length);
