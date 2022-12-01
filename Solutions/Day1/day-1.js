const { getInputLines } = require("../../utils/input");
const {
  getTotalCaloriesPerElf,
  getCaloriesSumOfTopKElves,
} = require("./helpers");

const foodItems = getInputLines("./Solutions/Day1/input.txt");

const totalCaloriesPerElf = getTotalCaloriesPerElf(foodItems);

console.log(
  `Step1: Total calories carried by the Elf carrying the most: ${totalCaloriesPerElf[0]}`
);

console.log(
  `Step2: Total calories carried by the top 3 Elves carrying the most: ${getCaloriesSumOfTopKElves(
    totalCaloriesPerElf,
    3
  )}`
);
