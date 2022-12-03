const { getInputLines } = require("../utils/input");
const {
  getPriority,
  getCommonItemInRucksackCompartments,
  getCommonItemsInRucksacks,
} = require("./helpers");

const TEST_MODE = false;

let rucksacks = getInputLines(
  TEST_MODE ? "./Day3/test.input.txt" : "./Day3/input.txt"
);

// Part 1;

let totalPriority = 0;
for (const rucksack of rucksacks) {
  const commonItem = getCommonItemInRucksackCompartments(rucksack);

  const priority = getPriority(commonItem);

  totalPriority += priority;
}
console.log(`Step1: ${totalPriority}`);

// Part 2:

let totalPriority2 = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const r1 = rucksacks[i];
  const r2 = rucksacks[i + 1];
  const r3 = rucksacks[i + 2];

  const commonItem = getCommonItemsInRucksacks(r1, r2, r3);

  const priority = getPriority(commonItem);

  totalPriority2 += priority;
}

console.log(`Step2: ${totalPriority2}`);
