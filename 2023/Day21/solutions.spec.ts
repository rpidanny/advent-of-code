import path from "path";

import { getInputLines } from "../utils/input";
import { Garden } from "./garden";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 21", () => {
  const testInput = getInputLines(path.join(__dirname, `./test.input.txt`));
  const input = getInputLines(path.join(__dirname, `./input.txt`));

  describe("Part 1", () => {
    test("Test Input", () => {
      expect(part1(testInput, 6)).toEqual(16);
    });

    test("Input", () => {
      expect(part1(input)).toEqual(3_562);
    });
  });

  describe("Part 2", () => {
    test("mapToVirtualGrid", () => {
      const garden = new Garden(testInput);
      expect(garden.mapToVirtualGrid([0, 0])).toEqual([0, 0]);
      expect(garden.mapToVirtualGrid([10, 0])).toEqual([10, 0]);
      expect(garden.mapToVirtualGrid([11, 0])).toEqual([0, 0]);
      expect(garden.mapToVirtualGrid([12, 0])).toEqual([1, 0]);
      expect(garden.mapToVirtualGrid([-1, 0])).toEqual([10, 0]);
      expect(garden.mapToVirtualGrid([-100, 0])).toEqual([10, 0]);
    });

    test("Test Input", () => {
      expect(part2(testInput, 10)).toEqual(50);
    });

    test("Test Input 2", () => {
      expect(part2(testInput, 50)).toEqual(1_594);
    });

    test("Test Input 2", () => {
      expect(part2(testInput, 100)).toEqual(6_536);
    });

    test("Input", () => {
      expect(part2(input)).toEqual(592_723_929_260_582);
    });
  });
});
