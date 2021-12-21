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

let play1 = play(ps, pp, turn);
console.log(play1);

function play(ps: number[], pp: number[], turn: number) {
    console.log(ps, pp, turn);
    let toMove = [
        1 + 1 + 1,
        1 + 1 + 2,
        // 1 + 1 + 3,
        1 + 2 + 1,
        // 1 + 2 + 2, 1 + 2 + 3,
        // 1 + 3 + 1, 1 + 3 + 2, 1 + 3 + 3,
        2 + 1 + 1,
        // 2 + 1 + 2, 2 + 1 + 3,
        // 2 + 2 + 1, 2 + 2 + 2, 2 + 2 + 3,
        // 2 + 3 + 1, 2 + 3 + 2, 2 + 3 + 3,
        // 3 + 1 + 1, 3 + 1 + 2, 3 + 1 + 3,
        // 3 + 2 + 1, 3 + 2 + 2, 3 + 2 + 3,
        // 3 + 3 + 1, 3 + 3 + 2, 3 + 3 + 3,
    ];
    return toMove.map(n => n + ps[turn] > 10 ? n + ps[turn] - 10 : n + ps[turn])
        .map(nps => {
            let npp = pp[turn] + nps;
            if (npp >= 21) {
                let win = [0, 0]
                win[turn] = 1;
                console.log('win', win);
                return win;
            }
            else {
                let newpp = [...pp];
                newpp[turn] = npp;
                let newps = [...ps];
                newps[turn] = nps;
                return play(newps, newpp, (turn + 1) % 2);
            }
        })
        .reduce((acc, curr) => [acc[0] + curr[0], acc[1] + curr[1]], [0,0]);
}



