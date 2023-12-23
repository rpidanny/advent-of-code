import chalk from "chalk";

import { Direction, DOWN, LEFT, RIGHT, UP } from "../utils/directions";
import { printGrid } from "../utils/output";

export class PathFinder {
  grid: string[][];
  directionsMap: Record<string, Direction> = {
    ">": RIGHT,
    "<": LEFT,
    "^": UP,
    v: DOWN,
  };
  directions = [UP, DOWN, LEFT, RIGHT];
  start: [number, number];
  end: [number, number];
  startNode: string;
  endNode: string;
  graph: Map<string, [string, number][]> = new Map<
    string,
    [string, number][]
  >();
  visualize: boolean;

  constructor(grid: string[], visualize = false) {
    this.grid = grid.map((row) => row.split(""));
    this.start = this.getStartingPoint();
    this.end = this.getEndPoint();
    this.startNode = this.start.join(",");
    this.endNode = this.end.join(",");
    this.visualize = visualize;
  }

  /**
   * Check if the given index is valid
   *
   * @param x x-coordinate of the index
   * @param y y-coordinate of the index
   * @returns true if the index is valid, false otherwise
   *
   * */
  private isIndexInValid(x: number, y: number): boolean {
    return x < 0 || y < 0 || x >= this.grid[0].length || y >= this.grid.length;
  }

  /**
   * Get the starting point of the grid
   * @returns starting point of the grid
   * */
  private getStartingPoint(): [number, number] {
    const x = this.grid[0].findIndex((char) => char === ".");
    return [x, 0];
  }

  /**
   * Get the end point of the grid
   * @returns end point of the grid
   * */
  private getEndPoint(): [number, number] {
    const idx = this.grid.length - 1;
    const x = this.grid[idx].findIndex((char) => char === ".");
    return [x, idx];
  }

  /**
   * Get all the nodes that have more than 2 neighbors
   *
   * @returns list of nodes that have more than 2 neighbors
   *
   * */
  private getNodes(): [number, number][] {
    const stack: [number, number][] = [this.start];
    const nodes: [number, number][] = [this.start];

    const visited = new Set<string>();

    while (stack.length) {
      const [x, y] = stack.pop();

      const key = `${x},${y}`;
      if (visited.has(key)) continue;
      visited.add(key);

      let neighborCount = 0;
      for (const [dx, dy] of this.directions) {
        const [nx, ny] = [x + dx, y + dy];

        if (this.isIndexInValid(nx, ny)) continue;
        if (this.grid[ny][nx] === "#") continue;

        stack.push([nx, ny]);
        neighborCount++;
      }

      if (neighborCount > 2) {
        nodes.push([x, y]);
      }
    }

    nodes.push(this.end);
    return nodes;
  }

  /**
   * Create a graph with edge contraction for the given grid: https://en.wikipedia.org/wiki/Edge_contraction
   *
   * For NP-hard problems, we can use edge contraction to reduce the number of nodes in the graph and then solve the problem quicker.
   * In this problem, we can contract all the nodes that have only 2 neighbors i.e. nodes that are not junctions.
   *
   * */
  private createEdgeContractedGraph() {
    const nodes = this.getNodes();
    const nodeSet = new Set(nodes.map((node) => node.join(",")));

    // for each node, do a DFS to find all the nodes that are reachable from it
    for (const [x, y] of nodes) {
      const stack = [[x, y, 0]];
      const srcKey = `${x},${y}`;
      this.graph.set(srcKey, []);

      const visited = new Set<string>();

      while (stack.length) {
        const [x1, y1, length] = stack.pop();
        const key = `${x1},${y1}`;

        if (visited.has(key)) continue;
        visited.add(key);

        if (key !== srcKey && nodeSet.has(key)) {
          this.graph.get(srcKey).push([`${x1},${y1}`, length]);
          continue;
        }

        for (const [dx, dy] of this.directions) {
          const [nx, ny] = [x1 + dx, y1 + dy];

          if (this.isIndexInValid(nx, ny)) continue;
          if (this.grid[ny][nx] === "#") continue;

          stack.push([nx, ny, length + 1]);
        }
      }
    }
  }

  /**
   * Visualize the current path
   *
   * @param visited set of visited nodes (i.e. path)
   *
   * */
  private visualizePath(visited: Set<string>) {
    const points = Array.from(visited).map((key) => key.split(",").map(Number));

    const tempGrid = this.grid.map((row) =>
      row.map((char) => chalk.bold.gray(char)),
    );

    for (const [x, y] of points) {
      tempGrid[y][x] = chalk.cyan.bold("0");
    }

    printGrid(tempGrid, (char) => char, 60);
  }

  /**
   * Backtracking through the grid
   *
   * @param x x-coordinate of the current node
   * @param y y-coordinate of the current node
   * @param length length of the current path
   * @param visited set of visited nodes
   * @returns maximum length of the path from the starting node to the end node
   *
   * */
  private dfs(
    x: number,
    y: number,
    length = 0,
    visited = new Set<string>(),
  ): number {
    if (x === this.end[0] && y === this.end[1]) {
      if (this.visualize) this.visualizePath(visited);
      return length;
    }

    const key = `${x},${y}`;

    if (visited.has(key)) return 0;
    visited.add(key);

    let longestPath = 0;

    if (this.grid[y][x] === ".") {
      for (const [dx, dy] of this.directions) {
        const [nx, ny] = [x + dx, y + dy];

        if (this.isIndexInValid(nx, ny)) continue;
        if (this.grid[ny][nx] === "#") continue;

        longestPath = Math.max(
          longestPath,
          this.dfs(nx, ny, length + 1, visited),
        );
      }
    } else {
      // if we are on a slope, we can only go in one direction
      const [dx, dy] = this.directionsMap[this.grid[y][x]];
      const [nx, ny] = [x + dx, y + dy];

      if (this.isIndexInValid(nx, ny)) return 0;
      if (this.grid[ny][nx] === "#") return 0;

      longestPath = Math.max(
        longestPath,
        this.dfs(nx, ny, length + 1, visited),
      );
    }

    visited.delete(key);

    return longestPath;
  }

  /**
   * Backtracking through an edge contracted graph
   *
   * @param node starting node
   * @param distance distance from the starting node
   * @param visited set of visited nodes
   * @returns maximum distance from the starting node to the end node
   *
   **/
  private dfs2(
    node: string,
    distance = 0,
    visited = new Set<string>(),
  ): number {
    if (node === this.endNode) return distance;

    let longestPath = 0;
    for (const [neighbor, length] of this.graph.get(node)) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      longestPath = Math.max(
        longestPath,
        this.dfs2(neighbor, length + distance, visited),
      );
      visited.delete(neighbor);
    }

    return longestPath;
  }

  public lengthOfLongestPath(): number {
    return this.dfs(this.start[0], this.start[1]);
  }

  public lengthOfLongestPathWithoutSlope(): number {
    this.createEdgeContractedGraph();
    return this.dfs2(this.startNode);
  }
}
