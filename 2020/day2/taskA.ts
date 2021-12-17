import {readFileSync} from 'fs';

function parseInput(value: string) {
    let strings = value.split(': ');
    let strings1 = strings[0].split(' ');
    let strings2 = strings1[0].split('-');
    return {min: Number(strings2[0]), max: Number(strings2[1]), pattern: strings1[1], password: strings[1]};
}

const numbers = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(v => parseInput(v))

let number1 = numbers
    .filter(({max, min, password, pattern}) => {
        let number = password.split('')
            .filter(s => s === pattern)
            .reduce((acc, c) => acc + 1, 0);
        return number >= min && number <= max;
    })
    .reduce((acc, c) => acc + 1, 0);

console.log(number1);
