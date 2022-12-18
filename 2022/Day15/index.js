const { getInputLines } = require("../utils/input");
const { day } = require("./config");
const { step1, step2 } = require("./solutions");

const TEST_MODE = false;

let rawInputs = getInputLines(
  TEST_MODE ? `./Day${day}/test.input.txt` : `./Day${day}/input.txt`
);

console.time("Step1");
console.log(`$ ${step1(rawInputs, TEST_MODE ? 10 : 2000000, TEST_MODE)}`);
console.timeEnd("Step1");

console.time("Step2");
console.log(`$ ${step2(rawInputs, TEST_MODE)}`);
console.timeEnd("Step2");
