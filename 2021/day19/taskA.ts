import {readFileSync} from 'fs';
import {Quaternion, Vector3} from 'math3d';

let input: Vector3[][] = []

readFileSync('input.txt', 'utf-8')
    .split('\n')
    .filter(Boolean)
    .forEach(s => readLinee(s));

function readLinee(s: string): any {
    if (s.startsWith('--- scanner')) {
        input.push([]);
        return;
    }
    let numbers = s.split(',').map(Number);
    input[input.length - 1].push(new Vector3(numbers[0], numbers[1], numbers[2]));
}

// console.log(input);

let rotations = [
    Quaternion.Euler(0, 0, 0),
    Quaternion.Euler(0, 0, 90),
    Quaternion.Euler(0, 0, 180),
    Quaternion.Euler(0, 0, 270),

    Quaternion.Euler(90, 0, 0),
    Quaternion.Euler(90, 0, 90),
    Quaternion.Euler(90, 0, 180),
    Quaternion.Euler(90, 0, 270),

    Quaternion.Euler(180, 0, 0),
    Quaternion.Euler(180, 0, 90),
    Quaternion.Euler(180, 0, 180),
    Quaternion.Euler(180, 0, 270),

    Quaternion.Euler(270, 0, 0),
    Quaternion.Euler(270, 0, 90),
    Quaternion.Euler(270, 0, 180),
    Quaternion.Euler(270, 0, 270),

    Quaternion.Euler(0, 90, 0),
    Quaternion.Euler(0, 90, 90),
    Quaternion.Euler(0, 90, 180),
    Quaternion.Euler(0, 90, 270),

    Quaternion.Euler(0, 270, 0),
    Quaternion.Euler(0, 270, 90),
    Quaternion.Euler(0, 270, 180),
    Quaternion.Euler(0, 270, 270),
]

let matched = [input[0]];
input.shift();

while (input.length > 0) {
    let start = Date.now();
    let found = false;
    for (let i = 0; i < matched.length; i++) {
        for (let j = 0; j < input.length; j++) {
            let matchedCandidate = matched[i];
            let candidate = input[j];

            for (let rotation of rotations) {
                let map = candidate.map(v => roundVector(rotation.mulVector3(v)));
                let myMap = new Map<string, number>();
                for (let vector3 of map) {
                    for (let vector of matchedCandidate) {
                        let vector1 = vector3.sub(vector).values.join(',');
                        if(!myMap.has(vector1)) {
                            myMap.set(vector1, 0);
                        }
                        myMap.set(vector1, myMap.get(vector1) + 1);
                    }
                }
                myMap.forEach((v, k) => {
                    if (v >= 12) {
                        found = true;
                        matched.push(map.map(vector3 => {
                            let vv = k.split(',').map(Number);
                            return vector3.sub(new Vector3(vv[0], vv[1], vv[2]));
                        }));
                    }
                });
                if (found) {
                    break;
                }
            }
            if (found) {
                input.splice(j, 1);
                break;
            }
        }
        if (found) {
            break;
        }
    }
    console.log(matched.length, Date.now() - start);
}


let length = matched.flat().map(v => v.values.join(','))
    .filter((value, index, self) => self.indexOf(value) === index).length;

console.log(length);


function roundVector(v1: Vector3) {
    return new Vector3(Math.round(v1.x), Math.round(v1.y), Math.round(v1.z));
}