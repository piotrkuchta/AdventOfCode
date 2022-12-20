import { readFileSync } from 'fs';
import { ceil, floor } from "lodash";

let numbers = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map((n, i) => ({value: Number(n) * 811589153, start: i}));

let ring = numbers.length;

let map = [...numbers];

console.log(ring);
console.log(JSON.stringify(map));
console.time('mixin');
for (let i = 0; i < 10; i++) {
  numbers.forEach(number => {
    let currentIndex = map.findIndex(n => n === number);
    map.splice(currentIndex, 1);
    let newIndex = currentIndex + number.value;
    if (number.value < 0 && newIndex <= 0) {
      newIndex += floor(-newIndex / (ring - 1)) * (ring - 1);
    }
    if (number.value > 0 && newIndex >= ring - 1) {
      newIndex = newIndex % (ring - 1);
    }

    map.splice(newIndex, 0, number);

    // console.log(JSON.stringify(map));
  });
}
console.timeLog('mixin');
let indexZero = map.findIndex(n => n.value === 0);
let number1000 = map[(indexZero + 1000) % ring].value;
console.log(number1000);
let number2000 = map[(indexZero + 2000) % ring].value;
console.log(number2000);
let number3000 = map[(indexZero + 3000) % ring].value;
console.log(number3000);
console.log(number1000 + number2000 + number3000);