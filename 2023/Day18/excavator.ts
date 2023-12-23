import { BasicDirection, basicDirections } from "../utils/directions";
import { getOuterAreaOfPolygon } from "../utils/polygon";

export const DirMapping: Record<string, BasicDirection> = {
  R: "right",
  L: "left",
  U: "up",
  D: "down",
};

export const DirMapping2: Record<string, BasicDirection> = {
  0: "right",
  2: "left",
  3: "up",
  1: "down",
};

export interface DigPlan {
  dir: BasicDirection;
  area: number;
}

export type Point = [number, number];

export class Excavator {
  constructor(private readonly rawPlan: string[]) {}

  getDigPlan(): DigPlan[] {
    return this.rawPlan.map((line) => {
      const [dir, area] = line.split(" ");
      return {
        dir: DirMapping[dir],
        area: parseInt(area, 10),
      };
    });
  }

  getDigPlanCorrected(): DigPlan[] {
    return this.rawPlan.map((line) => {
      const [, , hex] = line.split(" ");

      return {
        dir: DirMapping2[hex[hex.length - 2]],
        area: parseInt(hex.slice(2, hex.length - 2), 16),
      };
    });
  }

  startDigging(digPlan: DigPlan[]) {
    let x = 0;
    let y = 0;
    const points: Point[] = [[0, 0]];

    for (const { dir, area } of digPlan) {
      const [dx, dy] = basicDirections[dir];
      x += dx * area;
      y += dy * area;
      points.push([x, y]);
    }

    return getOuterAreaOfPolygon(points);
  }
}
