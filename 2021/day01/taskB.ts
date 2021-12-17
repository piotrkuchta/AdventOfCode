import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const res = input.split('\n')
    .map(Number)
    .reduce(({result, p1, p2, p3}, c) => {
        if ((c + p1 + p2) > (p1 + p2 + p3)) {
            return {result: result + 1, p1: c, p2: p1, p3: p2}; //sliding window of 3 previous values
        }
        return {result, p1: c, p2: p1, p3: p2};
    }, {result: 0, p1: Infinity, p2: Infinity, p3: Infinity});

console.log(res.result);
