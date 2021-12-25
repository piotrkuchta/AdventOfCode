import {readFileSync} from 'fs';


function parseInput(s: string): string[] {
    return s.split('');
}

let map = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseInput(s));

let moved = false;
let steps = 0;
do {
    moved = false;
    // console.log(steps);
    // map.forEach(s => console.log(s.join('')))

    let newMap = Array(map.length).fill('.').map(() => new Array(map[0].length).fill('.'));
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            switch (map[i][j]) {
                case '>':
                    if (map[i][(j + 1) % map[i].length] === '.') {
                        newMap[i][(j + 1) % map[i].length] = '>';
                        moved = true;
                    } else {
                        newMap[i][j] = '>';
                    }
                    break;
                case 'v':
                    newMap[i][j] = 'v';
                    break;
            }
        }
    }
    map = newMap;

    // console.log(steps);
    // map.forEach(s => console.log(s.join('')))

    newMap = Array(map.length).fill('.').map(() => new Array(map[0].length).fill('.'));
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            switch (map[i][j]) {
                case '>':
                    newMap[i][j] = '>';
                    break;
                case 'v':
                    if (map[(i + 1) % map.length][j] === '.') {
                        newMap[(i + 1) % map.length][j] = 'v';
                        moved = true;
                    } else {
                        newMap[i][j] = 'v';
                    }
                    break;
            }
        }
    }
    map = newMap;
    steps++;
} while (moved);

console.log(steps)
map.forEach(s => console.log(s.join('')))
