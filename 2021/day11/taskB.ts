import {readFileSync} from 'fs';

const input = readFileSync('input.txt', 'utf-8');


const octs = input.split('\n')
    .filter(Boolean)
    .map(s => s.split('').map(v => ({energy: Number(v), lastFlashed: -1})));

let allFlashed = false;
let step = 0;
while (!allFlashed) {
    for (let i = 0; i < octs.length; i++) {
        for (let j = 0; j < octs[i].length; j++) {
            tryIncrease(i, j);
        }
    }
    for (let i = 0; i < octs.length; i++) {
        for (let j = 0; j < octs[i].length; j++) {
            tryFlash(i, j, step);
        }
    }
    for (let i = 0; i < octs.length; i++) {
        for (let j = 0; j < octs[i].length; j++) {
            if (octs[i][j].energy > 9) {
                octs[i][j].energy = 0;
            }
        }
    }
    allFlashed = true;
    for (let i = 0; i < octs.length; i++) {
        for (let j = 0; j < octs[i].length; j++) {
            allFlashed = allFlashed && octs[i][j].energy === 0;
        }
    }
    step++;
}

console.log(step);

function tryFlash(i: number, j: number, s: number) {
    if (i >= 0 && i < 10 && j >= 0 && j < 10) {
        if (octs[i][j].energy > 9 && octs[i][j].lastFlashed < s) {
            octs[i][j].lastFlashed = s;
            tryIncrease(i + 1, j + 1);
            tryIncrease(i + 1, j);
            tryIncrease(i + 1, j - 1);
            tryIncrease(i - 1, j + 1);
            tryIncrease(i - 1, j);
            tryIncrease(i - 1, j - 1);
            tryIncrease(i, j + 1);
            tryIncrease(i, j - 1);

            tryFlash(i + 1, j + 1, s);
            tryFlash(i + 1, j, s);
            tryFlash(i + 1, j - 1, s);
            tryFlash(i - 1, j + 1, s);
            tryFlash(i - 1, j, s);
            tryFlash(i - 1, j - 1, s);
            tryFlash(i, j + 1, s);
            tryFlash(i, j - 1, s);
        }
    }
}

function tryIncrease(i: number, j: number) {
    if (i >= 0 && i < 10 && j >= 0 && j < 10) {
        octs[i][j].energy++;
    }
}

