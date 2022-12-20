import { readFileSync } from 'fs';
import { head, last } from "lodash";

let rocks = [
  [[2, 0], [3, 0], [4, 0], [5, 0]],
  [[2, 1], [3, 0], [3, 1], [3, 2], [4, 1]],
  [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
  [[2, 0], [2, 1], [2, 2], [2, 3]],
  [[2, 0], [2, 1], [3, 0], [3, 1]],
]


const moves = readFileSync('input.txt', 'utf-8')
  .split('');

console.log(moves);
for (let turn = 62; turn < 150; turn++) {

  let restRocks: number[][][] = []
  let highestPoint = 0;
  let currRock = undefined;

  for (let i = 0; i < Infinity; i++) {
    if (currRock === undefined) {
      currRock = rocks[restRocks.length % 5].map(el => [el[0], el[1] + 4 + highestPoint]);
    }
    if (moves[i % moves.length] === '>' && last(currRock)![0] < 6 && !currRock.some(el => restRocks.some(rock => rock.some(rl => rl[1] === el[1] && rl[0] === el[0] + 1)))) {

      currRock = currRock.map(el => [el[0] + 1, el[1]]);
    }

    if (moves[i % moves.length] === '<' && head(currRock)![0] > 0 && !currRock.some(el => restRocks.some(rock => rock.some(rl => rl[1] === el[1] && rl[0] === el[0] - 1)))) {

      currRock = currRock.map(el => [el[0] - 1, el[1]]);
    }


    if (currRock.some(el => el[1] - 1 === 0 || restRocks.some(rock => rock.some(rl => rl[0] === el[0] && rl[1] === el[1] - 1)))) {
      restRocks.push(currRock);
      highestPoint = Math.max(highestPoint, ...currRock?.map(rl => rl[1]))
      // console.log(currRock);
      currRock = undefined;
    } else {
      currRock = currRock.map(el => [el[0], el[1] - 1]);
    }

    if (restRocks.length >= turn) {
      break;
    }

  }

// console.log(restRocks);
  console.log({turn, highestPoint});
}
//4,294,967,295
//1_000_000_000_000

//62 -> 100
//124 -> 195
//125 -> 195
//126 -> 196
