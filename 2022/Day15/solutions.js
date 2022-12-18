const { parseInput } = require("./helpers");
const { Scanner } = require("./Scanner");
const { Grid } = require("./Grid");

// Part 1;
function step1(inputs, row = 10, devMode = false) {
  const { sensors, minX, maxX, minY, maxY } = parseInput(inputs);

  const scanner = new Scanner(sensors, minX, maxX, minY, maxY);

  if (devMode) {
    const grid = new Grid(scanner.getSensors(), minX, maxX, minY, maxY);
    grid.print();
  }

  return scanner.getNumOfPositionsWithoutBeacon(row);
}

// Part 2:
function step2(inputs, devMode = false) {
  const { sensors, minX, maxX, minY, maxY } = parseInput(inputs);

  const scanner = new Scanner(sensors, minX, maxX, minY, maxY);

  if (devMode) {
    const grid = new Grid(scanner.getSensors(), minX, maxX, minY, maxY);
    grid.print();
  }

  return scanner.getTuningFrequency();
}

module.exports = {
  step1,
  step2,
};
