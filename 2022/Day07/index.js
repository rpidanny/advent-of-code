const { getInputLines } = require("../utils/input");
const { day } = require("./config");
const { step1, step2 } = require("./solutions");

const TEST_MODE = false;

let rawInputs = getInputLines(
  TEST_MODE ? `./Day${day}/test.input.txt` : `./Day${day}/input.txt`
);

console.log(`Step1: ${step1(rawInputs)}`);

console.log(`Step2: ${step2(rawInputs)}`);
