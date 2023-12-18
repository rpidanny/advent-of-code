import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 18", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(62);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(47139);
    });
  });

  describe("Part 2", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(952408144115);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(173152345887206);
    });
  });
});
