import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 4", () => {
  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("part 1", () => {
      expect(part1(input)).toEqual(13);
    });

    test("part 2", () => {
      expect(part2(input)).toEqual(30);
    });
  });

  describe("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("part 1", () => {
      expect(part1(input)).toEqual(18519);
    });

    test("part 2", () => {
      expect(part2(input)).toEqual(11787590);
    });
  });
});
