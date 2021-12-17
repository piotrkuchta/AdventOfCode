import { readFileSync } from 'fs';
import {isEqual} from "lodash";

const input = readFileSync('input.txt', 'utf-8');

const lines = input.split('\n')
    .filter(Boolean)
    .map(parseInput)
    .filter(line => line.point1.x === line.point2.x || line.point1.y === line.point2.y);

// console.log(lines);

const boardSize = 1000;
let board: number[][] = Array(boardSize).fill([]).map(() => Array(boardSize).fill(0));

lines.forEach(line => {
    let currPoint = {...line.point1};
    do {
        board[currPoint.y][currPoint.x]++;

        currPoint.x += currPoint.x - line.point2.x === 0 ? 0 : currPoint.x - line.point2.x < 0 ? 1 : -1;
        currPoint.y += currPoint.y - line.point2.y === 0 ? 0 : currPoint.y - line.point2.y < 0 ? 1 : -1;

    } while (!isEqual(currPoint, line.point2));
    board[currPoint.y][currPoint.x]++;
})

// console.table(board);

const result = board.flat().reduce((acc, cur) => {
    if (cur > 1) {
        return acc + 1;
    }
    return acc
}, 0);

console.log(result);

function parseInput(inputLine: string) {
    const splitted = inputLine.split(' -> ');
    // console.log(splitted);
    const point1 = splitted[0].split(',');
    // console.log(point1);
    const point2 = splitted[1].split(',');
    // console.log(point2);

    return {
        point1: {x: parseInt(point1[0]), y: parseInt(point1[1])},
        point2: {x: parseInt(point2[0]), y: parseInt(point2[1])},
    };
}
