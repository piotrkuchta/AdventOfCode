import { readFileSync } from 'fs';
import {isEqual} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const crabs: number[] = input.split(',')
    .filter(Boolean)
    .map(Number);

console.log(crabs)

let maxPos: number = Math.max(...crabs);

console.log(maxPos)

let minFuel = Infinity;
for (let i = 0; i < maxPos; i++) {
    let fuel = crabs
        .map(c => Math.abs(c - i))
        .reduce((acc, cur) => acc + cur);
    minFuel = Math.min(minFuel, fuel);
}

console.log(minFuel);