/**
 * Using shoelace formula to calculate area of polygon
 * https://en.wikipedia.org/wiki/Shoelace_formula
 * @param points
 * @returns area of polygon
 */
export function getAreaOfPolygon(points: [number, number][]) {
  let area = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    area += x1 * y2 - x2 * y1;
  }
  return Math.abs(area) / 2;
}

/**
 * @param points
 * @returns perimeter of polygon
 */
export function getPerimeterOfPolygon(points: [number, number][]) {
  let perimeter = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    perimeter += Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
  return perimeter;
}

/**
 * https://en.wikipedia.org/wiki/Pick%27s_theorem
 * a = i + b / 2 - 1
 * a: area of polygon
 * i: number of points with integer coordinates inside polygon
 * b: number of points with integer coordinates on the boundary of polygon
 *
 * @param points
 * @returns area of polygon - boundary area of polygon
 */

// i.e: i = a - b / 2 + 1
export function getInnerAreaOfPolygon(points: [number, number][]) {
  const area = getAreaOfPolygon(points);
  const perimeter = getPerimeterOfPolygon(points);
  return area - perimeter / 2 + 1;
}

/**
 * derivation:
 *
 * A = i + b // Outer area = inner area + boundary area
 * A = i + b / 2 + b / 2
 * A = a - b / 2 + 1 + b / 2 + b / 2
 * A = a + b / 2 + 1
 * i.e: A = i + b / 2 - 1
 * @param points
 * @returns area of polygon + boundary area of polygon
 */
export function getOuterAreaOfPolygon(points: [number, number][]) {
  const area = getAreaOfPolygon(points);
  const perimeter = getPerimeterOfPolygon(points);
  return area + perimeter / 2 + 1;
}
