class Grid {
  sensorChar = 'S';

  beaconChar = 'B';

  emptyChar = '.';

  perimeterChar = 'x';

  sensorAreaChar = '#';

  searchAreaChar = ' ';

  constructor(sensors, minX, maxX, minY, maxY) {
    this.sensors = sensors;

    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

    this.xSize = (maxX - minX) << 1;
    this.ySize = (maxY - minY) << 1;

    this.xOffset = minX - ((this.xSize >> 1) >> 1);
    this.yOffset = minY - ((this.ySize >> 1) >> 1);

    this.grid = new Array(this.ySize)
        .fill()
        .map(() => new Array(this.xSize).fill(this.emptyChar));

    this.updateGrid();
  }

  padInteger(num, size = 4) {
    num = num.toString();
    while (num.length < size) num = ` ${num}`;
    return num;
  }

  isWithinSearchArea(x, y) {
    return (
      x + this.xOffset >= 0 &&
      x + this.xOffset <= 4_000_000 &&
      y + this.yOffset >= 0 &&
      y + this.yOffset <= 4_000_000
    );
  }

  calculateDistance([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  setValue(x, y, val) {
    this.grid[y - this.yOffset][x - this.xOffset] = val;
  }

  getAbsCoordinate(x, y) {
    return [x - this.xOffset, y - this.yOffset];
  }

  getManhattanPoints(x, y, d) {
    const points = [];
    for (let i = x - d; i <= x + d; i++) {
      for (let j = y - d; j <= y + d; j++) {
        const distance = this.calculateDistance([i, j], [x, y]);
        if (distance === d) {
          points.push([i, j]);
        }
      }
    }
    return points;
  }

  getExteriorPoints() {
    let points = [];
    for (const {sensor, distance} of this.sensors) {
      points = points.concat(this.getManhattanPoints(...sensor, distance + 1));
    }
    return points;
  }

  updateSensorRanges() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] !== this.emptyChar) continue;

        for (const {sensor, distance} of this.sensors) {
          const d1 = this.calculateDistance(this.getAbsCoordinate(...sensor), [
            x,
            y,
          ]);

          if (d1 <= distance) {
            this.grid[y][x] = this.sensorAreaChar;
            break;
          }
        }
      }
    }
  }

  updateSensors() {
    for (const {sensor, beacon} of this.sensors) {
      this.setValue(...sensor, this.sensorChar);
      this.setValue(...beacon, this.beaconChar);
    }
  }

  updateExteriorPoints() {
    const exteriorPoints = this.getExteriorPoints();

    for (const point of exteriorPoints) {
      this.setValue(...point, this.perimeterChar);
    }
  }

  updateGrid() {
    this.updateSensors();
    this.updateSensorRanges();
    this.updateExteriorPoints();
  }

  print() {
    console.log(
        `X: ${this.xOffset} - ${this.grid[0].length - 1 + this.xOffset}`,
    );

    for (let y = 0; y < this.grid.length; y++) {
      const row = this.grid[y]
          .map((r, x) => {
            if (this.isWithinSearchArea(x, y) && r === this.sensorAreaChar) {
              return this.searchAreaChar;
            }
            return r;
          })
          .join('');

      console.log(`${this.padInteger(y + this.yOffset)} - ${row}`);
    }
  }
}

module.exports = {
  Grid,
};
