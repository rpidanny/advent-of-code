import { calculateHash, LightGuide, parseInput } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  return parseInput(inputs).reduce((acc, curr) => {
    return acc + calculateHash(curr);
  }, 0);
}

// Part 2:
export function part2(inputs: string[]) {
  const steps = parseInput(inputs);

  const lightGuide = new LightGuide();

  for (const step of steps) {
    lightGuide.hashMap(step);
  }

  return lightGuide.lensFocusingPowerSum();
}
