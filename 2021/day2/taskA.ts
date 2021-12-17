import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const res = input.split('\n')
    .filter(Boolean)
    .map(parseInput)
    .reduce(({distance, depth}, {task, value }) => {
        switch (task) {
            case 'forward':
                return {distance: distance + value, depth};
            case 'down':
                return {distance, depth: depth + value};
            case 'up':
                return {distance, depth: depth - value};
        }

        return {distance: 0, depth: 0}
    }, {distance: 0, depth: 0});

console.log(res.distance * res.depth);

function parseInput(inputLine: string) {
    const splitted = inputLine.split(' ');

    return {task: splitted[0], value: Number(splitted[1]) };
}
