export class Lagrange {
  private x: number[];
  private y: number[];

  constructor(x: number[], y: number[]) {
    this.x = x;
    this.y = y;
  }

  private lagrangeBasis(i: number, inputX: number): number {
    let result = 1;
    for (let j = 0; j < this.x.length; j++) {
      if (j !== i) {
        result *= (inputX - this.x[j]) / (this.x[i] - this.x[j]);
      }
    }
    return result;
  }

  interpolate(inputX: number): number {
    if (this.x.length !== this.y.length || this.x.length === 0) {
      throw new Error("Invalid input data");
    }

    let result = 0;
    for (let i = 0; i < this.x.length; i++) {
      result += this.y[i] * this.lagrangeBasis(i, inputX);
    }

    return result;
  }
}
