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

let distance: { path: string, released: number , opened: string}[] = [];
let distance2: { path: string, released: number , opened: string}[] = [];
console.time('task');
{
  let visited = new Map<string, number>();
  let Q: { path: string, currentNodeEl: string, timeLeft: number, currentFlow: number, released: number, opened: string }[] = []; //Queue
  Q.push({currentFlow: 0, released: 0, path: '', currentNodeEl: 'AA', timeLeft: 26, opened: ''});

  while (Q.length > 0) {
    // console.log(visited);
    let {path, currentNodeEl, timeLeft, currentFlow, released, opened} = Q.shift()!;
    let currentInputEl = input[currentNodeEl];

    if (timeLeft <= 1) {
      released += currentFlow;
      distance.push({path: `${path} ${currentNodeEl}`, released, opened});
      continue;
    }

    if (currentInputEl.rate !== 0 && !opened.includes(currentNodeEl)) {
      Q.push({
        path,
        released: released + currentFlow,
        currentFlow: currentFlow + currentInputEl.rate,
        currentNodeEl,
        timeLeft: timeLeft - 1,
        opened: `${opened} ${currentNodeEl}`
      });
    }

    let paths = currentInputEl.paths.filter(next => !visited.has([currentNodeEl, next].toString()) || visited.get([currentNodeEl, next].toString())! < released + currentFlow);
    if (paths.length > 0) {
      paths.forEach(nodeToGo => {
        visited.set([currentNodeEl, nodeToGo].toString(), released + currentFlow)
        Q.push({
          path: `${path} ${currentNodeEl}`,
          released: released + currentFlow,
          currentFlow,
          currentNodeEl: nodeToGo,
          timeLeft: timeLeft - 1,
          opened
        });
      })
    } else {
      released += currentFlow * (timeLeft);
      distance.push({path: `${path} ${currentNodeEl}`, released, opened})
    }

  }
}
console.table(distance);

let max = distance.reduce((max, c) => Math.max(max, c.released), 0);
for (let distanceElement of distance.filter(d => d.opened.length >= 15)) {
// for (let distanceElement of distance) {
  console.log(distanceElement);
  let visited = new Map<string, number>();
  let Q: { path: string, currentNodeEl: string, timeLeft: number, currentFlow: number, released: number, opened: string }[] = []; //Queue
  Q.push({currentFlow: 0, released: 0, path: '', currentNodeEl: 'AA', timeLeft: 26, opened: distanceElement.opened});

  while (Q.length > 0) {
    // console.log(visited);
    let {path, currentNodeEl, timeLeft, currentFlow, released, opened} = Q.shift()!;
    let currentInputEl = input[currentNodeEl];

    if (timeLeft <= 1) {
      released += currentFlow;
      distance2.push({path: `${path} ${currentNodeEl}`, released: released + distanceElement.released, opened});
      continue;
    }

    if (currentInputEl.rate !== 0 && !opened.includes(currentNodeEl)) {
      Q.push({
        path,
        released: released + currentFlow,
        currentFlow: currentFlow + currentInputEl.rate,
        currentNodeEl,
        timeLeft: timeLeft - 1,
        opened: `${opened} ${currentNodeEl}`
      });
    }

    let paths = currentInputEl.paths.filter(next => !visited.has([currentNodeEl, next].toString()) || visited.get([currentNodeEl, next].toString())! < released + currentFlow);
    if (paths.length > 0) {
      paths.forEach(nodeToGo => {
        visited.set([currentNodeEl, nodeToGo].toString(), released + currentFlow)
        Q.push({
          path: `${path} ${currentNodeEl}`,
          released: released + currentFlow,
          currentFlow,
          currentNodeEl: nodeToGo,
          timeLeft: timeLeft - 1,
          opened
        });
      })
    } else {
      released += currentFlow * (timeLeft);
      distance2.push({path: `${path} ${currentNodeEl}`, released: released + distanceElement.released, opened})
    }

  }
}
console.timeEnd('task');

let max2 = distance2.reduce((max, c) => Math.max(max, c.released), 0);
// console.table(distance2);
console.table(max);
console.table(max2);


//AA DD CC BB AA II JJ II AA DD EE FF GG HH GG FF EE DD CC