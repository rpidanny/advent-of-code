const { getInputLines } = require("../utils/input");
const { day } = require("./config");
const { step1, step2 } = require("./solutions");

const TEST_MODE = false;

(async () => {
  console.log(
    `Step1: ${await step1(
      getInputLines(
        TEST_MODE ? `./Day${day}/test.input.txt` : `./Day${day}/input.txt`
      )
    )}`
  );
  console.log(
    `Step2: ${await step2(
      getInputLines(
        TEST_MODE ? `./Day${day}/test2.input.txt` : `./Day${day}/input.txt`
      )
    )}`
  );
})().then();
