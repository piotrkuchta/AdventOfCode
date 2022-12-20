import { appendFileSync, readFileSync, writeFileSync } from 'fs';
import { max, range, sum, take, zip } from "lodash";

interface Blueprint {
  ID: number;
  costs: number[][];
}

// indices of resources
let ORE = 0;
let CLAY = 1;
let OBSIDIAN = 2;
let GEODE = 3;

function parseBlueprint(s: string): Blueprint {
//Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 11 clay. Each geode robot costs 2 ore and 7 obsidian.
  let inputTable = s.replace('Blueprint ', '')
    .replace(': Each ore robot costs ', ';')
    .replace('. Each clay robot costs ', ';')
    .replace('. Each obsidian robot costs ', ';')
    .replace('. Each geode robot costs ', ';')
    .split(';');

  let ID = Number(inputTable[0]);
  let oreCostOre = Number((inputTable[1].split(' '))[0]);
  let clayCostOre = Number((inputTable[2].split(' '))[0]);
  let obsidianCostOre = Number((inputTable[3].split(' '))[0]);
  let obsidianCostClay = Number((inputTable[3].split(' '))[3]);
  let geodeCostOre = Number((inputTable[4].split(' '))[0]);
  let geodeCostObsidian = Number((inputTable[4].split(' '))[3]);

  let costs = [
    [oreCostOre, 0, 0, 0],
    [clayCostOre, 0, 0, 0],
    [obsidianCostOre, obsidianCostClay, 0, 0],
    [geodeCostOre, 0, geodeCostObsidian, 0],
  ]

  return {
    ID, costs,
  }
}

let blueprints = readFileSync('input.txt', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(s => parseBlueprint(s));

// console.table(blueprints);
let result = 1;
// for (let b = 0; b < 5; b++) {
// for (let b = 5; b < 10; b++) {
// for (let b = 10; b < 15; b++) {
// for (let b = 15; b < 20; b++) {
// for (let b = 20; b < 25; b++) {
// for (let b = 25; b < 30; b++) {
for (let b = 0; b < blueprints.length; b++) {
  console.log(`${blueprints[b].ID} blueprint`)
  let maxi = 0;
  let distance: [string, number][] = [];
  let visited = new Map<string, number>();
  let Q: { path: string, minute: number, resources: number[], bots: number[], banned: boolean[] }[] = [];
  Q.push({path: '0,1,0,0,0,0,0,0,0\n', minute: 1, resources: [0, 0, 0, 0], bots: [1, 0, 0, 0], banned: [false, false, false, false]});


  console.time('search')
  let lastSeenMinute = 1;
  while (Q.length > 0) {
    // console.log(visited);
    let {path, minute, resources, bots, banned} = Q.pop()!;

    if (resources[3] + bots[3] * (32 - minute + 1) + sum(range(1, 32 - minute + 1).map(v => v + bots[3])) < maxi) {
      continue;
    }

    if (minute > lastSeenMinute) {
      // console.log({lastSeenMinute});
      lastSeenMinute = minute;
      // console.timeLog('search');
    }

    let possibleBuys = [{buy: [0, 0, 0, 0], newResources: [...resources]}];

    let potentiallyBanned = [...banned];
    for (let i = 0; i < blueprints[b].costs.length; i++) {
      let newResources = zip(resources, blueprints[b].costs[i]).map(([r, c]) => r! - c!);
      let canBuy = newResources.every(v => v >= 0);
      let maxNeeded = max(blueprints[b].costs.map(cost => cost[i]))!;
      let shouldBuy = maxNeeded > bots[i] || i === 3;
      if (canBuy && shouldBuy && !banned[i]) {
        let buy = [0, 0, 0, 0];
        buy[i] = 1;
        potentiallyBanned[i] = true;
        possibleBuys.push({buy, newResources});
      }
    }

    let addedResources = zip(bots, resources).map(([b, r]) => b! + r!);

    if (minute >= 32) {
      distance.push([`${path + JSON.stringify([minute, bots, addedResources])}\n\n`, addedResources[GEODE]]);
      if (addedResources[GEODE] > maxi) {
        maxi = addedResources[GEODE];
        console.log(maxi);
      }
      continue;
    }

    possibleBuys.reverse().forEach(({buy, newResources}, index) => {
      // console.log({buy, newResources, index});
      let newBots = zip(bots, buy).map(([b, bu]) => b! + bu!);
      let newMinute = minute + 1;
      let newAddedResources = zip(bots, newResources).map(([b, r]) => b! + r!);
      let node = [newMinute, newResources, newBots, buy].toString();
      if (!visited.has(node)) {
        visited.set(node, 0);
        Q.push({
          path: `${path + JSON.stringify([minute, newBots, newResources, {buy}])}\n`,
          minute: newMinute,
          bots: newBots,
          resources: newAddedResources,
          banned: sum(buy) === 0 ? potentiallyBanned : [false, false, false, false]

        });
      }
    });
  }
  console.timeEnd('search');
  console.log(maxi);
  let result1 = maxi * blueprints[b].ID;
  result *= maxi;
  // console.table(distance.filter(([p, v]) => v === maxi));
  appendFileSync("output.txt", `${blueprints[b].ID}\t${maxi}\t${result1}\n`);

  // writeFileSync("output.txt", '');
  // distance.filter(([p, v]) => v === maxi).forEach(([p, v]) => {
  //   appendFileSync("output.txt", p);
  // })
}
console.log(result);
