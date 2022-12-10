import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

let x = 1;
let crt = '';

function pushPixel() {
  crt += (Math.abs(crt.length % 40 - x) <= 1) ? '#' : ' ';
}

input.split('\n')
  .filter(Boolean)
  .forEach(line => {
    if (line === 'noop') {
      pushPixel();
    } else {
      pushPixel();
      pushPixel();
      x = x + Number(line.split(' ')[1]);
    }
  });


console.log(crt.substring(0,40));
console.log(crt.substring(40,80));
console.log(crt.substring(80,120));
console.log(crt.substring(120,160));
console.log(crt.substring(160,200));
console.log(crt.substring(200,240));

