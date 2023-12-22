class Grid {
  constructor(maxRow, maxCol, rowOffset, colOffset) {
    this.rowOffset = rowOffset;
    this.colOffset = colOffset;
    this.grid = new Array(maxRow).fill().map(() => new Array(maxCol).fill(' '));
  }

  getValue(r, c) {
    return this.grid[r - this.rowOffset][c - this.colOffset];
  }

  setValue(r, c, val) {
    this.grid[r - this.rowOffset][c - this.colOffset] = val;
  }

  setRowValues(r, val) {
    for (let c = 0; c < this.grid[r].length; c++) {
      this.grid[r][c] = val;
    }
  }

  get size() {
    return {
      row: this.grid.length,
      col: this.grid[0].length,
    };
  }

  print(includeIdx = false) {
    for (let i = 0; i < this.grid.length; i++) {
      if (includeIdx) {
        console.log(`${i}: ${this.grid[i].join('')}`);
      } else {
        console.log(this.grid[i].join(''));
      }
    }
  }
}

module.exports = {
  Grid,
};
