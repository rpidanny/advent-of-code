import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 3", () => {
  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("part 1", () => {
      expect(part1(input)).toEqual(4_361);
    });

    test("part 2", () => {
      expect(part2(input)).toEqual(467_835);
    });
  });

  describe("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("part 1", () => {
      expect(part1(input)).toEqual(535_351);
    });

    test("part 2", () => {
      expect(part2(input)).toEqual(87_287_096);
    });
  });
});
