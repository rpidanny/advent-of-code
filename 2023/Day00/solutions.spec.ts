import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";
import { day } from "./config";

describe("Solutions", () => {
  let input = getInputLines(`./Day${day}/test.input.txt`);
  test("step 1", () => {
    expect(step1(input)).toEqual(123);
  });

  test("step 2", () => {
    expect(step2(input)).toEqual(456);
  });
});
