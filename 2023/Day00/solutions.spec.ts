import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 0", () => {
  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("Part 1", () => {
      expect(part1(input)).toEqual(123);
    });

    test.skip("Part 2", () => {
      expect(part2(input)).toEqual(456);
    });
  });

  describe.skip("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("Part 1", () => {
      expect(part1(input)).toEqual(123);
    });

    test("Part 2", () => {
      expect(part2(input)).toEqual(456);
    });
  });
});
