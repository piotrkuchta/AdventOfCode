import {appendFileSync, readFileSync, writeFileSync} from 'fs';
import {cloneDeep} from "lodash";

let start = Date.now();
let alghoritm = readFileSync('alghoritm.txt', 'utf-8')
    .split('')
    .filter(Boolean)
    .map(s => s === '#' ? 1 : 0);

let map = readFileSync('map.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => s.split('')
        .filter(Boolean)
        .map(s1 => s1 === '#' ? 1 : 0));


function getInfPixel(steps) {
    if (alghoritm[0] === 0) {
        return 0;
    }
    return alghoritm[steps % 2 ? 0 : alghoritm.length - 1];
}
writeFileSync("output.txt", '');
for (let steps = 0; steps < 50; steps++) {
    console.log(getInfPixel(steps));
    map.forEach(sm => {
        sm.splice(0, 0, getInfPixel(steps));
        sm.push(getInfPixel(steps));
    })
    map.splice(0, 0, Array(map[1].length).fill(getInfPixel(steps)));
    map.push(Array(map[1].length).fill(getInfPixel(steps)))

    map.forEach(l => {
        appendFileSync("output.txt", l.join(' ') + '\n');
    })
    let newMap = cloneDeep(map);
    for (let i = 0; i < newMap.length; i++) {
        for (let j = 0; j < newMap.length; j++) {
            let indexString = "";
            indexString += map[i - 1] !== undefined ? map[i - 1][j - 1] !== undefined ? map[i - 1][j - 1] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i - 1] !== undefined ? map[i - 1][j] !== undefined ? map[i - 1][j] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i - 1] !== undefined ? map[i - 1][j + 1] !== undefined ? map[i - 1][j + 1] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i] !== undefined ? map[i][j - 1] !== undefined ? map[i][j - 1] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i] !== undefined ? map[i][j] !== undefined ? map[i][j] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i] !== undefined ? map[i][j + 1] !== undefined ? map[i][j + 1] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i + 1] !== undefined ? map[i + 1][j - 1] !== undefined ? map[i + 1][j - 1] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i + 1] !== undefined ? map[i + 1][j] !== undefined ? map[i + 1][j] : getInfPixel(steps) : getInfPixel(steps);
            indexString += map[i + 1] !== undefined ? map[i + 1][j + 1] !== undefined ? map[i + 1][j + 1] : getInfPixel(steps) : getInfPixel(steps);
            let newVI = parseInt(indexString, 2);
            newMap[i][j] = alghoritm[newVI];
        }
    }
    map = newMap;
}
map.forEach(l => {
    appendFileSync("output.txt", l.join(' ') + '\n');
})

let reduce = map.flat().reduce((a, c) => a + c, 0);
console.log(reduce, Date.now() - start);

