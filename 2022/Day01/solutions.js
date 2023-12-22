const {
  getTotalCaloriesPerElf,
  getCaloriesSumOfTopKElves,
} = require('./helpers');

const step1 = (inputs) => getTotalCaloriesPerElf(inputs)[0];

const step2 = (inputs) => {
  const totalCaloriesPerElves = getTotalCaloriesPerElf(inputs);

  return getCaloriesSumOfTopKElves(totalCaloriesPerElves, 3);
};

module.exports = {
  step1,
  step2,
};
