import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 17", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const testInput2 = getInputLines(path.join(__dirname, `./test.input.2.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Minimum heat loss", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(102);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(674);
    });
  });

  describe("Part 2: Minimum heat loss with ultra crucibles", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(94);
    });

    test("Test Input 2", () => {
      expect(part2(testInput2)).toEqual(71);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(773);
    });
  });
});
