import { readFileSync } from 'fs';

interface Monkeys {
  [key: string]: { operation?: string, number?: number };
}

function parseInput(s: string): Monkeys {

  let strings = s.split(': ');

  let number = Number(strings[1]);

  if (!isNaN(number)) {
    return {[strings[0]]: {number}};
  }

  return {[strings[0]]: {operation: strings[1]}};

}

let monkeys = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(s => parseInput(s))
  .reduce((m, c) => ({...m, ...c}), {});

console.log(monkeys);

let Q: string[] = [];
Q.push('root');
while (Q.length > 0) {
  let currentMonkey = Q.pop()!;

  if (monkeys[currentMonkey].operation !== undefined) {
    let strings = monkeys[currentMonkey].operation!.split(' ');
    if (monkeys[strings[0]].number !== undefined && monkeys[strings[2]].number !== undefined) {
      switch (strings[1]) {
        case '+':
          monkeys[currentMonkey].number = monkeys[strings[0]].number! + monkeys[strings[2]].number!;
          break;
        case '-':
          monkeys[currentMonkey].number = monkeys[strings[0]].number! - monkeys[strings[2]].number!;
          break;
        case '/':
          monkeys[currentMonkey].number = monkeys[strings[0]].number! / monkeys[strings[2]].number!;
          break;
        case '*':
          monkeys[currentMonkey].number = monkeys[strings[0]].number! * monkeys[strings[2]].number!;
          break;
      }
    }
  }
  if (monkeys[currentMonkey].number !== undefined) {
    console.log({[currentMonkey]: monkeys[currentMonkey].number});
  } else {
    Q.push(currentMonkey);
    let strings = monkeys[currentMonkey].operation!.split(' ');
    Q.push(strings[0]);
    Q.push(strings[2]);
  }
}