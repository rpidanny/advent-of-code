import { HandType, Mode } from "./enums";

export interface IHand {
  cards: string[];
  bid: number;
}

export function parseInputs(inputs: string[]): IHand[] {
  return inputs.map((input) => {
    const [cards, bid] = input.split(" ");
    return {
      cards: cards.split(""),
      bid: parseInt(bid, 10),
    };
  });
}

export function maximizeHand(cards: string[]): string[] {
  if (cards.indexOf("J") === -1 || cards.join("") === "JJJJJ") return cards;

  const remainingCards = cards.filter((card) => card !== "J");

  const cardCounts = Object.entries(
    remainingCards.reduce(
      (acc, card) => {
        acc[card] = acc[card] ? acc[card] + 1 : 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  ).sort((a, b) => b[1] - a[1]);

  // replace joker with the most common card
  return cards.map((card) => (card === "J" ? cardCounts[0][0] : card));
}

export function getHandTypeWeight(cards: string[], mode: Mode): number {
  const handType = evaluateHand(
    mode === Mode.Part1 ? cards : maximizeHand(cards),
  );

  switch (handType) {
    case HandType.FiveOfAKind:
      return 7;
    case HandType.FourOfAKind:
      return 6;
    case HandType.FullHouse:
      return 5;
    case HandType.ThreeOfAKind:
      return 4;
    case HandType.TwoPair:
      return 3;
    case HandType.OnePair:
      return 2;
    case HandType.HighCard:
      return 1;
  }
}

export function getCardWeight(card: string, mode: Mode): number {
  switch (card) {
    case "A":
      return 13;
    case "K":
      return 12;
    case "Q":
      return 11;
    case "J":
      return mode === Mode.Part1 ? 10 : 0;
    case "T":
      return 9;
    case "9":
      return 8;
    case "8":
      return 7;
    case "7":
      return 6;
    case "6":
      return 5;
    case "5":
      return 4;
    case "4":
      return 3;
    case "3":
      return 2;
    case "2":
      return 1;
  }
}

/**
 * 
 * Every hand is exactly one type. From strongest to weakest, they are:

Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456

 * @param cards: string[] 
 */
export function evaluateHand(cards: string[]): HandType {
  const uniqueCardCount = new Set(cards).size;

  if (uniqueCardCount === 1) {
    return HandType.FiveOfAKind;
  }

  const cardCounts = cards.reduce(
    (acc, card) => {
      acc[card] = (acc[card] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const cardCountsArray = Object.values(cardCounts);
  const cardCountsSet = new Set(cardCountsArray);

  if (uniqueCardCount === 2) {
    return cardCountsSet.has(4) ? HandType.FourOfAKind : HandType.FullHouse;
  }

  if (uniqueCardCount === 3) {
    return cardCountsSet.has(3) ? HandType.ThreeOfAKind : HandType.TwoPair;
  }

  if (uniqueCardCount === 4) {
    return HandType.OnePair;
  }

  return HandType.HighCard;
}

export function compareHands(
  c1: string[],
  c2: string[],
  mode = Mode.Part1,
): number {
  const handTypeWeight1 = getHandTypeWeight(c1, mode);
  const handTypeWeight2 = getHandTypeWeight(c2, mode);

  if (handTypeWeight1 !== handTypeWeight2)
    return handTypeWeight1 - handTypeWeight2;

  for (let i = 0; i < 5; i++) {
    const cardWeight1 = getCardWeight(c1[i], mode);
    const cardWeight2 = getCardWeight(c2[i], mode);

    if (cardWeight1 !== cardWeight2) return cardWeight1 - cardWeight2;
  }
}
