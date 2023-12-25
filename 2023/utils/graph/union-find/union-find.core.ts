export class UnionFindCore {
  private parent = new Map<string, string>();
  private rank = new Map<string, number>();
  private connectedComponents: number;

  constructor(protected vertices: string[]) {
    this.connectedComponents = vertices.length;
    for (const vertex of vertices) {
      this.parent.set(vertex, vertex);
      this.rank.set(vertex, 1);
    }
  }

  getNumOfConnectedComponents(): number {
    return this.connectedComponents;
  }

  getComponentSize(n: string): number {
    return this.rank.get(this.find(n))!;
  }

  /*
    find parent of a node
  */
  find(node: string): string {
    let parent = node;

    while (parent !== this.parent.get(parent)) {
      this.parent.set(parent, this.parent.get(this.parent.get(parent)));
      parent = this.parent.get(parent);
    }
    return parent;
  }

  /*
    joins two nodes together.
    Returns false if they are already joined
    Returns true if they were not joined and we joined them
  */
  union(n1: string, n2: string): boolean {
    const p1 = this.find(n1);
    const p2 = this.find(n2);

    if (p1 === p2) return false;

    const r1 = this.rank.get(p1)!;
    const r2 = this.rank.get(p2)!;

    if (r1 < r2) {
      this.parent.set(p1, p2);
      this.rank.set(p2, r1 + r2);
    } else {
      this.parent.set(p2, p1);
      this.rank.set(p1, r1 + r2);
    }

    this.connectedComponents--;

    return true;
  }
}
