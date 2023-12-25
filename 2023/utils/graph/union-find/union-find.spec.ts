import { UnionFind } from "./union-find";

describe("UnionFind", () => {
  it("should correctly initialize the UnionFind instance", () => {
    const vertices = ["A", "B", "C", "D"];
    const edges: [string, string][] = [
      ["A", "B"],
      ["C", "D"],
    ];

    const unionFind = new UnionFind(vertices, edges);

    expect(unionFind).toBeDefined();
  });

  it("should correctly find connected components", () => {
    const vertices = ["A", "B", "C", "D"];
    const edges: [string, string][] = [
      ["A", "B"],
      ["C", "D"],
    ];
    const unionFind = new UnionFind(vertices, edges);

    const connectedComponents = unionFind.getConnectedComponents();

    expect(connectedComponents).toEqual([
      ["A", "B"],
      ["C", "D"],
    ]);
  });

  it("should correctly handle empty input", () => {
    const vertices: string[] = [];
    const edges: [string, string][] = [];
    const unionFind = new UnionFind(vertices, edges);

    const connectedComponents = unionFind.getConnectedComponents();

    expect(connectedComponents).toEqual([]);
  });
});
