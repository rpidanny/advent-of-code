/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPossibleArrangements } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  return inputs.reduce((acc, line) => acc + getPossibleArrangements(line), 0);
}

// Part 2:
export function part2(inputs: string[]) {
  return inputs.reduce(
    (acc, line) => acc + getPossibleArrangements(line, true),
    0,
  );
}
