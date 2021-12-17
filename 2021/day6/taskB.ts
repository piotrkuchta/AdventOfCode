import {readFileSync} from 'fs';

const input = readFileSync('input.txt', 'utf-8');

let squids = parseInput(input.split(','));

console.table(squids)

for (let i = 0; i < 256; i++) {
    let shift = squids.shift();
    squids[6] += shift;
    squids.push(shift);
}
console.log(squids.reduce((acc, cur) => acc + cur));

function parseInput(inputLine: string[]) {
    return inputLine.reduce((arr, curr) => {
        arr[parseInt(curr)]++;
        return arr;
    }, Array(9).fill(0));
}
