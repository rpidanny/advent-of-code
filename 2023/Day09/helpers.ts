export function parseInput(inputs: string[]): number[][] {
  return inputs.map((input) => input.split(" ").map((num) => parseInt(num)));
}

export function addNums(nums: number[]): number {
  return nums.reduce((acc, num) => acc + num, 0);
}

export function extrapolateForward(nums: number[]): number {
  if (addNums(nums) === 0) return 0;

  const nextSeq = nums.slice(1).map((value, index) => value - nums[index]);

  return nums[nums.length - 1] + extrapolateForward(nextSeq);
}

export function extrapolateBackward(nums: number[]): number {
  if (addNums(nums) === 0) return 0;

  const nextSeq = nums.slice(1).map((value, index) => value - nums[index]);

  return nums[0] - extrapolateBackward(nextSeq);
}
