const getTotalCaloriesPerElf = (foodItems) => {
  const totalCalories = [];

  let calories = 0;
  for (const food of foodItems) {
    if (food === "") {
      totalCalories.push(calories);
      calories = 0;
    } else {
      calories += parseInt(food, 10);
    }
  }
  return totalCalories.sort((a, b) => b - a);
};

const getCaloriesSumOfTopKElves = (totalCaloriesPerElves, k) => {
  let topKSum = 0;

  for (let i = 0; i < k; i++) {
    topKSum += totalCaloriesPerElves[i];
  }
  return topKSum;
};

module.exports = {
  getTotalCaloriesPerElf,
  getCaloriesSumOfTopKElves
};
