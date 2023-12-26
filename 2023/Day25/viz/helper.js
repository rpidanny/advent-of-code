function parseInput(input) {
  const nodes = new Set();
  const edges = new Set();

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
    vertices: [...nodes],
    edges: [...edges].map((edge) => edge.split("-")),
  };
}
