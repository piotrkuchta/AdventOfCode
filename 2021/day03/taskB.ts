import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const tbl = input.split('\n')
    .filter(Boolean);

let oxygen = new Array(...tbl);
let checkIndexO = 0;

do {
    let count = 0;
    for (let i = 0; i < oxygen.length; i++) {
        count += Number(oxygen[i][checkIndexO]);
    }

    oxygen = oxygen.filter((v) => (v[checkIndexO] === '1') === count >= oxygen.length / 2);

    checkIndexO++;
} while (oxygen.length > 1);

let oxygenD = parseInt(oxygen[0], 2);
console.log(oxygenD)

let carbon = new Array(...tbl);
let checkIndexC = 0;

do {
    let count = 0;
    for (let i = 0; i < carbon.length; i++) {
        count += Number(carbon[i][checkIndexC]);
    }

    carbon = carbon.filter((v) => (v[checkIndexC] === '1') === count < carbon.length / 2);

    checkIndexC++;
} while (carbon.length > 1);

let carbonD = parseInt(carbon[0], 2);
console.log(carbonD);

console.log(oxygenD * carbonD);
