import { readFileSync } from 'fs';
import {split} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const inputs = input.split('\n')
    .filter(Boolean)
    .map(s => s.split(''));

let sum = 0;
for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
        const curr = inputs[i][j]
        if ((inputs[i + 1] === undefined || inputs[i + 1][j] > curr) &&
            (inputs[i - 1] === undefined || inputs[i - 1][j] > curr) &&
            (inputs[i][j + 1] === undefined || inputs[i][j + 1] > curr) &&
            (inputs[i][j - 1] === undefined || inputs[i][j - 1] > curr)
        ) {
            sum += Number(curr) + 1;
        }
    }
}


console.log(sum);

