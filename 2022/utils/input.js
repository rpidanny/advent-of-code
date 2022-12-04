const fs = require("fs");
const path = require("path");

const getRawInput = (filePath) => {
  const rawInput = fs
    .readFileSync(path.join(__dirname, "../", filePath))
    .toString("utf-8");
  return rawInput;
};

const getInputLines = (filePath) => {
  const rawInput = getRawInput(filePath);

  return rawInput.split("\n");
};

module.exports = {
  getRawInput,
  getInputLines
};
