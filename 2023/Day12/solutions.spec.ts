import path from "path";

import { getInputLines } from "../utils/input";
import { getPossibleArrangements } from "./helpers";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 12", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("getPossibleArrangements", () => {
      expect(getPossibleArrangements("??.?? 1,1")).toEqual(4);
      expect(getPossibleArrangements("???.### 1,1,3", false)).toEqual(1);
      expect(getPossibleArrangements("??..??...?##. 1,1,3")).toEqual(4);
      expect(getPossibleArrangements("?###???????? 3,2,1")).toEqual(10);
    });

    test("Test Input", () => {
      expect(part1(testInput)).toEqual(21);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(7_286);
    });
  });

  describe("Part 2", () => {
    test("getPossibleArrangements", () => {
      expect(getPossibleArrangements("???.### 1,1,3", true)).toEqual(1);
      expect(getPossibleArrangements(".??..??...?##. 1,1,3", true)).toEqual(
        16_384,
      );
      expect(
        getPossibleArrangements(".#??#?#???????#???. 1,4,1,2,1,1", true),
      ).toEqual(35_085_128);
    });

    test("Test Input", () => {
      expect(part2(testInput)).toEqual(525_152);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(25_470_469_710_341);
    });
  });
});
