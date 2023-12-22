import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 2", () => {
  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("part 1", () => {
      expect(part1(input)).toEqual(8);
    });

    test("part 2", () => {
      expect(part2(input)).toEqual(2_286);
    });
  });

  describe("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("part 1", () => {
      expect(part1(input)).toEqual(2_447);
    });

    test("part 2", () => {
      expect(part2(input)).toEqual(56_322);
    });
  });
});
