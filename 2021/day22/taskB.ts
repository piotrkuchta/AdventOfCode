import {readFileSync} from 'fs';


function parseInput(s: string) {
    let strings = s.split(' ');
    let cords = strings[1].split(',');
    let x = cords[0].split('=')[1].split('..').map(Number);
    let y = cords[1].split('=')[1].split('..').map(Number);
    let z = cords[2].split('=')[1].split('..').map(Number);
    return {state: strings[0] === 'on', x, y, z};
}

let input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

// console.log(input);
let react: {x: number[], y: number[], z: number[]}[] = [

];

for (let order of input) {
    console.log(order);
    let start = Date.now();
    for (let i = 0; i < react.length; i++){
        let cube = react[i];
        if (order.x[0] <= cube.x[0] && order.x[1] >= cube.x[1] &&
            order.y[0] <= cube.y[0] && order.y[1] >= cube.y[1] &&
            order.z[0] <= cube.z[0] && order.z[1] >= cube.z[1]) {
            react.splice(i, 1);
            i--;
            continue;
        }
        
        if (order.x[0] > cube.x[0] && order.x[0] <= cube.x[1]) {
            react.splice(i, 1, {...cube, x: [cube.x[0], order.x[0] - 1]}, {...cube, x: [order.x[0], cube.x[1]] });
            i--;
            continue;
        }
        if (order.x[1] >= cube.x[0] && order.x[1] < cube.x[1]) {
            react.splice(i, 1, {...cube, x: [cube.x[0], order.x[1]]}, {...cube, x: [order.x[1] + 1, cube.x[1]] });
            i--;
            continue;
        }
        if (order.y[0] > cube.y[0] && order.y[0] <= cube.y[1]) {
            react.splice(i, 1, {...cube, y: [cube.y[0], order.y[0] - 1]}, {...cube, y: [order.y[0], cube.y[1]] });
            i--;
            continue;
        }
        if (order.y[1] >= cube.y[0] && order.y[1] < cube.y[1]) {
            react.splice(i, 1, {...cube, y: [cube.y[0], order.y[1]]}, {...cube, y: [order.y[1] + 1, cube.y[1]] });
            i--;
            continue;
        }
        if (order.z[0] > cube.z[0] && order.z[0] <= cube.z[1]) {
            react.splice(i, 1, {...cube, z: [cube.z[0], order.z[0] - 1]}, {...cube, z: [order.z[0], cube.z[1]] });
            i--;
            continue;
        }
        if (order.z[1] >= cube.z[0] && order.z[1] < cube.z[1]) {
            react.splice(i, 1, {...cube, z: [cube.z[0], order.z[1]]}, {...cube, z: [order.z[1] + 1, cube.z[1]] });
            i--;
            continue;
        }
    }
    if (order.state) {
        react.push({x: order.x, y: order.y, z: order.z})
    }
    console.log(Date.now() - start);
}

let sum = 0;
for (let r of react) {
    sum += (r.x[1] - r.x[0] + 1)*(r.y[1] - r.y[0] + 1)*(r.z[1] - r.z[0] + 1);
}
console.log(sum);