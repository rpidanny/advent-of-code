import { UnionFindCore } from "./union-find/union-find.core";

export class MinCut {
  private verticesCount: number;
  private uf: UnionFindCore;
  constructor(
    private vertices: string[],
    private edges: [string, string][],
  ) {
    this.verticesCount = vertices.length;
    this.uf = new UnionFindCore(vertices);
  }

  private contractEdge(edgeIndex: number): void {
    const [u, v] = this.edges[edgeIndex];

    const p1 = this.uf.find(u);
    const p2 = this.uf.find(v);

    // if edge has already been contracted, do nothing
    if (p1 === p2) return;

    this.uf.union(p1, p2);

    this.verticesCount--;
  }

  /**
   * Runs Karger's MinCut algorithm: https://en.wikipedia.org/wiki/Karger%27s_algorithm
   *
   * @returns an array of edges that represent the min cut
   */
  getEdgesToCut(): [string, string][] {
    while (this.verticesCount > 2 && this.edges.length) {
      const randomEdgeIndex = Math.floor(Math.random() * this.edges.length);
      this.contractEdge(randomEdgeIndex);
    }

    const minCut: [string, string][] = [];

    for (let i = 0; i < this.edges.length; i++) {
      const p1 = this.uf.find(this.edges[i][0]);
      const p2 = this.uf.find(this.edges[i][1]);

      if (p1 !== p2) {
        minCut.push(this.edges[i]);
      }
    }

    return minCut;
  }
}
