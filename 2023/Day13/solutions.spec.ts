import path from "path";

import { getInputLines } from "../utils/input";
import { summarizePattern } from "./helpers";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 13", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1: Find Mirror", () => {
    test("summarizePattern", () => {
      expect(
        summarizePattern([
          "#...##..#",
          "#....#..#",
          "..##..###",
          "#####.##.",
          "#####.##.",
          "..##..###",
          "#....#..#",
        ]),
      ).toEqual(400);
      expect(
        summarizePattern([
          "#..#.....",
          ".##.##..#",
          "####..###",
          "#..###.##",
          "#..#.###.",
          "####.....",
          "....#..#.",
          "#####....",
          "#####....",
          "....#..#.",
          "####....#",
          "#..#.###.",
          "#..###.##",
        ]),
      ).toEqual(2);
      expect(
        summarizePattern([
          "#..##..#######..#",
          ".##..##.#.##....#",
          "##.##.##..##...##",
          ".#....#..#.###.##",
          "..####...#...##.#",
          "###...####...#..#",
          "########...##..##",
          "#......##....#.##",
          "..#..#...###...#.",
          "#.####.#.#..#.#.#",
          "#.####.#.#..#.#.#",
        ]),
      ).toEqual(1000);
    });

    test("Test Input", () => {
      expect(part1(testInput)).toEqual(405);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(31877);
    });
  });

  describe("Part 2: Find Mirror after fixing smudge", () => {
    test("summarizePattern", () => {
      expect(
        summarizePattern(
          [
            "#.##..##.",
            "..#.##.#.",
            "##......#",
            "##......#",
            "..#.##.#.",
            "..##..##.",
            "#.#.##.#.",
          ],
          true,
        ),
      ).toEqual(300);
    });

    test("Test Input", () => {
      expect(part2(testInput)).toEqual(400);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(42996);
    });
  });
});
