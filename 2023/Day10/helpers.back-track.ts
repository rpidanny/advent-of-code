import { DOWN, LEFT, RIGHT, UP } from "../utils/directions";

export const pipeDirections: Record<string, number[][]> = {
  F: [DOWN, RIGHT],
  J: [LEFT, UP],
  L: [RIGHT, UP],
  "7": [LEFT, DOWN],
  "|": [DOWN, UP],
  "-": [RIGHT, LEFT],
  S: [DOWN, RIGHT, UP, LEFT],
};

export function isValid(grid: string[], x: number, y: number): boolean {
  return (
    y >= 0 &&
    y < grid.length &&
    x >= 0 &&
    x < grid[y].length &&
    grid[y][x] !== "."
  );
}

export function dfs(
  grid: string[],
  x: number,
  y: number,
  visited = new Set<string>(),
  distance = 0,
): number {
  const pipe = grid[y][x];
  let maxDistance = distance;

  for (const [dx, dy] of pipeDirections[pipe]) {
    const newX = x + dx;
    const newY = y + dy;

    if (isValid(grid, newX, newY) && !visited.has(`${newX},${newY}`)) {
      visited.add(`${newX},${newY}`);
      maxDistance = Math.max(
        maxDistance,
        dfs(grid, newX, newY, visited, distance + 1),
      );
      visited.delete(`${newX},${newY}`);
    }
  }

  return maxDistance;
}
