import { readFileSync } from 'fs';
import { chunk } from "lodash";

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

chunk(crt, 40)
  .forEach(line => console.log(line.join('')));

