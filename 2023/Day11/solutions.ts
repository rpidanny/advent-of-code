import {
  findEmptySpaces,
  findGalaxies,
  sumOfDistancesBetweenGalaxies,
} from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const stars = findGalaxies(inputs);
  const emptySpaces = findEmptySpaces(inputs);

  return sumOfDistancesBetweenGalaxies(stars, emptySpaces, 2);
}

// Part 2:
export function part2(inputs: string[], expansion = 1_000_000) {
  const stars = findGalaxies(inputs);
  const emptySpaces = findEmptySpaces(inputs);

  return sumOfDistancesBetweenGalaxies(stars, emptySpaces, expansion);
}
