import { readFileSync } from 'fs';
import { floor } from "lodash";

const input = readFileSync('input.txt', 'utf-8');

function parseInput(input: string) {
  let monkeys = [];
  let lines = input.split('\n');
  for (let i = 0; i < lines.length; i += 7) {
    let items = lines[i + 1].replace('  Starting items: ', '').split(', ').map(Number);
    let operation = lines[i + 2].replace('  Operation: new = old ', '').split(' ');
    let operationOperator = operation[0];
    let operationValue = Number(operation[1]);
    let test = Number(lines[i + 3].replace('  Test: divisible by ', ''));
    let resTrue = Number(lines[i + 4].replace('    If true: throw to monkey ', ''));
    let resFalse = Number(lines[i + 5].replace('    If false: throw to monkey ', ''));

    monkeys.push({
      items,
      operationOperator,
      operationValue,
      test,
      resTrue,
      resFalse,
      activity: 0,
    })
  }

  return monkeys;
}

const monkeys = parseInput(input);

console.time('process')
for (let i = 0; i < 20; i++) {
  for (let i1 = 0; i1 < monkeys.length; i1++) {
    const {
      items,
      operationOperator,
      operationValue,
      test,
      resTrue,
      resFalse,
    } = monkeys[i1];
    while (items.length !== 0) {
      let item = items.shift()!;
      if (operationOperator === '*') {
        item = item * (!isNaN(operationValue) ? operationValue : item);
      } else {
        item = item + operationValue;
      }
      item = floor(item / 3);
      if (item % test === 0) {
        monkeys[resTrue].items.push(item);
      } else {
        monkeys[resFalse].items.push(item);
      }
      monkeys[i1].activity++;
    }
  }

  console.table(monkeys.map(monkey => monkey.items))
}

let numbers = monkeys.map(monkey => monkey.activity).sort((a, b) => b - a);


console.timeEnd('process')
console.table(numbers[0] * numbers[1]);



