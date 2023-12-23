const {delayMs} = require('../utils/delay');

class SandSimulation {
  directions = [
    [1, 0],
    [1, -1],
    [1, 1],
  ];

  constructor(grid) {
    this.grid = grid;
  }

  isCellEmpty(r, c) {
    return this.grid.getValue(r, c) === ' ';
  }

  hasSandFallenIntoAbyss(r) {
    return r >= this.grid.size.row;
  }

  addSand([c, r]) {
    let currentPos = [c, r];

    let hasSettled = false;
    let cantAddMoreSand = false;

    if (this.grid.getValue(r, c) === 'o') {
      return false;
    }

    while (!cantAddMoreSand && !hasSettled) {
      hasSettled = true;
      for (const [dr, dc] of this.directions) {
        const [oc, or] = currentPos;
        const [nr, nc] = [or + dr, oc + dc];

        if (this.hasSandFallenIntoAbyss(nr)) {
          cantAddMoreSand = true;
          break;
        }

        if (!this.isCellEmpty(nr, nc)) continue;

        currentPos = [nc, nr];
        hasSettled = false;
        break;
      }
    }

    if (hasSettled) this.grid.setValue(currentPos[1], currentPos[0], 'o');

    return hasSettled && !cantAddMoreSand;
  }

  async animate(ms) {
    console.clear();
    this.grid.print();
    await delayMs(ms);
  }

  async run(sandSource, animateMs = 0) {
    let sandCount = 0;
    while (true) {
      if (!this.addSand(sandSource)) return sandCount;
      if (animateMs) await this.animate(animateMs);
      sandCount++;
    }
  }
}

module.exports = {
  SandSimulation,
};
