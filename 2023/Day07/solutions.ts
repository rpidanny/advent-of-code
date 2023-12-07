import { Mode } from "./enums";
import { compareHands, parseInputs } from "./helpers";

// Part 1:
export function part1(inputs: string[]) {
  const hands = parseInputs(inputs);

  const sortedCards = hands.sort((a, b) =>
    compareHands(a.cards, b.cards, Mode.Part1),
  );

  return sortedCards.reduce((acc, card, index) => {
    return acc + card.bid * (index + 1);
  }, 0);
}

// Part 2:
export function part2(inputs: string[]) {
  const hands = parseInputs(inputs);

  const sortedCards = hands.sort((a, b) =>
    compareHands(a.cards, b.cards, Mode.Part2),
  );

  return sortedCards.reduce((acc, card, index) => {
    return acc + card.bid * (index + 1);
  }, 0);
}
