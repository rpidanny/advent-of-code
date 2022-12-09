class Logger {
  constructor(initialPos, gridSize, level = 0, delayMs = 100) {
    this.r0 = initialPos[0];
    this.c0 = initialPos[1];
    this.gridSize = gridSize;
    this.level = level; // 0 = Disable, 1 = Print without animation, 2 = Print with animation
    this.delayMs = delayMs;
  }

  async delay() {
    return new Promise((resolve) => {
      setTimeout(resolve, this.delayMs);
    });
  }

  getAbsCoordinate([r, c]) {
    return [r + this.r0, c + this.c0];
  }

  isValidPoint([r, c]) {
    const [maxRow, maxCol] = this.gridSize;

    return r >= 0 && r < maxRow && c >= 0 && c < maxCol;
  }

  drawTailPositions(tailPositions) {
    console.log(`### Tail Positions ###\n`);
    const [maxRow, maxCol] = this.gridSize;

    const grid = new Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill("."));

    for (const tail of tailPositions) {
      const [r, c] = this.getAbsCoordinate(tail);

      if (this.isValidPoint([r, c])) grid[r][c] = "#";
    }

    grid[this.r0][this.c0] = "s";

    for (const row of grid) {
      console.log(row.join(""));
    }

    console.log("\n");
  }

  async drawKnots(knots, input, step) {
    if (!this.level) return;

    if (this.level > 1) console.clear();

    console.log(`### ${input} / ${step} ###`);
    const [maxRow, maxCol] = this.gridSize;

    const grid = new Array(maxRow)
      .fill()
      .map(() => new Array(maxCol).fill("."));

    for (let i = 0; i < knots.length; i++) {
      const [r, c] = this.getAbsCoordinate(knots[i]);

      if (this.isValidPoint([r, c]) && grid[r][c] === ".")
        grid[r][c] = i === 0 ? "H" : i;
    }

    grid[this.r0][this.c0] = "s";

    for (const row of grid) {
      console.log(row.join(""));
    }

    if (this.level > 1) await this.delay();

    console.log("\n");
  }
}

module.exports = {
  Logger,
};
