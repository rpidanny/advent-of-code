const {Grid} = require('./Grid');

class Scanner {
  rowMax = 0;

  colMax = 0;

  colMin = Infinity;

  maxCol = 0;

  maxRow = 0;

  constructor(inputs, scanFloor = false) {
    this.scanFloor = scanFloor;

    this.scans = this.parseRawInputs(inputs);
    this.updateDimensions();

    const maxColSize = scanFloor ?
      Math.max(this.maxCol * 4, this.maxRow * 4) :
      this.maxCol * 2;

    this.grid = new Grid(
        this.maxRow + 5,
        maxColSize,
        0,
        this.colMin - ((maxColSize >> 1) >> 1),
    );

    this.updateGridWithStones();

    if (scanFloor) this.updateGridWithFloor();
  }

  parseRawInputs(inputs) {
    const scans = [];
    for (const line of inputs) {
      const points = line
          .split(' -> ')
          .map((point) => point.split(',').map((p) => parseInt(p)));
      scans.push(points);
    }
    return scans;
  }

  updateDimensions() {
    for (const scan of this.scans) {
      for (const point of scan) {
        this.colMax = Math.max(this.colMax, point[0]);
        this.colMin = Math.min(this.colMin, point[0]);
        this.rowMax = Math.max(this.rowMax, point[1]);
      }
    }

    this.maxCol = this.colMax - this.colMin;
    this.maxRow = this.rowMax;
  }

  updateGridWithStones() {
    for (const points of this.scans) {
      for (let i = 0; i < points.length - 1; i++) {
        const point = points[i];
        const nextPoint = points[i + 1];

        if (point[0] === nextPoint[0]) {
          for (
            let row = Math.min(point[1], nextPoint[1]);
            row <= Math.max(point[1], nextPoint[1]);
            row++
          ) {
            this.grid.setValue(row, point[0], '#');
          }
        } else {
          for (
            let col = Math.min(point[0], nextPoint[0]);
            col <= Math.max(point[0], nextPoint[0]);
            col++
          ) {
            this.grid.setValue(point[1], col, '#');
          }
        }
      }
    }
  }

  updateGridWithFloor() {
    this.grid.setRowValues(this.rowMax + 2, '#');
  }

  getGrid() {
    return this.grid;
  }
}

module.exports = {
  Scanner,
};
