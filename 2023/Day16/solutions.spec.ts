import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 16", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Number of energized tiles", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(46);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(6361);
    });
  });

  describe("Part 2: Max number of energized tiles", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(51);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(6701);
    });
  });
});
