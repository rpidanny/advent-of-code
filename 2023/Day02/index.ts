import { getInputLines } from "../utils/input";
import { step1, step2 } from "./solutions";
import path from "path";

const rawInputs = getInputLines(path.join(__dirname, `./input.txt`));

console.log(`Step1: ${step1(rawInputs)}`);
console.log(`Step2: ${step2(rawInputs)}`);
