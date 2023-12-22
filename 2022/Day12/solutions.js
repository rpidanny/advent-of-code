const {findMinDistance} = require('./helpers');

// Part 1;
function step1(grid) {
  const startValues = ['S'];

  return findMinDistance(grid, startValues);
}

// Part 2:
function step2(grid) {
  const startValues = ['a', 'S'];

  return findMinDistance(grid, startValues);
}

module.exports = {
  step1,
  step2,
};
