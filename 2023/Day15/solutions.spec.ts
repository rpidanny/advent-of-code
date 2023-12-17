import path from "path";

import { getInputLines } from "../utils/input";
import { calculateHash } from "./helpers";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 15", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Hash Sum", () => {
    test("calculateHash", () => {
      expect(calculateHash("HASH")).toEqual(52);
    });
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(1320);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(503487);
    });
  });

  describe("Part 2: Lens focusing power sum", () => {
    test("Test Input", () => {
      expect(part2(testInput)).toEqual(145);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(261505);
    });
  });
});
