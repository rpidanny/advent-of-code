export type Direction = "L" | "R";

export type INode = {
  [key in Direction]: string;
};

export interface IMap {
  directions: Direction[];
  nodes: Record<string, INode>;
}

export function parseInput(inputs: string[]): IMap {
  const directions = inputs[0].split("") as Direction[];
  const nodes: Record<string, INode> = {};

  for (let i = 2; i < inputs.length; i++) {
    const [src, dst] = inputs[i].split(" = ");
    const [L, R] = dst.replaceAll(/[()]/g, "").split(", ");
    nodes[src] = { L, R };
  }

  return {
    directions,
    nodes,
  };
}

export function traverseMap(
  { directions, nodes }: IMap,
  startNode: string,
  endCondition: (node: string) => boolean,
): number {
  let stepsCount = 0;
  let currentNode = startNode;

  while (!endCondition(currentNode)) {
    const dir = directions[stepsCount % directions.length];
    currentNode = nodes[currentNode][dir];
    stepsCount++;
  }

  return stepsCount;
}
