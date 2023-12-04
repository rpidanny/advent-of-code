import {
  calculateCardPoints,
  getCardsMap,
  getMatchingNumbersCount,
  parseInput,
} from "./helpers";

// Part 1: Total Points
export function step1(inputs: string[]) {
  let totalPoints = 0;

  for (const input of inputs) {
    const { winning, own } = parseInput(input);

    const currentPoints = calculateCardPoints(winning, own);

    totalPoints += currentPoints;
  }

  return totalPoints;
}

// Part 2: Total Scratchcards
export function step2(inputs: string[]) {
  let totalScratchcards = 0;

  const cardsMap = getCardsMap(inputs);

  const dp = Array.from({ length: inputs.length + 1 }, () => 1);

  for (let i = inputs.length; i > 0; i--) {
    const { winning, own } = cardsMap.get(i);
    const matchingNumbers = getMatchingNumbersCount(winning, own);

    for (let j = 0; j < matchingNumbers; j++) {
      dp[i] += dp[i + j + 1];
    }

    totalScratchcards += dp[i];
  }

  return totalScratchcards;
}
