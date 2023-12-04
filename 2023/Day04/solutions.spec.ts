import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";
import path from "path";

describe("Solutions: Day 4", () => {
  describe("test", () => {
    let input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test.skip("step 1", () => {
      expect(step1(input)).toEqual(13);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(30);
    });
  });

  describe.skip("real", () => {
    let input = getInputLines(path.join(__dirname, `./input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(18519);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(11787590);
    });
  });
});
