import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const res = input.split('\n')
    .filter(Boolean)
    .map(parseInput)
    .reduce(({aim, depth, distance}, {task, value }) => {
        switch (task) {
            case 'forward':
                return {distance: distance + value, depth: depth + aim * value, aim};
            case 'down':
                return {distance, depth, aim: aim + value};
            case 'up':
                return {distance, depth, aim: aim - value};
        }

        return {distance: 0, depth: 0, aim: 0}
    }, {distance: 0, depth: 0, aim: 0});

console.log(res.distance * res.depth);

function parseInput(inputLine: string) {
    const splitted = inputLine.split(' ');

    return {task: splitted[0], value: Number(splitted[1]) };
}
