const { SandSimulation } = require("./SandSimulation.js");
const { Scanner } = require("./Scanner.js");

// Part 1;
async function step1(inputs) {
  const scanner = new Scanner(inputs, false);
  const simulation = new SandSimulation(scanner.getGrid());

  return simulation.run([500, 0]);
}

// Part 2:
async function step2(inputs) {
  const scanner = new Scanner(inputs, true);
  const simulation = new SandSimulation(scanner.getGrid());

  return simulation.run([500, 0]);
}

module.exports = {
  step1,
  step2,
};
