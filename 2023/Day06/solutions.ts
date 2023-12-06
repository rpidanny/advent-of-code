/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  calculateDistanceTraveled,
  parsePart1Input,
  parsePart2Input,
} from "./helpers";

// Part 1: number of ways you can beat the record
export function part1(inputs: string[]) {
  const records = parsePart1Input(inputs);

  let result = 1;

  for (const { time, distance } of records) {
    let possibleCount = 0;
    for (let i = 1; i <= time; i++) {
      const distanceTraveled = calculateDistanceTraveled(i, time - i);
      if (distanceTraveled > distance) {
        possibleCount++;
      }
    }
    result *= possibleCount;
  }
  return result;
}

// Part 2: number of ways you can beat the record without Kerning
export function part2(inputs: string[]) {
  const { time, distance } = parsePart2Input(inputs);

  let possibleCount = 0;
  for (let i = 14; i <= time; i++) {
    const distanceTraveled = calculateDistanceTraveled(i, time - i);
    if (distanceTraveled > distance) {
      possibleCount++;
    }
  }

  return possibleCount;
}
