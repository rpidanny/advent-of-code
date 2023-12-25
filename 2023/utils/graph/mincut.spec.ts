import { MinCut } from "./mincut";

describe("MinCut", () => {
  describe("getEdgesToCut", () => {
    it("should return an array of edges representing the min cut", () => {
      const vertices = ["A", "B", "C", "D"];
      const edges: [string, string][] = [
        ["A", "B"],
        ["B", "C"],
        ["C", "D"],
        ["D", "A"],
      ];

      const minCut = new MinCut(vertices, edges).getEdgesToCut();

      expect(minCut.length).toBe(2);
    });

    it("should return an empty array when there are no edges", () => {
      const vertices = ["A", "B", "C"];
      const edges: [string, string][] = [];
      const minCut = new MinCut(vertices, edges).getEdgesToCut();

      // Assert that the min cut is empty
      expect(minCut).toEqual([]);
    });

    // Add more test cases as needed
  });
});
