import { readFileSync } from 'fs';
import { floor } from "lodash";

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
  .map(parseInput)
  .reduce(({sum, h1, h2}, ruc, index) => {
    console.log(index);
    if (index % 3 == 0) {
      return {sum, h1: ruc, h2: []}
    }
    if (index % 3 == 1) {
      return {sum, h1, h2: ruc}
    }
    let h3 = ruc;

    for (let i = 0; i < h1.length; i++) {
      if (h2.includes(h1[i]) && h3.includes(h1[i])) {
        let number = h1[i].charCodeAt(0);
        number = number > 96 ? number - 96 : number - 38
        console.log(h1[i], number);
        return {sum: sum + number, h1: [], h2: []}
      }
    }

    console.log(h1, h2);

    return {sum, h1: [], h2: []};
  }, {sum: 0, h1: [''], h2: ['']});

console.log(res.sum);



function parseInput(inputLine: string) {
  return inputLine.split('');
}

// function parseInput(inputLine: string) {
//   let splitted: string[][] = [];
//   let strings = inputLine.split('');
//   for (let i = 0; i < strings.length; i++) {
//     if (i % 3 === 0) {
//       splitted.push([]);
//     }
//
//     splitted[floor(i / 3)].push(strings[i])
//   }
//   return splitted;
// }
