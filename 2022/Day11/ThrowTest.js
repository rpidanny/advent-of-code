class ThrowTest {
  constructor(divBy, trueDest, falseDest) {
    this.divBy = divBy;
    this.trueDest = trueDest;
    this.falseDest = falseDest;
  }

  isDivisible(num) {
    return num % this.divBy === 0;
  }

  execute(num) {
    const dest = this.isDivisible(num) ? this.trueDest : this.falseDest;

    return [num, dest];
  }
}

module.exports = {
  ThrowTest,
};
