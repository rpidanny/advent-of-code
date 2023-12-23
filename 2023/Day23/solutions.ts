import { PathFinder } from "./path-finder";

// Part 1:
export function part1(inputs: string[]) {
  const pf = new PathFinder(inputs, process.env.VISUALIZE === "true");

  return pf.lengthOfLongestPath();
}

// Part 2:
export function part2(inputs: string[]) {
  const pf = new PathFinder(inputs);

  return pf.lengthOfLongestPathWithoutSlope();
}
