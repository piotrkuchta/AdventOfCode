import {readFileSync} from 'fs';
import {inspect} from "util";
import {isArray, isNumber, split} from "lodash";

type SnailNumber = (SnailNumber | number)[];

const input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => JSON.parse(s));

// console.log(inspect(input, {showHidden: false, depth: null, colors: true}));

let result: SnailNumber = [];

for (let inputElement of input) {
    if (result.length === 0) {
        result = inputElement;
    } else {
        result = [result, inputElement];
    }

    console.log(inspect(inputElement, {showHidden: false, depth: null, colors: true}));
    // console.log(inspect(result, {showHidden: false, depth: null, colors: true}));
    let valid = false
    while (!valid){
        while (reduceResult(result));
        if (splitResult(result)) {
            continue;
        }
        valid = true;
    }

    console.log(inspect(result, {showHidden: false, depth: null, colors: true}));
}

console.log(magnitude(result));

function magnitude(result: SnailNumber) {
    if (isArray(result)) {
        return magnitude(result[0]) * 3 + magnitude(result[1]) * 2;
    } else {
        return result;
    }
}

function splitResult(result: SnailNumber): boolean {
    let splitted = false;
    for (let i = 0; i < result.length; i++){
        if (isArray(result[i])) {
            splitted = splitted || splitResult(result[i]);
        }
        else {
            let number = Number(result[i]);
            if (number >= 10) {
                result[i] = [Math.floor(number / 2), Math.ceil(number / 2)];
                splitted = true;
            }
        }
        if (splitted) {
            return splitted;
        }
    }
    return splitted;
}

function reduceResult(result: SnailNumber) {
    let numbersToLeft = []
    let numberToRight = undefined;
    let reduced = false;
    for (let i = 0; isArray(result) && i < result.length; i++) {
        if (isNumber(result[i])) numbersToLeft.push([i]);
        if (numberToRight !== undefined && isNumber(result[i])) {
            result[i] += numberToRight;
            return true;
        }
        for (let j = 0; isArray(result[i]) && j < result[i].length; j++) {
            if (isNumber(result[i][j])) numbersToLeft.push([i, j]);
            if (numberToRight !== undefined && isNumber(result[i][j])) {
                result[i][j] += numberToRight;
                return true;
            }
            for (let k = 0; isArray(result[i][j]) && k < result[i][j].length; k++) {
                if (isNumber(result[i][j][k])) numbersToLeft.push([i, j, k]);
                if (numberToRight !== undefined && isNumber(result[i][j][k])) {
                    result[i][j][k] += numberToRight;
                    return true;
                }
                for (let l = 0; isArray(result[i][j][k]) && l < result[i][j][k].length; l++) {
                    if (isNumber(result[i][j][k][l])) numbersToLeft.push([i, j, k, l]);
                    if (numberToRight !== undefined && isNumber(result[i][j][k][l])) {
                        result[i][j][k][l] += numberToRight;
                        return true;
                    }
                    if (numberToRight !== undefined && isArray(result[i][j][k][l])) {
                        result[i][j][k][l][0] += numberToRight;
                        return true;
                    }
                    if (isArray(result[i][j][k][l]) && numberToRight === undefined) {
                        let pop = numbersToLeft.pop();
                        if (pop !== undefined) {
                            switch (pop.length){
                                case 1:
                                    result[pop[0]] += result[i][j][k][l][0];
                                    break;
                                case 2:
                                    result[pop[0]][pop[1]] += result[i][j][k][l][0];
                                    break;
                                case 3:
                                    result[pop[0]][pop[1]][pop[2]] += result[i][j][k][l][0];
                                    break;
                                case 4:
                                    result[pop[0]][pop[1]][pop[2]][pop[3]] += result[i][j][k][l][0];
                                    break;
                            }
                        }

                        numberToRight = result[i][j][k][l][1];

                        result[i][j][k][l] = 0;
                        reduced = true;
                    }
                }
            }
        }
    }
    return reduced;
}
