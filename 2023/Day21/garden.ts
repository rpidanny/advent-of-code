import { basicDirections } from "../utils/directions";
import { Lagrange } from "../utils/lagrange";

export class Garden {
  grid: string[][];
  maxX: number;
  maxY: number;
  midX: number;
  startX: number;
  startY: number;
  directions: [number, number][] = Object.values(basicDirections);

  constructor(inputs: string[]) {
    this.grid = inputs.map((line) => line.split(""));

    this.maxX = this.grid[0].length - 1;
    this.maxY = this.grid.length - 1;
    this.midX = Math.floor(this.maxX / 2);

    [this.startX, this.startY] = this.getStartingPosition();
  }

  // the starting position is always the middle of the grid based on the input
  private getStartingPosition(): [number, number] {
    return [this.maxX / 2, this.maxY / 2];
  }

  private printVirtualGrid(multiplier: number) {
    for (
      let y = -this.maxX * multiplier + 1;
      y <= this.maxX * multiplier;
      y++
    ) {
      const row = [];
      for (
        let x = -this.maxY * multiplier + 1;
        x <= this.maxY * multiplier;
        x++
      ) {
        const [xMod, yMod] = this.mapToVirtualGrid([x, y]);
        row.push(this.grid[yMod][xMod]);
      }
      console.log(row.join(""));
    }
  }

  // the infinite grid is complete in `width * n + (width /2 )` steps
  // so only steps that are on the edge of the grid are qualifying samples
  private isQualifyingSample(step: number) {
    return step % (this.maxX + 1) === this.midX;
  }

  // the virtual grid is infinite, so we need to map the coordinates to the grid
  public mapToVirtualGrid([x, y]: [number, number]): [number, number] {
    const mod = (n: number, max: number) =>
      ((n % (max + 1)) + max + 1) % (max + 1);
    const xMod = mod(x, this.maxX);
    const yMod = mod(y, this.maxY);
    return [xMod, yMod];
  }

  public getTotalPossiblePlotVisits(maxStep: number) {
    let queue: [number, number][] = [[this.startX, this.startY]];

    let stepCount = 0;

    const samples: [number, number][] = [];

    // check if we can interpolate with the current samples
    // if not we brute force until the max step is reached
    const canInterpolate = this.isQualifyingSample(maxStep);

    // 3 samples are enough to interpolate for a second degree polynomial
    while (samples.length < 3 || !canInterpolate) {
      const levelSize = queue.length;

      if (stepCount === maxStep) return levelSize;

      // only add samples that are on the edge of the grid
      if (this.isQualifyingSample(stepCount)) {
        samples.push([stepCount, levelSize]);
      }

      const visited = new Set<string>();

      // array.shift() is O(n) so we use a new queue instead and just iterate over it in O(1)
      const nextQueue: [number, number][] = [];

      // BFS with sequential iteration over the queue instead of queue.shift()
      for (const [x, y] of queue) {
        for (const [dx, dy] of this.directions) {
          const [newX, newY] = [x + dx, y + dy];

          const key = `${newX},${newY}`;
          if (visited.has(key)) continue;

          const [xMod, yMod] = this.mapToVirtualGrid([newX, newY]);

          if (this.grid[xMod][yMod] === "#") continue;

          visited.add(key);

          nextQueue.push([newX, newY]);
        }
      }

      stepCount++;
      queue = nextQueue;
    }

    return Math.floor(new Lagrange(samples).interpolate(maxStep));
  }
}
