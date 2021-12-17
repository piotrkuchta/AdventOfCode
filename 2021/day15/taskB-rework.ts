import {appendFileSync, readFileSync, writeFileSync} from 'fs';

function parseInput(s: string) {
    return s.split('')
        .map(Number);
}

const input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));


let map = Array(input.length * 5).fill([]).map(() => Array(input[0].length * 5).fill(0));
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        map[i][j] = input[i % input.length][j % input[0].length] + Math.floor(i / input.length) + Math.floor(j / input[0].length)
        map[i][j] = map[i][j] > 9 ? map[i][j] - 9 : map[i][j];
    }
}

let lowest = Array(map.length).fill([]).map(() => Array(map[0].length).fill(Infinity));
lowest[0][0] = 0;

let queue = [];
queue.push({i: 0, j: 0, v: 0})
let curr = queue.shift();

while (curr !== undefined && !(curr.i === map.length - 1 && curr.j === map[0].length - 1)) {
    let i = curr.i;
    let j = curr.j;
    let value = curr.v;

    if (i > 0 && lowest[i - 1][j] > value + map[i - 1][j]) {
        let item = {i:i - 1, j:j, v:value + map[i - 1][j]};
        lowest[item.i][item.j] = item.v;
        queue.push(item)
    }

    if (i < lowest.length - 1 && lowest[i + 1][j] > value + map[i + 1][j]) {
        let item = {i:i + 1, j:j, v:value + map[i + 1][j]};
        lowest[item.i][item.j] = item.v;
        queue.push(item)
    }

    if (j > 0 && lowest[i][j - 1] > value + map[i][j - 1]) {
        let item = {i:i, j:j - 1, v:value + map[i][j - 1]};
        lowest[item.i][item.j] = item.v;
        queue.push(item)
    }

    if (j < lowest.length - 1 && lowest[i][j + 1] > value + map[i][j + 1]) {
        let item = {i:i, j:j + 1, v:value + map[i][j + 1]};
        lowest[item.i][item.j] = item.v;
        queue.push(item)
    }

    queue.sort((a, b) => lowest[a.i][a.j] - lowest[b.i][b.j]);
    // console.log(curr);
    curr = queue.shift();
}
// writeFileSync("output.txt", '');
// lowest.forEach(l => {
//     appendFileSync("output.txt", l.join('\t') + '\n');
// })

console.table(lowest[lowest.length - 1][lowest[0].length - 1]);
traverse(lowest.length - 1, lowest.length - 1);


for (let i = 0; i < lowest.length; i++) {
    for (let j = 0; j < lowest[i].length; j++) {
        if (lowest[i][j] !== '#') {
            lowest[i][j] = '.';
        }
    }
}

writeFileSync("output.txt", '');
lowest.forEach(l => {
    appendFileSync("output.txt", l.join(' ') + '\n');
})

function traverse(i, j) {
    if (!(i === 0 && j === 0 )) {
        let dirs = [
            {value: i > 0 ? lowest[i - 1][j] : Infinity, go: () => (traverse(i - 1, j))},
            {value: i < lowest.length - 1 ? lowest[i + 1][j] : Infinity, go: () => (traverse(i + 1, j))},
            {value: j > 0 ? lowest[i][j - 1] : Infinity, go: () => (traverse(i, j - 1))},
            {value: j < lowest.length - 1 ? lowest[i][j + 1] : Infinity, go: () => (traverse(i, j + 1))},
        ]
        dirs.sort((a, b) => a.value - b.value);
        dirs[0].go.call(this);
    }
    lowest[i][j] = '#';
}

