import { parseInput, getSeedToLocationMapping } from "./helpers";
import { timeExecution } from "../utils/timings";

export class Solutions {
  // Part 1: lowest location number
  @timeExecution
  step1(inputs: string[]) {
    const { seeds, mappings } = parseInput(inputs);

    let minLocation = Infinity;

    for (const seed of seeds) {
      const location = getSeedToLocationMapping(seed, mappings);
      minLocation = Math.min(minLocation, location);
    }

    return minLocation;
  }

  // Part 2: lowest location number from seed range
  @timeExecution
  step2(inputs: string[]) {
    const { seeds, mappings } = parseInput(inputs);

    const chunks: number[][] = [];
    for (let i = 0; i < seeds.length - 1; i += 2) {
      chunks.push([seeds[i], seeds[i + 1]]);
    }

    const minLocations = chunks.map(([seedStart, seedRangeLength]) => {
      let localMin = Infinity;
      for (let seed = seedStart; seed < seedStart + seedRangeLength; seed++) {
        const location = getSeedToLocationMapping(seed, mappings);
        localMin = Math.min(localMin, location);
      }

      return localMin;
    });

    return Math.min(...minLocations);
  }
}
