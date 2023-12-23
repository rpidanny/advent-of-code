import path from "path";

import { getInputLines } from "../utils/input";
import { getDistanceBetweenStars } from "./helpers";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 11", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test getDistanceBetweenPoints", () => {
      expect(
        getDistanceBetweenStars(
          [1, 6],
          [6, 11],
          { xIndices: [], yIndices: [] },
          2,
        ),
      ).toEqual(10);

      expect(
        getDistanceBetweenStars(
          [1, 6],
          [5, 11],
          { xIndices: [3], yIndices: [] },
          2,
        ),
      ).toEqual(10);

      expect(
        getDistanceBetweenStars(
          [1, 6],
          [5, 11],
          { xIndices: [3, 4], yIndices: [] },
          2,
        ),
      ).toEqual(11);

      expect(
        getDistanceBetweenStars(
          [5, 11],
          [1, 6],
          { xIndices: [3], yIndices: [] },
          2,
        ),
      ).toEqual(10);

      expect(
        getDistanceBetweenStars(
          [5, 11],
          [1, 6],
          { xIndices: [3], yIndices: [9] },
          2,
        ),
      ).toEqual(11);
    });

    test("Test Input", () => {
      expect(part1(testInput)).toEqual(374);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(9_799_681);
    });
  });

  describe("Part 2", () => {
    test("Test getDistanceBetweenPoints", () => {
      expect(
        getDistanceBetweenStars(
          [1, 6],
          [5, 11],
          { xIndices: [], yIndices: [] },
          2,
        ),
      ).toEqual(9);
      expect(
        getDistanceBetweenStars(
          [1, 6],
          [6, 11],
          { xIndices: [0], yIndices: [9] },
          2,
        ),
      ).toEqual(11);
    });

    test("Test Input 1", () => {
      expect(part2(testInput, 10)).toEqual(1_030);
    });

    test("Test Input 1", () => {
      expect(part2(testInput, 100)).toEqual(8_410);
    });

    test("Input", () => {
      expect(part2(input, 1_000_000)).toEqual(513_171_773_355);
    });
  });
});
