import { findFirstInt } from "./helpers";

// Part 1;
export function step1(inputs: string[]) {
  let sum = 0;

  for (const line of inputs) {
    sum += 10 * findFirstInt(line) + findFirstInt(line, false);
  }

  return sum;
}

// Part 2:
export function step2(inputs: string[]) {
  let sum = 0;

  for (const line of inputs) {
    sum += 10 * findFirstInt(line) + findFirstInt(line, false);
  }

  return sum;
}
