const { Device } = require("./Device");

// Part 1;
function step1(inputs) {
  const device = new Device(inputs);

  return device.getSumOfValidPacketIndices();
}

// Part 2:
function step2(inputs) {
  const device = new Device(inputs);

  return device.calculateDecoderKey();
}

module.exports = {
  step1,
  step2,
};
