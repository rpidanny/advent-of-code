/* eslint-disable @typescript-eslint/no-unused-vars */
import { Forecast } from "./forecast";

// Part 1:
export function part1(
  inputs: string[],
  min = 200_000_000_000_000,
  max = 400_000_000_000_000,
) {
  const fc = new Forecast(inputs);
  return fc.countIntersectingHailstones(min, max);
}

// Part 2:
export async function part2(inputs: string[]) {
  const fc = new Forecast(inputs);

  const { x, y, z } = await fc.getInitialStonePosition();

  return x + y + z;
}
