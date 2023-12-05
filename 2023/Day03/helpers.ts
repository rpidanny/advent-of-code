import { directions } from "../utils/directions";

export function isIndexValid(inputs: string[], row: number, col: number) {
  return (
    row >= 0 &&
    row < inputs.length &&
    col >= 0 &&
    col < inputs[row].length &&
    !isNaN(parseInt(inputs[row][col]))
  );
}

export function getNumber(
  inputs: string[],
  row: number,
  col: number,
  visited: Set<string>,
): number {
  visited.add(`${row},${col}`);
  const number = [inputs[row][col]];

  let c1 = col + 1;
  while (isIndexValid(inputs, row, c1)) {
    visited.add(`${row},${c1}`);
    number.push(inputs[row][c1]);
    c1++;
  }

  let c2 = col - 1;
  while (isIndexValid(inputs, row, c2)) {
    visited.add(`${row},${c2}`);
    number.unshift(inputs[row][c2]);
    c2--;
  }

  return parseInt(number.join(""));
}

export function findAdjacentNumbers(
  inputs: string[],
  row: number,
  col: number,
): number[] {
  const adjacentNumbers: number[] = [];
  const visited = new Set<string>();

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;

    if (visited.has(`${r},${c}`)) continue;
    if (!isIndexValid(inputs, r, c)) continue;

    const number = getNumber(inputs, r, c, visited);
    adjacentNumbers.push(number);
  }

  return adjacentNumbers;
}
