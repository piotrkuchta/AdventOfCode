import { readFileSync } from 'fs';
import {split} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const inputs = input.split('\n')
    .filter(Boolean)
    .map(s => s.split('').map(Number));

let basins = [];

for (let i = 0; i < inputs.length; i++) {
    for (let j = 0; j < inputs[i].length; j++) {
        const curr = inputs[i][j]
        if ((inputs[i + 1] === undefined || inputs[i + 1][j] > curr) &&
            (inputs[i - 1] === undefined || inputs[i - 1][j] > curr) &&
            (inputs[i][j + 1] === undefined || inputs[i][j + 1] > curr) &&
            (inputs[i][j - 1] === undefined || inputs[i][j - 1] > curr)
        ) {
            basins.push(calculateBasin(i, j));
        }
    }
}
basins.sort((a, b) => b - a);
const result = basins[0] * basins[1] * basins[2];

console.log(result);


function fillBasin(i: number, j: number, array: any[][]) {
    if (inputs[i] !== undefined && inputs[i][j] !== undefined && inputs[i][j] !== 9 && array[i][j] === 0) {
        array[i][j] = 1;
        fillBasin(i + 1, j, array);
        fillBasin(i - 1, j, array);
        fillBasin(i, j + 1, array);
        fillBasin(i, j - 1, array);
    }
}

function calculateBasin(i: number, j: number): number {
    let array = Array(inputs.length).fill([]).map(() => Array(inputs[0].length).fill(0));

    fillBasin(i, j, array);

    return array.flat().reduce((sum, curr) => sum + curr, 0);
}

