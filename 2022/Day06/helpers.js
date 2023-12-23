// O(n)
const getIndexOfEndOfFirstUniqueWindow = (str, windowSize) => {
  let leftPointer = 0;
  let rightPointer = 0;

  const charSet = new Set();

  while (rightPointer < str.length) {
    if (charSet.has(str[rightPointer])) {
      while (charSet.has(str[rightPointer])) {
        charSet.delete(str[leftPointer]);
        leftPointer++;
      }
    }

    charSet.add(str[rightPointer]);
    rightPointer++;

    if (charSet.size === windowSize) {
      return rightPointer;
    }
  }
};

module.exports = {
  getIndexOfEndOfFirstUniqueWindow,
};
