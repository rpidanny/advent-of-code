import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 25", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test.only("Test Input", () => {
      expect(part1(testInput)).toEqual(123);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(123);
    });
  });

  describe("Part 2", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(456);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(456);
    });
  });
});
