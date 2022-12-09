const { RopeSimulation } = require("./simulation");
const { Logger } = require("./logger");

// Part 1;
async function step1(inputs) {
  const logger = new Logger([4, 0], [10, 10]);
  const simulation = new RopeSimulation(2, logger);

  await simulation.runSimulation(inputs);

  const tailPositions = simulation.getUniqueTailPositions();

  // logger.drawTailPositions(tailPositions);

  return tailPositions.length;
}

// Part 2:
async function step2(inputs) {
  const logger = new Logger([15, 11], [21, 26], 0);
  const simulation = new RopeSimulation(10, logger);

  await simulation.runSimulation(inputs);

  const tailPositions = simulation.getUniqueTailPositions();

  // logger.drawTailPositions(tailPositions);

  return tailPositions.length;
}

module.exports = {
  step1,
  step2,
};
