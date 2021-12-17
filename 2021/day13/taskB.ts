import {readFileSync} from 'fs';
import {sum} from "lodash";

function parseFolds(s: string) {
    let split = s.split('=');
    return {axis: split[0], coord: Number(split[1])}
}

const folds = readFileSync('folds.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseFolds(s));

function parseDots(s: string) {
    let split = s.split(',');
    return {x: Number(split[0]), y: Number(split[1])}
}

const dots = readFileSync('dots.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseDots(s));

const maxes = folds.reduce(({x, y}, fold) => {
    if (fold.axis === 'x') {
        return {x: Math.max(x, fold.coord * 2 + 1), y};
    }
    return {x, y: Math.max(y, fold.coord * 2 + 1)};
}, {x:0, y:0});

let card = Array(maxes.y).fill([]).map(() => Array(maxes.x).fill(0))

for (let dot of dots) {
    card[dot.y][dot.x] = 1;
}

for (let fold1 of folds) {
    fold(fold1);
    console.log(sum(card.flat()));
}
console.table(card);

function fold({coord, axis}: { coord: number; axis: string }) {
    if (axis === 'y') {
        let length = card.length;
        for (let i = length - 1; i > coord; i--) {
            for (let j = 0; j < card[i].length; j++) {
                let index = length - 1 - i;
                card[index][j] += card[i][j];
                if (card[index][j] !== 0) {
                    card[index][j] /= card[index][j];
                }
            }
            card.pop();
        }
        card.pop();
    }
    if (axis === 'x') {
        let length = card[0].length;
        for (let i = 0; i < card.length; i++) {
            for (let j = length - 1; j >  coord; j--) {
                let index = length - 1 - j;
                card[i][index] += card[i][j];
                if (card[i][index] !== 0) {
                    card[i][index] /= card[i][index];
                }
                card[i].pop();
            }
            card[i].pop();
        }
    }
}


