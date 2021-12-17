import { readFileSync } from 'fs';

const input = readFileSync('input.txt', 'utf-8');

const inputs = input.split('\n')
    .filter(Boolean)

const mapping = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>',
}

let sum = 0;
for (let i = 0; i < inputs.length; i++) {
    let stack = []
    for (let j = 0; j < inputs[i].length; j++) {
        const char = inputs[i][j]
        if (['{', '[', '(', '<'].includes(char)) {
            stack.push(char);
        } else {
            let expected = mapping[stack.pop()];
            if (expected !== char) {
                switch (char) {
                    case '}':
                        sum += 1197;
                        break;
                    case ')':
                        sum += 3;
                        break;
                    case '>':
                        sum += 25137;
                        break;
                    case ']':
                        sum += 57;
                        break;
                }
                console.log(i, j, char, sum);
                break;
            }
        }
    }
}

console.log(sum);

