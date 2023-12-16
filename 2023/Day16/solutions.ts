import { Direction, LightContraption } from "./light-contraption";

// Part 1:
export function part1(inputs: string[]) {
  const contraption = new LightContraption(inputs);
  return contraption.countEnergized({
    dir: Direction.RIGHT,
    pos: { x: 0, y: 0 },
  });
}

// Part 2:
export function part2(inputs: string[]) {
  const contraption = new LightContraption(inputs);
  return contraption.maxEnergized();
}
