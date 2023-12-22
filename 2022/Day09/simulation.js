class RopeSimulation {
  diagonalDirections = {
    D1: [1, 1],
    D2: [-1, -1],
    D3: [1, -1],
    D4: [-1, 1],
  };

  directions = {
    R: [0, 1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0],
    ...this.diagonalDirections,
    // Same point
    S: [0, 0],
  };

  constructor(numOfKnots, logger, initialPos = [0, 0]) {
    this.numOfKnots = numOfKnots;
    this.logger = logger;

    this.tailPositions = new Set([this.getPositionId(initialPos)]);
    this.knots = new Array(numOfKnots).fill().map(() => [...initialPos]);
  }

  getPositionId([row, col]) {
    return `${row},${col}`;
  }

  areKnotsTouching = ([hr, hc], [tr, tc]) => {
    for (const [dr, dc] of Object.values(this.directions)) {
      if (tr + dr === hr && tc + dc === hc) return true;
    }
    return false;
  };

  updateHeadPosition(direction) {
    this.knots[0][0] += this.directions[direction][0];
    this.knots[0][1] += this.directions[direction][1];
  }

  moveDiagonal(r) {
    // Try all diagonal directions and move to the first valid diagonal
    for (const [dr, dc] of Object.values(this.diagonalDirections)) {
      const newPos = [this.knots[r + 1][0] + dr, this.knots[r + 1][1] + dc];
      if (this.areKnotsTouching(this.knots[r], newPos)) {
        this.knots[r + 1][0] = newPos[0];
        this.knots[r + 1][1] = newPos[1];
        break;
      }
    }
  }

  tick(direction) {
    this.updateHeadPosition(direction);

    for (let r = 0; r < this.numOfKnots - 1; r++) {
      if (!this.areKnotsTouching(this.knots[r], this.knots[r + 1])) {
        // if the head and tail aren't touching and aren't in the same row or column, the tail always moves one step diagonally to keep up:
        if (
          this.knots[r][0] !== this.knots[r + 1][0] &&
          this.knots[r][1] !== this.knots[r + 1][1]
        ) {
          this.moveDiagonal(r);
        } else {
          // Move the next knot next to the current knot
          this.knots[r + 1][0] = (this.knots[r + 1][0] + this.knots[r][0]) / 2;
          this.knots[r + 1][1] = (this.knots[r + 1][1] + this.knots[r][1]) / 2;
        }
      }
    }

    // record tail position
    this.tailPositions.add(this.getPositionId(this.knots[this.numOfKnots - 1]));
  }

  async runSimulation(inputs) {
    for (const input of inputs) {
      const [direction, steps] = input.split(' ');
      for (let i = 0; i < steps; i++) {
        this.tick(direction);

        await this.logger.drawKnots(this.knots, input, i + 1);
      }
    }
  }

  getUniqueTailPositions() {
    return Array.from(this.tailPositions).map((p) => p.split(',').map((d) => parseInt(d)));
  }
}

module.exports = {
  RopeSimulation,
};
