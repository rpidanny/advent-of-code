import path from "path";

import { getInputLines } from "../utils/input";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 1", () => {
  test("part 1", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));

    expect(part1(input)).toEqual(142);
  });

  test("part 2", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.2.txt`));

    expect(part2(input)).toEqual(281);
  });
});
