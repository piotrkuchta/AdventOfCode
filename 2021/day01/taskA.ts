import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const res = input.split('\n')
    .map(Number)
    .reduce(({result, prev}, current) => {
        if (current > prev) {
            return {result: result + 1, prev: current};
        }
        return {result, prev: current};
    }, {result: 0, prev: Infinity});

console.log(res.result);
