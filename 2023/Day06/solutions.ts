/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  parsePart1Input,
  parsePart2Input,
  timeCombinationsToExceedDistance,
} from "./helpers";

// Part 1: number of ways you can beat the record
export function part1(inputs: string[]) {
  const records = parsePart1Input(inputs);

  let result = 1;

  for (const { time, distance } of records) {
    const possibleCount = timeCombinationsToExceedDistance(time, distance);
    result *= possibleCount;
  }

  return result;
}

// Part 2: number of ways you can beat the record without Kerning
export function part2(inputs: string[]) {
  const { time, distance } = parsePart2Input(inputs);

  return timeCombinationsToExceedDistance(time, distance);
}
