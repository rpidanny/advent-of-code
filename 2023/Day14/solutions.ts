import { Direction, parseInput, Platform } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const grid = parseInput(inputs);

  const platform = new Platform(grid);
  platform.tilt(Direction.North);

  return platform.getTotalLoad(Direction.North);
}

// Part 2:
export function part2(inputs: string[], cycles = 1_000_000_000) {
  const grid = parseInput(inputs);

  const platform = new Platform(grid);
  platform.spinCycle(cycles);

  return platform.getTotalLoad(Direction.North);
}
