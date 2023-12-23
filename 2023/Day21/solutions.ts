import { Garden } from "./garden";

// Part 1:
export function part1(inputs: string[], maxStep = 64) {
  const garden = new Garden(inputs);
  return garden.getTotalPossiblePlotVisits(maxStep);
}

// Part 2:
export function part2(inputs: string[], maxStep = 26_501_365) {
  const garden = new Garden(inputs);
  return garden.getTotalPossiblePlotVisits(maxStep);
}
