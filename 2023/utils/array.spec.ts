import { repeatArray } from "./array";

describe("repeatArray", () => {
  it("should repeat the array correctly", () => {
    const originalArray = [
      ["A", "B"],
      ["C", "D"],
    ];

    const times = 3;

    const newArray = repeatArray(originalArray, times);

    expect(newArray).toEqual([
      ["A", "B", "A", "B", "A", "B"],
      ["C", "D", "C", "D", "C", "D"],
      ["A", "B", "A", "B", "A", "B"],
      ["C", "D", "C", "D", "C", "D"],
      ["A", "B", "A", "B", "A", "B"],
      ["C", "D", "C", "D", "C", "D"],
    ]);
  });
});
