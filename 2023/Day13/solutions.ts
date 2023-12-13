import { getPatterns, summarizePattern } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const patterns = getPatterns(inputs);
  return patterns.reduce((acc, pattern) => acc + summarizePattern(pattern), 0);
}

// Part 2:
export function part2(inputs: string[]) {
  const patterns = getPatterns(inputs);
  return patterns.reduce(
    (acc, pattern) => acc + summarizePattern(pattern, true),
    0,
  );
}
