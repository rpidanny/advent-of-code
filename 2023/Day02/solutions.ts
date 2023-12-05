import {} from "./helpers";

// Part 1;
export function step1(inputs: string[]): number {
  const maxBallCount: Record<string, number> = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sumIds = 0;

  for (const game of inputs) {
    const [gameName, sets] = game.split(": ");
    const [, gameId] = gameName.split(" ");
    let gameInvalid = false;

    for (const set of sets.split("; ")) {
      const balls = set.split(", ");
      for (const ball of balls) {
        const [count, color] = ball.split(" ");

        if (parseInt(count) > maxBallCount[color]) {
          gameInvalid = true;
          break;
        }
      }
    }

    if (!gameInvalid) {
      sumIds += parseInt(gameId);
    }
  }

  return sumIds;
}

// Part 2:
export function step2(inputs: string[]): number {
  let sumPower = 0;

  for (const game of inputs) {
    const [, sets] = game.split(": ");
    const maxColors: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    for (const set of sets.split("; ")) {
      const balls = set.split(", ");
      for (const ball of balls) {
        const [count, color] = ball.split(" ");

        if (maxColors[color] < parseInt(count)) {
          maxColors[color] = parseInt(count);
        }
      }
    }

    const power = maxColors.red * maxColors.green * maxColors.blue;
    sumPower += power;
  }

  return sumPower;
}
