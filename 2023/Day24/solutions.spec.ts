import path from "path";

import { getInputLines } from "../utils/input";
import { Forecast, Point } from "./forecast";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 24", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    const fc = new Forecast(testInput);

    test("findIntersection", () => {
      const hailStones = fc.getHailstones();

      const { x, y } = fc.findIntersection(
        hailStones[0],
        hailStones[1],
      ) as Point;
      expect(x).toBeCloseTo(14.33);
      expect(y).toBeCloseTo(15.33);
    });

    test("Test Input", () => {
      expect(part1(testInput, 7, 27)).toEqual(2);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(25_810);
    });
  });

  describe("Part 2", () => {
    test("Test Input", async () => {
      await expect(part2(testInput)).resolves.toEqual(47);
    });

    test("Input", async () => {
      await expect(part2(input)).resolves.toEqual(652_666_650_475_950);
    });
  });
});
