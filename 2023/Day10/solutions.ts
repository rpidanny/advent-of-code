import { getEnclosedArea, getPath } from "./helpers";

// Part 1: farthest point from the starting position
export function part1(inputs: string[]) {
  for (let y = 0; y < inputs.length; y++) {
    for (let x = 0; x < inputs[y].length; x++) {
      if (inputs[y][x] === "S") {
        return getPath(inputs, x, y).size / 2;
      }
    }
  }
}

// Part 2:
export function part2(inputs: string[]) {
  for (let y = 0; y < inputs.length; y++) {
    for (let x = 0; x < inputs[y].length; x++) {
      if (inputs[y][x] === "S") {
        const path = getPath(inputs, x, y);
        return getEnclosedArea(inputs, path);
      }
    }
  }
}
