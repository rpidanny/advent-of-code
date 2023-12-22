import { BrickPile } from "./brick-pile";

// Part 1:
export function part1(inputs: string[]) {
  const bp = new BrickPile(inputs);
  return bp.countRemovableBricks();
}

// Part 2:
export function part2(inputs: string[]) {
  const bp = new BrickPile(inputs);
  return bp.countFallingBricks();
}
