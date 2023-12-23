const parseStacks = (rawStacksArr) => {
  // pop the last two lines
  rawStacksArr.pop(); // contains ''

  const stackIds = rawStacksArr.pop(); // contains stack numbers

  const maxStackId = parseInt(stackIds[stackIds.length - 2]);

  // eslint-disable-next-line no-array-constructor
  const stacks = new Array(maxStackId + 1).fill().map(() => new Array());

  for (const row of rawStacksArr) {
    let stackId = 1;
    for (let i = 1; i < row.length; i += 4) {
      const crate = row[i];

      if (crate !== ' ') {
        stacks[stackId].unshift(crate);
      }
      stackId++;
    }
  }

  return stacks;
};

const moveCratesLIFO = (stacks, src, dest, count) => {
  for (let i = 0; i < count; i++) {
    stacks[dest].push(stacks[src].pop());
  }
};

const moveCratesFIFO = (stacks, src, dest, count) => {
  const cratesToMove = stacks[src].splice(stacks[src].length - count);

  for (const crate of cratesToMove) {
    stacks[dest].push(crate);
  }
};

const getTopOfStacks = (stacks) => {
  const top = [];

  for (let i = 1; i < stacks.length; i++) {
    const stack = stacks[i];
    top.push(stack[stack.length - 1]);
  }

  return top.join('');
};

module.exports = {
  parseStacks,
  moveCratesLIFO,
  moveCratesFIFO,
  getTopOfStacks,
};
