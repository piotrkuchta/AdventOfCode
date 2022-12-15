import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { min } from 'lodash';

const input = readFileSync('input.txt', 'utf-8');


const inputs = input.split('\n')
  .filter(Boolean).map(s => s.split(''));



let targetY = inputs.findIndex(i => i.includes('E'));
let targetX = inputs[targetY].indexOf('E');

inputs[targetY][targetX] = 'z';

let startY = inputs.findIndex(i => i.includes('S'));
let startX = 0;

inputs[startY][startX] = 'a';

let lowest = Infinity;

for (let i = 0; i < inputs.length; i++) {
  for (let j = 0; j < inputs[i].length; j++) {
    if (inputs[i][j] !== 'a'){
      continue;
    }
    let visited = new Set();
    let rows = inputs.length;
    let columns = inputs[0].length;
    let distance = Array(rows).fill().map(() => Array(columns).fill(-1));
    let ensure = Array(rows).fill().map(() => Array(columns).fill(' '));
    distance[i][j]=0;
    let Q = []; //Queue
    Q.push([i,j]);
    visited.add([i,j].toString());

    let dr = [-1,1,0,0];
    let dc = [0,0,-1,1];

    while(Q.length > 0)
    {
      let cur = Q.shift();
      let row = cur[0];
      let col = cur[1];

      for(let k=0; k<4; k++)
      {
        let newRow = row + dr[k];
        let newCol = col + dc[k];

        if(!visited.has([newRow,newCol].toString()) && inputs[newRow] !== undefined && inputs[newRow][newCol] !== undefined && (inputs[newRow][newCol].charCodeAt(0) - inputs[row][col].charCodeAt(0) <= 1))
        {
          // console.log(inputs[newRow][newCol].charCodeAt(0));
          // console.log(inputs[newRow][newCol]);
          visited.add([newRow,newCol].toString());
          distance[newRow][newCol] = distance[row][col] + 1;
          ensure[newRow][newCol] = inputs[newRow][newCol];
          Q.push([newRow,newCol]);
        }
      }
    }

    if(distance[targetY][targetX] === -1)console.log(i, j, "Path does not exist");
    else {
      console.log(i, j, distance[targetY][targetX]);
      lowest = min([lowest, distance[targetY][targetX]])
    }
    // else console.log(distance[rows-1][columns-1]);


    // console.log(startY, startX);


    // console.table(distance);
    // console.table(ensure);
  }
  console.log(lowest);
}


