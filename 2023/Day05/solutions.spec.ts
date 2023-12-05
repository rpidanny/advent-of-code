import { getInputLines } from "../utils/input";
import { Solutions } from "./solutions";
import path from "path";

describe("Solutions: Day 5", () => {
  const { step1, step2 } = new Solutions();
  describe("test", () => {
    let input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(35);
    });

    test("step 2", () => {
      expect(step2(input)).toEqual(46);
    });
  });

  describe("real", () => {
    let input = getInputLines(path.join(__dirname, `./input.txt`));
    test("step 1", () => {
      expect(step1(input)).toEqual(196167384);
    });

    test.skip("step 2", () => {
      expect(step2(input)).toEqual(125742456);
    });
  });
});
