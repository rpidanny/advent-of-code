const {
  getPriority,
  getCommonItemInRucksackCompartments,
  getCommonItemsInRucksacks,
} = require('./helpers');

// Part 1;
function step1(rucksacks) {
  let totalPriority = 0;
  for (const rucksack of rucksacks) {
    const commonItem = getCommonItemInRucksackCompartments(rucksack);

    const priority = getPriority(commonItem);

    totalPriority += priority;
  }
  return totalPriority;
}

// Part 2:
function step2(rucksacks) {
  let totalPriority = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    const r1 = rucksacks[i];
    const r2 = rucksacks[i + 1];
    const r3 = rucksacks[i + 2];

    const commonItem = getCommonItemsInRucksacks(r1, r2, r3);

    const priority = getPriority(commonItem);

    totalPriority += priority;
  }
  return totalPriority;
}

module.exports = {
  step1,
  step2,
};
