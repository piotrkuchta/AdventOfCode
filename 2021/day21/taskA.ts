import {readFileSync} from 'fs';


function parseInput(s: string) {
    return Number(s.split(': ')[1]);
}

let ps = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

let pp = [0, 0];
let turn = 1;
let rolls = 0;
let currDice = 1;

do {
    turn = (turn + 1) % 2;
    let toMove = roll() + roll() + roll();
    ps[turn] += toMove;
    while (ps[turn] > 10) ps[turn] -= 10;
    pp[turn] += ps[turn];
    console.log(ps[turn], pp[turn]);
} while (pp[turn] < 1000)

turn = (turn + 1) % 2;
let res = pp[turn] * rolls;
console.log(pp[turn], rolls, res);

function roll() {
    let res = currDice++;
    rolls++;
    if (currDice > 100) currDice = 1;
    return res;
}
