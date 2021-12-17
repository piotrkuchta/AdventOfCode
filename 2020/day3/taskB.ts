import {readFileSync} from 'fs';

const map = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(v => v.split(''))

let slopes = [
    {y: 1, x: 1},
    {y: 1, x: 3},
    {y: 1, x: 5},
    {y: 1, x: 7},
    {y: 2, x: 1},
]

let number1 = 1;
for (let slope of slopes) {
    let number2 = 0;
    for (let i = 1; i < map.length / slope.y; i++) {
        let x = (i * slope.x) % map[i].length;
        let y = (i * slope.y);
        if (map[y][x] === '#') {
            number2++;
        }
    }
    console.log(number2);
    number1 *= number2;
}

console.log(number1);
