import { getInputLines } from "../utils/input";
import { Solutions } from "./solutions";
import path from "path";

const rawInputs = getInputLines(path.join(__dirname, `./input.txt`));

const { step1, step2 } = new Solutions();

(async () => {
  await step1(rawInputs);
  await step2(rawInputs);
})();
