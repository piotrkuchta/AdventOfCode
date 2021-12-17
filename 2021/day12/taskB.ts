import {readFileSync} from 'fs';

const input = readFileSync('input.txt', 'utf-8');


const inputs = input.split('\n')
    .filter(Boolean)
    .map(s => s.split('-'));

let map = {};

for (let input1 of inputs) {
    if (map[input1[0]] === undefined) {
        map[input1[0]] = [];
    }
    map[input1[0]].push(input1[1]);
    if (map[input1[1]] === undefined) {
        map[input1[1]] = [];
    }
    map[input1[1]].push(input1[0]);
}

let paths = 0;

gogogo('start', [], false);

console.log(paths);

function gogogo(node: string, visited: string[], oneSmallVisited: boolean) {
    if (node[0] >= 'a' && node[0] <= 'z' && visited.includes(node)) {
        if (oneSmallVisited || node === 'start') {
            return;
        }
        oneSmallVisited = true;
    }
    visited.push(node);
    // console.log(visited, oneSmallVisited);
    if (node === 'end') {
        // console.log(visited);
        paths++;
        return;
    }
    for (let newNode of map[node]) {
        gogogo(newNode, [...visited], oneSmallVisited);
    }
}
