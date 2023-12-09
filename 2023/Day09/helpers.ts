export function parseInput(inputs: string[]): number[][] {
  return inputs.map((input) => input.split(" ").map((num) => parseInt(num)));
}

export function addNums(nums: number[]): number {
  return nums.reduce((acc, num) => acc + num, 0);
}

export function generatePyramidFromDifferences(nums: number[]): number[][] {
  const levels: number[][] = [nums];
  let levelSum = addNums(nums);
  while (levelSum) {
    const currentLevel = levels[levels.length - 1];
    const nextLevel = currentLevel
      .slice(1)
      .map((value, index) => value - currentLevel[index]);
    levels.push(nextLevel);
    levelSum = addNums(nextLevel);
  }
  return levels;
}

export function extrapolateForward(nums: number[]): number {
  const levels = generatePyramidFromDifferences(nums);
  return levels.reduce((sum, level) => sum + level.pop(), 0);
}

export function extrapolateBackward(nums: number[]): number {
  const levels = generatePyramidFromDifferences(nums);
  return levels.reduceRight(
    (nextExtrapolation, level) => level[0] - nextExtrapolation,
    0,
  );
}
