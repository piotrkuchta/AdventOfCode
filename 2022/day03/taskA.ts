import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const scores = {
  A: { //rock 1
    X: 4,
    Y: 8,  //paper
    Z: 3,
  },
  B: { //paper 2
    X: 1,
    Y: 5,
    Z: 9,
  },
  C: { //scizors 3
    X: 7,
    Y: 2,
    Z: 6,
  }
}

const res = input.split('\n')
  .filter(Boolean)
  .map(parseInput)
  .reduce((sum, ruc) => {
    let h1 = ruc.slice(0, ruc.length / 2);
    let h2 = ruc.slice(ruc.length / 2, ruc.length);

    for (let i = 0; i < h1.length; i++) {
      if (h2.includes(h1[i])) {
        let number = h1[i].charCodeAt(0);
        number = number > 96 ? number - 96 : number - 38
        console.log(h1[i], number);
        return sum + number;
      }
    }

    console.log(h1, h2);

    return ruc.length;
  }, 0);

console.log(res);

function parseInput(inputLine: string) {
  return inputLine.split('');
}
