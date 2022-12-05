const {
  parseStacks,
  moveCratesLIFO,
  moveCratesFIFO,
  getTopOfStacks,
} = require("./helpers");

// Part 1;
function step1(inputs) {
  let currentPointer = 0;

  // Extract stacks from input
  const rawStacks = [];
  while (inputs[currentPointer][0] !== "m") {
    rawStacks.push(inputs[currentPointer]);
    currentPointer++;
  }

  const stacks = parseStacks(rawStacks);

  // Move crates based on input actions
  for (let i = currentPointer; i < inputs.length; i++) {
    const [, count, , src, , dest] = inputs[i].split(" ");
    moveCratesLIFO(stacks, parseInt(src), parseInt(dest), parseInt(count));
  }

  // Get top crate from stacks
  return getTopOfStacks(stacks);
}

// Part 2:
function step2(inputs) {
  let currentPointer = 0;

  // Extract stacks from input
  const rawStacks = [];
  while (inputs[currentPointer][0] !== "m") {
    rawStacks.push(inputs[currentPointer]);
    currentPointer++;
  }

  const stacks = parseStacks(rawStacks);

  // Move crates based on input actions
  for (let i = currentPointer; i < inputs.length; i++) {
    const [, count, , src, , dest] = inputs[i].split(" ");
    moveCratesFIFO(stacks, parseInt(src), parseInt(dest), parseInt(count));
  }

  // Get top crate from stacks
  return getTopOfStacks(stacks);
}

module.exports = {
  step1,
  step2,
};
