const { Monkey } = require("./Monkey");
const { Operation } = require("./Operation");
const { ThrowTest } = require("./ThrowTest");

const parseInputs = (inputs) => {
  const monkeys = [];

  for (let i = 0; i < inputs.length; i += 7) {
    if (inputs[i][0] === "M") {
      // Starting items
      const [, rawItems] = inputs[i + 1].split("items:");
      const items = rawItems.split(",").map((item) => parseInt(item, 10));

      // operations
      const [op, rawOpVal] = inputs[i + 2].split("new = old ")[1].split(" ");
      const operation = new Operation(op, parseInt(rawOpVal, 10));

      // test
      const [, divBy] = inputs[i + 3].split("divisible by");
      const [, rawTrueDest] = inputs[i + 4].split("throw to monkey");
      const [, rawFalseDest] = inputs[i + 5].split("throw to monkey");
      const throwTest = new ThrowTest(
        parseInt(divBy),
        parseInt(rawTrueDest),
        parseInt(rawFalseDest)
      );

      monkeys.push(new Monkey(i / 7, items, operation, throwTest));
    }
  }

  return monkeys;
};

const getTopK = (arr, k) => {
  return arr.sort((a, b) => b - a).slice(0, k);
};

const calculateMonkeyBusiness = (monkeys, k) => {
  const topTwoInspectionsCount = getTopK(
    monkeys.map((m) => m.getInspectionsCount()),
    k
  );

  return topTwoInspectionsCount.reduce((acc, curr) => acc * curr, 1);
};

const calculateLCM = (arr) => {
  return arr.reduce((acc, curr) => acc * curr, 1);
};

module.exports = {
  parseInputs,
  calculateMonkeyBusiness,
  calculateLCM,
};
