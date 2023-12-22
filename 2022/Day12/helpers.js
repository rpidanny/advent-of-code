const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const isCellValid = (grid, r, c) => r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;

const getDeltaElevation = (grid, [r1, c1], [r2, c2]) => {
  const e1 = (grid[r1][c1] === 'S' ? 'a' : grid[r1][c1]).charCodeAt();
  const e2 = (grid[r2][c2] === 'E' ? 'z' : grid[r2][c2]).charCodeAt();

  return e2 - e1;
};

const findDistanceToEndFrom = (grid, start) => {
  const visitedGrid = new Array(grid.length)
      .fill()
      .map(() => new Array(grid[0].length).fill(false));

  const queue = [[start, 0]];

  while (queue.length) {
    const [[r, c], count] = queue.shift();

    if (visitedGrid[r][c]) continue;
    if (grid[r][c] === 'E') return count;

    visitedGrid[r][c] = true;

    for (const [dr, dc] of directions) {
      const [rx, cx] = [r + dr, c + dc];

      if (!isCellValid(grid, rx, cx)) continue;

      if (getDeltaElevation(grid, [r, c], [rx, cx]) <= 1) {
        queue.push([[rx, cx], count + 1]);
      }
    }
  }

  return Infinity;
};

const findMinDistance = (grid, startValues) => {
  let minDistance = Infinity;

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (startValues.indexOf(grid[r][c]) > -1) {
        minDistance = Math.min(
            minDistance,
            findDistanceToEndFrom(grid, [r, c]),
        );
      }
    }
  }

  return minDistance;
};

module.exports = {
  findMinDistance,
};
