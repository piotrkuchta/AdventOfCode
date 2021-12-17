import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const inputs = input.split('\n')
    .filter(Boolean)
    .map(parseInput);

console.log(inputs)

let counts = Array(9).fill(0);

for (let input1 of inputs) {
    for (let string of input1.output) {
        counts[string.length]++;
    }
}

console.table(counts);
console.log(counts[2] + counts[3] + counts[4] + counts[7]);

function parseInput(line: string) {
    let arr = line.split(' ')
    return arr.reduce(({input, output}, curr) => {
        if (output !== undefined) {
            output.push(curr);
        } else if (curr === '|') {
            output = [];
        } else {
            input.push(curr);
        }
        return {input, output};
    }, {input: [] as string[], output: undefined as unknown as string[]})
}
