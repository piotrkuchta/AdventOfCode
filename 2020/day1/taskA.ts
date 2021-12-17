import {readFileSync} from 'fs';

const numbers = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(Number)

for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        if (i === j) {
            continue;
        }
        if (numbers[i] + numbers[j] === 2020) {
            console.log(numbers[i] * numbers[j]);
        }
    }
}