interface Graph {
  vertices: string[];
  edges: [string, string][];
}

export function parseInput(input: string[]): Graph {
  const nodes = new Set<string>();
  const edges = new Set<string>();

  for (const line of input) {
    const [parent, right] = line.split(": ");
    const children = right.split(" ");

    nodes.add(parent);

    for (const child of children) {
      nodes.add(child);

      const edge1 = `${parent}-${child}`;
      const edge2 = `${child}-${parent}`;

      if (!edges.has(edge1) && !edges.has(edge2)) {
        edges.add(edge1);
      }
    }
  }

  return {
    vertices: Array.from(nodes),
    edges: Array.from(edges).map((edge) => edge.split("-")) as [
      string,
      string,
    ][],
  };
}
