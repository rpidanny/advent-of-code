import { MinCut } from "../utils/graph/mincut";
import { UnionFind } from "../utils/graph/union-find/union-find";
import { parseInput } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const { vertices, edges } = parseInput(inputs);

  let edgesToCut: [string, string][] = [];

  // Since karger's MinCut algorithm is probabilistic,
  // we run it multiple times until we get a min cut of size 3
  while (edgesToCut.length !== 3) {
    const mc = new MinCut(vertices, edges);
    edgesToCut = mc.getEdgesToCut();
  }

  const filteredEdges = edges.filter(
    (edge) =>
      !edgesToCut.some(
        (mcEdge) => mcEdge[0] === edge[0] && mcEdge[1] === edge[1],
      ),
  );

  const uf = new UnionFind(vertices, filteredEdges);
  const connectedComponents = uf.getConnectedComponents();

  return connectedComponents.reduce((acc, curr) => acc * curr.length, 1);
}

// Part 2:
export function part2() {
  return 50;
}
