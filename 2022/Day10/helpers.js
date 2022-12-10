const tick = (state) => {
  let startOfCycleNum = 20;

  if ((state.cycleNum - startOfCycleNum) % 40 === 0) {
    state.totalSignalStrength += state.cycleNum * state.registers.x;
  }

  state.cycleNum++;
};

const updateFrameBuffer = (state) => {
  const col = state.cycleNum % 40;
  const row = Math.floor(state.cycleNum / 40);

  if (col >= state.registers.x - 1 && col <= state.registers.x + 1) {
    state.frameBuffer[row][col] = "#";
  }

  state.cycleNum++;
};

module.exports = {
  tick,
  updateFrameBuffer,
};
