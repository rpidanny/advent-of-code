/* eslint-disable @typescript-eslint/no-unused-vars */
import { Excavator } from "./excavator";

// Part 1:
export function part1(inputs: string[]) {
  const exc = new Excavator(inputs);
  const digPlan = exc.getDigPlan();

  return exc.startDigging(digPlan);
}

// Part 2:
export function part2(inputs: string[]) {
  const exc = new Excavator(inputs);
  const digPlan = exc.getDigPlanCorrected();

  return exc.startDigging(digPlan);
}
