import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { floor, head, last } from "lodash";

let rocks = [
  [[2, 0], [3, 0], [4, 0], [5, 0]],
  [[2, 1], [3, 0], [3, 1], [3, 2], [4, 1]],
  [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
  [[2, 0], [2, 1], [2, 2], [2, 3]],
  [[2, 0], [2, 1], [3, 0], [3, 1]],
]


const moves = readFileSync('input.txt', 'utf-8')
  .split('');

writeFileSync("heighestB.txt", '');
// console.log(moves);
for (let turn = 1000000000000; turn < 1000000000001; turn++) {

  let cycleFind = new Map<string, {height: number, count: number}>();
  let STEPS = turn;

//62 -> 100
//124 -> 195
//125 -> 195
//126 -> 196

  let restRocksCount = 0;
  let highestPoints = [0, 0, 0, 0, 0, 0, 0];
  let map = Array(100_000).fill([]).map(() => Array(7).fill('.'));
  let currRock = undefined;

  for (let i = 0; i < Infinity; i++) {
    let rockInx = restRocksCount % 5;
    let moveInx = i % moves.length;
    if (currRock === undefined) {
      currRock = rocks[rockInx].map(el => [el[0], el[1] + 4 + Math.max(...highestPoints)]);
    }
    if (moves[moveInx] === '>' && last(currRock)![0] < 6 && !currRock.some(([x, y]) => map[y][x + 1] === '#')) {

      currRock = currRock.map(el => [el[0] + 1, el[1]]);
    }

    if (moves[moveInx] === '<' && head(currRock)![0] > 0 && !currRock.some(([x, y]) => map[y][x - 1] === '#')) {

      currRock = currRock.map(el => [el[0] - 1, el[1]]);
    }


    if (currRock.some(([x, y]) => y - 1 === 0 || map[y - 1][x] === '#')) {
      currRock.forEach(([x, y]) => highestPoints[x] = Math.max(highestPoints[x], y));
      restRocksCount++;
      currRock.forEach(([x, y]) => {
        map[y][x] = '#';
      })
      // console.log(currRock);
      let s = [rockInx, moveInx, highestPoints.map(h => h - Math.min(...highestPoints))].toString();
      if (cycleFind.has(s)) {
        // console.log(s);
        // console.log(cycleFind.get(s));

        let minStep = cycleFind.get(s)?.count!;
        let minStepHeight = cycleFind.get(s)?.height!;
        let lastBeforeCycleHeight = 0;
        let maxStep = 0;
        let maxStepHeight = 0;
        let values = cycleFind.values();
        let next = values.next();
        while (!next.done) {
          let value = next.value;
          console.log(value);
          if (value.count > maxStep) {
            maxStep = value.count;
            maxStepHeight = value.height;
          }
          if (value.count === minStep - 1) {
            lastBeforeCycleHeight = value.height!
            console.log({lastBeforeCycleHeight});
          }
          next = values.next();
        }

        console.log({minStep, minStepHeight, maxStep, maxStepHeight});

        let stepWidth = maxStep - minStep + 1;
        console.log({stepWidth});
        let cycledSteps = STEPS - maxStep;
        console.log({cycledSteps});
        let restHeight = 0;
        cycleFind.forEach(({height, count}) => {
          let restStepsIndex = (cycledSteps % stepWidth) + minStep - 1;
          if (count === restStepsIndex) {
            console.log({restStepsIndex});
            console.log({height, count});
            restHeight = height - lastBeforeCycleHeight;
          }
        })

        let overalHeight = maxStepHeight + (maxStepHeight - lastBeforeCycleHeight) * floor(cycledSteps / stepWidth) + restHeight;
        console.log({maxStepHeight});
        console.log((maxStepHeight - lastBeforeCycleHeight) * floor(cycledSteps / stepWidth));
        console.log({restHeight});
        console.log({turn, overalHeight});
          appendFileSync("heighestB.txt", `{ turn: ${turn}, overalHeight: ${overalHeight} }\n`);
        break;

      } else {
        cycleFind.set(s, {height: Math.max(...highestPoints), count: restRocksCount});
      }
      currRock = undefined;
      if (restRocksCount % 1000 === 0) {
        console.log(restRocksCount);
      }
    } else {
      currRock = currRock.map(el => [el[0], el[1] - 1]);
    }

    if (restRocksCount >= STEPS) {
      break;
    }

  }

}

// console.log(cycleFind.size);
// console.log(restRocksCount);
// console.log(highestPoints);
// console.log(Math.max(...highestPoints));

//4,294,967,295
//1_000_000_000_000

// 1514285714288
// 1645161290316
