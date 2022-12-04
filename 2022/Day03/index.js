const { getInputLines } = require("../utils/input");
const { step1, step2 } = require("./solutions");
const { day } = require("./config");

const TEST_MODE = false;

let rucksacks = getInputLines(
  TEST_MODE ? `./Day${day}/test.input.txt` : `./Day${day}/input.txt`
);

console.log(`Step1: ${step1(rucksacks)}`);

console.log(`Step2: ${step2(rucksacks)}`);
