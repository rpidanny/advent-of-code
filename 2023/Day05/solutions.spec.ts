import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 5", () => {
  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("Part 1", () => {
      expect(part1(input)).toEqual(35);
    });

    test("Part 2", async () => {
      await expect(part2(input)).resolves.toEqual(46);
    });
  });

  describe("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("Part 1", () => {
      expect(part1(input)).toEqual(196167384);
    });

    // This test is skipped because it takes a long time to run
    test.skip("Part 2", async () => {
      await expect(part2(input)).resolves.toEqual(125742456);
    });
  });
});
