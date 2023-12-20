import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 20", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const testInput2 = getInputLines(path.join(__dirname, `./test.input.2.txt`));

  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Product of High and Low Pulse counts", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(32000000);
    });

    test("Test Input 2", () => {
      expect(part1(testInput2)).toEqual(11687500);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(886347020);
    });
  });

  describe("Part 2: Number of Button presses until low pulse to rx", () => {
    test("Input", () => {
      expect(part2(input)).toEqual(233283622908263);
    });
  });
});
