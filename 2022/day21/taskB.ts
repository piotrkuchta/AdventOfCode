import { readFileSync } from 'fs';

interface Monkeys {
  [key: string]: { operation: string, resolved: boolean };
}

function parseInput(s: string): Monkeys {

  let strings = s.split(': ');

  let number = Number(strings[1]);

  if (!isNaN(number)) {
    return {[strings[0]]: {operation: strings[1], resolved: true}};
  }

  return {[strings[0]]: {operation: strings[1], resolved: false}};
}

let monkeys = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(s => parseInput(s))
  .reduce((m, c) => ({...m, ...c}), {});

console.log(monkeys);

monkeys['humn'] = {operation: 'X', resolved: true};

let Q: string[] = [];
Q.push('root');
while (Q.length > 0) {
  let currentMonkey = Q.pop()!;

  if (!monkeys[currentMonkey].resolved) {
    let strings = monkeys[currentMonkey].operation!.split(' ');
    if (monkeys[strings[0]].resolved && monkeys[strings[2]].resolved ) {
      if (!isNaN(Number(monkeys[strings[0]].operation)) && !isNaN(Number(monkeys[strings[2]].operation))) {
        switch (strings[1]) {
          case '+':
            monkeys[currentMonkey].operation = (Number(monkeys[strings[0]].operation) + Number(monkeys[strings[2]].operation)).toString();
            break;
          case '-':
            monkeys[currentMonkey].operation = (Number(monkeys[strings[0]].operation) - Number(monkeys[strings[2]].operation)).toString();
            break;
          case '/':
            monkeys[currentMonkey].operation = (Number(monkeys[strings[0]].operation) / Number(monkeys[strings[2]].operation)).toString();
            break;
          case '*':
            monkeys[currentMonkey].operation = (Number(monkeys[strings[0]].operation) * Number(monkeys[strings[2]].operation)).toString();
            break;
        }
      } else {
        switch (strings[1]) {
          case '+':
          case '-':
            monkeys[currentMonkey].operation = `(${monkeys[strings[0]].operation} ${strings[1]} ${monkeys[strings[2]].operation})`;
            break;
          case '/':
          case '*':
            monkeys[currentMonkey].operation = `${monkeys[strings[0]].operation} ${strings[1]} ${monkeys[strings[2]].operation}`;
            break;
          default:
            monkeys[currentMonkey].operation = `${monkeys[strings[0]].operation} ${strings[1]} ${monkeys[strings[2]].operation}`;
        }
      }
      monkeys[currentMonkey].resolved = true;
    }
  }
  if (monkeys[currentMonkey].resolved) {
    console.log({[currentMonkey]: monkeys[currentMonkey].operation});
  } else {
    Q.push(currentMonkey);
    let strings = monkeys[currentMonkey].operation!.split(' ');
    Q.push(strings[0]);
    Q.push(strings[2]);
  }
}

// use https://www.mathpapa.com/algebra-calculator.html to find X