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

const typeMap = [
    {name: 'sum',       beginRes: 0,        accFunction: (res: number, curr: number) => (res + curr)},
    {name: 'product',   beginRes: 1,        accFunction: (res: number, curr: number) => (res * curr)},
    {name: 'min',       beginRes: Infinity, accFunction: (res: number, curr: number) => (Math.min(res, curr))},
    {name: 'max',       beginRes: 0,        accFunction: (res: number, curr: number) => (Math.max(res, curr))},
    {name: 'literal',   beginRes: 0,        accFunction: (res: number, curr: number) => (curr)},
    {name: 'greater',   beginRes: -1,       accFunction: (res: number, curr: number) => (res === -1 ? curr : res > curr ? 1 : 0)},
    {name: 'less',      beginRes: -1,       accFunction: (res: number, curr: number) => (res === -1 ? curr : res < curr ? 1 : 0)},
    {name: 'equal',     beginRes: -1,       accFunction: (res: number, curr: number) => (res === -1 ? curr : res === curr ? 1 : 0)},
];

function parseInput(s: string) {
    return hexbitmap[s];
}

const input = readFileSync('input.txt', 'utf-8')
    .split('')
    .filter(Boolean)
    .map(s => parseInput(s))
    .join('')
    .split('');

analyse(input, 4);

function analyse(packet: string[], inputType: number, packetNum?: number) {
    let res = typeMap[inputType].beginRes;
    let args = [];
    let pn = 0;

    while (packet.length > 0 && packet.includes('1') && (packetNum === undefined || pn < packetNum)) {
        let version = parseVersion();
        let type = parseType();
        let number = parsePacket(type);
        res = typeMap[inputType].accFunction.call(this, res, number);
        args.push(number);
        pn++;
    }

    console.log(typeMap[inputType].name, args, res);
    return res;

    function parsePacket(type: number) {
        if (type === 4) {
            return parseLiteral();
        } else {
            let subpacketsScope = getSubpacketsScope();
            if (subpacketsScope.type === 'len') {
                return analyse(shift(subpacketsScope.value).split(''), type);
            } else {
                return analyse(packet, type, subpacketsScope.value);
            }
        }
    }

    function getSubpacketsScope() {
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
        let ress = '';
        let group;
        do {
            group = shift(5);
            ress += group.slice(1, 5);
        } while (group[0] === '1')
        return parseInt(ress, 2);
    }

    function shift(x: number) {
        return packet.splice(0, x).join('');
    }
}
