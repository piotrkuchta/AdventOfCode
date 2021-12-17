import {readFileSync} from 'fs';

const numbers = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(Number)

for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
        for (let k = 0; k < numbers.length; k++) {
            if (i === j || i === k || j === k) {
                continue;
            }
            if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                console.log(numbers[i] * numbers[j] * numbers[k]);
            }
        }
    }
}