import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 19", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(19_114);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(432_427);
    });
  });

  describe("Part 2", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(167_409_079_868_000);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(143_760_172_569_135);
    });
  });
});
