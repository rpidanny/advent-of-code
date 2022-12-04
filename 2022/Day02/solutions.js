const {
  getGames,
  getTotalScoreFromGamePlay,
  getTotalScoreFromGameConditions,
} = require("./helpers");

const step1 = (inputs) => {
  const games = getGames(inputs);
  return getTotalScoreFromGamePlay(games);
};

const step2 = (inputs) => {
  const games = getGames(inputs);

  return getTotalScoreFromGameConditions(games);
};

module.exports = {
  step1,
  step2,
};
