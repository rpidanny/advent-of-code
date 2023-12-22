import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 22", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Count Redundant Bricks", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(5);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(468);
    });
  });

  describe("Part 2: Count total falling bricks with chain reaction", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(7);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(75358);
    });
  });
});
