import { basicDirections, DOWN, LEFT, RIGHT, UP } from "../utils/directions";

const pipeDirections: Record<string, number[][]> = {
  F: [DOWN, RIGHT],
  J: [LEFT, UP],
  L: [RIGHT, UP],
  "7": [LEFT, DOWN],
  "|": [DOWN, UP],
  "-": [RIGHT, LEFT],
};

const sValidNeighbors: Record<string, Set<string>> = {
  up: new Set(["|", "F", "7"]),
  down: new Set(["|", "L", "J"]),
  left: new Set(["L", "F", "-"]),
  right: new Set(["J", "7", "-"]),
};

function isValid(grid: string[], x: number, y: number): boolean {
  return (
    y >= 0 &&
    y < grid.length &&
    x >= 0 &&
    x < grid[y].length &&
    grid[y][x] !== "."
  );
}

function getPipe(grid: string[], x: number, y: number): string {
  if (grid[y][x] === "S") return getSourcePipe(grid, x, y);
  return grid[y][x];
}

function getNumOfCrossings(
  grid: string[],
  x: number,
  y: number,
  pathSet: Set<string>,
): number {
  let crossings = 0;

  for (let i = x; i < grid[y].length; i++) {
    if (!pathSet.has(`${i},${y}`)) continue;

    const pipe = getPipe(grid, i, y);
    if (
      pipe === "|" ||
      (pipe === "L" && checkAndIncrementCrossings(grid, i, y, "7")) ||
      (pipe === "F" && checkAndIncrementCrossings(grid, i, y, "J"))
    ) {
      crossings++;
    }
  }

  return crossings;
}

function checkAndIncrementCrossings(
  grid: string[],
  x: number,
  y: number,
  targetPipe: string,
): boolean {
  while (!["J", "7"].includes(getPipe(grid, x, y))) {
    x++;
  }
  return getPipe(grid, x, y) === targetPipe;
}

function getSourcePipe(
  grid: string[],
  x: number,
  y: number,
): string | undefined {
  const neighborDirs = Object.keys(basicDirections)
    .filter((dir) => {
      const [dx, dy] = basicDirections[dir];
      const [newX, newY] = [x + dx, y + dy];

      return (
        isValid(grid, newX, newY) && sValidNeighbors[dir].has(grid[newY][newX])
      );
    })
    .sort()
    .join("");

  return {
    downleft: "7",
    downright: "F",
    leftup: "J",
    rightup: "L",
    leftright: "-",
    downup: "|",
  }[neighborDirs];
}

export function getPath(grid: string[], x: number, y: number): Set<string> {
  const visited = new Set<string>([`${x},${y}`]);
  const queue = [[x, y]];

  while (queue.length) {
    const [x, y] = queue.pop() as [number, number, number];

    for (const [dx, dy] of pipeDirections[getPipe(grid, x, y)]) {
      const [newX, newY] = [x + dx, y + dy];

      if (!isValid(grid, newX, newY) || visited.has(`${newX},${newY}`))
        continue;

      visited.add(`${newX},${newY}`);
      queue.push([newX, newY]);
    }
  }

  return visited;
}

// Using Ray Casting Algorithm: https://en.wikipedia.org/wiki/Point_in_polygon
export function getEnclosedArea(grid: string[], path: Set<string>): number {
  let count = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (path.has(`${x},${y}`)) continue;

      const crossings = getNumOfCrossings(grid, x, y, path);
      if (crossings % 2 === 1) {
        count++;
      }
    }
  }
  return count;
}
