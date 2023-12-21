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

  private getStartingPosition(): [number, number] {
    return [this.maxX / 2, this.maxY / 2];
  }

  public mapToVirtualGrid([x, y]: [number, number]): [number, number] {
    const mod = (n: number, max: number) =>
      ((n % (max + 1)) + max + 1) % (max + 1);
    const xMod = mod(x, this.maxX);
    const yMod = mod(y, this.maxY);
    return [xMod, yMod];
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

  private isQualifyingSample(step: number) {
    return step % (this.maxX + 1) === this.midX;
  }

  public getTotalPossiblePlotVisits(maxStep: number) {
    let queue: [number, number][] = [[this.startX, this.startY]];

    let stepCount = 0;
    const xSamples: number[] = [];
    const ySamples: number[] = [];

    const canInterpolate = this.isQualifyingSample(maxStep);

    while (xSamples.length < 3 || !canInterpolate) {
      const levelSize = queue.length;

      if (stepCount === maxStep) return levelSize;

      if (this.isQualifyingSample(stepCount)) {
        xSamples.push(stepCount);
        ySamples.push(levelSize);
      }

      const visited = new Set<string>();
      const nextQueue: [number, number][] = [];

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

    return Math.floor(new Lagrange(xSamples, ySamples).interpolate(maxStep));
  }
}
