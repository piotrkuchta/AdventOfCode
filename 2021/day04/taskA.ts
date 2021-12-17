// noinspection NonAsciiCharacters

import { readFileSync } from 'fs';
import {inspect} from "util";

const sequenceInput = readFileSync('sequence.txt', 'utf-8');

const sequence = sequenceInput.split(',')
    .filter(Boolean)
    .map(v => parseInt(v))

// console.log(sequence);

const boardsInput = readFileSync('boards.txt', 'utf-8');

const boards: number[][][] = boardsInput.split('\n')
    .map(line => line.split(' ').filter(Boolean).map(v => parseInt(v)))
    .reduce(({boardsList, currentBoardIndex}, currentLine) => {
        if (currentLine.length === 0) {
            currentBoardIndex++;
        } else {
            if (boardsList[currentBoardIndex] === undefined) {
                boardsList[currentBoardIndex] = []
            }
            boardsList[currentBoardIndex].push(currentLine)
        }


        return {boardsList, currentBoardIndex};
    }, {boardsList: [], currentBoardIndex: 0})
    .boardsList;

// console.log(inspect(boards, false, null, true))

let winner = -1;
let lastCall = -1;
for (let i = 0; i < sequence.length && winner === -1; i++) {
    for (let board of boards) {
        for (let boardLine of board) {
            for (let boardLineElem in boardLine) {
                if (boardLine[boardLineElem] === sequence[i]) {
                    boardLine[boardLineElem] += 100;
                }
            }
        }
    }
    lastCall = sequence[i];
    winner = findWinner(boards)
}

console.log(winner);
console.log(lastCall);
console.log(winnerHash(boards[winner]));
console.log(winnerHash(boards[winner]) * lastCall);

function findWinner(boards: number[][][]) {
    for (let i = 0; i < boards.length; i++) {
        for (let j = 0; j < boards[i].length; j++) {
            if (boards[i][j][0] >= 100 && boards[i][j][1] >= 100 && boards[i][j][2] >= 100 && boards[i][j][3] >= 100 && boards[i][j][4] >= 100) {
                return i;
            }
            if (boards[i][0][j] >= 100 && boards[i][1][j] >= 100 && boards[i][2][j] >= 100 && boards[i][3][j] >= 100 && boards[i][4][j] >= 100) {
                return i;
            }
        }
    }

    return -1;
}

function winnerHash(winner: number[][]) {
    let sum = 0;
    for (let i = 0; i < winner.length; i++) {
        for (let j = 0; j < winner[i].length; j++) {
            if (winner[i][j] < 100) {
                sum += winner[i][j];
            }
        }
    }
    return sum;
}