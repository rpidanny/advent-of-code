import { leastCommonMultiple } from "../utils/math";
import { parseInput, traverseMap } from "./helpers";

// Part 1: steps required to reach ZZZ
export function part1(inputs: string[]) {
  const map = parseInput(inputs);

  return traverseMap(map, "AAA", (node: string) => node === "ZZZ");
}

// Part 2: steps required before all nodes end with Z
export function part2(inputs: string[]) {
  const map = parseInput(inputs);

  const startNodes = Object.keys(map.nodes).filter((node) =>
    node.endsWith("A"),
  );

  const steps = startNodes.map((node) =>
    traverseMap(map, node, (node: string) => node.endsWith("Z")),
  );

  return leastCommonMultiple(steps);
}
