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

export function calculateDistanceTraveled(time: number, speed: number): number {
  return time * speed;
}
