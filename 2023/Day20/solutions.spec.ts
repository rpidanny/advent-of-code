import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 20", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const testInput2 = getInputLines(path.join(__dirname, `./test.input.2.txt`));

  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Product of High and Low Pulse counts", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(32_000_000);
    });

    test("Test Input 2", () => {
      expect(part1(testInput2)).toEqual(11_687_500);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(886_347_020);
    });
  });

  describe("Part 2: Number of Button presses until low pulse to rx", () => {
    test("Input", () => {
      expect(part2(input)).toEqual(233_283_622_908_263);
    });
  });
});
