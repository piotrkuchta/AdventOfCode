import {readFileSync} from 'fs';

const map = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(v => v.split(''))

let number1 = 0;

for (let i = 1; i < map.length; i++) {
    let x = (i * 3) % map[i].length;
    if (map[i][x] === '#') {
        number1++;
    }
}

console.log(number1);
