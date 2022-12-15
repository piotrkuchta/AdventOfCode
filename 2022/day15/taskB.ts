import { readFileSync } from 'fs';
import { inRange } from "lodash";
console.time('runtime')

interface Task {
  beacon: { x: number; y: number };
  sensor: { x: number; y: number };
  distance?: number;
}

const input = readFileSync('input.txt', 'utf-8');


function parse(line: string): Task {
  let s = line
    .replace('Sensor at ', '')
    .replace('x=', '')
    .replace('x=', '')
    .replace('y=', '')
    .replace('y=', '')
    .replace(': closest beacon is at ', ', ')
    .split(', ');

  return {
    sensor: {
      x: Number(s[0]),
      y: Number(s[1]),
    },
    beacon: {
      x: Number(s[2]),
      y: Number(s[3]),
    }
  };
}


function getDistance(x1: number, x2: number, y1: number, y2: number) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function calculateDistance(line: Task) {
  return {
    ...line,
    distance: getDistance(line.sensor.x, line.beacon.x, line.sensor.y, line.beacon.y),
  }
}

let lines = input.split('\n')
  .filter(Boolean)
  .map(line => parse(line))
  .map(line => calculateDistance(line));

let result = 0;
// for(let y2 = 0; y2 < 20; y2++) {
for(let y2 = 0; y2 < 4_000_000; y2++) {
  if (y2 % 100 === 0) {
    // console.log(y2);
  }
  let unv: [number, number][] = []
  lines.forEach(line => {
    // console.log('line');
    if (Math.abs(line.sensor.y - y2) > line.distance) return;
    let number = line.distance - Math.abs(line.sensor.y - y2);
    let x1 = line.sensor.x - number;
    let x2 = line.sensor.x + number;
    if (x1 > x2) return;
    // console.log(line.sensor.x);
    // console.log(x1, x2);
    unv.push([x1, x2]);
  })

  for (let i = 0; i < unv.length; i++) {
    // console.log(unv);
    for (let j = i + 1; j < unv.length; j++) {
      if (
        inRange(unv[i][0], unv[j][0], unv[j][1]) ||
        inRange(unv[i][1], unv[j][0], unv[j][1]) ||
        inRange(unv[j][1], unv[i][0], unv[i][1]) ||
        inRange(unv[j][0], unv[i][0], unv[i][1]) ||
        unv[j][0] === unv[i][1] + 1
        // unv[i][0] === unv[j][1]
      ) {
        // console.log(j);
        let newX1 = Math.min(unv[i][0], unv[j][0]);
        let newX2 = Math.max(unv[i][1], unv[j][1]);

        unv.splice(j, 1);

        unv[i][0] = newX1;
        unv[i][1] = newX2;

        i = -1;
        break;
      }
    }
  }

  if (unv.length > 1) {
    // console.log(unv);
    // console.log(unv[0][1], unv[1][0]);
    result = (unv[0][1] + 1) * 4000000 + y2;
  }
}

console.log(result);
console.timeEnd('runtime')