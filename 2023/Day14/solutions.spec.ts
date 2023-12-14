import path from "path";

import { getInputLines } from "../utils/input";
import { parseInput, Platform } from "./helpers";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 14", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test Input", () => {
      expect(part1(testInput)).toEqual(136);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(108792);
    });
  });

  describe("Part 2", () => {
    test("Cycle 1", () => {
      const platform = new Platform(parseInput(testInput));
      platform.spinCycle(1);
      expect(platform.toString()).toEqual(
        `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`,
      );
      platform.spinCycle(2);

      expect(platform.toString()).toEqual(
        `.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O`,
      );
    });

    test("Test Input", () => {
      expect(part2(testInput)).toEqual(64);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(99118);
    });
  });
});
