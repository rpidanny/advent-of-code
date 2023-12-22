const {tick, updateFrameBuffer} = require('./helpers');

// Part 1;
function step1(inputs) {
  const state = {
    cycleNum: 1,
    registers: {
      x: 1,
    },
    totalSignalStrength: 0,
  };

  for (const input of inputs) {
    tick(state);
    if (input !== 'noop') {
      tick(state);
      const [, num] = input.split(' ');
      state.registers.x += parseInt(num);
    }
  }
  return state.totalSignalStrength;
}

const renderFrame = (frameBuffer) =>
  frameBuffer.map((row) => row.join('')).join('\n');

// Part 2:
function step2(inputs) {
  const state = {
    // Starting from 0 to make array indexing in frame buffer easier
    cycleNum: 0,
    registers: {
      x: 1,
    },
    frameBuffer: new Array(6).fill().map(() => new Array(40).fill('.')),
  };

  for (const input of inputs) {
    updateFrameBuffer(state);
    if (input !== 'noop') {
      updateFrameBuffer(state);
      const [, num] = input.split(' ');
      state.registers.x += parseInt(num);
    }
  }

  return renderFrame(state.frameBuffer);
}

module.exports = {
  step1,
  step2,
};
