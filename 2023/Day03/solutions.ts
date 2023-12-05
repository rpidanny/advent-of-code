import { findAdjacentNumbers } from "./helpers";

// Part 1: Sum of part Numbers
export function part1(inputs: string[]) {
  let sum = 0;
  for (let r = 0; r < inputs.length; r++) {
    for (let c = 0; c < inputs[r].length; c++) {
      const char = inputs[r][c];
      if (char === ".") continue;
      if (!isNaN(parseInt(char))) continue;

      const adjacentNumbers = findAdjacentNumbers(inputs, r, c);
      for (const adjacentNumber of adjacentNumbers) {
        sum += adjacentNumber;
      }
    }
  }
  return sum;
}

// Part 2: Gear Ratio
export function part2(inputs: string[]) {
  let sumOfGearRatio = 0;
  for (let r = 0; r < inputs.length; r++) {
    for (let c = 0; c < inputs[r].length; c++) {
      const char = inputs[r][c];
      if (char !== "*") continue;

      const adjacentNumbers = findAdjacentNumbers(inputs, r, c);
      if (adjacentNumbers.length !== 2) continue;

      const gearRatio = adjacentNumbers[0] * adjacentNumbers[1];
      sumOfGearRatio += gearRatio;
    }
  }
  return sumOfGearRatio;
}
