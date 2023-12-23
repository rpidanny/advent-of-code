import { Lagrange } from "./lagrange";

describe("Lagrange", () => {
  describe("interpolate", () => {
    test("should interpolate correctly for valid input data", () => {
      const samples: [number, number][] = [
        [1, 2],
        [2, 4],
        [3, 6],
      ];
      const lagrange = new Lagrange(samples);

      expect(lagrange.interpolate(1.5)).toEqual(3);
      expect(lagrange.interpolate(2.5)).toEqual(5);
      expect(lagrange.interpolate(3.5)).toEqual(7);
    });

    test("should throw an error for invalid input data", () => {
      const lagrange = new Lagrange([]);

      expect(() => lagrange.interpolate(1.5)).toThrow("Invalid input data");
    });
  });
});
