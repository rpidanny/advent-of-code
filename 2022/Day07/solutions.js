const {
  generateDirTree,
  getSumOfDirsSmallerThan,
  findSmallestDirLargerThan,
} = require("./helpers");

// Part 1;
function step1(inputs) {
  const maxDirSize = 100000;

  const dirTree = generateDirTree(inputs);

  return getSumOfDirsSmallerThan(dirTree["/"], maxDirSize);
}

////////////////////////////////////////////////////////////////////////

// Part 2:
function step2(inputs) {
  const dirTree = generateDirTree(inputs);
  const root = dirTree["/"];

  const totalSizeOnDisk = 70000000;
  const minSizeNeeded = 30000000;

  const freeSpace = totalSizeOnDisk - root.size;
  const minimumFolderSizeToDelete = minSizeNeeded - freeSpace;

  return findSmallestDirLargerThan(root, minimumFolderSizeToDelete);
}

module.exports = {
  step1,
  step2,
};
