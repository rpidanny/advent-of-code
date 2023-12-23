import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 8", () => {
  const testInput1 = getInputLines(path.join(__dirname, `./test.input.txt`));
  const testInput2 = getInputLines(path.join(__dirname, `./test.input.2.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe('Part 1: steps required to reach "ZZZ"', () => {
    test("Test input", () => {
      expect(part1(testInput1)).toEqual(6);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(11_309);
    });
  });

  describe("Part 2: steps required before all nodes end with Z", () => {
    test("Test input", () => {
      expect(part2(testInput2)).toEqual(6);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(13_740_108_158_591);
    });
  });
});
