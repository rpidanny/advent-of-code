export interface INumbers {
  winning: number[];
  own: number[];
}

export interface ICard extends INumbers {
  cardId: number;
}

export function extractNumbers(input: string): number[] {
  return input
    .split(" ")
    .filter((num) => num != "")
    .map((n) => parseInt(n));
}

export function parseInput(input: string): ICard {
  const [card, numbers] = input.split(": ");
  const [winning, own] = numbers.split(" | ");

  return {
    cardId: parseInt(card.split(" ").filter((num) => !isNaN(parseInt(num)))[0]),
    winning: extractNumbers(winning),
    own: extractNumbers(own),
  };
}

export function calculateCardPoints(winning: number[], own: number[]): number {
  let currentPoints = 0;
  const winningSet = new Set(winning);

  for (const number of own) {
    if (winningSet.has(number)) {
      if (!currentPoints) {
        currentPoints = 1;
        continue;
      }
      currentPoints = currentPoints * 2;
    }
  }

  return currentPoints;
}

export function getMatchingNumbersCount(
  winning: number[],
  own: number[]
): number {
  let matchingNumbers = 0;
  const winningSet = new Set(winning);

  for (const number of own) {
    if (winningSet.has(number)) {
      matchingNumbers++;
    }
  }

  return matchingNumbers;
}

export function getCardsMap(inputs: string[]): Map<number, INumbers> {
  const cards = new Map<number, INumbers>();

  for (const input of inputs) {
    const { cardId, winning, own } = parseInput(input);
    cards.set(cardId, { winning, own });
  }

  return cards;
}
