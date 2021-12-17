import {readFileSync} from 'fs';

// target area: x=20..30, y=-10..-5
function parseInput(s: string) {
    let strings = s.split(': ');
    let data = strings[1].split(', ');
    let x = data[0].split('=')[1].split('..');
    let y = data[1].split('=')[1].split('..');
    return {x: Number(x[0]), x1: Number(x[1]), y: Number(y[0]), y1: Number(y[1])};
}

const target = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s))
    [0];

console.log(target);

//find x

let xs = [];
for (let startX = 0; startX <= target.x1; startX++) {
    let currXd = startX;
    let currX = 0;
    let step = 0;
    do {
        currX += currXd;
        currXd--;
        step++;
        if (currX >= target.x && currX <= target.x1) {
            xs.push({startX, step});
        }
    } while (currXd > 0 && currX <= target.x1)

}

console.table(xs);

let ys = [];
for (let startY = 0; startY < 1000; startY++) {
    let currYd = startY;
    let currY = 0;
    let step = 0;
    let high = 0;
    do {
        currY += currYd;
        currYd--;
        high = Math.max(high, currY)
        step++;
        if (currY >= target.y && currY <= target.y1) {
            ys.push({startY, step, currY, high});
        }
    } while (currY >= target.y1)
}

console.table(ys);
let number = Math.max(...ys.map(y => y.high));
console.log(number);