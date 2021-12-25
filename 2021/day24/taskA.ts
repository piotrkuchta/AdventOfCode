import {readFileSync} from 'fs';


function parseInput(s: string): { ins: string, a: string, b: string } {
    let s1 = s.split(' ');
    let [ins, a, b] = s1;
    return {ins, a, b};
}

let cmd = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

// for (let number of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
//     let run1 = run(commands, [number]);
//     console.log(run1);
// }

// let inp = 0;
let inp = 52926995971999;
let r = {w: 0, x: 0, y: 0, z: 0};
do {
    let input = inp.toString().split('').map(Number);
    if (input.includes(0)) {
        continue;
    }
    console.log(inp);
    r = run(cmd, input);
} while (r.z !== 0);

function run(commands: { ins: string, a: string, b: string }[], input: number[]) {
    let res = {w: 0, x: 0, y: 0, z: 0};
    for (let {ins, a, b} of commands) {
        switch (ins) {
            case 'inp':
                res[a] = input.shift();
                if (res[a] === undefined) {
                    return res;
                }
                break;
            case 'add':
                res[a] = res[a] + (!isNaN(Number(b)) ? Number(b) : res[b]);
                break;
            case 'mul':
                res[a] = res[a] * (!isNaN(Number(b)) ? Number(b) : res[b]);
                break;
            case 'div':
                res[a] = Math.floor(res[a] / (!isNaN(Number(b)) ? Number(b) : res[b]));
                break;
            case 'mod':
                res[a] = res[a] % (!isNaN(Number(b)) ? Number(b) : res[b]);
                break;
            case 'eql':
                res[a] = (res[a] === (!isNaN(Number(b)) ? Number(b) : res[b])) ? 1 : 0;
                break;
            default:
                break;
        }
        console.log(ins, a, b, res);
    }
    return res;
}


// 10	15
// 12	8
// 15	2
// -9	6
// 15	13
// 10	4
// 14	1
// -5	9
// 14	5
// -7	13
// -12	9
// -10	6
// -1	2
// -11	2
//     [4] = [3]-7
//     [8] = [7]-4
//     [10] = [9]-2
//     [11] = [6]-8
//     [12] = [5]+3
//     [13] = [2]+7
//     [14] = [1]+4
// 52926995971999
// 11811951311485