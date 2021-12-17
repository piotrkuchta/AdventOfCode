import { readFileSync } from 'fs';
import {last} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const inputs = input.split('\n')
    .filter(Boolean)

const mapping = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>',
}

let sums = [];
for (let i = 0; i < inputs.length; i++) {
    let stack = []
    let corrupted = false;
    let subSum = 0;
    for (let j = 0; j < inputs[i].length; j++) {
        const char = inputs[i][j]
        if (['{', '[', '(', '<'].includes(char)) {
            stack.push(char);
        } else {
            let expected = mapping[stack.pop()!];
            if (expected !== char) {
                corrupted = true;
                break;
            }
        }
    }
    if (!corrupted) {
        while (stack.length > 0) {
            let expected = mapping[stack.pop()!];
            switch (expected) {
                case '}':
                    subSum = subSum * 5 + 3;
                    break;
                case ')':
                    subSum = subSum * 5 + 1;
                    break;
                case '>':
                    subSum = subSum * 5 + 4;
                    break;
                case ']':
                    subSum = subSum * 5 + 2;
                    break;
            }
        }
        //console.log(subSum);
        sums.push(subSum);
    }
}

sums.sort((a, b) => a - b);
let index = Math.floor(sums.length / 2);

console.log(sums[index]);

