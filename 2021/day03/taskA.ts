import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const tbl = input.split('\n')
    .filter(Boolean);

let counts = new Array(tbl[0].length).fill(0);

for (let i = 0; i < tbl.length; i++) {
    for (let j = 0; j < tbl[i].length; j++) {
        counts[j] += Number(tbl[i][j]);
    }
}

const res = counts.map((count) => count > tbl.length / 2)
    .reduce(({gamma, epsilon}, current) => {
        if (current) {
            return {gamma: gamma + '1', epsilon: epsilon + '0'};
        } else {
            return {gamma: gamma + '0', epsilon: epsilon + '1'};
        }
    }, {gamma: '', epsilon: ''});

console.log(tbl.length);
let ɣ = parseInt(res.gamma, 2);
let ε = parseInt(res.epsilon, 2);
console.log(ɣ * ε);

