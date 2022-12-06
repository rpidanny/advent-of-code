const { getIndexOfEndOfFirstUniqueWindow } = require("./helpers");

// Part 1;
function step1([dataStream]) {
  const sizeOfMarker = 4;

  return getIndexOfEndOfFirstUniqueWindow(dataStream, sizeOfMarker);
}

// Part 2:
function step2([dataStream]) {
  const sizeOfMarker = 14;

  return getIndexOfEndOfFirstUniqueWindow(dataStream, sizeOfMarker);
}

module.exports = {
  step1,
  step2,
};
