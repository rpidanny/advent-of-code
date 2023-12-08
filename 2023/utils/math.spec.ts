import { leastCommonMultiple } from "./math";

describe("Math", () => {
  describe("leastCommonMultiple", () => {
    it.each`
      numbers          | lcm
      ${[2, 3, 5]}     | ${30}
      ${[4, 6, 8, 10]} | ${120}
      ${[7, 14, 21]}   | ${42}
      ${[3, 7, 9, 11]} | ${693}
    `(
      "should return the least common multiple of an array of numbers: $numbers",
      ({ numbers, lcm }) => {
        const result1 = leastCommonMultiple(numbers);
        expect(result1).toBe(lcm);
      },
    );

    it("should return the number itself when the array has only one element", () => {
      const result = leastCommonMultiple([5]);
      expect(result).toBe(5);
    });

    it("should return 1 when the array is empty", () => {
      const result = leastCommonMultiple([]);
      expect(result).toBe(1);
    });
  });
});
