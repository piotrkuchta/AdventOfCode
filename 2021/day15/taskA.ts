import {readFileSync} from 'fs';

function parseInput(s: string) {
    return s.split('')
        .map(Number);
}

const input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

let lowest = Array(input.length).fill([]).map(() => Array(input[0].length).fill(Infinity));

input[0][0] = 0;
lowest[0][0] = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        let up = i > 0 ? lowest[i - 1][j] : Infinity;
        let left = j > 0 ? lowest[i][j - 1] : Infinity;
        let candidate = Math.min(up, left) + input[i][j];
        lowest[i][j] = Math.min(lowest[i][j], candidate);
    }
}

console.table(lowest[input.length - 1][input[0].length - 1]);








function findPath(i: number, j: number, curr: number) {
    if (i === input.length - 1 && j === input[i].length - 1) {
        return curr + input[i][j];
    }
    let down = i < input.length - 1 ? findPath(i + 1, j, curr + input[i][j]) : Infinity;
    let right = j < input[i].length - 1 ? findPath(i, j + 1, curr + input[i][j]) : Infinity;

    return Math.min(down, right);
}

function fillPath(i: number, j: number, curr: number) {
    input[i][j] = curr;
    if (i === input.length - 1 && j === input[i].length - 1) {
        return ;
    }
    i < input.length - 1 ? fillPath(i + 1, j, curr + 1) : 1;
    j < input[i].length - 1 ? fillPath(i, j + 1, curr + 1) : 1;
}