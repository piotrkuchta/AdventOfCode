import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const inputs = input.split('\n')
    .filter(Boolean)
    .map(parseInput);

let sum = 0;

for (let input1 of inputs) {
    let digits = Array(10).fill('');
    digits[1] = input1.input.find(s => s.length === 2);
    digits[4] = input1.input.find(s => s.length === 4);
    digits[7] = input1.input.find(s => s.length === 3);
    digits[8] = input1.input.find(s => s.length === 7);
    digits[3] = input1.input.find(s => s.length === 5 && s.includes(digits[1][0]) && s.includes(digits[1][1]));
    digits[9] = input1.input.find(s => s.length === 6 && s.includes(digits[3][0]) && s.includes(digits[3][1]) && s.includes(digits[3][2]) && s.includes(digits[3][3]) && s.includes(digits[3][4]));
    digits[6] = input1.input.find(s => s.length === 6 && !(s.includes(digits[1][0]) && s.includes(digits[1][1])));
    digits[5] = input1.input.find(s => s.length === 5 && digits[6].includes(s[0]) && digits[6].includes(s[1]) && digits[6].includes(s[2]) && digits[6].includes(s[3]) && digits[6].includes(s[4]))
    digits[0] = input1.input.find(s => s.length === 6 && s !== digits[6] && s !== digits[9]);
    digits[2] = input1.input.find(s => s.length === 5 && s !== digits[5] && s !== digits[3]);

    let res: string = ''
    for (let string of input1.output) {
        for (let i = 0; i < digits.length; i++) {
            let match = string.length === digits[i].length;
            if (match) {
                for (let j = 0; j < digits[i].length; j++) {
                    match = match && string.includes(digits[i][j]);
                }
            }
            if (match) {
                res += i;
            }
        }
    }
    sum += Number(res);
}

console.log(sum);

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
