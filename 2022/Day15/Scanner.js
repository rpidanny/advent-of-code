class Scanner {
  // Diamond pattern for Manhattan distance
  directions = [
    [-1, 1],
    [1, -1],
    [-1, -1],
    [1, 1],
  ];

  constructor(sensors, minX, maxX, minY, maxY) {
    this.rawSensors = sensors;
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    this.sensors = [];
    this.occupiedPositions = new Set();

    this.updateSensorDistances(sensors);
  }

  calculateDistance([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  getCoordinateId(x, y) {
    return `${x},${y}`;
  }

  isWithinSearchArea(x, y) {
    return x >= 0 && x <= 4_000_000 && y >= 0 && y <= 4_000_000;
  }

  isSurrounded(x, y) {
    for (const [dx, dy] of this.directions) {
      const [mx, my] = [x + dx, y + dy];

      if (this.isIsolated(mx, my)) return false;
    }

    return true;
  }

  isIsolated(x, y) {
    for (const {sensor, distance} of this.sensors) {
      const d1 = this.calculateDistance(sensor, [x, y]);
      if (d1 <= distance) return false;
    }

    return true;
  }

  getSensors() {
    return this.sensors;
  }

  updateSensorDistances(sensors) {
    for (const [sensor, beacon] of sensors) {
      const distance = this.calculateDistance(sensor, beacon);

      this.occupiedPositions.add(this.getCoordinateId(...sensor));
      this.occupiedPositions.add(this.getCoordinateId(...beacon));

      this.sensors.push({sensor, distance, beacon});
    }
  }

  getNumOfPositionsWithoutBeacon(y) {
    let counter = 0;
    for (let x = this.minX * 3; x <= this.maxX * 3; x++) {
      if (this.occupiedPositions.has(this.getCoordinateId(x, y))) continue;

      if (!this.isIsolated(x, y)) {
        counter++;
      }
    }

    return counter;
  }

  findDistressBeacon() {
    for (const {
      sensor: [sx, sy],
      distance,
    } of this.sensors) {
      for (let dx = 0; dx <= distance + 1; dx++) {
        const dy = distance + 1 - dx;

        for (const [mx, my] of this.directions) {
          const [x, y] = [sx + dx * mx, sy + dy * my];
          if (!this.isWithinSearchArea(x, y)) continue;

          if (
            this.isWithinSearchArea(x, y) &&
            this.isIsolated(x, y) &&
            this.isSurrounded(x, y)
          ) return [x, y];
        }
      }
    }
  }

  getTuningFrequency() {
    const [x, y] = this.findDistressBeacon();
    console.log(`Distress Beacon: [${x}, ${y}]`);
    return x * 4_000_000 + y;
  }
}

module.exports = {
  Scanner,
};
