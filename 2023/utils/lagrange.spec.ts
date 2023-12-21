import { Lagrange } from "./lagrange";

describe("Lagrange", () => {
  describe("interpolate", () => {
    test("should interpolate correctly for valid input data", () => {
      const x = [1, 2, 3];
      const y = [2, 4, 6];
      const lagrange = new Lagrange(x, y);

      expect(lagrange.interpolate(1.5)).toEqual(3);
      expect(lagrange.interpolate(2.5)).toEqual(5);
      expect(lagrange.interpolate(3.5)).toEqual(7);
    });

    test("should throw an error for invalid input data", () => {
      const x = [1, 2, 3];
      const y = [2, 4];
      const lagrange = new Lagrange(x, y);

      expect(() => lagrange.interpolate(1.5)).toThrow("Invalid input data");
    });
  });
});
