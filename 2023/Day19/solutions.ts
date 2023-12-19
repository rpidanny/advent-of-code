import { XmasWorkflow } from "./xmas-workflow";

// Part 1:
export function part1(inputs: string[]) {
  const workflow = new XmasWorkflow(inputs);
  return workflow.sumOfAcceptedRatings("in");
}

// Part 2:
export function part2(inputs: string[]) {
  const workflow = new XmasWorkflow(inputs);
  return workflow.getTotalPossibleAcceptedParts("in");
}
