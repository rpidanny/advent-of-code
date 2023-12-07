import path from "path";

import { getInputLines } from "../utils/input";
import { HandType } from "./enums";
import { evaluateHand } from "./helpers";
import { part1, part2 } from "./solutions";

describe("Solutions: Day 7", () => {
  describe("helpers", () => {
    test("evaluateHand", () => {
      expect(evaluateHand(["A", "A", "A", "A", "A"])).toEqual(
        HandType.FiveOfAKind,
      );
      expect(evaluateHand(["A", "A", "8", "A", "A"])).toEqual(
        HandType.FourOfAKind,
      );
      expect(evaluateHand(["2", "3", "3", "3", "2"])).toEqual(
        HandType.FullHouse,
      );
      expect(evaluateHand(["T", "T", "T", "9", "8"])).toEqual(
        HandType.ThreeOfAKind,
      );
      expect(evaluateHand(["2", "3", "4", "3", "2"])).toEqual(HandType.TwoPair);
      expect(evaluateHand(["A", "2", "3", "A", "4"])).toEqual(HandType.OnePair);
      expect(evaluateHand(["2", "3", "4", "5", "6"])).toEqual(
        HandType.HighCard,
      );
    });
  });

  describe("test", () => {
    const input = getInputLines(path.join(__dirname, `./test.input.txt`));
    test("Part 1", () => {
      expect(part1(input)).toEqual(6440);
    });

    test("Part 2", () => {
      expect(part2(input)).toEqual(5905);
    });
  });

  describe("real", () => {
    const input = getInputLines(path.join(__dirname, `./input.txt`));
    test("Part 1", () => {
      expect(part1(input)).toEqual(248422077);
    });

    test("Part 2", () => {
      expect(part2(input)).toEqual(249817836);
    });
  });
});
