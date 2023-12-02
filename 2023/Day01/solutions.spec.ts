import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";
import path from "path";

describe("Solutions: Day 1", () => {
  test("step 1", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));

    expect(step1(input)).toEqual(142);
  });

  test("step 2", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.2.txt`));

    expect(step2(input)).toEqual(281);
  });
});
