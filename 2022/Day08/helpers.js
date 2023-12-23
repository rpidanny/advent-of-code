const getCellId = (row, col) => `${row}-${col}`;

const printVisibleTrees = (grid, visibleTrees) => {
  const newArr = new Array(grid.length)
      .fill()
      .map(() => new Array(grid[0].length).fill('0'));

  for (const cell of visibleTrees) {
    const [row, col] = cell.split('-');
    newArr[parseInt(row)][parseInt(col)] = '1';
  }

  for (const row of newArr) {
    console.log(row);
  }
};

const isValidCell = (grid, r, c) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;

const calculateScenicScoreOfCell = (grid, r, c) => {
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];

  let scenicScore = 1;

  for (const [dr, dc] of directions) {
    let score = 0;
    let row = r + dr;
    let col = c + dc;

    while (isValidCell(grid, row, col)) {
      score++;

      if (grid[row][col] >= grid[r][c]) break;

      row += dr;
      col += dc;
    }

    // exit early if score = 0 since 0 * any number = 0;
    if (score === 0) return 0;

    scenicScore *= score;
  }

  return scenicScore;
};

module.exports = {
  getCellId,
  printVisibleTrees,
  calculateScenicScoreOfCell,
};
