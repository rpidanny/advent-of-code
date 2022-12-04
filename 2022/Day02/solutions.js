const { getInputLines } = require("../utils/input");
const {
  getGames,
  getTotalScoreFromGamePlay,
  getTotalScoreFromGameConditions,
} = require("./helpers");

const rawInput = getInputLines("./Day2/input.txt");
// const rawGames = getInputLines("./Day2/test.input.txt");

const games = getGames(rawInput);

console.log(`Step1: ${getTotalScoreFromGamePlay(games)}`);
console.log(`Step2: ${getTotalScoreFromGameConditions(games)}`);
