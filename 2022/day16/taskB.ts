import { readFileSync } from 'fs';
import { forEach, zip } from "lodash";

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
let distance: { path: string, released: number }[] = [];
let Q: { path: string, currentNode: string, currentNodeEl: string, timeLeft: number, currentFlow: number, released: number, opened: string }[] = []; //Queue
Q.push({currentFlow: 0, released: 0, path: '[AA,AA]', currentNode: 'AA', currentNodeEl: 'AA', timeLeft: 26, opened: ''});

while (Q.length > 0) {
  // console.log(visited);
  let {path, currentNode, currentNodeEl, timeLeft, currentFlow, released, opened} = Q.shift()!;
  let currentInput = input[currentNode];
  let currentInputEl = input[currentNodeEl];

  if (timeLeft <= 1) {
    released += currentFlow;
    distance.push({path, released});
    continue;
  }


  if (currentInput.rate !== 0 && !opened.includes(currentNode) && currentInputEl.rate !== 0 && !opened.includes(currentNodeEl) && currentNode !== currentNodeEl) {
    Q.push({
      path: `${path} [OPEN, OPEN]`,
      released: released + currentFlow,
      currentFlow: currentFlow + currentInput.rate + currentInputEl.rate,
      currentNode,
      currentNodeEl,
      timeLeft: timeLeft - 1,
      opened: `${opened} ${currentNode} ${currentNodeEl}`
    });
  } else {
    if (currentInput.rate !== 0 && !opened.includes(currentNode)) {
      let paths = currentInputEl.paths.filter(next => !visited.has(['E', currentNodeEl, next].toString()) || visited.get(['E', currentNodeEl, next].toString())! < released + currentFlow);
      if (paths.length > 0) {
        paths.forEach(nodeToGo => {
          visited.set(['E', currentNodeEl, nodeToGo].toString(), released + currentFlow)
          Q.push({
            path: `${path} [OPEN, ->${nodeToGo}]`,
            released: released + currentFlow,
            currentFlow: currentFlow + currentInput.rate,
            currentNode,
            currentNodeEl: nodeToGo,
            timeLeft: timeLeft - 1,
            opened: `${opened} ${currentNode}`
          });
        })
      } else {
        Q.push({
          path: `${path} [OPEN, STAY]`,
          released: released + currentFlow,
          currentFlow: currentFlow + currentInput.rate,
          currentNode,
          currentNodeEl,
          timeLeft: timeLeft - 1,
          opened: `${opened} ${currentNode}`
        });
      }
    }
    if (currentInputEl.rate !== 0 && !opened.includes(currentNodeEl) && currentNode !== currentNodeEl) {
      let paths = currentInput.paths.filter(next => !visited.has([currentNode, next].toString()) || visited.get([currentNode, next].toString())! < released + currentFlow);
      if (paths.length > 0) {
        paths.forEach(nodeToGo => {
          visited.set([currentNode, nodeToGo].toString(), released + currentFlow)
          Q.push({
            path: `${path} [->${nodeToGo}, OPEN]`,
            released: released + currentFlow,
            currentFlow: currentFlow + currentInputEl.rate,
            currentNode: nodeToGo,
            currentNodeEl,
            timeLeft: timeLeft - 1,
            opened: `${opened} ${currentNodeEl}`
          });
        })
      } else {
        Q.push({
          path: `${path} [STAY, OPEN]`,
          released: released + currentFlow,
          currentFlow: currentFlow + currentInputEl.rate,
          currentNode,
          currentNodeEl,
          timeLeft: timeLeft - 1,
          opened: `${opened} ${currentNodeEl}`
        });
      }
    }
  }
  let paths = combine(
    currentInput.paths.filter(next => !visited.has([currentNode, next].toString()) || visited.get([currentNode, next].toString())! < released + currentFlow),
    currentInputEl.paths.filter(next => !visited.has(['E', currentNodeEl, next].toString()) || visited.get(['E', currentNodeEl, next].toString())! < released + currentFlow));
  if (paths.length > 0) {
    paths.forEach(([nodeToGo, nodeToGoEl]) => {
      visited.set([currentNode, nodeToGo].toString(), released + currentFlow);
      visited.set(['E', currentNodeEl, nodeToGoEl].toString(), released + currentFlow);
      Q.push({
        path: `${path} [->${nodeToGo}, ->${nodeToGoEl}]`,
        released: released + currentFlow,
        currentFlow,
        currentNode: nodeToGo,
        currentNodeEl: nodeToGoEl,
        timeLeft: timeLeft - 1,
        opened
      });
    })
  } else {
    released += currentFlow * (timeLeft);
    distance.push({path: `${path} [STAY, STAY]`, released})
  }

}


let max = distance.reduce((max, c) => Math.max(max, c.released), 0);

distance.filter(d => d.released === max).forEach(d => console.log(`'${d.path}'`, d.released));
console.log(max);


function combine(arr1, arr2) {
  return arr1.reduce((acc, x) => acc.concat(arr2.map(y => [x, y])), []);
}

//[AA, AA] [->II, ->DD] [->JJ, OPEN]