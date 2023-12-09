import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 9", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: extrapolate forward", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(114);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(2101499000);
    });
  });

  describe("Part 2: extrapolate backwards", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(2);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(1089);
    });
  });
});
