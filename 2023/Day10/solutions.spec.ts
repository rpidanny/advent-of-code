import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 10", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const testInput2 = getInputLines(path.join(__dirname, `./test.input.2.txt`));
  const testInput3 = getInputLines(path.join(__dirname, `./test.input.3.txt`));
  const testInput4 = getInputLines(path.join(__dirname, `./test.input.4.txt`));

  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: farthest point from the starting position", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(8);
    });

    test("Test Input 2", () => {
      expect(part1([".....", ".S-7.", ".|.|.", ".L-J.", "....."])).toEqual(4);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(6886);
    });
  });

  describe("Part 2", () => {
    test("Test Input 2", () => {
      expect(part2(testInput2)).toEqual(4);
    });

    test("Test Input 3", () => {
      expect(part2(testInput3)).toEqual(10);
    });

    test("Test Input 4", () => {
      expect(part2(testInput4)).toEqual(8);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(371);
    });
  });
});
