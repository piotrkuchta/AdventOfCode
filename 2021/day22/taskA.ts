import {readFileSync} from 'fs';


function parseInput(s: string) {
    let strings = s.split(' ');
    let cords = strings[1].split(',');
    let xs = cords[0].split('=')[1].split('..').map(Number);
    let ys = cords[1].split('=')[1].split('..').map(Number);
    let zs = cords[2].split('=')[1].split('..').map(Number);
    return {state: strings[0] === 'on', x: xs, y: ys, z: zs};
}

let input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

// console.log(input);
let react = {};

for (let order of input) {
    if (order.x[0] < -50 || order.x[1] > 50 || order.y[0] < -50 || order.y[1] > 50 || order.z[0] < -50 || order.z[1] > 50) {
        continue;
    }
    for (let x = order.x[0]; x <= order.x[1]; x++) {
        if (react[x] !== undefined || order.state) {
            if (react[x] === undefined) react[x] = {};
            for (let y = order.y[0]; y <= order.y[1]; y++) {
                if (react[x][y] !== undefined || order.state) {
                    if (react[x][y] === undefined) react[x][y] = {};
                    for (let z = order.z[0]; z <= order.z[1]; z++) {
                        if (react[x][y][z] === undefined && order.state) {
                            react[x][y][z] = 1;
                        }
                        else if (react[x][y][z] !== undefined && !order.state) {
                            react[x][y][z] = undefined;
                        }
                    }
                }
            }
        }
    }
}

let sum = 0;

for (let x in react) {
    for (let y in react[x]) {
        for (let z in react[x][y]) {
            if (react[x][y][z] != undefined) {
                sum++;
            }
        }
    }
}

console.log(sum);