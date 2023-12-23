const getGames = (rawGames) => rawGames.map((game) => game.split(' '));

// Game Mappings
const p1ScoreMappings = {
  A: 1,
  B: 2,
  C: 3,
};

const p2ScoreMappings = {
  X: 1,
  Y: 2,
  Z: 3,
};

const GameStateMapping = {
  DRAW: 'Y',
  WIN: 'Z',
  LOOSE: 'X',
};

// Step 1
const getTotalScoreFromGamePlay = (games) => {
  let score = 0;

  for (const [p1, p2] of games) {
    const p1Score = p1ScoreMappings[p1];
    const p2Score = p2ScoreMappings[p2];

    if (p1Score === p2Score) {
      // Draw
      score += 3 + p2Score;
    } else if (
      (p1 === 'A' && p2 === 'Y') ||
      (p1 === 'B' && p2 === 'Z') ||
      (p1 === 'C' && p2 === 'X')
    ) {
      // Win
      score += 6 + p2Score;
    } else {
      // Loose
      score += p2Score;
    }
  }

  return score;
};

// Step 2

const getLoosingScore = (p1Score) => {
  if (p1Score === 1) {
    return 3;
  }
  return p1Score - 1;
};

const getWinningScore = (p1Score) => {
  if (p1Score === 3) {
    return 1;
  }
  return p1Score + 1;
};

const getTotalScoreFromGameConditions = (games) => {
  let score = 0;

  for (const [p1, condition] of games) {
    const p1Score = p1ScoreMappings[p1];

    if (condition === GameStateMapping.LOOSE) {
      score += getLoosingScore(p1Score);
    } else if (condition === GameStateMapping.DRAW) {
      score += 3 + p1Score;
    } else if (condition === GameStateMapping.WIN) {
      score += 6 + getWinningScore(p1Score);
    }
  }

  return score;
};

module.exports = {
  getGames,
  getTotalScoreFromGamePlay,
  getTotalScoreFromGameConditions,
};
