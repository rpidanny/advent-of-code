import path from "path";

import { getInputLines } from "../utils/input";
import { profileRun } from "../utils/timings";
import { part1, part2 } from "./solutions";

const rawInputs = getInputLines(path.join(__dirname, `./input.txt`));

(async () => {
  await profileRun("Part 1", () => part1(rawInputs));
  await profileRun("Part 2", () => part2());
})();
