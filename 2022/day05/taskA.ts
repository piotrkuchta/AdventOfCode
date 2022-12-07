import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');


const inputObj = parseInput(input.split('\n'));

inputObj.moves.forEach(({move, from, to}) => {
  let fromStack = inputObj.stackz[from - 1];
  let toStack = inputObj.stackz[to - 1];
  toStack.push(...fromStack.splice(fromStack.length - move).reverse());
})

let res = inputObj.stackz.map(st => st[st.length - 1]).join('');

console.log(res);


function parseInput(inputLines: string[]) {

  let space = inputLines.indexOf('');

  let stackz = [];
  let moves = [];

  for (let i = 1; i < inputLines[space - 1].length; i += 4) {
    let stacc = []
    for (let j = space - 2; j >= 0; j--) {
      if (inputLines[j][i] !== ' ') {
        stacc.push(inputLines[j][i]);
      }
    }
    stackz.push(stacc);
  }

  const regx = /move ([0-9]+) from ([0-9]+) to ([0-9]+)/;

  for (let i = space + 1; i < inputLines.length; i++) {
    let match = inputLines[i].match(regx)!;
    moves.push({move: Number(match[1]), from: Number(match[2]), to: Number(match[3])});
  }

  return {stackz, moves};
}
