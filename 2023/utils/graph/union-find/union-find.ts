import { UnionFindCore } from "./union-find.core";

export class UnionFind extends UnionFindCore {
  constructor(
    vertices: string[],
    private edges: [string, string][],
  ) {
    super(vertices);

    for (const edge of this.edges) {
      this.union(edge[0], edge[1]);
    }
  }

  public getConnectedComponents(): string[][] {
    const components = new Map<string, string[]>();

    for (const vertex of this.vertices) {
      const parent = this.find(vertex);

      if (!components.has(parent)) {
        components.set(parent, []);
      }

      components.get(parent)!.push(vertex);
    }

    return Array.from(components.values());
  }
}
