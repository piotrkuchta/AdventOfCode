import {readFileSync} from 'fs';

const hexbitmap = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111',
}

function parseInput(s: string) {
    return hexbitmap[s];
}

const input = readFileSync('input.txt', 'utf-8')
    .split('')
    .filter(Boolean)
    .map(s => parseInput(s))
    .join('')
    .split('');

let sum = 0;
analyse(input);
console.log(sum);

function analyse(packet: string[]) {

    while (packet.length > 0 && packet.includes('1')) {
        console.log(packet.join(''));
        let version = parseVersion();
        console.log('v', version);
        sum += version;
        let type = parseType();
        console.log('t', type);
        switch (type) {
            case 4:
                console.log(parseLiteral());
                break;
            default:
                let subpackets = getSubpacketsLength();
                console.log('sub', subpackets);
                if (subpackets.type === 'len') {
                    analyse(shift(subpackets).split(''));
                }
        }
    }

    function getSubpacketsLength() {
        if (packet.shift() === '0') {
            return {type: 'len', value: parseInt(shift(15), 2)};
        } else {
            return {type: 'count', value: parseInt(shift(11), 2)};
        }
    }

    function parseVersion() {
        return parseInt(shift(3), 2);
    }

    function parseType() {
        return parseInt(shift(3), 2);
    }

    function parseLiteral() {
        let group = shift(5);
        let res = '';
        while (group[0] === '1') {
            res += group.slice(1, 5);
            group = shift(5);
        }
        res += group.slice(1, 5);
        // let extra = 4 - ((res.length * 5 / 4) + 6) % 4;
        // shift(extra);
        return parseInt(res, 2);
    }

    function shift(x) {
        let res = '';
        for (let i = 0; i < x; i++) {
            res += packet.shift();
        }
        return res;
    }
}