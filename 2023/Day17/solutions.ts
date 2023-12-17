/* eslint-disable @typescript-eslint/no-unused-vars */
import { RoutePlanner } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const rp = new RoutePlanner(inputs);
  return rp.getMinHeatLoss(1, 3, process.env.VISUALIZE === "true");
}

// Part 2:
export function part2(inputs: string[]) {
  const rp = new RoutePlanner(inputs);
  return rp.getMinHeatLoss(4, 10, process.env.VISUALIZE === "true");
}
