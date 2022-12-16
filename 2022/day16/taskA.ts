import { readFileSync } from 'fs';

function parseInput(s: string): { [key: string]: { rate: number, paths: string[] } } {
  const strings = s.split('; ');
  console.log(strings);
  const keyRate = strings[0].replace('Valve ', '').replace(' has flow rate', '').split('=');
  const key = keyRate[0];
  const rate = Number(keyRate[1]);
  const paths = strings[1].replace('tunnels lead to valves ', '').replace('tunnel leads to valve ', '').split(', ');
  return {[key]: {rate, paths}};
}

const input: { [key: string]: { rate: number, paths: string[] } } =
  readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .reduce((obj, next) => ({...obj, ...parseInput(next)}), {});

console.log(input);

let visited = new Map<string, number>();
let distance: {path: string, released: number}[] = [];
let Q: {path: string, currentNode: string, timeLeft: number, currentFlow: number, released: number, opened: string}[]  = []; //Queue
Q.push({currentFlow: 0, released: 0, path: '', currentNode: 'AA', timeLeft: 29, opened: ''});

while(Q.length > 0)
{
  // console.log(visited);
  let {path, currentNode, timeLeft, currentFlow, released, opened} = Q.shift()!;
  let currentInput = input[currentNode];

  if (timeLeft <= 0) {
    released += currentFlow;
    distance.push({path: `${path} ${currentNode}`, released});
    continue;
  }

  let paths = currentInput.paths.filter(next => !visited.has([currentNode, next].toString()) || visited.get([currentNode, next].toString())! < released + currentFlow);

  if (currentInput.rate !== 0 && !opened.includes(currentNode)) {
    Q.push({path, released: released + currentFlow, currentFlow: currentFlow + currentInput.rate, currentNode, timeLeft: timeLeft - 1, opened: `${opened} ${currentNode}`});
  }
  if (paths.length > 0) {
    paths.forEach(nodeToGo => {
      visited.set([currentNode, nodeToGo].toString(), released + currentFlow)
      Q.push({path: `${path} ${currentNode}`, released: released + currentFlow, currentFlow, currentNode: nodeToGo, timeLeft: timeLeft - 1, opened});
    })
  } else {
    released += currentFlow * (timeLeft );
    distance.push({path: `${path} ${currentNode}`, released})
  }

}

console.table(distance);
console.table(distance.reduce((max, c) => Math.max(max, c.released), 0));


//AA DD CC BB AA II JJ II AA DD EE FF GG HH GG FF EE DD CC