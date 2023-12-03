import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";
import path from "path";

describe("Solutions: Day 3", () => {
  describe("test", () => {
    let input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(4361);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(467835);
    });
  });

  describe("real", () => {
    let input = getInputLines(path.join(__dirname, `./input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(535351);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(87287096);
    });
  });
});
