import chalk from "chalk";

import { basicDirections } from "../utils/directions";
import { Heap } from "../utils/heap";
import { printGrid } from "../utils/output";

interface State {
  pos: [number, number];
  dir: [number, number];
  mCount: number;
  path?: [number, number][];
}

export class RoutePlanner {
  map: number[][];
  directions = Object.values(basicDirections);
  timestamp = Date.now();

  constructor(grid: string[]) {
    this.map = grid.map((row) => row.split("").map(Number));
  }

  public getMinHeatLoss(min: number, max: number, visualize = false): number {
    const minHeap = new Heap<State>((a, b) => a - b);
    const visited = this.initializeVisitedArray();

    const seenState = new Set<string>();

    minHeap.add({
      weight: 0,
      data: {
        pos: [0, 0],
        dir: [0, 0],
        mCount: 0,
        path: [[0, 0]],
      },
    });

    while (minHeap.length) {
      const { weight, data } = minHeap.pop();
      const {
        pos: [x, y],
        dir: [dx, dy],
        mCount,
        path,
      } = data;

      if (this.isDestination(x, y) && mCount >= min) {
        visualize && this.visualizePath(visited, path);
        return weight;
      }

      const key = this.createKey(x, y, dx, dy, mCount);

      if (seenState.has(key)) continue;
      seenState.add(key);

      visualize && this.visualizeStep(visited, x, y);

      for (const [ndx, ndy] of this.directions) {
        if (dx === -ndx && dy === -ndy) continue;
        const [nx, ny] = [x + ndx, y + ndy];

        if (this.isInvalidIndex(nx, ny)) continue;

        const dirChange = dx !== ndx || dy !== ndy;
        const nMCount = dirChange ? 1 : mCount + 1;

        if (nMCount > max) continue;
        if (!(dx === 0 && dy === 0) && dirChange && mCount < min) continue;

        minHeap.add({
          weight: weight + this.map[ny][nx],
          data: {
            pos: [nx, ny],
            dir: [ndx, ndy],
            mCount: nMCount,
            path: this.createPath(path, visualize, nx, ny),
          },
        });
      }
    }
  }

  private initializeVisitedArray(): string[][] {
    return Array.from({ length: this.map.length }, (_, i) =>
      this.map[i].map((n) => `${chalk.gray(n)}`),
    );
  }

  private createKey(
    x: number,
    y: number,
    dx: number,
    dy: number,
    mCount: number,
  ): string {
    return `${x},${y},${dx},${dy},${mCount}`;
  }

  private visualizeStep(visited: string[][], x: number, y: number): void {
    visited[y][x] = `${chalk.red(this.map[y][x])}`;

    if (Date.now() - this.timestamp > 30) {
      printGrid(visited, (v) => v);
      this.timestamp = Date.now();
    }
  }

  private visualizePath(visited: string[][], path: [number, number][]): void {
    for (const [x, y] of path) {
      visited[y][x] = `${chalk.cyan(this.map[y][x])}`;
      printGrid(visited, (v) => v);
    }
  }

  private createPath(
    path: [number, number][],
    visualize: boolean,
    nx: number,
    ny: number,
  ): [number, number][] {
    return visualize ? [...path, [nx, ny]] : [];
  }

  private isInvalidIndex(x: number, y: number): boolean {
    return x < 0 || x >= this.map[0].length || y < 0 || y >= this.map.length;
  }

  private isDestination(x: number, y: number): boolean {
    return x === this.map[0].length - 1 && y === this.map.length - 1;
  }
}
