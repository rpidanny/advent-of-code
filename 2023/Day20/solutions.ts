import { Circuit } from "./circuit";

// Part 1:
export function part1(inputs: string[]) {
  const circuit = new Circuit(inputs);
  return circuit.getProductOfHighLowCount();
}

// Part 2:
export function part2(inputs: string[]) {
  const circuit = new Circuit(inputs);
  return circuit.numOfBtnPressesUntilLowPulse();
}
