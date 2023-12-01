import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";
import { day } from "./config";

describe("Solutions", () => {
  test("step 1", () => {
    const input = getInputLines(`./Day${day}/test.input.txt`);

    expect(step1(input)).toEqual(142);
  });

  test("step 2", () => {
    const input = getInputLines(`./Day${day}/test.input.2.txt`);

    expect(step2(input)).toEqual(281);
  });
});
