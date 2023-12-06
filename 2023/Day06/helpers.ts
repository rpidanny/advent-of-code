export interface IRaceRecord {
  time: number;
  distance: number;
}

export function parsePart1Input(inputs: string[]): IRaceRecord[] {
  const times = inputs[0]
    .split("Time:")[1]
    .split(" ")
    .filter((n) => n !== "")
    .map((t) => parseInt(t, 10));

  const distances = inputs[1]
    .split("Distance:")[1]
    .split(" ")
    .filter((n) => n !== "")
    .map((t) => parseInt(t, 10));

  const records: IRaceRecord[] = [];

  for (let i = 0; i < times.length; i++) {
    records.push({ time: times[i], distance: distances[i] });
  }

  return records;
}

export function parsePart2Input(inputs: string[]): IRaceRecord {
  const times = inputs[0]
    .split("Time:")[1]
    .split(" ")
    .filter((n) => n !== "")
    .join("");

  const distances = inputs[1]
    .split("Distance:")[1]
    .split(" ")
    .filter((n) => n !== "")
    .join("");

  return {
    time: parseInt(times, 10),
    distance: parseInt(distances, 10),
  };
}

export function solveQuadratic(
  a: number,
  b: number,
  c: number,
): { x1: number; x2: number } {
  // quadratic formula for ax^2 + bx + c = 0
  // x = (-b +- sqrt(b^2 - 4ac)) / 2a
  const x1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
  const x2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);

  return { x1, x2 };
}

export function timeCombinationsToExceedDistance(
  time: number,
  distance: number,
): number {
  // t = time spend charging = speed
  // time - t = time spend running

  // distance traveled = seed * time spent running
  // dist = t * (time - t)
  // dist = time*t - t^2

  // according to the question, dist should be greater than distance
  // time*t - t^2 > distance
  // time*t - t^2 - distance > 0
  // -t^2 + t*time - distance = 0 // which is a quadratic equation (x^2 + bx + c = 0)

  // solving quadratic equation for t
  const { x1, x2 } = solveQuadratic(-1, time, -distance);

  const tMax = Math.max(x1, x2);
  const tMin = Math.min(x1, x2);

  // number of values of t that makes dist > distance = ceil(tMax) - floor(tMin) - 1
  return Math.ceil(tMax) - Math.floor(tMin) - 1;
}
