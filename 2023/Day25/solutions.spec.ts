import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 25", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(54);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(551_196);
    });
  });

  describe("Part 2", () => {
    test("Input", () => {
      expect(part2()).toEqual(50);
    });
  });
});
