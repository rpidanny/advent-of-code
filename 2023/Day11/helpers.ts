interface IEmptySpaces {
  xIndices: number[];
  yIndices: number[];
}

export function findEmptySpaces(inputs: string[]): IEmptySpaces {
  const xIndices: number[] = [];
  const yIndices: number[] = [];

  // Horizontal scan
  for (let y = 0; y < inputs.length; y++) {
    if (!inputs[y].includes("#")) {
      yIndices.push(y);
    }
  }

  // Vertical scan
  for (let x = 0; x < inputs[0].length; x++) {
    if (!inputs.some((row) => row[x] === "#")) {
      xIndices.push(x);
    }
  }

  return { xIndices, yIndices };
}

export function findGalaxies(inputs: string[]): [number, number][] {
  const stars: [number, number][] = [];

  for (let y = 0; y < inputs.length; y++) {
    for (let x = 0; x < inputs[y].length; x++) {
      const cell = inputs[y][x];
      if (cell === "#") {
        stars.push([x, y]);
      }
    }
  }

  return stars;
}

export function getDistanceBetweenStars(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  { xIndices, yIndices }: IEmptySpaces,
  expansion = 1_000_000,
): number {
  const [xMin, xMax] = [x1, x2].sort((a, b) => a - b);
  const [yMin, yMax] = [y1, y2].sort((a, b) => a - b);

  // if there exists empty space between the two stars, add expansion to distance
  const xIntersection = xIndices.filter((x) => xMin < x && x < xMax).length;
  const yIntersection = yIndices.filter((y) => yMin < y && y < yMax).length;

  // need to subtract 1 from the intersection count because we are replacing the row/col with n rows/cols
  const xOffset = xIntersection * expansion - xIntersection;
  const yOffset = yIntersection * expansion - yIntersection;

  return Math.abs(x2 - x1) + xOffset + Math.abs(y2 - y1) + yOffset;
}

export function sumOfDistancesBetweenGalaxies(
  galaxies: [number, number][],
  emptySpaces: IEmptySpaces,
  expansion = 2,
): number {
  let sum = 0;

  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      sum += getDistanceBetweenStars(
        galaxies[i],
        galaxies[j],
        emptySpaces,
        expansion,
      );
    }
  }

  return sum;
}
