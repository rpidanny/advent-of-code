export class Lagrange {
  private samples: [number, number][];

  constructor(samples: [number, number][]) {
    this.samples = samples;
  }

  private lagrangeBasis(i: number, inputX: number): number {
    let result = 1;
    for (let j = 0; j < this.samples.length; j++) {
      if (j !== i) {
        result *=
          (inputX - this.samples[j][0]) /
          (this.samples[i][0] - this.samples[j][0]);
      }
    }
    return result;
  }

  interpolate(inputX: number): number {
    if (this.samples.length === 0) {
      throw new Error("Invalid input data");
    }

    let result = 0;
    for (let i = 0; i < this.samples.length; i++) {
      result += this.samples[i][1] * this.lagrangeBasis(i, inputX);
    }

    return result;
  }
}
