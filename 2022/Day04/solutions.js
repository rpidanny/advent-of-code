const { getSections } = require("./helpers");

// Part 1;
function step1(inputs) {
  let count = 0;

  const sections = getSections(inputs);

  for (const [s1, s2] of sections) {
    if (
      (s1[0] >= s2[0] && s1[1] <= s2[1]) ||
      (s2[0] >= s1[0] && s2[1] <= s1[1])
    ) {
      count++;
    }
  }

  return count;
}

// Part 2:
function step2(inputs) {
  let count = 0;

  const sections = getSections(inputs);

  for (const [s1, s2] of sections) {
    if (s1[0] <= s2[0] ? s2[0] <= s1[1] : s1[0] <= s2[1]) {
      count++;
    }
  }

  return count;
}

module.exports = {
  step1,
  step2,
};
