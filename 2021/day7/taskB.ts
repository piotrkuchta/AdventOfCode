import { readFileSync } from 'fs';
import {isEqual} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const crabs: number[] = input.split(',')
    .filter(Boolean)
    .map(Number);

let maxPos: number = Math.max(...crabs);
console.log(maxPos)

let minFuel = Infinity;
for (let i = 1; i < maxPos; i++) {
    let fuel = crabs
        .map(c => Math.abs(c - i))
        .reduce((acc, distance) => acc + ((1 + distance) / 2 * distance), 0);
    // console.log(i, fuel);
    minFuel = Math.min(minFuel, fuel);
}

console.log(minFuel);