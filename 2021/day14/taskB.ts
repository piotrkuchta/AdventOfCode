import {readFileSync} from 'fs';
import {countBy, sum} from "lodash";

let formula = readFileSync('formula.txt', 'utf-8')
    .split('');

function parseRules(s: string) {
    let split = s.split(' -> ');
    let pair = split[0].split('');
    return {pair, result: split[1], dict: {}};
}

const rules = readFileSync('rules.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseRules(s));

for (let rule of rules) {
    let form = rule.pair
    for (let i = 0; i < 20; i++) {
        let newFormula = [];
        for (let j = 0; j < form.length - 1; j++) {
            newFormula.push(form[j]);
            for (let rule1 of rules) {
                if (form[j] === rule1.pair[0] && form[j + 1] === rule1.pair[1]) {
                    newFormula.push(rule1.result);
                }
            }
        }
        newFormula.push(form[form.length - 1]);
        form = newFormula;
    }
    form.shift();
    form.pop();
    rule.dict = countBy(form);
    // console.log(form.join(''));
    console.log(rule);
}

console.log(formula.join(''));
for (let i = 0; i < 20; i++) {
    let newFormula = [];
    for (let j = 0; j < formula.length - 1; j++) {
        newFormula.push(formula[j]);
        for (let rule of rules) {
            if (formula[j] === rule.pair[0] && formula[j + 1] === rule.pair[1]) {
                newFormula.push(rule.result);
            }
        }
    }
    newFormula.push(formula[formula.length - 1]);
    formula = newFormula;
    console.log(formula.join(''));
}

let numberDictionary = countBy(formula);
for (let i = 0; i < formula.length - 1; i++) {
    for (let rule of rules) {
        if (formula[i] === rule.pair[0] && formula[i + 1] === rule.pair[1]) {
            for (let dictKey in rule.dict) {
                if (numberDictionary[dictKey] === undefined) {
                    numberDictionary[dictKey] = 0;
                }
                numberDictionary[dictKey] += rule.dict[dictKey];
            }
        }
    }
}
let quant = Object.values(numberDictionary);
quant.sort((a, b) => b - a);
console.log(quant[0] - quant[quant.length - 1]);
