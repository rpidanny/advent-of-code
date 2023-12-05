import path from "path";

import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";

describe("Solutions: Day 4", () => {
  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(13);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(30);
    });
  });

  describe("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(18519);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(11787590);
    });
  });
});
