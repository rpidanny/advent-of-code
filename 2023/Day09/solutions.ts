import { extrapolateBackward, extrapolateForward, parseInput } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const nums = parseInput(inputs);

  return nums.reduce((acc, nums) => acc + extrapolateForward(nums), 0);
}

// Part 2:
export function part2(inputs: string[]) {
  const nums = parseInput(inputs);

  return nums.reduce((acc, nums) => acc + extrapolateBackward(nums), 0);
}
