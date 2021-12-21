import {readFileSync} from 'fs';


function parseInput(s: string) {
    return Number(s.split(': ')[1]);
}

let ps = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

let pp = [0, 0];
let turn = 0;

let start = Date.now();
let play1 = play(ps, pp, turn, 1);
console.log(play1);
console.log('Done in', Date.now() - start, 'ms');

function play(ps: number[], pp: number[], turn: number, possibs: number) {
    let toMove = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1]
    // let toMove = [0, 0, 0, 1, 3]
    return toMove
        .map((n, i) => {
            if (i < 3) {
                return [0, 0];
            }
            let nps = i + ps[turn] > 10 ? i + ps[turn] - 10 : i + ps[turn];
            let npp = pp[turn] + nps;
            if (npp >= 21) {
                let win = [0, 0]
                win[turn] = n * possibs;
                return win;
            }
            else {
                let newpp = [...pp];
                newpp[turn] = npp;
                let newps = [...ps];
                newps[turn] = nps;
                return play(newps, newpp, (turn + 1) % 2, possibs * n);
            }
        })
        .reduce((acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]], [0,0]);
}



