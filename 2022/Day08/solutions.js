const {
  getCellId,
  printVisibleTrees,
  calculateScenicScoreOfCell,
} = require("./helpers");

// Part 1;
function step1(inputs) {
  let visibleTrees = new Set();

  // Left / Right Sweep
  for (let row = 0; row < inputs.length; row++) {
    let maxLeft = -1;
    let maxRight = -1;
    for (let col = 0; col < inputs[row].length; col++) {
      if (inputs[row][col] > maxLeft) {
        visibleTrees.add(getCellId(row, col));
      }
      if (inputs[row][inputs[row].length - 1 - col] > maxRight) {
        visibleTrees.add(getCellId(row, inputs[row].length - 1 - col));
      }

      maxLeft = Math.max(maxLeft, inputs[row][col]);
      maxRight = Math.max(maxRight, inputs[row][inputs[row].length - 1 - col]);
    }
  }

  // Top / Bottom Sweep
  for (let col = 0; col < inputs[0].length; col++) {
    let maxTop = -1;
    let maxBottom = -1;

    for (let row = 0; row < inputs.length; row++) {
      if (inputs[row][col] > maxTop) {
        visibleTrees.add(getCellId(row, col));
      }
      if (inputs[inputs.length - 1 - row][col] > maxBottom) {
        visibleTrees.add(getCellId(inputs.length - 1 - row, col));
      }

      maxTop = Math.max(maxTop, inputs[row][col]);
      maxBottom = Math.max(maxBottom, inputs[inputs.length - 1 - row][col]);
    }
  }

  // printVisibleTrees(inputs, visibleTrees);

  return visibleTrees.size;
}

// Part 2:
function step2(inputs) {
  let maxScenicScore = 0;

  for (let row = 0; row < inputs.length; row++) {
    for (let col = 0; col < inputs[row].length; col++) {
      maxScenicScore = Math.max(
        maxScenicScore,
        calculateScenicScoreOfCell(inputs, row, col)
      );
    }
  }

  return maxScenicScore;
}

module.exports = {
  step1,
  step2,
};
