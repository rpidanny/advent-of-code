import { Worker } from "worker_threads";

import { getSeedToLocationMapping, parseInput } from "./helpers";

// Part 1: lowest location number
export function part1(inputs: string[]) {
  const { seeds, mappings } = parseInput(inputs);

  let minLocation = Infinity;

  for (const seed of seeds) {
    const location = getSeedToLocationMapping(seed, mappings);
    minLocation = Math.min(minLocation, location);
  }

  return minLocation;
}

// Part 2: lowest location number from seed range
export async function part2(inputs: string[]) {
  const { seeds, mappings } = parseInput(inputs);

  const chunks: number[][] = [];
  for (let i = 0; i < seeds.length - 1; i += 2) {
    chunks.push([seeds[i], seeds[i + 1]]);
  }

  const tasks = chunks.map(([seedStart, seedRangeLength]): Promise<number> => {
    return new Promise((resolve, reject) => {
      const worker = new Worker("./Day05/worker.js", {
        workerData: { seedStart, seedRangeLength, mappings },
      });
      worker.on("message", resolve);
      worker.on("error", reject);
      worker.on("exit", (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  });

  const minLocations = await Promise.all<number>(tasks);

  return Math.min(...minLocations);
}
