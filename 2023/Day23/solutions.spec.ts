import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 23", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test Input: Longest path", () => {
      expect(part1(testInput)).toEqual(94);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(2_074);
    });
  });

  describe("Part 2: Longest path without slope", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(154);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(6_494);
    });
  });
});
