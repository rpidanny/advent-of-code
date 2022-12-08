const getCellId = (row, col) => `${row}-${col}`;

const printVisibleTrees = (grid, visibleTrees) => {
  const newArr = new Array(grid.length)
    .fill()
    .map(() => new Array(grid[0].length).fill("0"));

  for (const cell of visibleTrees) {
    const [row, col] = cell.split("-");
    newArr[parseInt(row)][parseInt(col)] = "1";
  }

  for (const row of newArr) {
    console.log(row);
  }
};

const calculateScenicScoreOfCell = (grid, r, c) => {
  let bottomTrees = 0;
  let topTrees = 0;
  let leftTrees = 0;
  let rightTrees = 0;

  for (let row = r + 1; row < grid.length; row++) {
    bottomTrees++;
    if (grid[row][c] >= grid[r][c]) break;
  }
  for (let row = r - 1; row >= 0; row--) {
    topTrees++;
    if (grid[row][c] >= grid[r][c]) break;
  }

  for (let col = c + 1; col < grid[r].length; col++) {
    rightTrees++;
    if (grid[r][col] >= grid[r][c]) break;
  }

  for (let col = c - 1; col >= 0; col--) {
    leftTrees++;
    if (grid[r][col] >= grid[r][c]) break;
  }

  return bottomTrees * topTrees * leftTrees * rightTrees;
};

module.exports = {
  getCellId,
  printVisibleTrees,
  calculateScenicScoreOfCell,
};
