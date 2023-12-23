const parseInput = (lines) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  const sensors = [];

  for (const line of lines) {
    const [sensorPart, beaconPart] = line.split(':');

    // sensor part
    const sensor = sensorPart
        .replace(/Sensor at x=/g, '')
        .split(', y=')
        .map((cord) => parseInt(cord));

    const beacon = beaconPart
        .replace(/closest beacon is at x=/g, '')
        .split(', y=')
        .map((cord) => parseInt(cord));

    minX = Math.min(minX, sensor[0], beacon[0]);
    maxX = Math.max(maxX, sensor[0], beacon[0]);

    minY = Math.min(minY, sensor[1], beacon[1]);
    maxY = Math.max(maxY, sensor[1], beacon[1]);

    sensors.push([sensor, beacon]);
  }

  return {
    sensors,
    minX,
    maxX,
    minY,
    maxY,
  };
};

module.exports = {
  parseInput,
};
