import { getInputLines } from "../utils/input";
import { day } from "./config";
import { step1, step2 } from "./solutions";

const TEST_MODE = false;

const rawInputs = getInputLines(
  TEST_MODE ? `./Day${day}/test.input.txt` : `./Day${day}/input.txt`
);
const rawInputs2 = getInputLines(
  TEST_MODE ? `./Day${day}/test.input.2.txt` : `./Day${day}/input.txt`
);

console.log(`Step1: ${step1(rawInputs)}`);
console.log(`Step2: ${step2(rawInputs2)}`);
