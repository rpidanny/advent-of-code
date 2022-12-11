const {
  parseInputs,
  calculateMonkeyBusiness,
  calculateLCM,
} = require("./helpers");

// Part 1;
function step1(inputs) {
  const numOfRounds = 20;

  const monkeys = parseInputs(inputs);

  for (let round = 1; round <= numOfRounds; round++) {
    for (const monkey of monkeys) {
      while (monkey.getItemsCount()) {
        const [item, dest] = monkey.throwItem();
        monkeys[dest].catchItem(item);
      }
    }
  }

  return calculateMonkeyBusiness(monkeys, 2);
}

// Part 2:
function step2(inputs) {
  const numOfRounds = 10000;

  const monkeys = parseInputs(inputs);

  const lcm = calculateLCM(monkeys.map((m) => m.throwTest.divBy));

  for (let round = 1; round <= numOfRounds; round++) {
    for (const monkey of monkeys) {
      while (monkey.getItemsCount()) {
        const [item, dest] = monkey.throwItem(lcm, false);
        monkeys[dest].catchItem(item);
      }
    }
  }

  return calculateMonkeyBusiness(monkeys, 2);
}

module.exports = {
  step1,
  step2,
};
