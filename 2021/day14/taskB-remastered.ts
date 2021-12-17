import {readFileSync} from 'fs';
import {countBy, merge, sum} from "lodash";
import Dict = NodeJS.Dict;

let formula = readFileSync('formula.txt', 'utf-8');

function parseRules(s: string) {
    let split = s.split(' -> ');
    return { [split[0]]: {result: split[1], dict: [{[split[0][0]]: 1}]}};
}

const rules = readFileSync('rules.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .map(s => parseRules(s))
    .reduce((acc, curr) => {
        return {...acc, ...curr};
    }, {})

// console.log(rules);

let numberDictionary: Dict<number> = countAll(formula, 40);
numberDictionary[formula[formula.length - 1]]++;
let quant = Object.values(numberDictionary);
quant.sort((a, b) => b - a);
console.log(quant[0] - quant[quant.length - 1]);

function countAll(form: string, depth: number) {
    let dict = {};
    for (let i = 0; i < form.length - 1; i++) {
        let pair = form.substring(i, i + 2)
        if (rules[pair].dict[depth] === undefined) {
            rules[pair].dict[depth] = countAll(pair[0] + rules[pair].result + pair[1],depth - 1);
        }
        dict = union(dict, rules[pair].dict[depth]);
    }
    return dict;
}

function union(dict1: Dict<number>, dict2: Dict<number>) {
    let newDict = {...dict1};
    for (let dict2Key in dict2) {
        if (newDict[dict2Key] === undefined) {
            newDict[dict2Key] = 0;
        }
        newDict[dict2Key] += dict2[dict2Key];
    }
    return newDict;
}
