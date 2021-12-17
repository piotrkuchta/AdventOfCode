import {appendFileSync, readFileSync, writeFileSync} from 'fs';

function parseInput(s: string) {
    return s.split('')
        .map(Number);
}

const input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

const number = 5;
let lowest = Array(input.length*number).fill([]).map(() => Array(input[0].length*number).fill(Infinity));

// console.table(lowest);
lowest[0][0] = 0;

for (let i = 0; i < lowest.length; i++) {
    for (let j = 0; j < lowest[0].length; j++) {
        let up = i > 0 ? lowest[i - 1][j] : Infinity;
        let left = j > 0 ? lowest[i][j - 1] : Infinity;
        let cell = input[i%input.length][j%input[0].length] + Math.floor(i / input.length)  + Math.floor(j / input[0].length)
        cell = cell > 9 ? cell - 9 : cell;
        // let candidate = Math.min(up, left) + cell;
        let candidate = cell;
        lowest[i][j] = Math.min(lowest[i][j], candidate);
    }
}

// fillPath(lowest.length - 1, lowest[0].length - 1);

writeFileSync("output.txt", '');
lowest.forEach(l => {
    appendFileSync("output.txt", l.join('\t') + '\n');
})
console.table(lowest[lowest.length - 1][lowest[0].length - 1]);

function fillPath(i: number, j: number) {
    lowest[i][j] = lowest[i][j] * 10;
    if (i === 0 && j === 0) {
        return ;
    }
    let up = i > 0 ? lowest[i - 1][j] : Infinity;
    let left = j > 0 ? lowest[i][j - 1] : Infinity;
    if (up < left) {
        fillPath(i - 1, j);
    } else {
        fillPath(i, j - 1);
    }
}

