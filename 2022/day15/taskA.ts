import { readFileSync } from 'fs';
import { divide, inRange, range } from "lodash";

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


// let y2 = 10;
let y2 = 2000000;
let unavailable = 0;
// for (let i = -10_000_000; i < 10_000_000; i++) {
// // for (let i = -50; i < 50; i++) {
//   for (let j = 0; j < lines.length; j++){
//     const line = lines[j];
//     if (getDistance(line.sensor.x, i, line.sensor.y, y2) <= line.distance && !(line.beacon.x === i && line.beacon.y === y2)) {
//       let number = Math.abs(line.sensor.x - i);
//       unavailable += number * 2;
//       i += number * 2;
//       // console.log(i);
//       break;
//     }
//   }
// }

let unv: [number, number][] = []
lines.forEach(line => {
  console.log('line');
  if (Math.abs(line.sensor.y - y2) > line.distance) return;
  let number = line.distance - Math.abs(line.sensor.y - y2);
  let x1 = line.sensor.x - number;
  let x2 = line.sensor.x + number;
  if (line.beacon.y === y2) {
    if (line.beacon.x === x1) {
      console.log('beacon', x1, y2);
      x1++;
    } else if (line.beacon.x === x2) {
      console.log('beacon', x2, y2);
      x2--;
    }
  }
  if (x1 > x2) return;;
  console.log(line.sensor.x);
  console.log(x1, x2);
  unv.push([x1, x2]);
})

for (let i = 0; i < unv.length; i++) {
  console.log(unv);
  for (let j = i + 1; j < unv.length; j++) {
    if (
      inRange(unv[i][0], unv[j][0], unv[j][1]) ||
      inRange(unv[i][1], unv[j][0], unv[j][1]) ||
      inRange(unv[j][1], unv[i][0], unv[i][1]) ||
      inRange(unv[j][0], unv[i][0], unv[i][1])
      // unv[j][0] === unv[i][1] ||
      // unv[i][0] === unv[j][1]
    ) {
      console.log(j);
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




unavailable = unv.reduce((sum, [x1, x2]) => {
  console.log(Math.abs(x1 - x2));
  return sum + Math.abs(x1 - x2) + 1;
}, 0);

// console.log(lines);
console.log(unavailable);