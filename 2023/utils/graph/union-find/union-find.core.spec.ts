import { UnionFindCore } from "./union-find.core";

describe("UnionFindCore", () => {
  let unionFind: UnionFindCore;

  beforeEach(() => {
    const vertices = ["A", "B", "C", "D"];
    unionFind = new UnionFindCore(vertices);
  });

  it("should initialize with correct number of connected components", () => {
    expect(unionFind.getNumOfConnectedComponents()).toBe(4);
  });

  it("should return correct component size", () => {
    expect(unionFind.getComponentSize("A")).toBe(1);
    expect(unionFind.getComponentSize("B")).toBe(1);
    expect(unionFind.getComponentSize("C")).toBe(1);
    expect(unionFind.getComponentSize("D")).toBe(1);
  });

  it("should correctly find parent of a node", () => {
    expect(unionFind.find("A")).toBe("A");
    expect(unionFind.find("B")).toBe("B");
    expect(unionFind.find("C")).toBe("C");
    expect(unionFind.find("D")).toBe("D");
  });

  it("should correctly join two nodes together", () => {
    expect(unionFind.union("A", "B")).toBe(true);
    expect(unionFind.getNumOfConnectedComponents()).toBe(3);
    expect(unionFind.getComponentSize("A")).toBe(2);
    expect(unionFind.getComponentSize("B")).toBe(2);
    expect(unionFind.find("A")).toBe("A");
    expect(unionFind.find("B")).toBe("A");

    expect(unionFind.union("C", "D")).toBe(true);
    expect(unionFind.getNumOfConnectedComponents()).toBe(2);
    expect(unionFind.getComponentSize("C")).toBe(2);
    expect(unionFind.getComponentSize("D")).toBe(2);
    expect(unionFind.find("C")).toBe("C");
    expect(unionFind.find("D")).toBe("C");

    expect(unionFind.union("A", "C")).toBe(true);
    expect(unionFind.getNumOfConnectedComponents()).toBe(1);
    expect(unionFind.getComponentSize("A")).toBe(4);
    expect(unionFind.getComponentSize("B")).toBe(4);
    expect(unionFind.getComponentSize("C")).toBe(4);
    expect(unionFind.getComponentSize("D")).toBe(4);
    expect(unionFind.find("A")).toBe("A");
    expect(unionFind.find("B")).toBe("A");
    expect(unionFind.find("C")).toBe("A");
    expect(unionFind.find("D")).toBe("A");
  });

  it("should not join already joined nodes", () => {
    expect(unionFind.union("A", "B")).toBe(true);
    expect(unionFind.union("A", "B")).toBe(false);
    expect(unionFind.getNumOfConnectedComponents()).toBe(3);
    expect(unionFind.getComponentSize("A")).toBe(2);
    expect(unionFind.getComponentSize("B")).toBe(2);
    expect(unionFind.find("A")).toBe("A");
    expect(unionFind.find("B")).toBe("A");
  });
});
