import {readFileSync} from 'fs';
import {countBy, sum} from "lodash";

let formula = readFileSync('formula.txt', 'utf-8')
    .split('');

function parseRules(s: string) {
    let split = s.split(' -> ');
    let pair = split[0].split('');
    return [...pair, split[1]];
}

const rules = readFileSync('rules.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseRules(s));


console.log(formula.join(''));
for (let i = 0; i < 10; i++) {
    let newFormula = [];
    for (let j = 0; j < formula.length - 1; j++) {
        newFormula.push(formula[j]);
        for (let rule of rules) {
            if (formula[j] === rule[0] && formula[j + 1] === rule[1]) {
                newFormula.push(rule[2]);
            }
        }
    }
    newFormula.push(formula[formula.length - 1]);
    formula = newFormula;
    console.log(formula.join(''));
}

let numberDictionary = countBy(formula);
console.log(numberDictionary);
let quant = Object.values(numberDictionary);
quant.sort((a, b) => b - a);
console.log(quant[0] - quant[quant.length - 1]);

