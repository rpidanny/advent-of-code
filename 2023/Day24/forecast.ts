import { init } from "z3-solver";

export class Point {
  constructor(
    public x: number,
    public y: number,
    public z?: number,
  ) {}
}

export class HailStone {
  public m: number;
  public c: number;

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public vx: number,
    public vy: number,
    public vz: number,
  ) {
    // the next position of the hailstone is given by: (Ignores z dimension)
    // px = x + vx * t
    // py = y + vy * t

    // solve for t
    // t = (px - x) / vx
    // t = (py - y) / vy

    // t = (px - x) / vx = (py - y) / vy
    // (px - x) * vy = (py - y) * vx
    // px * vy - x * vy = py * vx - y * vx
    // y = (vy * x + py * vx - px * vy) / vx
    // y = (vy / vx) * x + (py * vx - px * vy) / vx
    // which is in the form y = mx + c

    this.m = vy / vx;
    this.c = (vx * y - vy * x) / vx;
  }
}

export class Forecast {
  private readonly hailStones: HailStone[];
  constructor(input: string[]) {
    this.hailStones = this.parseInput(input);
  }

  private parseInput(input: string[]): HailStone[] {
    return input.map((line) => {
      const [position, velocity] = line.split("@ ");

      const [x, y, z] = position.split(", ").map(Number);
      const [vx, vy, vz] = velocity.split(", ").map(Number);

      return new HailStone(x, y, z, vx, vy, vz);
    });
  }

  public findIntersection(h1: HailStone, h2: HailStone): Point | null {
    const { m: m1, c: c1 } = h1;
    const { m: m2, c: c2 } = h2;

    // Check if the lines are parallel
    if (m1 === m2) {
      return null; // No intersection, parallel lines
    }

    // Calculate intersection point
    // y = m1x + c1 - equation of line 1
    // y = m2x + c2 - equation of line 2

    // solve for x
    // m1x + c1 = m2x + c2
    // m1x - m2x = c2 - c1
    // x(m1 - m2) = c2 - c1
    // x = (c2 - c1) / (m1 - m2)

    // solve for y
    // y = m1x + c1
    // y = m1 * ((c2 - c1) / (m1 - m2)) + c1
    // y = m1 * (c2 - c1) / (m1 - m2) + c1 *( (m1 - m2) / (m1 - m2))
    // y = (c1 * m2 - c2 * m1) / (m2 - m1)
    const x = (c2 - c1) / (m1 - m2);
    const y = (c1 * m2 - c2 * m1) / (m2 - m1);

    return new Point(x, y);
  }

  public getHailstones(): HailStone[] {
    return this.hailStones;
  }

  public countIntersectingHailstones(min: number, max: number): number {
    let count = 0;
    for (let i = 0; i < this.hailStones.length - 1; i++) {
      const h1 = this.hailStones[i];
      for (let j = i + 1; j < this.hailStones.length; j++) {
        const h2 = this.hailStones[j];

        const intersection = this.findIntersection(h1, h2);
        if (!intersection) continue;
        const { x: xh, y: yh } = intersection;

        const withinBounds = min <= xh && xh <= max && min <= yh && yh <= max;
        if (!withinBounds) continue;

        // determine if the intersection is in the future
        const isFuture = [h1, h2].every(
          ({ vx, vy, x, y }) =>
            (vx < 0 && xh < x) ||
            (vx > 0 && xh > x) ||
            (vy < 0 && yh < y) ||
            (vy > 0 && yh > y),
        );

        if (isFuture) count++;
      }
    }
    return count;
  }

  /**
   *
   * For a rock to collide with a hailstone: xh + t * vxh = xr + t * vxr
   * Arrange the equation to solve for t:
   * t = (xr - xh) / (vxh - vxr)
   * Taking into account other dimensions:
   * t = (xr - xh) / (vxh - vxr) = (yr - yh) / (vyh - vyr) = (zr - zh) / (vzh - vzr)
   *
   * So, to solve for the position of the rock, we need to solve the two equations from above:
   *
   * Equation 1: (xr - xh) / (vxh - vxr) = (yr - yh) / (vyh - vyr)
   * Equation 2: (yr - yh) / (vyh - vyr) = (zr - zh) / (vzh - vzr)
   *
   * Arrange the equations gives us:
   * Equation 1: (xr - xh)(vyh - vyr) - (yr - yh)(vxh - vxr) = 0
   * Equation 2: (yr - yh)(vzh - vzr) - (zr - zh)(vyh - vyr) = 0
   *
   * @returns the position of the hailstone at the time of the collision
   */
  public async getInitialStonePosition(): Promise<Point> {
    const { Context, em } = await init();
    const z3 = Context("main");
    const solver = new z3.Solver();

    const xr = z3.Int.const("xr");
    const yr = z3.Int.const("yr");
    const zr = z3.Int.const("zr");
    const vxr = z3.Int.const("vxr");
    const vyr = z3.Int.const("vyr");
    const vzr = z3.Int.const("vzr");

    for (const { x, y, z, vx, vy, vz } of this.hailStones) {
      // Equation 1: (xr - x)(vy - vyr) - (yr - y)(vx - vxr) = 0
      const eq1 = xr
        .sub(x)
        .mul(vyr.mul(-1).add(vy))
        .sub(yr.sub(y).mul(vxr.mul(-1).add(vx)));

      // Equation 2: (yr - y)(vz - vzr) - (zr - z)(vy - vyr) = 0
      const eq2 = yr
        .sub(y)
        .mul(vzr.mul(-1).add(vz))
        .sub(zr.sub(z).mul(vyr.mul(-1).add(vy)));

      solver.add(eq1.eq(0));
      solver.add(eq2.eq(0));
    }

    if ((await solver.check()) !== "sat") throw new Error("No solution found");

    const model = solver.model();

    const x = Number(`${model.get(xr)}`);
    const y = Number(`${model.get(yr)}`);
    const z = Number(`${model.get(zr)}`);

    // https://github.com/Z3Prover/z3/issues/6701
    em.PThread.terminateAllThreads();

    return new Point(x, y, z);
  }
}
