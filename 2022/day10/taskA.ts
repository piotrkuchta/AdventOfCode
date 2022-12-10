import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

let signals: number[] = [];
let xs: number[] = [];
let x = 1;

function pushSignal() {
  signals.push(x * (signals.length + 1));
  xs.push(x);
}

input.split('\n')
  .filter(Boolean)
  .forEach(line => {
    if (line === 'noop') {
      pushSignal();
    } else {
      pushSignal();
      pushSignal();
      x = x + Number(line.split(' ')[1]);
    }
  });


console.log(signals[19], signals[59] ,signals[99], signals[139], signals[179], signals[219]);
console.log(xs[19], xs[59] ,xs[99], xs[139], xs[179], xs[219]);
console.log(signals[19] + signals[59] + signals[99] + signals[139] + signals[179] + signals[219]);
// console.log(xs.join(" "));

